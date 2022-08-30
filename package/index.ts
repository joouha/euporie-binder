// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { PageConfig, URLExt } from "@jupyterlab/coreutils";
(window as any).__webpack_public_path__ = URLExt.join(
  PageConfig.getBaseUrl(),
  "/"
);

import "@jupyterlab/application/style/index.css";
import "@jupyterlab/terminal/style/index.css";
import "@jupyterlab/theme-light-extension/style/theme.css";
import "../package/index.css";

import { ITranslator } from "@jupyterlab/translation";
//import { Message } from '@lumino/messaging';
import { TerminalManager } from "@jupyterlab/services";
import { Terminal as JTerminal, ITerminal } from "@jupyterlab/terminal";
import { Terminal as TerminalNS } from "@jupyterlab/services";
import { Widget } from "@lumino/widgets";

import { ITheme } from "xterm";

import { ImageAddon, IImageAddonOptions } from "xterm-addon-image";
import { WebLinksAddon } from "xterm-addon-web-links";
//import { CanvasAddon } from 'xterm-addon-canvas';
//import { WebglAddon } from 'xterm-addon-webgl';

const WORKER_PATH = "static/jupyter_euporie.app/xterm-addon-image-worker.js";

const theme: ITheme = {
  foreground: "#fcfcfc",
  background: "#232627",

  cursor: "#616161", // md-grey-700
  cursorAccent: "#F5F5F5", // md-grey-100
  selection: "rgba(97, 97, 97, 0.3)", // md-grey-700

  black: "#000000",
  red: "#cc0403",
  green: "#19cb00",
  yellow: "#cecb00",
  blue: "#0d73cc",
  magenta: "#cb1ed1",
  cyan: "#0dcdcd",
  white: "#dddddd",

  brightBlack: "#767676",
  brightRed: "#f2201f",
  brightGreen: "#23fd00",
  brightYellow: "#fffd00",
  brightBlue: "#1a8fff",
  brightMagenta: "#fd28ff",
  brightCyan: "#14ffff",
  brightWhite: "#ffffff",
};

class Terminal extends JTerminal {
  //protected webgl_addon: WebglAddon;
  //protected canvas_addon: CanvasAddon;

  constructor(
    session: TerminalNS.ITerminalConnection,
    options: Partial<ITerminal.IOptions> = {},
    translator?: ITranslator
  ) {
    super(session, options, translator);
    const xterm = this["_term"];

    // Set custom color theme
    xterm.setOption("theme", theme);

    // Add custom CSI-u key-bindings for c-enter, s-enter & c-s-enter
    xterm.attachCustomKeyEventHandler((e: KeyboardEvent) => {
      if (e.code === "Enter") {
        if (e.ctrlKey) {
          if (e.type === "keypress") {
            this.session.send({ type: "stdin", content: ["\x1b[13;5u"] });
          }
          return false;
        } else if (e.shiftKey) {
          if (e.type === "keypress") {
            this.session.send({ type: "stdin", content: ["\x1b[13;2u"] });
          }
          return false;
        }
      }
      return true;
    });

    // Load addons
    // Sixel image addon
    const customSettings: IImageAddonOptions = { sixelSupport: true };
    xterm.loadAddon(new ImageAddon(WORKER_PATH, customSettings));
    // Weblinks addon
    xterm.loadAddon(new WebLinksAddon());
    // Canvas renderers
    //this.canvas_addon = new CanvasAddon();
    //this.webgl_addon = new WebglAddon();
  }

  /*
  protected onUpdateRequest(msg: Message): void {
    super.onUpdateRequest(msg);
    if (this["_termOpened"]) {

      this["_term"].loadAddon(this.canvas_addon);
      this["_term"].loadAddon(this.webgl_addon);
    }
  }
  */
}

async function main(): Promise<void> {
  const manager = new TerminalManager();
  const s1 = await manager.startNew();
  const term = new Terminal(s1, {
    theme: "dark",
    fontFamily:
      '"JetBrains Mono", "Fira Code", "JuliaMono", "Meslo", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    fontSize: 16,
    shutdownOnClose: true,
    autoFit: true,
    initialCommand: "euporie-notebook ~/introduction.ipynb",
    // lineHeight: 1.0,
    // scrollback: 1000,
    // cursorBlink: true,
    // screenReaderMode: false,
    // pasteWithCtrlV: true,
    // macOptionIsMeta: false
  });
  term.title.closable = false;
  term.id = "main";

  // Handle resize events.
  window.addEventListener("resize", () => {
    term.fit();
  });

  // Attach the terminal to the dom.
  Widget.attach(term, document.body);
}

window.addEventListener("load", main);
