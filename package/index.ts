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

import { Widget } from "@lumino/widgets";
import { TerminalManager } from "@jupyterlab/services";
import { Terminal } from "@jupyterlab/terminal";

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
