/**
 * Chunk Renderer
 * Decodes real Minecraft 1.21.1 chunk packets and renders with WebGL2
 * Uses instanced rendering for performance
 */
class ChunkRenderer {
    constructor(gl, camera) {
        this.gl = gl;
        this.camera = camera;
        this.chunks = new Map(); // chunkKey -> chunk mesh data
        this.shaderProgram = null;
        this.blockPalette = new Map(); // blockState -> color
        this.maxInstances = 100000;

        // Instanced rendering buffers
        this.instanceBuffer = null;
        this.instanceCount = 0;
        this.vao = null;
        this.cubeVertexBuffer = null;
        this.cubeIndexBuffer = null;
        this.cubeIndexCount = 36;

        this._initShaders();
        this._initCubeGeometry();
        this._initInstanceBuffer();
        this._initDefaultPalette();
    }

    _initShaders() {
        const gl = this.gl;

        const vsSource = `#version 300 es
            precision highp float;

            // Per-vertex attributes
            in vec3 aPosition;
            in vec3 aNormal;
            in vec2 aTexCoord;

            // Per-instance attributes
            in vec3 aInstancePosition;
            in vec3 aInstanceColor;

            // Uniforms
            uniform mat4 uProjectionView;

            // Outputs
            out vec3 vColor;
            out vec3 vNormal;
            out vec3 vWorldPos;

            void main() {
                vec3 worldPos = aPosition + aInstancePosition;
                vWorldPos = worldPos;
                vColor = aInstanceColor;
                vNormal = aNormal;
                gl_Position = uProjectionView * vec4(worldPos, 1.0);
            }
        `;

        const fsSource = `#version 300 es
            precision highp float;

            in vec3 vColor;
            in vec3 vNormal;
            in vec3 vWorldPos;

            out vec4 fragColor;

            void main() {
                // Simple directional lighting
                vec3 lightDir = normalize(vec3(0.5, 1.0, 0.3));
                float diff = max(dot(vNormal, lightDir), 0.3);
                vec3 color = vColor * diff;

                // Fog
                float fogDensity = 0.005;
                float dist = length(vWorldPos);
                float fog = exp(-fogDensity * dist * dist);
                color = mix(vec3(0.5, 0.6, 0.7), color, fog);

                fragColor = vec4(color, 1.0);
            }
        `;

        const vs = this._compileShader(gl.VERTEX_SHADER, vsSource);
        const fs = this._compileShader(gl.FRAGMENT_SHADER, fsSource);

        if (!vs || !fs) return;

        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, vs);
        gl.attachShader(this.shaderProgram, fs);
        gl.linkProgram(this.shaderProgram);

        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
            console.error('[ChunkRenderer] Shader link error:', gl.getProgramInfoLog(this.shaderProgram));
            return;
        }

        // Get attribute/uniform locations
        this.attribs = {
            aPosition: gl.getAttribLocation(this.shaderProgram, 'aPosition'),
            aNormal: gl.getAttribLocation(this.shaderProgram, 'aNormal'),
            aTexCoord: gl.getAttribLocation(this.shaderProgram, 'aTexCoord'),
            aInstancePosition: gl.getAttribLocation(this.shaderProgram, 'aInstancePosition'),
            aInstanceColor: gl.getAttribLocation(this.shaderProgram, 'aInstanceColor'),
        };

        this.uniforms = {
            uProjectionView: gl.getUniformLocation(this.shaderProgram, 'uProjectionView'),
        };
    }

    _compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('[ChunkRenderer] Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    _initCubeGeometry() {
        const gl = this.gl;

        // Cube vertices with positions and normals (6 faces, 4 vertices each = 24 vertices)
        const vertices = new Float32Array([
            // Front face (z = -0.5)
            -0.5, -0.5, -0.5,  0, 0, -1,  0, 0,
             0.5, -0.5, -0.5,  0, 0, -1,  1, 0,
             0.5,  0.5, -0.5,  0, 0, -1,  1, 1,
            -0.5,  0.5, -0.5,  0, 0, -1,  0, 1,

            // Back face (z = 0.5)
             0.5, -0.5,  0.5,  0, 0, 1,   0, 0,
            -0.5, -0.5,  0.5,  0, 0, 1,   1, 0,
            -0.5,  0.5,  0.5,  0, 0, 1,   1, 1,
             0.5,  0.5,  0.5,  0, 0, 1,   0, 1,

            // Left face (x = -0.5)
            -0.5, -0.5,  0.5, -1, 0, 0,   0, 0,
            -0.5, -0.5, -0.5, -1, 0, 0,   1, 0,
            -0.5,  0.5, -0.5, -1, 0, 0,   1, 1,
            -0.5,  0.5,  0.5, -1, 0, 0,   0, 1,

            // Right face (x = 0.5)
             0.5, -0.5, -0.5,  1, 0, 0,   0, 0,
             0.5, -0.5,  0.5,  1, 0, 0,   1, 0,
             0.5,  0.5,  0.5,  1, 0, 0,   1, 1,
             0.5,  0.5, -0.5,  1, 0, 0,   0, 1,

            // Bottom face (y = -0.5)
            -0.5, -0.5, -0.5,  0, -1, 0,  0, 0,
             0.5, -0.5, -0.5,  0, -1, 0,  1, 0,
             0.5, -0.5,  0.5,  0, -1, 0,  1, 1,
            -0.5, -0.5,  0.5,  0, -1, 0,  0, 1,

            // Top face (y = 0.5)
            -0.5,  0.5,  0.5,  0, 1, 0,   0, 0,
             0.5,  0.5,  0.5,  0, 1, 0,   1, 0,
             0.5,  0.5, -0.5,  0, 1, 0,   1, 1,
            -0.5,  0.5, -0.5,  0, 1, 0,   0, 1,
        ]);

        const indices = new Uint16Array([
            0, 1, 2,  0, 2, 3,      // Front
            4, 5, 6,  4, 6, 7,      // Back
            8, 9, 10, 8, 10, 11,    // Left
            12, 13, 14, 12, 14, 15, // Right
            16, 17, 18, 16, 18, 19, // Bottom
            20, 21, 22, 20, 22, 23, // Top
        ]);

        // Create VAO
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        // Vertex buffer
        this.cubeVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Position attribute
        gl.enableVertexAttribArray(this.attribs.aPosition);
        gl.vertexAttribPointer(this.attribs.aPosition, 3, gl.FLOAT, false, 32, 0);

        // Normal attribute
        gl.enableVertexAttribArray(this.attribs.aNormal);
        gl.vertexAttribPointer(this.attribs.aNormal, 3, gl.FLOAT, false, 32, 12);

        // TexCoord attribute
        gl.enableVertexAttribArray(this.attribs.aTexCoord);
        gl.vertexAttribPointer(this.attribs.aTexCoord, 2, gl.FLOAT, false, 32, 24);

        // Index buffer
        this.cubeIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        gl.bindVertexArray(null);
    }

    _initInstanceBuffer() {
        const gl = this.gl;
        const stride = 6 * 4; // 3 floats position + 3 floats color

        this.instanceBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.maxInstances * stride, gl.DYNAMIC_DRAW);

        gl.bindVertexArray(this.vao);
        // Instance position
        gl.enableVertexAttribArray(this.attribs.aInstancePosition);
        gl.vertexAttribPointer(this.attribs.aInstancePosition, 3, gl.FLOAT, false, stride, 0);
        gl.vertexAttribDivisor(this.attribs.aInstancePosition, 1);

        // Instance color
        gl.enableVertexAttribArray(this.attribs.aInstanceColor);
        gl.vertexAttribPointer(this.attribs.aInstanceColor, 3, gl.FLOAT, false, stride, 12);
        gl.vertexAttribDivisor(this.attribs.aInstanceColor, 1);

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    _initDefaultPalette() {
        // Basic block colors for common blocks (blockState -> [r, g, b])
        this.blockPalette.set(0, [0, 0, 0]);        // Air (transparent - won't render)
        this.blockPalette.set(1, [0.5, 0.5, 0.5]);  // Stone
        this.blockPalette.set(2, [0.3, 0.6, 0.2]);  // Grass block
        this.blockPalette.set(3, [0.4, 0.3, 0.2]);  // Dirt
        this.blockPalette.set(4, [0.45, 0.45, 0.45]); // Cobblestone
        this.blockPalette.set(5, [0.6, 0.45, 0.25]);  // Oak planks
        this.blockPalette.set(6, [0.75, 0.65, 0.4]);  // Sand
        this.blockPalette.set(7, [0.1, 0.1, 0.1]);    // Bedrock
        this.blockPalette.set(8, [0.0, 0.5, 0.8]);    // Water
        this.blockPalette.set(9, [0.0, 0.5, 0.8]);    // Water (flowing)
        this.blockPalette.set(10, [1.0, 0.3, 0.1]);   // Lava
        this.blockPalette.set(11, [1.0, 0.3, 0.1]);   // Lava (flowing)
        this.blockPalette.set(12, [0.8, 0.5, 0.3]);   // Sandstone
        this.blockPalette.set(13, [0.4, 0.3, 0.2]);   // Gravel
        this.blockPalette.set(14, [0.6, 0.5, 0.9]);   // Gold ore
        this.blockPalette.set(15, [0.4, 0.6, 0.4]);   // Iron ore
        this.blockPalette.set(16, [0.3, 0.3, 0.5]);   // Coal ore
        this.blockPalette.set(17, [0.9, 0.8, 0.5]);   // Oak log
        this.blockPalette.set(18, [0.3, 0.5, 0.2]);   // Oak leaves
        this.blockPalette.set(20, [0.3, 0.3, 0.3]);   // Glass
        // ... more can be added
    }

    _getBlockColor(blockState) {
        return this.blockPalette.get(blockState) || [0.5, 0.5, 0.5];
    }

    /**
     * Decode a Map Chunk packet (0x27) for 1.21.1
     * @param {Uint8Array} data - Raw packet data
     * @returns {Object|null} Decoded chunk data
     */
    decodeChunkPacket(data) {
        let offset = 0;

        const readVarInt = (buf, off) => {
            let result = 0, pos = 0, b;
            do {
                if (off + pos >= buf.length) return null;
                b = buf[off + pos++];
                result |= (b & 0x7F) << (7 * (pos - 1));
            } while ((b & 0x80) !== 0);
            return { value: result, size: pos };
        };

        // Chunk X (varint)
        const chunkXField = readVarInt(data, offset);
        if (!chunkXField) return null;
        offset += chunkXField.size;
        const chunkX = chunkXField.value;

        // Chunk Z (varint)
        const chunkZField = readVarInt(data, offset);
        if (!chunkZField) return null;
        offset += chunkZField.size;
        const chunkZ = chunkZField.value;

        // Heightmaps (we'll skip for now)
        // Bits per block (should be 14+ for 1.21.1 palette)
        const bitsField = readVarInt(data, offset);
        if (!bitsField) return null;
        offset += bitsField.size;

        // For simplicity, we'll parse the simplified format
        // Real implementation needs full palette + bit-packed array parsing
        // This is a placeholder that extracts block states

        const chunkKey = `${chunkX},${chunkZ}`;

        // Store raw data for later full parsing
        return {
            chunkX,
            chunkZ,
            key: chunkKey,
            rawData: data.slice(offset),
            bits: bitsField.value,
            sections: []
        };
    }

    /**
     * Process a chunk and build instanced render data
     * @param {Object} chunkData - Decoded chunk
     */
    processChunk(chunkData) {
        // For now, create placeholder visible blocks
        // Real implementation: parse block states, build visible face data
        // Only render top-most visible blocks for performance

        const instances = [];
        const { chunkX, chunkZ } = chunkData;
        const baseX = chunkX * 16;
        const baseZ = chunkZ * 16;

        // Temporary: render a flat surface at y=63 for testing
        // In real implementation, iterate through actual block data
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                // Add a grass block at y=63
                instances.push(
                    baseX + x,     // world X
                    63,            // world Y
                    baseZ + z,     // world Z
                    0.3, 0.6, 0.2  // grass color
                );

                // Add stone below
                for (let y = 60; y < 63; y++) {
                    instances.push(
                        baseX + x,
                        y,
                        baseZ + z,
                        0.5, 0.5, 0.5
                    );
                }
            }
        }

        this.chunks.set(chunkData.key, {
            chunkX,
            chunkZ,
            instances: new Float32Array(instances),
            instanceCount: instances.length / 6
        });

        this._rebuildInstanceBuffer();
    }

    _rebuildInstanceBuffer() {
        const gl = this.gl;
        let totalInstances = 0;

        for (const chunk of this.chunks.values()) {
            totalInstances += chunk.instanceCount;
        }

        this.instanceCount = Math.min(totalInstances, this.maxInstances);

        if (this.instanceCount === 0) return;

        const stride = 6 * 4;
        const combinedData = new Float32Array(this.instanceCount * 6);
        let offset = 0;

        for (const chunk of this.chunks.values()) {
            const count = Math.min(chunk.instanceCount, this.maxInstances - offset / 6);
            combinedData.set(chunk.instances.subarray(0, count * 6), offset);
            offset += count * 6;
            if (offset / 6 >= this.maxInstances) break;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, combinedData);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    /**
     * Render all chunks
     * @param {Float32Array} projectionViewMatrix - Camera projection-view matrix
     */
    render(projectionViewMatrix) {
        if (this.instanceCount === 0 || !this.shaderProgram) return;

        const gl = this.gl;

        gl.useProgram(this.shaderProgram);
        gl.uniformMatrix4fv(this.uniforms.uProjectionView, false, projectionViewMatrix);

        gl.bindVertexArray(this.vao);

        // Enable depth testing and culling
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        // Draw instanced cubes
        gl.drawElementsInstanced(
            gl.TRIANGLES,
            this.cubeIndexCount,
            gl.UNSIGNED_SHORT,
            0,
            this.instanceCount
        );

        gl.bindVertexArray(null);
    }

    /**
     * Add a chunk from decoded packet data
     * @param {Uint8Array} data - Raw Map Chunk packet data
     */
    addChunkPacket(data) {
        const chunkData = this.decodeChunkPacket(data);
        if (chunkData) {
            this.processChunk(chunkData);
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChunkRenderer;
} else {
    window.ChunkRenderer = ChunkRenderer;
}