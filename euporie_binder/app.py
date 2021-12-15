# -*- coding: utf-8 -*-
"""An app for running a stand-alone "terminal"."""
import os

import tornado
from jupyter_server.base.handlers import JupyterHandler
from jupyter_server.extension.handler import (
    ExtensionHandlerJinjaMixin,
    ExtensionHandlerMixin,
)
from jupyter_server.utils import url_path_join as ujoin
from jupyterlab.commands import get_app_dir
from jupyterlab_server import LabServerApp
from nbclassic.shim import NBClassicConfigShimMixin

from euporie_binder import __version__

HERE = os.path.dirname(__file__)
app_dir = get_app_dir()


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


class EuporieBinderApp(NBClassicConfigShimMixin, LabServerApp):

    name = __name__
    app_name = "Euporie Online"
    description = "A full-screen terminal for demonstrating command line programs"
    version = __version__
    app_version = __version__
    app_url = "euporie_binder.app"
    extension_url = "/euporie"
    default_url = "/euporie"
    load_other_extensions = False
    app_dir = app_dir
    # app_settings_dir = pjoin(app_dir, "settings")
    # schemas_dir = pjoin(app_dir, "schemas")
    # themes_dir = pjoin(app_dir, "themes")
    # user_settings_dir = get_user_settings_dir()

    def initialize_handlers(self):
        super().initialize_handlers()
        self.handlers.append(("/euporie", Handler))

    def initialize_templates(self):
        super().initialize_templates()
        self.static_dir = os.path.join(HERE, "static")
        self.templates_dir = os.path.join(HERE, "templates")
        self.static_paths = [self.static_dir]
        self.template_paths = [self.templates_dir]
