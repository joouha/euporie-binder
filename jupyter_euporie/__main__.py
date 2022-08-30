# -*- coding: utf-8 -*-
"""An app for running a stand-alone "terminal"."""

if __name__ == "__main__":
    from .app import JupyterEuporieApp

    JupyterEuporieApp.launch_instance()
