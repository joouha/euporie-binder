import { PageConfig, URLExt } from "@jupyterlab/coreutils";

(window as any).__webpack_public_path__ = URLExt.join(
  PageConfig.getBaseUrl(),
  "/"
);

import "@jupyterlab/application/style/index.css";
import "@jupyterlab/terminal/style/index.css";
import "@jupyterlab/theme-light-extension/style/theme.css";
import "../package/index.css";

import { TerminalManager } from "@jupyterlab/services";
import { Terminal as TerminalNS } from "@jupyterlab/services";
import {
  ITranslator,
  nullTranslator,
  TranslationBundle,
} from "@jupyterlab/translation";
import { Platform } from "@lumino/domutils";
import { Message, MessageLoop } from "@lumino/messaging";
import { Widget } from "@lumino/widgets";
import { ITerminal } from "@jupyterlab/terminal";

import { Terminal as Xterm, ITheme } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { ImageAddon, IImageAddonOptions } from "xterm-addon-image";
import { WebLinksAddon } from "xterm-addon-web-links";
import { CanvasAddon } from "xterm-addon-canvas";
import { WebglAddon } from "xterm-addon-webgl";

// Define xterm-addon-image worker location in the app
const WORKER_PATH = "static/jupyter_euporie.app/xterm-addon-image-worker.js";

