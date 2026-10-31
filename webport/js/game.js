/**
 * Main Game Module
 * Initializes WebGL, camera, player, chunk renderer, and game loop
 * Connects to existing networking code
 */
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.gl = null;
        this.camera = null;
        this.player = null;
        this.chunkRenderer = null;
        this.lastTime = 0;
        this.running = false;
        this.chunkWorld = window.chunkWorld || new Map();

        // Make chunkWorld globally available
        window.chunkWorld = this.chunkWorld;
    }

    async init() {
        // Initialize WebGL2
        this.gl = this.canvas.getContext('webgl2', {
            alpha: false,
            depth: true,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false
        });

        if (!this.gl) {
            console.error('[Game] WebGL2 not available, trying WebGL1');
            this.gl = this.canvas.getContext('webgl', {
                alpha: false,
                depth: true
            });
            if (!this.gl) {
                throw new Error('No WebGL context available');
            }
        }

        console.log('[Game] WebGL context initialized:', this.gl.getParameter(this.gl.VERSION));

        // Configure WebGL
        const gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.frontFace(gl.CCW);
        gl.clearColor(0.5, 0.6, 0.7, 1.0); // Sky color

        // Handle resize
        this._resize();
        window.addEventListener('resize', () => this._resize());

        // Initialize camera
        this.camera = new Camera(this.canvas);

        // Initialize chunk renderer
        this.chunkRenderer = new ChunkRenderer(gl, this.camera);

        // Initialize player controller
        this.player = new PlayerController(this.camera, this.chunkWorld);

        // Inject WebGL context into TeaVM GlBridge if available
        this._injectIntoTeaVM();

        // Hook into existing packet handling
        this._hookPacketHandling();

        console.log('[Game] Initialization complete');
        return true;
    }

    _resize() {
        const canvas = this.canvas;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(canvas.clientWidth * dpr);
        canvas.height = Math.floor(canvas.clientHeight * dpr);
        this.gl.viewport(0, 0, canvas.width, canvas.height);

        if (this.camera) {
            this.camera._updateProjection();
        }
    }

    _injectIntoTeaVM() {
        // Expose WebGL context to TeaVM
        window.__mcSetWebGLContext = (context) => {
            console.log('[Game] TeaVM requested WebGL context');
        };

        if (typeof window.GlBridge !== 'undefined' && typeof window.GlBridge.setWebGLContext === 'function') {
            window.GlBridge.setWebGLContext(this.gl);
            console.log('[Game] Injected WebGL context into TeaVM GlBridge');
        }
    }

    _hookPacketHandling() {
        // Hook into the existing handleServerPacket to capture chunk data
        const originalHandleServerPacket = window.handleServerPacket;

        if (originalHandleServerPacket) {
            window.handleServerPacket = (id, data) => {
                // Call original handler
                const result = originalHandleServerPacket(id, data);

                // Intercept Map Chunk packets (0x27)
                if (id === 0x27 && this.chunkRenderer) {
                    // Convert data to Uint8Array if needed
                    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
                    this.chunkRenderer.addChunkPacket(bytes);
                }

                // Intercept Position packets (0x40) to sync player
                if (id === 0x40 && this.player) {
                    // Position packet: x,y,z (3x f64) + yaw,pitch (2x f32) + flags + teleportId
                    if (data.length >= 24) {
                        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
                        const x = view.getFloat64(0, true);
                        const y = view.getFloat64(8, true);
                        const z = view.getFloat64(16, true);
                        this.player.setPosition({ x, y, z });
                    }
                }

                return result;
            };
            console.log('[Game] Hooked into packet handling');
        }
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.lastTime = performance.now();
        this._gameLoop();
        console.log('[Game] Game loop started');
    }

    stop() {
        this.running = false;
    }

    _gameLoop() {
        if (!this.running) return;

        const now = performance.now();
        const dt = Math.min((now - this.lastTime) / 1000, 0.1); // Cap at 100ms
        this.lastTime = now;

        // Update
        this._update(dt);

        // Render
        this._render();

        requestAnimationFrame(() => this._gameLoop());
    }

    _update(dt) {
        // Update camera view matrix
        this.camera.updateViewMatrix();

        // Update player physics
        if (this.player) {
            this.player.update(dt);
        }

        // Send position to server periodically
        this._sendPlayerPosition();
    }

    _sendPlayerPosition() {
        // Throttle position updates
        this._lastPosSend = this._lastPosSend || 0;
        const now = performance.now();
        if (now - this._lastPosSend > 50) { // 20 updates/sec max
            if (typeof window.sendPlayerPosition === 'function' && this.player) {
                // Update the global playerPos that sendPlayerPosition uses
                window.playerPos = this.player.getPosition();
                window.playerAngle = {
                    yaw: this.camera.yaw,
                    pitch: this.camera.pitch
                };
                window.sendPlayerPosition();
            }
            this._lastPosSend = now;
        }
    }

    _render() {
        const gl = this.gl;

        // Clear
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Render chunks
        if (this.chunkRenderer) {
            this.chunkRenderer.render(this.camera.getProjectionViewMatrix());
        }
    }
}

// Auto-initialize when DOM is ready
let gameInstance = null;

async function initGame() {
    try {
        gameInstance = new Game();
        await gameInstance.init();
        gameInstance.start();
        console.log('[Game] Game started successfully');
    } catch (e) {
        console.error('[Game] Failed to initialize:', e);
        updateStatus('Game init failed: ' + e.message, 'error');
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Game, initGame };
} else {
    window.Game = Game;
    window.initGame = initGame;
}