/*! For license information please see xterm-addon-image-worker.js.LICENSE.txt */
!(function (A, I) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = I();
  else if ("function" == typeof define && define.amd) define([], I);
  else {
    var g = I();
    for (var Q in g) ("object" == typeof exports ? exports : A)[Q] = g[Q];
  }
})(self, function () {
  return (() => {
    "use strict";
    var A = {
        477: (A, I) => {
          function g(A) {
            return 255 & A;
          }
          function Q(A) {
            return (A >>> 8) & 255;
          }
          function B(A) {
            return (A >>> 16) & 255;
          }
          function C(A, I, g, Q = 255) {
            return (
              (((255 & Q) << 24) |
                ((255 & g) << 16) |
                ((255 & I) << 8) |
                (255 & A)) >>>
              0
            );
          }
          function i(A, I, g) {
            return Math.max(A, Math.min(g, I));
          }
          function t(A, I, g) {
            return (
              g < 0 && (g += 1),
              g > 1 && (g -= 1),
              6 * g < 1
                ? I + 6 * (A - I) * g
                : 2 * g < 1
                ? A
                : 3 * g < 2
                ? I + (A - I) * (4 - 6 * g)
                : I
            );
          }
          function E(A, I, g) {
            return (
              (4278190080 |
                (Math.round((g / 100) * 255) << 16) |
                (Math.round((I / 100) * 255) << 8) |
                Math.round((A / 100) * 255)) >>>
              0
            );
          }
          Object.defineProperty(I, "__esModule", { value: !0 }),
            (I.DEFAULT_FOREGROUND = I.DEFAULT_BACKGROUND = I.PALETTE_ANSI_256 = I.PALETTE_VT340_GREY = I.PALETTE_VT340_COLOR = I.normalizeHLS = I.normalizeRGB = I.nearestColorIndex = I.fromRGBA8888 = I.toRGBA8888 = I.alpha = I.blue = I.green = I.red = I.BIG_ENDIAN = void 0),
            (I.BIG_ENDIAN =
              255 === new Uint8Array(new Uint32Array([4278190080]).buffer)[0]),
            I.BIG_ENDIAN &&
              console.warn(
                "BE platform detected. This version of node-sixel works only on LE properly."
              ),
            (I.red = g),
            (I.green = Q),
            (I.blue = B),
            (I.alpha = function (A) {
              return (A >>> 24) & 255;
            }),
            (I.toRGBA8888 = C),
            (I.fromRGBA8888 = function (A) {
              return [255 & A, (A >> 8) & 255, (A >> 16) & 255, A >>> 24];
            }),
            (I.nearestColorIndex = function (A, I) {
              const C = g(A),
                i = Q(A),
                t = B(A);
              let E = Number.MAX_SAFE_INTEGER,
                e = -1;
              for (let A = 0; A < I.length; ++A) {
                const g = C - I[A][0],
                  Q = i - I[A][1],
                  B = t - I[A][2],
                  s = g * g + Q * Q + B * B;
                if (!s) return A;
                s < E && ((E = s), (e = A));
              }
              return e;
            }),
            (I.normalizeRGB = E),
            (I.normalizeHLS = function (A, I, g) {
              return (function (A, I, g) {
                if (!g) {
                  const A = Math.round(255 * I);
                  return C(A, A, A);
                }
                const Q = I < 0.5 ? I * (1 + g) : I + g - I * g,
                  B = 2 * I - Q;
                return C(
                  i(0, 255, Math.round(255 * t(Q, B, A + 1 / 3))),
                  i(0, 255, Math.round(255 * t(Q, B, A))),
                  i(0, 255, Math.round(255 * t(Q, B, A - 1 / 3)))
                );
              })((A + 240) / 360, I / 100, g / 100);
            }),
            (I.PALETTE_VT340_COLOR = new Uint32Array([
              E(0, 0, 0),
              E(20, 20, 80),
              E(80, 13, 13),
              E(20, 80, 20),
              E(80, 20, 80),
              E(20, 80, 80),
              E(80, 80, 20),
              E(53, 53, 53),
              E(26, 26, 26),
              E(33, 33, 60),
              E(60, 26, 26),
              E(33, 60, 33),
              E(60, 33, 60),
              E(33, 60, 60),
              E(60, 60, 33),
              E(80, 80, 80),
            ])),
            (I.PALETTE_VT340_GREY = new Uint32Array([
              E(0, 0, 0),
              E(13, 13, 13),
              E(26, 26, 26),
              E(40, 40, 40),
              E(6, 6, 6),
              E(20, 20, 20),
              E(33, 33, 33),
              E(46, 46, 46),
              E(0, 0, 0),
              E(13, 13, 13),
              E(26, 26, 26),
              E(40, 40, 40),
              E(6, 6, 6),
              E(20, 20, 20),
              E(33, 33, 33),
              E(46, 46, 46),
            ])),
            (I.PALETTE_ANSI_256 = (() => {
              const A = [
                  C(0, 0, 0),
                  C(205, 0, 0),
                  C(0, 205, 0),
                  C(205, 205, 0),
                  C(0, 0, 238),
                  C(205, 0, 205),
                  C(0, 250, 205),
                  C(229, 229, 229),
                  C(127, 127, 127),
                  C(255, 0, 0),
                  C(0, 255, 0),
                  C(255, 255, 0),
                  C(92, 92, 255),
                  C(255, 0, 255),
                  C(0, 255, 255),
                  C(255, 255, 255),
                ],
                I = [0, 95, 135, 175, 215, 255];
              for (let g = 0; g < 6; ++g)
                for (let Q = 0; Q < 6; ++Q)
                  for (let B = 0; B < 6; ++B) A.push(C(I[g], I[Q], I[B]));
              for (let I = 8; I <= 238; I += 10) A.push(C(I, I, I));
              return new Uint32Array(A);
            })()),
            (I.DEFAULT_BACKGROUND = C(0, 0, 0, 255)),
            (I.DEFAULT_FOREGROUND = C(255, 255, 255, 255));
        },
        710: (A, I, g) => {
          Object.defineProperty(I, "__esModule", { value: !0 }),
            (I.decodeAsync = I.decode = I.Decoder = I.DecoderAsync = void 0);
          const Q = g(477),
            B = g(343),
            C = (function (A) {
              if ("undefined" != typeof Buffer) return Buffer.from(A, "base64");
              const I = atob(A),
                g = new Uint8Array(I.length);
              for (let A = 0; A < g.length; ++A) g[A] = I.charCodeAt(A);
              return g;
            })(B.LIMITS.BYTES);
          let i;
          const t = new Uint32Array();
          class E {
            constructor() {
              (this.bandHandler = (A) => 1), (this.modeHandler = (A) => 1);
            }
            handle_band(A) {
              return this.bandHandler(A);
            }
            mode_parsed(A) {
              return this.modeHandler(A);
            }
          }
          const e = {
            memoryLimit: 134217728,
            sixelColor: Q.DEFAULT_FOREGROUND,
            fillColor: Q.DEFAULT_BACKGROUND,
            palette: Q.PALETTE_VT340_COLOR,
            paletteLimit: B.LIMITS.PALETTE_SIZE,
            truncate: !0,
          };
          function s(A) {
            const I = new E(),
              g = {
                env: {
                  handle_band: I.handle_band.bind(I),
                  mode_parsed: I.mode_parsed.bind(I),
                },
              };
            return WebAssembly.instantiate(i || C, g).then(
              (g) => ((i = i || g.module), new D(A, g.instance || g, I))
            );
          }
          I.DecoderAsync = s;
          class D {
            constructor(A, I, g) {
              if (
                ((this._PIXEL_OFFSET = B.LIMITS.MAX_WIDTH + 4),
                (this._canvas = t),
                (this._bandWidths = []),
                (this._maxWidth = 0),
                (this._minWidth = B.LIMITS.MAX_WIDTH),
                (this._lastOffset = 0),
                (this._currentHeight = 0),
                (this._opts = Object.assign({}, e, A)),
                this._opts.paletteLimit > B.LIMITS.PALETTE_SIZE)
              )
                throw new Error(
                  `DecoderOptions.paletteLimit must not exceed ${B.LIMITS.PALETTE_SIZE}`
                );
              if (I)
                (g.bandHandler = this._handle_band.bind(this)),
                  (g.modeHandler = this._initCanvas.bind(this));
              else {
                const A = i || (i = new WebAssembly.Module(C));
                I = new WebAssembly.Instance(A, {
                  env: {
                    handle_band: this._handle_band.bind(this),
                    mode_parsed: this._initCanvas.bind(this),
                  },
                });
              }
              (this._instance = I),
                (this._wasm = this._instance.exports),
                (this._chunk = new Uint8Array(
                  this._wasm.memory.buffer,
                  this._wasm.get_chunk_address(),
                  B.LIMITS.CHUNK_SIZE
                )),
                (this._states = new Uint32Array(
                  this._wasm.memory.buffer,
                  this._wasm.get_state_address(),
                  12
                )),
                (this._palette = new Uint32Array(
                  this._wasm.memory.buffer,
                  this._wasm.get_palette_address(),
                  B.LIMITS.PALETTE_SIZE
                )),
                this._palette.set(this._opts.palette),
                (this._pSrc = new Uint32Array(
                  this._wasm.memory.buffer,
                  this._wasm.get_p0_address()
                )),
                this._wasm.init(
                  Q.DEFAULT_FOREGROUND,
                  0,
                  this._opts.paletteLimit,
                  0
                );
            }
            get _fillColor() {
              return this._states[0];
            }
            get _truncate() {
              return this._states[8];
            }
            get _rasterWidth() {
              return this._states[6];
            }
            get _rasterHeight() {
              return this._states[7];
            }
            get _width() {
              return this._states[2] ? this._states[2] - 4 : 0;
            }
            get _height() {
              return this._states[3];
            }
            get _level() {
              return this._states[9];
            }
            get _mode() {
              return this._states[10];
            }
            get _paletteLimit() {
              return this._states[11];
            }
            _initCanvas(A) {
              if (2 === A) {
                const A = this.width * this.height;
                if (A > this._canvas.length) {
                  if (this._opts.memoryLimit && 4 * A > this._opts.memoryLimit)
                    throw (
                      (this.release(), new Error("image exceeds memory limit"))
                    );
                  this._canvas = new Uint32Array(A);
                }
                this._maxWidth = this._width;
              } else if (1 === A)
                if (2 === this._level) {
                  const A =
                    Math.min(this._rasterWidth, B.LIMITS.MAX_WIDTH) *
                    this._rasterHeight;
                  if (A > this._canvas.length) {
                    if (
                      this._opts.memoryLimit &&
                      4 * A > this._opts.memoryLimit
                    )
                      throw (
                        (this.release(),
                        new Error("image exceeds memory limit"))
                      );
                    this._canvas = new Uint32Array(A);
                  }
                } else
                  this._canvas.length < 65536 &&
                    (this._canvas = new Uint32Array(65536));
              return 0;
            }
            _realloc(A, I) {
              const g = A + I;
              if (g > this._canvas.length) {
                if (this._opts.memoryLimit && 4 * g > this._opts.memoryLimit)
                  throw (
                    (this.release(), new Error("image exceeds memory limit"))
                  );
                const A = new Uint32Array(65536 * Math.ceil(g / 65536));
                A.set(this._canvas), (this._canvas = A);
              }
            }
            _handle_band(A) {
              const I = this._PIXEL_OFFSET;
              let g = this._lastOffset;
              if (2 === this._mode) {
                let Q = this.height - this._currentHeight,
                  B = 0;
                for (; B < 6 && Q > 0; )
                  this._canvas.set(
                    this._pSrc.subarray(I * B, I * B + A),
                    g + A * B
                  ),
                    B++,
                    Q--;
                (this._lastOffset += A * B), (this._currentHeight += B);
              } else if (1 === this._mode) {
                this._realloc(g, 6 * A),
                  (this._maxWidth = Math.max(this._maxWidth, A)),
                  (this._minWidth = Math.min(this._minWidth, A));
                for (let Q = 0; Q < 6; ++Q)
                  this._canvas.set(
                    this._pSrc.subarray(I * Q, I * Q + A),
                    g + A * Q
                  );
                this._bandWidths.push(A),
                  (this._lastOffset += 6 * A),
                  (this._currentHeight += 6);
              }
              return 0;
            }
            get width() {
              return 1 !== this._mode
                ? this._width
                : Math.max(this._maxWidth, this._wasm.current_width());
            }
            get height() {
              return 1 !== this._mode
                ? this._height
                : this._wasm.current_width()
                ? 6 * this._bandWidths.length + this._wasm.current_height()
                : 6 * this._bandWidths.length;
            }
            get palette() {
              return this._palette.subarray(0, this._paletteLimit);
            }
            get memoryUsage() {
              return (
                this._canvas.byteLength +
                this._wasm.memory.buffer.byteLength +
                8 * this._bandWidths.length
              );
            }
            get properties() {
              return {
                width: this.width,
                height: this.height,
                mode: this._mode,
                level: this._level,
                truncate: !!this._truncate,
                paletteLimit: this._paletteLimit,
                fillColor: this._fillColor,
                memUsage: this.memoryUsage,
                rasterAttributes: {
                  numerator: this._states[4],
                  denominator: this._states[5],
                  width: this._rasterWidth,
                  height: this._rasterHeight,
                },
              };
            }
            init(
              A = this._opts.fillColor,
              I = this._opts.palette,
              g = this._opts.paletteLimit,
              Q = this._opts.truncate
            ) {
              this._wasm.init(this._opts.sixelColor, A, g, Q ? 1 : 0),
                I && this._palette.set(I.subarray(0, B.LIMITS.PALETTE_SIZE)),
                (this._bandWidths.length = 0),
                (this._maxWidth = 0),
                (this._minWidth = B.LIMITS.MAX_WIDTH),
                (this._lastOffset = 0),
                (this._currentHeight = 0);
            }
            decode(A, I = 0, g = A.length) {
              let Q = I;
              for (; Q < g; ) {
                const I = Math.min(g - Q, B.LIMITS.CHUNK_SIZE);
                this._chunk.set(A.subarray(Q, (Q += I))),
                  this._wasm.decode(0, I);
              }
            }
            decodeString(A, I = 0, g = A.length) {
              let Q = I;
              for (; Q < g; ) {
                const I = Math.min(g - Q, B.LIMITS.CHUNK_SIZE);
                for (let g = 0, B = Q; g < I; ++g, ++B)
                  this._chunk[g] = A.charCodeAt(B);
                (Q += I), this._wasm.decode(0, I);
              }
            }
            get data32() {
              if (0 === this._mode || !this.width || !this.height) return t;
              const A = this._wasm.current_width();
              if (2 === this._mode) {
                let I = this.height - this._currentHeight;
                if (I > 0) {
                  const g = this._PIXEL_OFFSET;
                  let Q = this._lastOffset,
                    B = 0;
                  for (; B < 6 && I > 0; )
                    this._canvas.set(
                      this._pSrc.subarray(g * B, g * B + A),
                      Q + A * B
                    ),
                      B++,
                      I--;
                  I && this._canvas.fill(this._fillColor, Q + A * B);
                }
                return this._canvas.subarray(0, this.width * this.height);
              }
              if (1 === this._mode) {
                if (this._minWidth === this._maxWidth) {
                  let I = !1;
                  if (A)
                    if (A !== this._minWidth) I = !0;
                    else {
                      const I = this._PIXEL_OFFSET;
                      let g = this._lastOffset;
                      this._realloc(g, 6 * A);
                      for (let Q = 0; Q < 6; ++Q)
                        this._canvas.set(
                          this._pSrc.subarray(I * Q, I * Q + A),
                          g + A * Q
                        );
                    }
                  if (!I)
                    return this._canvas.subarray(0, this.width * this.height);
                }
                const I = new Uint32Array(this.width * this.height);
                I.fill(this._fillColor);
                let g = 0,
                  Q = 0;
                for (let A = 0; A < this._bandWidths.length; ++A) {
                  const B = this._bandWidths[A];
                  for (let A = 0; A < 6; ++A)
                    I.set(this._canvas.subarray(Q, (Q += B)), g),
                      (g += this.width);
                }
                if (A) {
                  const Q = this._PIXEL_OFFSET,
                    B = this._wasm.current_height();
                  for (let C = 0; C < B; ++C)
                    I.set(
                      this._pSrc.subarray(Q * C, Q * C + A),
                      g + this.width * C
                    );
                }
                return I;
              }
              return t;
            }
            get data8() {
              return new Uint8ClampedArray(
                this.data32.buffer,
                0,
                this.width * this.height * 4
              );
            }
            release() {
              (this._canvas = t),
                (this._bandWidths.length = 0),
                (this._maxWidth = 0),
                (this._minWidth = B.LIMITS.MAX_WIDTH),
                this._wasm.init(
                  Q.DEFAULT_FOREGROUND,
                  0,
                  this._opts.paletteLimit,
                  0
                );
            }
          }
          (I.Decoder = D),
            (I.decode = function (A, I) {
              const g = new D(I);
              return (
                g.init(),
                "string" == typeof A ? g.decodeString(A) : g.decode(A),
                {
                  width: g.width,
                  height: g.height,
                  data32: g.data32,
                  data8: g.data8,
                }
              );
            }),
            (I.decodeAsync = async function (A, I) {
              const g = await s(I);
              return (
                g.init(),
                "string" == typeof A ? g.decodeString(A) : g.decode(A),
                {
                  width: g.width,
                  height: g.height,
                  data32: g.data32,
                  data8: g.data8,
                }
              );
            });
        },
        343: (A, I) => {
          Object.defineProperty(I, "__esModule", { value: !0 }),
            (I.LIMITS = void 0),
            (I.LIMITS = {
              CHUNK_SIZE: 16384,
              PALETTE_SIZE: 4096,
              MAX_WIDTH: 16384,
              BYTES:
                "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AEHAiwIgADcDAEG4iwIgADcDAEGwiwIgADcDAEGoiwIgADcDAEGgiwIgADcDAEGYiwIgADcDAEGQiwIgADcDAEGIiwIgADcDAEGAiwIgADcDAEH4igIgADcDAEHwigIgADcDAEHoigIgADcDAEHgigIgADcDAEHYigIgADcDAEHQigIgADcDAEHIigIgADcDAEHAigIgADcDAEG4igIgADcDAEGwigIgADcDAEGoigIgADcDAEGgigIgADcDAEGYigIgADcDAEGQigIgADcDAEGIigIgADcDAEGAigIgADcDAEH4iQIgADcDAEHwiQIgADcDAEHoiQIgADcDAEHgiQIgADcDAEHYiQIgADcDAEHQiQIgADcDAEHIiQIgADcDAEHAiQIgADcDAEG4iQIgADcDAEGwiQIgADcDAEGoCCgCACIEQf8AakGAAW0hCAJAIARBgQFIDQBBASEBIAhBAiAIQQJKG0EBayICQQFxIQMgBEGBAk4EQCACQX5xIQIDQCABQQl0IgdBEHJBoIkCakGwiQJBgAT8CgAAIAdBsI0CakGwiQJBgAT8CgAAIAFBAmohASACQQJrIgINAAsLIANFDQAgAUEJdEEQckGgiQJqQbCJAkGABPwKAAALAkAgBEEBSA0AIAhBASAIQQFKGyIDQQFxIQUCQCADQQFrIgdFBEBBACEBDAELIANB/v///wdxIQJBACEBA0AgAUEJdCIGQRByQbCJBmpBsIkCQYAE/AoAACAGQZAEckGwiQZqQbCJAkGABPwKAAAgAUECaiEBIAJBAmsiAg0ACwsgBQRAIAFBCXRBEHJBsIkGakGwiQJBgAT8CgAACyAEQQFIDQAgA0EBcSEFIAcEfyADQf7///8HcSECQQAhAQNAIAFBCXQiBkEQckHAiQpqQbCJAkGABPwKAAAgBkGQBHJBwIkKakGwiQJBgAT8CgAAIAFBAmohASACQQJrIgINAAsgAUEHdEEEcgVBBAshASAFBEAgAUECdEHAiQpqQbCJAkGABPwKAAALIARBAUgNACADQQFxIQUgBwR/IANB/v///wdxIQJBACEBA0AgAUEJdCIGQRByQdCJDmpBsIkCQYAE/AoAACAGQZAEckHQiQ5qQbCJAkGABPwKAAAgAUECaiEBIAJBAmsiAg0ACyABQQd0QQRyBUEECyEBIAUEQCABQQJ0QdCJDmpBsIkCQYAE/AoAAAsgBEEBSA0AIANBAXEhBSAHBH8gA0H+////B3EhAkEAIQEDQCABQQl0IgZBEHJB4IkSakGwiQJBgAT8CgAAIAZBkARyQeCJEmpBsIkCQYAE/AoAACABQQJqIQEgAkECayICDQALIAFBB3RBBHIFQQQLIQEgBQRAIAFBAnRB4IkSakGwiQJBgAT8CgAACyAEQQFIDQAgA0EBcSEEIAcEfyADQf7///8HcSECQQAhAQNAIAFBCXQiA0EQckHwiRZqQbCJAkGABPwKAAAgA0GQBHJB8IkWakGwiQJBgAT8CgAAIAFBAmohASACQQJrIgINAAsgAUEHdEEEcgVBBAshASAERQ0AIAFBAnRB8IkWakGwiQJBgAT8CgAAC0HUCCAIQQd0QQRyNgIAC58TAgh/AX5B5AgoAgAhA0HgCCgCACECQegIKAIAIQcgAUGQiQFqIglB/wE6AAAgACABSARAIABBkIkBaiEIA0AgAiEEIAhBAWohAQJAIAgtAABB/wBxIgJBMGtBCUsEQCABIQgMAQtB7AgoAgBBAnRB7AhqIgUoAgAhAANAIAUgAiAAQQpsakEwayIANgIAIAEtAAAhAiABQQFqIgghASACQf8AcSICQTBrQQpJDQALCwJAAkACQAJAAkACQAJ/AkAgAkE/ayIAQT9NBEAgBEUNASAEQSFGBEBB8AgoAgAiAUEBIAEbIgQgB2ohAQJAIABFDQAgB0H//wBLDQBBgIABIAdrIAQgAUH//wBLGyEFAkAgAEEBcUUNACAHQQJ0QaCJAmohAiAFIgRBB3EiBgRAA0AgAiADNgIAIAJBBGohAiAEQQFrIQQgBkEBayIGDQALCyAFQQFrQQdJDQADQCACIAM2AhwgAiADNgIYIAIgAzYCFCACIAM2AhAgAiADNgIMIAIgAzYCCCACIAM2AgQgAiADNgIAIAJBIGohAiAEQQhrIgQNAAsLAkAgAEECcUUNACAHQQJ0QbCJBmohAiAFIgRBB3EiBgRAA0AgAiADNgIAIAJBBGohAiAEQQFrIQQgBkEBayIGDQALCyAFQQFrQQdJDQADQCACIAM2AhwgAiADNgIYIAIgAzYCFCACIAM2AhAgAiADNgIMIAIgAzYCCCACIAM2AgQgAiADNgIAIAJBIGohAiAEQQhrIgQNAAsLAkAgAEEEcUUNACAHQQJ0QcCJCmohAiAFIgRBB3EiBgRAA0AgAiADNgIAIAJBBGohAiAEQQFrIQQgBkEBayIGDQALCyAFQQFrQQdJDQADQCACIAM2AhwgAiADNgIYIAIgAzYCFCACIAM2AhAgAiADNgIMIAIgAzYCCCACIAM2AgQgAiADNgIAIAJBIGohAiAEQQhrIgQNAAsLAkAgAEEIcUUNACAHQQJ0QdCJDmohAiAFIgRBB3EiBgRAA0AgAiADNgIAIAJBBGohAiAEQQFrIQQgBkEBayIGDQALCyAFQQFrQQdJDQADQCACIAM2AhwgAiADNgIYIAIgAzYCFCACIAM2AhAgAiADNgIMIAIgAzYCCCACIAM2AgQgAiADNgIAIAJBIGohAiAEQQhrIgQNAAsLAkAgAEEQcUUNACAHQQJ0QeCJEmohAiAFIgRBB3EiBgRAA0AgAiADNgIAIAJBBGohAiAEQQFrIQQgBkEBayIGDQALCyAFQQFrQQdJDQADQCACIAM2AhwgAiADNgIYIAIgAzYCFCACIAM2AhAgAiADNgIMIAIgAzYCCCACIAM2AgQgAiADNgIAIAJBIGohAiAEQQhrIgQNAAsLIABBIHFFDQAgBUEBayEEIAdBAnRB8IkWaiEAIAVBB3EiAgRAA0AgACADNgIAIABBBGohACAFQQFrIQUgAkEBayICDQALCyAEQQdJDQADQCAAIAM2AhwgACADNgIYIAAgAzYCFCAAIAM2AhAgACADNgIMIAAgAzYCCCAAIAM2AgQgACADNgIAIABBIGohACAFQQhrIgUNAAsLIAhBAWoiBSAILQAAQf8AcSICQT9rIgBBP00NAxoMBAsCQEHsCCgCACIFQQFGBEBB8AgoAgAiAUHMCCgCACIESQ0BIAEgBHAhAQwBC0H4CCgCACEEQfQIKAIAIQECQAJAIAVBBUcNACABQQFHDQAgBEHpAk4NBAwBCyAEQeQASg0DQfwIKAIAQeQASg0DQYAJKAIAQeQASg0DCwJAIAFFDQAgAUECSg0AIARB/AgoAgBBgAkoAgAgAUECdEGICGooAgARAgAhBEHwCCgCACIBQcwIKAIAIgVPBH8gASAFcAUgAQtBAnRBkAlqIAQ2AgALQfAIKAIAIgFBzAgoAgAiBEkNACABIARwIQELIAFBAnRBkAlqKAIAIQMMAQsgAkH9AHFBIUcEQCAHIQEgAiEADAQLIARBI0cNBAJAQewIKAIAIgRBAUYEQEHwCCgCACIBQcwIKAIAIgBJDQEgASAAcCEBDAELQfgIKAIAIQFB9AgoAgAhAAJAAkAgBEEFRw0AIABBAUcNACABQekCSA0BDAcLIAFB5ABKDQZB/AgoAgBB5ABKDQZBgAkoAgBB5ABKDQYLAkAgAEUNACAAQQJKDQAgAUH8CCgCAEGACSgCACAAQQJ0QYgIaigCABECACEAQfAIKAIAIgFBzAgoAgAiBE8EfyABIARwBSABC0ECdEGQCWogADYCAAtB8AgoAgAiAUHMCCgCACIASQ0AIAEgAHAhAQsgAUECdEGQCWooAgAhAwwECyAHIQEgCAshBQNAIAFB//8ATQRAIABBAXEgAWxBAnRBoIkCaiADNgIAIABBAXZBAXEgAWxBAnRBsIkGaiADNgIAIABBAnZBAXEgAWxBAnRBwIkKaiADNgIAIABBA3ZBAXEgAWxBAnRB0IkOaiADNgIAIABBBHZBAXEgAWxBAnRB4IkSaiADNgIAIABBBXYgAWxBAnRB8IkWaiADNgIACyABQQFqIQEgBS0AACEAIAVBAWoiBCEFIABB/wBxIgJBP2siAEHAAEkNAAsgBCEFC0EAIQQgBSEIIAEhByACIQAgAkH9AHFBIUYNAQtBBCEHIAQhAiAAQSRrDgoDAgICAgICAgIBAgtB7AhCATcCAAwCC0GoCCgCAEEEaxAABEBB0AhBATYCAA8LAkBBqAgoAgAiBkEFSA0AQaAIKQMAIQogBkEDa0EBdiIBQQdxIQJBACEAIAFBAWtBB08EQCABQfj///8HcSEFA0AgAEEDdCIBQbCJAmogCjcDACABQQhyQbCJAmogCjcDACABQRByQbCJAmogCjcDACABQRhyQbCJAmogCjcDACABQSByQbCJAmogCjcDACABQShyQbCJAmogCjcDACABQTByQbCJAmogCjcDACABQThyQbCJAmogCjcDACAAQQhqIQAgBUEIayIFDQALCyACRQ0AA0AgAEEDdEGwiQJqIAo3AwAgAEEBaiEAIAJBAWsiAg0ACwtBwIkGQbCJAiAGQQJ0IgD8CgAAQdCJCkGwiQIgAPwKAABB4IkOQbCJAiAA/AoAAEHwiRJBsIkCIAD8CgAAQYCKFkGwiQIgAPwKAAAgBCECDAELAkAgAEE7Rw0AQewIKAIAIgBBB0oNAEHsCCAAQQFqNgIAIABBAnRB8AhqQQA2AgALIAEhBwsgCCAJSQ0ACwtB5AggAzYCAEHgCCACNgIAQegIIAc2AgAL4gcCBX8BfgJAQdAIAn8CQAJAIAAgAU4NACABQZCJAWohBiAAQZCJAWohBQNAIAUtAAAiA0H/AHEhAgJAAkACQAJAAkACQAJAQeAIKAIAIgRBIkcEQCAEDQcgAkEiRgRAQewIQgE3AgBB4AhBIjYCAAwICyACQT9rQcAASQ0GIANBIWsiAkEMTQ0BDAULAkAgAkEwayIEQQlNBEBB7AgoAgBBAnRB7AhqIgIgBCACKAIAQQpsajYCAAwBC0HsCCgCACEEIAJBO0YEQCAEQQdKDQFB7AggBEEBajYCACAEQQJ0QfAIakEANgIADAELIARBBEYEQEHECEECNgIAQbAIQfAIKQMANwMAQbgIQfgIKAIAIgI2AgBBvAhB/AgoAgAiBDYCAEHICEECQQFBwAgoAgAiAxs2AgBBrAggBEEAIAMbNgIAQagIIAJBgIABIAJBgIABSBtBBGpBACADGzYCAEHgCEEANgIADAoLIAJBP2tBwABJDQQLIANBIWsiAkEMTQ0BDAILQQEgAnRBjSBxRQ0DDAQLQQEgAnRBjSBxDQELIANBoQFrIgJBDEsNA0EBIAJ0QY0gcUUNAwtBxAhCgYCAgBA3AgBBsAhB8AgoAgBBAEHsCCgCACICQQBKGzYCAEG0CEH0CCgCAEEAIAJBAUobNgIAQbgIQfgIKAIAQQAgAkECShs2AgBB4AhBADYCAEG8CEEANgIADAQLIANBoQFrIgJBDEsNAUEBIAJ0QY0gcUUNAQtBxAhCgYCAgBA3AgBBsAhCADcDAEG4CEIANwMADAMLIAVBAWoiBSAGSQ0ACwsCQEHICCgCAA4DAwEAAQsCQEGoCCgCACIFQQVIDQBBoAgpAwAhByAFQQNrQQF2IgNBB3EhBEEAIQIgA0EBa0EHTwRAIANB+P///wdxIQYDQCACQQN0IgNBsIkCaiAHNwMAIANBCHJBsIkCaiAHNwMAIANBEHJBsIkCaiAHNwMAIANBGHJBsIkCaiAHNwMAIANBIHJBsIkCaiAHNwMAIANBKHJBsIkCaiAHNwMAIANBMHJBsIkCaiAHNwMAIANBOHJBsIkCaiAHNwMAIAJBCGohAiAGQQhrIgYNAAsLIARFDQADQCACQQN0QbCJAmogBzcDACACQQFqIQIgBEEBayIEDQALC0HAiQZBsIkCIAVBAnQiA/wKAABB0IkKQbCJAiAD/AoAAEHgiQ5BsIkCIAP8CgAAQfCJEkGwiQIgA/wKAABBgIoWQbCJAiAD/AoAAEECDAELEAhByAgoAgALEAEiAjYCACACDQAgACABQcgIKAIAQQJ0QYAIaigCABEBAAsLdABB6AhBBDYCAEHkCCAANgIAQewIQgE3AgBBxAhCADcCAEHACCADNgIAQdwIQgA3AgBBqAhCADcDAEGwCEIANwMAQbgIQgA3AwBBzAggAkGAICACQYAgSRs2AgBBoAggAa1CgYCAgBB+NwMAQdAIQQA2AgALIwBB0AgoAgBFBEAgACABQcgIKAIAQQJ0QYAIaigCABEBAAsLWgECfwJAAkACQEHICCgCAEEBaw4CAAECC0HYCEHoCCgCACIAQdgIKAIAIgEgACABShsiAEGAgAEgAEGAgAFIGyIANgIAIABBBGsPC0GoCCgCAEEEayEACyAAC0IBAX8Cf0EGQdwIKAIAIgBBIHENABpBBSAAQRBxDQAaQQQgAEEIcQ0AGkEDIABBBHENABpBAiAAQQFxIABBAnEbCwu9BQEFfQJ/IAJFBEAgAUH/AWxBMmpB5ABtIgBBCHQgAHIgAEEQdHIMAQsgArJDAADIQpUhBiAAQfABarJDAAC0Q5UhBQJ9IAGyQwAAyEKVIgNDAAAAP10EQCADIAZDAACAP5KUDAELIAYgA0MAAIA/IAaTlJILIQcgAyADkiEGAkAgBUOrqqo+kiIEQwAAAABdBEAgBEMAAIA/kiEEDAELIARDAACAP15FDQAgBEMAAIC/kiEECyAGIAeTIQMgBUMAAAAAXSEAAn8CfSADIAcgA5NDAADAQJQgBJSSIARDq6oqPl0NABogByAEQwAAAD9dDQAaIAMgBEOrqio/XUUNABogAyAHIAOTIARDAADAwJRDAACAQJKUkgtDAAB/Q5RDAAAAP5IiBkMAAIBPXSAGQwAAAABgcQRAIAapDAELQQALIQECQCAABEAgBUMAAIA/kiEEDAELIAUiBEMAAIA/XkUNACAFQwAAgL+SIQQLIAVDq6qqvpIiBUMAAAAAXSECAn8CfSADIAcgA5NDAADAQJQgBJSSIARDq6oqPl0NABogByAEQwAAAD9dDQAaIAMgBEOrqio/XUUNABogAyAHIAOTIARDAADAwJRDAACAQJKUkgtDAAB/Q5RDAAAAP5IiBkMAAIBPXSAGQwAAAABgcQRAIAapDAELQQALIQACQCACBEAgBUMAAIA/kiEFDAELIAVDAACAP15FDQAgBUMAAIC/kiEFCwJAIAVDq6oqPl0EQCADIAcgA5NDAADAQJQgBZSSIQcMAQsgBUMAAAA/XQ0AIAVDq6oqP11FBEAgAyEHDAELIAMgByADkyAFQwAAwMCUQwAAgECSlJIhBwsgAEEIdAJ/IAdDAAB/Q5RDAAAAP5IiBkMAAIBPXSAGQwAAAABgcQRAIAapDAELQQALQRB0ciABcgtBgICAeHILNwAgAEH/AWxBMmpB5ABtIAFB/wFsQTJqQeQAbUEIdHIgAkH/AWxBMmpB5ABtQRB0ckGAgIB4cgsEACMACwYAIAAkAAsQACMAIABrQXBxIgAkACAACwsYAQBBgAgLEQEAAAACAAAAAwAAAAQAAAAF",
            });
        },
      },
      I = {};
    function g(Q) {
      var B = I[Q];
      if (void 0 !== B) return B.exports;
      var C = (I[Q] = { exports: {} });
      return A[Q](C, C.exports, g), C.exports;
    }
    var Q = {};
    return (
      (() => {
        var A = Q;
        Object.defineProperty(A, "__esModule", { value: !0 });
        const I = g(710),
          B = g(477),
          C = B.PALETTE_ANSI_256;
        let i;
        C.set(B.PALETTE_VT340_COLOR);
        let t,
          E = !1,
          e = 0;
        self.addEventListener(
          "message",
          function (A) {
            var g;
            const Q = A.data;
            switch (Q.type) {
              case 3:
                E ||
                  (t.decode(
                    new Uint8Array(Q.payload.buffer, 0, Q.payload.length)
                  ),
                  t.height * t.width > e &&
                    ((E = !0),
                    t.release(),
                    console.warn("image worker: pixelLimit exceeded, aborting"),
                    postMessage({ type: 7 }))),
                  postMessage({ type: 6, payload: Q.payload.buffer }, [
                    Q.payload.buffer,
                  ]);
                break;
              case 4:
                if (Q.payload)
                  if (t && t.width && t.height && !E) {
                    const A = t.width,
                      I = t.height,
                      g = A * I * 4;
                    (!i || i.byteLength < g) && (i = new ArrayBuffer(g)),
                      new Uint32Array(i, 0, A * I).set(t.data32),
                      postMessage(
                        {
                          type: 5,
                          payload: { buffer: i, width: A, height: I },
                        },
                        [i]
                      ),
                      (i = void 0),
                      t.memoryUsage > 4194304 && t.release();
                  } else postMessage({ type: 5, payload: null });
                E = !1;
                break;
              case 6:
                i || (i = Q.payload);
                break;
              case 2:
                E = !1;
                const { fillColor: A, limit: B } = Q.payload;
                t.init(A, null, B);
                break;
              case 1:
                (e =
                  (null === (g = Q.options) || void 0 === g
                    ? void 0
                    : g.pixelLimit) || 0),
                  (t = new I.Decoder({ memoryLimit: 4 * e, palette: C })),
                  postMessage({ type: 1, payload: 1, options: null });
            }
          },
          !1
        );
      })(),
      Q
    );
  })();
});
