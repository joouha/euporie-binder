# -*- coding: utf-8 -*-
"""Define a server extension which runs a terminal for running euporie."""

__version__ = "0.1.2"

from .app import JupyterEuporieApp


# This is needed for jupyter server to know how to load the extension
def _jupyter_server_extension_points():
    return [{"module": __name__, "app": JupyterEuporieApp}]


# This is required for classic notebook compatibility


def load_jupyter_server_extension(serverapp):
    extension = JupyterEuporieApp()
    extension.serverapp = serverapp
    extension.load_config_file()
    extension.update_config(serverapp.config)
    extension.parse_command_line(serverapp.extra_args)
    extension.initialize()
