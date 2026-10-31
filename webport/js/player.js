/**
 * Player Movement System
 * Handles WASD movement, jumping, gravity, and collision detection
 */
class PlayerController {
    constructor(camera, chunkWorld) {
        this.camera = camera;
        this.chunkWorld = chunkWorld; // Map of chunk data for collision

        // Movement state
        this.position = { x: 0, y: 64, z: 0 };
        this.velocity = { x: 0, y: 0, z: 0 };
        this.onGround = false;

        // Physics constants
        this.walkSpeed = 4.3;     // m/s (Minecraft default)
        this.sprintSpeed = 5.6;   // m/s
        this.jumpVelocity = 4.2;  // m/s
        this.gravity = 9.81;      // m/s²
        this.drag = 0.91;         // Air drag
        this.groundDrag = 0.6;    // Ground friction

        // Player bounding box (half-extents)
        this.halfWidth = 0.3;
        this.halfHeight = 0.9;    // Eye height ~1.62, so half = 0.9

        // Input state
        this.input = {
            forward: false,
            back: false,
            left: false,
            right: false,
            jump: false,
            sprint: false
        };

        this._setupInput();
    }

    _setupInput() {
        const keyMap = {
            KeyW: 'forward',
            KeyS: 'back',
            KeyA: 'left',
            KeyD: 'right',
            Space: 'jump',
            ShiftLeft: 'sprint'
        };

        document.addEventListener('keydown', (e) => {
            const action = keyMap[e.code];
            if (action !== undefined) {
                this.input[action] = true;
                e.preventDefault();
            }
        });

        document.addEventListener('keyup', (e) => {
            const action = keyMap[e.code];
            if (action !== undefined) {
                this.input[action] = false;
            }
        });
    }

    /**
     * Check if a block at the given coordinates is solid
     * @param {number} x - World X coordinate
     * @param {number} y - World Y coordinate
     * @param {number} z - World Z coordinate
     * @returns {boolean} True if block is solid
     */
    isBlockSolid(x, y, z) {
        const chunkX = Math.floor(x / 16);
        const chunkZ = Math.floor(z / 16);
        const localX = ((x % 16) + 16) % 16;
        const localY = Math.floor(y);
        const localZ = ((z % 16) + 16) % 16;

        const chunkKey = `${chunkX},${chunkZ}`;
        const chunk = this.chunkWorld.get(chunkKey);

        if (!chunk || !chunk.sections) return false;

        const sectionY = Math.floor(localY / 16);
        const section = chunk.sections[sectionY];

        if (!section || !section.blockStates) return false;

        const blockIndex = (localY % 16) * 256 + localZ * 16 + localX;
        const blockState = section.blockStates[blockIndex];

        // Air is 0, everything else is solid for now
        return blockState !== undefined && blockState !== 0;
    }

    /**
     * Check collision for AABB at given position
     * @param {Object} pos - Position {x, y, z}
     * @returns {Object} Collision info {x, y, z} booleans
     */
    checkCollision(pos) {
        const hw = this.halfWidth;
        const hh = this.halfHeight;

        // Check 8 corners of the bounding box
        const corners = [
            [pos.x - hw, pos.y - hh, pos.z - hw],
            [pos.x + hw, pos.y - hh, pos.z - hw],
            [pos.x - hw, pos.y - hh, pos.z + hw],
            [pos.x + hw, pos.y - hh, pos.z + hw],
            [pos.x - hw, pos.y + hh, pos.z - hw],
            [pos.x + hw, pos.y + hh, pos.z - hw],
            [pos.x - hw, pos.y + hh, pos.z + hw],
            [pos.x + hw, pos.y + hh, pos.z + hw],
        ];

        let collisionX = false;
        let collisionY = false;
        let collisionZ = false;

        for (const [cx, cy, cz] of corners) {
            if (this.isBlockSolid(cx, cy, cz)) {
                // Determine which face we're colliding with
                if (Math.abs(cx - pos.x) > Math.abs(cy - pos.y) && Math.abs(cx - pos.x) > Math.abs(cz - pos.z)) {
                    collisionX = true;
                }
                if (Math.abs(cy - pos.y) > Math.abs(cx - pos.x) && Math.abs(cy - pos.y) > Math.abs(cz - pos.z)) {
                    collisionY = true;
                }
                if (Math.abs(cz - pos.z) > Math.abs(cx - pos.x) && Math.abs(cz - pos.z) > Math.abs(cy - pos.y)) {
                    collisionZ = true;
                }
            }
        }

        return { collisionX, collisionY, collisionZ };
    }

