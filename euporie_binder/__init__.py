# -*- coding: utf-8 -*-
__version__ = "0.1.0"

from .app import EuporieBinderApp


# This is needed for jupyter server to know how to load the extension
def _jupyter_server_extension_points():
    return [{"module": __name__, "app": EuporieBinderApp}]


# This is required for classic notebook compatibility


def load_jupyter_server_extension(serverapp):
    extension = EuporieBinderApp()
    extension.serverapp = serverapp
    extension.load_config_file()
    extension.update_config(serverapp.config)
    extension.parse_command_line(serverapp.extra_args)
    extension.initialize()
