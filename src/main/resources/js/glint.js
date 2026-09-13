/**
 * WebGL2 and JSO bootstrap script for Minecraft in browser.
 *
 * This script runs before the compiled Java bundle; it:
 * 1. Retrieves the WebGL2 canvas from the DOM
 * 2. Creates a WebGL2 context
 * 3. Wraps it in the WebGL2Context JSO interface
 * 4. Injects the wrapper into GlBridge.setWebGLContext()
 * 5. Enables native Java access via TeaVM's JSO bindings
 */

// Define the JSO interfaces that TeaVM will recognize
const Float32ArrayView = function(array, offset = 0) {
    this.array = array;
    this.offset = offset;
};

Float32ArrayView.prototype.length = function() {
    return this.array.length - this.offset;
};

Float32ArrayView.prototype.get = function(index) {
    return this.array[this.offset + index];
};

Float32ArrayView.prototype.set = function(index, value) {
    this.array[this.offset + index] = value;
};

// Get the main canvas - ID may vary, this is the expected default
const canvas = document.getElementById('glcanvas') ||
              document.querySelector('canvas') ||
              document.createElement('canvas');

if (!canvas) {
    throw new Error('No canvas element found. Please include a canvas with id="glcanvas" in your HTML.');
}

// Request WebGL2 context
const gl = canvas.getContext('webgl2');

if (!gl) {
    throw new Error('WebGL2 not supported by this browser.');
}