    /**
     * Update player physics for one frame
     * @param {number} dt - Delta time in seconds
     */
    update(dt) {
        // Calculate movement direction from input
        const yaw = this.camera.yaw;
        const forward = (this.input.forward ? 1 : 0) - (this.input.back ? 1 : 0);
        const right = (this.input.right ? 1 : 0) - (this.input.left ? 1 : 0);

        let moveX = 0;
        let moveZ = 0;

        if (forward !== 0 || right !== 0) {
            const speed = this.input.sprint ? this.sprintSpeed : this.walkSpeed;

            // Forward vector (in XZ plane)
            const fx = Math.sin(yaw);
            const fz = -Math.cos(yaw);

            // Right vector (perpendicular to forward)
            const rx = Math.cos(yaw);
            const rz = Math.sin(yaw);

            moveX = fx * forward + rx * right;
            moveZ = fz * forward + rz * right;

            // Normalize diagonal movement
            const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
            if (len > 0) {
                moveX /= len;
                moveZ /= len;
            }

            moveX *= speed;
            moveZ *= speed;
        }

        // Apply horizontal acceleration
        const accel = this.onGround ? 0.15 : 0.02; // Ground vs air acceleration
        this.velocity.x += moveX * accel * dt * 60;
        this.velocity.z += moveZ * accel * dt * 60;

        // Apply drag
        const drag = this.onGround ? this.groundDrag : this.drag;
        this.velocity.x *= Math.pow(drag, dt * 60);
        this.velocity.z *= Math.pow(drag, dt * 60);

        // Vertical physics
        if (this.onGround && this.input.jump) {
            this.velocity.y = this.jumpVelocity;
            this.onGround = false;
        }

        // Apply gravity
        this.velocity.y -= this.gravity * dt;

        // Calculate new position
        const newPos = {
            x: this.position.x + this.velocity.x * dt,
            y: this.position.y + this.velocity.y * dt,
            z: this.position.z + this.velocity.z * dt
        };

        // Check collisions axis by axis
        // X axis
        const testX = { x: newPos.x, y: this.position.y, z: this.position.z };
        const collX = this.checkCollision(testX);
        if (!collX.collisionX) {
            this.position.x = newPos.x;
        } else {
            this.velocity.x = 0;
        }

        // Y axis
        const testY = { x: this.position.x, y: newPos.y, z: this.position.z };
        const collY = this.checkCollision(testY);
        if (!collY.collisionY) {
            this.position.y = newPos.y;
            this.onGround = false;
        } else {
            this.velocity.y = 0;
            if (this.velocity.y < 0) {
                this.onGround = true;
            }
        }

        // Z axis
        const testZ = { x: this.position.x, y: this.position.y, z: newPos.z };
        const collZ = this.checkCollision(testZ);
        if (!collZ.collisionZ) {
            this.position.z = newPos.z;
        } else {
            this.velocity.z = 0;
        }

        // Update camera position (eye level)
        this.camera.position.x = this.position.x;
        this.camera.position.y = this.position.y + this.halfHeight; // Eye height
        this.camera.position.z = this.position.z;
    }

    /**
     * Get current position for sending to server
     * @returns {Object} {x, y, z}
     */
    getPosition() {
        return { ...this.position };
    }

    /**
     * Set position (used when server sends Position packet)
     * @param {Object} pos - {x, y, z}
     */
    setPosition(pos) {
        this.position = { ...pos };
        this.camera.position.x = pos.x;
        this.camera.position.y = pos.y + this.halfHeight;
        this.camera.position.z = pos.z;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlayerController;
} else {
    window.PlayerController = PlayerController;
}