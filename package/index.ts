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

import { ImageAddon, IImageAddonOptions } from "xterm-addon-image";
import { ITranslator } from "@jupyterlab/translation";
import { TerminalManager } from "@jupyterlab/services";
import { Terminal as JTerminal, ITerminal } from "@jupyterlab/terminal";
import { Terminal as TerminalNS } from "@jupyterlab/services";
import { Widget } from "@lumino/widgets";

const WORKER_PATH = "static/jupyter_euporie.app/xterm-addon-image-worker.js";

class Terminal extends JTerminal {
  constructor(
    session: TerminalNS.ITerminalConnection,
    options: Partial<ITerminal.IOptions> = {},
    translator?: ITranslator
  ) {
    super(session, options, translator);
    // Load sixel xterm extension
    const customSettings: IImageAddonOptions = { sixelSupport: true };
    const imageAddon = new ImageAddon(WORKER_PATH, customSettings);
    this["_term"].loadAddon(imageAddon);
  }
}

async function main(): Promise<void> {
  const manager = new TerminalManager();
  const s1 = await manager.startNew();
  const term = new Terminal(s1, {
    theme: "dark",
    fontFamily:
      '"JetBrains Mono", "Fira Code", "JuliaMono", "Meslo", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    fontSize: 16,
    // lineHeight: 1.0,
    // scrollback: 1000,
    shutdownOnClose: true,
    // cursorBlink: true,
    // screenReaderMode: false,
    // pasteWithCtrlV: true,
    autoFit: true,
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