// Wrap the WebGL2RenderingContext in a JSO-compatible object
function createWebGL2 ContextWrapper() {
    const self = Object.create(null);

    // Viewport
    self.viewport = function(x, y, width, height) {
        gl.viewport(x, y, width, height);
    };

    // Clearing
    self.clearColor = function(r, g, b, a) {
        gl.clearColor(r, g, b, a);
    };

    self.clear = function(mask) {
        gl.clear(mask);
    };

    // Shaders
    self.createShader = function(type) {
        return gl.createShader(type);
    };

    self.shaderSource = function(shader, source) {
        gl.shaderSource(shader, source);
    };

    self.compileShader = function(shader) {
        gl.compileShader(shader);
    };

    self.getShaderParameter = function(shader, pname) {
        return gl.getShaderParameter(shader, pname);
    };

    self.getShaderInfoLog = function(shader) {
        return gl.getShaderInfoLog(shader) || '';
    };

    // Programs
    self.createProgram = function() {
        return gl.createProgram();
    };

    self.attachShader = function(program, shader) {
        gl.attachShader(program, shader);
    };

    self.linkProgram = function(program) {
        gl.linkProgram(program);
    };

    self.getProgramParameter = function(program, pname) {
        return gl.getProgramParameter(program, pname);
    };

    self.getProgramInfoLog = function(program) {
        return gl.getProgramInfoLog(program) || '';
    };

    self.useProgram = function(program) {
        gl.useProgram(program);
    };

    self.getUniformLocation = function(program, name) {
        return gl.getUniformLocation(program, name);
    };

    // Uniforms - typed overload for ints first
    self.uniform1i = function(location, x) {
        gl.uniform1i(location, x);
    };

    self.uniform2f = function(location, x, y) {
        gl.uniform2f(location, x, y);
    };

    self.uniform3f = function(location, x, y, z) {
        gl.uniform3f(location, x, y, z);
    };

    self.uniform4f = function(location, x, y, z, w) {
        gl.uniform4f(location, x, y, z, w);
    };

    // Buffers
    self.createBuffer = function() {
        return gl.createBuffer();
    };

    self.bindBuffer = function(target, buffer) {
        gl.bindBuffer(target, buffer);
    };

    // WebGL2 bufferData accepts Float32Array;
    // bufferSubData is similar but with offset
    self.bufferData = function(target, view, usage) {
        if (view instanceof Float32ArrayView) {
            const float32 = new Float32Array(view.array.buffer, view.array.byteOffset + view.offset * 4, view.array.length - view.offset);
            gl.bufferData(target, float32, usage);
        } else if (view instanceof Float32Array) {
            gl.bufferData(target, view, usage);
        }
    };

    self.bufferSubData = function(target, offset, view) {
        if (view instanceof Float32ArrayView) {
            const float32 = new Float32Array(view.array.buffer, view.array.byteOffset + view.offset * 4, view.array.length - view.offset);
            gl.bufferSubData(target, offset, float32);
        } else if (view instanceof Float32Array) {
            gl.bufferSubData(target, offset, view);
        }
    };

    // Vertex arrays (VAO)
    self.createVertexArray = function() {
        return gl.createVertexArray();
    };

    self.bindVertexArray = function(vao) {
        gl.bindVertexArray(vao);
    };

    self.enableVertexAttribArray = function(index) {
        gl.enableVertexAttribArray(index);
    };

    self.vertexAttribPointer = function(index, size, type, normalized, stride, offset) {
        gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    };

    // Drawing
    self.drawArrays = function(mode, first, count) {
        gl.drawArrays(mode, first, count);
    };

    self.drawElements = function(mode, count, type, offset) {
        gl.drawElements(mode, count, type, offset);
    };

    // Enable/disable
    self.enable = function(cap) {
        gl.enable(cap);
    };

    self.disable = function(cap) {
        gl.disable(cap);
    };

    // Error checking
    self.getError = function() {
        return gl.getError();
    };

    // Textures
    self.createTexture = function() {
        return gl.createTexture();
    };

    self.bindTexture = function(target, texture) {
        gl.bindTexture(target, texture);
    };

    // texImage2D accepts Float32ArrayView for non-null data
    self.texImage2D = function(
            target, level, internalFormat,
            width, height, border,
            format, type, pixels) {
        if (pixels) {
            let array;
            if (pixels instanceof Float32ArrayView) {
                array = new Float32Array(pixels.array.buffer,
                    pixels.array.byteOffset + pixels.offset * 4,
                    pixels.array.length - pixels.offset);
            } else if (pixels instanceof Float32Array) {
                array = pixels;
            } else {
                array = new Float32Array(pixels);
            }

            gl.texImage2D(
                target, level, internalFormat,
                width, height, border,
                format, type, array);
        } else {
            gl.texImage2D(
                target, level, internalFormat,
                width, height, border,
                format, type, null);
        }
    };

    self.texParameterf = function(target, pname, param) {
        gl.texParameterf(target, pname, param);
    };

    self.texParameteri = function(target, pname, param) {
        gl.texParameteri(target, pname, param);
    };

    // Queries (GL3.0 timer query support)
    self.createQuery = function() {
        return gl.createQuery();
    };

    self.beginQuery = function(target, query) {
        gl.beginQuery(target, query);
    };

    self.endQuery = function(target) {
        gl.endQuery(target);
    };

    self.getQueryParameter = function(query, pname) {
        return gl.getQueryParameter(query, pname) || 0;
    };

    return self;
}

// Create the JSO root object for poc.compat.jso
window.poc = window.poc || {};
window.poc.compat = window.poc.compat || {};
window.poc.compat.jso = window.poc.compat.jso || {};

// Create the JSO-compatible wrappers for our Java interfaces
window.poc.compat.jso.WebGL2Context = createWebGL2ContextWrapper;

// Create a JSO-compatible wrapper for Float32ArrayView
window.poc.compat.jso.Float32ArrayView = Float32ArrayView;

// PASS the real WebGL2 context to the Java side
if (!window.poc.compat.jso.GlBridge) {
    throw new Error('GlBridge class not found in compiled bundle. JSO bridge not wired.');
}

// Call static method to inject the context (this creates proper @JSExport/private static method)
window.poc.compat.jso.GlBridge.setWebGLContext(createWebGL2ContextWrapper());

// Log success
console.log('WebGL2 and JSO bridge initialized successfully');
console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);


// Handle resize
window.addEventListener('resize', function() {
    // Optional: Resize canvas on window resize
    // const displayWidth = canvas.clientWidth;
    // const displayHeight = canvas.clientHeight;
    // if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    //     canvas.width = displayWidth;
    //     canvas.height = displayHeight;
    // }
});