/**
 * WebGL First-Person Camera
 * Handles projection, view matrix, and pointer-lock mouse look
 */
class Camera {
    constructor(canvas) {
        this.canvas = canvas;
        this.yaw = 0;       // Rotation around Y axis (left/right)
        this.pitch = 0;     // Rotation around X axis (up/down)
        this.position = { x: 0, y: 64, z: 0 };
        this.isLocked = false;
        this.sensitivity = 0.002;

        // WebGL matrices
        this.projectionMatrix = new Float32Array(16);
        this.viewMatrix = new Float32Array(16);
        this.projectionViewMatrix = new Float32Array(16);

        this._setupPointerLock();
        this._setupResize();
        this._updateProjection();
    }

    _setupPointerLock() {
        this.canvas.addEventListener('click', () => {
            this.canvas.requestPointerLock();
        });

        document.addEventListener('pointerlockchange', () => {
            this.isLocked = document.pointerLockElement === this.canvas;
            if (this.isLocked) {
                console.log('[Camera] Pointer locked');
            } else {
                console.log('[Camera] Pointer unlocked');
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isLocked) return;
            this.yaw += e.movementX * this.sensitivity;
            this.pitch += e.movementY * this.sensitivity;
            // Clamp pitch to prevent flipping
            this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));
        });
    }

    _setupResize() {
        window.addEventListener('resize', () => this._updateProjection());
    }

    _updateProjection() {
        const canvas = this.canvas;
        const aspect = canvas.width / canvas.height;
        const fov = Math.PI / 3; // 60 degrees
        const near = 0.1;
        const far = 256.0;

        // Perspective projection matrix
        const f = 1.0 / Math.tan(fov / 2);
        const proj = this.projectionMatrix;
        proj[0] = f / aspect;
        proj[1] = 0;
        proj[2] = 0;
        proj[3] = 0;
        proj[4] = 0;
        proj[5] = f;
        proj[6] = 0;
        proj[7] = 0;
        proj[8] = 0;
        proj[9] = 0;
        proj[10] = (far + near) / (near - far);
        proj[11] = -1;
        proj[12] = 0;
        proj[13] = 0;
        proj[14] = (2 * far * near) / (near - far);
        proj[15] = 0;
    }

    updateViewMatrix() {
        const pos = this.position;
        const pitch = this.pitch;
        const yaw = this.yaw;

        const cosPitch = Math.cos(pitch);
        const sinPitch = Math.sin(pitch);
        const cosYaw = Math.cos(yaw);
        const sinYaw = Math.sin(yaw);

        // Forward vector
        const forwardX = sinYaw * cosPitch;
        const forwardY = sinPitch;
        const forwardZ = -cosYaw * cosPitch;

        // Right vector
        const rightX = cosYaw;
        const rightY = 0;
        const rightZ = sinYaw;

        // Up vector (world up)
        const upX = 0;
        const upY = 1;
        const upZ = 0;

        // View matrix: lookAt(eye, eye + forward, up)
        const fx = pos.x + forwardX;
        const fy = pos.y + forwardY;
        const fz = pos.z + forwardZ;

        // Compute view matrix using lookAt formula
        // zaxis = normalize(eye - target) = -forward
        const zaxisX = -forwardX;
        const zaxisY = -forwardY;
        const zaxisZ = -forwardZ;

        // xaxis = normalize(cross(up, zaxis))
        let xaxisX = upY * zaxisZ - upZ * zaxisY;
        let xaxisY = upZ * zaxisX - upX * zaxisZ;
        let xaxisZ = upX * zaxisY - upY * zaxisX;
        const xlen = Math.sqrt(xaxisX*xaxisX + xaxisY*xaxisY + xaxisZ*xaxisZ);
        xaxisX /= xlen; xaxisY /= xlen; xaxisZ /= xlen;

        // yaxis = cross(zaxis, xaxis)
        const yaxisX = zaxisY * xaxisZ - zaxisZ * xaxisY;
        const yaxisY = zaxisZ * xaxisX - zaxisX * xaxisZ;
        const yaxisZ = zaxisX * xaxisY - zaxisY * xaxisX;

        const view = this.viewMatrix;
        view[0] = xaxisX; view[4] = xaxisY; view[8] = xaxisZ; view[12] = -(xaxisX*pos.x + xaxisY*pos.y + xaxisZ*pos.z);
        view[1] = yaxisX; view[5] = yaxisY; view[9] = yaxisZ; view[13] = -(yaxisX*pos.x + yaxisY*pos.y + yaxisZ*pos.z);
        view[2] = zaxisX; view[6] = zaxisY; view[10] = zaxisZ; view[14] = -(zaxisX*pos.x + zaxisY*pos.y + zaxisZ*pos.z);
        view[3] = 0;      view[7] = 0;      view[11] = 0;      view[15] = 1;

        // Combined projection * view
        this._multiplyMatrices(this.projectionViewMatrix, this.projectionMatrix, this.viewMatrix);
    }

    _multiplyMatrices(out, a, b) {
        // out = a * b (column-major)
        out[0]  = a[0]*b[0]  + a[4]*b[1]  + a[8]*b[2]  + a[12]*b[3];
        out[1]  = a[1]*b[0]  + a[5]*b[1]  + a[9]*b[2]  + a[13]*b[3];
        out[2]  = a[2]*b[0]  + a[6]*b[1]  + a[10]*b[2] + a[14]*b[3];
        out[3]  = a[3]*b[0]  + a[7]*b[1]  + a[11]*b[2] + a[15]*b[3];
        out[4]  = a[0]*b[4]  + a[4]*b[5]  + a[8]*b[6]  + a[12]*b[7];
        out[5]  = a[1]*b[4]  + a[5]*b[5]  + a[9]*b[6]  + a[13]*b[7];
        out[6]  = a[2]*b[4]  + a[6]*b[5]  + a[10]*b[6] + a[14]*b[7];
        out[7]  = a[3]*b[4]  + a[7]*b[5]  + a[11]*b[6] + a[15]*b[7];
        out[8]  = a[0]*b[8]  + a[4]*b[9]  + a[8]*b[10] + a[12]*b[11];
        out[9]  = a[1]*b[8]  + a[5]*b[9]  + a[9]*b[10] + a[13]*b[11];
        out[10] = a[2]*b[8]  + a[6]*b[9]  + a[10]*b[10]+ a[14]*b[11];
        out[11] = a[3]*b[8]  + a[7]*b[9]  + a[11]*b[10]+ a[15]*b[11];
        out[12] = a[0]*b[12] + a[4]*b[13] + a[8]*b[14] + a[12]*b[15];
        out[13] = a[1]*b[12] + a[5]*b[13] + a[9]*b[14] + a[13]*b[15];
        out[14] = a[2]*b[12] + a[6]*b[13] + a[10]*b[14]+ a[14]*b[15];
        out[15] = a[3]*b[12] + a[7]*b[13] + a[11]*b[14]+ a[15]*b[15];
    }

    getProjectionViewMatrix() {
        return this.projectionViewMatrix;
    }

    getDirection() {
        const cosPitch = Math.cos(this.pitch);
        return {
            x: Math.sin(this.yaw) * cosPitch,
            y: Math.sin(this.pitch),
            z: -Math.cos(this.yaw) * cosPitch
        };
    }

    getRightVector() {
        return {
            x: Math.cos(this.yaw),
            y: 0,
            z: Math.sin(this.yaw)
        };
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Camera;
} else {
    window.Camera = Camera;
}