// Terminal theme to use
const default_theme: ITheme = {
  foreground: "#fcfcfc",
  background: "#232627",

  cursor: "#616161", // md-grey-700
  cursorAccent: "#F5F5F5", // md-grey-100
  selectionBackground: "rgba(97, 97, 97, 0.3)", // md-grey-700

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

// A widget which manages a terminal session.
export class Terminal extends Widget implements ITerminal.ITerminal {
  // Construct a new terminal widget.
  constructor(
    session: TerminalNS.ITerminalConnection,
    options: Partial<ITerminal.IOptions> = {},
    translator?: ITranslator
  ) {
    super();
    translator = translator || nullTranslator;
    this._trans = translator.load("jupyterlab");
    this.session = session;

    // Initialize settings.
    this._options = {
      ...ITerminal.defaultOptions,
      ...options,
    };

    // Create the xterm.
    this._term = new Xterm({
      fontFamily:
        '"JetBrains Mono", "Fira Code", "JuliaMono", "Meslo", Menlo, Consolas, "DejaVu Sans Mono", monospace',
      fontSize: 16,
      theme: default_theme,
      allowProposedApi: true,
    });

    // Load addons
    this._term.loadAddon(
      new ImageAddon(WORKER_PATH, { sixelSupport: true } as IImageAddonOptions)
    );
    this._term.loadAddon(new WebLinksAddon());
    this._fitAddon = new FitAddon();
    this._term.loadAddon(this._fitAddon);

    this._initializeTerm();

    this.id = `jp-Terminal-0`;
    this.title.label = this._trans.__("Terminal");

    session.messageReceived.connect(this._onMessage, this);
    session.disposed.connect(() => {
      if (this.getOption("closeOnExit")) {
        this.dispose();
      }
    }, this);

    if (session.connectionStatus === "connected") {
      this._initialConnection();
    } else {
      session.connectionStatusChanged.connect(this._initialConnection, this);
    }
  }

  private _initialConnection() {
    if (this.isDisposed) {
      return;
    }

    if (this.session.connectionStatus !== "connected") {
      return;
    }

    this.title.label = this._trans.__("Terminal %1", this.session.name);
    this._setSessionSize();
    if (this._options.initialCommand) {
      this.session.send({
        type: "stdin",
        content: [this._options.initialCommand + "\r"],
      });
    }

    // Only run this initial connection logic once.
    this.session.connectionStatusChanged.disconnect(
      this._initialConnection,
      this
    );
  }

  // The terminal session associated with the widget.
  readonly session: TerminalNS.ITerminalConnection;

  // Get a config option for the terminal.
  getOption<K extends keyof ITerminal.IOptions>(
    option: K
  ): ITerminal.IOptions[K] {
    return this._options[option];
  }

  // Set a config option for the terminal.
  setOption<K extends keyof ITerminal.IOptions>(
    option: K,
    value: ITerminal.IOptions[K]
  ): void {}

  // Dispose of the resources held by the terminal widget.
  dispose(): void {
    if (!this.session.isDisposed) {
      if (this.getOption("shutdownOnClose")) {
        this.session.shutdown().catch((reason) => {
          console.error(`Terminal not shut down: ${reason}`);
        });
      }
    }
    this._term.dispose();
    super.dispose();
  }

  // Refresh the terminal session.
  async refresh(): Promise<void> {
    if (!this.isDisposed) {
      await this.session.reconnect();
      this._term.clear();
    }
  }

  // Process a message sent to the widget.
  processMessage(msg: Message): void {
    super.processMessage(msg);
    switch (msg.type) {
      case "fit-request":
        this.onFitRequest(msg);
        break;
      default:
        break;
    }
  }

  // Set the size of the terminal when attached if dirty.
  protected onAfterAttach(msg: Message): void {
    this.update();
  }
  protected onAfterShow(msg: Message): void {
    this.update();
  }
  // On resize, use the computed row and column sizes to resize the terminal.
  protected onResize(msg: Widget.ResizeMessage): void {
    this._offsetWidth = msg.width;
    this._offsetHeight = msg.height;
    this._needsResize = true;
    this.update();
  }

  // A message handler invoked on an `'update-request'` message.
  protected onUpdateRequest(msg: Message): void {
    if (!this.isVisible || !this.isAttached) {
      return;
    }

    // Open the terminal if necessary.
    if (!this._termOpened) {
      this._term.open(this.node);
      this._termOpened = true;

      // Load addons after terminal is opened
      this._term.loadAddon(new CanvasAddon());
      this._term.loadAddon(new WebglAddon());
    }

    if (this._needsResize) {
      this._resizeTerminal();
    }
  }

  // A message handler invoked on an `'fit-request'` message.
  protected onFitRequest(msg: Message): void {
    const resize = Widget.ResizeMessage.UnknownSize;
    MessageLoop.sendMessage(this, resize);
  }

  // Handle `'activate-request'` messages.
  protected onActivateRequest(msg: Message): void {
    this._term.focus();
  }

  // Initialize the terminal object.
  private _initializeTerm(): void {
    const term = this._term;
    term.onData((data: string) => {
      if (this.isDisposed) {
        return;
      }
      this.session.send({
        type: "stdin",
        content: [data],
      });
    });

    term.onTitleChange((title: string) => {
      this.title.label = title;
    });

    // Do not add any Ctrl+C/Ctrl+V handling on macOS,
    // where Cmd+C/Cmd+V works as intended.
    if (Platform.IS_MAC) {
      return;
    }

    term.attachCustomKeyEventHandler((event) => {
      if (event.ctrlKey && event.key === "c" && term.hasSelection()) {
        // Return so that the usual OS copy happens
        // instead of interrupt signal.
        return false;
      }

      if (event.ctrlKey && event.key === "v" && this._options.pasteWithCtrlV) {
        // Return so that the usual paste happens.
        return false;
      }

      // Add custom CSI-u key-bindings for c-enter, s-enter & c-s-enter
      if (event.code === "Enter") {
        if (event.ctrlKey) {
          if (event.type === "keypress") {
            this.session.send({ type: "stdin", content: ["\x1b[13;5u"] });
          }
          return false;
        } else if (event.shiftKey) {
          if (event.type === "keypress") {
            this.session.send({ type: "stdin", content: ["\x1b[13;2u"] });
          }
          return false;
        }
      }
      return true;
    });
  }

  // Handle a message from the terminal session.
  private _onMessage(
    sender: TerminalNS.ITerminalConnection,
    msg: TerminalNS.IMessage
  ): void {
    switch (msg.type) {
      case "stdout":
        if (msg.content) {
          this._term.write(msg.content[0] as string);
        }
        break;
      case "disconnect":
        this._term.write("\r\n\r\n[Finished… Term Session]\r\n");
        break;
      default:
        break;
    }
  }

  // Resize the terminal based on computed geometry.
  private _resizeTerminal() {
    if (this._options.autoFit) {
      this._fitAddon.fit();
    }
    if (this._offsetWidth === -1) {
      this._offsetWidth = this.node.offsetWidth;
    }
    if (this._offsetHeight === -1) {
      this._offsetHeight = this.node.offsetHeight;
    }
    this._setSessionSize();
    this._needsResize = false;
  }

  // Set the size of the terminal in the session.
  private _setSessionSize(): void {
    const content = [
      this._term.rows,
      this._term.cols,
      this._offsetHeight,
      this._offsetWidth,
    ];
    if (!this.isDisposed) {
      this.session.send({ type: "set_size", content });
    }
  }

  private readonly _term: Xterm;
  private readonly _fitAddon: FitAddon;
  private _trans: TranslationBundle;
  private _needsResize = true;
  private _termOpened = false;
  private _offsetWidth = -1;
  private _offsetHeight = -1;
  private _options: ITerminal.IOptions;
}

export interface IWindowWithTerminal extends Window {
  term: Terminal;
}
declare let window: IWindowWithTerminal;

async function main(): Promise<void> {
  const manager = new TerminalManager();
  const s1 = await manager.startNew();
  const term = new Terminal(s1, {
    initialCommand: "euporie-notebook ~/introduction.ipynb",
  });
  window.term = term;
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
