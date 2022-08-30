# -*- coding: utf-8 -*-
"""An app for running a stand-alone "terminal"."""

import os

import tornado
from jupyter_server.base.handlers import JupyterHandler
from jupyter_server.extension.application import ExtensionApp, ExtensionAppJinjaMixin
from jupyter_server.extension.handler import (
    ExtensionHandlerJinjaMixin,
    ExtensionHandlerMixin,
)
from jupyter_server.utils import url_path_join as ujoin
from notebook_shim.shim import NotebookConfigShimMixin

from . import __version__

HERE = os.path.dirname(__file__)


class Handler(ExtensionHandlerJinjaMixin, ExtensionHandlerMixin, JupyterHandler):
    """Handle requests between the main app page and notebook server."""

    @tornado.web.authenticated
    def get(self):
        """Get the main page for the application's interface."""
        available = self.settings["terminals_available"]
        config_data = {
            "appVersion": __version__,
            "baseUrl": self.base_url,
            "token": self.settings["token"],
            "fullStaticUrl": ujoin(self.base_url, "static", self.name),
            "frontendUrl": ujoin(self.base_url, "euporie/"),
            "terminalsAvailable": available,
        }
        return self.write(
            self.render_template(
                "index.html",
                static=self.static_url,
                base_url=self.base_url,
                token=self.settings["token"],
                terminals_available=available,
                page_config=config_data,
            )
        )


class JupyterEuporieApp(ExtensionAppJinjaMixin, NotebookConfigShimMixin, ExtensionApp):

    name = __name__
    default_url = "/euporie"
    load_other_extensions = False
    file_url_prefix = "/euporie"

    def initialize_handlers(self):
        super().initialize_handlers()
        self.handlers.append(("/euporie", Handler))

    def initialize_templates(self):
        super().initialize_templates()
        self.static_dir = os.path.join(HERE, "static")
        self.templates_dir = os.path.join(HERE, "templates")
        self.static_paths = [self.static_dir]
        self.template_paths = [self.templates_dir]


# -----------------------------------------------------------------------------
# Main entry point
# -----------------------------------------------------------------------------

main = launch_new_instance = JupyterEuporieApp.launch_instance

if __name__ == "__main__":
    main()
