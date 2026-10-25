"use strict";
(function(module) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports)  {
            module(exports);
        });
    } else if (typeof exports === 'object' && exports !== null && typeof exports.nodeName !== 'string') {
        module(exports);
    } else {
        module(typeof self !== 'undefined' ? self : this);
}
}(function($rt_exports) {
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_mainStarter = f => (args, callback) => {
    if (!args) {
        args = [];
    }
    let javaArgs = $rt_createArray($rt_objcls(), args.length);
    for (let i = 0;i < args.length;++i) {
        javaArgs.data[i] = $rt_str(args[i]);
    }
    $rt_startThread(() => {
        f.call(null, javaArgs);
    }, callback);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    let clsName = "";
    if (cls.$meta.primitive) {
        clsName = cls.$meta.name;
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_cls = cls => jl_Class_getClass(cls),
$rt_objcls = () => jl_Object,
$rt_getThread = () => {
    {
        return jl_Thread_currentThread();
    }
},
$rt_setThread = t => {
    {
        return jl_Thread_setCurrentThread(t);
    }
},
$rt_createcls = () => {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
},
$rt_createPrimitiveCls = (name, binaryName) => {
    let cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z"),
$rt_charcls = $rt_createPrimitiveCls("char", "C"),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B"),
$rt_shortcls = $rt_createPrimitiveCls("short", "S"),
$rt_intcls = $rt_createPrimitiveCls("int", "I"),
$rt_longcls = $rt_createPrimitiveCls("long", "J"),
$rt_floatcls = $rt_createPrimitiveCls("float", "F"),
$rt_doublecls = $rt_createPrimitiveCls("double", "D"),
$rt_voidcls = $rt_createPrimitiveCls("void", "V"),
$rt_numberConversionBuffer = new ArrayBuffer(16),
$rt_numberConversionDoubleArray = new Float64Array($rt_numberConversionBuffer),
$rt_numberConversionLongArray = new BigInt64Array($rt_numberConversionBuffer),
$rt_doubleToRawLongBits = n => {
    $rt_numberConversionDoubleArray[0] = n;
    return $rt_numberConversionLongArray[0];
},
$rt_longBitsToDouble = n => {
    $rt_numberConversionLongArray[0] = n;
    return $rt_numberConversionDoubleArray[0];
},
$rt_compare = (a, b) => a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_toNumber = val => Number(val),
Long_hi = val => Number(BigInt.asIntN(64, val >> BigInt(32))) | 0,
Long_lo = val => Number(BigInt.asIntN(32, val)) | 0,
Long_eq = (a, b) => a === b,
Long_ne = (a, b) => a !== b,
Long_gt = (a, b) => a > b,
Long_ge = (a, b) => a >= b,
Long_lt = (a, b) => a < b,
Long_le = (a, b) => a <= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b);
let Long_neg = a => BigInt.asIntN(64,  -a),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_compare = (a, b) => a < b ?  -1 : a > b ? 1 : 0,
Long_ucompare = (a, b) => {
    a = BigInt.asUintN(64, a);
    b = BigInt.asUintN(64, b);
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_mul = (a, b) => BigInt.asIntN(64, a * b),
Long_div = (a, b) => BigInt.asIntN(64, a / b),
Long_udiv = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) / BigInt.asUintN(64, b)),
Long_rem = (a, b) => BigInt.asIntN(64, a % b),
Long_urem = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) % BigInt.asUintN(64, b)),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_or = (a, b) => BigInt.asIntN(64, a | b),
Long_xor = (a, b) => BigInt.asIntN(64, a ^ b),
Long_shl = (a, b) => BigInt.asIntN(64, a << BigInt(b & 63)),
Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63)),
Long_shru = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_wrapArray = (cls, data) => new ($rt_arraycls(cls))(data),
$rt_createLongArrayFromData = data => {
    let buffer = new BigInt64Array(data.length);
    buffer.set(data);
    return new $rt_longArrayCls(buffer);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createShortArrayFromData = data => {
    let buffer = new Int16Array(data.length);
    buffer.set(data);
    return new $rt_shortArrayCls(buffer);
},
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_arraycls = cls => {
    let result = cls.$array;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone0 = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls.$meta.binaryName;
        JavaArray.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        JavaArray.classObject = null;
        JavaArray.$array = null;
        result = JavaArray;
        cls.$array = JavaArray;
    }
    return result;
},
$rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    for (let i = offset;i < limit;i = i + 1024 | 0) {
        let next = Math.min(limit, i + 1024 | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
    }
    return result;
},
$rt_str = str => str === null ? null : jl_String__init_1(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (from === to) {
        return true;
    }
    let map = from.$meta.assignableCache;
    if (typeof map === 'undefined') {
        map = new Map();
        from.$meta.assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to.$meta.item !== null) {
        let result = from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
        map.set(to, result);
        return result;
    }
    let supertypes = from.$meta.supertypes;
    for (let i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_javaException = e => e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null,
$rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_1(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => jl_StackTraceElement,
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_createOutputFunction = outputFunction => {
    let buffer = "";
    return msg => {
        let index = 0;
        while (true) {
            let next = msg.indexOf('\n', index);
            if (next < 0) {
                break;
            }
            outputFunction(buffer + msg.substring(index, next));
            buffer = "";
            index = next + 1;
        }
        buffer += msg.substring(index);
    };
},
$rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.info(msg)) : () => {
},
$rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.error(msg)) : () => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        cls.$meta = {  };
        let m = cls.$meta;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        let flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        let innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
};
function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (let i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : result => {
        if (result instanceof Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    let result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        let self = this;
        let callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(() => self.resume());
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
let $rt_suspending = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
},
$rt_resuming = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
},
$rt_requireNativeThread = () => {
    let nativeThread = $rt_nativeThread();
    if (nativeThread === null) {
        throw new Error("Suspension point reached from non-threading context " + "(perhaps, from native JS method). See https://teavm.org/docs/runtime/coroutines.html " + "('Interaction with JavaScript' section)");
    }
    return nativeThread;
},
$rt_startThread = (runner, callback) => (new TeaVMThread(runner)).start(callback),
$rt_currentNativeThread = null,
$rt_nativeThread = () => $rt_currentNativeThread,
$rt_invalidPointer = () => {
    throw new Error("Invalid recorded state");
};
function jl_Object() {
    this.$monitor = null;
    this.$id$ = 0;
}
let jl_Object_monitorEnterSync = $o => {
    let var$2;
    if (jl_Thread_currentThread() === null)
        return;
    if ($o.$monitor === null)
        jl_Object_createMonitor($o);
    if ($o.$monitor.$owner === null)
        $o.$monitor.$owner = jl_Thread_currentThread();
    else if ($o.$monitor.$owner !== jl_Thread_currentThread())
        $rt_throw(jl_IllegalStateException__init_1($rt_s(0)));
    var$2 = $o.$monitor;
    var$2.$count = var$2.$count + 1 | 0;
},
jl_Object_monitorExitSync = $o => {
    let var$2, var$3;
    if (jl_Thread_currentThread() === null)
        return;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        var$2 = $o.$monitor;
        var$3 = var$2.$count - 1 | 0;
        var$2.$count = var$3;
        if (!var$3)
            $o.$monitor.$owner = null;
        jl_Object_isEmptyMonitor($o);
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_0());
},
jl_Object_monitorEnter0 = $o => {
    let var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = 1;
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($o, var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, var$2, $ptr);
},
jl_Object_monitorEnter = ($o, $count) => {
    let var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$count = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        if ($o.$monitor.$owner === null)
            $o.$monitor.$owner = jl_Thread_currentThread();
        if ($o.$monitor.$owner === jl_Thread_currentThread()) {
            var$3 = $o.$monitor;
            var$3.$count = var$3.$count + $count | 0;
            return;
        }
        $ptr = 1;
    case 1:
        jl_Object_monitorEnterWait($o, $count);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, $count, var$3, $ptr);
},
jl_Object_createMonitor = $o => {
    $o.$monitor = jl_Object$Monitor__init_0();
},
jl_Object_monitorEnterWait = (var$1, var$2) => {
    let $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        jl_Object_monitorEnterWait$_asyncCall_$(var$1, var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$1, var$2, $ptr);
},
jl_Object_monitorEnterWait0 = ($o, $count, $callback) => {
    let $thread_0, var$5, $monitor;
    $thread_0 = jl_Thread_currentThread();
    if ($o.$monitor === null) {
        jl_Object_createMonitor($o);
        jl_Thread_setCurrentThread($thread_0);
        var$5 = $o.$monitor;
        var$5.$count = var$5.$count + $count | 0;
        $callback.$complete(null);
        return;
    }
    if ($o.$monitor.$owner === null) {
        $o.$monitor.$owner = $thread_0;
        jl_Thread_setCurrentThread($thread_0);
        var$5 = $o.$monitor;
        var$5.$count = var$5.$count + $count | 0;
        $callback.$complete(null);
        return;
    }
    $monitor = $o.$monitor;
    if ($monitor.$enteringThreads === null)
        $monitor.$enteringThreads = ju_ArrayDeque__init_2();
    $monitor.$enteringThreads.$add(jl_Object$monitorEnterWait$lambda$_6_0__init_0($thread_0, $o, $count, $callback));
},
jl_Object_monitorExit0 = $o => {
    jl_Object_monitorExit($o, 1);
},
jl_Object_monitorExit = ($o, $count) => {
    let $monitor;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        $monitor = $o.$monitor;
        $monitor.$count = $monitor.$count - $count | 0;
        if ($monitor.$count > 0)
            return;
        $monitor.$owner = null;
        if ($monitor.$enteringThreads !== null && !$monitor.$enteringThreads.$isEmpty())
            otp_Platform_postpone(jl_Object$monitorExit$lambda$_8_1__init_0($o));
        else
            jl_Object_isEmptyMonitor($o);
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_0());
},
jl_Object_waitForOtherThreads = $o => {
    let $monitor, $enteringThreads, $r;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === null) {
        $monitor = $o.$monitor;
        if ($monitor.$enteringThreads !== null && !$monitor.$enteringThreads.$isEmpty()) {
            $enteringThreads = $monitor.$enteringThreads;
            $r = $enteringThreads.$remove();
            $monitor.$enteringThreads = null;
            $r.$run();
        }
        return;
    }
},
jl_Object_isEmptyMonitor = $this => {
    let $monitor, var$2;
    $monitor = $this.$monitor;
    if ($monitor === null)
        return 1;
    a: {
        b: {
            if ($monitor.$owner === null) {
                if ($monitor.$enteringThreads !== null) {
                    var$2 = $monitor.$enteringThreads;
                    if (!var$2.$isEmpty())
                        break b;
                }
                if ($monitor.$notifyListeners === null)
                    break a;
                var$2 = $monitor.$notifyListeners;
                if (var$2.$isEmpty())
                    break a;
            }
        }
        return 0;
    }
    jl_Object_deleteMonitor($this);
    return 1;
},
jl_Object_deleteMonitor = $this => {
    $this.$monitor = null;
},
jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return jl_Class_getClass($this.constructor);
},
jl_Object_hashCode = $this => {
    return jl_Object_identity($this);
},
jl_Object_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$3, var$1), 64), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
},
jl_Object_clone = $this => {
    let var$1, $result, var$3;
    if (!$rt_isInstance($this, jl_Cloneable)) {
        var$1 = $this;
        if (var$1.constructor.$meta.item === null)
            $rt_throw(jl_CloneNotSupportedException__init_0());
    }
    $result = otp_Platform_clone($this);
    var$1 = $result;
    var$3 = $rt_nextId();
    var$1.$id$ = var$3;
    return $result;
},
jl_Object_lambda$monitorExit$2 = $o => {
    jl_Object_waitForOtherThreads($o);
},
jl_Object_lambda$monitorEnterWait$0 = ($thread_0, $o, $count, $callback) => {
    let var$5;
    jl_Thread_setCurrentThread($thread_0);
    $o.$monitor.$owner = $thread_0;
    var$5 = $o.$monitor;
    var$5.$count = var$5.$count + $count | 0;
    $callback.$complete(null);
},
jl_Object_monitorEnterWait$_asyncCall_$ = (var$1, var$2) => {
    let thread = $rt_requireNativeThread();
    let javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        let result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    let callback = function() {
    };
    callback.$complete = val => {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = e => {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    thread.suspend(() => {
        try {
            jl_Object_monitorEnterWait0(var$1, var$2, callback);
            ;
        } catch ($e){
            callback.$error($e);
        }
    });
    return null;
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$stackTrace = null;
}
let jl_Throwable__init_ = $this => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
},
jl_Throwable__init_2 = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_(var_0);
    return var_0;
},
jl_Throwable__init_0 = ($this, $message) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
},
jl_Throwable__init_3 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
},
jl_Throwable__init_1 = ($this, $message, $cause) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
    $this.$cause = $cause;
},
jl_Throwable__init_4 = (var_0, var_1) => {
    let var_2 = new jl_Throwable();
    jl_Throwable__init_1(var_2, var_0, var_1);
    return var_2;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_ensureStackTrace = $this => {
    return;
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getLocalizedMessage = $this => {
    return $this.$getMessage();
},
jl_Throwable_getCause = $this => {
    return $this.$cause === $this ? null : $this.$cause;
},
jl_Throwable_toString = $this => {
    let $message, var$2, var$3, var$4;
    $message = $this.$getLocalizedMessage();
    var$2 = jl_Class_getName(jl_Object_getClass($this));
    if ($message === null)
        var$3 = $rt_s(1);
    else {
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(2)), $message);
        var$3 = jl_StringBuilder_toString(var$3);
    }
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$4, var$2), var$3);
    return jl_StringBuilder_toString(var$4);
},
jl_Throwable_printStackTrace = $this => {
    $this.$printStackTrace(jl_System_err());
},
jl_Throwable_printStackTrace0 = ($this, $stream) => {
    let $message, var$3, var$4, var$5, var$6, $element;
    $stream.$print(jl_Class_getName(jl_Object_getClass($this)));
    $message = $this.$getLocalizedMessage();
    if ($message !== null) {
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(2)), $message);
        $stream.$print(jl_StringBuilder_toString(var$3));
    }
    a: {
        $stream.$println();
        jl_Throwable_ensureStackTrace($this);
        if ($this.$stackTrace !== null) {
            var$4 = $this.$stackTrace.data;
            var$5 = var$4.length;
            var$6 = 0;
            while (true) {
                if (var$6 >= var$5)
                    break a;
                $element = var$4[var$6];
                $stream.$print($rt_s(3));
                $stream.$println0($element);
                var$6 = var$6 + 1 | 0;
            }
        }
    }
    if ($this.$cause !== null && $this.$cause !== $this) {
        $stream.$print($rt_s(4));
        $this.$cause.$printStackTrace($stream);
    }
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    jl_Throwable__init_($this);
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_Exception__init_0 = ($this, $message) => {
    jl_Throwable__init_0($this, $message);
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_0(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_RuntimeException__init_2 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_IndexOutOfBoundsException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Cloneable = $rt_classWithoutFields(0),
jt_Format = $rt_classWithoutFields(),
jt_Format__init_ = $this => {
    jl_Object__init_($this);
},
jt_Format_format = ($this, $object) => {
    return ($this.$format($object, jl_StringBuffer__init_0(), jt_FieldPosition__init_0(0))).$toString();
},
jl_Record = $rt_classWithoutFields(),
jl_Number = $rt_classWithoutFields(),
jl_Number__init_ = $this => {
    jl_Object__init_($this);
},
jl_Comparable = $rt_classWithoutFields(0);
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_ = ($this, $value) => {
    jl_Integer_$callClinit();
    jl_Number__init_($this);
    $this.$value = $value;
},
jl_Integer__init_0 = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_(var_1, var_0);
    return var_1;
},
jl_Integer_toString1 = ($i, $radix) => {
    jl_Integer_$callClinit();
    if (!($radix >= 2 && $radix <= 36))
        $radix = 10;
    return ((jl_AbstractStringBuilder__init_1(20)).$append1($i, $radix)).$toString();
},
jl_Integer_hashCode0 = $value => {
    jl_Integer_$callClinit();
    return $value;
},
jl_Integer_toHexString = $i => {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
},
jl_Integer_toString = $i => {
    jl_Integer_$callClinit();
    return jl_Integer_toString1($i, 10);
},
jl_Integer_valueOf = $i => {
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_0($i);
},
jl_Integer_ensureIntegerCache = () => {
    let $j;
    jl_Integer_$callClinit();
    a: {
        if (jl_Integer_integerCache === null) {
            jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
            $j = 0;
            while (true) {
                if ($j >= jl_Integer_integerCache.data.length)
                    break a;
                jl_Integer_integerCache.data[$j] = jl_Integer__init_0($j - 128 | 0);
                $j = $j + 1 | 0;
            }
        }
    }
},
jl_Integer_intValue = $this => {
    return $this.$value;
},
jl_Integer_longValue = $this => {
    return Long_fromInt($this.$value);
},
jl_Integer_doubleValue = $this => {
    return $this.$value;
},
jl_Integer_toString0 = $this => {
    return jl_Integer_toString($this.$value);
},
jl_Integer_hashCode = $this => {
    return jl_Integer_hashCode0($this.$value);
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16 | 0;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 >>> 8 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 >>> 4 | 0;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 >>> 2 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 >>> 1 | 0)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_numberOfTrailingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i << 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 << 8;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 << 4;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 << 2;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 << 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
},
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
jl_CloneNotSupportedException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_CloneNotSupportedException__init_0 = () => {
    let var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_(var_0);
    return var_0;
},
jl_ReflectiveOperationException = $rt_classWithoutFields(jl_Exception),
jl_ReflectiveOperationException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_ReflectiveOperationException__init_1 = () => {
    let var_0 = new jl_ReflectiveOperationException();
    jl_ReflectiveOperationException__init_(var_0);
    return var_0;
},
jl_ReflectiveOperationException__init_0 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
jl_ReflectiveOperationException__init_2 = var_0 => {
    let var_1 = new jl_ReflectiveOperationException();
    jl_ReflectiveOperationException__init_0(var_1, var_0);
    return var_1;
},
jl_NoSuchFieldException = $rt_classWithoutFields(jl_ReflectiveOperationException),
jl_NoSuchFieldException__init_ = ($this, $message) => {
    jl_ReflectiveOperationException__init_0($this, $message);
},
jl_NoSuchFieldException__init_0 = var_0 => {
    let var_1 = new jl_NoSuchFieldException();
    jl_NoSuchFieldException__init_(var_1, var_0);
    return var_1;
},
jl_Long = $rt_classWithoutFields(jl_Number),
jl_Long_TYPE = null,
jl_Long_$callClinit = () => {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
},
jl_Long_toString = $value => {
    jl_Long_$callClinit();
    return ((jl_StringBuilder__init_()).$append2($value)).$toString();
},
jl_Long_numberOfLeadingZeros = $i => {
    let $n, var$3, var$4;
    jl_Long_$callClinit();
    if (Long_eq($i, Long_ZERO))
        return 64;
    $n = 0;
    var$3 = Long_shru($i, 32);
    if (Long_ne(var$3, Long_ZERO))
        $n = 32;
    else
        var$3 = $i;
    var$4 = Long_shru(var$3, 16);
    if (Long_eq(var$4, Long_ZERO))
        var$4 = var$3;
    else
        $n = $n | 16;
    var$3 = Long_shru(var$4, 8);
    if (Long_eq(var$3, Long_ZERO))
        var$3 = var$4;
    else
        $n = $n | 8;
    var$4 = Long_shru(var$3, 4);
    if (Long_eq(var$4, Long_ZERO))
        var$4 = var$3;
    else
        $n = $n | 4;
    var$3 = Long_shru(var$4, 2);
    if (Long_eq(var$3, Long_ZERO))
        var$3 = var$4;
    else
        $n = $n | 2;
    if (Long_ne(Long_shru(var$3, 1), Long_ZERO))
        $n = $n | 1;
    return (64 - $n | 0) - 1 | 0;
},
jl_Long_signum = $i => {
    jl_Long_$callClinit();
    return Long_lo(Long_or(Long_shr($i, 63), Long_shru(Long_neg($i), 63)));
},
jl_Long_divideUnsigned = (var$1, var$2) => {
    return Long_udiv(var$1, var$2);
},
jl_Long_remainderUnsigned = (var$1, var$2) => {
    return Long_urem(var$1, var$2);
},
jl_Long_compareUnsigned = (var$1, var$2) => {
    return Long_ucompare(var$1, var$2);
},
jl_Long__clinit_ = () => {
    jl_Long_TYPE = $rt_cls($rt_longcls);
},
jl_Runnable = $rt_classWithoutFields(0);
function jl_Thread() {
    let a = this; jl_Object.call(a);
    a.$id = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$name2 = null;
    a.$alive = 0;
    a.$target = null;
}
let jl_Thread_mainThread = null,
jl_Thread_currentThread0 = null,
jl_Thread_nextId = 0,
jl_Thread_activeCount = 0,
jl_Thread_defaultUncaughtExceptionHandler = null,
jl_Thread_$callClinit = () => {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
},
jl_Thread__init_0 = ($this, $name) => {
    jl_Thread_$callClinit();
    jl_Thread__init_($this, null, $name);
},
jl_Thread__init_1 = var_0 => {
    let var_1 = new jl_Thread();
    jl_Thread__init_0(var_1, var_0);
    return var_1;
},
jl_Thread__init_ = ($this, $target, $name) => {
    let var$3;
    jl_Thread_$callClinit();
    jl_Object__init_($this);
    $this.$finishedLock = jl_Object__init_0();
    $this.$alive = 1;
    $this.$name2 = $name;
    $this.$target = $target;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = var$3 + 1 | 0;
    $this.$id = Long_fromInt(var$3);
},
jl_Thread__init_2 = (var_0, var_1) => {
    let var_2 = new jl_Thread();
    jl_Thread__init_(var_2, var_0, var_1);
    return var_2;
},
jl_Thread_setCurrentThread = $thread_0 => {
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread0 !== $thread_0)
        jl_Thread_currentThread0 = $thread_0;
    jl_Thread_currentThread0.$timeSliceStart = jl_System_currentTimeMillis();
},
jl_Thread_currentThread = () => {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread0;
},
jl_Thread__clinit_ = () => {
    jl_Thread_mainThread = jl_Thread__init_1($rt_s(5));
    jl_Thread_currentThread0 = jl_Thread_mainThread;
    jl_Thread_nextId = 1;
    jl_Thread_activeCount = 1;
    jl_Thread_defaultUncaughtExceptionHandler = jl_DefaultUncaughtExceptionHandler__init_0();
},
ju_Map = $rt_classWithoutFields(0);
function jm_BigInteger() {
    let a = this; jl_Number.call(a);
    a.$digits = null;
    a.$numberLength = 0;
    a.$sign = 0;
    a.$firstNonzeroDigit = 0;
}
let jm_BigInteger_ZERO = null,
jm_BigInteger_ONE = null,
jm_BigInteger_TWO = null,
jm_BigInteger_TEN = null,
jm_BigInteger_MINUS_ONE = null,
jm_BigInteger_SMALL_VALUES = null,
jm_BigInteger_TWO_POWS = null,
jm_BigInteger_$callClinit = () => {
    jm_BigInteger_$callClinit = $rt_eraseClinit(jm_BigInteger);
    jm_BigInteger__clinit_();
},
jm_BigInteger__init_4 = ($this, $sign, $value) => {
    let var$3;
    jm_BigInteger_$callClinit();
    jl_Number__init_($this);
    $this.$firstNonzeroDigit = (-2);
    $this.$sign = $sign;
    $this.$numberLength = 1;
    var$3 = $rt_createIntArray(1);
    var$3.data[0] = $value;
    $this.$digits = var$3;
},
jm_BigInteger__init_0 = (var_0, var_1) => {
    let var_2 = new jm_BigInteger();
    jm_BigInteger__init_4(var_2, var_0, var_1);
    return var_2;
},
jm_BigInteger__init_1 = ($this, $sign, $numberLength, $digits) => {
    jm_BigInteger_$callClinit();
    jl_Number__init_($this);
    $this.$firstNonzeroDigit = (-2);
    $this.$sign = $sign;
    $this.$numberLength = $numberLength;
    $this.$digits = $digits;
},
jm_BigInteger__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jm_BigInteger();
    jm_BigInteger__init_1(var_3, var_0, var_1, var_2);
    return var_3;
},
jm_BigInteger__init_2 = ($this, $sign, $val) => {
    let var$3;
    jm_BigInteger_$callClinit();
    jl_Number__init_($this);
    $this.$firstNonzeroDigit = (-2);
    $this.$sign = $sign;
    if (Long_eq(Long_and($val, Long_create(0, 4294967295)), Long_ZERO)) {
        $this.$numberLength = 1;
        var$3 = $rt_createIntArray(1);
        var$3.data[0] = Long_lo($val);
        $this.$digits = var$3;
    } else {
        $this.$numberLength = 2;
        $this.$digits = $rt_createIntArrayFromData([Long_lo($val), Long_hi($val)]);
    }
},
jm_BigInteger__init_3 = (var_0, var_1) => {
    let var_2 = new jm_BigInteger();
    jm_BigInteger__init_2(var_2, var_0, var_1);
    return var_2;
},
jm_BigInteger__init_5 = ($this, $signum, $digits) => {
    let var$3, var$4;
    jm_BigInteger_$callClinit();
    var$3 = $digits.data;
    jl_Number__init_($this);
    $this.$firstNonzeroDigit = (-2);
    var$4 = var$3.length;
    if (var$4) {
        $this.$sign = $signum;
        $this.$numberLength = var$4;
        $this.$digits = $digits;
        jm_BigInteger_cutOffLeadingZeroes($this);
    } else {
        $this.$sign = 0;
        $this.$numberLength = 1;
        var$3 = $rt_createIntArray(1);
        var$3.data[0] = 0;
        $this.$digits = var$3;
    }
},
jm_BigInteger__init_6 = (var_0, var_1) => {
    let var_2 = new jm_BigInteger();
    jm_BigInteger__init_5(var_2, var_0, var_1);
    return var_2;
},
jm_BigInteger_valueOf = $val => {
    jm_BigInteger_$callClinit();
    if (Long_lt($val, Long_ZERO)) {
        if (Long_eq($val, Long_fromInt(-1)))
            return jm_BigInteger_MINUS_ONE;
        return jm_BigInteger__init_3((-1), Long_neg($val));
    }
    if (Long_gt($val, Long_fromInt(10)))
        return jm_BigInteger__init_3(1, $val);
    return jm_BigInteger_SMALL_VALUES.data[Long_lo($val)];
},
jm_BigInteger_abs = $this => {
    if ($this.$sign < 0)
        $this = jm_BigInteger__init_(1, $this.$numberLength, $this.$digits);
    return $this;
},
jm_BigInteger_negate = $this => {
    return !$this.$sign ? $this : jm_BigInteger__init_( -$this.$sign | 0, $this.$numberLength, $this.$digits);
},
jm_BigInteger_add = ($this, $val) => {
    return jm_Elementary_add0($this, $val);
},
jm_BigInteger_subtract = ($this, $val) => {
    return jm_Elementary_subtract0($this, $val);
},
jm_BigInteger_signum = $this => {
    return $this.$sign;
},
jm_BigInteger_shiftRight = ($this, $n) => {
    if ($n && $this.$sign)
        return $n > 0 ? jm_BitLevel_shiftRight($this, $n) : jm_BitLevel_shiftLeft0($this,  -$n | 0);
    return $this;
},
jm_BigInteger_shiftLeft = ($this, $n) => {
    if ($n && $this.$sign)
        return $n > 0 ? jm_BitLevel_shiftLeft0($this, $n) : jm_BitLevel_shiftRight($this,  -$n | 0);
    return $this;
},
jm_BigInteger_bitLength = $this => {
    return jm_BitLevel_bitLength($this);
},
jm_BigInteger_testBit = ($this, $n) => {
    let $intCount, $digit, var$4, $firstNonZeroDigit;
    if (!$n)
        return !($this.$digits.data[0] & 1) ? 0 : 1;
    if ($n < 0)
        $rt_throw(jl_ArithmeticException__init_($rt_s(6)));
    $intCount = $n >> 5;
    if ($intCount >= $this.$numberLength)
        return $this.$sign >= 0 ? 0 : 1;
    $digit = $this.$digits.data[$intCount];
    var$4 = 1 << ($n & 31);
    if ($this.$sign < 0) {
        $firstNonZeroDigit = $this.$getFirstNonzeroDigit();
        if ($intCount < $firstNonZeroDigit)
            return 0;
        $digit = $firstNonZeroDigit == $intCount ?  -$digit | 0 : $digit ^ (-1);
    }
    return !($digit & var$4) ? 0 : 1;
},
jm_BigInteger_intValue = $this => {
    return $rt_imul($this.$sign, $this.$digits.data[0]);
},
jm_BigInteger_longValue = $this => {
    let $value;
    $value = $this.$numberLength <= 1 ? Long_and(Long_fromInt($this.$digits.data[0]), Long_create(4294967295, 0)) : Long_or(Long_shl(Long_fromInt($this.$digits.data[1]), 32), Long_and(Long_fromInt($this.$digits.data[0]), Long_create(4294967295, 0)));
    return Long_mul(Long_fromInt($this.$sign), $value);
},
jm_BigInteger_doubleValue = $this => {
    return jm_Conversion_bigInteger2Double($this);
},
jm_BigInteger_compareTo = ($this, $val) => {
    if ($this.$sign > $val.$sign)
        return 1;
    if ($this.$sign < $val.$sign)
        return (-1);
    if ($this.$numberLength > $val.$numberLength)
        return $this.$sign;
    if ($this.$numberLength < $val.$numberLength)
        return  -$val.$sign | 0;
    return $rt_imul($this.$sign, jm_Elementary_compareArrays($this.$digits, $val.$digits, $this.$numberLength));
},
jm_BigInteger_equals = ($this, $x) => {
    let $x1;
    if ($this === $x)
        return 1;
    if (!($x instanceof jm_BigInteger))
        return 0;
    $x1 = $x;
    return $this.$sign == $x1.$sign && $this.$numberLength == $x1.$numberLength && $this.$equalsArrays($x1.$digits) ? 1 : 0;
},
jm_BigInteger_equalsArrays = ($this, $b) => {
    let $i, var$3;
    $i = $this.$numberLength - 1 | 0;
    while ($i >= 0) {
        var$3 = $b.data;
        if ($this.$digits.data[$i] != var$3[$i])
            break;
        $i = $i + (-1) | 0;
    }
    return $i >= 0 ? 0 : 1;
},
jm_BigInteger_multiply = ($this, $val) => {
    if (!$val.$sign) {
        jm_BigInteger_$callClinit();
        return jm_BigInteger_ZERO;
    }
    if ($this.$sign)
        return jm_Multiplication_multiply($this, $val);
    jm_BigInteger_$callClinit();
    return jm_BigInteger_ZERO;
},
jm_BigInteger_pow = ($this, $exp) => {
    let $x;
    if ($exp < 0)
        $rt_throw(jl_ArithmeticException__init_($rt_s(7)));
    if (!$exp) {
        jm_BigInteger_$callClinit();
        return jm_BigInteger_ONE;
    }
    if ($exp != 1) {
        jm_BigInteger_$callClinit();
        if (!$this.$equals(jm_BigInteger_ONE) && !$this.$equals(jm_BigInteger_ZERO)) {
            if ($this.$testBit(0))
                return jm_Multiplication_pow($this, $exp);
            $x = 1;
            while (!$this.$testBit($x)) {
                $x = $x + 1 | 0;
            }
            return (jm_BigInteger_getPowerOfTwo($rt_imul($x, $exp))).$multiply0(($this.$shiftRight0($x)).$pow0($exp));
        }
    }
    return $this;
},
jm_BigInteger_divideAndRemainder = ($this, $divisor) => {
    let $divisorSign, $divisorLen, $divisorDigits, $thisDigits, $thisLen, var$7, $cmp, var$9, var$10, $thisSign, $quotientLength, $quotientSign, $quotientDigits, $remainderDigits, $result0, $result1;
    $divisorSign = $divisor.$sign;
    if (!$divisorSign)
        $rt_throw(jl_ArithmeticException__init_($rt_s(8)));
    $divisorLen = $divisor.$numberLength;
    $divisorDigits = $divisor.$digits;
    if ($divisorLen == 1)
        return jm_Division_divideAndRemainderByInteger($this, $divisorDigits.data[0], $divisorSign);
    $thisDigits = $this.$digits;
    $thisLen = $this.$numberLength;
    var$7 = $rt_compare($thisLen, $divisorLen);
    $cmp = !var$7 ? jm_Elementary_compareArrays($thisDigits, $divisorDigits, $thisLen) : var$7 <= 0 ? (-1) : 1;
    if ($cmp < 0) {
        var$9 = $rt_createArray(jm_BigInteger, 2);
        var$10 = var$9.data;
        jm_BigInteger_$callClinit();
        var$10[0] = jm_BigInteger_ZERO;
        var$10[1] = $this;
        return var$9;
    }
    $thisSign = $this.$sign;
    $quotientLength = ($thisLen - $divisorLen | 0) + 1 | 0;
    $quotientSign = $thisSign != $divisorSign ? (-1) : 1;
    $quotientDigits = $rt_createIntArray($quotientLength);
    $remainderDigits = jm_Division_divide($quotientDigits, $quotientLength, $thisDigits, $thisLen, $divisorDigits, $divisorLen);
    $result0 = jm_BigInteger__init_($quotientSign, $quotientLength, $quotientDigits);
    $result1 = jm_BigInteger__init_($thisSign, $divisorLen, $remainderDigits);
    jm_BigInteger_cutOffLeadingZeroes($result0);
    jm_BigInteger_cutOffLeadingZeroes($result1);
    return $rt_wrapArray(jm_BigInteger, [$result0, $result1]);
},
jm_BigInteger_divide = ($this, $divisor) => {
    let $divisorSign, $thisSign, $thisLen, $divisorLen, $val, var$7, $cmp, $resLength, $resDigits, $resSign, $result;
    if (!$divisor.$sign)
        $rt_throw(jl_ArithmeticException__init_($rt_s(8)));
    $divisorSign = $divisor.$sign;
    if ($divisor.$isOne()) {
        if ($divisor.$sign <= 0)
            $this = $this.$negate();
        return $this;
    }
    $thisSign = $this.$sign;
    $thisLen = $this.$numberLength;
    $divisorLen = $divisor.$numberLength;
    if (($thisLen + $divisorLen | 0) == 2) {
        $val = Long_div(Long_and(Long_fromInt($this.$digits.data[0]), Long_create(4294967295, 0)), Long_and(Long_fromInt($divisor.$digits.data[0]), Long_create(4294967295, 0)));
        if ($thisSign != $divisorSign)
            $val = Long_neg($val);
        return jm_BigInteger_valueOf($val);
    }
    var$7 = $rt_compare($thisLen, $divisorLen);
    $cmp = !var$7 ? jm_Elementary_compareArrays($this.$digits, $divisor.$digits, $thisLen) : var$7 <= 0 ? (-1) : 1;
    if (!$cmp)
        return $thisSign != $divisorSign ? jm_BigInteger_MINUS_ONE : jm_BigInteger_ONE;
    if ($cmp == (-1))
        return jm_BigInteger_ZERO;
    $resLength = ($thisLen - $divisorLen | 0) + 1 | 0;
    $resDigits = $rt_createIntArray($resLength);
    $resSign = $thisSign != $divisorSign ? (-1) : 1;
    if ($divisorLen != 1)
        jm_Division_divide($resDigits, $resLength, $this.$digits, $thisLen, $divisor.$digits, $divisorLen);
    else
        jm_Division_divideArrayByInt($resDigits, $this.$digits, $thisLen, $divisor.$digits.data[0]);
    $result = jm_BigInteger__init_($resSign, $resLength, $resDigits);
    jm_BigInteger_cutOffLeadingZeroes($result);
    return $result;
},
jm_BigInteger_remainder = ($this, $divisor) => {
    let $thisLen, $divisorLen, var$4, $resDigits, $qLen, $result;
    if (!$divisor.$sign)
        $rt_throw(jl_ArithmeticException__init_($rt_s(8)));
    $thisLen = $this.$numberLength;
    $divisorLen = $divisor.$numberLength;
    var$4 = $rt_compare($thisLen, $divisorLen);
    if ((!var$4 ? jm_Elementary_compareArrays($this.$digits, $divisor.$digits, $thisLen) : var$4 <= 0 ? (-1) : 1) == (-1))
        return $this;
    $resDigits = $rt_createIntArray($divisorLen);
    if ($divisorLen != 1) {
        $qLen = ($thisLen - $divisorLen | 0) + 1 | 0;
        $resDigits = jm_Division_divide(null, $qLen, $this.$digits, $thisLen, $divisor.$digits, $divisorLen);
    } else
        $resDigits.data[0] = jm_Division_remainderArrayByInt($this.$digits, $thisLen, $divisor.$digits.data[0]);
    $result = jm_BigInteger__init_($this.$sign, $divisorLen, $resDigits);
    jm_BigInteger_cutOffLeadingZeroes($result);
    return $result;
},
jm_BigInteger_cutOffLeadingZeroes = $this => {
    let var$1, var$2, var$3;
    while ($this.$numberLength > 0) {
        var$1 = $this.$digits.data;
        var$2 = $this.$numberLength - 1 | 0;
        $this.$numberLength = var$2;
        if (var$1[var$2])
            break;
    }
    var$1 = $this.$digits.data;
    var$3 = $this.$numberLength;
    $this.$numberLength = var$3 + 1 | 0;
    if (!var$1[var$3])
        $this.$sign = 0;
},
jm_BigInteger_isOne = $this => {
    return $this.$numberLength == 1 && $this.$digits.data[0] == 1 ? 1 : 0;
},
jm_BigInteger_getFirstNonzeroDigit = $this => {
    let $i;
    if ($this.$firstNonzeroDigit == (-2)) {
        if (!$this.$sign)
            $i = (-1);
        else {
            $i = 0;
            while (!$this.$digits.data[$i]) {
                $i = $i + 1 | 0;
            }
        }
        $this.$firstNonzeroDigit = $i;
    }
    return $this.$firstNonzeroDigit;
},
jm_BigInteger_getPowerOfTwo = $exp => {
    let $intCount, $bitN, var$4, $resDigits, var$6;
    jm_BigInteger_$callClinit();
    if ($exp < jm_BigInteger_TWO_POWS.data.length)
        return jm_BigInteger_TWO_POWS.data[$exp];
    $intCount = $exp >> 5;
    $bitN = $exp & 31;
    var$4 = $intCount + 1 | 0;
    $resDigits = $rt_createIntArray(var$4);
    var$6 = $resDigits.data;
    var$6[$intCount] = 1 << $bitN;
    return jm_BigInteger__init_(1, var$4, $resDigits);
},
jm_BigInteger__clinit_ = () => {
    let var$1, var$2, $i;
    jm_BigInteger_ZERO = jm_BigInteger__init_0(0, 0);
    jm_BigInteger_ONE = jm_BigInteger__init_0(1, 1);
    jm_BigInteger_TWO = jm_BigInteger__init_0(1, 2);
    jm_BigInteger_TEN = jm_BigInteger__init_0(1, 10);
    jm_BigInteger_MINUS_ONE = jm_BigInteger__init_0((-1), 1);
    var$1 = $rt_createArray(jm_BigInteger, 11);
    var$2 = var$1.data;
    var$2[0] = jm_BigInteger_ZERO;
    var$2[1] = jm_BigInteger_ONE;
    var$2[2] = jm_BigInteger_TWO;
    var$2[3] = jm_BigInteger__init_0(1, 3);
    var$2[4] = jm_BigInteger__init_0(1, 4);
    var$2[5] = jm_BigInteger__init_0(1, 5);
    var$2[6] = jm_BigInteger__init_0(1, 6);
    var$2[7] = jm_BigInteger__init_0(1, 7);
    var$2[8] = jm_BigInteger__init_0(1, 8);
    var$2[9] = jm_BigInteger__init_0(1, 9);
    var$2[10] = jm_BigInteger_TEN;
    jm_BigInteger_SMALL_VALUES = var$1;
    jm_BigInteger_TWO_POWS = $rt_createArray(jm_BigInteger, 32);
    $i = 0;
    while ($i < jm_BigInteger_TWO_POWS.data.length) {
        jm_BigInteger_TWO_POWS.data[$i] = jm_BigInteger_valueOf(Long_shl(Long_fromInt(1), $i));
        $i = $i + 1 | 0;
    }
},
jl_ArithmeticException = $rt_classWithoutFields(jl_RuntimeException),
jl_ArithmeticException__init_0 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_ArithmeticException__init_ = var_0 => {
    let var_1 = new jl_ArithmeticException();
    jl_ArithmeticException__init_0(var_1, var_0);
    return var_1;
},
pn_PacketPool = $rt_classWithoutFields(),
pn_PacketPool_SMALL_PACKET_POOL = null,
pn_PacketPool_MEDIUM_PACKET_POOL = null,
pn_PacketPool_LARGE_PACKET_POOL = null,
pn_PacketPool_$callClinit = () => {
    pn_PacketPool_$callClinit = $rt_eraseClinit(pn_PacketPool);
    pn_PacketPool__clinit_();
};
let pn_PacketPool_acquire = $size => {
    let var$2, $buf, var$4, $$je;
    pn_PacketPool_$callClinit();
    if ($size <= 64) {
        var$2 = pn_PacketPool_SMALL_PACKET_POOL;
        jl_Object_monitorEnterSync(var$2);
        a: {
            try {
                $buf = pn_PacketPool_SMALL_PACKET_POOL.$poll();
                if ($buf === null)
                    $buf = $rt_createByteArray(64);
                jl_Object_monitorExitSync(var$2);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break a;

            }
            return $buf;
        }
        jl_Object_monitorExitSync(var$2);
        $rt_throw(var$4);
    }
    if ($size > 256) {
        var$2 = pn_PacketPool_LARGE_PACKET_POOL;
        jl_Object_monitorEnterSync(var$2);
        b: {
            try {
                $buf = pn_PacketPool_LARGE_PACKET_POOL.$poll();
                if ($buf === null)
                    $buf = $rt_createByteArray(1024);
                jl_Object_monitorExitSync(var$2);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break b;

            }
            return $buf;
        }
        jl_Object_monitorExitSync(var$2);
        $rt_throw(var$4);
    }
    var$2 = pn_PacketPool_MEDIUM_PACKET_POOL;
    jl_Object_monitorEnterSync(var$2);
    c: {
        try {
            $buf = pn_PacketPool_MEDIUM_PACKET_POOL.$poll();
            if ($buf === null)
                $buf = $rt_createByteArray(256);
            jl_Object_monitorExitSync(var$2);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break c;

        }
        return $buf;
    }
    jl_Object_monitorExitSync(var$2);
    $rt_throw(var$4);
},
pn_PacketPool_release = $buf => {
    let $length, var$3, var$4, $$je;
    pn_PacketPool_$callClinit();
    if ($buf === null)
        return;
    a: {
        b: {
            $length = $buf.data.length;
            if ($length <= 64) {
                var$3 = pn_PacketPool_SMALL_PACKET_POOL;
                jl_Object_monitorEnterSync(var$3);
                try {
                    if (pn_PacketPool_SMALL_PACKET_POOL.$size() < 16)
                        pn_PacketPool_SMALL_PACKET_POOL.$offer($buf);
                    jl_Object_monitorExitSync(var$3);
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;
                    jl_Object_monitorExitSync(var$3);
                    $rt_throw(var$4);

                }
            }
            if ($length <= 256) {
                var$3 = pn_PacketPool_MEDIUM_PACKET_POOL;
                jl_Object_monitorEnterSync(var$3);
                try {
                    if (pn_PacketPool_MEDIUM_PACKET_POOL.$size() < 8)
                        pn_PacketPool_MEDIUM_PACKET_POOL.$offer($buf);
                    jl_Object_monitorExitSync(var$3);
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;
                    jl_Object_monitorExitSync(var$3);
                    $rt_throw(var$4);

                }
            }
            if ($length <= 1024) {
                var$3 = pn_PacketPool_LARGE_PACKET_POOL;
                jl_Object_monitorEnterSync(var$3);
                c: {
                    try {
                        if (pn_PacketPool_LARGE_PACKET_POOL.$size() >= 4)
                            break c;
                        pn_PacketPool_LARGE_PACKET_POOL.$offer($buf);
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$4 = $$je;
                        break a;

                    }
                }
                try {
                    jl_Object_monitorExitSync(var$3);
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;
                    break a;

                }
            }
        }
        return;
    }
    jl_Object_monitorExitSync(var$3);
    $rt_throw(var$4);
},
pn_PacketPool__clinit_ = () => {
    pn_PacketPool_SMALL_PACKET_POOL = ju_ArrayDeque__init_(16);
    pn_PacketPool_MEDIUM_PACKET_POOL = ju_ArrayDeque__init_(8);
    pn_PacketPool_LARGE_PACKET_POOL = ju_ArrayDeque__init_(4);
},
otciu_CLDRHelper = $rt_classWithoutFields(),
otciu_CLDRHelper_$$metadata$$0 = null,
otciu_CLDRHelper_$$metadata$$10 = null,
otciu_CLDRHelper_$$metadata$$17 = null,
otciu_CLDRHelper_$$metadata$$20 = null,
otciu_CLDRHelper_$$metadata$$21 = null,
otciu_CLDRHelper_getCode = ($language, $country) => {
    let var$3;
    if (!$country.$isEmpty()) {
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$3, $language), 45), $country);
        $language = jl_StringBuilder_toString(var$3);
    }
    return $language;
},
otciu_CLDRHelper_getLikelySubtags = $localeCode => {
    let $map;
    $map = otciu_CLDRHelper_getLikelySubtagsMap();
    if ($map.hasOwnProperty($rt_ustr($localeCode)))
        $localeCode = ($map[$rt_ustr($localeCode)].value !== null ? $rt_str($map[$rt_ustr($localeCode)].value) : null);
    return $localeCode;
},
otciu_CLDRHelper_resolveCountry = ($language, $country) => {
    let $subtags, $index;
    if ($country.$isEmpty()) {
        $subtags = otciu_CLDRHelper_getLikelySubtags($language);
        $index = $subtags.$lastIndexOf(95);
        $country = $index <= 0 ? $rt_s(1) : $subtags.$substring($index + 1 | 0);
    }
    return $country;
},
otciu_CLDRHelper_getLikelySubtagsMap = () => {
    if (otciu_CLDRHelper_$$metadata$$0 === null)
        otciu_CLDRHelper_$$metadata$$0 = otciu_CLDRHelper_getLikelySubtagsMap$$create();
    return otciu_CLDRHelper_$$metadata$$0;
},
otciu_CLDRHelper_getDefaultLocale = () => {
    if (otciu_CLDRHelper_$$metadata$$10 === null)
        otciu_CLDRHelper_$$metadata$$10 = otciu_CLDRHelper_getDefaultLocale$$create();
    return otciu_CLDRHelper_$$metadata$$10;
},
otciu_CLDRHelper_resolveNumberFormat = ($language, $country) => {
    return otciu_CLDRHelper_resolveFormatSymbols(otciu_CLDRHelper_getNumberFormatMap(), $language, $country);
},
otciu_CLDRHelper_getNumberFormatMap = () => {
    if (otciu_CLDRHelper_$$metadata$$17 === null)
        otciu_CLDRHelper_$$metadata$$17 = otciu_CLDRHelper_getNumberFormatMap$$create();
    return otciu_CLDRHelper_$$metadata$$17;
},
otciu_CLDRHelper_resolveFormatSymbols = ($map, $language, $country) => {
    let $localeCode, $res;
    $localeCode = otciu_CLDRHelper_getCode($language, $country);
    $res = $map.hasOwnProperty($rt_ustr($localeCode)) ? $map[$rt_ustr($localeCode)] : $map.hasOwnProperty($rt_ustr($language)) ? $map[$rt_ustr($language)] : $map.root;
    return ($res.value !== null ? $rt_str($res.value) : null);
},
otciu_CLDRHelper_resolveDecimalData = ($language, $country) => {
    let $map, $localeCode;
    $map = otciu_CLDRHelper_getDecimalDataMap();
    $localeCode = otciu_CLDRHelper_getCode($language, $country);
    return $map.hasOwnProperty($rt_ustr($localeCode)) ? $map[$rt_ustr($localeCode)] : $map.hasOwnProperty($rt_ustr($language)) ? $map[$rt_ustr($language)] : $map.root;
},
otciu_CLDRHelper_getDecimalDataMap = () => {
    if (otciu_CLDRHelper_$$metadata$$20 === null)
        otciu_CLDRHelper_$$metadata$$20 = otciu_CLDRHelper_getDecimalDataMap$$create();
    return otciu_CLDRHelper_$$metadata$$20;
},
otciu_CLDRHelper_resolveCurrency = ($language, $country, $currency) => {
    let $localeCode, $map, $currencies, var$7;
    $localeCode = otciu_CLDRHelper_getCode($language, $country);
    $map = otciu_CLDRHelper_getCurrencyMap();
    if ($map.hasOwnProperty($rt_ustr($localeCode))) {
        $currencies = $map[$rt_ustr($localeCode)];
        if ($currencies.hasOwnProperty($rt_ustr($currency))) {
            var$7 = $currencies[$rt_ustr($currency)];
            return var$7;
        }
    }
    if ($map.hasOwnProperty($rt_ustr($language))) {
        $currencies = $map[$rt_ustr($language)];
        if ($currencies.hasOwnProperty($rt_ustr($currency))) {
            var$7 = $currencies[$rt_ustr($currency)];
            return var$7;
        }
    }
    return null;
},
otciu_CLDRHelper_getCurrencyMap = () => {
    if (otciu_CLDRHelper_$$metadata$$21 === null)
        otciu_CLDRHelper_$$metadata$$21 = otciu_CLDRHelper_getCurrencyMap$$create();
    return otciu_CLDRHelper_$$metadata$$21;
},
otciu_CLDRHelper_getLikelySubtagsMap$$create = () => {
    return {"ksh": {"value" : "ksh-Latn-DE"}, "ksj": {"value" : "ksj-Latn-ZZ"}, "tdu": {"value" : "tdu-Latn-MY"}, "cch": {"value" : "cch-Latn-NG"}, "und-Khar": {"value" : "pra-Khar-PK"}, "gkn": {"value" : "gkn-Latn-ZZ"}, "ksr": {"value" : "ksr-Latn-ZZ"}, "und-Mani": {"value" : "xmn-Mani-CN"}, "gkp": {"value" : "gkp-Latn-ZZ"}, "xmf": {"value" : "xmf-Geor-GE"}, "ccp": {"value" : "ccp-Cakm-BD"}, "ted": {"value" : "ted-Latn-ZZ"}, "und-Mand": {"value" : "myz-Mand-IR"}, "ktb": {"value" : "ktb-Ethi-ZZ"}, "xmn": {"value"
    : "xmn-Mani-CN"}, "sd-Sind": {"value" : "sd-Sind-IN"}, "xmr": {"value" : "xmr-Merc-SD"}, "tem": {"value" : "tem-Latn-SL"}, "und-Mroo": {"value" : "mro-Mroo-BD"}, "teo": {"value" : "teo-Latn-UG"}, "tet": {"value" : "tet-Latn-TL"}, "ktm": {"value" : "ktm-Latn-ZZ"}, "glk": {"value" : "glk-Arab-IR"}, "kto": {"value" : "kto-Latn-ZZ"}, "ktr": {"value" : "ktr-Latn-MY"}, "und-Soyo": {"value" : "cmg-Soyo-MN"}, "xna": {"value" : "xna-Narb-SA"}, "tfi": {"value" : "tfi-Latn-ZZ"}, "kub": {"value" : "kub-Latn-ZZ"}, "kue":
    {"value" : "kue-Latn-ZZ"}, "kud": {"value" : "kud-Latn-ZZ"}, "xnr": {"value" : "xnr-Deva-IN"}, "ceb": {"value" : "ceb-Latn-PH"}, "kuj": {"value" : "kuj-Latn-ZZ"}, "kum": {"value" : "kum-Cyrl-RU"}, "kun": {"value" : "kun-Latn-ZZ"}, "gmm": {"value" : "gmm-Latn-ZZ"}, "kup": {"value" : "kup-Latn-ZZ"}, "kus": {"value" : "kus-Latn-ZZ"}, "gmv": {"value" : "gmv-Ethi-ZZ"}, "tgc": {"value" : "tgc-Latn-ZZ"}, "xog": {"value" : "xog-Latn-UG"}, "und-Arab-YT": {"value" : "swb-Arab-YT"}, "und-Latn-ET": {"value" : "en-Latn-ET"}
    , "xon": {"value" : "xon-Latn-ZZ"}, "ha-CM": {"value" : "ha-Arab-CM"}, "gnd": {"value" : "gnd-Latn-ZZ"}, "kvg": {"value" : "kvg-Latn-ZZ"}, "tgo": {"value" : "tgo-Latn-ZZ"}, "cfa": {"value" : "cfa-Latn-ZZ"}, "gng": {"value" : "gng-Latn-ZZ"}, "tgu": {"value" : "tgu-Latn-ZZ"}, "und-Latn-GE": {"value" : "ku-Latn-GE"}, "kvr": {"value" : "kvr-Latn-ID"}, "kvx": {"value" : "kvx-Arab-PK"}, "und-Gujr": {"value" : "gu-Gujr-IN"}, "thl": {"value" : "thl-Deva-NP"}, "xpr": {"value" : "xpr-Prti-IR"}, "thq": {"value" : "thq-Deva-NP"}
    , "god": {"value" : "god-Latn-ZZ"}, "gof": {"value" : "gof-Ethi-ZZ"}, "kwj": {"value" : "kwj-Latn-ZZ"}, "ky-Arab": {"value" : "ky-Arab-CN"}, "thr": {"value" : "thr-Deva-NP"}, "goi": {"value" : "goi-Latn-ZZ"}, "cgg": {"value" : "cgg-Latn-UG"}, "kwo": {"value" : "kwo-Latn-ZZ"}, "gom": {"value" : "gom-Deva-IN"}, "kwq": {"value" : "kwq-Latn-ZZ"}, "gon": {"value" : "gon-Telu-IN"}, "gos": {"value" : "gos-Latn-NL"}, "gor": {"value" : "gor-Latn-ID"}, "und-Latn-CY": {"value" : "tr-Latn-CY"}, "got": {"value" : "got-Goth-UA"}
    , "tif": {"value" : "tif-Latn-ZZ"}, "tig": {"value" : "tig-Ethi-ER"}, "kxa": {"value" : "kxa-Latn-ZZ"}, "kxc": {"value" : "kxc-Ethi-ZZ"}, "pag": {"value" : "pag-Latn-PH"}, "tik": {"value" : "tik-Latn-ZZ"}, "kxe": {"value" : "kxe-Latn-ZZ"}, "tim": {"value" : "tim-Latn-ZZ"}, "pal": {"value" : "pal-Phli-IR"}, "tio": {"value" : "tio-Latn-ZZ"}, "pam": {"value" : "pam-Latn-PH"}, "und-Marc": {"value" : "bo-Marc-CN"}, "pap": {"value" : "pap-Latn-AW"}, "und-Latn-CN": {"value" : "za-Latn-CN"}, "tiv": {"value" : "tiv-Latn-NG"}
    , "kxm": {"value" : "kxm-Thai-TH"}, "kxp": {"value" : "kxp-Arab-PK"}, "pau": {"value" : "pau-Latn-PW"}, "chk": {"value" : "chk-Latn-FM"}, "chm": {"value" : "chm-Cyrl-RU"}, "xrb": {"value" : "xrb-Latn-ZZ"}, "chp": {"value" : "chp-Latn-CA"}, "cho": {"value" : "cho-Latn-US"}, "kxw": {"value" : "kxw-Latn-ZZ"}, "und-Latn-DZ": {"value" : "fr-Latn-DZ"}, "chr": {"value" : "chr-Cher-US"}, "kxz": {"value" : "kxz-Latn-ZZ"}, "und-Batk": {"value" : "bbc-Batk-ID"}, "und-Bass": {"value" : "bsq-Bass-LR"}, "kye": {"value"
    : "kye-Latn-ZZ"}, "pbi": {"value" : "pbi-Latn-ZZ"}, "und-Deva-MU": {"value" : "bho-Deva-MU"}, "cic": {"value" : "cic-Latn-US"}, "und-Sgnw": {"value" : "ase-Sgnw-US"}, "xsa": {"value" : "xsa-Sarb-YE"}, "kyx": {"value" : "kyx-Latn-ZZ"}, "xsi": {"value" : "xsi-Latn-ZZ"}, "pcd": {"value" : "pcd-Latn-FR"}, "und-Latn-AM": {"value" : "ku-Latn-AM"}, "xsm": {"value" : "xsm-Latn-ZZ"}, "tkl": {"value" : "tkl-Latn-TK"}, "und-Thai-CN": {"value" : "lcp-Thai-CN"}, "grb": {"value" : "grb-Latn-ZZ"}, "xsr": {"value" : "xsr-Deva-NP"}
    , "und-Latn-AF": {"value" : "tk-Latn-AF"}, "grc": {"value" : "grc-Cprt-CY"}, "kzj": {"value" : "kzj-Latn-MY"}, "tkr": {"value" : "tkr-Latn-AZ"}, "cja": {"value" : "cja-Arab-KH"}, "pcm": {"value" : "pcm-Latn-NG"}, "tkt": {"value" : "tkt-Deva-NP"}, "und-Olck": {"value" : "sat-Olck-IN"}, "kzr": {"value" : "kzr-Latn-ZZ"}, "kzt": {"value" : "kzt-Latn-MY"}, "cjm": {"value" : "cjm-Cham-VN"}, "grt": {"value" : "grt-Beng-IN"}, "und-Arab-TJ": {"value" : "fa-Arab-TJ"}, "und-Arab-TG": {"value" : "apd-Arab-TG"}, "und-Arab-TH":
    {"value" : "mfa-Arab-TH"}, "und-Deva-PK": {"value" : "btv-Deva-PK"}, "grw": {"value" : "grw-Latn-ZZ"}, "cjv": {"value" : "cjv-Latn-ZZ"}, "pdc": {"value" : "pdc-Latn-US"}, "tlf": {"value" : "tlf-Latn-ZZ"}, "und-Arab-TR": {"value" : "az-Arab-TR"}, "ckb": {"value" : "ckb-Arab-IQ"}, "tly": {"value" : "tly-Latn-AZ"}, "pdt": {"value" : "pdt-Latn-CA"}, "tlx": {"value" : "tlx-Latn-ZZ"}, "ckl": {"value" : "ckl-Latn-ZZ"}, "cko": {"value" : "cko-Latn-ZZ"}, "gsw": {"value" : "gsw-Latn-CH"}, "ped": {"value" : "ped-Latn-ZZ"}
    , "tmh": {"value" : "tmh-Latn-NE"}, "cky": {"value" : "cky-Latn-ZZ"}, "kk-Arab": {"value" : "kk-Arab-CN"}, "und-Runr": {"value" : "non-Runr-SE"}, "cla": {"value" : "cla-Latn-ZZ"}, "peo": {"value" : "peo-Xpeo-IR"}, "tmy": {"value" : "tmy-Latn-ZZ"}, "pex": {"value" : "pex-Latn-ZZ"}, "ky-TR": {"value" : "ky-Latn-TR"}, "tnh": {"value" : "tnh-Latn-ZZ"}, "guc": {"value" : "guc-Latn-CO"}, "gub": {"value" : "gub-Latn-BR"}, "gud": {"value" : "gud-Latn-ZZ"}, "pfl": {"value" : "pfl-Latn-DE"}, "cme": {"value" : "cme-Latn-ZZ"}
    , "cmg": {"value" : "cmg-Soyo-MN"}, "gur": {"value" : "gur-Latn-GH"}, "xwe": {"value" : "xwe-Latn-ZZ"}, "guw": {"value" : "guw-Latn-ZZ"}, "tof": {"value" : "tof-Latn-ZZ"}, "gux": {"value" : "gux-Latn-ZZ"}, "guz": {"value" : "guz-Latn-KE"}, "tog": {"value" : "tog-Latn-MW"}, "gvf": {"value" : "gvf-Latn-ZZ"}, "toq": {"value" : "toq-Latn-ZZ"}, "gvr": {"value" : "gvr-Deva-NP"}, "und-Guru": {"value" : "pa-Guru-IN"}, "gvs": {"value" : "gvs-Latn-ZZ"}, "tpi": {"value" : "tpi-Latn-PG"}, "tpm": {"value" : "tpm-Latn-ZZ"}
    , "und-Tfng": {"value" : "zgh-Tfng-MA"}, "gwc": {"value" : "gwc-Arab-ZZ"}, "und-Arab-PK": {"value" : "ur-Arab-PK"}, "phl": {"value" : "phl-Arab-ZZ"}, "und-Aghb": {"value" : "lez-Aghb-RU"}, "phn": {"value" : "phn-Phnx-LB"}, "gwi": {"value" : "gwi-Latn-CA"}, "tpz": {"value" : "tpz-Latn-ZZ"}, "cop": {"value" : "cop-Copt-EG"}, "gwt": {"value" : "gwt-Arab-ZZ"}, "lab": {"value" : "lab-Lina-GR"}, "lad": {"value" : "lad-Hebr-IL"}, "lah": {"value" : "lah-Arab-PK"}, "pil": {"value" : "pil-Latn-ZZ"}, "lag": {"value"
    : "lag-Latn-TZ"}, "tqo": {"value" : "tqo-Latn-ZZ"}, "laj": {"value" : "laj-Latn-UG"}, "pip": {"value" : "pip-Latn-ZZ"}, "und-Khmr": {"value" : "km-Khmr-KH"}, "las": {"value" : "las-Latn-ZZ"}, "sd-Deva": {"value" : "sd-Deva-IN"}, "und-Khoj": {"value" : "sd-Khoj-IN"}, "cps": {"value" : "cps-Latn-PH"}, "kk-AF": {"value" : "kk-Arab-AF"}, "und-Arab-MU": {"value" : "ur-Arab-MU"}, "lbe": {"value" : "lbe-Cyrl-RU"}, "und-Arab-NG": {"value" : "ha-Arab-NG"}, "gyi": {"value" : "gyi-Latn-ZZ"}, "tru": {"value" : "tru-Latn-TR"}
    , "trw": {"value" : "trw-Arab-ZZ"}, "trv": {"value" : "trv-Latn-TW"}, "lbu": {"value" : "lbu-Latn-ZZ"}, "lbw": {"value" : "lbw-Latn-ID"}, "tsd": {"value" : "tsd-Grek-GR"}, "tsf": {"value" : "tsf-Deva-NP"}, "pka": {"value" : "pka-Brah-IN"}, "tsg": {"value" : "tsg-Latn-PH"}, "tsj": {"value" : "tsj-Tibt-BT"}, "und-Deva-FJ": {"value" : "hif-Deva-FJ"}, "pko": {"value" : "pko-Latn-KE"}, "lcm": {"value" : "lcm-Latn-ZZ"}, "crh": {"value" : "crh-Cyrl-UA"}, "lcp": {"value" : "lcp-Thai-CN"}, "tsw": {"value" : "tsw-Latn-ZZ"}
    , "crj": {"value" : "crj-Cans-CA"}, "crl": {"value" : "crl-Cans-CA"}, "und-Arab-MN": {"value" : "kk-Arab-MN"}, "crk": {"value" : "crk-Cans-CA"}, "crm": {"value" : "crm-Cans-CA"}, "und-Arab-MM": {"value" : "rhg-Arab-MM"}, "pla": {"value" : "pla-Latn-ZZ"}, "tte": {"value" : "tte-Latn-ZZ"}, "crs": {"value" : "crs-Latn-SC"}, "ttd": {"value" : "ttd-Latn-ZZ"}, "ldb": {"value" : "ldb-Latn-ZZ"}, "ttj": {"value" : "ttj-Latn-UG"}, "kk-CN": {"value" : "kk-Arab-CN"}, "und-Yiii": {"value" : "ii-Yiii-CN"}, "tts": {"value"
    : "tts-Thai-TH"}, "csb": {"value" : "csb-Latn-PL"}, "ttr": {"value" : "ttr-Latn-ZZ"}, "ttt": {"value" : "ttt-Latn-AZ"}, "csw": {"value" : "csw-Cans-CA"}, "tuh": {"value" : "tuh-Latn-ZZ"}, "led": {"value" : "led-Latn-ZZ"}, "tul": {"value" : "tul-Latn-ZZ"}, "lee": {"value" : "lee-Latn-ZZ"}, "tum": {"value" : "tum-Latn-MW"}, "und-Arab-KH": {"value" : "cja-Arab-KH"}, "tuq": {"value" : "tuq-Latn-ZZ"}, "ctd": {"value" : "ctd-Pauc-MM"}, "lem": {"value" : "lem-Latn-ZZ"}, "lep": {"value" : "lep-Lepc-IN"}, "pms":
    {"value" : "pms-Latn-IT"}, "leq": {"value" : "leq-Latn-ZZ"}, "und-Pauc": {"value" : "ctd-Pauc-MM"}, "und-Sogo": {"value" : "sog-Sogo-UZ"}, "leu": {"value" : "leu-Latn-ZZ"}, "lez": {"value" : "lez-Cyrl-RU"}, "tvd": {"value" : "tvd-Latn-ZZ"}, "mn-CN": {"value" : "mn-Mong-CN"}, "sr-TR": {"value" : "sr-Latn-TR"}, "png": {"value" : "png-Latn-ZZ"}, "tvl": {"value" : "tvl-Latn-TV"}, "und-Brah": {"value" : "pka-Brah-IN"}, "und-Brai": {"value" : "fr-Brai-FR"}, "pnn": {"value" : "pnn-Latn-ZZ"}, "tvu": {"value" : "tvu-Latn-ZZ"}
    , "pnt": {"value" : "pnt-Grek-GR"}, "uz-CN": {"value" : "uz-Cyrl-CN"}, "ha-SD": {"value" : "ha-Arab-SD"}, "twh": {"value" : "twh-Latn-ZZ"}, "und-Takr": {"value" : "doi-Takr-IN"}, "lgg": {"value" : "lgg-Latn-ZZ"}, "pon": {"value" : "pon-Latn-FM"}, "twq": {"value" : "twq-Latn-NE"}, "und-Arab-ID": {"value" : "ms-Arab-ID"}, "und-Arab-IN": {"value" : "ur-Arab-IN"}, "ppa": {"value" : "ppa-Deva-IN"}, "txg": {"value" : "txg-Tang-CN"}, "yam": {"value" : "yam-Latn-ZZ"}, "und-Talu": {"value" : "khb-Talu-CN"}, "yao":
    {"value" : "yao-Latn-MZ"}, "yap": {"value" : "yap-Latn-FM"}, "yas": {"value" : "yas-Latn-ZZ"}, "yat": {"value" : "yat-Latn-ZZ"}, "ppo": {"value" : "ppo-Latn-ZZ"}, "yav": {"value" : "yav-Latn-CM"}, "yay": {"value" : "yay-Latn-ZZ"}, "yaz": {"value" : "yaz-Latn-ZZ"}, "und-Tale": {"value" : "tdd-Tale-CN"}, "ybb": {"value" : "ybb-Latn-CM"}, "yba": {"value" : "yba-Latn-ZZ"}, "tya": {"value" : "tya-Latn-ZZ"}, "lia": {"value" : "lia-Latn-ZZ"}, "lid": {"value" : "lid-Latn-ZZ"}, "und-Latn-TW": {"value" : "trv-Latn-TW"}
    , "lif": {"value" : "lif-Deva-NP"}, "lih": {"value" : "lih-Latn-ZZ"}, "lig": {"value" : "lig-Latn-ZZ"}, "lij": {"value" : "lij-Latn-IT"}, "hag": {"value" : "hag-Latn-ZZ"}, "und-Latn-TN": {"value" : "fr-Latn-TN"}, "tyv": {"value" : "tyv-Cyrl-RU"}, "yby": {"value" : "yby-Latn-ZZ"}, "und-Arab-GB": {"value" : "ks-Arab-GB"}, "hak": {"value" : "hak-Hans-CN"}, "und-Taml": {"value" : "ta-Taml-IN"}, "ham": {"value" : "ham-Latn-ZZ"}, "lis": {"value" : "lis-Lisu-CN"}, "und-Latn-SY": {"value" : "fr-Latn-SY"}, "ky-Latn":
    {"value" : "ky-Latn-TR"}, "pra": {"value" : "pra-Khar-PK"}, "haw": {"value" : "haw-Latn-US"}, "haz": {"value" : "haz-Arab-AF"}, "ku-LB": {"value" : "ku-Arab-LB"}, "prd": {"value" : "prd-Arab-IR"}, "prg": {"value" : "prg-Latn-001"}, "tzm": {"value" : "tzm-Latn-MA"}, "hbb": {"value" : "hbb-Latn-ZZ"}, "und-Latn-UA": {"value" : "pl-Latn-UA"}, "ljp": {"value" : "ljp-Latn-ID"}, "und-Tang": {"value" : "txg-Tang-CN"}, "yue-Hans": {"value" : "yue-Hans-CN"}, "und-Latn-RU": {"value" : "krl-Latn-RU"}, "lki": {"value"
    : "lki-Arab-IR"}, "pss": {"value" : "pss-Latn-ZZ"}, "lkt": {"value" : "lkt-Latn-US"}, "sr-RO": {"value" : "sr-Latn-RO"}, "und-Arab-CN": {"value" : "ug-Arab-CN"}, "lle": {"value" : "lle-Latn-ZZ"}, "und-Cyrl": {"value" : "ru-Cyrl-RU"}, "uz-AF": {"value" : "uz-Arab-AF"}, "yer": {"value" : "yer-Latn-ZZ"}, "und-Beng": {"value" : "bn-Beng-BD"}, "ptp": {"value" : "ptp-Latn-ZZ"}, "lln": {"value" : "lln-Latn-ZZ"}, "sr-RU": {"value" : "sr-Latn-RU"}, "hdy": {"value" : "hdy-Ethi-ZZ"}, "unr-NP": {"value" : "unr-Deva-NP"}
    , "und-Mend": {"value" : "men-Mend-SL"}, "lmn": {"value" : "lmn-Telu-IN"}, "lmp": {"value" : "lmp-Latn-ZZ"}, "lmo": {"value" : "lmo-Latn-IT"}, "puu": {"value" : "puu-Latn-GA"}, "und-Arab-CC": {"value" : "ms-Arab-CC"}, "pal-Phlp": {"value" : "pal-Phlp-CN"}, "ygr": {"value" : "ygr-Latn-ZZ"}, "ygw": {"value" : "ygw-Latn-ZZ"}, "lns": {"value" : "lns-Latn-ZZ"}, "ky-CN": {"value" : "ky-Arab-CN"}, "lnu": {"value" : "lnu-Latn-ZZ"}, "pwa": {"value" : "pwa-Latn-ZZ"}, "und-Chrs": {"value" : "xco-Chrs-UZ"}, "und-Mahj":
    {"value" : "hi-Mahj-IN"}, "rif-NL": {"value" : "rif-Latn-NL"}, "loj": {"value" : "loj-Latn-ZZ"}, "lol": {"value" : "lol-Latn-CD"}, "lok": {"value" : "lok-Latn-ZZ"}, "lor": {"value" : "lor-Latn-ZZ"}, "und-Sora": {"value" : "srb-Sora-IN"}, "los": {"value" : "los-Latn-ZZ"}, "loz": {"value" : "loz-Latn-ZM"}, "und-202": {"value" : "en-Latn-NG"}, "und-Latn-MR": {"value" : "fr-Latn-MR"}, "ku-Yezi": {"value" : "ku-Yezi-GE"}, "hhy": {"value" : "hhy-Latn-ZZ"}, "hia": {"value" : "hia-Latn-ZZ"}, "hif": {"value" : "hif-Latn-FJ"}
    , "dad": {"value" : "dad-Latn-ZZ"}, "hih": {"value" : "hih-Latn-ZZ"}, "hig": {"value" : "hig-Latn-ZZ"}, "daf": {"value" : "daf-Latn-ZZ"}, "ubu": {"value" : "ubu-Latn-ZZ"}, "dah": {"value" : "dah-Latn-ZZ"}, "hil": {"value" : "hil-Latn-PH"}, "dag": {"value" : "dag-Latn-ZZ"}, "und-Mero": {"value" : "xmr-Mero-SD"}, "dak": {"value" : "dak-Latn-US"}, "und-Merc": {"value" : "xmr-Merc-SD"}, "dar": {"value" : "dar-Cyrl-RU"}, "dav": {"value" : "dav-Latn-KE"}, "lrc": {"value" : "lrc-Arab-IR"}, "yko": {"value" : "yko-Latn-ZZ"}
    , "und-Latn-MK": {"value" : "sq-Latn-MK"}, "und-Latn-MM": {"value" : "kac-Latn-MM"}, "dbd": {"value" : "dbd-Latn-ZZ"}, "und-Latn-MO": {"value" : "pt-Latn-MO"}, "und-Latn-MA": {"value" : "fr-Latn-MA"}, "und-Bali": {"value" : "ban-Bali-ID"}, "und-Tavt": {"value" : "blt-Tavt-VN"}, "dbq": {"value" : "dbq-Latn-ZZ"}, "yle": {"value" : "yle-Latn-ZZ"}, "ylg": {"value" : "ylg-Latn-ZZ"}, "und-Maka": {"value" : "mak-Maka-ID"}, "yll": {"value" : "yll-Latn-ZZ"}, "udm": {"value" : "udm-Cyrl-RU"}, "dcc": {"value" : "dcc-Arab-IN"}
    , "yml": {"value" : "yml-Latn-ZZ"}, "hla": {"value" : "hla-Latn-ZZ"}, "und-Latn-IR": {"value" : "tk-Latn-IR"}, "ltg": {"value" : "ltg-Latn-LV"}, "und-Latn-KM": {"value" : "fr-Latn-KM"}, "ddn": {"value" : "ddn-Latn-ZZ"}, "hlu": {"value" : "hlu-Hluw-TR"}, "lua": {"value" : "lua-Latn-CD"}, "und-Bamu": {"value" : "bax-Bamu-CM"}, "hmd": {"value" : "hmd-Plrd-CN"}, "ded": {"value" : "ded-Latn-ZZ"}, "luo": {"value" : "luo-Latn-KE"}, "und-142": {"value" : "zh-Hans-CN"}, "und-143": {"value" : "uz-Latn-UZ"}, "den":
    {"value" : "den-Latn-CA"}, "und-Gran": {"value" : "sa-Gran-IN"}, "hmt": {"value" : "hmt-Latn-ZZ"}, "uga": {"value" : "uga-Ugar-SY"}, "luz": {"value" : "luz-Arab-IR"}, "luy": {"value" : "luy-Latn-KE"}, "und-145": {"value" : "ar-Arab-SA"}, "und-Cakm": {"value" : "ccp-Cakm-BD"}, "und-Dupl": {"value" : "fr-Dupl-FR"}, "yon": {"value" : "yon-Latn-ZZ"}, "ug-MN": {"value" : "ug-Cyrl-MN"}, "hne": {"value" : "hne-Deva-IN"}, "hnd": {"value" : "hnd-Arab-PK"}, "hnj": {"value" : "hnj-Hmng-LA"}, "hno": {"value" : "hno-Arab-PK"}
    , "hnn": {"value" : "hnn-Latn-PH"}, "ug-KZ": {"value" : "ug-Cyrl-KZ"}, "und-154": {"value" : "en-Latn-GB"}, "und-155": {"value" : "de-Latn-DE"}, "und-150": {"value" : "ru-Cyrl-RU"}, "und-151": {"value" : "ru-Cyrl-RU"}, "und-Sylo": {"value" : "syl-Sylo-BD"}, "hoc": {"value" : "hoc-Deva-IN"}, "dga": {"value" : "dga-Latn-ZZ"}, "lwl": {"value" : "lwl-Thai-TH"}, "und-Ital": {"value" : "ett-Ital-IT"}, "hoj": {"value" : "hoj-Deva-IN"}, "dgh": {"value" : "dgh-Latn-ZZ"}, "dgi": {"value" : "dgi-Latn-ZZ"}, "dgl": {"value"
    : "dgl-Arab-ZZ"}, "hot": {"value" : "hot-Latn-ZZ"}, "dgr": {"value" : "dgr-Latn-CA"}, "dgz": {"value" : "dgz-Latn-ZZ"}, "yrb": {"value" : "yrb-Latn-ZZ"}, "yre": {"value" : "yre-Latn-ZZ"}, "und-Lyci": {"value" : "xlc-Lyci-TR"}, "und-Cans": {"value" : "cr-Cans-CA"}, "und-Hluw": {"value" : "hlu-Hluw-TR"}, "und-Nand": {"value" : "sa-Nand-IN"}, "yrl": {"value" : "yrl-Latn-BR"}, "dia": {"value" : "dia-Latn-ZZ"}, "und-Grek": {"value" : "el-Grek-GR"}, "und-Mong": {"value" : "mn-Mong-CN"}, "und-Lydi": {"value" :
    "xld-Lydi-TR"}, "yss": {"value" : "yss-Latn-ZZ"}, "und-Newa": {"value" : "new-Newa-NP"}, "lzh": {"value" : "lzh-Hans-CN"}, "dje": {"value" : "dje-Latn-NE"}, "lzz": {"value" : "lzz-Latn-TR"}, "uli": {"value" : "uli-Latn-FM"}, "hsb": {"value" : "hsb-Latn-DE"}, "und-Xsux": {"value" : "akk-Xsux-IQ"}, "hsn": {"value" : "hsn-Hans-CN"}, "und-Cari": {"value" : "xcr-Cari-TR"}, "und-Syrc": {"value" : "syr-Syrc-IQ"}, "yua": {"value" : "yua-Latn-MX"}, "yue": {"value" : "yue-Hant-HK"}, "umb": {"value" : "umb-Latn-AO"}
    , "yuj": {"value" : "yuj-Latn-ZZ"}, "yut": {"value" : "yut-Latn-ZZ"}, "yuw": {"value" : "yuw-Latn-ZZ"}, "und-Bopo": {"value" : "zh-Bopo-TW"}, "und-Yezi": {"value" : "ku-Yezi-GE"}, "und": {"value" : "en-Latn-US"}, "und-Egyp": {"value" : "egy-Egyp-EG"}, "und-Tglg": {"value" : "fil-Tglg-PH"}, "unr": {"value" : "unr-Beng-IN"}, "hui": {"value" : "hui-Latn-ZZ"}, "und-Elba": {"value" : "sq-Elba-AL"}, "unx": {"value" : "unx-Beng-IN"}, "und-Narb": {"value" : "xna-Narb-SA"}, "pa-PK": {"value" : "pa-Arab-PK"}, "und-Hebr-CA":
    {"value" : "yi-Hebr-CA"}, "uok": {"value" : "uok-Latn-ZZ"}, "und-Geor": {"value" : "ka-Geor-GE"}, "und-Shrd": {"value" : "sa-Shrd-IN"}, "dnj": {"value" : "dnj-Latn-CI"}, "und-Diak": {"value" : "dv-Diak-MV"}, "dob": {"value" : "dob-Latn-ZZ"}, "und-Mymr-TH": {"value" : "mnw-Mymr-TH"}, "doi": {"value" : "doi-Arab-IN"}, "dop": {"value" : "dop-Latn-ZZ"}, "und-Sund": {"value" : "su-Sund-ID"}, "dow": {"value" : "dow-Latn-ZZ"}, "sr-ME": {"value" : "sr-Latn-ME"}, "und-Hung": {"value" : "hu-Hung-HU"}, "mad": {"value"
    : "mad-Latn-ID"}, "mag": {"value" : "mag-Deva-IN"}, "maf": {"value" : "maf-Latn-CM"}, "mai": {"value" : "mai-Deva-IN"}, "mak": {"value" : "mak-Latn-ID"}, "man": {"value" : "man-Latn-GM"}, "mas": {"value" : "mas-Latn-KE"}, "maw": {"value" : "maw-Latn-ZZ"}, "maz": {"value" : "maz-Latn-MX"}, "uri": {"value" : "uri-Latn-ZZ"}, "mbh": {"value" : "mbh-Latn-ZZ"}, "urt": {"value" : "urt-Latn-ZZ"}, "mbo": {"value" : "mbo-Latn-ZZ"}, "urw": {"value" : "urw-Latn-ZZ"}, "mbq": {"value" : "mbq-Latn-ZZ"}, "mbu": {"value"
    : "mbu-Latn-ZZ"}, "und-Hebr-GB": {"value" : "yi-Hebr-GB"}, "usa": {"value" : "usa-Latn-ZZ"}, "mbw": {"value" : "mbw-Latn-ZZ"}, "mci": {"value" : "mci-Latn-ZZ"}, "dri": {"value" : "dri-Latn-ZZ"}, "mcq": {"value" : "mcq-Latn-ZZ"}, "drh": {"value" : "drh-Mong-CN"}, "mcp": {"value" : "mcp-Latn-ZZ"}, "mcr": {"value" : "mcr-Latn-ZZ"}, "mcu": {"value" : "mcu-Latn-ZZ"}, "drs": {"value" : "drs-Ethi-ZZ"}, "mda": {"value" : "mda-Latn-ZZ"}, "mdf": {"value" : "mdf-Cyrl-RU"}, "mde": {"value" : "mde-Arab-ZZ"}, "mdh": {"value"
    : "mdh-Latn-PH"}, "dsb": {"value" : "dsb-Latn-DE"}, "mdj": {"value" : "mdj-Latn-ZZ"}, "utr": {"value" : "utr-Latn-ZZ"}, "mdr": {"value" : "mdr-Latn-ID"}, "mdx": {"value" : "mdx-Ethi-ZZ"}, "mee": {"value" : "mee-Latn-ZZ"}, "med": {"value" : "med-Latn-ZZ"}, "mek": {"value" : "mek-Latn-ZZ"}, "men": {"value" : "men-Latn-SL"}, "az-RU": {"value" : "az-Cyrl-RU"}, "mis-Medf": {"value" : "mis-Medf-NG"}, "mer": {"value" : "mer-Latn-KE"}, "dtm": {"value" : "dtm-Latn-ML"}, "meu": {"value" : "meu-Latn-ZZ"}, "met": {"value"
    : "met-Latn-ZZ"}, "dtp": {"value" : "dtp-Latn-MY"}, "dts": {"value" : "dts-Latn-ZZ"}, "uvh": {"value" : "uvh-Latn-ZZ"}, "dty": {"value" : "dty-Deva-NP"}, "mfa": {"value" : "mfa-Arab-TH"}, "uvl": {"value" : "uvl-Latn-ZZ"}, "mfe": {"value" : "mfe-Latn-MU"}, "dua": {"value" : "dua-Latn-CM"}, "dud": {"value" : "dud-Latn-ZZ"}, "duc": {"value" : "duc-Latn-ZZ"}, "mfn": {"value" : "mfn-Latn-ZZ"}, "dug": {"value" : "dug-Latn-ZZ"}, "mfo": {"value" : "mfo-Latn-ZZ"}, "mfq": {"value" : "mfq-Latn-ZZ"}, "und-Phag": {"value"
    : "lzh-Phag-CN"}, "dva": {"value" : "dva-Latn-ZZ"}, "mgh": {"value" : "mgh-Latn-MZ"}, "mgl": {"value" : "mgl-Latn-ZZ"}, "mgo": {"value" : "mgo-Latn-CM"}, "mgp": {"value" : "mgp-Deva-NP"}, "mgy": {"value" : "mgy-Latn-TZ"}, "zag": {"value" : "zag-Latn-SD"}, "mhi": {"value" : "mhi-Latn-ZZ"}, "mhl": {"value" : "mhl-Latn-ZZ"}, "dww": {"value" : "dww-Latn-ZZ"}, "mif": {"value" : "mif-Latn-ZZ"}, "und-Mymr-IN": {"value" : "kht-Mymr-IN"}, "min": {"value" : "min-Latn-ID"}, "mis": {"value" : "mis-Hatr-IQ"}, "ian":
    {"value" : "ian-Latn-ZZ"}, "miw": {"value" : "miw-Latn-ZZ"}, "iar": {"value" : "iar-Latn-ZZ"}, "uz-Arab": {"value" : "uz-Arab-AF"}, "ibb": {"value" : "ibb-Latn-NG"}, "iba": {"value" : "iba-Latn-MY"}, "dyo": {"value" : "dyo-Latn-SN"}, "dyu": {"value" : "dyu-Latn-BF"}, "iby": {"value" : "iby-Latn-ZZ"}, "zdj": {"value" : "zdj-Arab-KM"}, "ica": {"value" : "ica-Latn-ZZ"}, "mki": {"value" : "mki-Arab-ZZ"}, "und-Wcho": {"value" : "nnp-Wcho-IN"}, "ich": {"value" : "ich-Latn-ZZ"}, "mkl": {"value" : "mkl-Latn-ZZ"}
    , "dzg": {"value" : "dzg-Latn-ZZ"}, "mkp": {"value" : "mkp-Latn-ZZ"}, "zea": {"value" : "zea-Latn-NL"}, "mkw": {"value" : "mkw-Latn-ZZ"}, "mle": {"value" : "mle-Latn-ZZ"}, "idd": {"value" : "idd-Latn-ZZ"}, "idi": {"value" : "idi-Latn-ZZ"}, "lif-Limb": {"value" : "lif-Limb-IN"}, "mlp": {"value" : "mlp-Latn-ZZ"}, "mls": {"value" : "mls-Latn-SD"}, "idu": {"value" : "idu-Latn-ZZ"}, "quc": {"value" : "quc-Latn-GT"}, "qug": {"value" : "qug-Latn-EC"}, "und-Jamo": {"value" : "ko-Jamo-KR"}, "mmo": {"value" : "mmo-Latn-ZZ"}
    , "mmu": {"value" : "mmu-Latn-ZZ"}, "mmx": {"value" : "mmx-Latn-ZZ"}, "zgh": {"value" : "zgh-Tfng-MA"}, "mna": {"value" : "mna-Latn-ZZ"}, "mnf": {"value" : "mnf-Latn-ZZ"}, "ife": {"value" : "ife-Latn-TG"}, "mni": {"value" : "mni-Beng-IN"}, "mnw": {"value" : "mnw-Mymr-MM"}, "moa": {"value" : "moa-Latn-ZZ"}, "moe": {"value" : "moe-Latn-CA"}, "igb": {"value" : "igb-Latn-ZZ"}, "ige": {"value" : "ige-Latn-ZZ"}, "moh": {"value" : "moh-Latn-CA"}, "und-Hebr-SE": {"value" : "yi-Hebr-SE"}, "zhx": {"value" : "zhx-Nshu-CN"}
    , "mos": {"value" : "mos-Latn-BF"}, "und-Shaw": {"value" : "en-Shaw-GB"}, "zia": {"value" : "zia-Latn-ZZ"}, "mox": {"value" : "mox-Latn-ZZ"}, "vag": {"value" : "vag-Latn-ZZ"}, "vai": {"value" : "vai-Vaii-LR"}, "van": {"value" : "van-Latn-ZZ"}, "mpp": {"value" : "mpp-Latn-ZZ"}, "mpt": {"value" : "mpt-Latn-ZZ"}, "mps": {"value" : "mps-Latn-ZZ"}, "mpx": {"value" : "mpx-Latn-ZZ"}, "und-Hebr-US": {"value" : "yi-Hebr-US"}, "hi-Latn": {"value" : "hi-Latn-IN"}, "mql": {"value" : "mql-Latn-ZZ"}, "und-Hebr-UA": {"value"
    : "yi-Hebr-UA"}, "mrd": {"value" : "mrd-Deva-NP"}, "zkt": {"value" : "zkt-Kits-CN"}, "mrj": {"value" : "mrj-Cyrl-RU"}, "ijj": {"value" : "ijj-Latn-ZZ"}, "mro": {"value" : "mro-Mroo-BD"}, "und-Modi": {"value" : "mr-Modi-IN"}, "ebu": {"value" : "ebu-Latn-KE"}, "zlm": {"value" : "zlm-Latn-TG"}, "arc-Palm": {"value" : "arc-Palm-SY"}, "ikk": {"value" : "ikk-Latn-ZZ"}, "ikt": {"value" : "ikt-Latn-CA"}, "ikw": {"value" : "ikw-Latn-ZZ"}, "vec": {"value" : "vec-Latn-IT"}, "ikx": {"value" : "ikx-Latn-ZZ"}, "zmi":
    {"value" : "zmi-Latn-MY"}, "mtc": {"value" : "mtc-Latn-ZZ"}, "mtf": {"value" : "mtf-Latn-ZZ"}, "vep": {"value" : "vep-Latn-RU"}, "zh-Bopo": {"value" : "zh-Bopo-TW"}, "mti": {"value" : "mti-Latn-ZZ"}, "und-Ethi": {"value" : "am-Ethi-ET"}, "mtr": {"value" : "mtr-Deva-IN"}, "und-Thai-LA": {"value" : "kdt-Thai-LA"}, "ilo": {"value" : "ilo-Latn-PH"}, "zne": {"value" : "zne-Latn-ZZ"}, "mua": {"value" : "mua-Latn-CM"}, "und-Thai-KH": {"value" : "kdt-Thai-KH"}, "imo": {"value" : "imo-Latn-ZZ"}, "mus": {"value" :
    "mus-Latn-US"}, "mur": {"value" : "mur-Latn-ZZ"}, "mva": {"value" : "mva-Latn-ZZ"}, "inh": {"value" : "inh-Cyrl-RU"}, "mvn": {"value" : "mvn-Latn-ZZ"}, "efi": {"value" : "efi-Latn-NG"}, "mvy": {"value" : "mvy-Arab-PK"}, "und-Java": {"value" : "jv-Java-ID"}, "mwk": {"value" : "mwk-Latn-ML"}, "mwr": {"value" : "mwr-Deva-IN"}, "und-021": {"value" : "en-Latn-US"}, "egl": {"value" : "egl-Latn-IT"}, "mww": {"value" : "mww-Hmnp-US"}, "mwv": {"value" : "mwv-Latn-ID"}, "iou": {"value" : "iou-Latn-ZZ"}, "und-029":
    {"value" : "es-Latn-CU"}, "vic": {"value" : "vic-Latn-SX"}, "egy": {"value" : "egy-Egyp-EG"}, "und-Ugar": {"value" : "uga-Ugar-SY"}, "mxc": {"value" : "mxc-Latn-ZW"}, "raj": {"value" : "raj-Deva-IN"}, "rai": {"value" : "rai-Latn-ZZ"}, "rao": {"value" : "rao-Latn-ZZ"}, "viv": {"value" : "viv-Latn-ZZ"}, "mxm": {"value" : "mxm-Latn-ZZ"}, "und-034": {"value" : "hi-Deva-IN"}, "und-030": {"value" : "zh-Hans-CN"}, "und-039": {"value" : "it-Latn-IT"}, "und-035": {"value" : "id-Latn-ID"}, "ug-Cyrl": {"value" : "ug-Cyrl-KZ"}
    , "myk": {"value" : "myk-Latn-ZZ"}, "mym": {"value" : "mym-Ethi-ZZ"}, "aai": {"value" : "aai-Latn-ZZ"}, "aak": {"value" : "aak-Latn-ZZ"}, "myw": {"value" : "myw-Latn-ZZ"}, "myv": {"value" : "myv-Cyrl-RU"}, "myx": {"value" : "myx-Latn-UG"}, "myz": {"value" : "myz-Mand-IR"}, "und-Sinh": {"value" : "si-Sinh-LK"}, "und-Sind": {"value" : "sd-Sind-IN"}, "aau": {"value" : "aau-Latn-ZZ"}, "rcf": {"value" : "rcf-Latn-RE"}, "und-Orkh": {"value" : "otk-Orkh-MN"}, "mzk": {"value" : "mzk-Latn-ZZ"}, "mzn": {"value" :
    "mzn-Arab-IR"}, "iri": {"value" : "iri-Latn-ZZ"}, "mzm": {"value" : "mzm-Latn-ZZ"}, "mzp": {"value" : "mzp-Latn-ZZ"}, "und-053": {"value" : "en-Latn-AU"}, "abi": {"value" : "abi-Latn-ZZ"}, "und-054": {"value" : "en-Latn-PG"}, "mzw": {"value" : "mzw-Latn-ZZ"}, "mzz": {"value" : "mzz-Latn-ZZ"}, "abr": {"value" : "abr-Latn-GH"}, "abq": {"value" : "abq-Cyrl-ZZ"}, "abt": {"value" : "abt-Latn-ZZ"}, "und-057": {"value" : "en-Latn-GU"}, "aby": {"value" : "aby-Latn-ZZ"}, "eka": {"value" : "eka-Latn-ZZ"}, "vls": {"value"
    : "vls-Latn-BE"}, "ace": {"value" : "ace-Latn-ID"}, "acd": {"value" : "acd-Latn-ZZ"}, "ach": {"value" : "ach-Latn-UG"}, "vmf": {"value" : "vmf-Latn-DE"}, "eky": {"value" : "eky-Kali-MM"}, "rej": {"value" : "rej-Latn-ID"}, "rel": {"value" : "rel-Latn-ZZ"}, "ada": {"value" : "ada-Latn-GH"}, "res": {"value" : "res-Latn-ZZ"}, "vmw": {"value" : "vmw-Latn-MZ"}, "ade": {"value" : "ade-Latn-ZZ"}, "adj": {"value" : "adj-Latn-ZZ"}, "und-Hira": {"value" : "ja-Hira-JP"}, "adp": {"value" : "adp-Tibt-BT"}, "adz": {"value"
    : "adz-Latn-ZZ"}, "ady": {"value" : "ady-Cyrl-RU"}, "ema": {"value" : "ema-Latn-ZZ"}, "und-Deva": {"value" : "hi-Deva-IN"}, "aeb": {"value" : "aeb-Arab-TN"}, "emi": {"value" : "emi-Latn-ZZ"}, "und-009": {"value" : "en-Latn-AU"}, "aey": {"value" : "aey-Latn-ZZ"}, "und-002": {"value" : "en-Latn-NG"}, "und-003": {"value" : "en-Latn-US"}, "und-005": {"value" : "pt-Latn-BR"}, "rgn": {"value" : "rgn-Latn-IT"}, "vot": {"value" : "vot-Latn-RU"}, "enn": {"value" : "enn-Latn-ZZ"}, "enq": {"value" : "enq-Latn-ZZ"}
    , "und-011": {"value" : "en-Latn-NG"}, "rhg": {"value" : "rhg-Arab-MM"}, "und-017": {"value" : "sw-Latn-CD"}, "und-018": {"value" : "en-Latn-ZA"}, "und-019": {"value" : "en-Latn-US"}, "und-013": {"value" : "es-Latn-MX"}, "und-014": {"value" : "sw-Latn-TZ"}, "und-015": {"value" : "ar-Arab-EG"}, "agc": {"value" : "agc-Latn-ZZ"}, "und-Zanb": {"value" : "cmg-Zanb-MN"}, "iwm": {"value" : "iwm-Latn-ZZ"}, "agd": {"value" : "agd-Latn-ZZ"}, "agg": {"value" : "agg-Latn-ZZ"}, "iws": {"value" : "iws-Latn-ZZ"}, "agm":
    {"value" : "agm-Latn-ZZ"}, "ago": {"value" : "ago-Latn-ZZ"}, "agq": {"value" : "agq-Latn-CM"}, "ria": {"value" : "ria-Latn-IN"}, "rif": {"value" : "rif-Tfng-MA"}, "nac": {"value" : "nac-Latn-ZZ"}, "naf": {"value" : "naf-Latn-ZZ"}, "nak": {"value" : "nak-Latn-ZZ"}, "nan": {"value" : "nan-Hans-CN"}, "aha": {"value" : "aha-Latn-ZZ"}, "nap": {"value" : "nap-Latn-IT"}, "naq": {"value" : "naq-Latn-NA"}, "zza": {"value" : "zza-Latn-TR"}, "nas": {"value" : "nas-Latn-ZZ"}, "ahl": {"value" : "ahl-Latn-ZZ"}, "en-Shaw":
    {"value" : "en-Shaw-GB"}, "und-Copt": {"value" : "cop-Copt-EG"}, "aho": {"value" : "aho-Ahom-IN"}, "vro": {"value" : "vro-Latn-EE"}, "rjs": {"value" : "rjs-Deva-NP"}, "nca": {"value" : "nca-Latn-ZZ"}, "ncf": {"value" : "ncf-Latn-ZZ"}, "nce": {"value" : "nce-Latn-ZZ"}, "nch": {"value" : "nch-Latn-MX"}, "izh": {"value" : "izh-Latn-RU"}, "izi": {"value" : "izi-Latn-ZZ"}, "rkt": {"value" : "rkt-Beng-BD"}, "nco": {"value" : "nco-Latn-ZZ"}, "eri": {"value" : "eri-Latn-ZZ"}, "ajg": {"value" : "ajg-Latn-ZZ"}, "ncu":
    {"value" : "ncu-Latn-ZZ"}, "ndc": {"value" : "ndc-Latn-MZ"}, "esg": {"value" : "esg-Gonm-IN"}, "nds": {"value" : "nds-Latn-DE"}, "akk": {"value" : "akk-Xsux-IQ"}, "esu": {"value" : "esu-Latn-US"}, "neb": {"value" : "neb-Latn-ZZ"}, "rmf": {"value" : "rmf-Latn-FI"}, "und-061": {"value" : "sm-Latn-WS"}, "und-Limb": {"value" : "lif-Limb-IN"}, "vun": {"value" : "vun-Latn-TZ"}, "ff-Adlm": {"value" : "ff-Adlm-GN"}, "vut": {"value" : "vut-Latn-ZZ"}, "rmo": {"value" : "rmo-Latn-CH"}, "ala": {"value" : "ala-Latn-ZZ"}
    , "rmt": {"value" : "rmt-Arab-IR"}, "rmu": {"value" : "rmu-Latn-SE"}, "ali": {"value" : "ali-Latn-ZZ"}, "nex": {"value" : "nex-Latn-ZZ"}, "new": {"value" : "new-Deva-NP"}, "aln": {"value" : "aln-Latn-XK"}, "etr": {"value" : "etr-Latn-ZZ"}, "und-Rohg": {"value" : "rhg-Rohg-MM"}, "ett": {"value" : "ett-Ital-IT"}, "rna": {"value" : "rna-Latn-ZZ"}, "etu": {"value" : "etu-Latn-ZZ"}, "alt": {"value" : "alt-Cyrl-RU"}, "etx": {"value" : "etx-Latn-ZZ"}, "rng": {"value" : "rng-Latn-MZ"}, "und-Linb": {"value" : "grc-Linb-GR"}
    , "und-Lina": {"value" : "lab-Lina-GR"}, "und-Jpan": {"value" : "ja-Jpan-JP"}, "man-GN": {"value" : "man-Nkoo-GN"}, "nfr": {"value" : "nfr-Latn-ZZ"}, "amm": {"value" : "amm-Latn-ZZ"}, "und-Arab": {"value" : "ar-Arab-EG"}, "amo": {"value" : "amo-Latn-NG"}, "amn": {"value" : "amn-Latn-ZZ"}, "rob": {"value" : "rob-Latn-ID"}, "amp": {"value" : "amp-Latn-ZZ"}, "ngb": {"value" : "ngb-Latn-ZZ"}, "rof": {"value" : "rof-Latn-TZ"}, "nga": {"value" : "nga-Latn-ZZ"}, "ngl": {"value" : "ngl-Latn-MZ"}, "roo": {"value"
    : "roo-Latn-ZZ"}, "anc": {"value" : "anc-Latn-ZZ"}, "ank": {"value" : "ank-Latn-ZZ"}, "ann": {"value" : "ann-Latn-ZZ"}, "und-Bhks": {"value" : "sa-Bhks-IN"}, "nhb": {"value" : "nhb-Latn-ZZ"}, "nhe": {"value" : "nhe-Latn-MX"}, "any": {"value" : "any-Latn-ZZ"}, "und-Orya": {"value" : "or-Orya-IN"}, "ewo": {"value" : "ewo-Latn-CM"}, "nhw": {"value" : "nhw-Latn-MX"}, "aoj": {"value" : "aoj-Latn-ZZ"}, "aom": {"value" : "aom-Latn-ZZ"}, "zh-Hanb": {"value" : "zh-Hanb-TW"}, "und-Kits": {"value" : "zkt-Kits-CN"}
    , "jab": {"value" : "jab-Latn-ZZ"}, "nif": {"value" : "nif-Latn-ZZ"}, "aoz": {"value" : "aoz-Latn-ID"}, "nij": {"value" : "nij-Latn-ID"}, "nii": {"value" : "nii-Latn-ZZ"}, "zh-PH": {"value" : "zh-Hant-PH"}, "nin": {"value" : "nin-Latn-ZZ"}, "zh-Hant": {"value" : "zh-Hant-TW"}, "zh-PF": {"value" : "zh-Hant-PF"}, "und-Ahom": {"value" : "aho-Ahom-IN"}, "apd": {"value" : "apd-Arab-TG"}, "apc": {"value" : "apc-Arab-ZZ"}, "ape": {"value" : "ape-Latn-ZZ"}, "jam": {"value" : "jam-Latn-JM"}, "zh-PA": {"value" : "zh-Hant-PA"}
    , "niu": {"value" : "niu-Latn-NU"}, "niz": {"value" : "niz-Latn-ZZ"}, "niy": {"value" : "niy-Latn-ZZ"}, "ext": {"value" : "ext-Latn-ES"}, "apr": {"value" : "apr-Latn-ZZ"}, "aps": {"value" : "aps-Latn-ZZ"}, "apz": {"value" : "apz-Latn-ZZ"}, "rro": {"value" : "rro-Latn-ZZ"}, "njo": {"value" : "njo-Latn-IN"}, "jbo": {"value" : "jbo-Latn-001"}, "jbu": {"value" : "jbu-Latn-ZZ"}, "zh-MO": {"value" : "zh-Hant-MO"}, "nkg": {"value" : "nkg-Latn-ZZ"}, "zh-MY": {"value" : "zh-Hant-MY"}, "arc": {"value" : "arc-Armi-IR"}
    , "nko": {"value" : "nko-Latn-ZZ"}, "arh": {"value" : "arh-Latn-ZZ"}, "pa-Arab": {"value" : "pa-Arab-PK"}, "und-Mtei": {"value" : "mni-Mtei-IN"}, "arn": {"value" : "arn-Latn-CL"}, "aro": {"value" : "aro-Latn-BO"}, "und-Cyrl-RO": {"value" : "bg-Cyrl-RO"}, "arq": {"value" : "arq-Arab-DZ"}, "ars": {"value" : "ars-Arab-SA"}, "arz": {"value" : "arz-Arab-EG"}, "ary": {"value" : "ary-Arab-MA"}, "rtm": {"value" : "rtm-Latn-FJ"}, "asa": {"value" : "asa-Latn-TZ"}, "und-Grek-TR": {"value" : "bgx-Grek-TR"}, "ase": {"value"
    : "ase-Sgnw-US"}, "asg": {"value" : "asg-Latn-ZZ"}, "aso": {"value" : "aso-Latn-ZZ"}, "ast": {"value" : "ast-Latn-ES"}, "rue": {"value" : "rue-Cyrl-UA"}, "rug": {"value" : "rug-Latn-SB"}, "nmg": {"value" : "nmg-Latn-CM"}, "ata": {"value" : "ata-Latn-ZZ"}, "jen": {"value" : "jen-Latn-ZZ"}, "atg": {"value" : "atg-Latn-ZZ"}, "atj": {"value" : "atj-Latn-CA"}, "nmz": {"value" : "nmz-Latn-ZZ"}, "unr-Deva": {"value" : "unr-Deva-NP"}, "nnf": {"value" : "nnf-Latn-ZZ"}, "nnh": {"value" : "nnh-Latn-CM"}, "nnk": {"value"
    : "nnk-Latn-ZZ"}, "nnm": {"value" : "nnm-Latn-ZZ"}, "nnp": {"value" : "nnp-Wcho-IN"}, "az-IR": {"value" : "az-Arab-IR"}, "und-Adlm": {"value" : "ff-Adlm-GN"}, "az-IQ": {"value" : "az-Arab-IQ"}, "und-Nbat": {"value" : "arc-Nbat-JO"}, "sd-Khoj": {"value" : "sd-Khoj-IN"}, "nod": {"value" : "nod-Lana-TH"}, "auy": {"value" : "auy-Latn-ZZ"}, "noe": {"value" : "noe-Deva-IN"}, "rwk": {"value" : "rwk-Latn-TZ"}, "und-Cyrl-MD": {"value" : "uk-Cyrl-MD"}, "rwo": {"value" : "rwo-Latn-ZZ"}, "non": {"value" : "non-Runr-SE"}
    , "nop": {"value" : "nop-Latn-ZZ"}, "jgk": {"value" : "jgk-Latn-ZZ"}, "jgo": {"value" : "jgo-Latn-CM"}, "und-Vaii": {"value" : "vai-Vaii-LR"}, "nou": {"value" : "nou-Latn-ZZ"}, "avl": {"value" : "avl-Arab-ZZ"}, "avn": {"value" : "avn-Latn-ZZ"}, "wae": {"value" : "wae-Latn-CH"}, "avt": {"value" : "avt-Latn-ZZ"}, "avu": {"value" : "avu-Latn-ZZ"}, "waj": {"value" : "waj-Latn-ZZ"}, "wal": {"value" : "wal-Ethi-ET"}, "wan": {"value" : "wan-Latn-ZZ"}, "zh-HK": {"value" : "zh-Hant-HK"}, "war": {"value" : "war-Latn-PH"}
    , "awa": {"value" : "awa-Deva-IN"}, "und-Plrd": {"value" : "hmd-Plrd-CN"}, "awb": {"value" : "awb-Latn-ZZ"}, "awo": {"value" : "awo-Latn-ZZ"}, "und-Knda": {"value" : "kn-Knda-IN"}, "zh-ID": {"value" : "zh-Hant-ID"}, "jib": {"value" : "jib-Latn-ZZ"}, "awx": {"value" : "awx-Latn-ZZ"}, "wbp": {"value" : "wbp-Latn-AU"}, "und-Sidd": {"value" : "sa-Sidd-IN"}, "fab": {"value" : "fab-Latn-ZZ"}, "wbr": {"value" : "wbr-Deva-IN"}, "faa": {"value" : "faa-Latn-ZZ"}, "wbq": {"value" : "wbq-Telu-IN"}, "und-Kali": {"value"
    : "eky-Kali-MM"}, "fag": {"value" : "fag-Latn-ZZ"}, "nqo": {"value" : "nqo-Nkoo-GN"}, "fai": {"value" : "fai-Latn-ZZ"}, "ryu": {"value" : "ryu-Kana-JP"}, "fan": {"value" : "fan-Latn-GQ"}, "wci": {"value" : "wci-Latn-ZZ"}, "nrb": {"value" : "nrb-Latn-ZZ"}, "und-Phlp": {"value" : "pal-Phlp-CN"}, "ayb": {"value" : "ayb-Latn-ZZ"}, "und-Phli": {"value" : "pal-Phli-IR"}, "cu-Glag": {"value" : "cu-Glag-BG"}, "und-Cyrl-XK": {"value" : "sr-Cyrl-XK"}, "az-Arab": {"value" : "az-Arab-IR"}, "ks-Deva": {"value" : "ks-Deva-IN"}
    , "und-Thai": {"value" : "th-Thai-TH"}, "nsk": {"value" : "nsk-Cans-CA"}, "nsn": {"value" : "nsn-Latn-ZZ"}, "nso": {"value" : "nso-Latn-ZA"}, "und-Thaa": {"value" : "dv-Thaa-MV"}, "und-Nshu": {"value" : "zhx-Nshu-CN"}, "nss": {"value" : "nss-Latn-ZZ"}, "zh-VN": {"value" : "zh-Hant-VN"}, "und-Hmnp": {"value" : "mww-Hmnp-US"}, "und-Kana": {"value" : "ja-Kana-JP"}, "und-Hmng": {"value" : "hnj-Hmng-LA"}, "wer": {"value" : "wer-Latn-ZZ"}, "zh-TW": {"value" : "zh-Hant-TW"}, "ntm": {"value" : "ntm-Latn-ZZ"}, "ntr":
    {"value" : "ntr-Latn-ZZ"}, "zh-US": {"value" : "zh-Hant-US"}, "und-Xpeo": {"value" : "peo-Xpeo-IR"}, "jmc": {"value" : "jmc-Latn-TZ"}, "nui": {"value" : "nui-Latn-ZZ"}, "jml": {"value" : "jml-Deva-NP"}, "nup": {"value" : "nup-Latn-ZZ"}, "und-Cyrl-SK": {"value" : "uk-Cyrl-SK"}, "nus": {"value" : "nus-Latn-SS"}, "nuv": {"value" : "nuv-Latn-ZZ"}, "nux": {"value" : "nux-Latn-ZZ"}, "zh-TH": {"value" : "zh-Hant-TH"}, "wgi": {"value" : "wgi-Latn-ZZ"}, "und-Phnx": {"value" : "phn-Phnx-LB"}, "und-Cyrl-TR": {"value"
    : "kbd-Cyrl-TR"}, "ffi": {"value" : "ffi-Latn-ZZ"}, "und-Elym": {"value" : "arc-Elym-IR"}, "ffm": {"value" : "ffm-Latn-ML"}, "und-Rjng": {"value" : "rej-Rjng-ID"}, "whg": {"value" : "whg-Latn-ZZ"}, "nwb": {"value" : "nwb-Latn-ZZ"}, "zh-SR": {"value" : "zh-Hant-SR"}, "wib": {"value" : "wib-Latn-ZZ"}, "und-Hebr": {"value" : "he-Hebr-IL"}, "saf": {"value" : "saf-Latn-GH"}, "sah": {"value" : "sah-Cyrl-RU"}, "saq": {"value" : "saq-Latn-KE"}, "wiu": {"value" : "wiu-Latn-ZZ"}, "sas": {"value" : "sas-Latn-ID"},
    "wiv": {"value" : "wiv-Latn-ZZ"}, "nxq": {"value" : "nxq-Latn-CN"}, "sat": {"value" : "sat-Olck-IN"}, "nxr": {"value" : "nxr-Latn-ZZ"}, "sav": {"value" : "sav-Latn-SN"}, "saz": {"value" : "saz-Saur-IN"}, "wja": {"value" : "wja-Latn-ZZ"}, "sba": {"value" : "sba-Latn-ZZ"}, "sbe": {"value" : "sbe-Latn-ZZ"}, "wji": {"value" : "wji-Latn-ZZ"}, "mn-Mong": {"value" : "mn-Mong-CN"}, "und-419": {"value" : "es-Latn-419"}, "fia": {"value" : "fia-Arab-SD"}, "sbp": {"value" : "sbp-Latn-TZ"}, "und-NO": {"value" : "nb-Latn-NO"}
    , "nyn": {"value" : "nyn-Latn-UG"}, "nym": {"value" : "nym-Latn-TZ"}, "und-NL": {"value" : "nl-Latn-NL"}, "und-NP": {"value" : "ne-Deva-NP"}, "fil": {"value" : "fil-Latn-PH"}, "bal": {"value" : "bal-Arab-PK"}, "ban": {"value" : "ban-Latn-ID"}, "bap": {"value" : "bap-Deva-NP"}, "fit": {"value" : "fit-Latn-SE"}, "bar": {"value" : "bar-Latn-AT"}, "bas": {"value" : "bas-Latn-CM"}, "bav": {"value" : "bav-Latn-ZZ"}, "bax": {"value" : "bax-Bamu-CM"}, "jra": {"value" : "jra-Latn-ZZ"}, "sck": {"value" : "sck-Deva-IN"}
    , "nzi": {"value" : "nzi-Latn-GH"}, "scl": {"value" : "scl-Arab-ZZ"}, "sco": {"value" : "sco-Latn-GB"}, "scn": {"value" : "scn-Latn-IT"}, "aa": {"value" : "aa-Latn-ET"}, "bba": {"value" : "bba-Latn-ZZ"}, "und-MN": {"value" : "mn-Cyrl-MN"}, "ab": {"value" : "ab-Cyrl-GE"}, "und-MM": {"value" : "my-Mymr-MM"}, "und-Osma": {"value" : "so-Osma-SO"}, "bbc": {"value" : "bbc-Latn-ID"}, "scs": {"value" : "scs-Latn-CA"}, "und-ML": {"value" : "bm-Latn-ML"}, "bbb": {"value" : "bbb-Latn-ZZ"}, "und-MK": {"value" : "mk-Cyrl-MK"}
    , "ae": {"value" : "ae-Avst-IR"}, "und-MR": {"value" : "ar-Arab-MR"}, "af": {"value" : "af-Latn-ZA"}, "bbd": {"value" : "bbd-Latn-ZZ"}, "und-MQ": {"value" : "fr-Latn-MQ"}, "und-Wara": {"value" : "hoc-Wara-IN"}, "und-MO": {"value" : "zh-Hant-MO"}, "und-MV": {"value" : "dv-Thaa-MV"}, "und-MU": {"value" : "mfe-Latn-MU"}, "ak": {"value" : "ak-Latn-GH"}, "und-MT": {"value" : "mt-Latn-MT"}, "bbj": {"value" : "bbj-Latn-CM"}, "am": {"value" : "am-Ethi-ET"}, "und-MZ": {"value" : "pt-Latn-MZ"}, "an": {"value" : "an-Latn-ES"}
    , "und-MY": {"value" : "ms-Latn-MY"}, "und-MX": {"value" : "es-Latn-MX"}, "ar": {"value" : "ar-Arab-EG"}, "bbp": {"value" : "bbp-Latn-ZZ"}, "as": {"value" : "as-Beng-IN"}, "bbr": {"value" : "bbr-Latn-ZZ"}, "sdc": {"value" : "sdc-Latn-IT"}, "und-NC": {"value" : "fr-Latn-NC"}, "av": {"value" : "av-Cyrl-RU"}, "sdh": {"value" : "sdh-Arab-IR"}, "und-NA": {"value" : "af-Latn-NA"}, "ay": {"value" : "ay-Latn-BO"}, "az": {"value" : "az-Latn-AZ"}, "und-NE": {"value" : "ha-Latn-NE"}, "und-NI": {"value" : "es-Latn-NI"}
    , "ba": {"value" : "ba-Cyrl-RU"}, "wls": {"value" : "wls-Latn-WF"}, "und-Kore": {"value" : "ko-Kore-KR"}, "und-LK": {"value" : "si-Sinh-LK"}, "be": {"value" : "be-Cyrl-BY"}, "bcf": {"value" : "bcf-Latn-ZZ"}, "bg": {"value" : "bg-Cyrl-BG"}, "bch": {"value" : "bch-Latn-ZZ"}, "bi": {"value" : "bi-Latn-VU"}, "und-LU": {"value" : "fr-Latn-LU"}, "bci": {"value" : "bci-Latn-CI"}, "und-LT": {"value" : "lt-Latn-LT"}, "und-LS": {"value" : "st-Latn-LS"}, "bm": {"value" : "bm-Latn-ML"}, "bcn": {"value" : "bcn-Latn-ZZ"}
    , "bn": {"value" : "bn-Beng-BD"}, "und-LY": {"value" : "ar-Arab-LY"}, "bcm": {"value" : "bcm-Latn-ZZ"}, "bo": {"value" : "bo-Tibt-CN"}, "bco": {"value" : "bco-Latn-ZZ"}, "und-LV": {"value" : "lv-Latn-LV"}, "br": {"value" : "br-Latn-FR"}, "bcq": {"value" : "bcq-Ethi-ZZ"}, "bs": {"value" : "bs-Latn-BA"}, "bcu": {"value" : "bcu-Latn-ZZ"}, "sef": {"value" : "sef-Latn-CI"}, "und-MA": {"value" : "ar-Arab-MA"}, "sei": {"value" : "sei-Latn-MX"}, "seh": {"value" : "seh-Latn-MZ"}, "und-MF": {"value" : "fr-Latn-MF"}
    , "wmo": {"value" : "wmo-Latn-ZZ"}, "und-ME": {"value" : "sr-Latn-ME"}, "und-MD": {"value" : "ro-Latn-MD"}, "und-MC": {"value" : "fr-Latn-MC"}, "ca": {"value" : "ca-Latn-ES"}, "und-MG": {"value" : "mg-Latn-MG"}, "ses": {"value" : "ses-Latn-ML"}, "ce": {"value" : "ce-Cyrl-RU"}, "und-Cyrl-BA": {"value" : "sr-Cyrl-BA"}, "bdd": {"value" : "bdd-Latn-ZZ"}, "und-KP": {"value" : "ko-Kore-KP"}, "ch": {"value" : "ch-Latn-GU"}, "und-KM": {"value" : "ar-Arab-KM"}, "und-KR": {"value" : "ko-Kore-KR"}, "co": {"value" :
    "co-Latn-FR"}, "flr": {"value" : "flr-Latn-ZZ"}, "und-KW": {"value" : "ar-Arab-KW"}, "wnc": {"value" : "wnc-Latn-ZZ"}, "und-Dogr": {"value" : "doi-Dogr-IN"}, "cr": {"value" : "cr-Cans-CA"}, "cs": {"value" : "cs-Latn-CZ"}, "cu": {"value" : "cu-Cyrl-RU"}, "und-KZ": {"value" : "ru-Cyrl-KZ"}, "cv": {"value" : "cv-Cyrl-RU"}, "wni": {"value" : "wni-Arab-KM"}, "und-LA": {"value" : "lo-Laoo-LA"}, "cy": {"value" : "cy-Latn-GB"}, "und-LB": {"value" : "ar-Arab-LB"}, "und-LI": {"value" : "de-Latn-LI"}, "da": {"value"
    : "da-Latn-DK"}, "und-Cyrl-AL": {"value" : "mk-Cyrl-AL"}, "wnu": {"value" : "wnu-Latn-ZZ"}, "de": {"value" : "de-Latn-DE"}, "bef": {"value" : "bef-Latn-ZZ"}, "beh": {"value" : "beh-Latn-ZZ"}, "und-JO": {"value" : "ar-Arab-JO"}, "bej": {"value" : "bej-Arab-SD"}, "fmp": {"value" : "fmp-Latn-ZZ"}, "jut": {"value" : "jut-Latn-DK"}, "bem": {"value" : "bem-Latn-ZM"}, "und-JP": {"value" : "ja-Jpan-JP"}, "wob": {"value" : "wob-Latn-ZZ"}, "sga": {"value" : "sga-Ogam-IE"}, "bet": {"value" : "bet-Latn-ZZ"}, "dv": {"value"
    : "dv-Thaa-MV"}, "bex": {"value" : "bex-Latn-ZZ"}, "bew": {"value" : "bew-Latn-ID"}, "bez": {"value" : "bez-Latn-TZ"}, "dz": {"value" : "dz-Tibt-BT"}, "ms-ID": {"value" : "ms-Latn-ID"}, "wos": {"value" : "wos-Latn-ZZ"}, "und-KH": {"value" : "km-Khmr-KH"}, "und-KG": {"value" : "ky-Cyrl-KG"}, "sgs": {"value" : "sgs-Latn-LT"}, "und-KE": {"value" : "sw-Latn-KE"}, "ee": {"value" : "ee-Latn-GH"}, "bfd": {"value" : "bfd-Latn-CM"}, "sgw": {"value" : "sgw-Ethi-ZZ"}, "und-IN": {"value" : "hi-Deva-IN"}, "und-IL": {"value"
    : "he-Hebr-IL"}, "el": {"value" : "el-Grek-GR"}, "sgz": {"value" : "sgz-Latn-ZZ"}, "und-IR": {"value" : "fa-Arab-IR"}, "en": {"value" : "en-Latn-US"}, "und-IQ": {"value" : "ar-Arab-IQ"}, "und-Perm": {"value" : "kv-Perm-RU"}, "eo": {"value" : "eo-Latn-001"}, "bfq": {"value" : "bfq-Taml-IN"}, "es": {"value" : "es-Latn-ES"}, "und-IT": {"value" : "it-Latn-IT"}, "et": {"value" : "et-Latn-EE"}, "und-IS": {"value" : "is-Latn-IS"}, "eu": {"value" : "eu-Latn-ES"}, "bft": {"value" : "bft-Arab-PK"}, "bfy": {"value"
    : "bfy-Deva-IN"}, "shi": {"value" : "shi-Tfng-MA"}, "shk": {"value" : "shk-Latn-ZZ"}, "shn": {"value" : "shn-Mymr-MM"}, "fod": {"value" : "fod-Latn-ZZ"}, "fa": {"value" : "fa-Arab-IR"}, "bgc": {"value" : "bgc-Deva-IN"}, "ff": {"value" : "ff-Latn-SN"}, "shu": {"value" : "shu-Arab-ZZ"}, "fi": {"value" : "fi-Latn-FI"}, "fj": {"value" : "fj-Latn-FJ"}, "fon": {"value" : "fon-Latn-BJ"}, "und-HM": {"value" : "und-Latn-HM"}, "und-HK": {"value" : "zh-Hant-HK"}, "bgn": {"value" : "bgn-Arab-PK"}, "for": {"value" :
    "for-Latn-ZZ"}, "fo": {"value" : "fo-Latn-FO"}, "und-HN": {"value" : "es-Latn-HN"}, "fr": {"value" : "fr-Latn-FR"}, "und-HU": {"value" : "hu-Latn-HU"}, "und-HT": {"value" : "ht-Latn-HT"}, "ku-Arab": {"value" : "ku-Arab-IQ"}, "sid": {"value" : "sid-Latn-ET"}, "und-HR": {"value" : "hr-Latn-HR"}, "sig": {"value" : "sig-Latn-ZZ"}, "bgx": {"value" : "bgx-Grek-TR"}, "fy": {"value" : "fy-Latn-NL"}, "sim": {"value" : "sim-Latn-ZZ"}, "sil": {"value" : "sil-Latn-ZZ"}, "fpe": {"value" : "fpe-Latn-ZZ"}, "ga": {"value"
    : "ga-Latn-IE"}, "bhb": {"value" : "bhb-Deva-IN"}, "gd": {"value" : "gd-Latn-GB"}, "und-ID": {"value" : "id-Latn-ID"}, "und-IC": {"value" : "es-Latn-IC"}, "bhg": {"value" : "bhg-Latn-ZZ"}, "und-GH": {"value" : "ak-Latn-GH"}, "bhi": {"value" : "bhi-Deva-IN"}, "und-GF": {"value" : "fr-Latn-GF"}, "und-GE": {"value" : "ka-Geor-GE"}, "und-GL": {"value" : "kl-Latn-GL"}, "gl": {"value" : "gl-Latn-ES"}, "bhl": {"value" : "bhl-Latn-ZZ"}, "gn": {"value" : "gn-Latn-PY"}, "bho": {"value" : "bho-Deva-IN"}, "und-GP":
    {"value" : "fr-Latn-GP"}, "und-GN": {"value" : "fr-Latn-GN"}, "und-GT": {"value" : "es-Latn-GT"}, "und-GS": {"value" : "und-Latn-GS"}, "gu": {"value" : "gu-Gujr-IN"}, "und-GR": {"value" : "el-Grek-GR"}, "gv": {"value" : "gv-Latn-IM"}, "und-GQ": {"value" : "es-Latn-GQ"}, "und-Palm": {"value" : "arc-Palm-SY"}, "und-GW": {"value" : "pt-Latn-GW"}, "bhy": {"value" : "bhy-Latn-ZZ"}, "ha": {"value" : "ha-Latn-NG"}, "wrs": {"value" : "wrs-Latn-ZZ"}, "bib": {"value" : "bib-Latn-ZZ"}, "sjr": {"value" : "sjr-Latn-ZZ"}
    , "he": {"value" : "he-Hebr-IL"}, "big": {"value" : "big-Latn-ZZ"}, "hi": {"value" : "hi-Deva-IN"}, "und-Cyrl-GE": {"value" : "ab-Cyrl-GE"}, "bik": {"value" : "bik-Latn-PH"}, "bin": {"value" : "bin-Latn-NG"}, "und-Cham": {"value" : "cjm-Cham-VN"}, "und-FI": {"value" : "fi-Latn-FI"}, "bim": {"value" : "bim-Latn-ZZ"}, "ho": {"value" : "ho-Latn-PG"}, "tg-PK": {"value" : "tg-Arab-PK"}, "und-FO": {"value" : "fo-Latn-FO"}, "bio": {"value" : "bio-Latn-ZZ"}, "fqs": {"value" : "fqs-Latn-ZZ"}, "hr": {"value" : "hr-Latn-HR"}
    , "skc": {"value" : "skc-Latn-ZZ"}, "wsg": {"value" : "wsg-Gong-IN"}, "biq": {"value" : "biq-Latn-ZZ"}, "ht": {"value" : "ht-Latn-HT"}, "hu": {"value" : "hu-Latn-HU"}, "und-FR": {"value" : "fr-Latn-FR"}, "wsk": {"value" : "wsk-Latn-ZZ"}, "hy": {"value" : "hy-Armn-AM"}, "hz": {"value" : "hz-Latn-NA"}, "frc": {"value" : "frc-Latn-US"}, "ia": {"value" : "ia-Latn-001"}, "sks": {"value" : "sks-Latn-ZZ"}, "id": {"value" : "id-Latn-ID"}, "skr": {"value" : "skr-Arab-PK"}, "ig": {"value" : "ig-Latn-NG"}, "und-GA":
    {"value" : "fr-Latn-GA"}, "bji": {"value" : "bji-Ethi-ZZ"}, "ii": {"value" : "ii-Yiii-CN"}, "bjh": {"value" : "bjh-Latn-ZZ"}, "und-EE": {"value" : "et-Latn-EE"}, "ik": {"value" : "ik-Latn-US"}, "bjj": {"value" : "bjj-Deva-IN"}, "und-EC": {"value" : "es-Latn-EC"}, "und-Cprt": {"value" : "grc-Cprt-CY"}, "frp": {"value" : "frp-Latn-FR"}, "in": {"value" : "in-Latn-ID"}, "bjo": {"value" : "bjo-Latn-ZZ"}, "frs": {"value" : "frs-Latn-DE"}, "io": {"value" : "io-Latn-001"}, "und-EH": {"value" : "ar-Arab-EH"}, "bjn":
    {"value" : "bjn-Latn-ID"}, "frr": {"value" : "frr-Latn-DE"}, "und-EG": {"value" : "ar-Arab-EG"}, "is": {"value" : "is-Latn-IS"}, "sld": {"value" : "sld-Latn-ZZ"}, "bjr": {"value" : "bjr-Latn-ZZ"}, "it": {"value" : "it-Latn-IT"}, "iu": {"value" : "iu-Cans-CA"}, "und-ER": {"value" : "ti-Ethi-ER"}, "bjt": {"value" : "bjt-Latn-SN"}, "iw": {"value" : "iw-Hebr-IL"}, "und-Tirh": {"value" : "mai-Tirh-IN"}, "sli": {"value" : "sli-Latn-PL"}, "und-EU": {"value" : "en-Latn-GB"}, "wtm": {"value" : "wtm-Deva-IN"}, "sll":
    {"value" : "sll-Latn-ZZ"}, "und-ET": {"value" : "am-Ethi-ET"}, "bjz": {"value" : "bjz-Latn-ZZ"}, "und-ES": {"value" : "es-Latn-ES"}, "und-EZ": {"value" : "de-Latn-EZ"}, "ja": {"value" : "ja-Jpan-JP"}, "zh-GF": {"value" : "zh-Hant-GF"}, "bkc": {"value" : "bkc-Latn-ZZ"}, "zh-GB": {"value" : "zh-Hant-GB"}, "und-Cyrl-GR": {"value" : "mk-Cyrl-GR"}, "ji": {"value" : "ji-Hebr-UA"}, "und-DE": {"value" : "de-Latn-DE"}, "sly": {"value" : "sly-Latn-ID"}, "bkm": {"value" : "bkm-Latn-CM"}, "sma": {"value" : "sma-Latn-SE"}
    , "bkq": {"value" : "bkq-Latn-ZZ"}, "und-DK": {"value" : "da-Latn-DK"}, "und-DJ": {"value" : "aa-Latn-DJ"}, "bkv": {"value" : "bkv-Latn-ZZ"}, "jv": {"value" : "jv-Latn-ID"}, "bku": {"value" : "bku-Latn-PH"}, "jw": {"value" : "jw-Latn-ID"}, "und-DO": {"value" : "es-Latn-DO"}, "smj": {"value" : "smj-Latn-SE"}, "smn": {"value" : "smn-Latn-FI"}, "ka": {"value" : "ka-Geor-GE"}, "smq": {"value" : "smq-Latn-ZZ"}, "wuu": {"value" : "wuu-Hans-CN"}, "smp": {"value" : "smp-Samr-IL"}, "sms": {"value" : "sms-Latn-FI"}
    , "wuv": {"value" : "wuv-Latn-ZZ"}, "und-DZ": {"value" : "ar-Arab-DZ"}, "kg": {"value" : "kg-Latn-CD"}, "und-EA": {"value" : "es-Latn-EA"}, "ki": {"value" : "ki-Latn-KE"}, "kj": {"value" : "kj-Latn-NA"}, "kk": {"value" : "kk-Cyrl-KZ"}, "man-Nkoo": {"value" : "man-Nkoo-GN"}, "und-CD": {"value" : "sw-Latn-CD"}, "kl": {"value" : "kl-Latn-GL"}, "und-Telu": {"value" : "te-Telu-IN"}, "km": {"value" : "km-Khmr-KH"}, "kn": {"value" : "kn-Knda-IN"}, "ko": {"value" : "ko-Kore-KR"}, "und-CH": {"value" : "de-Latn-CH"}
    , "und-CG": {"value" : "fr-Latn-CG"}, "und-CF": {"value" : "fr-Latn-CF"}, "kr": {"value" : "kr-Latn-ZZ"}, "ks": {"value" : "ks-Arab-IN"}, "und-CL": {"value" : "es-Latn-CL"}, "snc": {"value" : "snc-Latn-ZZ"}, "ku": {"value" : "ku-Latn-TR"}, "blt": {"value" : "blt-Tavt-VN"}, "kv": {"value" : "kv-Cyrl-RU"}, "und-CI": {"value" : "fr-Latn-CI"}, "kw": {"value" : "kw-Latn-GB"}, "und-CP": {"value" : "und-Latn-CP"}, "und-CO": {"value" : "es-Latn-CO"}, "ky": {"value" : "ky-Cyrl-KG"}, "und-CN": {"value" : "zh-Hans-CN"}
    , "und-CM": {"value" : "fr-Latn-CM"}, "snk": {"value" : "snk-Latn-ML"}, "fub": {"value" : "fub-Arab-CM"}, "und-CR": {"value" : "es-Latn-CR"}, "fud": {"value" : "fud-Latn-WF"}, "snp": {"value" : "snp-Latn-ZZ"}, "la": {"value" : "la-Latn-VA"}, "und-CW": {"value" : "pap-Latn-CW"}, "fuf": {"value" : "fuf-Latn-GN"}, "lb": {"value" : "lb-Latn-LU"}, "und-CV": {"value" : "pt-Latn-CV"}, "fue": {"value" : "fue-Latn-ZZ"}, "und-CU": {"value" : "es-Latn-CU"}, "fuh": {"value" : "fuh-Latn-ZZ"}, "und-CZ": {"value" : "cs-Latn-CZ"}
    , "lg": {"value" : "lg-Latn-UG"}, "und-CY": {"value" : "el-Grek-CY"}, "bmh": {"value" : "bmh-Latn-ZZ"}, "snx": {"value" : "snx-Latn-ZZ"}, "li": {"value" : "li-Latn-NL"}, "sny": {"value" : "sny-Latn-ZZ"}, "wwa": {"value" : "wwa-Latn-ZZ"}, "bmk": {"value" : "bmk-Latn-ZZ"}, "und-Cher": {"value" : "chr-Cher-US"}, "fur": {"value" : "fur-Latn-IT"}, "ln": {"value" : "ln-Latn-CD"}, "und-BA": {"value" : "bs-Latn-BA"}, "fuq": {"value" : "fuq-Latn-NE"}, "lo": {"value" : "lo-Laoo-LA"}, "und-BG": {"value" : "bg-Cyrl-BG"}
    , "und-BF": {"value" : "fr-Latn-BF"}, "fuv": {"value" : "fuv-Latn-NG"}, "und-BE": {"value" : "nl-Latn-BE"}, "bmq": {"value" : "bmq-Latn-ML"}, "und-BD": {"value" : "bn-Beng-BD"}, "lt": {"value" : "lt-Latn-LT"}, "lu": {"value" : "lu-Latn-CD"}, "und-BJ": {"value" : "fr-Latn-BJ"}, "lv": {"value" : "lv-Latn-LV"}, "ogc": {"value" : "ogc-Latn-ZZ"}, "sog": {"value" : "sog-Sogd-UZ"}, "und-BI": {"value" : "rn-Latn-BI"}, "bmu": {"value" : "bmu-Latn-ZZ"}, "fuy": {"value" : "fuy-Latn-ZZ"}, "und-BH": {"value" : "ar-Arab-BH"}
    , "und-BO": {"value" : "es-Latn-BO"}, "und-BN": {"value" : "ms-Latn-BN"}, "sok": {"value" : "sok-Latn-ZZ"}, "und-BL": {"value" : "fr-Latn-BL"}, "und-BR": {"value" : "pt-Latn-BR"}, "und-BQ": {"value" : "pap-Latn-BQ"}, "soq": {"value" : "soq-Latn-ZZ"}, "und-BV": {"value" : "und-Latn-BV"}, "und-BT": {"value" : "dz-Tibt-BT"}, "sou": {"value" : "sou-Thai-TH"}, "bng": {"value" : "bng-Latn-ZZ"}, "mg": {"value" : "mg-Latn-MG"}, "und-BY": {"value" : "be-Cyrl-BY"}, "und-Glag": {"value" : "cu-Glag-BG"}, "mh": {"value"
    : "mh-Latn-MH"}, "mi": {"value" : "mi-Latn-NZ"}, "soy": {"value" : "soy-Latn-ZZ"}, "mk": {"value" : "mk-Cyrl-MK"}, "ml": {"value" : "ml-Mlym-IN"}, "bnm": {"value" : "bnm-Latn-ZZ"}, "mn": {"value" : "mn-Cyrl-MN"}, "mo": {"value" : "mo-Latn-RO"}, "und-Prti": {"value" : "xpr-Prti-IR"}, "fvr": {"value" : "fvr-Latn-SD"}, "und-AF": {"value" : "fa-Arab-AF"}, "bnp": {"value" : "bnp-Latn-ZZ"}, "mr": {"value" : "mr-Deva-IN"}, "und-AE": {"value" : "ar-Arab-AE"}, "ms": {"value" : "ms-Latn-MY"}, "spd": {"value" : "spd-Latn-ZZ"}
    , "und-AD": {"value" : "ca-Latn-AD"}, "mt": {"value" : "mt-Latn-MT"}, "my": {"value" : "my-Mymr-MM"}, "zh-BN": {"value" : "zh-Hant-BN"}, "und-AM": {"value" : "hy-Armn-AM"}, "spl": {"value" : "spl-Latn-ZZ"}, "und-AL": {"value" : "sq-Latn-AL"}, "und-AR": {"value" : "es-Latn-AR"}, "und-AQ": {"value" : "und-Latn-AQ"}, "na": {"value" : "na-Latn-NR"}, "und-AO": {"value" : "pt-Latn-AO"}, "nb": {"value" : "nb-Latn-NO"}, "nd": {"value" : "nd-Latn-ZW"}, "und-AT": {"value" : "de-Latn-AT"}, "ne": {"value" : "ne-Deva-NP"}
    , "sps": {"value" : "sps-Latn-ZZ"}, "und-AS": {"value" : "sm-Latn-AS"}, "und-AZ": {"value" : "az-Latn-AZ"}, "ng": {"value" : "ng-Latn-NA"}, "und-AX": {"value" : "sv-Latn-AX"}, "und-AW": {"value" : "nl-Latn-AW"}, "boj": {"value" : "boj-Latn-ZZ"}, "nl": {"value" : "nl-Latn-NL"}, "bon": {"value" : "bon-Latn-ZZ"}, "nn": {"value" : "nn-Latn-NO"}, "bom": {"value" : "bom-Latn-ZZ"}, "no": {"value" : "no-Latn-NO"}, "nr": {"value" : "nr-Latn-ZA"}, "arc-Nbat": {"value" : "arc-Nbat-JO"}, "und-Medf": {"value" : "mis-Medf-NG"}
    , "nv": {"value" : "nv-Latn-US"}, "kaa": {"value" : "kaa-Cyrl-UZ"}, "ny": {"value" : "ny-Latn-MW"}, "kac": {"value" : "kac-Latn-MM"}, "kab": {"value" : "kab-Latn-DZ"}, "kad": {"value" : "kad-Latn-ZZ"}, "kai": {"value" : "kai-Latn-ZZ"}, "oc": {"value" : "oc-Latn-FR"}, "zh-AU": {"value" : "zh-Hant-AU"}, "kaj": {"value" : "kaj-Latn-NG"}, "kam": {"value" : "kam-Latn-KE"}, "und-Tagb": {"value" : "tbw-Tagb-PH"}, "kao": {"value" : "kao-Latn-ML"}, "und-Ogam": {"value" : "sga-Ogam-IE"}, "om": {"value" : "om-Latn-ET"}
    , "srb": {"value" : "srb-Sora-IN"}, "or": {"value" : "or-Orya-IN"}, "tg-Arab": {"value" : "tg-Arab-PK"}, "os": {"value" : "os-Cyrl-GE"}, "und-Sogd": {"value" : "sog-Sogd-UZ"}, "bpy": {"value" : "bpy-Beng-IN"}, "kbd": {"value" : "kbd-Cyrl-RU"}, "srn": {"value" : "srn-Latn-SR"}, "pa": {"value" : "pa-Guru-IN"}, "srr": {"value" : "srr-Latn-SN"}, "bqc": {"value" : "bqc-Latn-ZZ"}, "und-Kthi": {"value" : "bho-Kthi-IN"}, "kbm": {"value" : "kbm-Latn-ZZ"}, "kbp": {"value" : "kbp-Latn-ZZ"}, "srx": {"value" : "srx-Deva-IN"}
    , "bqi": {"value" : "bqi-Arab-IR"}, "kbq": {"value" : "kbq-Latn-ZZ"}, "pl": {"value" : "pl-Latn-PL"}, "bqp": {"value" : "bqp-Latn-ZZ"}, "kbx": {"value" : "kbx-Latn-ZZ"}, "kby": {"value" : "kby-Arab-NE"}, "ps": {"value" : "ps-Arab-AF"}, "pt": {"value" : "pt-Latn-BR"}, "ssd": {"value" : "ssd-Latn-ZZ"}, "und-Nkoo": {"value" : "man-Nkoo-GN"}, "bqv": {"value" : "bqv-Latn-CI"}, "ssg": {"value" : "ssg-Latn-ZZ"}, "und-Mymr": {"value" : "my-Mymr-MM"}, "kcg": {"value" : "kcg-Latn-NG"}, "bra": {"value" : "bra-Deva-IN"}
    , "kck": {"value" : "kck-Latn-ZW"}, "kcl": {"value" : "kcl-Latn-ZZ"}, "okr": {"value" : "okr-Latn-ZZ"}, "ssy": {"value" : "ssy-Latn-ER"}, "brh": {"value" : "brh-Arab-PK"}, "okv": {"value" : "okv-Latn-ZZ"}, "kct": {"value" : "kct-Latn-ZZ"}, "und-Hani": {"value" : "zh-Hani-CN"}, "und-Bugi": {"value" : "bug-Bugi-ID"}, "und-Hang": {"value" : "ko-Hang-KR"}, "qu": {"value" : "qu-Latn-PE"}, "brx": {"value" : "brx-Deva-IN"}, "und-Samr": {"value" : "smp-Samr-IL"}, "brz": {"value" : "brz-Latn-ZZ"}, "stk": {"value"
    : "stk-Latn-ZZ"}, "und-Hano": {"value" : "hnn-Hano-PH"}, "kde": {"value" : "kde-Latn-TZ"}, "kdh": {"value" : "kdh-Arab-TG"}, "stq": {"value" : "stq-Latn-DE"}, "kdl": {"value" : "kdl-Latn-ZZ"}, "bsj": {"value" : "bsj-Latn-ZZ"}, "und-Hanb": {"value" : "zh-Hanb-TW"}, "kdt": {"value" : "kdt-Thai-TH"}, "rm": {"value" : "rm-Latn-CH"}, "rn": {"value" : "rn-Latn-BI"}, "ro": {"value" : "ro-Latn-RO"}, "sua": {"value" : "sua-Latn-ZZ"}, "und-Deva-BT": {"value" : "ne-Deva-BT"}, "bsq": {"value" : "bsq-Bass-LR"}, "bst":
    {"value" : "bst-Ethi-ZZ"}, "sue": {"value" : "sue-Latn-ZZ"}, "bss": {"value" : "bss-Latn-CM"}, "ru": {"value" : "ru-Cyrl-RU"}, "und-Buhd": {"value" : "bku-Buhd-PH"}, "rw": {"value" : "rw-Latn-RW"}, "kea": {"value" : "kea-Latn-CV"}, "suk": {"value" : "suk-Latn-TZ"}, "grc-Linb": {"value" : "grc-Linb-GR"}, "sa": {"value" : "sa-Deva-IN"}, "sc": {"value" : "sc-Latn-IT"}, "sus": {"value" : "sus-Latn-GN"}, "sd": {"value" : "sd-Arab-PK"}, "sur": {"value" : "sur-Latn-ZZ"}, "se": {"value" : "se-Latn-NO"}, "sg": {"value"
    : "sg-Latn-CF"}, "ken": {"value" : "ken-Latn-CM"}, "si": {"value" : "si-Sinh-LK"}, "und-Hant": {"value" : "zh-Hant-TW"}, "und-Hans": {"value" : "zh-Hans-CN"}, "sk": {"value" : "sk-Latn-SK"}, "sl": {"value" : "sl-Latn-SI"}, "sm": {"value" : "sm-Latn-WS"}, "sn": {"value" : "sn-Latn-ZW"}, "bto": {"value" : "bto-Latn-PH"}, "so": {"value" : "so-Latn-SO"}, "sq": {"value" : "sq-Latn-AL"}, "sr": {"value" : "sr-Cyrl-RS"}, "ss": {"value" : "ss-Latn-ZA"}, "kez": {"value" : "kez-Latn-ZZ"}, "st": {"value" : "st-Latn-ZA"}
    , "su": {"value" : "su-Latn-ID"}, "btt": {"value" : "btt-Latn-ZZ"}, "sv": {"value" : "sv-Latn-SE"}, "sw": {"value" : "sw-Latn-TZ"}, "btv": {"value" : "btv-Deva-PK"}, "ong": {"value" : "ong-Latn-ZZ"}, "ta": {"value" : "ta-Taml-IN"}, "onn": {"value" : "onn-Latn-ZZ"}, "bua": {"value" : "bua-Cyrl-RU"}, "bud": {"value" : "bud-Latn-ZZ"}, "buc": {"value" : "buc-Latn-YT"}, "te": {"value" : "te-Telu-IN"}, "tg": {"value" : "tg-Cyrl-TJ"}, "th": {"value" : "th-Thai-TH"}, "und-Gong": {"value" : "wsg-Gong-IN"}, "bug":
    {"value" : "bug-Latn-ID"}, "kfo": {"value" : "kfo-Latn-CI"}, "ons": {"value" : "ons-Latn-ZZ"}, "ti": {"value" : "ti-Ethi-ET"}, "kfr": {"value" : "kfr-Deva-IN"}, "tk": {"value" : "tk-Latn-TM"}, "tl": {"value" : "tl-Latn-PH"}, "und-Lisu": {"value" : "lis-Lisu-CN"}, "buk": {"value" : "buk-Latn-ZZ"}, "tn": {"value" : "tn-Latn-ZA"}, "bum": {"value" : "bum-Latn-CM"}, "to": {"value" : "to-Latn-TO"}, "buo": {"value" : "buo-Latn-ZZ"}, "swc": {"value" : "swc-Latn-CD"}, "tr": {"value" : "tr-Latn-TR"}, "und-Gonm": {"value"
    : "esg-Gonm-IN"}, "kfy": {"value" : "kfy-Deva-IN"}, "swb": {"value" : "swb-Arab-YT"}, "ts": {"value" : "ts-Latn-ZA"}, "tt": {"value" : "tt-Cyrl-RU"}, "bus": {"value" : "bus-Latn-ZZ"}, "swg": {"value" : "swg-Latn-DE"}, "buu": {"value" : "buu-Latn-ZZ"}, "ty": {"value" : "ty-Latn-PF"}, "kge": {"value" : "kge-Latn-ID"}, "kgf": {"value" : "kgf-Latn-ZZ"}, "swp": {"value" : "swp-Latn-ZZ"}, "bvb": {"value" : "bvb-Latn-GQ"}, "ug": {"value" : "ug-Arab-CN"}, "swv": {"value" : "swv-Deva-IN"}, "kgp": {"value" : "kgp-Latn-BR"}
    , "uk": {"value" : "uk-Cyrl-UA"}, "ur": {"value" : "ur-Arab-PK"}, "kk-IR": {"value" : "kk-Arab-IR"}, "khb": {"value" : "khb-Talu-CN"}, "kha": {"value" : "kha-Latn-IN"}, "uz": {"value" : "uz-Latn-UZ"}, "sxn": {"value" : "sxn-Latn-ID"}, "xav": {"value" : "xav-Latn-BR"}, "opm": {"value" : "opm-Latn-ZZ"}, "bwd": {"value" : "bwd-Latn-ZZ"}, "und-Mlym": {"value" : "ml-Mlym-IN"}, "ve": {"value" : "ve-Latn-ZA"}, "khn": {"value" : "khn-Deva-IN"}, "sxw": {"value" : "sxw-Latn-ZZ"}, "vi": {"value" : "vi-Latn-VN"}, "khq":
    {"value" : "khq-Latn-ML"}, "kht": {"value" : "kht-Mymr-IN"}, "khs": {"value" : "khs-Latn-ZZ"}, "vo": {"value" : "vo-Latn-001"}, "khw": {"value" : "khw-Arab-PK"}, "bwr": {"value" : "bwr-Latn-ZZ"}, "khz": {"value" : "khz-Latn-ZZ"}, "und-ZW": {"value" : "sn-Latn-ZW"}, "xbi": {"value" : "xbi-Latn-ZZ"}, "gaa": {"value" : "gaa-Latn-GH"}, "syl": {"value" : "syl-Beng-BD"}, "wa": {"value" : "wa-Latn-BE"}, "gag": {"value" : "gag-Latn-MD"}, "gaf": {"value" : "gaf-Latn-ZZ"}, "kij": {"value" : "kij-Latn-ZZ"}, "syr":
    {"value" : "syr-Syrc-IQ"}, "und-YE": {"value" : "ar-Arab-YE"}, "gah": {"value" : "gah-Latn-ZZ"}, "gaj": {"value" : "gaj-Latn-ZZ"}, "gam": {"value" : "gam-Latn-ZZ"}, "bxh": {"value" : "bxh-Latn-ZZ"}, "gan": {"value" : "gan-Hans-CN"}, "kiu": {"value" : "kiu-Latn-TR"}, "kiw": {"value" : "kiw-Latn-ZZ"}, "wo": {"value" : "wo-Latn-SN"}, "gaw": {"value" : "gaw-Latn-ZZ"}, "und-Sarb": {"value" : "xsa-Sarb-YE"}, "gay": {"value" : "gay-Latn-ID"}, "und-YT": {"value" : "fr-Latn-YT"}, "kjd": {"value" : "kjd-Latn-ZZ"}
    , "szl": {"value" : "szl-Latn-PL"}, "xco": {"value" : "xco-Chrs-UZ"}, "xcr": {"value" : "xcr-Cari-TR"}, "gba": {"value" : "gba-Latn-ZZ"}, "und-Mult": {"value" : "skr-Mult-PK"}, "kjg": {"value" : "kjg-Laoo-LA"}, "gbf": {"value" : "gbf-Latn-ZZ"}, "oro": {"value" : "oro-Latn-ZZ"}, "und-Hatr": {"value" : "mis-Hatr-IQ"}, "bye": {"value" : "bye-Latn-ZZ"}, "xh": {"value" : "xh-Latn-ZA"}, "gbm": {"value" : "gbm-Deva-IN"}, "oru": {"value" : "oru-Arab-ZZ"}, "kjs": {"value" : "kjs-Latn-ZZ"}, "byn": {"value" : "byn-Ethi-ER"}
    , "und-XK": {"value" : "sq-Latn-XK"}, "yue-CN": {"value" : "yue-Hans-CN"}, "und-Lepc": {"value" : "lep-Lepc-IN"}, "byr": {"value" : "byr-Latn-ZZ"}, "kjy": {"value" : "kjy-Latn-ZZ"}, "osa": {"value" : "osa-Osge-US"}, "bys": {"value" : "bys-Latn-ZZ"}, "byv": {"value" : "byv-Latn-CM"}, "gbz": {"value" : "gbz-Arab-IR"}, "gby": {"value" : "gby-Latn-ZZ"}, "byx": {"value" : "byx-Latn-ZZ"}, "kkc": {"value" : "kkc-Latn-ZZ"}, "und-VU": {"value" : "bi-Latn-VU"}, "bza": {"value" : "bza-Latn-ZZ"}, "und-Goth": {"value"
    : "got-Goth-UA"}, "kkj": {"value" : "kkj-Latn-CM"}, "bze": {"value" : "bze-Latn-ML"}, "und-Avst": {"value" : "ae-Avst-IR"}, "bzf": {"value" : "bzf-Latn-ZZ"}, "yi": {"value" : "yi-Hebr-001"}, "bzh": {"value" : "bzh-Latn-ZZ"}, "und-WF": {"value" : "fr-Latn-WF"}, "yo": {"value" : "yo-Latn-NG"}, "gcr": {"value" : "gcr-Latn-GF"}, "ota": {"value" : "ota-Arab-ZZ"}, "und-WS": {"value" : "sm-Latn-WS"}, "bzw": {"value" : "bzw-Latn-ZZ"}, "und-UZ": {"value" : "uz-Latn-UZ"}, "und-UY": {"value" : "es-Latn-UY"}, "otk":
    {"value" : "otk-Orkh-MN"}, "xes": {"value" : "xes-Latn-ZZ"}, "za": {"value" : "za-Latn-CN"}, "gde": {"value" : "gde-Latn-ZZ"}, "kln": {"value" : "kln-Latn-KE"}, "und-VA": {"value" : "it-Latn-VA"}, "zh": {"value" : "zh-Hans-CN"}, "gdn": {"value" : "gdn-Latn-ZZ"}, "klq": {"value" : "klq-Latn-ZZ"}, "und-Saur": {"value" : "saz-Saur-IN"}, "klt": {"value" : "klt-Latn-ZZ"}, "und-VE": {"value" : "es-Latn-VE"}, "gdr": {"value" : "gdr-Latn-ZZ"}, "klx": {"value" : "klx-Latn-ZZ"}, "und-VN": {"value" : "vi-Latn-VN"}
    , "kk-MN": {"value" : "kk-Arab-MN"}, "zu": {"value" : "zu-Latn-ZA"}, "und-Armn": {"value" : "hy-Armn-AM"}, "kmb": {"value" : "kmb-Latn-AO"}, "und-TR": {"value" : "tr-Latn-TR"}, "geb": {"value" : "geb-Latn-ZZ"}, "und-TW": {"value" : "zh-Hant-TW"}, "kmh": {"value" : "kmh-Latn-ZZ"}, "und-TV": {"value" : "tvl-Latn-TV"}, "und-TZ": {"value" : "sw-Latn-TZ"}, "kmo": {"value" : "kmo-Latn-ZZ"}, "gej": {"value" : "gej-Latn-ZZ"}, "und-UA": {"value" : "uk-Cyrl-UA"}, "gel": {"value" : "gel-Latn-ZZ"}, "kms": {"value" :
    "kms-Latn-ZZ"}, "kmu": {"value" : "kmu-Latn-ZZ"}, "kmw": {"value" : "kmw-Latn-ZZ"}, "und-Tibt": {"value" : "bo-Tibt-CN"}, "und-UG": {"value" : "sw-Latn-UG"}, "und-Armi": {"value" : "arc-Armi-IR"}, "gez": {"value" : "gez-Ethi-ET"}, "und-ST": {"value" : "pt-Latn-ST"}, "knf": {"value" : "knf-Latn-GW"}, "und-SR": {"value" : "nl-Latn-SR"}, "und-SV": {"value" : "es-Latn-SV"}, "und-SY": {"value" : "ar-Arab-SY"}, "knp": {"value" : "knp-Latn-ZZ"}, "gfk": {"value" : "gfk-Latn-ZZ"}, "und-TD": {"value" : "fr-Latn-TD"}
    , "und-TH": {"value" : "th-Thai-TH"}, "und-TG": {"value" : "fr-Latn-TG"}, "und-TF": {"value" : "fr-Latn-TF"}, "und-TM": {"value" : "tk-Latn-TM"}, "und-TL": {"value" : "pt-Latn-TL"}, "und-TK": {"value" : "tkl-Latn-TK"}, "und-TJ": {"value" : "tg-Cyrl-TJ"}, "und-TO": {"value" : "to-Latn-TO"}, "und-TN": {"value" : "ar-Arab-TN"}, "und-RS": {"value" : "sr-Cyrl-RS"}, "koi": {"value" : "koi-Cyrl-RU"}, "und-RW": {"value" : "rw-Latn-RW"}, "kok": {"value" : "kok-Deva-IN"}, "und-RU": {"value" : "ru-Cyrl-RU"}, "kol":
    {"value" : "kol-Latn-ZZ"}, "kos": {"value" : "kos-Latn-FM"}, "ggn": {"value" : "ggn-Deva-NP"}, "und-SD": {"value" : "ar-Arab-SD"}, "und-SC": {"value" : "fr-Latn-SC"}, "und-SA": {"value" : "ar-Arab-SA"}, "koz": {"value" : "koz-Latn-ZZ"}, "und-SE": {"value" : "sv-Latn-SE"}, "und-SK": {"value" : "sk-Latn-SK"}, "und-SJ": {"value" : "nb-Latn-SJ"}, "und-SI": {"value" : "sl-Latn-SI"}, "taj": {"value" : "taj-Deva-NP"}, "und-SO": {"value" : "so-Latn-SO"}, "tal": {"value" : "tal-Latn-ZZ"}, "und-SN": {"value" : "fr-Latn-SN"}
    , "und-Osge": {"value" : "osa-Osge-US"}, "und-SM": {"value" : "it-Latn-SM"}, "kpf": {"value" : "kpf-Latn-ZZ"}, "tan": {"value" : "tan-Latn-ZZ"}, "kpe": {"value" : "kpe-Latn-LR"}, "und-QO": {"value" : "en-Latn-DG"}, "taq": {"value" : "taq-Latn-ZZ"}, "kpo": {"value" : "kpo-Latn-ZZ"}, "kpr": {"value" : "kpr-Latn-ZZ"}, "kpx": {"value" : "kpx-Latn-ZZ"}, "ghs": {"value" : "ghs-Latn-ZZ"}, "und-Lana": {"value" : "nod-Lana-TH"}, "tbc": {"value" : "tbc-Latn-ZZ"}, "und-RE": {"value" : "fr-Latn-RE"}, "tbd": {"value"
    : "tbd-Latn-ZZ"}, "tbg": {"value" : "tbg-Latn-ZZ"}, "tbf": {"value" : "tbf-Latn-ZZ"}, "und-RO": {"value" : "ro-Latn-RO"}, "kqb": {"value" : "kqb-Latn-ZZ"}, "tbo": {"value" : "tbo-Latn-ZZ"}, "kqf": {"value" : "kqf-Latn-ZZ"}, "und-PT": {"value" : "pt-Latn-PT"}, "und-PS": {"value" : "ar-Arab-PS"}, "cad": {"value" : "cad-Latn-US"}, "und-PR": {"value" : "es-Latn-PR"}, "tbw": {"value" : "tbw-Latn-PH"}, "und-PY": {"value" : "gn-Latn-PY"}, "gim": {"value" : "gim-Latn-ZZ"}, "und-PW": {"value" : "pau-Latn-PW"}, "gil":
    {"value" : "gil-Latn-KI"}, "kqs": {"value" : "kqs-Latn-ZZ"}, "tbz": {"value" : "tbz-Latn-ZZ"}, "und-Laoo": {"value" : "lo-Laoo-LA"}, "can": {"value" : "can-Latn-ZZ"}, "und-QA": {"value" : "ar-Arab-QA"}, "kqy": {"value" : "kqy-Ethi-ZZ"}, "ms-CC": {"value" : "ms-Arab-CC"}, "tci": {"value" : "tci-Latn-ZZ"}, "krc": {"value" : "krc-Cyrl-RU"}, "krj": {"value" : "krj-Latn-PH"}, "kri": {"value" : "kri-Latn-SL"}, "ozm": {"value" : "ozm-Latn-ZZ"}, "und-OM": {"value" : "ar-Arab-OM"}, "krl": {"value" : "krl-Latn-RU"}
    , "gjk": {"value" : "gjk-Arab-PK"}, "cbj": {"value" : "cbj-Latn-ZZ"}, "gjn": {"value" : "gjn-Latn-ZZ"}, "tcy": {"value" : "tcy-Knda-IN"}, "xla": {"value" : "xla-Latn-ZZ"}, "krs": {"value" : "krs-Latn-ZZ"}, "xlc": {"value" : "xlc-Lyci-TR"}, "kru": {"value" : "kru-Deva-IN"}, "und-PA": {"value" : "es-Latn-PA"}, "xld": {"value" : "xld-Lydi-TR"}, "gju": {"value" : "gju-Arab-PK"}, "und-PE": {"value" : "es-Latn-PE"}, "tdd": {"value" : "tdd-Tale-CN"}, "tdg": {"value" : "tdg-Deva-NP"}, "tdh": {"value" : "tdh-Deva-NP"}
    , "und-PH": {"value" : "fil-Latn-PH"}, "und-PG": {"value" : "tpi-Latn-PG"}, "ksb": {"value" : "ksb-Latn-TZ"}, "und-PF": {"value" : "fr-Latn-PF"}, "und-PM": {"value" : "fr-Latn-PM"}, "ksd": {"value" : "ksd-Latn-ZZ"}, "und-PL": {"value" : "pl-Latn-PL"}, "und-PK": {"value" : "ur-Arab-PK"}, "ksf": {"value" : "ksf-Latn-CM"}};
},
otciu_CLDRHelper_getDefaultLocale$$create = () => {
    return {"value" : "en_GB"};
},
otciu_CLDRHelper_getNumberFormatMap$$create = () => {
    return {"en": {"value" : "#,##0.###"}, "root": {"value" : "#,##0.###"}};
},
otciu_CLDRHelper_getDecimalDataMap$$create = () => {
    return {"en": {"groupingSeparator" : 44, "decimalSeparator" : 46, "listSeparator" : 59, "perMille" : 8240, "percent" : 37, "naN" : "NaN", "infinity" : "∞", "minusSign" : 45, "exponentSeparator" : "E"}, "root": {"groupingSeparator" : 44, "decimalSeparator" : 46, "listSeparator" : 59, "perMille" : 8240, "percent" : 37, "naN" : "NaN", "infinity" : "∞", "minusSign" : 45, "exponentSeparator" : "E"}};
},
otciu_CLDRHelper_getCurrencyMap$$create = () => {
    return {"en": {"UGS": {"name" : "Ugandan Shilling (1966–1987)", "symbol" : "UGS"}, "FJD": {"name" : "Fijian Dollar", "symbol" : "FJD"}, "MXN": {"name" : "Mexican Peso", "symbol" : "MX$"}, "STD": {"name" : "São Tomé & Príncipe Dobra (1977–2017)", "symbol" : "STD"}, "BRR": {"name" : "Brazilian Cruzeiro (1993–1994)", "symbol" : "BRR"}, "LVL": {"name" : "Latvian Lats", "symbol" : "LVL"}, "SCR": {"name" : "Seychellois Rupee", "symbol" : "SCR"}, "CDF": {"name" : "Congolese Franc", "symbol" : "CDF"}, "MXP": {"name"
    : "Mexican Silver Peso (1861–1992)", "symbol" : "MXP"}, "ZAL": {"name" : "South African Rand (financial)", "symbol" : "ZAL"}, "BBD": {"name" : "Barbadian Dollar", "symbol" : "BBD"}, "HNL": {"name" : "Honduran Lempira", "symbol" : "HNL"}, "UGX": {"name" : "Ugandan Shilling", "symbol" : "UGX"}, "LVR": {"name" : "Latvian Ruble", "symbol" : "LVR"}, "MXV": {"name" : "Mexican Investment Unit", "symbol" : "MXV"}, "ZAR": {"name" : "South African Rand", "symbol" : "ZAR"}, "BRZ": {"name" : "Brazilian Cruzeiro (1942–1967)",
    "symbol" : "BRZ"}, "STN": {"name" : "São Tomé & Príncipe Dobra", "symbol" : "STN"}, "CUC": {"name" : "Cuban Convertible Peso", "symbol" : "CUC"}, "BSD": {"name" : "Bahamian Dollar", "symbol" : "BSD"}, "SDD": {"name" : "Sudanese Dinar (1992–2007)", "symbol" : "SDD"}, "SDG": {"name" : "Sudanese Pound", "symbol" : "SDG"}, "ZRN": {"name" : "Zairean New Zaire (1993–1998)", "symbol" : "ZRN"}, "IQD": {"name" : "Iraqi Dinar", "symbol" : "IQD"}, "SDP": {"name" : "Sudanese Pound (1957–1998)", "symbol" : "SDP"}, "CUP":
    {"name" : "Cuban Peso", "symbol" : "CUP"}, "GMD": {"name" : "Gambian Dalasi", "symbol" : "GMD"}, "TWD": {"name" : "New Taiwan Dollar", "symbol" : "NT$"}, "RSD": {"name" : "Serbian Dinar", "symbol" : "RSD"}, "ZRZ": {"name" : "Zairean Zaire (1971–1993)", "symbol" : "ZRZ"}, "UYI": {"name" : "Uruguayan Peso (Indexed Units)", "symbol" : "UYI"}, "MYR": {"name" : "Malaysian Ringgit", "symbol" : "MYR"}, "FKP": {"name" : "Falkland Islands Pound", "symbol" : "FKP"}, "UYP": {"name" : "Uruguayan Peso (1975–1993)", "symbol"
    : "UYP"}, "XOF": {"name" : "West African CFA Franc", "symbol" : "CFA"}, "ARA": {"name" : "Argentine Austral", "symbol" : "ARA"}, "UYU": {"name" : "Uruguayan Peso", "symbol" : "UYU"}, "SUR": {"name" : "Soviet Rouble", "symbol" : "SUR"}, "UYW": {"name" : "Uruguayan Nominal Wage Index Unit", "symbol" : "UYW"}, "CVE": {"name" : "Cape Verdean Escudo", "symbol" : "CVE"}, "OMR": {"name" : "Omani Rial", "symbol" : "OMR"}, "KES": {"name" : "Kenyan Shilling", "symbol" : "KES"}, "SEK": {"name" : "Swedish Krona", "symbol"
    : "SEK"}, "MZE": {"name" : "Mozambican Escudo", "symbol" : "MZE"}, "ARL": {"name" : "Argentine Peso Ley (1970–1983)", "symbol" : "ARL"}, "ARM": {"name" : "Argentine Peso (1881–1970)", "symbol" : "ARM"}, "BTN": {"name" : "Bhutanese Ngultrum", "symbol" : "BTN"}, "GNF": {"name" : "Guinean Franc", "symbol" : "GNF"}, "ARP": {"name" : "Argentine Peso (1983–1985)", "symbol" : "ARP"}, "MZN": {"name" : "Mozambican Metical", "symbol" : "MZN"}, "MZM": {"name" : "Mozambican Metical (1980–2006)", "symbol" : "MZM"}, "SVC":
    {"name" : "Salvadoran Colón", "symbol" : "SVC"}, "ARS": {"name" : "Argentine Peso", "symbol" : "ARS"}, "QAR": {"name" : "Qatari Rial", "symbol" : "QAR"}, "IRR": {"name" : "Iranian Rial", "symbol" : "IRR"}, "NLG": {"name" : "Dutch Guilder", "symbol" : "NLG"}, "GNS": {"name" : "Guinean Syli", "symbol" : "GNS"}, "XPD": {"name" : "Palladium", "symbol" : "XPD"}, "THB": {"name" : "Thai Baht", "symbol" : "THB"}, "UZS": {"name" : "Uzbekistani Som", "symbol" : "UZS"}, "XPF": {"name" : "CFP Franc", "symbol" : "CFPF"}
    , "BDT": {"name" : "Bangladeshi Taka", "symbol" : "BDT"}, "LYD": {"name" : "Libyan Dinar", "symbol" : "LYD"}, "BUK": {"name" : "Burmese Kyat", "symbol" : "BUK"}, "KWD": {"name" : "Kuwaiti Dinar", "symbol" : "KWD"}, "XPT": {"name" : "Platinum", "symbol" : "XPT"}, "RUB": {"name" : "Russian Ruble", "symbol" : "RUB"}, "ISK": {"name" : "Icelandic Króna", "symbol" : "ISK"}, "BEC": {"name" : "Belgian Franc (convertible)", "symbol" : "BEC"}, "ISJ": {"name" : "Icelandic Króna (1918–1981)", "symbol" : "ISJ"}, "BEF":
    {"name" : "Belgian Franc", "symbol" : "BEF"}, "MKD": {"name" : "Macedonian Denar", "symbol" : "MKD"}, "BEL": {"name" : "Belgian Franc (financial)", "symbol" : "BEL"}, "RUR": {"name" : "Russian Ruble (1991–1998)", "symbol" : "RUR"}, "DZD": {"name" : "Algerian Dinar", "symbol" : "DZD"}, "PAB": {"name" : "Panamanian Balboa", "symbol" : "PAB"}, "MKN": {"name" : "Macedonian Denar (1992–1993)", "symbol" : "MKN"}, "SGD": {"name" : "Singapore Dollar", "symbol" : "SGD"}, "KGS": {"name" : "Kyrgystani Som", "symbol"
    : "KGS"}, "HRD": {"name" : "Croatian Dinar", "symbol" : "HRD"}, "XAF": {"name" : "Central African CFA Franc", "symbol" : "FCFA"}, "XAG": {"name" : "Silver", "symbol" : "XAG"}, "ATS": {"name" : "Austrian Schilling", "symbol" : "ATS"}, "CHF": {"name" : "Swiss Franc", "symbol" : "CHF"}, "HRK": {"name" : "Croatian Kuna", "symbol" : "HRK"}, "ITL": {"name" : "Italian Lira", "symbol" : "ITL"}, "CHE": {"name" : "WIR Euro", "symbol" : "CHE"}, "DJF": {"name" : "Djiboutian Franc", "symbol" : "DJF"}, "MLF": {"name"
    : "Malian Franc", "symbol" : "MLF"}, "XRE": {"name" : "RINET Funds", "symbol" : "XRE"}, "TZS": {"name" : "Tanzanian Shilling", "symbol" : "TZS"}, "ADP": {"name" : "Andorran Peseta", "symbol" : "ADP"}, "VND": {"name" : "Vietnamese Dong", "symbol" : "₫"}, "XAU": {"name" : "Gold", "symbol" : "XAU"}, "AUD": {"name" : "Australian Dollar", "symbol" : "A$"}, "CHW": {"name" : "WIR Franc", "symbol" : "CHW"}, "KHR": {"name" : "Cambodian Riel", "symbol" : "KHR"}, "IDR": {"name" : "Indonesian Rupiah", "symbol" : "IDR"}
    , "XBA": {"name" : "European Composite Unit", "symbol" : "XBA"}, "KYD": {"name" : "Cayman Islands Dollar", "symbol" : "KYD"}, "VNN": {"name" : "Vietnamese Dong (1978–1985)", "symbol" : "VNN"}, "XBC": {"name" : "European Unit of Account (XBC)", "symbol" : "XBC"}, "YDD": {"name" : "Yemeni Dinar", "symbol" : "YDD"}, "XBB": {"name" : "European Monetary Unit", "symbol" : "XBB"}, "BWP": {"name" : "Botswanan Pula", "symbol" : "BWP"}, "GQE": {"name" : "Equatorial Guinean Ekwele", "symbol" : "GQE"}, "SHP": {"name"
    : "St. Helena Pound", "symbol" : "SHP"}, "CYP": {"name" : "Cypriot Pound", "symbol" : "CYP"}, "XBD": {"name" : "European Unit of Account (XBD)", "symbol" : "XBD"}, "TJS": {"name" : "Tajikistani Somoni", "symbol" : "TJS"}, "TJR": {"name" : "Tajikistani Ruble", "symbol" : "TJR"}, "AED": {"name" : "United Arab Emirates Dirham", "symbol" : "AED"}, "RWF": {"name" : "Rwandan Franc", "symbol" : "RWF"}, "DKK": {"name" : "Danish Krone", "symbol" : "DKK"}, "BGL": {"name" : "Bulgarian Hard Lev", "symbol" : "BGL"},
    "ZWD": {"name" : "Zimbabwean Dollar (1980–2008)", "symbol" : "ZWD"}, "BGN": {"name" : "Bulgarian Lev", "symbol" : "BGN"}, "BGM": {"name" : "Bulgarian Socialist Lev", "symbol" : "BGM"}, "YUD": {"name" : "Yugoslavian Hard Dinar (1966–1990)", "symbol" : "YUD"}, "MMK": {"name" : "Myanmar Kyat", "symbol" : "MMK"}, "BGO": {"name" : "Bulgarian Lev (1879–1952)", "symbol" : "BGO"}, "NOK": {"name" : "Norwegian Krone", "symbol" : "NOK"}, "SYP": {"name" : "Syrian Pound", "symbol" : "SYP"}, "ZWL": {"name" : "Zimbabwean Dollar (2009)",
    "symbol" : "ZWL"}, "YUM": {"name" : "Yugoslavian New Dinar (1994–2002)", "symbol" : "YUM"}, "LKR": {"name" : "Sri Lankan Rupee", "symbol" : "LKR"}, "YUN": {"name" : "Yugoslavian Convertible Dinar (1990–1992)", "symbol" : "YUN"}, "ZWR": {"name" : "Zimbabwean Dollar (2008)", "symbol" : "ZWR"}, "CZK": {"name" : "Czech Koruna", "symbol" : "CZK"}, "IEP": {"name" : "Irish Pound", "symbol" : "IEP"}, "YUR": {"name" : "Yugoslavian Reformed Dinar (1992–1993)", "symbol" : "YUR"}, "GRD": {"name" : "Greek Drachma", "symbol"
    : "GRD"}, "XCD": {"name" : "East Caribbean Dollar", "symbol" : "EC$"}, "HTG": {"name" : "Haitian Gourde", "symbol" : "HTG"}, "XSU": {"name" : "Sucre", "symbol" : "XSU"}, "AFA": {"name" : "Afghan Afghani (1927–2002)", "symbol" : "AFA"}, "BHD": {"name" : "Bahraini Dinar", "symbol" : "BHD"}, "SIT": {"name" : "Slovenian Tolar", "symbol" : "SIT"}, "PTE": {"name" : "Portuguese Escudo", "symbol" : "PTE"}, "KZT": {"name" : "Kazakhstani Tenge", "symbol" : "KZT"}, "SZL": {"name" : "Swazi Lilangeni", "symbol" : "SZL"}
    , "YER": {"name" : "Yemeni Rial", "symbol" : "YER"}, "AFN": {"name" : "Afghan Afghani", "symbol" : "AFN"}, "BYB": {"name" : "Belarusian Ruble (1994–1999)", "symbol" : "BYB"}, "RHD": {"name" : "Rhodesian Dollar", "symbol" : "RHD"}, "AWG": {"name" : "Aruban Florin", "symbol" : "AWG"}, "NPR": {"name" : "Nepalese Rupee", "symbol" : "NPR"}, "MNT": {"name" : "Mongolian Tugrik", "symbol" : "MNT"}, "GBP": {"name" : "British Pound", "symbol" : "£"}, "BYN": {"name" : "Belarusian Ruble", "symbol" : "BYN"}, "XTS": {"name"
    : "Testing Currency Code", "symbol" : "XTS"}, "HUF": {"name" : "Hungarian Forint", "symbol" : "HUF"}, "BYR": {"name" : "Belarusian Ruble (2000–2016)", "symbol" : "BYR"}, "BIF": {"name" : "Burundian Franc", "symbol" : "BIF"}, "XUA": {"name" : "ADB Unit of Account", "symbol" : "XUA"}, "XDR": {"name" : "Special Drawing Rights", "symbol" : "XDR"}, "BZD": {"name" : "Belize Dollar", "symbol" : "BZD"}, "MOP": {"name" : "Macanese Pataca", "symbol" : "MOP"}, "NAD": {"name" : "Namibian Dollar", "symbol" : "NAD"},
    "SKK": {"name" : "Slovak Koruna", "symbol" : "SKK"}, "PEI": {"name" : "Peruvian Inti", "symbol" : "PEI"}, "TMM": {"name" : "Turkmenistani Manat (1993–2009)", "symbol" : "TMM"}, "PEN": {"name" : "Peruvian Sol", "symbol" : "PEN"}, "WST": {"name" : "Samoan Tala", "symbol" : "WST"}, "TMT": {"name" : "Turkmenistani Manat", "symbol" : "TMT"}, "FRF": {"name" : "French Franc", "symbol" : "FRF"}, "CLF": {"name" : "Chilean Unit of Account (UF)", "symbol" : "CLF"}, "CLE": {"name" : "Chilean Escudo", "symbol" : "CLE"}
    , "PES": {"name" : "Peruvian Sol (1863–1965)", "symbol" : "PES"}, "GTQ": {"name" : "Guatemalan Quetzal", "symbol" : "GTQ"}, "CLP": {"name" : "Chilean Peso", "symbol" : "CLP"}, "XEU": {"name" : "European Currency Unit", "symbol" : "XEU"}, "TND": {"name" : "Tunisian Dinar", "symbol" : "TND"}, "SLL": {"name" : "Sierra Leonean Leone", "symbol" : "SLL"}, "XFO": {"name" : "French Gold Franc", "symbol" : "XFO"}, "DOP": {"name" : "Dominican Peso", "symbol" : "DOP"}, "KMF": {"name" : "Comorian Franc", "symbol" :
    "KMF"}, "XFU": {"name" : "French UIC-Franc", "symbol" : "XFU"}, "GEK": {"name" : "Georgian Kupon Larit", "symbol" : "GEK"}, "GEL": {"name" : "Georgian Lari", "symbol" : "GEL"}, "MAD": {"name" : "Moroccan Dirham", "symbol" : "MAD"}, "MAF": {"name" : "Moroccan Franc", "symbol" : "MAF"}, "AZM": {"name" : "Azerbaijani Manat (1993–2006)", "symbol" : "AZM"}, "TOP": {"name" : "Tongan Paʻanga", "symbol" : "TOP"}, "AZN": {"name" : "Azerbaijani Manat", "symbol" : "AZN"}, "PGK": {"name" : "Papua New Guinean Kina",
    "symbol" : "PGK"}, "CNH": {"name" : "Chinese Yuan (offshore)", "symbol" : "CNH"}, "UAH": {"name" : "Ukrainian Hryvnia", "symbol" : "UAH"}, "UAK": {"name" : "Ukrainian Karbovanets", "symbol" : "UAK"}, "ERN": {"name" : "Eritrean Nakfa", "symbol" : "ERN"}, "TPE": {"name" : "Timorese Escudo", "symbol" : "TPE"}, "MRO": {"name" : "Mauritanian Ouguiya (1973–2017)", "symbol" : "MRO"}, "CNX": {"name" : "Chinese People’s Bank Dollar", "symbol" : "CNX"}, "CNY": {"name" : "Chinese Yuan", "symbol" : "CN¥"}, "MRU": {"name"
    : "Mauritanian Ouguiya", "symbol" : "MRU"}, "ESA": {"name" : "Spanish Peseta (A account)", "symbol" : "ESA"}, "GWE": {"name" : "Portuguese Guinea Escudo", "symbol" : "GWE"}, "ESB": {"name" : "Spanish Peseta (convertible account)", "symbol" : "ESB"}, "BMD": {"name" : "Bermudan Dollar", "symbol" : "BMD"}, "PHP": {"name" : "Philippine Piso", "symbol" : "PHP"}, "XXX": {"name" : "Unknown Currency", "symbol" : "¤"}, "PYG": {"name" : "Paraguayan Guarani", "symbol" : "PYG"}, "JMD": {"name" : "Jamaican Dollar", "symbol"
    : "JMD"}, "GWP": {"name" : "Guinea-Bissau Peso", "symbol" : "GWP"}, "ESP": {"name" : "Spanish Peseta", "symbol" : "ESP"}, "COP": {"name" : "Colombian Peso", "symbol" : "COP"}, "USD": {"name" : "US Dollar", "symbol" : "$"}, "COU": {"name" : "Colombian Real Value Unit", "symbol" : "COU"}, "MCF": {"name" : "Monegasque Franc", "symbol" : "MCF"}, "USN": {"name" : "US Dollar (Next day)", "symbol" : "USN"}, "ETB": {"name" : "Ethiopian Birr", "symbol" : "ETB"}, "VEB": {"name" : "Venezuelan Bolívar (1871–2008)",
    "symbol" : "VEB"}, "ECS": {"name" : "Ecuadorian Sucre", "symbol" : "ECS"}, "USS": {"name" : "US Dollar (Same day)", "symbol" : "USS"}, "SOS": {"name" : "Somali Shilling", "symbol" : "SOS"}, "VEF": {"name" : "Venezuelan Bolívar (2008–2018)", "symbol" : "VEF"}, "VUV": {"name" : "Vanuatu Vatu", "symbol" : "VUV"}, "LAK": {"name" : "Laotian Kip", "symbol" : "LAK"}, "BND": {"name" : "Brunei Dollar", "symbol" : "BND"}, "ECV": {"name" : "Ecuadorian Unit of Constant Value", "symbol" : "ECV"}, "ZMK": {"name" : "Zambian Kwacha (1968–2012)",
    "symbol" : "ZMK"}, "LRD": {"name" : "Liberian Dollar", "symbol" : "LRD"}, "ALK": {"name" : "Albanian Lek (1946–1965)", "symbol" : "ALK"}, "ALL": {"name" : "Albanian Lek", "symbol" : "ALL"}, "GHC": {"name" : "Ghanaian Cedi (1979–2007)", "symbol" : "GHC"}, "MTL": {"name" : "Maltese Lira", "symbol" : "MTL"}, "VES": {"name" : "Venezuelan Bolívar", "symbol" : "VES"}, "ZMW": {"name" : "Zambian Kwacha", "symbol" : "ZMW"}, "MTP": {"name" : "Maltese Pound", "symbol" : "MTP"}, "ILP": {"name" : "Israeli Pound", "symbol"
    : "ILP"}, "MDC": {"name" : "Moldovan Cupon", "symbol" : "MDC"}, "ILR": {"name" : "Israeli Shekel (1980–1985)", "symbol" : "ILR"}, "TRL": {"name" : "Turkish Lira (1922–2005)", "symbol" : "TRL"}, "ILS": {"name" : "Israeli New Shekel", "symbol" : "₪"}, "GHS": {"name" : "Ghanaian Cedi", "symbol" : "GHS"}, "GYD": {"name" : "Guyanaese Dollar", "symbol" : "GYD"}, "KPW": {"name" : "North Korean Won", "symbol" : "KPW"}, "BOB": {"name" : "Bolivian Boliviano", "symbol" : "BOB"}, "MDL": {"name" : "Moldovan Leu", "symbol"
    : "MDL"}, "AMD": {"name" : "Armenian Dram", "symbol" : "AMD"}, "TRY": {"name" : "Turkish Lira", "symbol" : "TRY"}, "LBP": {"name" : "Lebanese Pound", "symbol" : "LBP"}, "BOL": {"name" : "Bolivian Boliviano (1863–1963)", "symbol" : "BOL"}, "JOD": {"name" : "Jordanian Dinar", "symbol" : "JOD"}, "HKD": {"name" : "Hong Kong Dollar", "symbol" : "HK$"}, "BOP": {"name" : "Bolivian Peso", "symbol" : "BOP"}, "EUR": {"name" : "Euro", "symbol" : "€"}, "LSL": {"name" : "Lesotho Loti", "symbol" : "LSL"}, "CAD": {"name"
    : "Canadian Dollar", "symbol" : "CA$"}, "BOV": {"name" : "Bolivian Mvdol", "symbol" : "BOV"}, "EEK": {"name" : "Estonian Kroon", "symbol" : "EEK"}, "MUR": {"name" : "Mauritian Rupee", "symbol" : "MUR"}, "ROL": {"name" : "Romanian Leu (1952–2006)", "symbol" : "ROL"}, "GIP": {"name" : "Gibraltar Pound", "symbol" : "GIP"}, "RON": {"name" : "Romanian Leu", "symbol" : "RON"}, "NGN": {"name" : "Nigerian Naira", "symbol" : "NGN"}, "CRC": {"name" : "Costa Rican Colón", "symbol" : "CRC"}, "PKR": {"name" : "Pakistani Rupee",
    "symbol" : "PKR"}, "ANG": {"name" : "Netherlands Antillean Guilder", "symbol" : "ANG"}, "KRH": {"name" : "South Korean Hwan (1953–1962)", "symbol" : "KRH"}, "SRD": {"name" : "Surinamese Dollar", "symbol" : "SRD"}, "LTL": {"name" : "Lithuanian Litas", "symbol" : "LTL"}, "SAR": {"name" : "Saudi Riyal", "symbol" : "SAR"}, "TTD": {"name" : "Trinidad & Tobago Dollar", "symbol" : "TTD"}, "MVP": {"name" : "Maldivian Rupee (1947–1981)", "symbol" : "MVP"}, "MVR": {"name" : "Maldivian Rufiyaa", "symbol" : "MVR"},
    "KRO": {"name" : "South Korean Won (1945–1953)", "symbol" : "KRO"}, "SRG": {"name" : "Surinamese Guilder", "symbol" : "SRG"}, "DDM": {"name" : "East German Mark", "symbol" : "DDM"}, "INR": {"name" : "Indian Rupee", "symbol" : "₹"}, "LTT": {"name" : "Lithuanian Talonas", "symbol" : "LTT"}, "KRW": {"name" : "South Korean Won", "symbol" : "₩"}, "JPY": {"name" : "Japanese Yen", "symbol" : "¥"}, "AOA": {"name" : "Angolan Kwanza", "symbol" : "AOA"}, "PLN": {"name" : "Polish Zloty", "symbol" : "PLN"}, "SBD": {"name"
    : "Solomon Islands Dollar", "symbol" : "SBD"}, "CSD": {"name" : "Serbian Dinar (2002–2006)", "symbol" : "CSD"}, "CSK": {"name" : "Czechoslovak Hard Koruna", "symbol" : "CSK"}, "LUC": {"name" : "Luxembourgian Convertible Franc", "symbol" : "LUC"}, "LUF": {"name" : "Luxembourgian Franc", "symbol" : "LUF"}, "AOK": {"name" : "Angolan Kwanza (1977–1991)", "symbol" : "AOK"}, "PLZ": {"name" : "Polish Zloty (1950–1995)", "symbol" : "PLZ"}, "AON": {"name" : "Angolan New Kwanza (1990–2000)", "symbol" : "AON"}, "MWK":
    {"name" : "Malawian Kwacha", "symbol" : "MWK"}, "LUL": {"name" : "Luxembourg Financial Franc", "symbol" : "LUL"}, "AOR": {"name" : "Angolan Readjusted Kwanza (1995–1999)", "symbol" : "AOR"}, "BAD": {"name" : "Bosnia-Herzegovina Dinar (1992–1994)", "symbol" : "BAD"}, "MGA": {"name" : "Malagasy Ariary", "symbol" : "MGA"}, "NIC": {"name" : "Nicaraguan Córdoba (1988–1991)", "symbol" : "NIC"}, "FIM": {"name" : "Finnish Markka", "symbol" : "FIM"}, "DEM": {"name" : "German Mark", "symbol" : "DEM"}, "MGF": {"name"
    : "Malagasy Franc", "symbol" : "MGF"}, "BAM": {"name" : "Bosnia-Herzegovina Convertible Mark", "symbol" : "BAM"}, "BAN": {"name" : "Bosnia-Herzegovina New Dinar (1994–1997)", "symbol" : "BAN"}, "EGP": {"name" : "Egyptian Pound", "symbol" : "EGP"}, "SSP": {"name" : "South Sudanese Pound", "symbol" : "SSP"}, "BRC": {"name" : "Brazilian Cruzado (1986–1989)", "symbol" : "BRC"}, "BRB": {"name" : "Brazilian New Cruzeiro (1967–1986)", "symbol" : "BRB"}, "BRE": {"name" : "Brazilian Cruzeiro (1990–1993)", "symbol"
    : "BRE"}, "NIO": {"name" : "Nicaraguan Córdoba", "symbol" : "NIO"}, "NZD": {"name" : "New Zealand Dollar", "symbol" : "NZ$"}, "BRL": {"name" : "Brazilian Real", "symbol" : "R$"}, "BRN": {"name" : "Brazilian New Cruzado (1989–1990)", "symbol" : "BRN"}}, "root": {"UGS": {"name" : "UGS", "symbol" : "UGS"}, "FJD": {"name" : "FJD", "symbol" : "FJD"}, "MXN": {"name" : "MXN", "symbol" : "MX$"}, "STD": {"name" : "STD", "symbol" : "STD"}, "BRR": {"name" : "BRR", "symbol" : "BRR"}, "LVL": {"name" : "LVL", "symbol"
    : "LVL"}, "SCR": {"name" : "SCR", "symbol" : "SCR"}, "CDF": {"name" : "CDF", "symbol" : "CDF"}, "MXP": {"name" : "MXP", "symbol" : "MXP"}, "ZAL": {"name" : "ZAL", "symbol" : "ZAL"}, "BBD": {"name" : "BBD", "symbol" : "BBD"}, "HNL": {"name" : "HNL", "symbol" : "HNL"}, "UGX": {"name" : "UGX", "symbol" : "UGX"}, "LVR": {"name" : "LVR", "symbol" : "LVR"}, "MXV": {"name" : "MXV", "symbol" : "MXV"}, "ZAR": {"name" : "ZAR", "symbol" : "ZAR"}, "BRZ": {"name" : "BRZ", "symbol" : "BRZ"}, "STN": {"name" : "STN", "symbol"
    : "STN"}, "CUC": {"name" : "CUC", "symbol" : "CUC"}, "BSD": {"name" : "BSD", "symbol" : "BSD"}, "SDD": {"name" : "SDD", "symbol" : "SDD"}, "SDG": {"name" : "SDG", "symbol" : "SDG"}, "ZRN": {"name" : "ZRN", "symbol" : "ZRN"}, "IQD": {"name" : "IQD", "symbol" : "IQD"}, "SDP": {"name" : "SDP", "symbol" : "SDP"}, "CUP": {"name" : "CUP", "symbol" : "CUP"}, "GMD": {"name" : "GMD", "symbol" : "GMD"}, "TWD": {"name" : "TWD", "symbol" : "NT$"}, "RSD": {"name" : "RSD", "symbol" : "RSD"}, "ZRZ": {"name" : "ZRZ", "symbol"
    : "ZRZ"}, "UYI": {"name" : "UYI", "symbol" : "UYI"}, "MYR": {"name" : "MYR", "symbol" : "MYR"}, "FKP": {"name" : "FKP", "symbol" : "FKP"}, "UYP": {"name" : "UYP", "symbol" : "UYP"}, "XOF": {"name" : "XOF", "symbol" : "CFA"}, "ARA": {"name" : "ARA", "symbol" : "ARA"}, "UYU": {"name" : "UYU", "symbol" : "UYU"}, "SUR": {"name" : "SUR", "symbol" : "SUR"}, "UYW": {"name" : "UYW", "symbol" : "UYW"}, "CVE": {"name" : "CVE", "symbol" : "CVE"}, "OMR": {"name" : "OMR", "symbol" : "OMR"}, "KES": {"name" : "KES", "symbol"
    : "KES"}, "SEK": {"name" : "SEK", "symbol" : "SEK"}, "MZE": {"name" : "MZE", "symbol" : "MZE"}, "ARL": {"name" : "ARL", "symbol" : "ARL"}, "ARM": {"name" : "ARM", "symbol" : "ARM"}, "BTN": {"name" : "BTN", "symbol" : "BTN"}, "GNF": {"name" : "GNF", "symbol" : "GNF"}, "ARP": {"name" : "ARP", "symbol" : "ARP"}, "MZN": {"name" : "MZN", "symbol" : "MZN"}, "MZM": {"name" : "MZM", "symbol" : "MZM"}, "SVC": {"name" : "SVC", "symbol" : "SVC"}, "ARS": {"name" : "ARS", "symbol" : "ARS"}, "QAR": {"name" : "QAR", "symbol"
    : "QAR"}, "IRR": {"name" : "IRR", "symbol" : "IRR"}, "NLG": {"name" : "NLG", "symbol" : "NLG"}, "GNS": {"name" : "GNS", "symbol" : "GNS"}, "XPD": {"name" : "XPD", "symbol" : "XPD"}, "THB": {"name" : "THB", "symbol" : "THB"}, "UZS": {"name" : "UZS", "symbol" : "UZS"}, "XPF": {"name" : "XPF", "symbol" : "CFPF"}, "BDT": {"name" : "BDT", "symbol" : "BDT"}, "LYD": {"name" : "LYD", "symbol" : "LYD"}, "BUK": {"name" : "BUK", "symbol" : "BUK"}, "KWD": {"name" : "KWD", "symbol" : "KWD"}, "XPT": {"name" : "XPT", "symbol"
    : "XPT"}, "RUB": {"name" : "RUB", "symbol" : "RUB"}, "ISK": {"name" : "ISK", "symbol" : "ISK"}, "BEC": {"name" : "BEC", "symbol" : "BEC"}, "ISJ": {"name" : "ISJ", "symbol" : "ISJ"}, "BEF": {"name" : "BEF", "symbol" : "BEF"}, "MKD": {"name" : "MKD", "symbol" : "MKD"}, "BEL": {"name" : "BEL", "symbol" : "BEL"}, "RUR": {"name" : "RUR", "symbol" : "RUR"}, "DZD": {"name" : "DZD", "symbol" : "DZD"}, "PAB": {"name" : "PAB", "symbol" : "PAB"}, "MKN": {"name" : "MKN", "symbol" : "MKN"}, "SGD": {"name" : "SGD", "symbol"
    : "SGD"}, "KGS": {"name" : "KGS", "symbol" : "KGS"}, "HRD": {"name" : "HRD", "symbol" : "HRD"}, "XAF": {"name" : "XAF", "symbol" : "FCFA"}, "XAG": {"name" : "XAG", "symbol" : "XAG"}, "ATS": {"name" : "ATS", "symbol" : "ATS"}, "CHF": {"name" : "CHF", "symbol" : "CHF"}, "HRK": {"name" : "HRK", "symbol" : "HRK"}, "ITL": {"name" : "ITL", "symbol" : "ITL"}, "CHE": {"name" : "CHE", "symbol" : "CHE"}, "DJF": {"name" : "DJF", "symbol" : "DJF"}, "MLF": {"name" : "MLF", "symbol" : "MLF"}, "XRE": {"name" : "XRE", "symbol"
    : "XRE"}, "TZS": {"name" : "TZS", "symbol" : "TZS"}, "ADP": {"name" : "ADP", "symbol" : "ADP"}, "VND": {"name" : "VND", "symbol" : "₫"}, "XAU": {"name" : "XAU", "symbol" : "XAU"}, "AUD": {"name" : "AUD", "symbol" : "A$"}, "CHW": {"name" : "CHW", "symbol" : "CHW"}, "KHR": {"name" : "KHR", "symbol" : "KHR"}, "IDR": {"name" : "IDR", "symbol" : "IDR"}, "XBA": {"name" : "XBA", "symbol" : "XBA"}, "KYD": {"name" : "KYD", "symbol" : "KYD"}, "VNN": {"name" : "VNN", "symbol" : "VNN"}, "XBC": {"name" : "XBC", "symbol"
    : "XBC"}, "YDD": {"name" : "YDD", "symbol" : "YDD"}, "XBB": {"name" : "XBB", "symbol" : "XBB"}, "BWP": {"name" : "BWP", "symbol" : "BWP"}, "GQE": {"name" : "GQE", "symbol" : "GQE"}, "SHP": {"name" : "SHP", "symbol" : "SHP"}, "CYP": {"name" : "CYP", "symbol" : "CYP"}, "XBD": {"name" : "XBD", "symbol" : "XBD"}, "TJS": {"name" : "TJS", "symbol" : "TJS"}, "TJR": {"name" : "TJR", "symbol" : "TJR"}, "AED": {"name" : "AED", "symbol" : "AED"}, "RWF": {"name" : "RWF", "symbol" : "RWF"}, "DKK": {"name" : "DKK", "symbol"
    : "DKK"}, "BGL": {"name" : "BGL", "symbol" : "BGL"}, "ZWD": {"name" : "ZWD", "symbol" : "ZWD"}, "BGN": {"name" : "BGN", "symbol" : "BGN"}, "BGM": {"name" : "BGM", "symbol" : "BGM"}, "YUD": {"name" : "YUD", "symbol" : "YUD"}, "MMK": {"name" : "MMK", "symbol" : "MMK"}, "BGO": {"name" : "BGO", "symbol" : "BGO"}, "NOK": {"name" : "NOK", "symbol" : "NOK"}, "SYP": {"name" : "SYP", "symbol" : "SYP"}, "ZWL": {"name" : "ZWL", "symbol" : "ZWL"}, "YUM": {"name" : "YUM", "symbol" : "YUM"}, "LKR": {"name" : "LKR", "symbol"
    : "LKR"}, "YUN": {"name" : "YUN", "symbol" : "YUN"}, "ZWR": {"name" : "ZWR", "symbol" : "ZWR"}, "CZK": {"name" : "CZK", "symbol" : "CZK"}, "IEP": {"name" : "IEP", "symbol" : "IEP"}, "YUR": {"name" : "YUR", "symbol" : "YUR"}, "GRD": {"name" : "GRD", "symbol" : "GRD"}, "XCD": {"name" : "XCD", "symbol" : "EC$"}, "HTG": {"name" : "HTG", "symbol" : "HTG"}, "XSU": {"name" : "XSU", "symbol" : "XSU"}, "AFA": {"name" : "AFA", "symbol" : "AFA"}, "BHD": {"name" : "BHD", "symbol" : "BHD"}, "SIT": {"name" : "SIT", "symbol"
    : "SIT"}, "PTE": {"name" : "PTE", "symbol" : "PTE"}, "KZT": {"name" : "KZT", "symbol" : "KZT"}, "SZL": {"name" : "SZL", "symbol" : "SZL"}, "YER": {"name" : "YER", "symbol" : "YER"}, "AFN": {"name" : "AFN", "symbol" : "AFN"}, "BYB": {"name" : "BYB", "symbol" : "BYB"}, "RHD": {"name" : "RHD", "symbol" : "RHD"}, "AWG": {"name" : "AWG", "symbol" : "AWG"}, "NPR": {"name" : "NPR", "symbol" : "NPR"}, "MNT": {"name" : "MNT", "symbol" : "MNT"}, "GBP": {"name" : "GBP", "symbol" : "£"}, "BYN": {"name" : "BYN", "symbol"
    : "BYN"}, "XTS": {"name" : "XTS", "symbol" : "XTS"}, "HUF": {"name" : "HUF", "symbol" : "HUF"}, "BYR": {"name" : "BYR", "symbol" : "BYR"}, "BIF": {"name" : "BIF", "symbol" : "BIF"}, "XUA": {"name" : "XUA", "symbol" : "XUA"}, "XDR": {"name" : "XDR", "symbol" : "XDR"}, "BZD": {"name" : "BZD", "symbol" : "BZD"}, "MOP": {"name" : "MOP", "symbol" : "MOP"}, "NAD": {"name" : "NAD", "symbol" : "NAD"}, "SKK": {"name" : "SKK", "symbol" : "SKK"}, "PEI": {"name" : "PEI", "symbol" : "PEI"}, "TMM": {"name" : "TMM", "symbol"
    : "TMM"}, "PEN": {"name" : "PEN", "symbol" : "PEN"}, "WST": {"name" : "WST", "symbol" : "WST"}, "TMT": {"name" : "TMT", "symbol" : "TMT"}, "FRF": {"name" : "FRF", "symbol" : "FRF"}, "CLF": {"name" : "CLF", "symbol" : "CLF"}, "CLE": {"name" : "CLE", "symbol" : "CLE"}, "PES": {"name" : "PES", "symbol" : "PES"}, "GTQ": {"name" : "GTQ", "symbol" : "GTQ"}, "CLP": {"name" : "CLP", "symbol" : "CLP"}, "XEU": {"name" : "XEU", "symbol" : "XEU"}, "TND": {"name" : "TND", "symbol" : "TND"}, "SLL": {"name" : "SLL", "symbol"
    : "SLL"}, "XFO": {"name" : "XFO", "symbol" : "XFO"}, "DOP": {"name" : "DOP", "symbol" : "DOP"}, "KMF": {"name" : "KMF", "symbol" : "KMF"}, "XFU": {"name" : "XFU", "symbol" : "XFU"}, "GEK": {"name" : "GEK", "symbol" : "GEK"}, "GEL": {"name" : "GEL", "symbol" : "GEL"}, "MAD": {"name" : "MAD", "symbol" : "MAD"}, "MAF": {"name" : "MAF", "symbol" : "MAF"}, "AZM": {"name" : "AZM", "symbol" : "AZM"}, "TOP": {"name" : "TOP", "symbol" : "TOP"}, "AZN": {"name" : "AZN", "symbol" : "AZN"}, "PGK": {"name" : "PGK", "symbol"
    : "PGK"}, "CNH": {"name" : "CNH", "symbol" : "CNH"}, "UAH": {"name" : "UAH", "symbol" : "UAH"}, "UAK": {"name" : "UAK", "symbol" : "UAK"}, "ERN": {"name" : "ERN", "symbol" : "ERN"}, "TPE": {"name" : "TPE", "symbol" : "TPE"}, "MRO": {"name" : "MRO", "symbol" : "MRO"}, "CNX": {"name" : "CNX", "symbol" : "CNX"}, "CNY": {"name" : "CNY", "symbol" : "CN¥"}, "MRU": {"name" : "MRU", "symbol" : "MRU"}, "ESA": {"name" : "ESA", "symbol" : "ESA"}, "GWE": {"name" : "GWE", "symbol" : "GWE"}, "ESB": {"name" : "ESB", "symbol"
    : "ESB"}, "BMD": {"name" : "BMD", "symbol" : "BMD"}, "PHP": {"name" : "PHP", "symbol" : "PHP"}, "XXX": {"name" : "XXX", "symbol" : "¤"}, "PYG": {"name" : "PYG", "symbol" : "PYG"}, "JMD": {"name" : "JMD", "symbol" : "JMD"}, "GWP": {"name" : "GWP", "symbol" : "GWP"}, "ESP": {"name" : "ESP", "symbol" : "ESP"}, "COP": {"name" : "COP", "symbol" : "COP"}, "USD": {"name" : "USD", "symbol" : "US$"}, "COU": {"name" : "COU", "symbol" : "COU"}, "MCF": {"name" : "MCF", "symbol" : "MCF"}, "USN": {"name" : "USN", "symbol"
    : "USN"}, "ETB": {"name" : "ETB", "symbol" : "ETB"}, "VEB": {"name" : "VEB", "symbol" : "VEB"}, "ECS": {"name" : "ECS", "symbol" : "ECS"}, "USS": {"name" : "USS", "symbol" : "USS"}, "SOS": {"name" : "SOS", "symbol" : "SOS"}, "VEF": {"name" : "VEF", "symbol" : "VEF"}, "VUV": {"name" : "VUV", "symbol" : "VUV"}, "LAK": {"name" : "LAK", "symbol" : "LAK"}, "BND": {"name" : "BND", "symbol" : "BND"}, "ECV": {"name" : "ECV", "symbol" : "ECV"}, "ZMK": {"name" : "ZMK", "symbol" : "ZMK"}, "LRD": {"name" : "LRD", "symbol"
    : "LRD"}, "ALK": {"name" : "ALK", "symbol" : "ALK"}, "ALL": {"name" : "ALL", "symbol" : "ALL"}, "GHC": {"name" : "GHC", "symbol" : "GHC"}, "MTL": {"name" : "MTL", "symbol" : "MTL"}, "VES": {"name" : "VES", "symbol" : "VES"}, "ZMW": {"name" : "ZMW", "symbol" : "ZMW"}, "MTP": {"name" : "MTP", "symbol" : "MTP"}, "ILP": {"name" : "ILP", "symbol" : "ILP"}, "MDC": {"name" : "MDC", "symbol" : "MDC"}, "ILR": {"name" : "ILR", "symbol" : "ILR"}, "TRL": {"name" : "TRL", "symbol" : "TRL"}, "ILS": {"name" : "ILS", "symbol"
    : "₪"}, "GHS": {"name" : "GHS", "symbol" : "GHS"}, "GYD": {"name" : "GYD", "symbol" : "GYD"}, "KPW": {"name" : "KPW", "symbol" : "KPW"}, "BOB": {"name" : "BOB", "symbol" : "BOB"}, "MDL": {"name" : "MDL", "symbol" : "MDL"}, "AMD": {"name" : "AMD", "symbol" : "AMD"}, "TRY": {"name" : "TRY", "symbol" : "TRY"}, "LBP": {"name" : "LBP", "symbol" : "LBP"}, "BOL": {"name" : "BOL", "symbol" : "BOL"}, "JOD": {"name" : "JOD", "symbol" : "JOD"}, "HKD": {"name" : "HKD", "symbol" : "HK$"}, "BOP": {"name" : "BOP", "symbol"
    : "BOP"}, "EUR": {"name" : "EUR", "symbol" : "€"}, "LSL": {"name" : "LSL", "symbol" : "LSL"}, "CAD": {"name" : "CAD", "symbol" : "CA$"}, "BOV": {"name" : "BOV", "symbol" : "BOV"}, "EEK": {"name" : "EEK", "symbol" : "EEK"}, "MUR": {"name" : "MUR", "symbol" : "MUR"}, "ROL": {"name" : "ROL", "symbol" : "ROL"}, "GIP": {"name" : "GIP", "symbol" : "GIP"}, "RON": {"name" : "RON", "symbol" : "RON"}, "NGN": {"name" : "NGN", "symbol" : "NGN"}, "CRC": {"name" : "CRC", "symbol" : "CRC"}, "PKR": {"name" : "PKR", "symbol"
    : "PKR"}, "ANG": {"name" : "ANG", "symbol" : "ANG"}, "KRH": {"name" : "KRH", "symbol" : "KRH"}, "SRD": {"name" : "SRD", "symbol" : "SRD"}, "LTL": {"name" : "LTL", "symbol" : "LTL"}, "SAR": {"name" : "SAR", "symbol" : "SAR"}, "TTD": {"name" : "TTD", "symbol" : "TTD"}, "MVP": {"name" : "MVP", "symbol" : "MVP"}, "MVR": {"name" : "MVR", "symbol" : "MVR"}, "KRO": {"name" : "KRO", "symbol" : "KRO"}, "SRG": {"name" : "SRG", "symbol" : "SRG"}, "DDM": {"name" : "DDM", "symbol" : "DDM"}, "INR": {"name" : "INR", "symbol"
    : "₹"}, "LTT": {"name" : "LTT", "symbol" : "LTT"}, "KRW": {"name" : "KRW", "symbol" : "₩"}, "JPY": {"name" : "JPY", "symbol" : "JP¥"}, "AOA": {"name" : "AOA", "symbol" : "AOA"}, "PLN": {"name" : "PLN", "symbol" : "PLN"}, "SBD": {"name" : "SBD", "symbol" : "SBD"}, "CSD": {"name" : "CSD", "symbol" : "CSD"}, "CSK": {"name" : "CSK", "symbol" : "CSK"}, "LUC": {"name" : "LUC", "symbol" : "LUC"}, "LUF": {"name" : "LUF", "symbol" : "LUF"}, "AOK": {"name" : "AOK", "symbol" : "AOK"}, "PLZ": {"name" : "PLZ", "symbol"
    : "PLZ"}, "AON": {"name" : "AON", "symbol" : "AON"}, "MWK": {"name" : "MWK", "symbol" : "MWK"}, "LUL": {"name" : "LUL", "symbol" : "LUL"}, "AOR": {"name" : "AOR", "symbol" : "AOR"}, "BAD": {"name" : "BAD", "symbol" : "BAD"}, "MGA": {"name" : "MGA", "symbol" : "MGA"}, "NIC": {"name" : "NIC", "symbol" : "NIC"}, "FIM": {"name" : "FIM", "symbol" : "FIM"}, "DEM": {"name" : "DEM", "symbol" : "DEM"}, "MGF": {"name" : "MGF", "symbol" : "MGF"}, "BAM": {"name" : "BAM", "symbol" : "BAM"}, "BAN": {"name" : "BAN", "symbol"
    : "BAN"}, "EGP": {"name" : "EGP", "symbol" : "EGP"}, "SSP": {"name" : "SSP", "symbol" : "SSP"}, "BRC": {"name" : "BRC", "symbol" : "BRC"}, "BRB": {"name" : "BRB", "symbol" : "BRB"}, "BRE": {"name" : "BRE", "symbol" : "BRE"}, "NIO": {"name" : "NIO", "symbol" : "NIO"}, "NZD": {"name" : "NZD", "symbol" : "NZ$"}, "BRL": {"name" : "BRL", "symbol" : "R$"}, "BRN": {"name" : "BRN", "symbol" : "BRN"}}};
},
jt_DecimalFormat$FormatField = $rt_classWithoutFields(0),
jt_DecimalFormat$CurrencyField = $rt_classWithoutFields(),
jt_DecimalFormat$CurrencyField__init_ = $this => {
    jl_Object__init_($this);
},
jt_DecimalFormat$CurrencyField__init_0 = () => {
    let var_0 = new jt_DecimalFormat$CurrencyField();
    jt_DecimalFormat$CurrencyField__init_(var_0);
    return var_0;
},
jt_DecimalFormat$CurrencyField_render = ($this, $format, $buffer) => {
    if ($format.$getCurrency() === null)
        $buffer.$append3(164);
    else
        $buffer.$append4(ju_Currency_getSymbol($format.$getCurrency(), $format.$symbols.$getLocale()));
},
jl_CharSequence = $rt_classWithoutFields(0),
jlr_Member = $rt_classWithoutFields(0);
function nmn_MinecraftClientConnection() {
    let a = this; jl_Object.call(a);
    a.$side = null;
    a.$duringLogin = 0;
    a.$queuedTasks = null;
    a.$packetsSentCounter = 0;
    a.$averagePacketsSent = 0.0;
}
let nmn_MinecraftClientConnection_CLIENT_IO_GROUP = null,
nmn_MinecraftClientConnection_EPOLL_CLIENT_IO_GROUP = null,
nmn_MinecraftClientConnection_LOCAL_CLIENT_IO_GROUP = null,
nmn_MinecraftClientConnection_EMPTY_RUNNABLE = null,
nmn_MinecraftClientConnection_handshakePacketClass = null,
nmn_MinecraftClientConnection_connectionIntentClass = null,
nmn_MinecraftClientConnection_$callClinit = () => {
    nmn_MinecraftClientConnection_$callClinit = $rt_eraseClinit(nmn_MinecraftClientConnection);
    nmn_MinecraftClientConnection__clinit_();
},
nmn_MinecraftClientConnection_initHandshakeClasses = () => {
    let var$1, var$2, $e, var$4, $$je;
    nmn_MinecraftClientConnection_$callClinit();
    if (nmn_MinecraftClientConnection_handshakePacketClass === null && nmn_MinecraftClientConnection_connectionIntentClass === null) {
        a: {
            try {
                jl_Class_initialize($rt_cls(nmnph_ClientIntentionPacket));
                nmn_MinecraftClientConnection_handshakePacketClass = $rt_cls(nmnph_ClientIntentionPacket);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    $e = $$je;
                    var$1 = jl_System_err();
                    var$2 = $e.$getMessage();
                    var$4 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(9)), var$2);
                    var$1.$println1(jl_StringBuilder_toString(var$4));
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
        b: {
            try {
                jl_Class_initialize($rt_cls(nmnph_ClientIntent));
                nmn_MinecraftClientConnection_connectionIntentClass = $rt_cls(nmnph_ClientIntent);
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    $e = $$je;
                    var$1 = jl_System_err();
                    var$2 = $e.$getMessage();
                    var$4 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(10)), var$2);
                    var$1.$println1(jl_StringBuilder_toString(var$4));
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        return;
    }
},
nmn_MinecraftClientConnection__init_ = ($this, $side) => {
    nmn_MinecraftClientConnection_$callClinit();
    jl_Object__init_($this);
    $this.$side = $side;
    $this.$duringLogin = 1;
    $this.$queuedTasks = juc_ConcurrentLinkedQueue__init_0();
},
nmn_MinecraftClientConnection__init_0 = var_0 => {
    let var_1 = new nmn_MinecraftClientConnection();
    nmn_MinecraftClientConnection__init_(var_1, var_0);
    return var_1;
},
nmn_MinecraftClientConnection_send = ($this, $packet) => {
    $this.$send($packet, null);
},
nmn_MinecraftClientConnection_send0 = ($this, $packet, $callbacks) => {
    $this.$send0($packet, $callbacks, 1);
},
nmn_MinecraftClientConnection_send1 = ($this, $packet, $callbacks, $syncImmediately) => {
    if (pn_NetBridge_isOpen()) {
        nmn_MinecraftClientConnection_sendInternal($this, $packet, $callbacks, $syncImmediately);
        return;
    }
    $this.$queuedTasks.$add(nmn_MinecraftClientConnection$send$lambda$_8_0__init_0($this, $packet, $callbacks, $syncImmediately));
},
nmn_MinecraftClientConnection_handleQueuedTasks = $this => {
    let var$1, $task, var$3, $$je;
    if (pn_NetBridge_isOpen() && !$this.$queuedTasks.$isEmpty()) {
        var$1 = $this.$queuedTasks;
        jl_Object_monitorEnterSync(var$1);
        a: {
            try {
                while (!$this.$queuedTasks.$isEmpty()) {
                    $task = $this.$queuedTasks.$poll();
                    if ($task !== null)
                        $task.$accept($this);
                }
                jl_Object_monitorExitSync(var$1);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;
                break a;

            }
            return;
        }
        jl_Object_monitorExitSync(var$1);
        $rt_throw(var$3);
    }
},
nmn_MinecraftClientConnection_sendInternal = ($this, $packet, $callbacks, $syncImmediately) => {
    let $packetId, $e, $payload, var$7, var$8, var$9, $$je;
    if (!pn_NetBridge_isOpen())
        return;
    nmn_MinecraftClientConnection_handleQueuedTasks($this);
    $this.$packetsSentCounter = $this.$packetsSentCounter + 1 | 0;
    $this.$averagePacketsSent = 0.75 * $this.$averagePacketsSent + 0.25;
    a: {
        b: {
            c: {
                try {
                    $packetId = nmn_MinecraftClientConnection_getPacketId($packet);
                    if ($packetId)
                        break c;
                    (jl_System_err()).$println1($rt_s(11));
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        $e = $$je;
                        break b;
                    } else {
                        throw $$e;
                    }
                }
                return;
            }
            try {
                $payload = nmn_MinecraftClientConnection_serializePacketData($packet);
                pn_NetBridge_writePacket($packetId, $payload);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    $e = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        var$7 = jl_System_err();
        var$8 = jl_String_valueOf0($e);
        var$9 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$9, $rt_s(12)), var$8);
        var$7.$println1(jl_StringBuilder_toString(var$9));
    }
},
nmn_MinecraftClientConnection_serializePacketData = $packet => {
    nmn_MinecraftClientConnection_$callClinit();
    $rt_throw(jl_ClassNotFoundException__init_0());
},
nmn_MinecraftClientConnection_getPacketId = $packet => {
    let $getId, $idObj, $id, var$5, var$6, $e, var$8, $$je;
    nmn_MinecraftClientConnection_$callClinit();
    a: {
        b: {
            try {
                c: {
                    $getId = jl_Class_getMethod(jl_Object_getClass($packet), $rt_s(13), $rt_createArray(jl_Class, 0));
                    $idObj = $getId.$invoke($packet, $rt_createArray(jl_Object, 0));
                    if ($idObj instanceof jl_Integer) {
                        $id = $idObj.$intValue();
                        if ($id)
                            break c;
                    }
                    break a;
                }
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NoSuchMethodException) {
                    break b;
                } else if ($$je instanceof jl_Exception) {
                    $e = $$je;
                    var$5 = jl_System_err();
                    var$6 = jl_String_valueOf0($e);
                    var$8 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(var$8, $rt_s(14)), var$6);
                    var$5.$println1(jl_StringBuilder_toString(var$8));
                    break a;
                } else {
                    throw $$e;
                }
            }
            return $id;
        }
    }
    return 0;
},
nmn_MinecraftClientConnection_initiateHandshake = ($this, $hostname, $port) => {
    let $c, $ctor, var$5, var$6, var$7, $loginField, var$9, $f, $fields, $packet, var$13, var$14, $e, var$16, $$je;
    nmn_MinecraftClientConnection_initHandshakeClasses();
    if (nmn_MinecraftClientConnection_handshakePacketClass !== null && nmn_MinecraftClientConnection_connectionIntentClass !== null) {
        a: {
            try {
                $c = null;
                b: {
                    try {
                        $ctor = jl_Class_getConstructor(nmn_MinecraftClientConnection_handshakePacketClass, $rt_wrapArray(jl_Class, [$rt_cls($rt_intcls), $rt_cls(jl_String), $rt_cls($rt_intcls), nmn_MinecraftClientConnection_connectionIntentClass]));
                        $c = $ctor;
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_NoSuchMethodException) {
                            var$5 = (jl_Class_getDeclaredConstructors(nmn_MinecraftClientConnection_handshakePacketClass)).data;
                            var$6 = var$5.length;
                            var$7 = 0;
                            while (var$7 < var$6) {
                                $ctor = var$5[var$7];
                                if ($ctor.$getParameterCount() == 4)
                                    break b;
                                var$7 = var$7 + 1 | 0;
                            }
                            $ctor = $c;
                            break b;
                        } else {
                            throw $$e;
                        }
                    }
                }
                if ($ctor === null)
                    $rt_throw(jl_NoSuchMethodException__init_2($rt_s(15)));
                $ctor.$setAccessible(1);
                $loginField = null;
                var$5 = (jl_Class_getFields(nmn_MinecraftClientConnection_connectionIntentClass)).data;
                var$7 = var$5.length;
                var$9 = 0;
                c: {
                    d: {
                        while (var$9 < var$7) {
                            $f = var$5[var$9];
                            if ($rt_s(16).$equals($f.$getName()))
                                break d;
                            if ($rt_s(17).$equals($f.$getName()))
                                break d;
                            var$9 = var$9 + 1 | 0;
                        }
                        $f = $loginField;
                        break c;
                    }
                }
                if ($f === null) {
                    $fields = jl_Class_getFields(nmn_MinecraftClientConnection_connectionIntentClass);
                    var$5 = $fields.data;
                    if (var$5.length >= 2)
                        $f = var$5[1];
                }
                if ($f === null)
                    $rt_throw(jl_NoSuchFieldException__init_0($rt_s(18)));
                $f.$setAccessible(1);
                $packet = $ctor.$newInstance($rt_wrapArray(jl_Object, [jl_Integer_valueOf(767), $hostname, jl_Integer_valueOf($port), $f.$get(null)]));
                $this.$send1($packet);
                (jl_System_out()).$printf($rt_s(19), $rt_wrapArray(jl_Object, [$hostname, jl_Integer_valueOf($port)]));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    $e = $$je;
                    var$13 = jl_System_err();
                    var$14 = jl_String_valueOf0($e);
                    var$16 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(var$16, $rt_s(20)), var$14);
                    var$13.$println1(jl_StringBuilder_toString(var$16));
                    $e.$printStackTrace0();
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
        return;
    }
    (jl_System_err()).$println1($rt_s(21));
},
nmn_MinecraftClientConnection__clinit_ = () => {
    nmn_MinecraftClientConnection_CLIENT_IO_GROUP = null;
    nmn_MinecraftClientConnection_EPOLL_CLIENT_IO_GROUP = null;
    nmn_MinecraftClientConnection_LOCAL_CLIENT_IO_GROUP = null;
    nmn_MinecraftClientConnection_EMPTY_RUNNABLE = nmn_MinecraftClientConnection$_clinit_$lambda$_44_0__init_0();
},
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_0 = $this => {
    jl_IndexOutOfBoundsException__init_0($this);
},
jl_StringIndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
},
otcic_CurrencyHelper = $rt_classWithoutFields(),
otcic_CurrencyHelper_$$metadata$$0 = null,
otcic_CurrencyHelper_$$metadata$$1 = null,
otcic_CurrencyHelper_getCurrencies = () => {
    if (otcic_CurrencyHelper_$$metadata$$0 === null)
        otcic_CurrencyHelper_$$metadata$$0 = otcic_CurrencyHelper_getCurrencies$$create();
    return otcic_CurrencyHelper_$$metadata$$0;
},
otcic_CurrencyHelper_getCountryToCurrencyMap = () => {
    if (otcic_CurrencyHelper_$$metadata$$1 === null)
        otcic_CurrencyHelper_$$metadata$$1 = otcic_CurrencyHelper_getCountryToCurrencyMap$$create();
    return otcic_CurrencyHelper_$$metadata$$1;
},
otcic_CurrencyHelper_getCurrencies$$create = () => {
    return [{"code" : "AFN", "numericCode" : 971, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "ALL", "numericCode" : 8, "fractionDigits" : 2}, {"code" : "DZD", "numericCode" : 12, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "AOA", "numericCode" : 973, "fractionDigits" : 2}, {"code" : "XCD", "numericCode" : 951, "fractionDigits" : 2}, {"code" : "XCD",
    "numericCode" : 951, "fractionDigits" : 2}, {"code" : "ARS", "numericCode" : 32, "fractionDigits" : 2}, {"code" : "AMD", "numericCode" : 51, "fractionDigits" : 2}, {"code" : "AWG", "numericCode" : 533, "fractionDigits" : 2}, {"code" : "AUD", "numericCode" : 36, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "AZN", "numericCode" : 944, "fractionDigits" : 2}, {"code" : "BSD", "numericCode" : 44, "fractionDigits" : 2}, {"code" : "BHD", "numericCode" : 48, "fractionDigits"
    : 3}, {"code" : "BDT", "numericCode" : 50, "fractionDigits" : 2}, {"code" : "BBD", "numericCode" : 52, "fractionDigits" : 2}, {"code" : "BYR", "numericCode" : 974, "fractionDigits" : 0}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "BZD", "numericCode" : 84, "fractionDigits" : 2}, {"code" : "XOF", "numericCode" : 952, "fractionDigits" : 0}, {"code" : "BMD", "numericCode" : 60, "fractionDigits" : 2}, {"code" : "BTN", "numericCode" : 64, "fractionDigits" : 2}, {"code" : "INR", "numericCode"
    : 356, "fractionDigits" : 2}, {"code" : "BOB", "numericCode" : 68, "fractionDigits" : 2}, {"code" : "BOV", "numericCode" : 984, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "BAM", "numericCode" : 977, "fractionDigits" : 2}, {"code" : "BWP", "numericCode" : 72, "fractionDigits" : 2}, {"code" : "NOK", "numericCode" : 578, "fractionDigits" : 2}, {"code" : "BRL", "numericCode" : 986, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits"
    : 2}, {"code" : "BND", "numericCode" : 96, "fractionDigits" : 2}, {"code" : "BGN", "numericCode" : 975, "fractionDigits" : 2}, {"code" : "XOF", "numericCode" : 952, "fractionDigits" : 0}, {"code" : "BIF", "numericCode" : 108, "fractionDigits" : 0}, {"code" : "KHR", "numericCode" : 116, "fractionDigits" : 2}, {"code" : "XAF", "numericCode" : 950, "fractionDigits" : 0}, {"code" : "CAD", "numericCode" : 124, "fractionDigits" : 2}, {"code" : "CVE", "numericCode" : 132, "fractionDigits" : 2}, {"code" : "KYD",
    "numericCode" : 136, "fractionDigits" : 2}, {"code" : "XAF", "numericCode" : 950, "fractionDigits" : 0}, {"code" : "XAF", "numericCode" : 950, "fractionDigits" : 0}, {"code" : "CLF", "numericCode" : 990, "fractionDigits" : 4}, {"code" : "CLP", "numericCode" : 152, "fractionDigits" : 0}, {"code" : "CNY", "numericCode" : 156, "fractionDigits" : 2}, {"code" : "AUD", "numericCode" : 36, "fractionDigits" : 2}, {"code" : "AUD", "numericCode" : 36, "fractionDigits" : 2}, {"code" : "COP", "numericCode" : 170, "fractionDigits"
    : 2}, {"code" : "COU", "numericCode" : 970, "fractionDigits" : 2}, {"code" : "KMF", "numericCode" : 174, "fractionDigits" : 0}, {"code" : "XAF", "numericCode" : 950, "fractionDigits" : 0}, {"code" : "CDF", "numericCode" : 976, "fractionDigits" : 2}, {"code" : "NZD", "numericCode" : 554, "fractionDigits" : 2}, {"code" : "CRC", "numericCode" : 188, "fractionDigits" : 2}, {"code" : "XOF", "numericCode" : 952, "fractionDigits" : 0}, {"code" : "HRK", "numericCode" : 191, "fractionDigits" : 2}, {"code" : "CUC",
    "numericCode" : 931, "fractionDigits" : 2}, {"code" : "CUP", "numericCode" : 192, "fractionDigits" : 2}, {"code" : "ANG", "numericCode" : 532, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "CZK", "numericCode" : 203, "fractionDigits" : 2}, {"code" : "DKK", "numericCode" : 208, "fractionDigits" : 2}, {"code" : "DJF", "numericCode" : 262, "fractionDigits" : 0}, {"code" : "XCD", "numericCode" : 951, "fractionDigits" : 2}, {"code" : "DOP", "numericCode" : 214,
    "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "EGP", "numericCode" : 818, "fractionDigits" : 2}, {"code" : "SVC", "numericCode" : 222, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "XAF", "numericCode" : 950, "fractionDigits" : 0}, {"code" : "ERN", "numericCode" : 232, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "ETB", "numericCode" : 230, "fractionDigits" : 2}
    , {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "FKP", "numericCode" : 238, "fractionDigits" : 2}, {"code" : "DKK", "numericCode" : 208, "fractionDigits" : 2}, {"code" : "FJD", "numericCode" : 242, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "XPF", "numericCode" : 953, "fractionDigits" : 0}, {"code" : "EUR", "numericCode"
    : 978, "fractionDigits" : 2}, {"code" : "XAF", "numericCode" : 950, "fractionDigits" : 0}, {"code" : "GMD", "numericCode" : 270, "fractionDigits" : 2}, {"code" : "GEL", "numericCode" : 981, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "GHS", "numericCode" : 936, "fractionDigits" : 2}, {"code" : "GIP", "numericCode" : 292, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "DKK", "numericCode" : 208, "fractionDigits"
    : 2}, {"code" : "XCD", "numericCode" : 951, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "GTQ", "numericCode" : 320, "fractionDigits" : 2}, {"code" : "GBP", "numericCode" : 826, "fractionDigits" : 2}, {"code" : "GNF", "numericCode" : 324, "fractionDigits" : 0}, {"code" : "XOF", "numericCode" : 952, "fractionDigits" : 0}, {"code" : "GYD", "numericCode" : 328, "fractionDigits" : 2}, {"code" : "HTG",
    "numericCode" : 332, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "AUD", "numericCode" : 36, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "HNL", "numericCode" : 340, "fractionDigits" : 2}, {"code" : "HKD", "numericCode" : 344, "fractionDigits" : 2}, {"code" : "HUF", "numericCode" : 348, "fractionDigits" : 2}, {"code" : "ISK", "numericCode" : 352, "fractionDigits" : 0}, {"code" : "INR", "numericCode" : 356, "fractionDigits"
    : 2}, {"code" : "IDR", "numericCode" : 360, "fractionDigits" : 2}, {"code" : "XDR", "numericCode" : 960, "fractionDigits" : -1}, {"code" : "IRR", "numericCode" : 364, "fractionDigits" : 2}, {"code" : "IQD", "numericCode" : 368, "fractionDigits" : 3}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "GBP", "numericCode" : 826, "fractionDigits" : 2}, {"code" : "ILS", "numericCode" : 376, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "JMD",
    "numericCode" : 388, "fractionDigits" : 2}, {"code" : "JPY", "numericCode" : 392, "fractionDigits" : 0}, {"code" : "GBP", "numericCode" : 826, "fractionDigits" : 2}, {"code" : "JOD", "numericCode" : 400, "fractionDigits" : 3}, {"code" : "KZT", "numericCode" : 398, "fractionDigits" : 2}, {"code" : "KES", "numericCode" : 404, "fractionDigits" : 2}, {"code" : "AUD", "numericCode" : 36, "fractionDigits" : 2}, {"code" : "KPW", "numericCode" : 408, "fractionDigits" : 2}, {"code" : "KRW", "numericCode" : 410, "fractionDigits"
    : 0}, {"code" : "KWD", "numericCode" : 414, "fractionDigits" : 3}, {"code" : "KGS", "numericCode" : 417, "fractionDigits" : 2}, {"code" : "LAK", "numericCode" : 418, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "LBP", "numericCode" : 422, "fractionDigits" : 2}, {"code" : "LSL", "numericCode" : 426, "fractionDigits" : 2}, {"code" : "ZAR", "numericCode" : 710, "fractionDigits" : 2}, {"code" : "LRD", "numericCode" : 430, "fractionDigits" : 2}, {"code" : "LYD",
    "numericCode" : 434, "fractionDigits" : 3}, {"code" : "CHF", "numericCode" : 756, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "MOP", "numericCode" : 446, "fractionDigits" : 2}, {"code" : "MKD", "numericCode" : 807, "fractionDigits" : 2}, {"code" : "MGA", "numericCode" : 969, "fractionDigits" : 2}, {"code" : "MWK", "numericCode" : 454, "fractionDigits" : 2}, {"code" : "MYR", "numericCode" : 458,
    "fractionDigits" : 2}, {"code" : "MVR", "numericCode" : 462, "fractionDigits" : 2}, {"code" : "XOF", "numericCode" : 952, "fractionDigits" : 0}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "MRO", "numericCode" : 478, "fractionDigits" : 2}, {"code" : "MUR", "numericCode" : 480, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}
    , {"code" : "XUA", "numericCode" : 965, "fractionDigits" : -1}, {"code" : "MXN", "numericCode" : 484, "fractionDigits" : 2}, {"code" : "MXV", "numericCode" : 979, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "MDL", "numericCode" : 498, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "MNT", "numericCode" : 496, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "XCD", "numericCode"
    : 951, "fractionDigits" : 2}, {"code" : "MAD", "numericCode" : 504, "fractionDigits" : 2}, {"code" : "MZN", "numericCode" : 943, "fractionDigits" : 2}, {"code" : "MMK", "numericCode" : 104, "fractionDigits" : 2}, {"code" : "NAD", "numericCode" : 516, "fractionDigits" : 2}, {"code" : "ZAR", "numericCode" : 710, "fractionDigits" : 2}, {"code" : "AUD", "numericCode" : 36, "fractionDigits" : 2}, {"code" : "NPR", "numericCode" : 524, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits"
    : 2}, {"code" : "XPF", "numericCode" : 953, "fractionDigits" : 0}, {"code" : "NZD", "numericCode" : 554, "fractionDigits" : 2}, {"code" : "NIO", "numericCode" : 558, "fractionDigits" : 2}, {"code" : "XOF", "numericCode" : 952, "fractionDigits" : 0}, {"code" : "NGN", "numericCode" : 566, "fractionDigits" : 2}, {"code" : "NZD", "numericCode" : 554, "fractionDigits" : 2}, {"code" : "AUD", "numericCode" : 36, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "NOK",
    "numericCode" : 578, "fractionDigits" : 2}, {"code" : "OMR", "numericCode" : 512, "fractionDigits" : 3}, {"code" : "PKR", "numericCode" : 586, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "PAB", "numericCode" : 590, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "PGK", "numericCode" : 598, "fractionDigits" : 2}, {"code" : "PYG", "numericCode" : 600, "fractionDigits" : 0}, {"code" : "PEN", "numericCode" : 604,
    "fractionDigits" : 2}, {"code" : "PHP", "numericCode" : 608, "fractionDigits" : 2}, {"code" : "NZD", "numericCode" : 554, "fractionDigits" : 2}, {"code" : "PLN", "numericCode" : 985, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "QAR", "numericCode" : 634, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "RON", "numericCode" : 946, "fractionDigits" : 2}
    , {"code" : "RUB", "numericCode" : 643, "fractionDigits" : 2}, {"code" : "RWF", "numericCode" : 646, "fractionDigits" : 0}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "SHP", "numericCode" : 654, "fractionDigits" : 2}, {"code" : "XCD", "numericCode" : 951, "fractionDigits" : 2}, {"code" : "XCD", "numericCode" : 951, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "XCD", "numericCode"
    : 951, "fractionDigits" : 2}, {"code" : "WST", "numericCode" : 882, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "STD", "numericCode" : 678, "fractionDigits" : 2}, {"code" : "SAR", "numericCode" : 682, "fractionDigits" : 2}, {"code" : "XOF", "numericCode" : 952, "fractionDigits" : 0}, {"code" : "RSD", "numericCode" : 941, "fractionDigits" : 2}, {"code" : "SCR", "numericCode" : 690, "fractionDigits" : 2}, {"code" : "SLL", "numericCode" : 694, "fractionDigits"
    : 2}, {"code" : "SGD", "numericCode" : 702, "fractionDigits" : 2}, {"code" : "ANG", "numericCode" : 532, "fractionDigits" : 2}, {"code" : "XSU", "numericCode" : 994, "fractionDigits" : -1}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "SBD", "numericCode" : 90, "fractionDigits" : 2}, {"code" : "SOS", "numericCode" : 706, "fractionDigits" : 2}, {"code" : "ZAR", "numericCode" : 710, "fractionDigits" : 2}, {"code" : "SSP",
    "numericCode" : 728, "fractionDigits" : 2}, {"code" : "EUR", "numericCode" : 978, "fractionDigits" : 2}, {"code" : "LKR", "numericCode" : 144, "fractionDigits" : 2}, {"code" : "SDG", "numericCode" : 938, "fractionDigits" : 2}, {"code" : "SRD", "numericCode" : 968, "fractionDigits" : 2}, {"code" : "NOK", "numericCode" : 578, "fractionDigits" : 2}, {"code" : "SZL", "numericCode" : 748, "fractionDigits" : 2}, {"code" : "SEK", "numericCode" : 752, "fractionDigits" : 2}, {"code" : "CHE", "numericCode" : 947,
    "fractionDigits" : 2}, {"code" : "CHF", "numericCode" : 756, "fractionDigits" : 2}, {"code" : "CHW", "numericCode" : 948, "fractionDigits" : 2}, {"code" : "SYP", "numericCode" : 760, "fractionDigits" : 2}, {"code" : "TWD", "numericCode" : 901, "fractionDigits" : 2}, {"code" : "TJS", "numericCode" : 972, "fractionDigits" : 2}, {"code" : "TZS", "numericCode" : 834, "fractionDigits" : 2}, {"code" : "THB", "numericCode" : 764, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}
    , {"code" : "XOF", "numericCode" : 952, "fractionDigits" : 0}, {"code" : "NZD", "numericCode" : 554, "fractionDigits" : 2}, {"code" : "TOP", "numericCode" : 776, "fractionDigits" : 2}, {"code" : "TTD", "numericCode" : 780, "fractionDigits" : 2}, {"code" : "TND", "numericCode" : 788, "fractionDigits" : 3}, {"code" : "TRY", "numericCode" : 949, "fractionDigits" : 2}, {"code" : "TMT", "numericCode" : 934, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "AUD", "numericCode"
    : 36, "fractionDigits" : 2}, {"code" : "UGX", "numericCode" : 800, "fractionDigits" : 0}, {"code" : "UAH", "numericCode" : 980, "fractionDigits" : 2}, {"code" : "AED", "numericCode" : 784, "fractionDigits" : 2}, {"code" : "GBP", "numericCode" : 826, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "USN", "numericCode" : 997, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "UYI", "numericCode" : 940, "fractionDigits"
    : 0}, {"code" : "UYU", "numericCode" : 858, "fractionDigits" : 2}, {"code" : "UZS", "numericCode" : 860, "fractionDigits" : 2}, {"code" : "VUV", "numericCode" : 548, "fractionDigits" : 0}, {"code" : "VEF", "numericCode" : 937, "fractionDigits" : 2}, {"code" : "VND", "numericCode" : 704, "fractionDigits" : 0}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "USD", "numericCode" : 840, "fractionDigits" : 2}, {"code" : "XPF", "numericCode" : 953, "fractionDigits" : 0}, {"code" : "MAD",
    "numericCode" : 504, "fractionDigits" : 2}, {"code" : "YER", "numericCode" : 886, "fractionDigits" : 2}, {"code" : "ZMW", "numericCode" : 967, "fractionDigits" : 2}, {"code" : "ZWL", "numericCode" : 932, "fractionDigits" : 2}, {"code" : "XBA", "numericCode" : 955, "fractionDigits" : -1}, {"code" : "XBB", "numericCode" : 956, "fractionDigits" : -1}, {"code" : "XBC", "numericCode" : 957, "fractionDigits" : -1}, {"code" : "XBD", "numericCode" : 958, "fractionDigits" : -1}, {"code" : "XTS", "numericCode" : 963,
    "fractionDigits" : -1}, {"code" : "XXX", "numericCode" : 999, "fractionDigits" : -1}, {"code" : "XAU", "numericCode" : 959, "fractionDigits" : -1}, {"code" : "XPD", "numericCode" : 964, "fractionDigits" : -1}, {"code" : "XPT", "numericCode" : 962, "fractionDigits" : -1}, {"code" : "XAG", "numericCode" : 961, "fractionDigits" : -1}];
},
otcic_CurrencyHelper_getCountryToCurrencyMap$$create = () => {
    return {"AF": {"value" : "AFN"}, "AL": {"value" : "ALL"}, "DZ": {"value" : "DZD"}, "AD": {"value" : "EUR"}, "AO": {"value" : "AOA"}, "AG": {"value" : "XCD"}, "AR": {"value" : "ARS"}, "AM": {"value" : "AMD"}, "AU": {"value" : ""}, "AT": {"value" : "EUR"}, "AZ": {"value" : "AMD"}, "-241": {"value" : "Nassau"}, "BH": {"value" : "BHD"}, "BD": {"value" : "BDT"}, "BB": {"value" : "BBD"}, "BY": {"value" : "BYR"}, "BE": {"value" : "EUR"}, "BZ": {"value" : "BZD"}, "BJ": {"value" : "XOF"}, "BT": {"value" : "BTN"}
    , "BO": {"value" : "BOB"}, "BA": {"value" : "BAM"}, "BW": {"value" : "BWP"}, "BR": {"value" : "BRL"}, "BN": {"value" : "BND"}, "BG": {"value" : "BGN"}, "BF": {"value" : "XOF"}, "BI": {"value" : "BIF"}, "KH": {"value" : "KHR"}, "CM": {"value" : "XAF"}, "CA": {"value" : "CAD"}, "CV": {"value" : "CVE"}, "CF": {"value" : "XAF"}, "TD": {"value" : "XAF"}, "CL": {"value" : "CLP"}, "86": {"value" : "Beijing"}, "CO": {"value" : "COP"}, "KM": {"value" : "KMF"}, "243": {"value" : "Kinshasa"}, "242": {"value" : "Brazzaville"}
    , "CR": {"value" : "CRC"}, "CI": {"value" : "XOF"}, "HR": {"value" : "HRK"}, "CU": {"value" : "CUP"}, "CY": {"value" : "TRY"}, "CZ": {"value" : "CZK"}, "DK": {"value" : "DKK"}, "DJ": {"value" : "DJF"}, "DM": {"value" : "XCD"}, "DO": {"value" : "DOP"}, "EC": {"value" : "USD"}, "EG": {"value" : "EGP"}, "SV": {"value" : "USD"}, "GQ": {"value" : "XAF"}, "ER": {"value" : "ERN"}, "EE": {"value" : "EEK"}, "ET": {"value" : "ETB"}, "FJ": {"value" : "FJD"}, "FI": {"value" : "EUR"}, "FR": {"value" : "EUR"}, "GA": {"value"
    : "XAF"}, "220": {"value" : "Banjul"}, "GE": {"value" : "RUB and GEL"}, "DE": {"value" : "EUR"}, "GH": {"value" : "GHC"}, "GR": {"value" : "EUR"}, "GD": {"value" : "XCD"}, "GT": {"value" : "GTQ"}, "GN": {"value" : "GNF"}, "GW": {"value" : "XOF"}, "GY": {"value" : "GYD"}, "HT": {"value" : "HTG"}, "HN": {"value" : "HNL"}, "HU": {"value" : "HUF"}, "IS": {"value" : "ISK"}, "IN": {"value" : "INR"}, "ID": {"value" : "IDR"}, "IR": {"value" : "IRR"}, "IQ": {"value" : "IQD"}, "IE": {"value" : "EUR"}, "IL": {"value"
    : "ILS"}, "IT": {"value" : "EUR"}, "JM": {"value" : "JMD"}, "JP": {"value" : "JPY"}, "JO": {"value" : "JOD"}, "KZ": {"value" : "KZT"}, "KE": {"value" : "KES"}, "KI": {"value" : "AUD"}, "850": {"value" : "Pyongyang"}, "82": {"value" : "Seoul"}, "KW": {"value" : "KWD"}, "KG": {"value" : "KGS"}, "LA": {"value" : "LAK"}, "LV": {"value" : "LVL"}, "LB": {"value" : "LBP"}, "LS": {"value" : "LSL"}, "LR": {"value" : "LRD"}, "LY": {"value" : "LYD"}, "LI": {"value" : "CHF"}, "LT": {"value" : "LTL"}, "LU": {"value"
    : "EUR"}, "MK": {"value" : "MKD"}, "MG": {"value" : "MGA"}, "MW": {"value" : "MWK"}, "MY": {"value" : "MYR"}, "MV": {"value" : "MVR"}, "ML": {"value" : "XOF"}, "MT": {"value" : "MTL"}, "MH": {"value" : "USD"}, "MR": {"value" : "MRO"}, "MU": {"value" : "MUR"}, "MX": {"value" : "MXN"}, "FM": {"value" : "USD"}, "MD": {"value" : ""}, "MC": {"value" : "EUR"}, "MN": {"value" : "MNT"}, "ME": {"value" : "EUR"}, "MA": {"value" : "MAD"}, "MZ": {"value" : "MZM"}, "MM": {"value" : "MMK"}, "NA": {"value" : "NAD"}, "NR":
    {"value" : "AUD"}, "NP": {"value" : "NPR"}, "NL": {"value" : "EUR"}, "NZ": {"value" : "NZD"}, "NI": {"value" : "NIO"}, "NE": {"value" : "XOF"}, "NG": {"value" : "NGN"}, "NO": {"value" : "NOK"}, "OM": {"value" : "OMR"}, "PK": {"value" : "PKR"}, "PW": {"value" : "USD"}, "PA": {"value" : "PAB"}, "PG": {"value" : "PGK"}, "PY": {"value" : "PYG"}, "PE": {"value" : "PEN"}, "PH": {"value" : "PHP"}, "PL": {"value" : "PLN"}, "PT": {"value" : "EUR"}, "QA": {"value" : "QAR"}, "RO": {"value" : "RON"}, "RU": {"value"
    : "RUB"}, "RW": {"value" : "RWF"}, "KN": {"value" : "XCD"}, "LC": {"value" : "XCD"}, "VC": {"value" : "XCD"}, "WS": {"value" : "WST"}, "SM": {"value" : "EUR"}, "ST": {"value" : "STD"}, "SA": {"value" : "SAR"}, "SN": {"value" : "XOF"}, "RS": {"value" : "RSD"}, "SC": {"value" : "SCR"}, "SL": {"value" : "SLL"}, "SG": {"value" : "SGD"}, "SK": {"value" : "SKK"}, "SI": {"value" : "EUR"}, "SB": {"value" : "SBD"}, "SO": {"value" : ""}, "27": {"value" : ""}, "ES": {"value" : "EUR"}, "LK": {"value" : "LKR"}, "SD":
    {"value" : "SDD"}, "SR": {"value" : "SRD"}, "SZ": {"value" : "SZL"}, "SE": {"value" : "SEK"}, "CH": {"value" : "CHF"}, "SY": {"value" : "SYP"}, "TJ": {"value" : "TJS"}, "TZ": {"value" : "TZS"}, "TH": {"value" : "THB"}, "TL": {"value" : "USD"}, "TG": {"value" : "XOF"}, "TO": {"value" : "TOP"}, "TT": {"value" : "TTD"}, "TN": {"value" : "TND"}, "TR": {"value" : "TRY"}, "TM": {"value" : "TMM"}, "TV": {"value" : "AUD"}, "UG": {"value" : "UGX"}, "UA": {"value" : "UAH"}, "AE": {"value" : "AED"}, "GB": {"value"
    : "GBP"}, "US": {"value" : "USD"}, "UY": {"value" : "UYU"}, "UZ": {"value" : "UZS"}, "VU": {"value" : "VUV"}, "VA": {"value" : "EUR"}, "VE": {"value" : "VEB"}, "VN": {"value" : "VND"}, "YE": {"value" : "YER"}, "ZM": {"value" : "ZMK"}, "ZW": {"value" : "ZWD"}, "886": {"value" : "Taipei"}, "CX": {"value" : "AUD"}, "CC": {"value" : "AUD"}, "HM": {"value" : ""}, "NF": {"value" : "AUD"}, "NC": {"value" : "XPF"}, "PF": {"value" : ""}, "YT": {"value" : "EUR"}, "GP": {"value" : "EUR"}, "PM": {"value" : "EUR"}, "WF":
    {"value" : "XPF"}, "TF": {"value" : ""}, "BV": {"value" : ""}, "CK": {"value" : "NZD"}, "NU": {"value" : "NZD"}, "TK": {"value" : "NZD"}, "GG": {"value" : "GGP"}, "IM": {"value" : "IMP"}, "JE": {"value" : "JEP"}, "AI": {"value" : "XCD"}, "BM": {"value" : "BMD"}, "IO": {"value" : ""}, "": {"value" : "CYP"}, "VG": {"value" : "USD"}, "KY": {"value" : "KYD"}, "FK": {"value" : "FKP"}, "GI": {"value" : "GIP"}, "MS": {"value" : "XCD"}, "PN": {"value" : "NZD"}, "SH": {"value" : "SHP"}, "GS": {"value" : ""}, "TC":
    {"value" : "USD"}, "MP": {"value" : "USD"}, "PR": {"value" : "USD"}, "AS": {"value" : "USD"}, "UM": {"value" : ""}, "GU": {"value" : "USD"}, "VI": {"value" : "USD"}, "HK": {"value" : "HKD"}, "MO": {"value" : "MOP"}, "FO": {"value" : "DKK"}, "GL": {"value" : "DKK"}, "GF": {"value" : "EUR"}, "MQ": {"value" : "EUR"}, "RE": {"value" : "EUR"}, "AX": {"value" : "EUR"}, "AW": {"value" : "AWG"}, "AN": {"value" : "ANG"}, "SJ": {"value" : "NOK"}, "AC": {"value" : "SHP"}, "TA": {"value" : "SHP"}, "AQ": {"value" : ""}
    };
},
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_String$_clinit_$lambda$_118_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jl_String$_clinit_$lambda$_118_0__init_0 = () => {
    let var_0 = new jl_String$_clinit_$lambda$_118_0();
    jl_String$_clinit_$lambda$_118_0__init_(var_0);
    return var_0;
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name4 = null;
    a.$ordinal0 = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    jl_Object__init_($this);
    $this.$name4 = $name;
    $this.$ordinal0 = $ordinal;
},
jl_Enum_ordinal = $this => {
    return $this.$ordinal0;
},
nmnph_ClientIntent = $rt_classWithoutFields(jl_Enum),
nmnph_ClientIntent_a = null,
nmnph_ClientIntent_b = null,
nmnph_ClientIntent_c = null,
nmnph_ClientIntent_d = 1,
nmnph_ClientIntent_e = 2,
nmnph_ClientIntent_f = 3,
nmnph_ClientIntent_g = null,
nmnph_ClientIntent_$callClinit = () => {
    nmnph_ClientIntent_$callClinit = $rt_eraseClinit(nmnph_ClientIntent);
    nmnph_ClientIntent__clinit_();
},
nmnph_ClientIntent__clinit_ = () => {
    aii_a = aii__init_($rt_s(22), 0);
    aii_b = aii__init_($rt_s(16), 1);
    aii_c = aii__init_($rt_s(23), 2);
    aii_g = aii_b0();
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append3 = ($this, $obj) => {
    return $this.$insert($this.$length0, $obj);
},
jl_AbstractStringBuilder_append = ($this, $string) => {
    return $this.$insert0($this.$length0, $string);
},
jl_AbstractStringBuilder_insert = ($this, $index, $string) => {
    let $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(24);
        else if ($string.$isEmpty())
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$length() | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$length() | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$length() | 0;
        $i = 0;
        while ($i < $string.$length()) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = $string.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append2 = ($this, $value) => {
    return $this.$append1($value, 10);
},
jl_AbstractStringBuilder_append6 = ($this, $value, $radix) => {
    return $this.$insert1($this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert5 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if ($rt_ucmp(var$10, $value) > 0) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if ($rt_ucmp(var$10, $posLimit) > 0)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$11 = $target;
            else {
                var$5 = $this.$buffer.data;
                var$11 = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                var$6 = var$11 + 1 | 0;
                var$5[var$11] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                var$11 = var$6;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append1 = ($this, $value) => {
    return $this.$insert2($this.$length0, $value);
},
jl_AbstractStringBuilder_insert3 = ($this, $target, $value) => {
    return $this.$insert3($target, $value, 10);
},
jl_AbstractStringBuilder_insert4 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, var$7, $sz, $pos, $posLimit, var$11, var$12;
    $positive = 1;
    if (Long_lt($value, Long_ZERO)) {
        $positive = 0;
        $value = Long_neg($value);
    }
    a: {
        var$5 = Long_fromInt($radix);
        if (jl_Long_compareUnsigned($value, var$5) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$6 = $this.$buffer.data;
                var$7 = $target + 1 | 0;
                var$6[$target] = 45;
                $target = var$7;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit(Long_lo($value), $radix);
        } else {
            $sz = 1;
            $pos = Long_fromInt(1);
            $posLimit = jl_Long_divideUnsigned(Long_fromInt(-1), var$5);
            b: {
                while (true) {
                    var$11 = Long_mul($pos, var$5);
                    if (jl_Long_compareUnsigned(var$11, $value) > 0) {
                        var$11 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if (jl_Long_compareUnsigned(var$11, $posLimit) > 0)
                        break;
                    $pos = var$11;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$12 = $target;
            else {
                var$6 = $this.$buffer.data;
                var$12 = $target + 1 | 0;
                var$6[$target] = 45;
            }
            while (true) {
                if (Long_eq(var$11, Long_ZERO))
                    break a;
                var$6 = $this.$buffer.data;
                var$7 = var$12 + 1 | 0;
                var$6[var$12] = jl_Character_forDigit(Long_lo((jl_Long_divideUnsigned($value, var$11))), $radix);
                $value = jl_Long_remainderUnsigned($value, var$11);
                var$11 = jl_Long_divideUnsigned(var$11, var$5);
                var$12 = var$7;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append0 = ($this, $c) => {
    return $this.$insert4($this.$length0, $c);
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_insert1 = ($this, $index, $obj) => {
    return $this.$insert0($index, $obj === null ? $rt_s(24) : $obj.$toString());
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let $newLength;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf0($this.$buffer, $newLength);
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_4($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_length = $this => {
    return $this.$length0;
},
jl_AbstractStringBuilder_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$length0)
        return $this.$buffer.data[$index];
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append4 = ($this, $s, $start, $end) => {
    return $this.$insert5($this.$length0, $s, $start, $end);
},
jl_AbstractStringBuilder_insert2 = ($this, $index, $s, $i, $end) => {
    let var$5, var$6;
    if ($i <= $end && $end <= $s.$length() && $i >= 0) {
        jl_AbstractStringBuilder_insertSpace($this, $index, ($index + $end | 0) - $i | 0);
        while ($i < $end) {
            var$5 = $this.$buffer.data;
            var$6 = $index + 1 | 0;
            var$5[$index] = $s.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$6;
        }
        return $this;
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append5 = ($this, $s) => {
    return $this.$append5($s, 0, $s.$length());
},
jl_AbstractStringBuilder_subSequence = ($this, $start, $end) => {
    return $this.$substring0($start, $end);
},
jl_AbstractStringBuilder_setLength = ($this, $newLength) => {
    $this.$length0 = $newLength;
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_AbstractStringBuilder_substring = ($this, $from, $to) => {
    if ($from <= $to && $from >= 0 && $to <= $this.$length0)
        return jl_String__init_4($this.$buffer, $from, $to - $from | 0);
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_1 = ($this, $capacity) => {
    jl_AbstractStringBuilder__init_($this, $capacity);
},
jl_StringBuilder__init_2 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_1(var_1, var_0);
    return var_1;
},
jl_StringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
},
jl_StringBuilder_append = ($this, $obj) => {
    jl_AbstractStringBuilder_append3($this, $obj);
    return $this;
},
jl_StringBuilder_append2 = ($this, $string) => {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
},
jl_StringBuilder_append0 = ($this, $value) => {
    jl_AbstractStringBuilder_append2($this, $value);
    return $this;
},
jl_StringBuilder_append4 = ($this, $value) => {
    jl_AbstractStringBuilder_append1($this, $value);
    return $this;
},
jl_StringBuilder_append1 = ($this, $c) => {
    jl_AbstractStringBuilder_append0($this, $c);
    return $this;
},
jl_StringBuilder_append5 = ($this, $s, $start, $end) => {
    jl_AbstractStringBuilder_append4($this, $s, $start, $end);
    return $this;
},
jl_StringBuilder_append3 = ($this, $s) => {
    jl_AbstractStringBuilder_append5($this, $s);
    return $this;
},
jl_StringBuilder_insert1 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert3($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert2 = ($this, $index, $s, $start, $end) => {
    jl_AbstractStringBuilder_insert2($this, $index, $s, $start, $end);
    return $this;
},
jl_StringBuilder_insert6 = ($this, $index, $obj) => {
    jl_AbstractStringBuilder_insert1($this, $index, $obj);
    return $this;
},
jl_StringBuilder_insert3 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert0($this, $index, $c);
    return $this;
},
jl_StringBuilder_insert7 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
},
jl_StringBuilder_substring = ($this, var$1, var$2) => {
    return jl_AbstractStringBuilder_substring($this, var$1, var$2);
},
jl_StringBuilder_setLength = ($this, var$1) => {
    jl_AbstractStringBuilder_setLength($this, var$1);
},
jl_StringBuilder_subSequence = ($this, var$1, var$2) => {
    return jl_AbstractStringBuilder_subSequence($this, var$1, var$2);
},
jl_StringBuilder_insert4 = ($this, var$1, var$2, var$3, var$4) => {
    return $this.$insert6(var$1, var$2, var$3, var$4);
},
jl_StringBuilder_append6 = ($this, var$1, var$2, var$3) => {
    return $this.$append12(var$1, var$2, var$3);
};
let jl_StringBuilder_charAt = ($this, var$1) => {
    return jl_AbstractStringBuilder_charAt($this, var$1);
},
jl_StringBuilder_length = $this => {
    return jl_AbstractStringBuilder_length($this);
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    return $this.$insert7(var$1, var$2);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    return $this.$insert8(var$1, var$2);
},
jl_StringBuilder_insert5 = ($this, var$1, var$2) => {
    return $this.$insert9(var$1, var$2);
},
jl_StringBuilder_insert8 = ($this, var$1, var$2) => {
    return $this.$insert10(var$1, var$2);
},
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException),
ju_ConcurrentModificationException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
ju_ConcurrentModificationException__init_0 = () => {
    let var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_(var_0);
    return var_0;
};
function ju_Currency() {
    jl_Object.call(this);
    this.$resource = null;
}
let ju_Currency_currencies = null,
ju_Currency__init_0 = ($this, $resource) => {
    jl_Object__init_($this);
    $this.$resource = $resource;
},
ju_Currency__init_ = var_0 => {
    let var_1 = new ju_Currency();
    ju_Currency__init_0(var_1, var_0);
    return var_1;
},
ju_Currency_initCurrencies = () => {
    let $resources, $i, $resource;
    if (ju_Currency_currencies !== null)
        return;
    ju_Currency_currencies = ju_HashMap__init_2();
    $resources = otcic_CurrencyHelper_getCurrencies();
    $i = 0;
    while ($i < $resources.length) {
        $resource = $resources[$i];
        ju_Currency_currencies.$put(($resource.code !== null ? $rt_str($resource.code) : null), ju_Currency__init_($resource));
        $i = $i + 1 | 0;
    }
},
ju_Currency_getInstance0 = $currencyCode => {
    let $currency, var$3, var$4;
    if ($currencyCode === null)
        $rt_throw(jl_NullPointerException__init_());
    ju_Currency_initCurrencies();
    $currency = ju_Currency_currencies.$get($currencyCode);
    if ($currency !== null)
        return $currency;
    var$3 = new jl_IllegalArgumentException;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(25)), $currencyCode);
    jl_IllegalArgumentException__init_(var$3, jl_StringBuilder_toString(var$4));
    $rt_throw(var$3);
},
ju_Currency_getInstance = $locale => {
    let $coutry, $countryMap, var$4;
    if ($locale === null)
        $rt_throw(jl_NullPointerException__init_());
    $coutry = otciu_CLDRHelper_resolveCountry(ju_Locale_getLanguage($locale), ju_Locale_getCountry($locale));
    $countryMap = otcic_CurrencyHelper_getCountryToCurrencyMap();
    if (!$countryMap.hasOwnProperty($rt_ustr($coutry)))
        return null;
    var$4 = ($countryMap[$rt_ustr($coutry)].value !== null ? $rt_str($countryMap[$rt_ustr($coutry)].value) : null);
    return ju_Currency_getInstance0(var$4);
},
ju_Currency_getCurrencyCode = $this => {
    return ($this.$resource.code !== null ? $rt_str($this.$resource.code) : null);
},
ju_Currency_getSymbol = ($this, $locale) => {
    let var$2, var$3, var$4, $localization;
    var$2 = ju_Locale_getLanguage($locale);
    var$3 = ju_Locale_getCountry($locale);
    var$4 = ju_Currency_getCurrencyCode($this);
    $localization = otciu_CLDRHelper_resolveCurrency(var$2, var$3, var$4);
    return $localization !== null && !($localization.symbol !== null ? $rt_str($localization.symbol) : null).$isEmpty() ? ($localization.symbol !== null ? $rt_str($localization.symbol) : null) : ju_Currency_getCurrencyCode($this);
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_AccessibleObject = $rt_classWithoutFields(),
jlr_AccessibleObject__init_ = $this => {
    jl_Object__init_($this);
},
jlr_AccessibleObject__init_0 = () => {
    let var_0 = new jlr_AccessibleObject();
    jlr_AccessibleObject__init_(var_0);
    return var_0;
},
jlr_AccessibleObject_setAccessible = ($this, $flag) => {
    return;
};
function jlr_Constructor() {
    let a = this; jlr_AccessibleObject.call(a);
    a.$declaringClass0 = null;
    a.$name3 = null;
    a.$modifiers0 = 0;
    a.$accessLevel1 = 0;
    a.$parameterTypes = null;
    a.$caller0 = null;
}
let jlr_Constructor__init_ = ($this, $declaringClass, $name, $modifiers, $accessLevel, $parameterTypes, $caller) => {
    jlr_AccessibleObject__init_($this);
    $this.$declaringClass0 = $declaringClass;
    $this.$name3 = $name;
    $this.$modifiers0 = $modifiers;
    $this.$accessLevel1 = $accessLevel;
    $this.$parameterTypes = $parameterTypes;
    $this.$caller0 = $caller;
},
jlr_Constructor__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new jlr_Constructor();
    jlr_Constructor__init_(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
jlr_Constructor_getModifiers = $this => {
    return otcir_Flags_getModifiers($this.$modifiers0, $this.$accessLevel1);
},
jlr_Constructor_getParameterTypes = $this => {
    return $this.$parameterTypes.$clone0();
},
jlr_Constructor_getParameterCount = $this => {
    return $this.$parameterTypes.data.length;
},
jlr_Constructor_newInstance = ($this, $initargs) => {
    let var$2, var$3, $i, $instance, var$6, var$7;
    if ($this.$modifiers0 & 1)
        $rt_throw(jl_InstantiationException__init_0());
    if ($this.$caller0 === null)
        $rt_throw(jl_IllegalAccessException__init_());
    var$2 = $initargs.data;
    var$3 = var$2.length;
    if (var$3 != $this.$parameterTypes.data.length)
        $rt_throw(jl_IllegalArgumentException__init_0());
    $i = 0;
    while (true) {
        if ($i >= var$3) {
            $instance = new ($this.$declaringClass0.$platformClass);
            $this.$caller0.$call($instance, $initargs);
            return $instance;
        }
        if (!jl_Class_isPrimitive($this.$parameterTypes.data[$i]) && var$2[$i] !== null) {
            var$6 = $this.$parameterTypes.data[$i];
            var$7 = var$2[$i];
            if (!jl_Class_isInstance(var$6, var$7))
                $rt_throw(jl_IllegalArgumentException__init_0());
        }
        if (jl_Class_isPrimitive($this.$parameterTypes.data[$i]) && var$2[$i] === null)
            break;
        $i = $i + 1 | 0;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
},
nms_SoundEvent_STONE_FALL = $rt_classWithoutFields(0),
jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuffer__init_ = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuffer__init_0 = () => {
    let var_0 = new jl_StringBuffer();
    jl_StringBuffer__init_(var_0);
    return var_0;
},
jl_StringBuffer_append0 = ($this, $string) => {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
},
jl_StringBuffer_append = ($this, $c) => {
    jl_AbstractStringBuilder_append0($this, $c);
    return $this;
},
jl_StringBuffer_insert1 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert0($this, $index, $c);
    return $this;
},
jl_StringBuffer_insert2 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
},
jl_StringBuffer_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuffer_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuffer_insert0 = ($this, var$1, var$2) => {
    return $this.$insert11(var$1, var$2);
},
jl_StringBuffer_insert = ($this, var$1, var$2) => {
    return $this.$insert12(var$1, var$2);
},
ji_Flushable = $rt_classWithoutFields(0),
otcir_FieldWriter = $rt_classWithoutFields(0),
otcir_FieldWriter_forJs = $setter => {
    if ($setter === null)
        return null;
    return otcir_FieldWriter$forJs$lambda$_1_0__init_0($setter);
};
function otcir_FieldWriter$forJs$lambda$_1_0() {
    jl_Object.call(this);
    this.$_04 = null;
}
let otcir_FieldWriter$forJs$lambda$_1_0__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$_04 = var$1;
},
otcir_FieldWriter$forJs$lambda$_1_0__init_0 = var_0 => {
    let var_1 = new otcir_FieldWriter$forJs$lambda$_1_0();
    otcir_FieldWriter$forJs$lambda$_1_0__init_(var_1, var_0);
    return var_1;
},
otcir_MethodCaller = $rt_classWithoutFields(0),
otcir_MethodCaller_forJs = $callable => {
    if ($callable === null)
        return null;
    return otcir_MethodCaller$forJs$lambda$_1_0__init_0($callable);
},
otcir_MethodCaller_lambda$forJs$0 = ($callable, $instance, $args) => {
    let $jsArgs, var$5, $result;
    $jsArgs = $args.data;
    var$5 = $instance;
    $result = $callable.call(var$5, $jsArgs);
    return $result;
};
function otcir_MethodCaller$forJs$lambda$_1_0() {
    jl_Object.call(this);
    this.$_01 = null;
}
let otcir_MethodCaller$forJs$lambda$_1_0__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$_01 = var$1;
},
otcir_MethodCaller$forJs$lambda$_1_0__init_0 = var_0 => {
    let var_1 = new otcir_MethodCaller$forJs$lambda$_1_0();
    otcir_MethodCaller$forJs$lambda$_1_0__init_(var_1, var_0);
    return var_1;
},
otcir_MethodCaller$forJs$lambda$_1_0_call = (var$0, var$1, var$2) => {
    return otcir_MethodCaller_lambda$forJs$0(var$0.$_01, var$1, var$2);
},
ji_IOException = $rt_classWithoutFields(jl_Exception);
function jlr_Field() {
    let a = this; jlr_AccessibleObject.call(a);
    a.$declaringClass1 = null;
    a.$name0 = null;
    a.$modifiers = 0;
    a.$accessLevel0 = 0;
    a.$type = null;
    a.$getter = null;
    a.$setter = null;
}
let jlr_Field__init_ = ($this, $declaringClass, $name, $modifiers, $accessLevel, $type, $getter, $setter) => {
    jlr_AccessibleObject__init_($this);
    $this.$declaringClass1 = $declaringClass;
    $this.$name0 = $name;
    $this.$modifiers = $modifiers;
    $this.$accessLevel0 = $accessLevel;
    $this.$type = $type;
    $this.$getter = $getter;
    $this.$setter = $setter;
},
jlr_Field__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5, var_6) => {
    let var_7 = new jlr_Field();
    jlr_Field__init_(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
},
jlr_Field_getName = $this => {
    return $this.$name0;
},
jlr_Field_getModifiers = $this => {
    return otcir_Flags_getModifiers($this.$modifiers, $this.$accessLevel0);
},
jlr_Field_get = ($this, $obj) => {
    $this.$checkGetAccess();
    jlr_Field_checkInstance($this, $obj);
    return $this.$getWithoutCheck($obj);
},
jlr_Field_getWithoutCheck = ($this, $obj) => {
    return $this.$getter.$read($obj);
},
jlr_Field_checkInstance = ($this, $obj) => {
    if (!($this.$modifiers & 512)) {
        if ($obj === null)
            $rt_throw(jl_NullPointerException__init_());
        if (!jl_Class_isInstance($this.$declaringClass1, $obj))
            $rt_throw(jl_IllegalArgumentException__init_0());
    }
},
jlr_Field_checkGetAccess = $this => {
    if ($this.$getter !== null)
        return;
    $rt_throw(jl_IllegalAccessException__init_());
},
inu_ReferenceCounted = $rt_classWithoutFields(0),
ju_Iterator = $rt_classWithoutFields(0);
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index1 = 0;
    a.$modCount1 = 0;
    a.$size1 = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
let ju_AbstractList$1__init_ = ($this, $this$0) => {
    $this.$this$0 = $this$0;
    jl_Object__init_($this);
    $this.$modCount1 = $this.$this$0.$modCount;
    $this.$size1 = $this.$this$0.$size();
    $this.$removeIndex = (-1);
},
ju_AbstractList$1__init_0 = var_0 => {
    let var_1 = new ju_AbstractList$1();
    ju_AbstractList$1__init_(var_1, var_0);
    return var_1;
},
ju_AbstractList$1_hasNext = $this => {
    return $this.$index1 >= $this.$size1 ? 0 : 1;
},
ju_AbstractList$1_next = $this => {
    let var$1, var$2;
    ju_AbstractList$1_checkConcurrentModification($this);
    $this.$removeIndex = $this.$index1;
    var$1 = $this.$this$0;
    var$2 = $this.$index1;
    $this.$index1 = var$2 + 1 | 0;
    return var$1.$get0(var$2);
},
ju_AbstractList$1_checkConcurrentModification = $this => {
    if ($this.$modCount1 >= $this.$this$0.$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_0());
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = var$1 => {
    if (var$1 === null || var$1.constructor.$meta.item === 'undefined') {
        $rt_throw(jl_IllegalArgumentException__init_0());
    }
    return var$1.data.length;
},
jlr_Array_newInstance = (var$1, $length) => {
    if (var$1 === null)
        $rt_throw(jl_NullPointerException__init_());
    if (var$1 === $rt_cls($rt_voidcls))
        $rt_throw(jl_IllegalArgumentException__init_0());
    if ($length < 0)
        $rt_throw(jl_NegativeArraySizeException__init_0());
    return jlr_Array_newInstanceImpl(jl_Class_getPlatformClass(var$1), $length);
},
jlr_Array_newInstanceImpl = (var$1, var$2) => {
    if (var$1.$meta.primitive) {
        switch (var$1) {
        }
        ;
    }
    return $rt_createArray(var$1, var$2);
};
function otcit_DoubleAnalyzer$Result() {
    let a = this; jl_Object.call(a);
    a.$mantissa = Long_ZERO;
    a.$exponent = 0;
    a.$sign0 = 0;
}
let otcit_DoubleAnalyzer$Result__init_0 = $this => {
    jl_Object__init_($this);
},
otcit_DoubleAnalyzer$Result__init_ = () => {
    let var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_0(var_0);
    return var_0;
},
otcir_FieldReader = $rt_classWithoutFields(0),
otcir_FieldReader_forJs = $getter => {
    if ($getter === null)
        return null;
    return otcir_FieldReader$forJs$lambda$_1_0__init_0($getter);
},
otcir_FieldReader_lambda$forJs$0 = ($getter, $instance) => {
    let var$3, $result;
    var$3 = $instance;
    $result = $getter.get(var$3);
    return $result;
};
function otcir_FieldReader$forJs$lambda$_1_0() {
    jl_Object.call(this);
    this.$_02 = null;
}
let otcir_FieldReader$forJs$lambda$_1_0__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$_02 = var$1;
},
otcir_FieldReader$forJs$lambda$_1_0__init_0 = var_0 => {
    let var_1 = new otcir_FieldReader$forJs$lambda$_1_0();
    otcir_FieldReader$forJs$lambda$_1_0__init_(var_1, var_0);
    return var_1;
},
otcir_FieldReader$forJs$lambda$_1_0_read = (var$0, var$1) => {
    return otcir_FieldReader_lambda$forJs$0(var$0.$_02, var$1);
},
otpp_ResourceAccessor = $rt_classWithoutFields(),
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection__init_ = $this => {
    jl_Object__init_($this);
},
ju_AbstractCollection_toArray = ($this, $a) => {
    let var$2, $i, var$4, $iter;
    var$2 = $a.data;
    $i = $this.$size();
    var$4 = var$2.length;
    if (var$4 < $i)
        $a = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($a)), $i);
    else
        while ($i < var$4) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        var$2 = $a.data;
        var$4 = $i + 1 | 0;
        var$2[$i] = $iter.$next();
        $i = var$4;
    }
    return $a;
},
otci_IntegerUtil = $rt_classWithoutFields(),
otci_IntegerUtil_toUnsignedLogRadixString = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(26);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit(($value >>> $pos | 0) & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
},
otci_IntegerUtil_toUnsignedLogRadixString0 = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (Long_eq($value, Long_ZERO))
        return $rt_s(26);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((64 - jl_Long_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit(Long_lo(Long_shru($value, $pos)) & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
};
function juca_AtomicInteger() {
    let a = this; jl_Number.call(a);
    a.$value1 = 0;
    a.$version0 = 0;
}
let juca_AtomicInteger__init_ = ($this, $value) => {
    jl_Number__init_($this);
    $this.$value1 = $value;
},
juca_AtomicInteger__init_0 = var_0 => {
    let var_1 = new juca_AtomicInteger();
    juca_AtomicInteger__init_(var_1, var_0);
    return var_1;
},
juca_AtomicInteger_incrementAndGet = $this => {
    let var$1;
    $this.$version0 = $this.$version0 + 1 | 0;
    var$1 = $this.$value1 + 1 | 0;
    $this.$value1 = var$1;
    return var$1;
};
function ju_Locale() {
    let a = this; jl_Object.call(a);
    a.$countryCode = null;
    a.$languageCode = null;
    a.$variantCode = null;
}
let ju_Locale_defaultLocale = null,
ju_Locale_CANADA = null,
ju_Locale_CANADA_FRENCH = null,
ju_Locale_CHINA = null,
ju_Locale_CHINESE = null,
ju_Locale_ENGLISH = null,
ju_Locale_FRANCE = null,
ju_Locale_FRENCH = null,
ju_Locale_GERMAN = null,
ju_Locale_GERMANY = null,
ju_Locale_ITALIAN = null,
ju_Locale_ITALY = null,
ju_Locale_JAPAN = null,
ju_Locale_JAPANESE = null,
ju_Locale_KOREA = null,
ju_Locale_KOREAN = null,
ju_Locale_PRC = null,
ju_Locale_SIMPLIFIED_CHINESE = null,
ju_Locale_TAIWAN = null,
ju_Locale_TRADITIONAL_CHINESE = null,
ju_Locale_UK = null,
ju_Locale_US = null,
ju_Locale_ROOT = null,
ju_Locale_$callClinit = () => {
    ju_Locale_$callClinit = $rt_eraseClinit(ju_Locale);
    ju_Locale__clinit_();
},
ju_Locale__init_1 = ($this, $language, $country) => {
    ju_Locale_$callClinit();
    ju_Locale__init_0($this, $language, $country, $rt_s(1));
},
ju_Locale__init_ = (var_0, var_1) => {
    let var_2 = new ju_Locale();
    ju_Locale__init_1(var_2, var_0, var_1);
    return var_2;
},
ju_Locale__init_0 = ($this, $language, $country, $variant) => {
    ju_Locale_$callClinit();
    jl_Object__init_($this);
    if ($language !== null && $country !== null && $variant !== null) {
        if ($language.$isEmpty() && $country.$isEmpty()) {
            $this.$languageCode = $rt_s(1);
            $this.$countryCode = $rt_s(1);
            $this.$variantCode = $variant;
            return;
        }
        $this.$languageCode = $language;
        $this.$countryCode = $country;
        $this.$variantCode = $variant;
        return;
    }
    $rt_throw(jl_NullPointerException__init_());
},
ju_Locale__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new ju_Locale();
    ju_Locale__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
ju_Locale_getCountry = $this => {
    return $this.$countryCode;
},
ju_Locale_getDefault = () => {
    ju_Locale_$callClinit();
    return ju_Locale_defaultLocale;
},
ju_Locale_getLanguage = $this => {
    return $this.$languageCode;
},
ju_Locale__clinit_ = () => {
    let $localeName, $countryIndex;
    ju_Locale_CANADA = ju_Locale__init_($rt_s(27), $rt_s(28));
    ju_Locale_CANADA_FRENCH = ju_Locale__init_($rt_s(29), $rt_s(28));
    ju_Locale_CHINA = ju_Locale__init_($rt_s(30), $rt_s(31));
    ju_Locale_CHINESE = ju_Locale__init_($rt_s(30), $rt_s(1));
    ju_Locale_ENGLISH = ju_Locale__init_($rt_s(27), $rt_s(1));
    ju_Locale_FRANCE = ju_Locale__init_($rt_s(29), $rt_s(32));
    ju_Locale_FRENCH = ju_Locale__init_($rt_s(29), $rt_s(1));
    ju_Locale_GERMAN = ju_Locale__init_($rt_s(33), $rt_s(1));
    ju_Locale_GERMANY = ju_Locale__init_($rt_s(33), $rt_s(34));
    ju_Locale_ITALIAN = ju_Locale__init_($rt_s(35), $rt_s(1));
    ju_Locale_ITALY = ju_Locale__init_($rt_s(35), $rt_s(36));
    ju_Locale_JAPAN = ju_Locale__init_($rt_s(37), $rt_s(38));
    ju_Locale_JAPANESE = ju_Locale__init_($rt_s(37), $rt_s(1));
    ju_Locale_KOREA = ju_Locale__init_($rt_s(39), $rt_s(40));
    ju_Locale_KOREAN = ju_Locale__init_($rt_s(39), $rt_s(1));
    ju_Locale_PRC = ju_Locale__init_($rt_s(30), $rt_s(31));
    ju_Locale_SIMPLIFIED_CHINESE = ju_Locale__init_($rt_s(30), $rt_s(31));
    ju_Locale_TAIWAN = ju_Locale__init_($rt_s(30), $rt_s(41));
    ju_Locale_TRADITIONAL_CHINESE = ju_Locale__init_($rt_s(30), $rt_s(41));
    ju_Locale_UK = ju_Locale__init_($rt_s(27), $rt_s(42));
    ju_Locale_US = ju_Locale__init_($rt_s(27), $rt_s(43));
    ju_Locale_ROOT = ju_Locale__init_($rt_s(1), $rt_s(1));
    $localeName = ((otciu_CLDRHelper_getDefaultLocale()).value !== null ? $rt_str((otciu_CLDRHelper_getDefaultLocale()).value) : null);
    $countryIndex = $localeName.$indexOf(95);
    ju_Locale_defaultLocale = ju_Locale__init_2($localeName.$substring0(0, $countryIndex), $localeName.$substring($countryIndex + 1 | 0), $rt_s(1));
},
jl_Short = $rt_classWithoutFields(jl_Number),
jl_Short_TYPE = null,
jl_Short_$callClinit = () => {
    jl_Short_$callClinit = $rt_eraseClinit(jl_Short);
    jl_Short__clinit_();
},
jl_Short__clinit_ = () => {
    jl_Short_TYPE = $rt_cls($rt_shortcls);
},
jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0),
jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields(),
jl_DefaultUncaughtExceptionHandler__init_ = $this => {
    jl_Object__init_($this);
},
jl_DefaultUncaughtExceptionHandler__init_0 = () => {
    let var_0 = new jl_DefaultUncaughtExceptionHandler();
    jl_DefaultUncaughtExceptionHandler__init_(var_0);
    return var_0;
},
jl_InstantiationException = $rt_classWithoutFields(jl_ReflectiveOperationException),
jl_InstantiationException__init_ = $this => {
    jl_ReflectiveOperationException__init_($this);
},
jl_InstantiationException__init_0 = () => {
    let var_0 = new jl_InstantiationException();
    jl_InstantiationException__init_(var_0);
    return var_0;
},
otcir_FieldInfo = $rt_classWithoutFields(),
jt_DecimalFormat$1 = $rt_classWithoutFields(),
jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode = null,
jt_DecimalFormat$1_$callClinit = () => {
    jt_DecimalFormat$1_$callClinit = $rt_eraseClinit(jt_DecimalFormat$1);
    jt_DecimalFormat$1__clinit_();
},
jt_DecimalFormat$1__clinit_ = () => {
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode = $rt_createIntArray((jm_RoundingMode_values()).data.length);
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal(jm_RoundingMode_CEILING)] = 1;
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal(jm_RoundingMode_FLOOR)] = 2;
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal(jm_RoundingMode_UP)] = 3;
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal(jm_RoundingMode_DOWN)] = 4;
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal(jm_RoundingMode_UNNECESSARY)] = 5;
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal(jm_RoundingMode_HALF_DOWN)] = 6;
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal(jm_RoundingMode_HALF_UP)] = 7;
    jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal(jm_RoundingMode_HALF_EVEN)] = 8;
};
function jlr_Method() {
    let a = this; jlr_AccessibleObject.call(a);
    a.$declaringClass = null;
    a.$name1 = null;
    a.$flags0 = 0;
    a.$accessLevel = 0;
    a.$returnType = null;
    a.$parameterTypes0 = null;
    a.$caller = null;
}
let jlr_Method__init_ = ($this, $declaringClass, $name, $flags, $accessLevel, $returnType, $parameterTypes, $caller) => {
    jlr_AccessibleObject__init_($this);
    $this.$declaringClass = $declaringClass;
    $this.$name1 = $name;
    $this.$flags0 = $flags;
    $this.$accessLevel = $accessLevel;
    $this.$returnType = $returnType;
    $this.$parameterTypes0 = $parameterTypes;
    $this.$caller = $caller;
},
jlr_Method__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5, var_6) => {
    let var_7 = new jlr_Method();
    jlr_Method__init_(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
},
jlr_Method_getName = $this => {
    return $this.$name1;
},
jlr_Method_getModifiers = $this => {
    return otcir_Flags_getModifiers($this.$flags0, $this.$accessLevel);
},
jlr_Method_getReturnType = $this => {
    return $this.$returnType;
},
jlr_Method_getParameterTypes = $this => {
    return $this.$parameterTypes0.$clone0();
},
jlr_Method_invoke = ($this, $obj, $args) => {
    let var$3, var$4, $i, var$6, var$7;
    if ($this.$caller === null)
        $rt_throw(jl_IllegalAccessException__init_());
    var$3 = $args.data;
    var$4 = var$3.length;
    if (var$4 != $this.$parameterTypes0.data.length)
        $rt_throw(jl_IllegalArgumentException__init_0());
    if ($this.$flags0 & 512)
        (jl_Class_getPlatformClass($this.$declaringClass)).$clinit();
    else if (!jl_Class_isInstance($this.$declaringClass, $obj))
        $rt_throw(jl_IllegalArgumentException__init_0());
    $i = 0;
    while ($i < var$4) {
        if (!jl_Class_isPrimitive($this.$parameterTypes0.data[$i]) && var$3[$i] !== null) {
            var$6 = $this.$parameterTypes0.data[$i];
            var$7 = var$3[$i];
            if (!jl_Class_isInstance(var$6, var$7))
                $rt_throw(jl_IllegalArgumentException__init_0());
        }
        if (jl_Class_isPrimitive($this.$parameterTypes0.data[$i]) && var$3[$i] === null)
            $rt_throw(jl_IllegalArgumentException__init_0());
        $i = $i + 1 | 0;
    }
    return $this.$caller.$call($obj, $args);
},
otji_JS = $rt_classWithoutFields(),
otji_JS_wrap = $array => {
    let var$2, var$3, $result, $i, var$6;
    if ($array === null)
        return null;
    var$2 = $array.data;
    var$3 = var$2.length;
    $result = new Int8Array(var$3);
    $i = 0;
    while ($i < var$3) {
        var$6 = var$2[$i];
        $result[$i] = var$6;
        $i = $i + 1 | 0;
    }
    return $result;
},
otji_JS_functionAsObject = (var$1, var$2) => {
    if (typeof var$1 !== 'function') return var$1;
    let result = {  };
    result[var$2] = var$1;
    return result;
},
otp_PlatformRunnable = $rt_classWithoutFields(0);
function jl_Object$monitorEnterWait$lambda$_6_0() {
    let a = this; jl_Object.call(a);
    a.$_00 = null;
    a.$_1 = null;
    a.$_2 = 0;
    a.$_3 = null;
}
let jl_Object$monitorEnterWait$lambda$_6_0__init_ = (var$0, var$1, var$2, var$3, var$4) => {
    jl_Object__init_(var$0);
    var$0.$_00 = var$1;
    var$0.$_1 = var$2;
    var$0.$_2 = var$3;
    var$0.$_3 = var$4;
},
jl_Object$monitorEnterWait$lambda$_6_0__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jl_Object$monitorEnterWait$lambda$_6_0();
    jl_Object$monitorEnterWait$lambda$_6_0__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jl_Object$monitorEnterWait$lambda$_6_0_run = var$0 => {
    jl_Object_lambda$monitorEnterWait$0(var$0.$_00, var$0.$_1, var$0.$_2, var$0.$_3);
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_equals = ($a, $b) => {
    if ($a === $b)
        return 1;
    return $a !== null ? $a.$equals($b) : $b !== null ? 0 : 1;
},
ju_Objects_toString = $o => {
    return ju_Objects_toString0($o, $rt_s(24));
},
ju_Objects_toString0 = ($o, $nullDefault) => {
    if ($o !== null)
        $nullDefault = $o.$toString();
    return $nullDefault;
},
ju_Objects_requireNonNull = $obj => {
    return ju_Objects_requireNonNull0($obj, $rt_s(1));
},
ju_Objects_requireNonNull0 = ($obj, $message) => {
    if ($obj !== null)
        return $obj;
    $rt_throw(jl_NullPointerException__init_2($message));
},
ju_Objects_checkFromIndexSize = ($fromIndex, $size, $length) => {
    if ($fromIndex >= 0 && $size >= 0 && $size <= ($length - $fromIndex | 0))
        return $fromIndex;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
ju_Map$Entry = $rt_classWithoutFields(0);
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value0 = null;
}
let ju_MapEntry__init_ = ($this, $theKey, $theValue) => {
    jl_Object__init_($this);
    $this.$key = $theKey;
    $this.$value0 = $theValue;
},
ju_MapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_MapEntry();
    ju_MapEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_HashMap$HashEntry() {
    let a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next0 = null;
}
let ju_HashMap$HashEntry__init_ = ($this, $theKey, $hash) => {
    ju_MapEntry__init_($this, $theKey, null);
    $this.$origKeyHash = $hash;
},
ju_HashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
},
nmnph_ClientIntentionPacket = $rt_classWithoutFields(jl_Record),
nmnph_ClientIntentionPacket_$callClinit = () => {
    nmnph_ClientIntentionPacket_$callClinit = $rt_eraseClinit(nmnph_ClientIntentionPacket);
    nmnph_ClientIntentionPacket__clinit_();
},
nmnph_ClientIntentionPacket__clinit_ = () => {
    let var$1;
    var$1 = zg_a(nmnph_ClientIntentionPacket$_clinit_$lambda$_14_0__init_0(), nmnph_ClientIntentionPacket$_clinit_$lambda$_14_1__init_0());
    aij_$callClinit();
    aij_a = var$1;
},
ju_Queue = $rt_classWithoutFields(0),
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jl_ArrayStoreException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_ArrayStoreException__init_ = () => {
    let var_0 = new jl_ArrayStoreException();
    jl_ArrayStoreException__init_0(var_0);
    return var_0;
},
ju_SequencedCollection = $rt_classWithoutFields(0),
inb_ByteBufConvertible = $rt_classWithoutFields(0),
inb_ByteBuf = $rt_classWithoutFields(),
vw = $rt_classWithoutFields(inb_ByteBuf),
yy = $rt_classWithoutFields(0),
aij$_clinit_$lambda$_14_1 = $rt_classWithoutFields(),
aij$_clinit_$lambda$_14_1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
aij$_clinit_$lambda$_14_1__init_0 = () => {
    let var_0 = new aij$_clinit_$lambda$_14_1();
    aij$_clinit_$lambda$_14_1__init_(var_0);
    return var_0;
},
jl_AutoCloseable = $rt_classWithoutFields(0),
ji_Closeable = $rt_classWithoutFields(0),
ji_OutputStream = $rt_classWithoutFields(),
ji_OutputStream__init_ = $this => {
    jl_Object__init_($this);
};
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out2 = null;
}
let ji_FilterOutputStream__init_ = ($this, $out) => {
    ji_OutputStream__init_($this);
    $this.$out2 = $out;
},
ji_FilterOutputStream__init_0 = var_0 => {
    let var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_(var_1, var_0);
    return var_1;
};
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$errorState = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
let ji_PrintStream__init_ = ($this, $out, $autoFlush, $charset) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer0 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    $this.$charset = $charset;
},
ji_PrintStream__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new ji_PrintStream();
    ji_PrintStream__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
ji_PrintStream_printf = ($this, $format, $args) => {
    return $this.$format0($format, $args);
},
ji_PrintStream_format = ($this, $format, $args) => {
    return $this.$format1(ju_Locale_getDefault(), $format, $args);
},
ji_PrintStream_format0 = ($this, $locale, $format, $args) => {
    let $formatter;
    if ($args === null)
        $args = $rt_createArray(jl_Object, 1);
    $formatter = ju_Formatter__init_0($this, $locale);
    ju_Formatter_format($formatter, $format, $args);
    if (ju_Formatter_ioException($formatter) !== null)
        $this.$errorState = 1;
    return $this;
},
ji_PrintStream_append0 = ($this, $csq) => {
    if ($csq === null)
        $this.$print($rt_s(24));
    else
        $this.$print0($csq, 0, $csq.$length());
    return $this;
},
ji_PrintStream_append = ($this, var$1) => {
    return $this.$append13(var$1);
},
otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JsConsolePrintStream__init_ = $this => {
    ji_PrintStream__init_($this, null, 0, null);
},
otcic_JsConsolePrintStream_println = ($this, $s) => {
    $this.$print($s);
    $this.$print($rt_s(44));
},
otcic_JsConsolePrintStream_println1 = $this => {
    $this.$print($rt_s(44));
},
otcic_JsConsolePrintStream_println0 = ($this, $s) => {
    $this.$println1(ju_Objects_toString($s));
},
otcic_JsConsolePrintStream_print = ($this, $s, $begin, $end) => {
    $this.$print(($s.$subSequence($begin, $end)).$toString());
},
otcic_JSStdoutPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStdoutPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStdoutPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStdoutPrintStream();
    otcic_JSStdoutPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStdoutPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(24);
    $rt_putStdout($rt_ustr($s));
};
function otji_JSWrapper() {
    jl_Object.call(this);
    this.$js = null;
}
let otji_JSWrapper_unwrap = $o => {
    if ($o === null)
        return null;
    return !($o instanceof otji_JSWrapper) ? $o : $o.$js;
},
otji_JSWrapper_maybeUnwrap = $o => {
    if ($o === null)
        return null;
    return !($o instanceof $rt_objcls()) ? $o : otji_JSWrapper_unwrap($o);
},
wf = $rt_classWithoutFields(0),
ju_Set = $rt_classWithoutFields(0),
ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection),
ju_AbstractSet__init_ = $this => {
    ju_AbstractCollection__init_($this);
};
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
let ju_HashSet__init_0 = $this => {
    ju_HashSet__init_($this, ju_HashMap__init_2());
},
ju_HashSet__init_1 = () => {
    let var_0 = new ju_HashSet();
    ju_HashSet__init_0(var_0);
    return var_0;
},
ju_HashSet__init_ = ($this, $backingMap) => {
    ju_AbstractSet__init_($this);
    $this.$backingMap = $backingMap;
},
ju_HashSet__init_2 = var_0 => {
    let var_1 = new ju_HashSet();
    ju_HashSet__init_(var_1, var_0);
    return var_1;
},
ju_HashSet_add = ($this, $object) => {
    return $this.$backingMap.$put($object, $this) !== null ? 0 : 1;
},
otp_Platform = $rt_classWithoutFields(),
otp_Platform_clone = var$1 => {
    let copy = new var$1.constructor();
    for (let field in var$1) {
        if (var$1.hasOwnProperty(field)) {
            copy[field] = var$1[field];
        }
    }
    return copy;
},
otp_Platform_isInstance = (var$1, $cls) => {
    return var$1 !== null && !(typeof var$1.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable(var$1.constructor, $cls) ? 1 : 0;
},
otp_Platform_isAssignable = ($from, $to) => {
    let $supertypes, $i;
    if ($from === $to)
        return 1;
    $supertypes = $from.$meta.supertypes;
    $i = 0;
    while ($i < $supertypes.length) {
        if (otp_Platform_isAssignable($supertypes[$i], $to))
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
},
otp_Platform_launchThread = $runnable => {
    $runnable.$run();
},
otp_Platform_postpone = $runnable => {
    otp_Platform_schedule($runnable, 0);
},
otp_Platform_schedule = (var$1, var$2) => {
    setTimeout(() => {
        otp_Platform_launchThread(var$1);
    }, var$2);
},
otp_Platform_isPrimitive = var$1 => {
    return var$1.$meta.primitive ? 1 : 0;
},
otp_Platform_getArrayItem = $cls => {
    return $cls.$meta.item;
},
otp_Platform_getName = $cls => {
    return $rt_str($cls.$meta.name);
},
jnc_Charset = $rt_classWithoutFields(),
wl = $rt_classWithoutFields(0);
function jl_Boolean() {
    jl_Object.call(this);
    this.$value3 = 0;
}
let jl_Boolean_TRUE = null,
jl_Boolean_FALSE = null,
jl_Boolean_TYPE = null,
jl_Boolean_$callClinit = () => {
    jl_Boolean_$callClinit = $rt_eraseClinit(jl_Boolean);
    jl_Boolean__clinit_();
},
jl_Boolean__init_0 = ($this, $value) => {
    jl_Boolean_$callClinit();
    jl_Object__init_($this);
    $this.$value3 = $value;
},
jl_Boolean__init_ = var_0 => {
    let var_1 = new jl_Boolean();
    jl_Boolean__init_0(var_1, var_0);
    return var_1;
},
jl_Boolean_toString = $value => {
    jl_Boolean_$callClinit();
    return !$value ? $rt_s(45) : $rt_s(46);
},
jl_Boolean__clinit_ = () => {
    jl_Boolean_TRUE = jl_Boolean__init_(1);
    jl_Boolean_FALSE = jl_Boolean__init_(0);
    jl_Boolean_TYPE = $rt_cls($rt_booleancls);
},
za = $rt_classWithoutFields(0),
aij$_clinit_$lambda$_14_0 = $rt_classWithoutFields(),
aij$_clinit_$lambda$_14_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
aij$_clinit_$lambda$_14_0__init_0 = () => {
    let var_0 = new aij$_clinit_$lambda$_14_0();
    aij$_clinit_$lambda$_14_0__init_(var_0);
    return var_0;
},
ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException),
ju_NoSuchElementException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
ju_NoSuchElementException__init_0 = () => {
    let var_0 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_(var_0);
    return var_0;
},
otcic_JSStderrPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStderrPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStderrPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStderrPrintStream();
    otcic_JSStderrPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStderrPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(24);
    $rt_putStderr($rt_ustr($s));
},
jt_DecimalFormat$Constants = $rt_classWithoutFields(),
jt_DecimalFormat$Constants_doubleAnalysisResult = null,
jt_DecimalFormat$Constants_floatAnalysisResult = null,
jt_DecimalFormat$Constants_$callClinit = () => {
    jt_DecimalFormat$Constants_$callClinit = $rt_eraseClinit(jt_DecimalFormat$Constants);
    jt_DecimalFormat$Constants__clinit_();
},
jt_DecimalFormat$Constants__clinit_ = () => {
    jt_DecimalFormat$Constants_doubleAnalysisResult = otcit_DoubleAnalyzer$Result__init_();
    jt_DecimalFormat$Constants_floatAnalysisResult = otcit_FloatAnalyzer$Result__init_0();
},
oti_AsyncCallback = $rt_classWithoutFields(0),
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalArgumentException__init_2 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalArgumentException__init_0 = () => {
    let var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_2(var_0);
    return var_0;
},
jl_IllegalArgumentException__init_ = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalArgumentException__init_1 = var_0 => {
    let var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_(var_1, var_0);
    return var_1;
},
ju_IllegalFormatException = $rt_classWithoutFields(jl_IllegalArgumentException),
ju_IllegalFormatException__init_ = ($this, $s) => {
    jl_IllegalArgumentException__init_($this, $s);
},
ju_IllegalFormatException__init_0 = var_0 => {
    let var_1 = new ju_IllegalFormatException();
    ju_IllegalFormatException__init_(var_1, var_0);
    return var_1;
};
function ju_UnknownFormatConversionException() {
    ju_IllegalFormatException.call(this);
    this.$conversion1 = null;
}
let ju_UnknownFormatConversionException__init_0 = ($this, $conversion) => {
    let var$2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(47)), $conversion);
    ju_IllegalFormatException__init_($this, jl_StringBuilder_toString(var$2));
    $this.$conversion1 = $conversion;
},
ju_UnknownFormatConversionException__init_ = var_0 => {
    let var_1 = new ju_UnknownFormatConversionException();
    ju_UnknownFormatConversionException__init_0(var_1, var_0);
    return var_1;
};
function jt_NumberFormat() {
    let a = this; jt_Format.call(a);
    a.$groupingUsed = 0;
    a.$maximumIntegerDigits = 0;
    a.$minimumIntegerDigits = 0;
    a.$maximumFractionDigits = 0;
    a.$minimumFractionDigits = 0;
    a.$roundingMode = null;
    a.$currency = null;
}
let jt_NumberFormat__init_ = $this => {
    jt_Format__init_($this);
    $this.$groupingUsed = 1;
    $this.$maximumIntegerDigits = 40;
    $this.$minimumIntegerDigits = 1;
    $this.$maximumFractionDigits = 3;
    jm_RoundingMode_$callClinit();
    $this.$roundingMode = jm_RoundingMode_HALF_EVEN;
    $this.$currency = ju_Currency_getInstance(ju_Locale_getDefault());
},
jt_NumberFormat_getCurrency = $this => {
    return $this.$currency;
},
jt_NumberFormat_format = ($this, $object, $buffer, $field) => {
    let var$4, $dv, $lv;
    if (!($object instanceof jl_Number))
        $rt_throw(jl_IllegalArgumentException__init_0());
    var$4 = $object;
    $dv = var$4.$doubleValue();
    $lv = var$4.$longValue();
    if ($dv !== Long_toNumber($lv))
        return $this.$format3($dv, $buffer, $field);
    return $this.$format4($lv, $buffer, $field);
},
jt_NumberFormat_getMaximumFractionDigits = $this => {
    return $this.$maximumFractionDigits;
},
jt_NumberFormat_getMaximumIntegerDigits = $this => {
    return $this.$maximumIntegerDigits;
},
jt_NumberFormat_getMinimumFractionDigits = $this => {
    return $this.$minimumFractionDigits;
},
jt_NumberFormat_getMinimumIntegerDigits = $this => {
    return $this.$minimumIntegerDigits;
},
jt_NumberFormat_getNumberInstance = $locale => {
    let $pattern;
    $pattern = otciu_CLDRHelper_resolveNumberFormat(ju_Locale_getLanguage($locale), ju_Locale_getCountry($locale));
    return jt_DecimalFormat__init_2($pattern, jt_DecimalFormatSymbols__init_($locale));
},
jt_NumberFormat_isGroupingUsed = $this => {
    return $this.$groupingUsed;
},
jt_NumberFormat_setGroupingUsed = ($this, $value) => {
    $this.$groupingUsed = $value;
},
jt_NumberFormat_setMaximumFractionDigits = ($this, $value) => {
    if ($value < 0)
        $value = 0;
    $this.$maximumFractionDigits = $value;
    if ($this.$maximumFractionDigits < $this.$minimumFractionDigits)
        $this.$minimumFractionDigits = $this.$maximumFractionDigits;
},
jt_NumberFormat_setMaximumIntegerDigits = ($this, $value) => {
    if ($value < 0)
        $value = 0;
    $this.$maximumIntegerDigits = $value;
    if ($this.$maximumIntegerDigits < $this.$minimumIntegerDigits)
        $this.$minimumIntegerDigits = $this.$maximumIntegerDigits;
},
jt_NumberFormat_setMinimumFractionDigits = ($this, $value) => {
    if ($value < 0)
        $value = 0;
    $this.$minimumFractionDigits = $value;
    if ($this.$maximumFractionDigits < $this.$minimumFractionDigits)
        $this.$maximumFractionDigits = $this.$minimumFractionDigits;
},
jt_NumberFormat_setMinimumIntegerDigits = ($this, $value) => {
    if ($value < 0)
        $value = 0;
    $this.$minimumIntegerDigits = $value;
    if ($this.$maximumIntegerDigits < $this.$minimumIntegerDigits)
        $this.$maximumIntegerDigits = $this.$minimumIntegerDigits;
},
jt_NumberFormat_getRoundingMode = $this => {
    return $this.$roundingMode;
};
function jt_DecimalFormat() {
    let a = this; jt_NumberFormat.call(a);
    a.$symbols = null;
    a.$positivePrefix = null;
    a.$negativePrefix = null;
    a.$positiveSuffix = null;
    a.$negativeSuffix = null;
    a.$multiplier = 0;
    a.$groupingSize = 0;
    a.$decimalSeparatorAlwaysShown = 0;
    a.$exponentDigits = 0;
    a.$pattern = null;
}
let jt_DecimalFormat_POW10_ARRAY = null,
jt_DecimalFormat_POW10_INT_ARRAY = null,
jt_DecimalFormat_$callClinit = () => {
    jt_DecimalFormat_$callClinit = $rt_eraseClinit(jt_DecimalFormat);
    jt_DecimalFormat__clinit_();
},
jt_DecimalFormat__init_1 = $this => {
    jt_DecimalFormat_$callClinit();
    jt_DecimalFormat__init_0($this, otciu_CLDRHelper_resolveNumberFormat(ju_Locale_getLanguage(ju_Locale_getDefault()), ju_Locale_getCountry(ju_Locale_getDefault())));
},
jt_DecimalFormat__init_3 = () => {
    let var_0 = new jt_DecimalFormat();
    jt_DecimalFormat__init_1(var_0);
    return var_0;
},
jt_DecimalFormat__init_0 = ($this, $pattern) => {
    jt_DecimalFormat_$callClinit();
    jt_DecimalFormat__init_($this, $pattern, jt_DecimalFormatSymbols__init_2());
},
jt_DecimalFormat__init_4 = var_0 => {
    let var_1 = new jt_DecimalFormat();
    jt_DecimalFormat__init_0(var_1, var_0);
    return var_1;
},
jt_DecimalFormat__init_ = ($this, $pattern, $value) => {
    let var$3;
    jt_DecimalFormat_$callClinit();
    jt_NumberFormat__init_($this);
    $this.$positivePrefix = $rt_createArray(jt_DecimalFormat$FormatField, 0);
    var$3 = $rt_createArray(jt_DecimalFormat$FormatField, 1);
    var$3.data[0] = jt_DecimalFormat$TextField__init_($rt_s(48));
    $this.$negativePrefix = var$3;
    $this.$positiveSuffix = $rt_createArray(jt_DecimalFormat$FormatField, 0);
    $this.$negativeSuffix = $rt_createArray(jt_DecimalFormat$FormatField, 0);
    $this.$multiplier = 1;
    $this.$symbols = $value.$clone0();
    $this.$applyPattern($pattern);
},
jt_DecimalFormat__init_2 = (var_0, var_1) => {
    let var_2 = new jt_DecimalFormat();
    jt_DecimalFormat__init_(var_2, var_0, var_1);
    return var_2;
},
jt_DecimalFormat_applyPattern = ($this, $pattern) => {
    let $parser;
    $parser = jt_DecimalFormatParser__init_0();
    $parser.$parse($pattern);
    $parser.$apply($this);
    $this.$pattern = $pattern;
},
jt_DecimalFormat_setDecimalFormatSymbols = ($this, $symbols) => {
    $this.$symbols = $symbols.$clone0();
},
jt_DecimalFormat_fieldsToText = ($this, $fields, $buffer) => {
    let var$3, var$4, var$5, $field;
    var$3 = $fields.data;
    var$4 = var$3.length;
    var$5 = 0;
    while (var$5 < var$4) {
        $field = var$3[var$5];
        $field.$render($this, $buffer);
        var$5 = var$5 + 1 | 0;
    }
    return $buffer;
},
jt_DecimalFormat_textToFields = ($this, $text) => {
    let var$2;
    var$2 = $rt_createArray(jt_DecimalFormat$FormatField, 1);
    var$2.data[0] = jt_DecimalFormat$TextField__init_($text);
    return var$2;
},
jt_DecimalFormat_setPositivePrefix = ($this, $newValue) => {
    $this.$positivePrefix = jt_DecimalFormat_textToFields($this, $newValue);
},
jt_DecimalFormat_setNegativePrefix = ($this, $newValue) => {
    $this.$negativePrefix = jt_DecimalFormat_textToFields($this, $newValue);
},
jt_DecimalFormat_setNegativeSuffix = ($this, $newValue) => {
    $this.$negativeSuffix = jt_DecimalFormat_textToFields($this, $newValue);
},
jt_DecimalFormat_setMultiplier = ($this, $newValue) => {
    $this.$multiplier = $newValue;
},
jt_DecimalFormat_getGroupingSize = $this => {
    return $this.$groupingSize;
},
jt_DecimalFormat_setGroupingSize = ($this, $newValue) => {
    $this.$groupingSize = $newValue;
},
jt_DecimalFormat_isDecimalSeparatorAlwaysShown = $this => {
    return $this.$decimalSeparatorAlwaysShown;
},
jt_DecimalFormat_setDecimalSeparatorAlwaysShown = ($this, $newValue) => {
    $this.$decimalSeparatorAlwaysShown = $newValue;
},
jt_DecimalFormat_format0 = ($this, $object, $buffer, $field) => {
    if ($object instanceof jm_BigDecimal)
        return jt_DecimalFormat_format($this, $object, $buffer, $field);
    if (!($object instanceof jm_BigInteger))
        return jt_NumberFormat_format($this, $object, $buffer, $field);
    return jt_DecimalFormat_format1($this, $object, $buffer, $field);
},
jt_DecimalFormat_format1 = ($this, $value, $buffer, $field) => {
    return jt_DecimalFormat_format($this, jm_BigDecimal__init_5($value), $buffer, $field);
},
jt_DecimalFormat_format = ($this, $value, $buffer, $field) => {
    if ($this.$exponentDigits <= 0)
        jt_DecimalFormat_formatRegular($this, $value, $buffer);
    else
        jt_DecimalFormat_formatExponent($this, $value, $buffer);
    return $buffer;
},
jt_DecimalFormat_format3 = ($this, $value, $buffer, $field) => {
    if ($this.$exponentDigits <= 0)
        jt_DecimalFormat_formatRegular1($this, $value, $buffer);
    else
        jt_DecimalFormat_formatExponent1($this, $value, $buffer);
    return $buffer;
},
jt_DecimalFormat_format2 = ($this, $value, $buffer, $field) => {
    let $analysisResult, var$5, var$6;
    if (isNaN($value) ? 1 : 0) {
        (jt_DecimalFormat_fieldsToText($this, $this.$positivePrefix, $buffer)).$append4($this.$symbols.$getNaN());
        jt_DecimalFormat_appendSuffix($this, 1, $buffer);
    } else if (!(!isFinite($value) ? 1 : 0)) {
        jt_DecimalFormat$Constants_$callClinit();
        $analysisResult = jt_DecimalFormat$Constants_doubleAnalysisResult;
        otcit_DoubleAnalyzer_analyze($value, $analysisResult);
        if ($this.$exponentDigits <= 0)
            jt_DecimalFormat_formatRegular0($this, $analysisResult.$mantissa, $analysisResult.$exponent, $analysisResult.$sign0 ? 0 : 1, $buffer);
        else
            jt_DecimalFormat_formatExponent0($this, $analysisResult.$mantissa, $analysisResult.$exponent, $analysisResult.$sign0 ? 0 : 1, $buffer);
    } else {
        var$5 = $rt_compare($value, 0.0);
        var$6 = var$5 <= 0 ? $this.$negativePrefix : $this.$positivePrefix;
        (jt_DecimalFormat_fieldsToText($this, var$6, $buffer)).$append4($this.$symbols.$getInfinity());
        jt_DecimalFormat_appendSuffix($this, var$5 <= 0 ? 0 : 1, $buffer);
    }
    return $buffer;
},
jt_DecimalFormat_formatExponent1 = ($this, $value, $buffer) => {
    let $absValue, $exponent;
    $absValue = jl_Math_abs0($value);
    $exponent = jt_DecimalFormat_fastLn10($this, $absValue);
    jt_DecimalFormat_formatExponent0($this, $absValue, $exponent, Long_lt($value, Long_ZERO) ? 0 : 1, $buffer);
},
jt_DecimalFormat_formatRegular1 = ($this, $value, $buffer) => {
    let $absValue, $exponent;
    $absValue = jl_Math_abs0($value);
    $exponent = jt_DecimalFormat_fastLn10($this, $absValue);
    jt_DecimalFormat_formatRegular0($this, $absValue, $exponent, Long_lt($value, Long_ZERO) ? 0 : 1, $buffer);
},
jt_DecimalFormat_formatExponent0 = ($this, $mantissa, $exponent, $sign, $buffer) => {
    let $visibleExponent, $mantissaLength, $multiplierDigits, $tenMultiplier, $significantSize, $exponentMultiplier, $delta, var$12, var$13, $newMantissaLength, $exponentPos, $i, $mantissaDigitMask, var$18, $requiredSize, $limit, $count, $exponentLength, $exponentDigit;
    $visibleExponent = jt_DecimalFormat_fastLn10($this, $mantissa);
    $mantissaLength = $visibleExponent + 1 | 0;
    if ($this.$multiplier != 1) {
        $multiplierDigits = jt_DecimalFormat_fastLn100($this, $this.$multiplier);
        $tenMultiplier = jt_DecimalFormat_POW10_INT_ARRAY.data[$multiplierDigits];
        if ($tenMultiplier == $this.$multiplier)
            $exponent = $exponent + $multiplierDigits | 0;
        else {
            if (Long_ge($mantissa, Long_div(Long_create(4294967295, 2147483647), Long_fromInt($this.$multiplier)))) {
                jt_DecimalFormat_formatExponent($this, jm_BigDecimal__init_3(jm_BigInteger_valueOf($mantissa), $visibleExponent - $exponent | 0), $buffer);
                return;
            }
            $mantissa = Long_mul($mantissa, Long_fromInt($this.$multiplier));
            $visibleExponent = jt_DecimalFormat_fastLn10($this, $mantissa);
            $mantissaLength = $visibleExponent + 1 | 0;
        }
    }
    $significantSize = $this.$getMinimumIntegerDigits() + $this.$getMaximumFractionDigits() | 0;
    $exponentMultiplier = ($this.$getMaximumIntegerDigits() - $this.$getMinimumIntegerDigits() | 0) + 1 | 0;
    if ($exponentMultiplier > 1) {
        $delta = $exponent - $rt_imul($exponent / $exponentMultiplier | 0, $exponentMultiplier) | 0;
        var$12 = $exponent - $delta | 0;
        var$13 = $visibleExponent - $delta | 0;
    } else {
        var$12 = $exponent - ($this.$getMinimumIntegerDigits() - 1 | 0) | 0;
        var$13 = $visibleExponent - ($this.$getMinimumIntegerDigits() - 1 | 0) | 0;
    }
    if ($significantSize < 0)
        $mantissa = Long_ZERO;
    else if ($significantSize < $mantissaLength) {
        $mantissa = jt_DecimalFormat_applyRounding0($this, $mantissa, $mantissaLength, $significantSize, $sign);
        $newMantissaLength = jt_DecimalFormat_fastLn10($this, $mantissa) + 1 | 0;
        if ($newMantissaLength > $mantissaLength) {
            var$12 = var$12 + 1 | 0;
            var$13 = var$13 + 1 | 0;
            $mantissaLength = $newMantissaLength;
        }
    }
    jt_DecimalFormat_fieldsToText($this, !$sign ? $this.$negativePrefix : $this.$positivePrefix, $buffer);
    $exponentPos = jl_Math_max(var$13, 0);
    $i = $mantissaLength - 1 | 0;
    while ($i >= $exponentPos) {
        $mantissaDigitMask = jt_DecimalFormat_POW10_ARRAY.data[$i];
        $buffer.$append3(jt_DecimalFormat_forDigit($this, Long_lo(Long_div($mantissa, $mantissaDigitMask))));
        $mantissa = Long_rem($mantissa, $mantissaDigitMask);
        $i = $i + (-1) | 0;
    }
    $i = $exponentPos - 1 | 0;
    while ($i >= var$13) {
        $buffer.$append3(48);
        $i = $i + (-1) | 0;
    }
    a: {
        var$18 = $significantSize - ($mantissaLength - var$13 | 0) | 0;
        $requiredSize = var$18 - ($this.$getMaximumFractionDigits() - $this.$getMinimumFractionDigits() | 0) | 0;
        if ($requiredSize <= 0) {
            if (Long_eq($mantissa, Long_ZERO))
                break a;
            if (var$18 <= 0)
                break a;
        }
        $buffer.$append3($this.$symbols.$getDecimalSeparator());
        $limit = jl_Math_max(0, var$13 - var$18 | 0);
        $count = 0;
        $i = var$13 - 1 | 0;
        b: {
            while ($i >= $limit) {
                $mantissaDigitMask = jt_DecimalFormat_POW10_ARRAY.data[$i];
                $buffer.$append3(jt_DecimalFormat_forDigit($this, Long_lo(Long_div($mantissa, $mantissaDigitMask))));
                $mantissa = Long_rem($mantissa, $mantissaDigitMask);
                $count = $count + 1 | 0;
                if (Long_eq($mantissa, Long_ZERO))
                    break b;
                $i = $i + (-1) | 0;
            }
        }
        while (true) {
            var$18 = $count + 1 | 0;
            if ($count >= $requiredSize)
                break a;
            $buffer.$append3(48);
            $count = var$18;
        }
    }
    $buffer.$append4($this.$symbols.$getExponentSeparator());
    if (var$12 < 0) {
        var$12 =  -var$12 | 0;
        $buffer.$append3($this.$symbols.$getMinusSign());
    }
    $exponentLength = jl_Math_max($this.$exponentDigits, jt_DecimalFormat_fastLn100($this, var$12) + 1 | 0);
    $i = $exponentLength - 1 | 0;
    while ($i >= 0) {
        $exponentDigit = jt_DecimalFormat_POW10_INT_ARRAY.data[$i];
        $buffer.$append3(jt_DecimalFormat_forDigit($this, var$12 / $exponentDigit | 0));
        var$12 = var$12 % $exponentDigit | 0;
        $i = $i + (-1) | 0;
    }
    jt_DecimalFormat_appendSuffix($this, $sign, $buffer);
},
jt_DecimalFormat_formatRegular0 = ($this, $mantissa, $exponent, $sign, $buffer) => {
    let $mantissaLength, var$6, $multiplierDigits, $tenMultiplier, $roundingPos, $newMantissaLength, $intLength, $digitPos, $i, $significantIntDigits, $mantissaDigit, var$16, var$17, $mantissaDigitMask, var$19, $fracZeros, $i_0, $significantFracDigits;
    $mantissaLength = jt_DecimalFormat_fastLn10($this, $mantissa) + 1 | 0;
    var$6 = $exponent + 1 | 0;
    if ($this.$multiplier != 1) {
        $multiplierDigits = jt_DecimalFormat_fastLn100($this, $this.$multiplier);
        $tenMultiplier = jt_DecimalFormat_POW10_INT_ARRAY.data[$multiplierDigits];
        if ($tenMultiplier == $this.$multiplier)
            var$6 = var$6 + $multiplierDigits | 0;
        else {
            if (Long_ge($mantissa, Long_div(Long_create(4294967295, 2147483647), Long_fromInt($this.$multiplier)))) {
                jt_DecimalFormat_formatRegular($this, jm_BigDecimal__init_3(jm_BigInteger_valueOf($mantissa), $mantissaLength - var$6 | 0), $buffer);
                return;
            }
            $mantissa = Long_mul($mantissa, Long_fromInt($this.$multiplier));
            $mantissaLength = jt_DecimalFormat_fastLn10($this, $mantissa) + 1 | 0;
        }
    }
    $roundingPos = var$6 + $this.$getMaximumFractionDigits() | 0;
    if ($roundingPos < 0)
        $mantissa = Long_ZERO;
    else if ($roundingPos < $mantissaLength) {
        $mantissa = jt_DecimalFormat_applyRounding0($this, $mantissa, $mantissaLength, $roundingPos, $sign);
        $newMantissaLength = jt_DecimalFormat_fastLn10($this, $mantissa) + 1 | 0;
        if ($newMantissaLength > $mantissaLength) {
            var$6 = var$6 + 1 | 0;
            $mantissaLength = $newMantissaLength;
        }
    }
    jt_DecimalFormat_fieldsToText($this, !$sign ? $this.$negativePrefix : $this.$positivePrefix, $buffer);
    $intLength = jl_Math_max(0, var$6);
    $digitPos = jl_Math_max($intLength, $this.$getMinimumIntegerDigits()) - 1 | 0;
    $i = $this.$getMinimumIntegerDigits() - 1 | 0;
    while ($i >= $intLength) {
        $buffer.$append3(48);
        if ($this.$isGroupingUsed() && $this.$groupingSize > 0 && !($digitPos % $this.$groupingSize | 0) && $digitPos > 0)
            $buffer.$append3($this.$symbols.$getGroupingSeparator());
        $digitPos = $digitPos + (-1) | 0;
        $i = $i + (-1) | 0;
    }
    $significantIntDigits = jl_Math_min($mantissaLength, $intLength);
    $mantissaDigit = $mantissaLength - 1 | 0;
    $i = 0;
    while ($i < $significantIntDigits) {
        var$16 = jt_DecimalFormat_POW10_ARRAY.data;
        var$17 = $mantissaDigit + (-1) | 0;
        $mantissaDigitMask = var$16[$mantissaDigit];
        $buffer.$append3(jt_DecimalFormat_forDigit($this, jl_Math_abs(Long_lo(Long_div($mantissa, $mantissaDigitMask)))));
        $mantissa = Long_rem($mantissa, $mantissaDigitMask);
        if ($this.$isGroupingUsed() && $this.$groupingSize > 0 && !($digitPos % $this.$groupingSize | 0) && $digitPos > 0)
            $buffer.$append3($this.$symbols.$getGroupingSeparator());
        $digitPos = $digitPos + (-1) | 0;
        $i = $i + 1 | 0;
        $mantissaDigit = var$17;
    }
    var$19 = $intLength - $significantIntDigits | 0;
    $i = 0;
    while ($i < var$19) {
        $buffer.$append3(48);
        if ($this.$isGroupingUsed() && $this.$groupingSize > 0 && !($digitPos % $this.$groupingSize | 0) && $digitPos > 0)
            $buffer.$append3($this.$symbols.$getGroupingSeparator());
        $digitPos = $digitPos + (-1) | 0;
        $i = $i + 1 | 0;
    }
    a: {
        if (Long_eq($mantissa, Long_ZERO)) {
            if ($this.$getMinimumFractionDigits()) {
                $buffer.$append3($this.$symbols.$getDecimalSeparator());
                $i = 0;
                while ($i < $this.$getMinimumFractionDigits()) {
                    $buffer.$append3(48);
                    $i = $i + 1 | 0;
                }
            } else if ($this.$isDecimalSeparatorAlwaysShown())
                $buffer.$append3($this.$symbols.$getDecimalSeparator());
        } else {
            $buffer.$append3($this.$symbols.$getDecimalSeparator());
            $fracZeros = jl_Math_min($this.$getMaximumFractionDigits(), jl_Math_max(0,  -var$6 | 0));
            $i_0 = 0;
            $i = 0;
            while ($i < $fracZeros) {
                $i_0 = $i_0 + 1 | 0;
                $buffer.$append3(48);
                $i = $i + 1 | 0;
            }
            $significantFracDigits = jl_Math_min($this.$getMaximumFractionDigits() - $i_0 | 0, $mantissaDigit);
            $i = 0;
            b: {
                while (true) {
                    if ($i >= $significantFracDigits)
                        break b;
                    if (Long_eq($mantissa, Long_ZERO))
                        break;
                    $i_0 = $i_0 + 1 | 0;
                    $mantissaDigitMask = jt_DecimalFormat_POW10_ARRAY.data[$mantissaDigit];
                    $buffer.$append3(jt_DecimalFormat_forDigit($this, jl_Math_abs(Long_lo(Long_div($mantissa, $mantissaDigitMask)))));
                    $mantissa = Long_rem($mantissa, $mantissaDigitMask);
                    $mantissaDigit = $mantissaDigit + (-1) | 0;
                    $i = $i + 1 | 0;
                }
            }
            while (true) {
                if ($i_0 >= $this.$getMinimumFractionDigits())
                    break a;
                $buffer.$append3(48);
                $i_0 = $i_0 + 1 | 0;
            }
        }
    }
    jt_DecimalFormat_appendSuffix($this, $sign, $buffer);
},
jt_DecimalFormat_formatExponent = ($this, $value, $buffer) => {
    let $positive, $mantissaLength, $i, $exponent, $mantissa, $significantSize, $exponentMultiplier, $delta, var$11, var$12, $exponentPos, $mantissaDigitMask, $parts, var$16, var$17, $requiredSize, $limit, $count, var$21, $exponentLength, $exponentDigit;
    if ($this.$multiplier != 1)
        $value = $value.$multiply1(jm_BigDecimal_valueOf(Long_fromInt($this.$multiplier)));
    jm_BigDecimal_$callClinit();
    $positive = $value.$compareTo(jm_BigDecimal_ZERO) < 0 ? 0 : 1;
    $mantissaLength = $value.$precision();
    $i = $mantissaLength - 1 | 0;
    $exponent = $i - $value.$scale() | 0;
    $mantissa = $value.$unscaledValue();
    $significantSize = $this.$getMinimumIntegerDigits() + $this.$getMaximumFractionDigits() | 0;
    $exponentMultiplier = ($this.$getMaximumIntegerDigits() - $this.$getMinimumIntegerDigits() | 0) + 1 | 0;
    if ($exponentMultiplier > 1) {
        $delta = $exponent - $rt_imul($exponent / $exponentMultiplier | 0, $exponentMultiplier) | 0;
        var$11 = $exponent - $delta | 0;
        var$12 = $i - $delta | 0;
    } else {
        var$11 = $exponent - ($this.$getMinimumIntegerDigits() - 1 | 0) | 0;
        var$12 = $i - ($this.$getMinimumIntegerDigits() - 1 | 0) | 0;
    }
    if ($significantSize < 0) {
        jm_BigInteger_$callClinit();
        $mantissa = jm_BigInteger_ZERO;
    } else if ($significantSize < $mantissaLength)
        $mantissa = jt_DecimalFormat_applyRounding($this, $mantissa, $mantissaLength, $significantSize);
    jt_DecimalFormat_fieldsToText($this, !$positive ? $this.$negativePrefix : $this.$positivePrefix, $buffer);
    $exponentPos = jl_Math_max(var$12, 0);
    jm_BigInteger_$callClinit();
    $mantissaDigitMask = jt_DecimalFormat_pow10($this, jm_BigInteger_ONE, $i);
    while ($i >= $exponentPos) {
        $parts = $mantissa.$divideAndRemainder($mantissaDigitMask);
        var$16 = $parts.data;
        $buffer.$append3(jt_DecimalFormat_forDigit($this, jl_Math_abs(var$16[0].$intValue())));
        $mantissa = var$16[1];
        $mantissaDigitMask = $mantissaDigitMask.$divide0(jm_BigInteger_TEN);
        $i = $i + (-1) | 0;
    }
    $i = $exponentPos - 1 | 0;
    while ($i >= var$12) {
        $buffer.$append3(48);
        $i = $i + (-1) | 0;
    }
    a: {
        var$17 = $significantSize - ($mantissaLength - var$12 | 0) | 0;
        $requiredSize = var$17 - ($this.$getMaximumFractionDigits() - $this.$getMinimumFractionDigits() | 0) | 0;
        if ($requiredSize <= 0) {
            if ($mantissa.$equals(jm_BigInteger_ZERO))
                break a;
            if (var$17 <= 0)
                break a;
        }
        $buffer.$append3($this.$symbols.$getDecimalSeparator());
        $limit = jl_Math_max(0, var$12 - var$17 | 0);
        $count = 0;
        $i = var$12 - 1 | 0;
        b: {
            while ($i >= $limit) {
                $parts = $mantissa.$divideAndRemainder($mantissaDigitMask);
                var$16 = $parts.data;
                $buffer.$append3(jt_DecimalFormat_forDigit($this, jl_Math_abs(var$16[0].$intValue())));
                $mantissa = var$16[1];
                $count = $count + 1 | 0;
                if ($mantissa.$equals(jm_BigInteger_ZERO))
                    break b;
                $mantissaDigitMask = $mantissaDigitMask.$divide0(jm_BigInteger_TEN);
                $i = $i + (-1) | 0;
            }
        }
        while (true) {
            var$21 = $count + 1 | 0;
            if ($count >= $requiredSize)
                break a;
            $buffer.$append3(48);
            $count = var$21;
        }
    }
    $buffer.$append4($this.$symbols.$getExponentSeparator());
    if (var$11 < 0) {
        var$11 =  -var$11 | 0;
        $buffer.$append3($this.$symbols.$getMinusSign());
    }
    $exponentLength = jl_Math_max($this.$exponentDigits, jt_DecimalFormat_fastLn100($this, var$11) + 1 | 0);
    $i = $exponentLength - 1 | 0;
    while ($i >= 0) {
        $exponentDigit = jt_DecimalFormat_POW10_INT_ARRAY.data[$i];
        $buffer.$append3(jt_DecimalFormat_forDigit($this, var$11 / $exponentDigit | 0));
        var$11 = var$11 % $exponentDigit | 0;
        $i = $i + (-1) | 0;
    }
    jt_DecimalFormat_appendSuffix($this, $positive, $buffer);
},
jt_DecimalFormat_appendSuffix = ($this, $positive, $buffer) => {
    if (!$positive)
        jt_DecimalFormat_fieldsToText($this, $this.$negativeSuffix !== null ? $this.$negativeSuffix : $this.$positiveSuffix !== null ? $this.$positiveSuffix : $rt_createArray(jt_DecimalFormat$FormatField, 0), $buffer);
    else if ($this.$positiveSuffix !== null)
        jt_DecimalFormat_fieldsToText($this, $this.$positiveSuffix, $buffer);
},
jt_DecimalFormat_formatRegular = ($this, $value, $buffer) => {
    let $mantissa, $positive, $mantissaLength, $exponent, $roundingPos, $intLength, $digitPos, $i, $significantIntDigits, $mantissaDigitMask, $parts, var$14, var$15, $fracZeros, $i_0, $significantFracDigits;
    if ($this.$multiplier != 1)
        $value = $value.$multiply1(jm_BigDecimal_valueOf(Long_fromInt($this.$multiplier)));
    $mantissa = $value.$unscaledValue();
    jm_BigInteger_$callClinit();
    $positive = $mantissa.$compareTo0(jm_BigInteger_ZERO) < 0 ? 0 : 1;
    $mantissaLength = $value.$precision();
    $exponent = $value.$precision() - $value.$scale() | 0;
    $roundingPos = $exponent + $this.$getMaximumFractionDigits() | 0;
    if ($roundingPos < 0)
        $mantissa = jm_BigInteger_ZERO;
    else if ($roundingPos < $mantissaLength)
        $mantissa = jt_DecimalFormat_applyRounding($this, $mantissa, $mantissaLength, $roundingPos);
    jt_DecimalFormat_fieldsToText($this, !$positive ? $this.$negativePrefix : $this.$positivePrefix, $buffer);
    $intLength = jl_Math_max(0, $exponent);
    $digitPos = jl_Math_max($intLength, $this.$getMinimumIntegerDigits()) - 1 | 0;
    $i = $this.$getMinimumIntegerDigits() - 1 | 0;
    while ($i >= $intLength) {
        $buffer.$append3(48);
        if ($this.$isGroupingUsed() && $this.$groupingSize > 0 && !($digitPos % $this.$groupingSize | 0) && $digitPos > 0)
            $buffer.$append3($this.$symbols.$getGroupingSeparator());
        $digitPos = $digitPos + (-1) | 0;
        $i = $i + (-1) | 0;
    }
    $significantIntDigits = jl_Math_min($mantissaLength, $intLength);
    $mantissaDigitMask = jt_DecimalFormat_pow10($this, jm_BigInteger_ONE, $mantissaLength - 1 | 0);
    $i = 0;
    while ($i < $significantIntDigits) {
        $parts = $mantissa.$divideAndRemainder($mantissaDigitMask);
        var$14 = $parts.data;
        $buffer.$append3(jt_DecimalFormat_forDigit($this, jl_Math_abs(var$14[0].$intValue())));
        $mantissa = var$14[1];
        if ($this.$isGroupingUsed() && $this.$groupingSize > 0 && !($digitPos % $this.$groupingSize | 0) && $digitPos > 0)
            $buffer.$append3($this.$symbols.$getGroupingSeparator());
        $digitPos = $digitPos + (-1) | 0;
        $mantissaLength = $mantissaLength + (-1) | 0;
        $mantissaDigitMask = $mantissaDigitMask.$divide0(jm_BigInteger_TEN);
        $i = $i + 1 | 0;
    }
    var$15 = $intLength - $significantIntDigits | 0;
    $i = 0;
    while ($i < var$15) {
        $buffer.$append3(48);
        if ($this.$isGroupingUsed() && $this.$groupingSize > 0 && !($digitPos % $this.$groupingSize | 0) && $digitPos > 0)
            $buffer.$append3($this.$symbols.$getGroupingSeparator());
        $digitPos = $digitPos + (-1) | 0;
        $i = $i + 1 | 0;
    }
    a: {
        if ($mantissa.$equals(jm_BigInteger_ZERO)) {
            if ($this.$getMinimumFractionDigits()) {
                $buffer.$append3($this.$symbols.$getDecimalSeparator());
                $i = 0;
                while ($i < $this.$getMinimumFractionDigits()) {
                    $buffer.$append3(48);
                    $i = $i + 1 | 0;
                }
            } else if ($this.$isDecimalSeparatorAlwaysShown())
                $buffer.$append3($this.$symbols.$getDecimalSeparator());
        } else {
            $buffer.$append3($this.$symbols.$getDecimalSeparator());
            $fracZeros = jl_Math_min($this.$getMaximumFractionDigits(), jl_Math_max(0,  -$exponent | 0));
            $i_0 = 0;
            $i = 0;
            while ($i < $fracZeros) {
                $i_0 = $i_0 + 1 | 0;
                $buffer.$append3(48);
                $i = $i + 1 | 0;
            }
            $significantFracDigits = jl_Math_min($this.$getMaximumFractionDigits() - $i_0 | 0, $mantissaLength);
            $i = 0;
            b: {
                while (true) {
                    if ($i >= $significantFracDigits)
                        break b;
                    if ($mantissa.$equals(jm_BigInteger_ZERO))
                        break;
                    $i_0 = $i_0 + 1 | 0;
                    $parts = $mantissa.$divideAndRemainder($mantissaDigitMask);
                    var$14 = $parts.data;
                    $buffer.$append3(jt_DecimalFormat_forDigit($this, jl_Math_abs(var$14[0].$intValue())));
                    $mantissa = var$14[1];
                    $mantissaDigitMask = $mantissaDigitMask.$divide0(jm_BigInteger_TEN);
                    $i = $i + 1 | 0;
                }
            }
            while (true) {
                if ($i_0 >= $this.$getMinimumFractionDigits())
                    break a;
                $buffer.$append3(48);
                $i_0 = $i_0 + 1 | 0;
            }
        }
    }
    jt_DecimalFormat_appendSuffix($this, $positive, $buffer);
},
jt_DecimalFormat_applyRounding0 = ($this, $mantissa, $mantissaLength, $exponent, $sign) => {
    let $rounding, var$6, var$7;
    a: {
        jt_DecimalFormat_$callClinit();
        $rounding = jt_DecimalFormat_POW10_ARRAY.data[$mantissaLength - $exponent | 0];
        jt_DecimalFormat$1_$callClinit();
        switch (jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal($this.$getRoundingMode())]) {
            case 1:
                $mantissa = Long_mul(Long_div($mantissa, $rounding), $rounding);
                if (!$sign)
                    break a;
                $mantissa = Long_add($mantissa, $rounding);
                break a;
            case 2:
                $mantissa = Long_mul(Long_div($mantissa, $rounding), $rounding);
                if ($sign)
                    break a;
                $mantissa = Long_add($mantissa, $rounding);
                break a;
            case 3:
                $mantissa = Long_add(Long_mul(Long_div($mantissa, $rounding), $rounding), $rounding);
                break a;
            case 4:
                $mantissa = Long_mul(Long_div($mantissa, $rounding), $rounding);
                break a;
            case 5:
                if (Long_eq(Long_rem($mantissa, $rounding), Long_ZERO))
                    break a;
                $rt_throw(jl_ArithmeticException__init_($rt_s(49)));
            case 6:
                var$6 = Long_rem($mantissa, $rounding);
                var$7 = Long_div($rounding, Long_fromInt(2));
                if (Long_eq(var$6, var$7)) {
                    $mantissa = Long_mul(Long_div($mantissa, $rounding), $rounding);
                    break a;
                }
                $mantissa = Long_mul(Long_div(Long_add($mantissa, var$7), $rounding), $rounding);
                break a;
            case 7:
                var$7 = Long_rem($mantissa, $rounding);
                var$6 = Long_div($rounding, Long_fromInt(2));
                if (Long_ne(var$7, var$6)) {
                    $mantissa = Long_mul(Long_div(Long_add($mantissa, var$6), $rounding), $rounding);
                    break a;
                }
                $mantissa = Long_add(Long_mul(Long_div($mantissa, $rounding), $rounding), $rounding);
                break a;
            case 8:
                var$7 = Long_rem($mantissa, $rounding);
                var$6 = Long_div($rounding, Long_fromInt(2));
                if (Long_ne(var$7, var$6)) {
                    $mantissa = Long_mul(Long_div(Long_add($mantissa, var$6), $rounding), $rounding);
                    break a;
                }
                $mantissa = Long_mul(Long_div($mantissa, $rounding), $rounding);
                if (Long_eq(Long_rem(Long_div($mantissa, $rounding), Long_fromInt(2)), Long_ZERO))
                    break a;
                $mantissa = Long_add($mantissa, $rounding);
                break a;
            default:
        }
    }
    return $mantissa;
},
jt_DecimalFormat_applyRounding = ($this, $mantissa, $mantissaLength, $exponent) => {
    let $rounding, $signedRounding, var$6;
    jm_BigInteger_$callClinit();
    $rounding = jt_DecimalFormat_pow10($this, jm_BigInteger_ONE, $mantissaLength - $exponent | 0);
    $signedRounding = $mantissa.$compareTo0(jm_BigInteger_ZERO) < 0 ? $rounding.$negate() : $rounding;
    a: {
        jt_DecimalFormat$1_$callClinit();
        switch (jt_DecimalFormat$1_$SwitchMap$java$math$RoundingMode.data[jl_Enum_ordinal($this.$getRoundingMode())]) {
            case 1:
                $mantissa = ($mantissa.$divide0($rounding)).$multiply0($rounding);
                if ($mantissa.$compareTo0(jm_BigInteger_ZERO) < 0)
                    break a;
                $mantissa = $mantissa.$add1($rounding);
                break a;
            case 2:
                $mantissa = ($mantissa.$divide0($rounding)).$multiply0($rounding);
                if ($mantissa.$compareTo0(jm_BigInteger_ZERO) > 0)
                    break a;
                $mantissa = $mantissa.$subtract0($rounding);
                break a;
            case 3:
                $mantissa = (($mantissa.$divide0($rounding)).$multiply0($rounding)).$add1($signedRounding);
                break a;
            case 4:
                $mantissa = ($mantissa.$divide0($rounding)).$multiply0($rounding);
                break a;
            case 5:
                if (!($mantissa.$remainder($rounding)).$equals(jm_BigInteger_ZERO))
                    break a;
                $rt_throw(jl_ArithmeticException__init_($rt_s(49)));
            case 6:
                if (($mantissa.$remainder($rounding)).$equals($signedRounding.$divide0(jm_BigInteger_valueOf(Long_fromInt(2))))) {
                    $mantissa = ($mantissa.$divide0($rounding)).$multiply0($rounding);
                    break a;
                }
                var$6 = $mantissa.$add1($signedRounding.$divide0(jm_BigInteger_valueOf(Long_fromInt(2))));
                $mantissa = (var$6.$divide0($rounding)).$multiply0($rounding);
                break a;
            case 7:
                if (($mantissa.$remainder($rounding)).$equals($signedRounding.$divide0(jm_BigInteger_valueOf(Long_fromInt(2))))) {
                    $mantissa = (($mantissa.$divide0($rounding)).$multiply0($rounding)).$add1($signedRounding);
                    break a;
                }
                var$6 = $mantissa.$add1($signedRounding.$divide0(jm_BigInteger_valueOf(Long_fromInt(2))));
                $mantissa = (var$6.$divide0($rounding)).$multiply0($rounding);
                break a;
            case 8:
                if (!($mantissa.$remainder($rounding)).$equals($signedRounding.$divide0(jm_BigInteger_valueOf(Long_fromInt(2))))) {
                    var$6 = $mantissa.$add1($signedRounding.$divide0(jm_BigInteger_valueOf(Long_fromInt(2))));
                    $mantissa = (var$6.$divide0($rounding)).$multiply0($rounding);
                    break a;
                }
                $mantissa = ($mantissa.$divide0($rounding)).$multiply0($rounding);
                if ((($mantissa.$divide0($rounding)).$remainder(jm_BigInteger_valueOf(Long_fromInt(2)))).$equals(jm_BigInteger_ZERO))
                    break a;
                $mantissa = $mantissa.$add1($signedRounding);
                break a;
            default:
        }
    }
    return $mantissa;
},
jt_DecimalFormat_fastLn10 = ($this, $value) => {
    let $result;
    if (Long_eq($value, Long_create(0, 2147483648)))
        return 18;
    $result = 0;
    if (Long_ge($value, Long_create(1874919424, 2328306))) {
        $result = 16;
        $value = Long_div($value, Long_create(1874919424, 2328306));
    }
    if (Long_ge($value, Long_fromInt(100000000))) {
        $result = $result + 8 | 0;
        $value = Long_div($value, Long_fromInt(100000000));
    }
    if (Long_ge($value, Long_fromInt(10000))) {
        $result = $result + 4 | 0;
        $value = Long_div($value, Long_fromInt(10000));
    }
    if (Long_ge($value, Long_fromInt(100))) {
        $result = $result + 2 | 0;
        $value = Long_div($value, Long_fromInt(100));
    }
    if (Long_ge($value, Long_fromInt(10)))
        $result = $result + 1 | 0;
    return $result;
},
jt_DecimalFormat_fastLn100 = ($this, $value) => {
    let $result;
    $result = 0;
    if ($value >= 100000000) {
        $result = 8;
        $value = $value / 100000000 | 0;
    }
    if ($value >= 10000) {
        $result = $result + 4 | 0;
        $value = $value / 10000 | 0;
    }
    if ($value >= 100) {
        $result = $result + 2 | 0;
        $value = $value / 100 | 0;
    }
    if ($value >= 10)
        $result = $result + 1 | 0;
    return $result;
},
jt_DecimalFormat_pow10 = ($this, $value, $power) => {
    let $digit;
    jm_BigInteger_$callClinit();
    $digit = jm_BigInteger_TEN;
    while ($power) {
        if ($power & 1)
            $value = $value.$multiply0($digit);
        $digit = $digit.$multiply0($digit);
        $power = $power >>> 1 | 0;
    }
    return $value;
},
jt_DecimalFormat_forDigit = ($this, $n) => {
    return ($this.$symbols.$getZeroDigit() + $n | 0) & 65535;
},
jt_DecimalFormat__clinit_ = () => {
    jt_DecimalFormat_POW10_ARRAY = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(1000), Long_fromInt(10000), Long_fromInt(100000), Long_fromInt(1000000), Long_fromInt(10000000), Long_fromInt(100000000), Long_fromInt(1000000000), Long_create(1410065408, 2), Long_create(1215752192, 23), Long_create(3567587328, 232), Long_create(1316134912, 2328), Long_create(276447232, 23283), Long_create(2764472320, 232830), Long_create(1874919424, 2328306), Long_create(1569325056, 23283064),
    Long_create(2808348672, 232830643)]);
    jt_DecimalFormat_POW10_INT_ARRAY = $rt_createIntArrayFromData([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]);
},
jt_DecimalFormat$PerMillField = $rt_classWithoutFields(),
jt_DecimalFormat$PerMillField__init_ = $this => {
    jl_Object__init_($this);
},
jt_DecimalFormat$PerMillField__init_0 = () => {
    let var_0 = new jt_DecimalFormat$PerMillField();
    jt_DecimalFormat$PerMillField__init_(var_0);
    return var_0;
},
jt_DecimalFormat$PerMillField_render = ($this, $format, $buffer) => {
    $buffer.$append3($format.$symbols.$getPerMill());
};
function ju_IllegalFormatConversionException() {
    let a = this; ju_IllegalFormatException.call(a);
    a.$conversion = 0;
    a.$argumentClass = null;
}
let ju_IllegalFormatConversionException__init_0 = ($this, $conversion, $argumentClass) => {
    let var$3, var$4;
    var$3 = jl_String_valueOf0($argumentClass);
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(50)), var$3), $rt_s(51)), $conversion), $rt_s(52));
    ju_IllegalFormatException__init_($this, jl_StringBuilder_toString(var$4));
    $this.$conversion = $conversion;
    $this.$argumentClass = $argumentClass;
},
ju_IllegalFormatConversionException__init_ = (var_0, var_1) => {
    let var_2 = new ju_IllegalFormatConversionException();
    ju_IllegalFormatConversionException__init_0(var_2, var_0, var_1);
    return var_2;
},
pn_JsNetBridge = $rt_classWithoutFields(),
pn_JsNetBridge_VAR_INT_SCRATCH = null,
pn_JsNetBridge_$callClinit = () => {
    pn_JsNetBridge_$callClinit = $rt_eraseClinit(pn_JsNetBridge);
    pn_JsNetBridge__clinit_();
},
pn_JsNetBridge_onReceiveFrame = $frame => {
    let var$2, var$3, var$4, $frameBytes, $i, $lenInfo, var$8, $frameLength, $afterLen, $idInfo, $packetId;
    pn_JsNetBridge_$callClinit();
    var$2 = jl_System_out();
    var$3 = $frame.length;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(53)), var$3);
    var$2.$println1(jl_StringBuilder_toString(var$4));
    if (!$frame.length) {
        (jl_System_out()).$println1($rt_s(54));
        return;
    }
    $frameBytes = $rt_createByteArray($frame.length);
    $i = 0;
    while ($i < $frame.length) {
        $frameBytes.data[$i] = $frame[$i] << 24 >> 24;
        $i = $i + 1 | 0;
    }
    $lenInfo = pn_JsNetBridge_readVarIntInfo($frameBytes, 0);
    var$8 = $lenInfo.data;
    $frameLength = var$8[0];
    $afterLen = var$8[1];
    var$2 = jl_System_out();
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(55)), $frameLength), $rt_s(56)), $afterLen);
    var$2.$println1(jl_StringBuilder_toString(var$4));
    if ($frameLength >= 0 && ($afterLen + $frameLength | 0) <= $frameBytes.data.length) {
        $idInfo = pn_JsNetBridge_readVarIntInfo($frameBytes, $afterLen);
        var$8 = $idInfo.data;
        $packetId = var$8[0];
        var$2 = jl_System_out();
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(57)), $packetId), $rt_s(58)), $frameLength);
        var$2.$println1(jl_StringBuilder_toString(var$4));
        var$2 = jl_System_out();
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(59)), $packetId);
        var$2.$println1(jl_StringBuilder_toString(var$4));
        return;
    }
    (jl_System_out()).$println1($rt_s(60));
},
pn_JsNetBridge_readVarIntInfo = ($buf, $offset) => {
    let $result, $shift, var$5, var$6, $current;
    pn_JsNetBridge_$callClinit();
    $result = 0;
    $shift = 0;
    while (true) {
        var$5 = $buf.data;
        if ($offset >= var$5.length)
            break;
        var$6 = $offset + 1 | 0;
        $current = var$5[$offset] & 255;
        $result = $result | ($current & 127) << $shift;
        $shift = $shift + 7 | 0;
        if ($shift > 28) {
            pn_JsNetBridge_VAR_INT_SCRATCH.data[0] = (-1);
            pn_JsNetBridge_VAR_INT_SCRATCH.data[1] = var$6;
            return pn_JsNetBridge_VAR_INT_SCRATCH;
        }
        if (!($current & 128)) {
            pn_JsNetBridge_VAR_INT_SCRATCH.data[0] = $result;
            pn_JsNetBridge_VAR_INT_SCRATCH.data[1] = var$6;
            return pn_JsNetBridge_VAR_INT_SCRATCH;
        }
        $offset = var$6;
    }
    pn_JsNetBridge_VAR_INT_SCRATCH.data[0] = $result;
    pn_JsNetBridge_VAR_INT_SCRATCH.data[1] = $offset;
    return pn_JsNetBridge_VAR_INT_SCRATCH;
},
pn_JsNetBridge_callJoinServer = ($host, $port) => {
    pn_JsNetBridge_$callClinit();
    pn_NetBridge_joinServer($host, $port);
},
pn_JsNetBridge__clinit_ = () => {
    pn_JsNetBridge_VAR_INT_SCRATCH = $rt_createIntArray(2);
},
pn_JsNetBridge_onAttach$js_body$_1 = () => {
    window.NetBridgeBridge = window.NetBridgeBridge || {  };
    window.NetBridgeBridge.attach = true;
},
pn_JsNetBridge_sendBytes$js_body$_2 = var$1 => {
    if (window.NetBridgeBridge && window.NetBridgeBridge.sendBytes) {
        window.NetBridgeBridge.sendBytes(new Uint8Array(var$1));
    }
},
pn_JsNetBridge_joinServer$js_body$_14 = (var$1, var$2) => {
    if (window.NetBridgeBridge && window.NetBridgeBridge.onJoinServer) {
        window.NetBridgeBridge.onJoinServer(var$1, var$2);
    }
},
jt_DecimalFormat$PercentField = $rt_classWithoutFields(),
jt_DecimalFormat$PercentField__init_ = $this => {
    jl_Object__init_($this);
},
jt_DecimalFormat$PercentField__init_0 = () => {
    let var_0 = new jt_DecimalFormat$PercentField();
    jt_DecimalFormat$PercentField__init_(var_0);
    return var_0;
},
jt_DecimalFormat$PercentField_render = ($this, $format, $buffer) => {
    $buffer.$append3($format.$symbols.$getPercent());
},
juf_Consumer = $rt_classWithoutFields(0),
ju_AbstractMap = $rt_classWithoutFields(),
ju_AbstractMap__init_ = $this => {
    jl_Object__init_($this);
};
function ju_IllegalFormatCodePointException() {
    ju_IllegalFormatException.call(this);
    this.$codePoint = 0;
}
let ju_IllegalFormatCodePointException__init_ = ($this, $codePoint) => {
    let var$2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(61)), $codePoint), $rt_s(62));
    ju_IllegalFormatException__init_($this, jl_StringBuilder_toString(var$2));
    $this.$codePoint = $codePoint;
},
ju_IllegalFormatCodePointException__init_0 = var_0 => {
    let var_1 = new ju_IllegalFormatCodePointException();
    ju_IllegalFormatCodePointException__init_(var_1, var_0);
    return var_1;
},
otcir_MethodInfo = $rt_classWithoutFields(),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
    a.$declaredFields = null;
    a.$fields = null;
    a.$declaredConstructors = null;
    a.$declaredMethods = null;
}
let jl_Class_reflectionInitialized = 0,
jl_Class__init_ = ($this, $platformClass) => {
    let var$2;
    jl_Object__init_($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
},
jl_Class__init_0 = var_0 => {
    let var_1 = new jl_Class();
    jl_Class__init_(var_1, var_0);
    return var_1;
},
jl_Class_getClass = $cls => {
    let $result;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null)
        $result = jl_Class__init_0($cls);
    return $result;
},
jl_Class_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_isInterface($this) ? $rt_s(63) : !jl_Class_isPrimitive($this) ? $rt_s(64) : $rt_s(1);
    var$2 = jl_Class_getName($this);
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, var$1), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Class_getPlatformClass = $this => {
    return $this.$platformClass;
},
jl_Class_isInstance = ($this, $obj) => {
    return otp_Platform_isInstance($obj, $this.$platformClass);
},
jl_Class_isAssignableFrom = ($this, $obj) => {
    return otp_Platform_isAssignable(jl_Class_getPlatformClass($obj), $this.$platformClass);
},
jl_Class_getName = $this => {
    if ($this.$name === null)
        $this.$name = otp_Platform_getName($this.$platformClass);
    return $this.$name;
},
jl_Class_isPrimitive = $this => {
    return otp_Platform_isPrimitive($this.$platformClass);
},
jl_Class_isArray = $this => {
    return otp_Platform_getArrayItem($this.$platformClass) === null ? 0 : 1;
},
jl_Class_isInterface = $this => {
    return !($this.$platformClass.$meta.flags & 2) ? 0 : 1;
},
jl_Class_getComponentType = $this => {
    return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
},
jl_Class_getDeclaredFields = $this => {
    let var$1, $jsFields, $i, $jsField, var$5, var$6, var$7, var$8, var$9, var$10;
    if (!jl_Class_isPrimitive($this) && !jl_Class_isArray($this)) {
        if ($this.$declaredFields === null) {
            jl_Class_initReflection();
            var$1 = (jl_Class_getPlatformClass($this)).$meta;
            $jsFields = var$1.fields;
            $this.$declaredFields = $rt_createArray(jlr_Field, $jsFields.length);
            $i = 0;
            while ($i < $jsFields.length) {
                $jsField = otji_JSWrapper_maybeUnwrap($jsFields[$i]);
                var$5 = $this.$declaredFields.data;
                var$1 = new jlr_Field;
                var$6 = $rt_str($jsField.name);
                var$7 = $jsField.modifiers;
                var$8 = $jsField.accessLevel;
                var$9 = jl_Class_getClass($jsField.type);
                var$10 = otcir_FieldReader_forJs(otji_JS_functionAsObject($jsField.getter, "get"));
                jlr_Field__init_(var$1, $this, var$6, var$7, var$8, var$9, var$10, otcir_FieldWriter_forJs(otji_JS_functionAsObject($jsField.setter, "set")));
                var$5[$i] = var$1;
                $i = $i + 1 | 0;
            }
        }
        return $this.$declaredFields.$clone0();
    }
    return $rt_createArray(jlr_Field, 0);
},
jl_Class_initReflection = () => {
    if (!jl_Class_reflectionInitialized) {
        jl_Class_reflectionInitialized = 1;
        jl_Class_createMetadata();
    }
},
jl_Class_createMetadata = () => {
    jl_Enum.$meta.fields = [];
    jl_Object.$meta.fields = [];
    nmnph_ClientIntent.$meta.fields = [];
    nmnph_ClientIntentionPacket.$meta.methods = [];
},
jl_Class_getFields = $this => {
    let $fieldList, var$2, var$3, var$4, var$5, $field;
    if (!jl_Class_isPrimitive($this) && !jl_Class_isArray($this)) {
        if ($this.$fields === null) {
            a: {
                $fieldList = ju_ArrayList__init_1();
                if (jl_Class_isInterface($this))
                    jl_Class_getFieldsOfInterfaces($this, $fieldList, ju_HashSet__init_1());
                else {
                    var$2 = $this;
                    while (true) {
                        if (var$2 === null)
                            break a;
                        var$3 = (jl_Class_getDeclaredFields(var$2)).data;
                        var$4 = var$3.length;
                        var$5 = 0;
                        while (var$5 < var$4) {
                            $field = var$3[var$5];
                            if (jlr_Modifier_isPublic($field.$getModifiers0()))
                                $fieldList.$add($field);
                            var$5 = var$5 + 1 | 0;
                        }
                        var$2 = jl_Class_getSuperclass(var$2);
                    }
                }
            }
            $this.$fields = $fieldList.$toArray($rt_createArray(jlr_Field, $fieldList.$size()));
        }
        return $this.$fields.$clone0();
    }
    return $rt_createArray(jlr_Field, 0);
},
jl_Class_getDeclaredConstructors = $this => {
    let var$1, $jsMethods, $count, $i, $jsMethod, $jsParameterTypes, $parameterTypes, $j, var$9, var$10, var$11, var$12, var$13;
    if (!jl_Class_isPrimitive($this) && !jl_Class_isArray($this)) {
        if ($this.$declaredConstructors === null) {
            jl_Class_initReflection();
            var$1 = (jl_Class_getPlatformClass($this)).$meta;
            $jsMethods = var$1.methods;
            $this.$declaredConstructors = $rt_createArray(jlr_Constructor, $jsMethods.length);
            $count = 0;
            $i = 0;
            while ($i < $jsMethods.length) {
                $jsMethod = otji_JSWrapper_maybeUnwrap($jsMethods[$i]);
                if ($rt_str($jsMethod.name).$equals($rt_s(65))) {
                    $jsParameterTypes = $jsMethod.parameterTypes;
                    $parameterTypes = $rt_createArray(jl_Class, $jsParameterTypes.length);
                    $j = 0;
                    while (true) {
                        var$9 = $parameterTypes.data;
                        if ($j >= var$9.length)
                            break;
                        var$9[$j] = jl_Class_getClass($jsParameterTypes[$j]);
                        $j = $j + 1 | 0;
                    }
                    var$9 = $this.$declaredConstructors.data;
                    var$10 = $count + 1 | 0;
                    var$11 = new jlr_Constructor;
                    var$1 = $rt_str($jsMethod.name);
                    var$12 = $jsMethod.modifiers;
                    var$13 = $jsMethod.accessLevel;
                    jlr_Constructor__init_(var$11, $this, var$1, var$12, var$13, $parameterTypes, otcir_MethodCaller_forJs(otji_JS_functionAsObject($jsMethod.callable, "call")));
                    var$9[$count] = var$11;
                    $count = var$10;
                }
                $i = $i + 1 | 0;
            }
            $this.$declaredConstructors = ju_Arrays_copyOf($this.$declaredConstructors, $count);
        }
        return $this.$declaredConstructors.$clone0();
    }
    return $rt_createArray(jlr_Constructor, 0);
},
jl_Class_getConstructor = ($this, $parameterTypes) => {
    let var$2, var$3, var$4, $constructor;
    var$2 = (jl_Class_getDeclaredConstructors($this)).data;
    var$3 = var$2.length;
    var$4 = 0;
    while (true) {
        if (var$4 >= var$3)
            $rt_throw(jl_NoSuchMethodException__init_0());
        $constructor = var$2[var$4];
        if (jlr_Modifier_isPublic($constructor.$getModifiers0()) && ju_Arrays_equals($constructor.$getParameterTypes(), $parameterTypes))
            break;
        var$4 = var$4 + 1 | 0;
    }
    return $constructor;
},
jl_Class_getFieldsOfInterfaces = ($iface, $fields, $visited) => {
    let var$4, var$5, var$6, $field, $superInterface;
    if (!$visited.$add($iface))
        return;
    var$4 = (jl_Class_getDeclaredFields($iface)).data;
    var$5 = var$4.length;
    var$6 = 0;
    while (var$6 < var$5) {
        $field = var$4[var$6];
        if (jlr_Modifier_isPublic($field.$getModifiers0()))
            $fields.$add($field);
        var$6 = var$6 + 1 | 0;
    }
    var$4 = (jl_Class_getInterfaces($iface)).data;
    var$5 = var$4.length;
    var$6 = 0;
    while (var$6 < var$5) {
        $superInterface = var$4[var$6];
        jl_Class_getFieldsOfInterfaces($superInterface, $fields, $visited);
        var$6 = var$6 + 1 | 0;
    }
},
jl_Class_getDeclaredMethods = $this => {
    let var$1, $jsMethods, $count, $i, $jsMethod, $jsParameterTypes, $parameterTypes, $j, var$9, $returnType, var$11, var$12, var$13, var$14;
    if (!jl_Class_isPrimitive($this) && !jl_Class_isArray($this)) {
        if ($this.$declaredMethods === null) {
            jl_Class_initReflection();
            var$1 = (jl_Class_getPlatformClass($this)).$meta;
            $jsMethods = var$1.methods;
            $this.$declaredMethods = $rt_createArray(jlr_Method, $jsMethods.length);
            $count = 0;
            $i = 0;
            while ($i < $jsMethods.length) {
                $jsMethod = otji_JSWrapper_maybeUnwrap($jsMethods[$i]);
                if (!$rt_str($jsMethod.name).$equals($rt_s(65)) && !$rt_str($jsMethod.name).$equals($rt_s(66))) {
                    $jsParameterTypes = $jsMethod.parameterTypes;
                    $parameterTypes = $rt_createArray(jl_Class, $jsParameterTypes.length);
                    $j = 0;
                    while (true) {
                        var$9 = $parameterTypes.data;
                        if ($j >= var$9.length)
                            break;
                        var$9[$j] = jl_Class_getClass($jsParameterTypes[$j]);
                        $j = $j + 1 | 0;
                    }
                    $returnType = jl_Class_getClass($jsMethod.returnType);
                    var$9 = $this.$declaredMethods.data;
                    var$11 = $count + 1 | 0;
                    var$12 = new jlr_Method;
                    var$1 = $rt_str($jsMethod.name);
                    var$13 = $jsMethod.modifiers;
                    var$14 = $jsMethod.accessLevel;
                    jlr_Method__init_(var$12, $this, var$1, var$13, var$14, $returnType, $parameterTypes, otcir_MethodCaller_forJs(otji_JS_functionAsObject($jsMethod.callable, "call")));
                    var$9[$count] = var$12;
                    $count = var$11;
                }
                $i = $i + 1 | 0;
            }
            $this.$declaredMethods = ju_Arrays_copyOf($this.$declaredMethods, $count);
        }
        return $this.$declaredMethods.$clone0();
    }
    return $rt_createArray(jlr_Method, 0);
},
jl_Class_getMethod = ($this, $name, $parameterTypes) => {
    let $method;
    $method = jl_Class_findMethod($this, null, $name, $parameterTypes);
    if ($method !== null)
        return $method;
    $rt_throw(jl_NoSuchMethodException__init_0());
},
jl_Class_findMethod = ($cls, $current, $name, $parameterTypes) => {
    let var$5, var$6, var$7, $method, $superclass, var$10, $iface;
    var$5 = (jl_Class_getDeclaredMethods($cls)).data;
    var$6 = var$5.length;
    var$7 = 0;
    while (var$7 < var$6) {
        $method = var$5[var$7];
        if (jlr_Modifier_isPublic($method.$getModifiers0()) && ($method.$getName()).$equals($name) && ju_Arrays_equals($method.$getParameterTypes(), $parameterTypes) && !($current !== null && !jl_Class_isAssignableFrom($current.$getReturnType(), $method.$getReturnType())))
            $current = $method;
        var$7 = var$7 + 1 | 0;
    }
    if (!jl_Class_isInterface($cls)) {
        $superclass = jl_Class_getSuperclass($cls);
        if ($superclass !== null)
            $current = jl_Class_findMethod($superclass, $current, $name, $parameterTypes);
    }
    var$10 = (jl_Class_getInterfaces($cls)).data;
    var$7 = var$10.length;
    var$6 = 0;
    while (var$6 < var$7) {
        $iface = var$10[var$6];
        $current = jl_Class_findMethod($iface, $current, $name, $parameterTypes);
        var$6 = var$6 + 1 | 0;
    }
    return $current;
},
jl_Class_getSuperclass = $this => {
    return jl_Class_getClass($this.$platformClass.$meta.superclass);
},
jl_Class_getInterfaces = $this => {
    let $supertypes, $filteredSupertypes, $j, $i, var$5, var$6;
    $supertypes = $this.$platformClass.$meta.supertypes;
    $filteredSupertypes = $rt_createArray(jl_Class, $supertypes.length);
    $j = 0;
    $i = 0;
    while ($i < $supertypes.length) {
        if ($supertypes[$i] !== $this.$platformClass.$meta.superclass) {
            var$5 = $filteredSupertypes.data;
            var$6 = $j + 1 | 0;
            var$5[$j] = jl_Class_getClass($supertypes[$i]);
            $j = var$6;
        }
        $i = $i + 1 | 0;
    }
    if ($filteredSupertypes.data.length > $j)
        $filteredSupertypes = ju_Arrays_copyOf($filteredSupertypes, $j);
    return $filteredSupertypes;
},
jl_Class_initialize = $this => {
    $this.$platformClass.$clinit();
},
jl_Float = $rt_classWithoutFields(jl_Number),
jl_Float_TYPE = null,
jl_Float_$callClinit = () => {
    jl_Float_$callClinit = $rt_eraseClinit(jl_Float);
    jl_Float__clinit_();
},
jl_Float__clinit_ = () => {
    jl_Float_TYPE = $rt_cls($rt_floatcls);
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf0 = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf = ($original, $newLength) => {
    let var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($original)), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_binarySearch = ($a, $key) => {
    return ju_Arrays_binarySearch0($a, 0, $a.data.length, $key);
},
ju_Arrays_binarySearch0 = ($a, $fromIndex, $toIndex, $key) => {
    let $u, var$6, $i, $e, var$9;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    $u = $toIndex - 1 | 0;
    while (true) {
        if ($fromIndex > $u)
            return ( -$fromIndex | 0) - 1 | 0;
        var$6 = $a.data;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $e = var$6[$i];
        var$9 = $rt_compare($e, $key);
        if (!var$9)
            break;
        if (var$9 <= 0)
            $fromIndex = $i + 1 | 0;
        else
            $u = $i - 1 | 0;
    }
    return $i;
},
ju_Arrays_mismatchImpl = ($a, $aStart, $a2, $a2Start, $length) => {
    let $i, var$7;
    $i = 0;
    while (true) {
        if ($i >= $length)
            return (-1);
        var$7 = $a2.data;
        if (!ju_Objects_equals($a.data[$i + $aStart | 0], var$7[$i + $a2Start | 0]))
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
ju_Arrays_equals = ($a, $a2) => {
    let var$3, var$4;
    if ($a === $a2)
        return 1;
    if ($a !== null && $a2 !== null) {
        var$3 = $a2.data;
        var$4 = $a.data.length;
        if (var$4 == var$3.length)
            return ju_Arrays_mismatchImpl($a, 0, $a2, 0, var$4) >= 0 ? 0 : 1;
    }
    return 0;
},
agj = $rt_classWithoutFields(0),
jl_System = $rt_classWithoutFields(),
jl_System_outCache = null,
jl_System_errCache = null,
jl_System_out = () => {
    if (jl_System_outCache === null)
        jl_System_outCache = otcic_JSStdoutPrintStream__init_0();
    return jl_System_outCache;
},
jl_System_err = () => {
    if (jl_System_errCache === null)
        jl_System_errCache = otcic_JSStderrPrintStream__init_0();
    return jl_System_errCache;
},
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
            var$6 = $destPos + $length | 0;
            if (var$6 <= jlr_Array_getLength($dest)) {
                a: {
                    b: {
                        if ($src !== $dest) {
                            $srcType = jl_Class_getComponentType(jl_Object_getClass($src));
                            $targetType = jl_Class_getComponentType(jl_Object_getClass($dest));
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break b;
                                if (!jl_Class_isPrimitive($srcType) && !jl_Class_isPrimitive($targetType)) {
                                    $srcArray = $src;
                                    $i = 0;
                                    var$6 = $srcPos;
                                    while ($i < $length) {
                                        var$11 = $srcArray.data;
                                        var$12 = var$6 + 1 | 0;
                                        $elem = var$11[var$6];
                                        if (!jl_Class_isInstance($targetType, $elem)) {
                                            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                            $rt_throw(jl_ArrayStoreException__init_());
                                        }
                                        $i = $i + 1 | 0;
                                        var$6 = var$12;
                                    }
                                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                    return;
                                }
                                if (!jl_Class_isPrimitive($srcType))
                                    break a;
                                if (jl_Class_isPrimitive($targetType))
                                    break b;
                                else
                                    break a;
                            }
                            $rt_throw(jl_ArrayStoreException__init_());
                        }
                    }
                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                    return;
                }
                $rt_throw(jl_ArrayStoreException__init_());
            }
        }
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    $rt_throw(jl_NullPointerException__init_2($rt_s(67)));
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let var$6;
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
        var$6 = $destPos + $length | 0;
        if (var$6 <= jlr_Array_getLength($dest)) {
            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
            return;
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
jm_Conversion = $rt_classWithoutFields(),
jm_Conversion_digitFitInInt = null,
jm_Conversion_bigRadices = null;
let jm_Conversion_$callClinit = () => {
    jm_Conversion_$callClinit = $rt_eraseClinit(jm_Conversion);
    jm_Conversion__clinit_();
},
jm_Conversion_bigInteger2Double = var$1 => {
    let var$2, var$3, var$4, var$5, $mantissa, var$7, $resSign, var$9, $result;
    jm_Conversion_$callClinit();
    a: {
        if (var$1.$numberLength >= 2) {
            if (var$1.$numberLength != 2)
                break a;
            if (var$1.$digits.data[1] <= 0)
                break a;
        }
        return Long_toNumber(var$1.$longValue());
    }
    if (var$1.$numberLength > 32)
        return var$1.$sign <= 0 ? (-Infinity) : Infinity;
    var$2 = (var$1.$abs1()).$bitLength0();
    var$3 = Long_fromInt(var$2 - 1 | 0);
    var$4 = var$2 - 54 | 0;
    var$5 = ((var$1.$abs1()).$shiftRight0(var$4)).$longValue();
    $mantissa = Long_and(var$5, Long_create(4294967295, 2097151));
    if (Long_eq(var$3, Long_fromInt(1023))) {
        if (Long_eq($mantissa, Long_create(4294967295, 2097151)))
            return var$1.$sign <= 0 ? (-Infinity) : Infinity;
        if (Long_eq($mantissa, Long_create(4294967294, 2097151)))
            return var$1.$sign <= 0 ? (-1.7976931348623157E308) : 1.7976931348623157E308;
    }
    if (!(!(Long_eq(Long_and($mantissa, Long_fromInt(1)), Long_fromInt(1)) && Long_eq(Long_and($mantissa, Long_fromInt(2)), Long_fromInt(2))) && !jm_BitLevel_nonZeroDroppedBits(var$4, var$1.$digits)))
        $mantissa = Long_add($mantissa, Long_fromInt(2));
    var$7 = Long_shr($mantissa, 1);
    $resSign = var$1.$sign >= 0 ? Long_ZERO : Long_create(0, 2147483648);
    var$9 = Long_and(Long_shl(Long_add(Long_fromInt(1023), var$3), 52), Long_create(0, 2146435072));
    $result = Long_or(Long_or($resSign, var$9), var$7);
    return $rt_longBitsToDouble($result);
},
jm_Conversion__clinit_ = () => {
    jm_Conversion_digitFitInInt = $rt_createIntArrayFromData([(-1), (-1), 31, 19, 15, 13, 11, 11, 10, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5]);
    jm_Conversion_bigRadices = $rt_createIntArrayFromData([(-2147483648), 1162261467, 1073741824, 1220703125, 362797056, 1977326743, 1073741824, 387420489, 1000000000, 214358881, 429981696, 815730721, 1475789056, 170859375, 268435456, 410338673, 612220032, 893871739, 1280000000, 1801088541, 113379904, 148035889, 191102976, 244140625, 308915776, 387420489, 481890304, 594823321, 729000000, 887503681, 1073741824, 1291467969, 1544804416, 1838265625, 60466176]);
},
p_ClientMain = $rt_classWithoutFields(),
p_ClientMain_KEEPALIVE_JSNETBRIDGE = null,
p_ClientMain_KEEPALIVE_NETBRIDGE = null,
p_ClientMain_$callClinit = () => {
    p_ClientMain_$callClinit = $rt_eraseClinit(p_ClientMain);
    p_ClientMain__clinit_();
},
p_ClientMain_main = $args => {
    let $connection, var$3, var$4, $e, var$6, $$je;
    p_ClientMain_$callClinit();
    console.log('[JsNetBridge] Diagnostic: JSBody executed');
    $connection = nmn_MinecraftClientConnection__init_0(null);
    pn_NetBridge_attach();
    pn_NetBridge_setConnection($connection);
    window.NetBridge_writePacket = pn_NetBridge_writePacket;
    window.NetBridge_receivePacket = pn_JsNetBridge_onReceiveFrame;
    a: {
        try {
            pn_JsNetBridge_onReceiveFrame(new Uint8Array(0));
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                var$3 = jl_System_out();
                var$4 = $e.$getMessage();
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(68)), var$4);
                var$3.$println1(jl_StringBuilder_toString(var$6));
                break a;
            } else {
                throw $$e;
            }
        }
    }
    b: {
        try {
            pn_NetBridge_writePacket(0, $rt_createByteArray(0));
            break b;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                var$3 = jl_System_out();
                var$4 = $e.$getMessage();
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(69)), var$4);
                var$3.$println1(jl_StringBuilder_toString(var$6));
                break b;
            } else {
                throw $$e;
            }
        }
    }
    c: {
        try {
            pn_JsNetBridge_joinServer$js_body$_14("localhost", 0);
            break c;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                var$3 = jl_System_out();
                var$4 = $e.$getMessage();
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(70)), var$4);
                var$3.$println1(jl_StringBuilder_toString(var$6));
                break c;
            } else {
                throw $$e;
            }
        }
    }
    d: {
        try {
            pn_JsNetBridge_callJoinServer($rt_s(71), 0);
            break d;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                var$3 = jl_System_out();
                var$4 = $e.$getMessage();
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(72)), var$4);
                var$3.$println1(jl_StringBuilder_toString(var$6));
                break d;
            } else {
                throw $$e;
            }
        }
    }
    e: {
        try {
            $connection.$initiateHandshake($rt_s(71), 0);
            break e;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                var$3 = jl_System_out();
                var$4 = $e.$getMessage();
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(73)), var$4);
                var$3.$println1(jl_StringBuilder_toString(var$6));
                break e;
            } else {
                throw $$e;
            }
        }
    }
    f: {
        try {
            window.JsNetBridge_callInitiateHandshake = pn_JsNetBridge_callInitiateHandshake;
            break f;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                var$3 = jl_System_out();
                var$4 = $e.$getMessage();
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(74)), var$4);
                var$3.$println1(jl_StringBuilder_toString(var$6));
                break f;
            } else {
                throw $$e;
            }
        }
    }
    g: {
        try {
            window.JsNetBridge_callJoinServer = pn_JsNetBridge_callJoinServer;
            break g;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                var$3 = jl_System_out();
                var$4 = $e.$getMessage();
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(75)), var$4);
                var$3.$println1(jl_StringBuilder_toString(var$6));
                break g;
            } else {
                throw $$e;
            }
        }
    }
    h: {
        try {
            $connection.$initiateHandshake($rt_s(71), 0);
            break h;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                var$3 = jl_System_out();
                var$4 = $e.$getMessage();
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(73)), var$4);
                var$3.$println1(jl_StringBuilder_toString(var$6));
                break h;
            } else {
                throw $$e;
            }
        }
    }
    (jl_System_out()).$println1($rt_s(76));
    pr_RenderLoop_bindFrameCallback$js_body$_2();
    pr_RenderLoop_start();
},
p_ClientMain__clinit_ = () => {
    p_ClientMain_KEEPALIVE_JSNETBRIDGE = $rt_cls(pn_JsNetBridge);
    p_ClientMain_KEEPALIVE_NETBRIDGE = $rt_cls(pn_NetBridge);
};
function jm_BigDecimal() {
    let a = this; jl_Number.call(a);
    a.$intVal = null;
    a.$bitLength3 = 0;
    a.$smallValue = Long_ZERO;
    a.$scale0 = 0;
    a.$precision1 = 0;
}
let jm_BigDecimal_ZERO = null,
jm_BigDecimal_ONE = null,
jm_BigDecimal_TEN = null,
jm_BigDecimal_FIVE_POW = null,
jm_BigDecimal_TEN_POW = null,
jm_BigDecimal_LONG_TEN_POW = null,
jm_BigDecimal_LONG_FIVE_POW = null,
jm_BigDecimal_LONG_FIVE_POW_BIT_LENGTH = null,
jm_BigDecimal_LONG_TEN_POW_BIT_LENGTH = null,
jm_BigDecimal_BI_SCALED_BY_ZERO = null,
jm_BigDecimal_ZERO_SCALED_BY = null,
jm_BigDecimal_CH_ZEROS = null,
jm_BigDecimal_$callClinit = () => {
    jm_BigDecimal_$callClinit = $rt_eraseClinit(jm_BigDecimal);
    jm_BigDecimal__clinit_();
},
jm_BigDecimal__init_6 = ($this, $smallValue, $scale) => {
    jm_BigDecimal_$callClinit();
    jl_Number__init_($this);
    $this.$smallValue = $smallValue;
    $this.$scale0 = $scale;
    $this.$bitLength3 = jm_BigDecimal_bitLength($smallValue);
},
jm_BigDecimal__init_1 = (var_0, var_1) => {
    let var_2 = new jm_BigDecimal();
    jm_BigDecimal__init_6(var_2, var_0, var_1);
    return var_2;
},
jm_BigDecimal__init_4 = ($this, $smallValue, $scale) => {
    jm_BigDecimal_$callClinit();
    jl_Number__init_($this);
    $this.$smallValue = Long_fromInt($smallValue);
    $this.$scale0 = $scale;
    $this.$bitLength3 = jm_BigDecimal_bitLength0($smallValue);
},
jm_BigDecimal__init_ = (var_0, var_1) => {
    let var_2 = new jm_BigDecimal();
    jm_BigDecimal__init_4(var_2, var_0, var_1);
    return var_2;
},
jm_BigDecimal__init_2 = ($this, $val) => {
    jm_BigDecimal_$callClinit();
    jm_BigDecimal__init_0($this, $val, 0);
},
jm_BigDecimal__init_5 = var_0 => {
    let var_1 = new jm_BigDecimal();
    jm_BigDecimal__init_2(var_1, var_0);
    return var_1;
},
jm_BigDecimal__init_0 = ($this, $unscaledVal, $scale) => {
    jm_BigDecimal_$callClinit();
    jl_Number__init_($this);
    if ($unscaledVal !== null) {
        $this.$scale0 = $scale;
        jm_BigDecimal_setUnscaledValue($this, $unscaledVal);
        return;
    }
    $rt_throw(jl_NullPointerException__init_());
},
jm_BigDecimal__init_3 = (var_0, var_1) => {
    let var_2 = new jm_BigDecimal();
    jm_BigDecimal__init_0(var_2, var_0, var_1);
    return var_2;
},
jm_BigDecimal_valueOf0 = ($unscaledVal, $scale) => {
    jm_BigDecimal_$callClinit();
    if (!$scale)
        return jm_BigDecimal_valueOf($unscaledVal);
    if (Long_eq($unscaledVal, Long_ZERO) && $scale >= 0 && $scale < jm_BigDecimal_ZERO_SCALED_BY.data.length)
        return jm_BigDecimal_ZERO_SCALED_BY.data[$scale];
    return jm_BigDecimal__init_1($unscaledVal, $scale);
},
jm_BigDecimal_valueOf = $unscaledVal => {
    jm_BigDecimal_$callClinit();
    if (Long_ge($unscaledVal, Long_ZERO) && Long_lt($unscaledVal, Long_fromInt(11)))
        return jm_BigDecimal_BI_SCALED_BY_ZERO.data[Long_lo($unscaledVal)];
    return jm_BigDecimal__init_1($unscaledVal, 0);
},
jm_BigDecimal_multiply = ($this, $multiplicand) => {
    let $newScale, var$3, var$4, var$5;
    $newScale = Long_add(Long_fromInt($this.$scale0), Long_fromInt($multiplicand.$scale0));
    if (!jm_BigDecimal_isZero($this) && !jm_BigDecimal_isZero($multiplicand)) {
        if (($this.$bitLength3 + $multiplicand.$bitLength3 | 0) < 64)
            return jm_BigDecimal_valueOf0(Long_mul($this.$smallValue, $multiplicand.$smallValue), jm_BigDecimal_toIntScale($newScale));
        var$3 = new jm_BigDecimal;
        var$4 = jm_BigDecimal_getUnscaledValue($this);
        var$5 = jm_BigDecimal_getUnscaledValue($multiplicand);
        var$4 = var$4.$multiply0(var$5);
        jm_BigDecimal__init_0(var$3, var$4, jm_BigDecimal_toIntScale($newScale));
        return var$3;
    }
    return jm_BigDecimal_zeroScaledBy($newScale);
},
jm_BigDecimal_signum = $this => {
    if ($this.$bitLength3 >= 64)
        return (jm_BigDecimal_getUnscaledValue($this)).$signum();
    return jl_Long_signum($this.$smallValue);
},
jm_BigDecimal_isZero = $this => {
    return !$this.$bitLength3 && Long_ne($this.$smallValue, Long_fromInt(-1)) ? 1 : 0;
},
jm_BigDecimal_scale = $this => {
    return $this.$scale0;
},
jm_BigDecimal_precision = $this => {
    let $bitLength, $decimalDigits, $doubleUnsc, var$4;
    if ($this.$precision1 > 0)
        return $this.$precision1;
    $bitLength = $this.$bitLength3;
    $decimalDigits = 1;
    $doubleUnsc = 1.0;
    if ($bitLength >= 1024) {
        var$4 = 1.0 + ($bitLength - 1 | 0) * 0.3010299956639812 | 0;
        if (((jm_BigDecimal_getUnscaledValue($this)).$divide0(jm_Multiplication_powerOf10(Long_fromInt(var$4)))).$signum())
            var$4 = var$4 + 1 | 0;
    } else {
        if ($bitLength >= 64)
            $doubleUnsc = (jm_BigDecimal_getUnscaledValue($this)).$doubleValue();
        else if ($bitLength >= 1)
            $doubleUnsc = Long_toNumber($this.$smallValue);
        var$4 = $decimalDigits + otcit_DoubleAnalyzer_fastIntLog10(jl_Math_abs1($doubleUnsc)) | 0;
    }
    $this.$precision1 = var$4;
    return $this.$precision1;
},
jm_BigDecimal_unscaledValue = $this => {
    return jm_BigDecimal_getUnscaledValue($this);
},
jm_BigDecimal_compareTo = ($this, $val) => {
    let $thisSign, $valueSign, var$4, $diffScale, $diffPrecision, var$7, $thisUnscaled, $valUnscaled;
    $thisSign = $this.$signum();
    $valueSign = $val.$signum();
    var$4 = $rt_compare($thisSign, $valueSign);
    if (var$4) {
        if (var$4 >= 0)
            return 1;
        return (-1);
    }
    if ($this.$scale0 == $val.$scale0 && $this.$bitLength3 < 64 && $val.$bitLength3 < 64)
        return Long_lt($this.$smallValue, $val.$smallValue) ? (-1) : Long_le($this.$smallValue, $val.$smallValue) ? 0 : 1;
    $diffScale = Long_sub(Long_fromInt($this.$scale0), Long_fromInt($val.$scale0));
    $diffPrecision = jm_BigDecimal_aproxPrecision($this) - jm_BigDecimal_aproxPrecision($val) | 0;
    var$7 = Long_fromInt($diffPrecision);
    if (Long_gt(var$7, Long_add($diffScale, Long_fromInt(1))))
        return $thisSign;
    if (Long_lt(var$7, Long_sub($diffScale, Long_fromInt(1))))
        return  -$thisSign | 0;
    $thisUnscaled = jm_BigDecimal_getUnscaledValue($this);
    $valUnscaled = jm_BigDecimal_getUnscaledValue($val);
    var$4 = Long_compare($diffScale, Long_ZERO);
    if (var$4 < 0)
        $thisUnscaled = $thisUnscaled.$multiply0(jm_Multiplication_powerOf10(Long_neg($diffScale)));
    else if (var$4 > 0)
        $valUnscaled = $valUnscaled.$multiply0(jm_Multiplication_powerOf10($diffScale));
    return $thisUnscaled.$compareTo0($valUnscaled);
},
jm_BigDecimal_aproxPrecision = $this => {
    return $this.$precision1 > 0 ? $this.$precision1 : (($this.$bitLength3 - 1 | 0) * 0.3010299956639812 | 0) + 1 | 0;
},
jm_BigDecimal_toIntScale = $longScale => {
    jm_BigDecimal_$callClinit();
    if (Long_lt($longScale, Long_fromInt(-2147483648)))
        $rt_throw(jl_ArithmeticException__init_($rt_s(77)));
    if (Long_le($longScale, Long_fromInt(2147483647)))
        return Long_lo($longScale);
    $rt_throw(jl_ArithmeticException__init_($rt_s(78)));
},
jm_BigDecimal_zeroScaledBy = $longScale => {
    let var$2;
    jm_BigDecimal_$callClinit();
    var$2 = Long_lo($longScale);
    if (Long_eq($longScale, Long_fromInt(var$2)))
        return jm_BigDecimal_valueOf0(Long_ZERO, var$2);
    if (Long_lt($longScale, Long_ZERO))
        return jm_BigDecimal__init_(0, (-2147483648));
    return jm_BigDecimal__init_(0, 2147483647);
},
jm_BigDecimal_getUnscaledValue = $this => {
    if ($this.$intVal === null)
        $this.$intVal = jm_BigInteger_valueOf($this.$smallValue);
    return $this.$intVal;
},
jm_BigDecimal_setUnscaledValue = ($this, $unscaledValue) => {
    $this.$intVal = $unscaledValue;
    $this.$bitLength3 = $unscaledValue.$bitLength0();
    if ($this.$bitLength3 < 64)
        $this.$smallValue = $unscaledValue.$longValue();
},
jm_BigDecimal_bitLength = $smallValue => {
    jm_BigDecimal_$callClinit();
    if (Long_lt($smallValue, Long_ZERO))
        $smallValue = Long_xor($smallValue, Long_fromInt(-1));
    return 64 - jl_Long_numberOfLeadingZeros($smallValue) | 0;
},
jm_BigDecimal_bitLength0 = $smallValue => {
    jm_BigDecimal_$callClinit();
    if ($smallValue < 0)
        $smallValue = $smallValue ^ (-1);
    return 32 - jl_Integer_numberOfLeadingZeros($smallValue) | 0;
},
jm_BigDecimal__clinit_ = () => {
    let $i, $j;
    jm_BigDecimal_ZERO = jm_BigDecimal__init_(0, 0);
    jm_BigDecimal_ONE = jm_BigDecimal__init_(1, 0);
    jm_BigDecimal_TEN = jm_BigDecimal__init_(10, 0);
    jm_BigDecimal_LONG_TEN_POW = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(1000), Long_fromInt(10000), Long_fromInt(100000), Long_fromInt(1000000), Long_fromInt(10000000), Long_fromInt(100000000), Long_fromInt(1000000000), Long_create(1410065408, 2), Long_create(1215752192, 23), Long_create(3567587328, 232), Long_create(1316134912, 2328), Long_create(276447232, 23283), Long_create(2764472320, 232830), Long_create(1874919424, 2328306), Long_create(1569325056, 23283064),
    Long_create(2808348672, 232830643)]);
    jm_BigDecimal_LONG_FIVE_POW = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(5), Long_fromInt(25), Long_fromInt(125), Long_fromInt(625), Long_fromInt(3125), Long_fromInt(15625), Long_fromInt(78125), Long_fromInt(390625), Long_fromInt(1953125), Long_fromInt(9765625), Long_fromInt(48828125), Long_fromInt(244140625), Long_fromInt(1220703125), Long_create(1808548329, 1), Long_create(452807053, 7), Long_create(2264035265, 35), Long_create(2730241733, 177), Long_create(766306777, 888), Long_create(3831533885, 4440),
    Long_create(1977800241, 22204), Long_create(1299066613, 111022), Long_create(2200365769, 555111), Long_create(2411894253, 2775557), Long_create(3469536673, 13877787), Long_create(167814181, 69388939), Long_create(839070905, 346944695), Long_create(4195354525, 1734723475)]);
    jm_BigDecimal_LONG_FIVE_POW_BIT_LENGTH = $rt_createIntArray(jm_BigDecimal_LONG_FIVE_POW.data.length);
    jm_BigDecimal_LONG_TEN_POW_BIT_LENGTH = $rt_createIntArray(jm_BigDecimal_LONG_TEN_POW.data.length);
    jm_BigDecimal_BI_SCALED_BY_ZERO = $rt_createArray(jm_BigDecimal, 11);
    jm_BigDecimal_ZERO_SCALED_BY = $rt_createArray(jm_BigDecimal, 11);
    jm_BigDecimal_CH_ZEROS = $rt_createCharArray(100);
    $i = 0;
    while ($i < jm_BigDecimal_ZERO_SCALED_BY.data.length) {
        jm_BigDecimal_BI_SCALED_BY_ZERO.data[$i] = jm_BigDecimal__init_($i, 0);
        jm_BigDecimal_ZERO_SCALED_BY.data[$i] = jm_BigDecimal__init_(0, $i);
        jm_BigDecimal_CH_ZEROS.data[$i] = 48;
        $i = $i + 1 | 0;
    }
    while ($i < jm_BigDecimal_CH_ZEROS.data.length) {
        jm_BigDecimal_CH_ZEROS.data[$i] = 48;
        $i = $i + 1 | 0;
    }
    $j = 0;
    while ($j < jm_BigDecimal_LONG_FIVE_POW_BIT_LENGTH.data.length) {
        jm_BigDecimal_LONG_FIVE_POW_BIT_LENGTH.data[$j] = jm_BigDecimal_bitLength(jm_BigDecimal_LONG_FIVE_POW.data[$j]);
        $j = $j + 1 | 0;
    }
    $j = 0;
    while ($j < jm_BigDecimal_LONG_TEN_POW_BIT_LENGTH.data.length) {
        jm_BigDecimal_LONG_TEN_POW_BIT_LENGTH.data[$j] = jm_BigDecimal_bitLength(jm_BigDecimal_LONG_TEN_POW.data[$j]);
        $j = $j + 1 | 0;
    }
    jm_Multiplication_$callClinit();
    jm_BigDecimal_TEN_POW = jm_Multiplication_bigTenPows;
    jm_BigDecimal_FIVE_POW = jm_Multiplication_bigFivePows;
},
pn_NetBridge = $rt_classWithoutFields(),
pn_NetBridge_open = 0,
pn_NetBridge_packetSequence = null,
pn_NetBridge_connection = null,
pn_NetBridge_VAR_INT_SCRATCH = null,
pn_NetBridge_$callClinit = () => {
    pn_NetBridge_$callClinit = $rt_eraseClinit(pn_NetBridge);
    pn_NetBridge__clinit_();
},
pn_NetBridge_setConnection = $connection => {
    pn_NetBridge_$callClinit();
    pn_NetBridge_connection = $connection;
},
pn_NetBridge_attach = () => {
    pn_NetBridge_$callClinit();
    pn_NetBridge_open = 1;
    pn_JsNetBridge_onAttach$js_body$_1();
},
pn_NetBridge_writePacket = ($packetId, $payload) => {
    let var$3, $packetIdLen, $payloadLen, $totalLen, $totalLenEncodedLen, $frame, $pos, var$10, var$11, var$12, var$13;
    pn_NetBridge_$callClinit();
    if (!pn_NetBridge_open) {
        (jl_System_out()).$println1($rt_s(79));
        return;
    }
    var$3 = $payload.data;
    $packetIdLen = pn_NetBridge_calculateVarIntLength($packetId);
    $payloadLen = var$3.length;
    $totalLen = $packetIdLen + $payloadLen | 0;
    $totalLenEncodedLen = pn_NetBridge_calculateVarIntLength($totalLen);
    $frame = pn_PacketPool_acquire($totalLenEncodedLen + $totalLen | 0);
    $pos = 0;
    var$10 = pn_NetBridge_writeVarInt($frame, $pos, $totalLen);
    var$10 = pn_NetBridge_writeVarInt($frame, var$10, $packetId);
    jl_System_fastArraycopy($payload, 0, $frame, var$10, $payloadLen);
    pn_JsNetBridge_sendBytes$js_body$_2(otji_JS_wrap($frame));
    pn_PacketPool_release($frame);
    var$11 = jl_System_out();
    var$12 = $rt_createArray(jl_Object, 3);
    var$3 = var$12.data;
    var$13 = pn_NetBridge_packetSequence;
    var$3[0] = jl_Integer_valueOf(juca_AtomicInteger_incrementAndGet(var$13));
    var$3[1] = jl_Integer_valueOf($packetId);
    var$3[2] = jl_Integer_valueOf($payloadLen);
    var$11.$printf($rt_s(80), var$12);
},
pn_NetBridge_joinServer = ($host, $port) => {
    let var$3, var$4, var$5;
    pn_NetBridge_$callClinit();
    if (!pn_NetBridge_open) {
        (jl_System_out()).$println1($rt_s(81));
        return;
    }
    pn_JsNetBridge_joinServer$js_body$_14($rt_ustr($host), $port);
    var$3 = jl_System_out();
    var$4 = $rt_createArray(jl_Object, 2);
    var$5 = var$4.data;
    var$5[0] = $host;
    var$5[1] = jl_Integer_valueOf($port);
    var$3.$printf($rt_s(82), var$4);
},
pn_NetBridge_isOpen = () => {
    pn_NetBridge_$callClinit();
    return pn_NetBridge_open;
},
pn_NetBridge_writeVarInt = ($buf, $offset, $value) => {
    let $pos, $b, var$6, $pos_0;
    pn_NetBridge_$callClinit();
    if ($value < 0)
        $rt_throw(jl_IllegalArgumentException__init_1($rt_s(83)));
    if ($value < 128) {
        $buf.data[$offset] = $value << 24 >> 24;
        return 1;
    }
    $pos = $offset;
    while (true) {
        $b = ($value & 127) << 24 >> 24;
        $value = $value >>> 7 | 0;
        if (!(!$value && !($b & 128)))
            $b = ($b | 128) << 24 >> 24;
        var$6 = $buf.data;
        $pos_0 = $pos + 1 | 0;
        var$6[$pos] = $b;
        if (!$value)
            break;
        $pos = $pos_0;
    }
    return $pos_0 - $offset | 0;
};
let pn_NetBridge_calculateVarIntLength = $value => {
    let $length;
    pn_NetBridge_$callClinit();
    if ($value < 0)
        $rt_throw(jl_IllegalArgumentException__init_1($rt_s(83)));
    $length = 0;
    while (true) {
        $value = $value >>> 7 | 0;
        $length = $length + 1 | 0;
        if (!$value)
            break;
        if ($length >= 5)
            break;
    }
    return $length;
},
pn_NetBridge__clinit_ = () => {
    pn_NetBridge_packetSequence = juca_AtomicInteger__init_0(0);
    pn_NetBridge_VAR_INT_SCRATCH = $rt_createIntArray(2);
},
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_characterCache = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_isValidCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return $codePoint >= 0 && $codePoint <= 1114111 ? 1 : 0;
},
jl_Character_highSurrogate = $codePoint => {
    let var$2;
    jl_Character_$callClinit();
    var$2 = $codePoint - 65536 | 0;
    return (55296 | var$2 >> 10 & 1023) & 65535;
},
jl_Character_lowSurrogate = $codePoint => {
    jl_Character_$callClinit();
    return (56320 | $codePoint & 1023) & 65535;
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character_toChars = $codePoint => {
    let var$2, var$3;
    jl_Character_$callClinit();
    if (!jl_Character_isValidCodePoint($codePoint))
        $rt_throw(jl_IllegalArgumentException__init_0());
    if ($codePoint < 65536) {
        var$2 = $rt_createCharArray(1);
        var$2.data[0] = $codePoint & 65535;
        return var$2;
    }
    var$2 = $rt_createCharArray(2);
    var$3 = var$2.data;
    var$3[0] = jl_Character_highSurrogate($codePoint);
    var$3[1] = jl_Character_lowSurrogate($codePoint);
    return var$2;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
};
function jt_FieldPosition() {
    jl_Object.call(this);
    this.$myField = 0;
}
let jt_FieldPosition__init_ = ($this, $field) => {
    jl_Object__init_($this);
    $this.$myField = $field;
},
jt_FieldPosition__init_0 = var_0 => {
    let var_1 = new jt_FieldPosition();
    jt_FieldPosition__init_(var_1, var_0);
    return var_1;
};
function jl_Object$monitorExit$lambda$_8_1() {
    jl_Object.call(this);
    this.$_0 = null;
}
let jl_Object$monitorExit$lambda$_8_1__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$_0 = var$1;
},
jl_Object$monitorExit$lambda$_8_1__init_0 = var_0 => {
    let var_1 = new jl_Object$monitorExit$lambda$_8_1();
    jl_Object$monitorExit$lambda$_8_1__init_(var_1, var_0);
    return var_1;
},
jl_Object$monitorExit$lambda$_8_1_run = var$0 => {
    jl_Object_lambda$monitorExit$2(var$0.$_0);
},
yz = $rt_classWithoutFields(0),
yx = $rt_classWithoutFields(0),
yx_a = ($$$0, $$$1) => {
    return yx$6__init_0($$$1, $$$0);
};
function ju_DuplicateFormatFlagsException() {
    ju_IllegalFormatException.call(this);
    this.$flags3 = null;
}
let ju_DuplicateFormatFlagsException__init_ = ($this, $flags) => {
    let var$2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(84)), $flags);
    ju_IllegalFormatException__init_($this, jl_StringBuilder_toString(var$2));
    $this.$flags3 = $flags;
},
ju_DuplicateFormatFlagsException__init_0 = var_0 => {
    let var_1 = new ju_DuplicateFormatFlagsException();
    ju_DuplicateFormatFlagsException__init_(var_1, var_0);
    return var_1;
};
function ju_MissingFormatWidthException() {
    ju_IllegalFormatException.call(this);
    this.$formatSpecifier = null;
}
let ju_MissingFormatWidthException__init_0 = ($this, $formatSpecifier) => {
    let var$2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(85)), $formatSpecifier);
    ju_IllegalFormatException__init_($this, jl_StringBuilder_toString(var$2));
    $this.$formatSpecifier = $formatSpecifier;
},
ju_MissingFormatWidthException__init_ = var_0 => {
    let var_1 = new ju_MissingFormatWidthException();
    ju_MissingFormatWidthException__init_0(var_1, var_0);
    return var_1;
},
zg = $rt_classWithoutFields(0),
zg_a = ($$$0, $$$1) => {
    return yx_a($$$0, $$$1);
},
otcir_ClassList = $rt_classWithoutFields(),
zi = $rt_classWithoutFields(jl_Record),
nmnph_ClientIntentionPacket$_clinit_$lambda$_14_1 = $rt_classWithoutFields(),
nmnph_ClientIntentionPacket$_clinit_$lambda$_14_1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
nmnph_ClientIntentionPacket$_clinit_$lambda$_14_1__init_0 = () => {
    let var_0 = new nmnph_ClientIntentionPacket$_clinit_$lambda$_14_1();
    nmnph_ClientIntentionPacket$_clinit_$lambda$_14_1__init_(var_0);
    return var_0;
},
nmnph_ClientIntentionPacket$_clinit_$lambda$_14_0 = $rt_classWithoutFields(),
nmnph_ClientIntentionPacket$_clinit_$lambda$_14_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
nmnph_ClientIntentionPacket$_clinit_$lambda$_14_0__init_0 = () => {
    let var_0 = new nmnph_ClientIntentionPacket$_clinit_$lambda$_14_0();
    nmnph_ClientIntentionPacket$_clinit_$lambda$_14_0__init_(var_0);
    return var_0;
},
jm_Multiplication = $rt_classWithoutFields(),
jm_Multiplication_tenPows = null,
jm_Multiplication_fivePows = null,
jm_Multiplication_bigTenPows = null,
jm_Multiplication_bigFivePows = null,
jm_Multiplication_$callClinit = () => {
    jm_Multiplication_$callClinit = $rt_eraseClinit(jm_Multiplication);
    jm_Multiplication__clinit_();
},
jm_Multiplication_multiply = ($x, $y) => {
    jm_Multiplication_$callClinit();
    return jm_Multiplication_karatsuba($x, $y);
},
jm_Multiplication_karatsuba = ($op1, $op2) => {
    let var$3, $ndiv2, $upperOp1, $upperOp2, $lowerOp1, $lowerOp2, $upper, $lower, $middle, var$12;
    jm_Multiplication_$callClinit();
    if ($op2.$numberLength <= $op1.$numberLength) {
        var$3 = $op2;
        $op2 = $op1;
        $op1 = var$3;
    }
    if ($op1.$numberLength < 63)
        return jm_Multiplication_multiplyPAP($op2, $op1);
    $ndiv2 = ($op2.$numberLength & (-2)) << 4;
    $upperOp1 = $op2.$shiftRight0($ndiv2);
    $upperOp2 = $op1.$shiftRight0($ndiv2);
    $lowerOp1 = $op2.$subtract0($upperOp1.$shiftLeft0($ndiv2));
    $lowerOp2 = $op1.$subtract0($upperOp2.$shiftLeft0($ndiv2));
    $upper = jm_Multiplication_karatsuba($upperOp1, $upperOp2);
    $lower = jm_Multiplication_karatsuba($lowerOp1, $lowerOp2);
    $middle = jm_Multiplication_karatsuba($upperOp1.$subtract0($lowerOp1), $lowerOp2.$subtract0($upperOp2));
    var$3 = ($middle.$add1($upper)).$add1($lower);
    var$3 = var$3.$shiftLeft0($ndiv2);
    var$12 = $upper.$shiftLeft0($ndiv2 << 1);
    return (var$12.$add1(var$3)).$add1($lower);
},
jm_Multiplication_multiplyPAP = ($a, $b) => {
    let $aLen, $bLen, $resLength, $resSign, $aDigits, $bDigits, $resDigits, $result, $val, $valueLo, $valueHi;
    jm_Multiplication_$callClinit();
    $aLen = $a.$numberLength;
    $bLen = $b.$numberLength;
    $resLength = $aLen + $bLen | 0;
    $resSign = $a.$sign == $b.$sign ? 1 : (-1);
    if ($resLength != 2) {
        $aDigits = $a.$digits;
        $bDigits = $b.$digits;
        $resDigits = $rt_createIntArray($resLength);
        jm_Multiplication_multArraysPAP($aDigits, $aLen, $bDigits, $bLen, $resDigits);
        $result = jm_BigInteger__init_($resSign, $resLength, $resDigits);
        jm_BigInteger_cutOffLeadingZeroes($result);
        return $result;
    }
    $val = jm_Multiplication_unsignedMultAddAdd($a.$digits.data[0], $b.$digits.data[0], 0, 0);
    $valueLo = Long_lo($val);
    $valueHi = Long_hi($val);
    return !$valueHi ? jm_BigInteger__init_0($resSign, $valueLo) : jm_BigInteger__init_($resSign, 2, $rt_createIntArrayFromData([$valueLo, $valueHi]));
},
jm_Multiplication_multArraysPAP = ($aDigits, $aLen, $bDigits, $bLen, $resDigits) => {
    jm_Multiplication_$callClinit();
    if ($aLen && $bLen) {
        if ($aLen == 1)
            $resDigits.data[$bLen] = jm_Multiplication_multiplyByInt($resDigits, $bDigits, $bLen, $aDigits.data[0]);
        else if ($bLen != 1)
            jm_Multiplication_multPAP($aDigits, $bDigits, $resDigits, $aLen, $bLen);
        else
            $resDigits.data[$aLen] = jm_Multiplication_multiplyByInt($resDigits, $aDigits, $aLen, $bDigits.data[0]);
        return;
    }
},
jm_Multiplication_multPAP = ($a, $b, $t, $aLen, $bLen) => {
    let $i, var$7, $carry, $aI, $j, var$11, var$12, var$13, var$14;
    jm_Multiplication_$callClinit();
    if ($a === $b && $aLen == $bLen) {
        jm_Multiplication_square($a, $aLen, $t);
        return;
    }
    $i = 0;
    while ($i < $aLen) {
        var$7 = $a.data;
        $carry = Long_ZERO;
        $aI = var$7[$i];
        $j = 0;
        while ($j < $bLen) {
            var$11 = $t.data;
            var$12 = $b.data[$j];
            var$13 = $i + $j | 0;
            var$14 = jm_Multiplication_unsignedMultAddAdd($aI, var$12, var$11[var$13], Long_lo($carry));
            var$11[var$13] = Long_lo(var$14);
            $carry = Long_shru(var$14, 32);
            $j = $j + 1 | 0;
        }
        $t.data[$i + $bLen | 0] = Long_lo($carry);
        $i = $i + 1 | 0;
    }
},
jm_Multiplication_multiplyByInt = ($res, $a, $aSize, $factor) => {
    let $carry, $i, var$7, var$8;
    jm_Multiplication_$callClinit();
    $carry = Long_ZERO;
    $i = 0;
    while ($i < $aSize) {
        var$7 = $res.data;
        var$8 = jm_Multiplication_unsignedMultAddAdd($a.data[$i], $factor, Long_lo($carry), 0);
        var$7[$i] = Long_lo(var$8);
        $carry = Long_shru(var$8, 32);
        $i = $i + 1 | 0;
    }
    return Long_lo($carry);
},
jm_Multiplication_pow = ($acc, $exponent) => {
    let $res, $acc_0, var$5;
    jm_Multiplication_$callClinit();
    jm_BigInteger_$callClinit();
    $res = jm_BigInteger_ONE;
    while ($exponent > 1) {
        if ($exponent & 1)
            $res = $res.$multiply0($acc);
        $acc_0 = $acc.$numberLength == 1 ? $acc.$multiply0($acc) : jm_BigInteger__init_6(1, jm_Multiplication_square($acc.$digits, $acc.$numberLength, $rt_createIntArray($acc.$numberLength << 1)));
        $exponent = $exponent >> 1;
        $acc = $acc_0;
    }
    var$5 = $res.$multiply0($acc);
    return var$5;
},
jm_Multiplication_square = ($a, $aLen, $res) => {
    let $i, $carry, $i_0, $j, var$8, var$9, var$10, var$11, var$12, var$13, $index;
    jm_Multiplication_$callClinit();
    $i = 0;
    while ($i < $aLen) {
        $carry = Long_ZERO;
        $i_0 = $i + 1 | 0;
        $j = $i_0;
        while ($j < $aLen) {
            var$8 = $res.data;
            var$9 = $a.data;
            var$10 = var$9[$i];
            var$11 = var$9[$j];
            var$12 = $i + $j | 0;
            var$13 = jm_Multiplication_unsignedMultAddAdd(var$10, var$11, var$8[var$12], Long_lo($carry));
            var$8[var$12] = Long_lo(var$13);
            $carry = Long_shru(var$13, 32);
            $j = $j + 1 | 0;
        }
        $res.data[$i + $aLen | 0] = Long_lo($carry);
        $i = $i_0;
    }
    jm_BitLevel_shiftLeftOneBit($res, $res, $aLen << 1);
    $carry = Long_ZERO;
    $i = 0;
    $index = 0;
    while ($i < $aLen) {
        var$8 = $res.data;
        var$9 = $a.data;
        var$13 = jm_Multiplication_unsignedMultAddAdd(var$9[$i], var$9[$i], var$8[$index], Long_lo($carry));
        var$8[$index] = Long_lo(var$13);
        var$13 = Long_shru(var$13, 32);
        var$11 = $index + 1 | 0;
        var$13 = Long_add(var$13, Long_and(Long_fromInt(var$8[var$11]), Long_create(4294967295, 0)));
        var$8[var$11] = Long_lo(var$13);
        $carry = Long_shru(var$13, 32);
        $i = $i + 1 | 0;
        $index = var$11 + 1 | 0;
    }
    return $res;
},
jm_Multiplication_powerOf10 = $exp => {
    let $intExp, $byteArraySize, $powerOfFive, $longExp, var$6, var$7, var$8;
    jm_Multiplication_$callClinit();
    $intExp = Long_lo($exp);
    if (Long_lt($exp, Long_fromInt(jm_Multiplication_bigTenPows.data.length)))
        return jm_Multiplication_bigTenPows.data[$intExp];
    if (Long_le($exp, Long_fromInt(50))) {
        jm_BigInteger_$callClinit();
        return jm_BigInteger_TEN.$pow0($intExp);
    }
    if (Long_le($exp, Long_fromInt(1000)))
        return (jm_Multiplication_bigFivePows.data[1].$pow0($intExp)).$shiftLeft0($intExp);
    $byteArraySize = Long_add(Long_fromInt(1), Long_fromNumber(Long_toNumber($exp) / 2.4082399653118496));
    if (Long_gt($byteArraySize, Long_fromInt(1000000)))
        $rt_throw(jl_ArithmeticException__init_($rt_s(86)));
    if (Long_le($exp, Long_fromInt(2147483647)))
        return (jm_Multiplication_bigFivePows.data[1].$pow0($intExp)).$shiftLeft0($intExp);
    $powerOfFive = jm_Multiplication_bigFivePows.data[1].$pow0(2147483647);
    $longExp = Long_sub($exp, Long_fromInt(2147483647));
    var$6 = Long_lo(Long_rem($exp, Long_fromInt(2147483647)));
    var$7 = $powerOfFive;
    var$8 = $longExp;
    while (Long_gt(var$8, Long_fromInt(2147483647))) {
        var$7 = var$7.$multiply0($powerOfFive);
        var$8 = Long_sub(var$8, Long_fromInt(2147483647));
    }
    var$7 = var$7.$multiply0(jm_Multiplication_bigFivePows.data[1].$pow0(var$6));
    var$7 = var$7.$shiftLeft0(2147483647);
    while (Long_gt($longExp, Long_fromInt(2147483647))) {
        var$7 = var$7.$shiftLeft0(2147483647);
        $longExp = Long_sub($longExp, Long_fromInt(2147483647));
    }
    var$7 = var$7.$shiftLeft0(var$6);
    return var$7;
},
jm_Multiplication_unsignedMultAddAdd = ($a, $b, $c, $d) => {
    jm_Multiplication_$callClinit();
    return Long_add(Long_add(Long_mul(Long_and(Long_fromInt($a), Long_create(4294967295, 0)), Long_and(Long_fromInt($b), Long_create(4294967295, 0))), Long_and(Long_fromInt($c), Long_create(4294967295, 0))), Long_and(Long_fromInt($d), Long_create(4294967295, 0)));
},
jm_Multiplication__clinit_ = () => {
    let $fivePow, $i, var$3, var$4, var$5;
    jm_Multiplication_tenPows = $rt_createIntArrayFromData([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]);
    jm_Multiplication_fivePows = $rt_createIntArrayFromData([1, 5, 25, 125, 625, 3125, 15625, 78125, 390625, 1953125, 9765625, 48828125, 244140625, 1220703125]);
    jm_Multiplication_bigTenPows = $rt_createArray(jm_BigInteger, 32);
    jm_Multiplication_bigFivePows = $rt_createArray(jm_BigInteger, 32);
    $fivePow = Long_fromInt(1);
    $i = 0;
    while ($i <= 18) {
        jm_Multiplication_bigFivePows.data[$i] = jm_BigInteger_valueOf($fivePow);
        jm_Multiplication_bigTenPows.data[$i] = jm_BigInteger_valueOf(Long_shl($fivePow, $i));
        $fivePow = Long_mul($fivePow, Long_fromInt(5));
        $i = $i + 1 | 0;
    }
    while ($i < jm_Multiplication_bigTenPows.data.length) {
        var$3 = jm_Multiplication_bigFivePows.data;
        var$4 = jm_Multiplication_bigFivePows.data;
        var$5 = $i - 1 | 0;
        var$3[$i] = var$4[var$5].$multiply0(jm_Multiplication_bigFivePows.data[1]);
        jm_Multiplication_bigTenPows.data[$i] = jm_Multiplication_bigTenPows.data[var$5].$multiply0(jm_BigInteger_TEN);
        $i = $i + 1 | 0;
    }
},
aii = $rt_classWithoutFields(jl_Enum),
aii_a = null,
aii_b = null,
aii_c = null,
aii_g = null,
aii_$callClinit = () => {
    aii_$callClinit = $rt_eraseClinit(aii);
    aii__clinit_();
},
aii__init_0 = ($this, var$1, var$2) => {
    aii_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
aii__init_ = (var_0, var_1) => {
    let var_2 = new aii();
    aii__init_0(var_2, var_0, var_1);
    return var_2;
},
aii_b0 = () => {
    let var$1, var$2;
    aii_$callClinit();
    var$1 = $rt_createArray(aii, 3);
    var$2 = var$1.data;
    var$2[0] = aii_a;
    var$2[1] = aii_b;
    var$2[2] = aii_c;
    return var$1;
},
aii__clinit_ = () => {
    aii_a = aii__init_($rt_s(22), 0);
    aii_b = aii__init_($rt_s(16), 1);
    aii_c = aii__init_($rt_s(23), 2);
    aii_g = aii_b0();
},
aij = $rt_classWithoutFields(jl_Record),
aij_a = null,
aij_$callClinit = () => {
    aij_$callClinit = $rt_eraseClinit(aij);
    aij__clinit_();
},
aij__clinit_ = () => {
    aij_a = zg_a(aij$_clinit_$lambda$_14_0__init_0(), aij$_clinit_$lambda$_14_1__init_0());
},
aim = $rt_classWithoutFields(0),
jl_Double = $rt_classWithoutFields(jl_Number),
jl_Double_TYPE = null,
jl_Double_$callClinit = () => {
    jl_Double_$callClinit = $rt_eraseClinit(jl_Double);
    jl_Double__clinit_();
},
jl_Double_doubleToLongBits = $value => {
    jl_Double_$callClinit();
    if (!(isNaN($value) ? 1 : 0))
        return $rt_doubleToRawLongBits($value);
    return Long_create(0, 2146959360);
},
jl_Double__clinit_ = () => {
    jl_Double_TYPE = $rt_cls($rt_doublecls);
},
jm_Elementary = $rt_classWithoutFields();
let jm_Elementary_compareArrays = ($a, $b, $size) => {
    let $i, var$5, var$6, var$7;
    $i = $size - 1 | 0;
    while ($i >= 0) {
        var$5 = $b.data;
        if ($a.data[$i] != var$5[$i])
            break;
        $i = $i + (-1) | 0;
    }
    if ($i < 0)
        var$6 = 0;
    else {
        var$7 = $b.data;
        var$6 = Long_ge(Long_and(Long_fromInt($a.data[$i]), Long_create(4294967295, 0)), Long_and(Long_fromInt(var$7[$i]), Long_create(4294967295, 0))) ? 1 : (-1);
    }
    return var$6;
},
jm_Elementary_add0 = ($op1, $op2) => {
    let $op1Sign, $op2Sign, $op1Len, $op2Len, $a, $b, $res, $valueLo, $valueHi, $resDigits, var$13, $cmp, var$15, $res_0;
    $op1Sign = $op1.$sign;
    $op2Sign = $op2.$sign;
    if (!$op1Sign)
        return $op2;
    if (!$op2Sign)
        return $op1;
    $op1Len = $op1.$numberLength;
    $op2Len = $op2.$numberLength;
    if (($op1Len + $op2Len | 0) == 2) {
        $a = Long_and(Long_fromInt($op1.$digits.data[0]), Long_create(4294967295, 0));
        $b = Long_and(Long_fromInt($op2.$digits.data[0]), Long_create(4294967295, 0));
        if ($op1Sign != $op2Sign)
            return jm_BigInteger_valueOf($op1Sign >= 0 ? Long_sub($a, $b) : Long_sub($b, $a));
        $res = Long_add($a, $b);
        $valueLo = Long_lo($res);
        $valueHi = Long_hi($res);
        return !$valueHi ? jm_BigInteger__init_0($op1Sign, $valueLo) : jm_BigInteger__init_($op1Sign, 2, $rt_createIntArrayFromData([$valueLo, $valueHi]));
    }
    if ($op1Sign == $op2Sign)
        $resDigits = $op1Len < $op2Len ? jm_Elementary_add($op2.$digits, $op2Len, $op1.$digits, $op1Len) : jm_Elementary_add($op1.$digits, $op1Len, $op2.$digits, $op2Len);
    else {
        var$13 = $rt_compare($op1Len, $op2Len);
        $cmp = !var$13 ? jm_Elementary_compareArrays($op1.$digits, $op2.$digits, $op1Len) : var$13 <= 0 ? (-1) : 1;
        if (!$cmp) {
            jm_BigInteger_$callClinit();
            return jm_BigInteger_ZERO;
        }
        if ($cmp != 1) {
            $resDigits = jm_Elementary_subtract($op2.$digits, $op2Len, $op1.$digits, $op1Len);
            $op1Sign = $op2Sign;
        } else
            $resDigits = jm_Elementary_subtract($op1.$digits, $op1Len, $op2.$digits, $op2Len);
    }
    var$15 = $resDigits.data;
    $res_0 = jm_BigInteger__init_($op1Sign, var$15.length, $resDigits);
    jm_BigInteger_cutOffLeadingZeroes($res_0);
    return $res_0;
},
jm_Elementary_add1 = ($res, $a, $aSize, $b, $bSize) => {
    let var$6, var$7, var$8, $carry, var$10, $i, var$12;
    var$6 = $res.data;
    var$7 = $b.data;
    var$8 = $a.data;
    $carry = Long_add(Long_and(Long_fromInt(var$8[0]), Long_create(4294967295, 0)), Long_and(Long_fromInt(var$7[0]), Long_create(4294967295, 0)));
    var$6[0] = Long_lo($carry);
    var$10 = Long_shr($carry, 32);
    if ($aSize < $bSize) {
        $i = 1;
        while ($i < $aSize) {
            var$12 = Long_add(var$10, Long_add(Long_and(Long_fromInt(var$8[$i]), Long_create(4294967295, 0)), Long_and(Long_fromInt(var$7[$i]), Long_create(4294967295, 0))));
            var$6[$i] = Long_lo(var$12);
            var$10 = Long_shr(var$12, 32);
            $i = $i + 1 | 0;
        }
        while ($i < $bSize) {
            var$12 = Long_add(var$10, Long_and(Long_fromInt(var$7[$i]), Long_create(4294967295, 0)));
            var$6[$i] = Long_lo(var$12);
            var$10 = Long_shr(var$12, 32);
            $i = $i + 1 | 0;
        }
    } else {
        $i = 1;
        while ($i < $bSize) {
            var$12 = Long_add(var$10, Long_add(Long_and(Long_fromInt(var$8[$i]), Long_create(4294967295, 0)), Long_and(Long_fromInt(var$7[$i]), Long_create(4294967295, 0))));
            var$6[$i] = Long_lo(var$12);
            var$10 = Long_shr(var$12, 32);
            $i = $i + 1 | 0;
        }
        while ($i < $aSize) {
            var$12 = Long_add(var$10, Long_and(Long_fromInt(var$8[$i]), Long_create(4294967295, 0)));
            var$6[$i] = Long_lo(var$12);
            var$10 = Long_shr(var$12, 32);
            $i = $i + 1 | 0;
        }
    }
    if (Long_ne(var$10, Long_ZERO))
        var$6[$i] = Long_lo(var$10);
},
jm_Elementary_subtract0 = ($op1, $op2) => {
    let $op1Sign, $op2Sign, $op1Len, $op2Len, $a, $b, var$9, $cmp, $resSign, $resDigits, var$13, $res;
    $op1Sign = $op1.$sign;
    $op2Sign = $op2.$sign;
    if (!$op2Sign)
        return $op1;
    if (!$op1Sign)
        return $op2.$negate();
    $op1Len = $op1.$numberLength;
    $op2Len = $op2.$numberLength;
    if (($op1Len + $op2Len | 0) == 2) {
        $a = Long_and(Long_fromInt($op1.$digits.data[0]), Long_create(4294967295, 0));
        $b = Long_and(Long_fromInt($op2.$digits.data[0]), Long_create(4294967295, 0));
        if ($op1Sign < 0)
            $a = Long_neg($a);
        if ($op2Sign < 0)
            $b = Long_neg($b);
        return jm_BigInteger_valueOf(Long_sub($a, $b));
    }
    var$9 = $rt_compare($op1Len, $op2Len);
    $cmp = !var$9 ? jm_Elementary_compareArrays($op1.$digits, $op2.$digits, $op1Len) : var$9 <= 0 ? (-1) : 1;
    if ($cmp == (-1)) {
        $resSign =  -$op2Sign | 0;
        $resDigits = $op1Sign != $op2Sign ? jm_Elementary_add($op2.$digits, $op2Len, $op1.$digits, $op1Len) : jm_Elementary_subtract($op2.$digits, $op2Len, $op1.$digits, $op1Len);
    } else if ($op1Sign != $op2Sign) {
        $resDigits = jm_Elementary_add($op1.$digits, $op1Len, $op2.$digits, $op2Len);
        $resSign = $op1Sign;
    } else {
        if (!$cmp) {
            jm_BigInteger_$callClinit();
            return jm_BigInteger_ZERO;
        }
        $resDigits = jm_Elementary_subtract($op1.$digits, $op1Len, $op2.$digits, $op2Len);
        $resSign = $op1Sign;
    }
    var$13 = $resDigits.data;
    $res = jm_BigInteger__init_($resSign, var$13.length, $resDigits);
    jm_BigInteger_cutOffLeadingZeroes($res);
    return $res;
},
jm_Elementary_subtract1 = ($res, $a, $aSize, $b, $bSize) => {
    let $borrow, $i, var$8, var$9, var$10;
    $borrow = Long_ZERO;
    $i = 0;
    while ($i < $bSize) {
        var$8 = $res.data;
        var$9 = $b.data;
        var$10 = Long_add($borrow, Long_sub(Long_and(Long_fromInt($a.data[$i]), Long_create(4294967295, 0)), Long_and(Long_fromInt(var$9[$i]), Long_create(4294967295, 0))));
        var$8[$i] = Long_lo(var$10);
        $borrow = Long_shr(var$10, 32);
        $i = $i + 1 | 0;
    }
    while ($i < $aSize) {
        var$9 = $res.data;
        var$10 = Long_add($borrow, Long_and(Long_fromInt($a.data[$i]), Long_create(4294967295, 0)));
        var$9[$i] = Long_lo(var$10);
        $borrow = Long_shr(var$10, 32);
        $i = $i + 1 | 0;
    }
},
jm_Elementary_add = ($a, $aSize, $b, $bSize) => {
    let $res;
    $res = $rt_createIntArray($aSize + 1 | 0);
    jm_Elementary_add1($res, $a, $aSize, $b, $bSize);
    return $res;
},
jm_Elementary_subtract = ($a, $aSize, $b, $bSize) => {
    let $res;
    $res = $rt_createIntArray($aSize);
    jm_Elementary_subtract1($res, $a, $aSize, $b, $bSize);
    return $res;
},
jl_Error = $rt_classWithoutFields(jl_Throwable),
jl_Error__init_ = ($this, $message, $cause) => {
    jl_Throwable__init_1($this, $message, $cause);
},
jl_Error__init_0 = (var_0, var_1) => {
    let var_2 = new jl_Error();
    jl_Error__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_FormatFlagsConversionMismatchException() {
    let a = this; ju_IllegalFormatException.call(a);
    a.$flags1 = null;
    a.$conversion0 = 0;
}
let ju_FormatFlagsConversionMismatchException__init_ = ($this, $flags, $conversion) => {
    let var$3;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(87)), $flags), $rt_s(88)), $conversion);
    ju_IllegalFormatException__init_($this, jl_StringBuilder_toString(var$3));
    $this.$flags1 = $flags;
    $this.$conversion0 = $conversion;
},
ju_FormatFlagsConversionMismatchException__init_0 = (var_0, var_1) => {
    let var_2 = new ju_FormatFlagsConversionMismatchException();
    ju_FormatFlagsConversionMismatchException__init_(var_2, var_0, var_1);
    return var_2;
},
jl_AssertionError = $rt_classWithoutFields(jl_Error),
jl_AssertionError__init_ = ($this, $message, $cause) => {
    jl_Error__init_($this, $message, $cause);
},
jl_AssertionError__init_0 = (var_0, var_1) => {
    let var_2 = new jl_AssertionError();
    jl_AssertionError__init_(var_2, var_0, var_1);
    return var_2;
},
pr_RenderLoop = $rt_classWithoutFields(),
pr_RenderLoop_running = 0,
pr_RenderLoop_lastFrameTime = Long_ZERO,
pr_RenderLoop_$callClinit = () => {
    pr_RenderLoop_$callClinit = $rt_eraseClinit(pr_RenderLoop);
    pr_RenderLoop__clinit_();
},
pr_RenderLoop_start = () => {
    pr_RenderLoop_$callClinit();
    if (pr_RenderLoop_running)
        return;
    pr_RenderLoop_running = 1;
    pr_RenderLoop_lastFrameTime = jl_System_currentTimeMillis();
    pr_RenderLoop_scheduleNextFrame$js_body$_3();
    (jl_System_out()).$println1($rt_s(89));
},
pr_RenderLoop__clinit_ = () => {
    pr_RenderLoop_running = 0;
    pr_RenderLoop_lastFrameTime = Long_ZERO;
},
pr_RenderLoop_bindFrameCallback$js_body$_2 = () => {
    window.__renderLoopFrame = function(timestamp) {
        window.poc.rendering.RenderLoop.onFrame(timestamp);
    };
    console.log('[RenderLoop] JS callback bound to window.__renderLoopFrame');
},
pr_RenderLoop_scheduleNextFrame$js_body$_3 = () => {
    if (typeof window.__renderLoopFrame !== 'function') {
        console.error('[RenderLoop] Frame callback not bound. Call bindFrameCallback() first.');
        return;
    }
    window.requestAnimationFrame(window.__renderLoopFrame);
},
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_AbstractList__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_AbstractList_iterator = $this => {
    return ju_AbstractList$1__init_0($this);
},
ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array0 = null;
    a.$size0 = 0;
}
let ju_ArrayList__init_0 = $this => {
    ju_ArrayList__init_($this, 10);
},
ju_ArrayList__init_1 = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
},
ju_ArrayList__init_ = ($this, $initialCapacity) => {
    ju_AbstractList__init_($this);
    if ($initialCapacity >= 0) {
        $this.$array0 = $rt_createArray(jl_Object, $initialCapacity);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
},
ju_ArrayList__init_2 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_(var_1, var_0);
    return var_1;
},
ju_ArrayList_ensureCapacity = ($this, $minCapacity) => {
    let $newLength;
    if ($this.$array0.data.length < $minCapacity) {
        $newLength = $this.$array0.data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($this.$array0.data.length * 2 | 0, 5));
        $this.$array0 = ju_Arrays_copyOf($this.$array0, $newLength);
    }
},
ju_ArrayList_get = ($this, $index) => {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array0.data[$index];
},
ju_ArrayList_size = $this => {
    return $this.$size0;
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3;
    $this.$ensureCapacity($this.$size0 + 1 | 0);
    var$2 = $this.$array0.data;
    var$3 = $this.$size0;
    $this.$size0 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    if ($index >= 0 && $index < $this.$size0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_IllegalMonitorStateException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalMonitorStateException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalMonitorStateException__init_0 = () => {
    let var_0 = new jl_IllegalMonitorStateException();
    jl_IllegalMonitorStateException__init_(var_0);
    return var_0;
},
jm_Division = $rt_classWithoutFields(),
jm_Division_divide = ($quot, $quotLength, $a, $j, $b, $bLength) => {
    let var$7, $normA, $normB, var$10, $divisorShift, var$12, $firstDivisorDigit, $i, var$15, $product, $res, $rem, $rOverflowed, var$20, var$21, var$22, $longR, var$24, $borrow, $carry, $k;
    var$7 = $b.data;
    $normA = $rt_createIntArray($j + 1 | 0);
    $normB = $rt_createIntArray($bLength + 1 | 0);
    var$10 = $bLength - 1 | 0;
    $divisorShift = jl_Integer_numberOfLeadingZeros(var$7[var$10]);
    if ($divisorShift) {
        jm_BitLevel_shiftLeft($normB, $b, 0, $divisorShift);
        jm_BitLevel_shiftLeft($normA, $a, 0, $divisorShift);
    } else {
        jl_System_fastArraycopy($a, 0, $normA, 0, $j);
        jl_System_fastArraycopy($b, 0, $normB, 0, $bLength);
    }
    var$12 = $normB.data;
    $firstDivisorDigit = var$12[var$10];
    $i = $quotLength - 1 | 0;
    while ($i >= 0) {
        a: {
            var$7 = $normA.data;
            if (var$7[$j] == $firstDivisorDigit)
                var$15 = (-1);
            else {
                $product = Long_add(Long_shl(Long_and(Long_fromInt(var$7[$j]), Long_create(4294967295, 0)), 32), Long_and(Long_fromInt(var$7[$j - 1 | 0]), Long_create(4294967295, 0)));
                $res = jm_Division_divideLongByInt($product, $firstDivisorDigit);
                var$15 = Long_lo($res);
                $rem = Long_hi($res);
                if (var$15) {
                    $rOverflowed = 0;
                    var$15 = var$15 + 1 | 0;
                    while (true) {
                        var$15 = var$15 + (-1) | 0;
                        if ($rOverflowed)
                            break;
                        var$20 = Long_mul(Long_and(Long_fromInt(var$15), Long_create(4294967295, 0)), Long_and(Long_fromInt(var$12[$bLength - 2 | 0]), Long_create(4294967295, 0)));
                        var$21 = Long_fromInt($rem);
                        var$22 = Long_add(Long_shl(var$21, 32), Long_and(Long_fromInt(var$7[$j - 2 | 0]), Long_create(4294967295, 0)));
                        $longR = Long_add(Long_and(var$21, Long_create(4294967295, 0)), Long_and(Long_fromInt($firstDivisorDigit), Long_create(4294967295, 0)));
                        if (jl_Integer_numberOfLeadingZeros(Long_hi($longR)) >= 32)
                            $rem = Long_lo($longR);
                        else
                            $rOverflowed = 1;
                        if (Long_le(Long_xor(var$20, Long_create(0, 2147483648)), Long_xor(var$22, Long_create(0, 2147483648))))
                            break a;
                    }
                }
            }
        }
        if (var$15) {
            var$24 = $j - $bLength | 0;
            $borrow = jm_Division_multiplyAndSubtract($normA, var$24, $normB, $bLength, var$15);
            if ($borrow) {
                var$15 = var$15 + (-1) | 0;
                $carry = Long_ZERO;
                $k = 0;
                while ($k < $bLength) {
                    var$10 = var$24 + $k | 0;
                    var$21 = Long_add($carry, Long_add(Long_and(Long_fromInt(var$7[var$10]), Long_create(4294967295, 0)), Long_and(Long_fromInt(var$12[$k]), Long_create(4294967295, 0))));
                    var$7[var$10] = Long_lo(var$21);
                    $carry = Long_shru(var$21, 32);
                    $k = $k + 1 | 0;
                }
            }
        }
        if ($quot !== null)
            $quot.data[$i] = var$15;
        $j = $j + (-1) | 0;
        $i = $i + (-1) | 0;
    }
    if ($divisorShift) {
        jm_BitLevel_shiftRight0($normB, $bLength, $normA, 0, $divisorShift);
        return $normB;
    }
    jl_System_fastArraycopy($normA, 0, $normB, 0, $bLength);
    return $normA;
},
jm_Division_divideArrayByInt = ($dest, $src, $srcLength, $divisor) => {
    let $rem, $bLong, $i, var$8, $temp, $quot, $aPos, $bPos, var$13;
    $rem = Long_ZERO;
    $bLong = Long_and(Long_fromInt($divisor), Long_create(4294967295, 0));
    $i = $srcLength - 1 | 0;
    while ($i >= 0) {
        var$8 = $src.data;
        $temp = Long_or(Long_shl($rem, 32), Long_and(Long_fromInt(var$8[$i]), Long_create(4294967295, 0)));
        if (Long_ge($temp, Long_ZERO)) {
            $quot = Long_div($temp, $bLong);
            $rem = Long_rem($temp, $bLong);
        } else {
            $aPos = Long_shru($temp, 1);
            $bPos = Long_fromInt($divisor >>> 1 | 0);
            $quot = Long_div($aPos, $bPos);
            var$13 = Long_rem($aPos, $bPos);
            $rem = Long_add(Long_shl(var$13, 1), Long_and($temp, Long_fromInt(1)));
            if ($divisor & 1) {
                if (Long_le($quot, $rem))
                    $rem = Long_sub($rem, $quot);
                else if (Long_le(Long_sub($quot, $rem), $bLong)) {
                    $rem = Long_add($rem, Long_sub($bLong, $quot));
                    $quot = Long_sub($quot, Long_fromInt(1));
                } else {
                    $rem = Long_add($rem, Long_sub(Long_shl($bLong, 1), $quot));
                    $quot = Long_sub($quot, Long_fromInt(2));
                }
            }
        }
        $dest.data[$i] = Long_lo(Long_and($quot, Long_create(4294967295, 0)));
        $i = $i + (-1) | 0;
    }
    return Long_lo($rem);
},
jm_Division_remainderArrayByInt = ($src, $srcLength, $divisor) => {
    let $result, $i, var$6, $temp, $res;
    $result = Long_ZERO;
    $i = $srcLength - 1 | 0;
    while ($i >= 0) {
        var$6 = $src.data;
        $temp = Long_add(Long_shl($result, 32), Long_and(Long_fromInt(var$6[$i]), Long_create(4294967295, 0)));
        $res = jm_Division_divideLongByInt($temp, $divisor);
        $result = Long_fromInt(Long_hi($res));
        $i = $i + (-1) | 0;
    }
    return Long_lo($result);
},
jm_Division_divideLongByInt = ($a, $b) => {
    let $bLong, $quot, $rem, $aPos, $bPos;
    $bLong = Long_and(Long_fromInt($b), Long_create(4294967295, 0));
    if (Long_ge($a, Long_ZERO)) {
        $quot = Long_div($a, $bLong);
        $rem = Long_rem($a, $bLong);
    } else {
        $aPos = Long_shru($a, 1);
        $bPos = Long_fromInt($b >>> 1 | 0);
        $quot = Long_div($aPos, $bPos);
        $rem = Long_rem($aPos, $bPos);
        $rem = Long_add(Long_shl($rem, 1), Long_and($a, Long_fromInt(1)));
        if ($b & 1) {
            if (Long_le($quot, $rem))
                $rem = Long_sub($rem, $quot);
            else if (Long_le(Long_sub($quot, $rem), $bLong)) {
                $rem = Long_add($rem, Long_sub($bLong, $quot));
                $quot = Long_sub($quot, Long_fromInt(1));
            } else {
                $rem = Long_add($rem, Long_sub(Long_shl($bLong, 1), $quot));
                $quot = Long_sub($quot, Long_fromInt(2));
            }
        }
    }
    return Long_or(Long_shl($rem, 32), Long_and($quot, Long_create(4294967295, 0)));
},
jm_Division_divideAndRemainderByInteger = ($val, $divisor, $divisorSign) => {
    let $valDigits, $valLen, $valSign, $quotientSign, $quotientDigits, $remainderDigits, $result0, $result1, $a, $b, $quo, $rem, var$16, var$17;
    $valDigits = $val.$digits;
    $valLen = $val.$numberLength;
    $valSign = $val.$sign;
    if ($valLen != 1) {
        $quotientSign = $valSign != $divisorSign ? (-1) : 1;
        $quotientDigits = $rt_createIntArray($valLen);
        $remainderDigits = $rt_createIntArray(1);
        $remainderDigits.data[0] = jm_Division_divideArrayByInt($quotientDigits, $valDigits, $valLen, $divisor);
        $result0 = jm_BigInteger__init_($quotientSign, $valLen, $quotientDigits);
        $result1 = jm_BigInteger__init_($valSign, 1, $remainderDigits);
        jm_BigInteger_cutOffLeadingZeroes($result0);
        jm_BigInteger_cutOffLeadingZeroes($result1);
        return $rt_wrapArray(jm_BigInteger, [$result0, $result1]);
    }
    $a = Long_and(Long_fromInt($valDigits.data[0]), Long_create(4294967295, 0));
    $b = Long_and(Long_fromInt($divisor), Long_create(4294967295, 0));
    $quo = Long_div($a, $b);
    $rem = Long_rem($a, $b);
    if ($valSign != $divisorSign)
        $quo = Long_neg($quo);
    if ($valSign < 0)
        $rem = Long_neg($rem);
    var$16 = $rt_createArray(jm_BigInteger, 2);
    var$17 = var$16.data;
    var$17[0] = jm_BigInteger_valueOf($quo);
    var$17[1] = jm_BigInteger_valueOf($rem);
    return var$16;
},
jm_Division_multiplyAndSubtract = ($a, $start, $b, $bLen, $c) => {
    let $carry0, $carry1, $i, var$9, var$10, var$11, var$12, var$13, var$14;
    $carry0 = Long_ZERO;
    $carry1 = Long_ZERO;
    $i = 0;
    while ($i < $bLen) {
        var$9 = $a.data;
        var$10 = jm_Multiplication_unsignedMultAddAdd($b.data[$i], $c, Long_lo($carry0), 0);
        var$11 = $start + $i | 0;
        var$12 = Long_add(Long_sub(Long_and(Long_fromInt(var$9[var$11]), Long_create(4294967295, 0)), Long_and(var$10, Long_create(4294967295, 0))), $carry1);
        var$9[var$11] = Long_lo(var$12);
        $carry1 = Long_shr(var$12, 32);
        $carry0 = Long_shru(var$10, 32);
        $i = $i + 1 | 0;
    }
    var$13 = $a.data;
    var$14 = $start + $bLen | 0;
    var$12 = Long_add(Long_sub(Long_and(Long_fromInt(var$13[var$14]), Long_create(4294967295, 0)), $carry0), $carry1);
    var$13[var$14] = Long_lo(var$12);
    return Long_hi(var$12);
},
jm_BitLevel = $rt_classWithoutFields(),
jm_BitLevel_bitLength = $val => {
    let $bLength, $highDigit, $i, var$5;
    if (!$val.$sign)
        return 0;
    $bLength = $val.$numberLength << 5;
    $highDigit = $val.$digits.data[$val.$numberLength - 1 | 0];
    if ($val.$sign < 0) {
        $i = $val.$getFirstNonzeroDigit();
        if ($i == ($val.$numberLength - 1 | 0))
            $highDigit = $highDigit + (-1) | 0;
    }
    var$5 = $bLength - jl_Integer_numberOfLeadingZeros($highDigit) | 0;
    return var$5;
},
jm_BitLevel_nonZeroDroppedBits = ($numberOfBits, $digits) => {
    let $intCount, $bitCount, $i, var$6;
    $intCount = $numberOfBits >> 5;
    $bitCount = $numberOfBits & 31;
    $i = 0;
    while (true) {
        var$6 = $rt_compare($i, $intCount);
        if (var$6 >= 0)
            break;
        if ($digits.data[$i])
            break;
        $i = $i + 1 | 0;
    }
    return !var$6 && !($digits.data[$i] << (32 - $bitCount | 0)) ? 0 : 1;
},
jm_BitLevel_shiftLeft0 = ($source, $count) => {
    let $intCount, var$4, $resLength, $resDigits, $result;
    $intCount = $count >> 5;
    var$4 = $count & 31;
    $resLength = ($source.$numberLength + $intCount | 0) + (var$4 ? 1 : 0) | 0;
    $resDigits = $rt_createIntArray($resLength);
    jm_BitLevel_shiftLeft($resDigits, $source.$digits, $intCount, var$4);
    $result = jm_BigInteger__init_($source.$sign, $resLength, $resDigits);
    jm_BigInteger_cutOffLeadingZeroes($result);
    return $result;
},
jm_BitLevel_shiftLeft = ($result, $source, $intCount, $count) => {
    let var$5, $rightShiftCount, $i, var$8, var$9, var$10;
    a: {
        if (!$count)
            jl_System_fastArraycopy($source, 0, $result, $intCount, $result.data.length - $intCount | 0);
        else {
            var$5 = $result.data;
            $rightShiftCount = 32 - $count | 0;
            $i = var$5.length - 1 | 0;
            var$5[$i] = 0;
            while (true) {
                if ($i <= $intCount)
                    break a;
                var$8 = $source.data;
                var$9 = var$5[$i];
                var$10 = ($i - $intCount | 0) - 1 | 0;
                var$5[$i] = var$9 | (var$8[var$10] >>> $rightShiftCount | 0);
                var$5[$i - 1 | 0] = var$8[var$10] << $count;
                $i = $i + (-1) | 0;
            }
        }
    }
    $i = 0;
    while ($i < $intCount) {
        $result.data[$i] = 0;
        $i = $i + 1 | 0;
    }
},
jm_BitLevel_shiftLeftOneBit = ($result, $source, $srcLen) => {
    let $carry, $i, var$6, $val;
    $carry = 0;
    $i = 0;
    while ($i < $srcLen) {
        var$6 = $result.data;
        $val = $source.data[$i];
        var$6[$i] = $val << 1 | $carry;
        $carry = $val >>> 31 | 0;
        $i = $i + 1 | 0;
    }
    if ($carry)
        $result.data[$srcLen] = $carry;
},
jm_BitLevel_shiftRight = ($source, $count) => {
    let $intCount, var$4, var$5, $resLength, var$7, $resDigits, $i, var$10, var$11, var$12, $result;
    $intCount = $count >> 5;
    var$4 = $count & 31;
    if ($intCount >= $source.$numberLength) {
        if ($source.$sign >= 0) {
            jm_BigInteger_$callClinit();
            var$5 = jm_BigInteger_ZERO;
        } else {
            jm_BigInteger_$callClinit();
            var$5 = jm_BigInteger_MINUS_ONE;
        }
        return var$5;
    }
    a: {
        $resLength = $source.$numberLength - $intCount | 0;
        var$7 = $resLength + 1 | 0;
        $resDigits = $rt_createIntArray(var$7);
        jm_BitLevel_shiftRight0($resDigits, $resLength, $source.$digits, $intCount, var$4);
        if ($source.$sign >= 0)
            var$7 = $resLength;
        else {
            $i = 0;
            while (true) {
                var$10 = $rt_compare($i, $intCount);
                if (var$10 >= 0)
                    break;
                if ($source.$digits.data[$i])
                    break;
                $i = $i + 1 | 0;
            }
            if (var$10 >= 0) {
                if (var$4 <= 0) {
                    var$7 = $resLength;
                    break a;
                }
                if (!($source.$digits.data[$i] << (32 - var$4 | 0))) {
                    var$7 = $resLength;
                    break a;
                }
            }
            var$4 = 0;
            while (true) {
                var$11 = $rt_compare(var$4, $resLength);
                if (var$11 >= 0)
                    break;
                var$12 = $resDigits.data;
                if (var$12[var$4] != (-1))
                    break;
                var$12[var$4] = 0;
                var$4 = var$4 + 1 | 0;
            }
            if (var$11)
                var$7 = $resLength;
            var$12 = $resDigits.data;
            var$12[var$4] = var$12[var$4] + 1 | 0;
        }
    }
    $result = jm_BigInteger__init_($source.$sign, var$7, $resDigits);
    jm_BigInteger_cutOffLeadingZeroes($result);
    return $result;
},
jm_BitLevel_shiftRight0 = ($result, $resultLen, $source, $intCount, $count) => {
    let $allZero, $i, var$8, $leftShiftCount, var$10, var$11, var$12;
    $allZero = 1;
    $i = 0;
    while ($i < $intCount) {
        $allZero = $allZero & ($source.data[$i] ? 0 : 1);
        $i = $i + 1 | 0;
    }
    if (!$count)
        jl_System_fastArraycopy($source, $intCount, $result, 0, $resultLen);
    else {
        var$8 = $source.data;
        $leftShiftCount = 32 - $count | 0;
        $allZero = $allZero & (var$8[$i] << $leftShiftCount ? 0 : 1);
        var$10 = 0;
        while (var$10 < ($resultLen - 1 | 0)) {
            var$11 = $result.data;
            var$12 = var$10 + $intCount | 0;
            var$11[var$10] = (var$8[var$12] >>> $count | 0) | var$8[var$12 + 1 | 0] << $leftShiftCount;
            var$10 = var$10 + 1 | 0;
        }
        $result.data[var$10] = var$8[var$10 + $intCount | 0] >>> $count | 0;
    }
    return $allZero;
},
otcir_Flags = $rt_classWithoutFields(),
otcir_Flags_getModifiers = ($flags, $access) => {
    let $modifiers, var$4, var$5;
    a: {
        $modifiers = 0;
        switch ($access) {
            case 1:
                $modifiers = 2;
                break a;
            case 2:
                $modifiers = 4;
                break a;
            case 3:
                $modifiers = 1;
                break a;
            default:
        }
    }
    var$4 = $flags >>> 6 | 0;
    var$5 = $modifiers | var$4 & 8;
    var$5 = var$5 | $flags << 2 & 16;
    var$4 = var$5 | var$4 & 32;
    var$4 = var$4 | ($flags >>> 8 | 0) & 64;
    var$4 = var$4 | ($flags >>> 5 | 0) & 128;
    var$4 = var$4 | $flags & 256;
    var$4 = var$4 | $flags << 8 & 512;
    var$4 = var$4 | $flags << 10 & 1024;
    var$4 = var$4 | $flags << 1 & 2048;
    return var$4;
};
function jl_String() {
    jl_Object.call(this);
    this.$hashCode1 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_2 = $this => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $this.$nativeString = "";
},
jl_String__init_6 = () => {
    let var_0 = new jl_String();
    jl_String__init_2(var_0);
    return var_0;
},
jl_String__init_0 = ($this, $characters) => {
    let var$2;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_($this);
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, var$2.length);
},
jl_String__init_ = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
},
jl_String__init_3 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_1 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_3(var_1, var_0);
    return var_1;
},
jl_String__init_5 = (var$0, var$1, $offset, $count) => {
    let var$4;
    jl_String_$callClinit();
    var$4 = var$1.data;
    jl_Object__init_(var$0);
    ju_Objects_checkFromIndexSize($offset, $count, var$4.length);
    var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
},
jl_String__init_4 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_5(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_indexOf0 = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$nativeString.length)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$nativeString.length - 1 | 0))
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $hi && $this.$nativeString.charCodeAt(($i + 1 | 0)) == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_indexOf = ($this, $ch) => {
    return $this.$indexOf0($ch, 0);
},
jl_String_lastIndexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo, var$7;
    $i = jl_Math_min($fromIndex, $this.$length() - 1 | 0);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i < 0)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + (-1) | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i < 1)
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $lo) {
            var$7 = $i - 1 | 0;
            if ($this.$nativeString.charCodeAt(var$7) == $hi)
                break;
        }
        $i = $i + (-1) | 0;
    }
    return var$7;
},
jl_String_lastIndexOf0 = ($this, $ch) => {
    return $this.$lastIndexOf0($ch, $this.$length() - 1 | 0);
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (!var$4)
        return jl_String_EMPTY;
    if (!$beginIndex && $endIndex == $length)
        return $this;
    if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
        return jl_String__init_1($this.$nativeString.substring($beginIndex, $endIndex));
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_substring0 = ($this, $beginIndex) => {
    return $this.$substring0($beginIndex, $this.$length());
},
jl_String_subSequence = ($this, $beginIndex, $endIndex) => {
    return $this.$substring0($beginIndex, $endIndex);
},
jl_String_toString = $this => {
    return $this;
},
jl_String_valueOf0 = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(24) : $obj.$toString();
},
jl_String_valueOf = $c => {
    let var$2, var$3;
    jl_String_$callClinit();
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = $c;
    jl_String__init_0(var$2, var$3);
    return var$2;
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    return $this.$nativeString !== $str.$nativeString ? 0 : 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode1) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode1 = (31 * $this.$hashCode1 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode1;
},
jl_String_toUpperCase = $this => {
    let $upperCase;
    $upperCase = $this.$nativeString.toUpperCase();
    if ($upperCase !== $this.$nativeString)
        $this = jl_String__init_1($upperCase);
    return $this;
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_6();
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_118_0__init_0();
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jl_NegativeArraySizeException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_NegativeArraySizeException__init_0 = () => {
    let var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_(var_0);
    return var_0;
},
jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalStateException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalStateException__init_2 = () => {
    let var_0 = new jl_IllegalStateException();
    jl_IllegalStateException__init_(var_0);
    return var_0;
},
jl_IllegalStateException__init_0 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalStateException__init_1 = var_0 => {
    let var_1 = new jl_IllegalStateException();
    jl_IllegalStateException__init_0(var_1, var_0);
    return var_1;
},
ju_FormatterClosedException = $rt_classWithoutFields(jl_IllegalStateException),
ju_FormatterClosedException__init_ = $this => {
    jl_IllegalStateException__init_($this);
},
ju_FormatterClosedException__init_0 = () => {
    let var_0 = new ju_FormatterClosedException();
    ju_FormatterClosedException__init_(var_0);
    return var_0;
};
function jt_DecimalFormat$TextField() {
    jl_Object.call(this);
    this.$text = null;
}
let jt_DecimalFormat$TextField__init_0 = ($this, $text) => {
    jl_Object__init_($this);
    $this.$text = $text;
},
jt_DecimalFormat$TextField__init_ = var_0 => {
    let var_1 = new jt_DecimalFormat$TextField();
    jt_DecimalFormat$TextField__init_0(var_1, var_0);
    return var_1;
},
jt_DecimalFormat$TextField_render = ($this, $format, $buffer) => {
    $buffer.$append4($this.$text);
},
jl_ClassNotFoundException = $rt_classWithoutFields(jl_ReflectiveOperationException),
jl_ClassNotFoundException__init_ = $this => {
    jl_ReflectiveOperationException__init_($this);
},
jl_ClassNotFoundException__init_0 = () => {
    let var_0 = new jl_ClassNotFoundException();
    jl_ClassNotFoundException__init_(var_0);
    return var_0;
},
ju_Deque = $rt_classWithoutFields(0);
function ju_ArrayDeque() {
    let a = this; ju_AbstractCollection.call(a);
    a.$version = 0;
    a.$array = null;
    a.$head = 0;
    a.$tail = 0;
}
let ju_ArrayDeque__init_1 = $this => {
    ju_ArrayDeque__init_0($this, 8);
},
ju_ArrayDeque__init_2 = () => {
    let var_0 = new ju_ArrayDeque();
    ju_ArrayDeque__init_1(var_0);
    return var_0;
},
ju_ArrayDeque__init_0 = ($this, $numElements) => {
    ju_AbstractCollection__init_($this);
    $this.$array = $rt_createArray(jl_Object, $numElements + 1 | 0);
},
ju_ArrayDeque__init_ = var_0 => {
    let var_1 = new ju_ArrayDeque();
    ju_ArrayDeque__init_0(var_1, var_0);
    return var_1;
},
ju_ArrayDeque_addLast = ($this, $e) => {
    ju_Objects_requireNonNull($e);
    ju_ArrayDeque_ensureCapacity($this, $this.$size() + 1 | 0);
    $this.$array.data[$this.$tail] = $e;
    $this.$tail = ju_ArrayDeque_modInc($this.$tail, $this.$array.data.length);
    $this.$version = $this.$version + 1 | 0;
},
ju_ArrayDeque_offerLast = ($this, $e) => {
    $this.$addLast($e);
    return 1;
},
ju_ArrayDeque_removeFirst = $this => {
    let $value;
    $value = $this.$pollFirst();
    if ($value !== null)
        return $value;
    $rt_throw(ju_NoSuchElementException__init_0());
},
ju_ArrayDeque_pollFirst = $this => {
    let $result;
    if ($this.$head == $this.$tail)
        return null;
    $result = $this.$array.data[$this.$head];
    $this.$array.data[$this.$head] = null;
    $this.$head = ju_ArrayDeque_modInc($this.$head, $this.$array.data.length);
    $this.$version = $this.$version + 1 | 0;
    return $result;
},
ju_ArrayDeque_add = ($this, $e) => {
    $this.$addLast($e);
    return 1;
},
ju_ArrayDeque_offer = ($this, $e) => {
    return $this.$offerLast($e);
},
ju_ArrayDeque_remove = $this => {
    return $this.$removeFirst();
},
ju_ArrayDeque_poll = $this => {
    return $this.$pollFirst();
},
ju_ArrayDeque_size = $this => {
    return $this.$tail >= $this.$head ? $this.$tail - $this.$head | 0 : ($this.$array.data.length - $this.$head | 0) + $this.$tail | 0;
},
ju_ArrayDeque_isEmpty = $this => {
    return $this.$head != $this.$tail ? 0 : 1;
},
ju_ArrayDeque_modInc = ($i, $mod) => {
    let var$3;
    var$3 = $i + 1 | 0;
    if (var$3 == $mod)
        var$3 = 0;
    return var$3;
},
ju_ArrayDeque_ensureCapacity = ($this, $capacity) => {
    let $newArraySize, $newArray, $j, $i, var$6, var$7, var$8;
    if ($capacity < $this.$array.data.length)
        return;
    $newArraySize = jl_Math_max($this.$array.data.length * 2 | 0, (($capacity * 3 | 0) / 2 | 0) + 1 | 0);
    if ($newArraySize < 1)
        $newArraySize = 2147483647;
    $newArray = $rt_createArray(jl_Object, $newArraySize);
    $j = 0;
    if ($this.$head <= $this.$tail) {
        $i = $this.$head;
        while ($i < $this.$tail) {
            var$6 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$6[$j] = $this.$array.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
    } else {
        $i = $this.$head;
        while ($i < $this.$array.data.length) {
            var$8 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$8[$j] = $this.$array.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
        $i = 0;
        while ($i < $this.$tail) {
            var$6 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$6[$j] = $this.$array.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
    }
    $this.$head = 0;
    $this.$tail = $j;
    $this.$array = $newArray;
},
jl_NoSuchMethodException = $rt_classWithoutFields(jl_ReflectiveOperationException),
jl_NoSuchMethodException__init_1 = $this => {
    jl_ReflectiveOperationException__init_($this);
},
jl_NoSuchMethodException__init_0 = () => {
    let var_0 = new jl_NoSuchMethodException();
    jl_NoSuchMethodException__init_1(var_0);
    return var_0;
},
jl_NoSuchMethodException__init_ = ($this, $message) => {
    jl_ReflectiveOperationException__init_0($this, $message);
},
jl_NoSuchMethodException__init_2 = var_0 => {
    let var_1 = new jl_NoSuchMethodException();
    jl_NoSuchMethodException__init_(var_1, var_0);
    return var_1;
},
otcir_Converter = $rt_classWithoutFields();
function ju_Formatter$FormatWriter() {
    let a = this; jl_Object.call(a);
    a.$formatter = null;
    a.$out0 = null;
    a.$locale = null;
    a.$format9 = null;
    a.$args = null;
    a.$index0 = 0;
    a.$formatSpecifierStart = 0;
    a.$defaultArgumentIndex = 0;
    a.$argumentIndex = 0;
    a.$previousArgumentIndex = 0;
    a.$width = 0;
    a.$precision0 = 0;
    a.$flags = 0;
}
let ju_Formatter$FormatWriter__init_ = ($this, $formatter, $out, $locale, $format, $args) => {
    jl_Object__init_($this);
    $this.$formatter = $formatter;
    $this.$out0 = $out;
    $this.$locale = $locale;
    $this.$format9 = $format;
    $this.$args = $args;
},
ju_Formatter$FormatWriter__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new ju_Formatter$FormatWriter();
    ju_Formatter$FormatWriter__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
ju_Formatter$FormatWriter_write = $this => {
    let $next, $specifier;
    while (true) {
        $next = $this.$format9.$indexOf0(37, $this.$index0);
        if ($next < 0)
            break;
        $this.$out0.$append15($this.$format9.$substring0($this.$index0, $next));
        $this.$index0 = $next + 1 | 0;
        $this.$formatSpecifierStart = $this.$index0;
        $specifier = ju_Formatter$FormatWriter_parseFormatSpecifier($this);
        ju_Formatter$FormatWriter_configureFormat($this);
        ju_Formatter$FormatWriter_formatValue($this, $specifier);
    }
    $this.$out0.$append15($this.$format9.$substring($this.$index0));
},
ju_Formatter$FormatWriter_formatValue = ($this, $specifier) => {
    a: {
        switch ($specifier) {
            case 37:
                $this.$out0.$append15($rt_s(90));
                break a;
            case 66:
                break;
            case 67:
                ju_Formatter$FormatWriter_formatChar($this, $specifier, 1);
                break a;
            case 68:
                ju_Formatter$FormatWriter_formatDecimalInt($this, $specifier, 1);
                break a;
            case 72:
                ju_Formatter$FormatWriter_formatHex($this, $specifier, 1);
                break a;
            case 79:
                ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, 3, 1);
                break a;
            case 83:
                ju_Formatter$FormatWriter_formatString($this, $specifier, 1);
                break a;
            case 88:
                ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, 4, 1);
                break a;
            case 98:
                ju_Formatter$FormatWriter_formatBoolean($this, $specifier, 0);
                break a;
            case 99:
                ju_Formatter$FormatWriter_formatChar($this, $specifier, 0);
                break a;
            case 100:
                ju_Formatter$FormatWriter_formatDecimalInt($this, $specifier, 0);
                break a;
            case 102:
                ju_Formatter$FormatWriter_formatFloat($this, $specifier, 0);
                break a;
            case 104:
                ju_Formatter$FormatWriter_formatHex($this, $specifier, 0);
                break a;
            case 111:
                ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, 3, 0);
                break a;
            case 115:
                ju_Formatter$FormatWriter_formatString($this, $specifier, 0);
                break a;
            case 120:
                ju_Formatter$FormatWriter_formatRadixInt($this, $specifier, 4, 0);
                break a;
            default:
                $rt_throw(ju_UnknownFormatConversionException__init_(jl_String_valueOf($specifier)));
        }
        ju_Formatter$FormatWriter_formatBoolean($this, $specifier, 1);
    }
},
ju_Formatter$FormatWriter_formatFloat = ($this, $specifier, $upperCase) => {
    let $arg, $negative, $format, $decimalSize, $str;
    ju_Formatter$FormatWriter_verifyFlags($this, $specifier, 507);
    ju_Formatter$FormatWriter_verifyFloatFlags($this);
    if ($this.$precision0 == (-1))
        $this.$precision0 = 6;
    $arg = $this.$args.data[$this.$argumentIndex];
    if ($arg instanceof jl_Double)
        $negative = $arg.$doubleValue() >= 0.0 ? 0 : 1;
    else if ($arg instanceof jl_Float)
        $negative = $arg.$floatValue() >= 0.0 ? 0 : 1;
    else {
        if (!($arg instanceof jm_BigDecimal))
            $rt_throw(ju_IllegalFormatConversionException__init_($specifier, $arg !== null ? jl_Object_getClass($arg) : null));
        $negative = $arg.$signum() >= 0 ? 0 : 1;
    }
    $format = jt_DecimalFormat__init_3();
    $format.$setDecimalFormatSymbols(jt_DecimalFormatSymbols__init_($this.$locale));
    if ($this.$width != (-1)) {
        $decimalSize = ju_Formatter$FormatWriter_predictDecimalSize($this, $negative, $format);
        $format.$setMaximumIntegerDigits($decimalSize);
        if ($this.$flags & 32)
            $format.$setMinimumIntegerDigits($decimalSize);
    }
    $format.$setMaximumFractionDigits($this.$precision0);
    $format.$setMinimumFractionDigits($this.$precision0);
    $format.$setGroupingUsed(!($this.$flags & 64) ? 0 : 1);
    if ($this.$flags & 128) {
        $format.$setNegativePrefix($rt_s(91));
        $format.$setNegativeSuffix($rt_s(92));
    }
    if ($this.$flags & 8)
        $format.$setPositivePrefix($rt_s(93));
    else if ($this.$flags & 16)
        $format.$setPositivePrefix($rt_s(94));
    $str = jt_Format_format($format, $arg);
    $this.$precision0 = (-1);
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $str);
},
ju_Formatter$FormatWriter_predictDecimalSize = ($this, $negative, $format) => {
    let $decimalSize;
    $decimalSize = $this.$width;
    if ($this.$precision0 > 0)
        $decimalSize = $decimalSize - ($this.$precision0 + 1 | 0) | 0;
    if (!$negative) {
        if ($this.$flags & 24)
            $decimalSize = $decimalSize + (-1) | 0;
    } else
        $decimalSize = !($this.$flags & 128) ? $decimalSize + (-1) | 0 : $decimalSize + (-2) | 0;
    if ($this.$flags & 64)
        $decimalSize = $decimalSize - ($decimalSize / ($format.$getGroupingSize() + 1 | 0) | 0) | 0;
    return $decimalSize;
},
ju_Formatter$FormatWriter_verifyFloatFlags = $this => {
    if ($this.$flags & 8 && $this.$flags & 16)
        $rt_throw(ju_IllegalFormatFlagsException__init_($rt_s(95)));
    if ($this.$flags & 32 && $this.$flags & 1)
        $rt_throw(ju_IllegalFormatFlagsException__init_($rt_s(96)));
    if ($this.$flags & 1 && $this.$width < 0)
        $rt_throw(ju_MissingFormatWidthException__init_($this.$format9.$substring0($this.$formatSpecifierStart, $this.$index0)));
},
ju_Formatter$FormatWriter_formatBoolean = ($this, $specifier, $upperCase) => {
    let $arg, $s;
    ju_Formatter$FormatWriter_verifyFlagsForGeneralFormat($this, $specifier);
    $arg = $this.$args.data[$this.$argumentIndex];
    $s = jl_Boolean_toString($arg instanceof jl_Boolean ? $arg.$booleanValue() : $arg === null ? 0 : 1);
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $s);
},
ju_Formatter$FormatWriter_formatHex = ($this, $specifier, $upperCase) => {
    let $arg, $s;
    ju_Formatter$FormatWriter_verifyFlagsForGeneralFormat($this, $specifier);
    $arg = $this.$args.data[$this.$argumentIndex];
    $s = $arg === null ? $rt_s(24) : jl_Integer_toHexString($arg.$hashCode0());
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $s);
},
ju_Formatter$FormatWriter_formatString = ($this, $specifier, $upperCase) => {
    let $arg, $flagsToPass;
    ju_Formatter$FormatWriter_verifyFlagsForGeneralFormat($this, $specifier);
    $arg = $this.$args.data[$this.$argumentIndex];
    if (!$rt_isInstance($arg, ju_Formattable))
        ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, jl_String_valueOf0($arg));
    else {
        $flagsToPass = $this.$flags & 7;
        if ($upperCase)
            $flagsToPass = $flagsToPass | 2;
        $arg.$formatTo($this.$formatter, $flagsToPass, $this.$width, $this.$precision0);
    }
},
ju_Formatter$FormatWriter_formatChar = ($this, $specifier, $upperCase) => {
    let $arg, $c;
    ju_Formatter$FormatWriter_verifyFlags($this, $specifier, 259);
    $arg = $this.$args.data[$this.$argumentIndex];
    if ($this.$precision0 >= 0)
        $rt_throw(ju_IllegalFormatPrecisionException__init_0($this.$precision0));
    if ($arg instanceof jl_Character)
        $c = $arg.$charValue();
    else if ($arg instanceof jl_Byte)
        $c = $arg.$byteValue() & 65535;
    else if ($arg instanceof jl_Short)
        $c = $arg.$shortValue() & 65535;
    else {
        if (!($arg instanceof jl_Integer)) {
            if ($arg === null) {
                ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $rt_s(24));
                return;
            }
            $rt_throw(ju_IllegalFormatConversionException__init_($specifier, jl_Object_getClass($arg)));
        }
        $c = $arg.$intValue();
        if (!jl_Character_isValidCodePoint($c))
            $rt_throw(ju_IllegalFormatCodePointException__init_0($c));
    }
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, jl_String__init_(jl_Character_toChars($c)));
},
ju_Formatter$FormatWriter_formatDecimalInt = ($this, $specifier, $upperCase) => {
    let $arg, $value, $str, $negative, $value_0, $additionalSymbols, $sb, $valueSb, $separator, $size, $i, $prev, $i_0;
    ju_Formatter$FormatWriter_verifyFlags($this, $specifier, 507);
    ju_Formatter$FormatWriter_verifyIntFlags($this);
    $arg = $this.$args.data[$this.$argumentIndex];
    if ($arg instanceof jl_Long) {
        $value = $arg.$longValue();
        $str = jl_Long_toString(jl_Math_abs0($value));
        $negative = Long_ge($value, Long_ZERO) ? 0 : 1;
    } else {
        if (!($arg instanceof jl_Integer) && !($arg instanceof jl_Byte) && !($arg instanceof jl_Short))
            $rt_throw(ju_IllegalFormatConversionException__init_($specifier, $arg === null ? null : jl_Object_getClass($arg)));
        $value_0 = $arg.$intValue();
        $str = jl_Integer_toString(jl_Math_abs($value_0));
        $negative = $value_0 >= 0 ? 0 : 1;
    }
    $additionalSymbols = 0;
    $sb = jl_StringBuilder__init_();
    if ($negative) {
        if (!($this.$flags & 128)) {
            $sb.$append0(45);
            $additionalSymbols = 1;
        } else {
            $sb.$append0(40);
            $additionalSymbols = 2;
        }
    } else if ($this.$flags & 8) {
        $sb.$append0(43);
        $additionalSymbols = 1;
    } else if ($this.$flags & 16) {
        $sb.$append0(32);
        $additionalSymbols = 1;
    }
    $valueSb = jl_StringBuilder__init_();
    if (!($this.$flags & 64))
        $valueSb.$append16($str);
    else {
        $separator = (jt_DecimalFormatSymbols__init_($this.$locale)).$getGroupingSeparator();
        $size = (jt_NumberFormat_getNumberInstance($this.$locale)).$getGroupingSize();
        $i = $str.$length() % $size | 0;
        if (!$i)
            $i = $size;
        $prev = 0;
        while ($i < $str.$length()) {
            $valueSb.$append16($str.$substring0($prev, $i));
            $valueSb.$append0($separator);
            $i_0 = $i + $size | 0;
            $prev = $i;
            $i = $i_0;
        }
        $valueSb.$append16($str.$substring($prev));
    }
    a: {
        if ($this.$flags & 32) {
            $i = $valueSb.$length() + $additionalSymbols | 0;
            while (true) {
                if ($i >= $this.$width)
                    break a;
                $sb.$append0(jl_Character_forDigit(0, 10));
                $i = $i + 1 | 0;
            }
        }
    }
    $sb.$append17($valueSb);
    if ($negative && $this.$flags & 128)
        $sb.$append0(41);
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $sb.$toString());
},
ju_Formatter$FormatWriter_formatRadixInt = ($this, $specifier, $radixLog2, $upperCase) => {
    let $arg, $str, $sb, $prefix, var$8, $i;
    ju_Formatter$FormatWriter_verifyFlags($this, $specifier, 423);
    ju_Formatter$FormatWriter_verifyIntFlags($this);
    $arg = $this.$args.data[$this.$argumentIndex];
    if ($arg instanceof jl_Long)
        $str = otci_IntegerUtil_toUnsignedLogRadixString0($arg.$longValue(), $radixLog2);
    else if ($arg instanceof jl_Integer)
        $str = otci_IntegerUtil_toUnsignedLogRadixString($arg.$intValue(), $radixLog2);
    else if ($arg instanceof jl_Short)
        $str = otci_IntegerUtil_toUnsignedLogRadixString($arg.$shortValue() & 65535, $radixLog2);
    else {
        if (!($arg instanceof jl_Byte))
            $rt_throw(ju_IllegalFormatConversionException__init_($specifier, $arg === null ? null : jl_Object_getClass($arg)));
        $str = otci_IntegerUtil_toUnsignedLogRadixString($arg.$byteValue() & 255, $radixLog2);
    }
    $sb = jl_StringBuilder__init_();
    if ($this.$flags & 4) {
        $prefix = $radixLog2 != 4 ? $rt_s(26) : $rt_s(97);
        var$8 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$8, $prefix), $str);
        $str = jl_StringBuilder_toString(var$8);
    }
    a: {
        if ($this.$flags & 32) {
            $i = $str.$length();
            while (true) {
                if ($i >= $this.$width)
                    break a;
                $sb.$append0(jl_Character_forDigit(0, 10));
                $i = $i + 1 | 0;
            }
        }
    }
    $sb.$append16($str);
    ju_Formatter$FormatWriter_formatGivenString($this, $upperCase, $sb.$toString());
},
ju_Formatter$FormatWriter_verifyIntFlags = $this => {
    if ($this.$flags & 8 && $this.$flags & 16)
        $rt_throw(ju_IllegalFormatFlagsException__init_($rt_s(95)));
    if ($this.$flags & 32 && $this.$flags & 1)
        $rt_throw(ju_IllegalFormatFlagsException__init_($rt_s(96)));
    if ($this.$precision0 >= 0)
        $rt_throw(ju_IllegalFormatPrecisionException__init_0($this.$precision0));
    if ($this.$flags & 1 && $this.$width < 0)
        $rt_throw(ju_MissingFormatWidthException__init_($this.$format9.$substring0($this.$formatSpecifierStart, $this.$index0)));
},
ju_Formatter$FormatWriter_formatGivenString = ($this, $upperCase, $str) => {
    if ($this.$precision0 > 0 && $this.$precision0 < $str.$length())
        $str = $str.$substring0(0, $this.$precision0);
    if ($upperCase)
        $str = $str.$toUpperCase();
    if (!($this.$flags & 1)) {
        ju_Formatter$FormatWriter_mayBeAppendSpaces($this, $str);
        $this.$out0.$append15($str);
    } else {
        $this.$out0.$append15($str);
        ju_Formatter$FormatWriter_mayBeAppendSpaces($this, $str);
    }
},
ju_Formatter$FormatWriter_verifyFlagsForGeneralFormat = ($this, $conversion) => {
    ju_Formatter$FormatWriter_verifyFlags($this, $conversion, 263);
},
ju_Formatter$FormatWriter_verifyFlags = ($this, $conversion, $mask) => {
    if (($this.$flags | $mask) == $mask)
        return;
    $rt_throw(ju_FormatFlagsConversionMismatchException__init_0(ju_Formatter$FormatWriter_flagsToString($this, $this.$flags & ($mask ^ (-1))), $conversion));
},
ju_Formatter$FormatWriter_flagsToString = ($this, $flags) => {
    let $flagIndex;
    $flagIndex = jl_Integer_numberOfTrailingZeros($flags);
    return jl_String_valueOf($rt_s(98).$charAt($flagIndex));
},
ju_Formatter$FormatWriter_mayBeAppendSpaces = ($this, $str) => {
    let $diff, $sb, $i;
    if ($this.$width > $str.$length()) {
        $diff = $this.$width - $str.$length() | 0;
        $sb = jl_StringBuilder__init_2($diff);
        $i = 0;
        while ($i < $diff) {
            $sb.$append0(32);
            $i = $i + 1 | 0;
        }
        $this.$out0.$append15($sb);
    }
},
ju_Formatter$FormatWriter_configureFormat = $this => {
    let var$1;
    if ($this.$flags & 256)
        $this.$argumentIndex = jl_Math_max(0, $this.$previousArgumentIndex);
    if ($this.$argumentIndex == (-1)) {
        var$1 = $this.$defaultArgumentIndex;
        $this.$defaultArgumentIndex = var$1 + 1 | 0;
        $this.$argumentIndex = var$1;
    }
    $this.$previousArgumentIndex = $this.$argumentIndex;
},
ju_Formatter$FormatWriter_parseFormatSpecifier = $this => {
    let $c, $n, var$3, var$4;
    $this.$flags = 0;
    $this.$argumentIndex = (-1);
    $this.$width = (-1);
    $this.$precision0 = (-1);
    $c = $this.$format9.$charAt($this.$index0);
    if ($c != 48 && ju_Formatter$FormatWriter_isDigit($c)) {
        $n = ju_Formatter$FormatWriter_readInt($this);
        if ($this.$index0 < $this.$format9.$length() && $this.$format9.$charAt($this.$index0) == 36) {
            $this.$index0 = $this.$index0 + 1 | 0;
            $this.$argumentIndex = $n - 1 | 0;
        } else
            $this.$width = $n;
    }
    ju_Formatter$FormatWriter_parseFlags($this);
    if ($this.$width < 0 && $this.$index0 < $this.$format9.$length() && ju_Formatter$FormatWriter_isDigit($this.$format9.$charAt($this.$index0)))
        $this.$width = ju_Formatter$FormatWriter_readInt($this);
    if ($this.$index0 < $this.$format9.$length() && $this.$format9.$charAt($this.$index0) == 46) {
        $this.$index0 = $this.$index0 + 1 | 0;
        if ($this.$index0 < $this.$format9.$length() && ju_Formatter$FormatWriter_isDigit($this.$format9.$charAt($this.$index0)))
            $this.$precision0 = ju_Formatter$FormatWriter_readInt($this);
        else
            $rt_throw(ju_UnknownFormatConversionException__init_(jl_String_valueOf($this.$format9.$charAt($this.$index0 - 1 | 0))));
    }
    if ($this.$index0 < $this.$format9.$length()) {
        var$3 = $this.$format9;
        var$4 = $this.$index0;
        $this.$index0 = var$4 + 1 | 0;
        return var$3.$charAt(var$4);
    }
    $rt_throw(ju_UnknownFormatConversionException__init_(jl_String_valueOf($this.$format9.$charAt($this.$format9.$length() - 1 | 0))));
},
ju_Formatter$FormatWriter_parseFlags = $this => {
    let $c, $flag;
    a: {
        while ($this.$index0 < $this.$format9.$length()) {
            b: {
                $c = $this.$format9.$charAt($this.$index0);
                switch ($c) {
                    case 32:
                        break;
                    case 33:
                    case 34:
                    case 36:
                    case 37:
                    case 38:
                    case 39:
                    case 41:
                    case 42:
                    case 46:
                    case 47:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                    case 58:
                    case 59:
                        break a;
                    case 35:
                        $flag = 4;
                        break b;
                    case 40:
                        $flag = 128;
                        break b;
                    case 43:
                        $flag = 8;
                        break b;
                    case 44:
                        $flag = 64;
                        break b;
                    case 45:
                        $flag = 1;
                        break b;
                    case 48:
                        $flag = 32;
                        break b;
                    case 60:
                        $flag = 256;
                        break b;
                    default:
                        break a;
                }
                $flag = 16;
            }
            if ($this.$flags & $flag)
                $rt_throw(ju_DuplicateFormatFlagsException__init_0(jl_String_valueOf($c)));
            $this.$flags = $this.$flags | $flag;
            $this.$index0 = $this.$index0 + 1 | 0;
        }
        return;
    }
},
ju_Formatter$FormatWriter_readInt = $this => {
    let $result, var$2, var$3, var$4;
    $result = 0;
    while ($this.$index0 < $this.$format9.$length() && ju_Formatter$FormatWriter_isDigit($this.$format9.$charAt($this.$index0))) {
        var$2 = $result * 10 | 0;
        var$3 = $this.$format9;
        var$4 = $this.$index0;
        $this.$index0 = var$4 + 1 | 0;
        $result = var$2 + (var$3.$charAt(var$4) - 48 | 0) | 0;
    }
    return $result;
},
ju_Formatter$FormatWriter_isDigit = $c => {
    return $c >= 48 && $c <= 57 ? 1 : 0;
};
function jt_DecimalFormatSymbols() {
    let a = this; jl_Object.call(a);
    a.$locale0 = null;
    a.$zeroDigit = 0;
    a.$groupingSeparator = 0;
    a.$decimalSeparator = 0;
    a.$perMill = 0;
    a.$percent = 0;
    a.$digit = 0;
    a.$patternSeparator = 0;
    a.$nan = null;
    a.$infinity = null;
    a.$minusSign = 0;
    a.$monetaryDecimalSeparator = 0;
    a.$exponentSeparator = null;
}
let jt_DecimalFormatSymbols__init_1 = $this => {
    jt_DecimalFormatSymbols__init_0($this, ju_Locale_getDefault());
},
jt_DecimalFormatSymbols__init_2 = () => {
    let var_0 = new jt_DecimalFormatSymbols();
    jt_DecimalFormatSymbols__init_1(var_0);
    return var_0;
},
jt_DecimalFormatSymbols__init_0 = ($this, $locale) => {
    jl_Object__init_($this);
    $this.$locale0 = $locale;
    jt_DecimalFormatSymbols_initData($this);
},
jt_DecimalFormatSymbols__init_ = var_0 => {
    let var_1 = new jt_DecimalFormatSymbols();
    jt_DecimalFormatSymbols__init_0(var_1, var_0);
    return var_1;
},
jt_DecimalFormatSymbols_initData = $this => {
    let $data, var$2, var$3;
    $data = otciu_CLDRHelper_resolveDecimalData(ju_Locale_getLanguage($this.$locale0), ju_Locale_getCountry($this.$locale0));
    $this.$zeroDigit = 48;
    var$2 = $data.groupingSeparator;
    $this.$groupingSeparator = var$2 & 65535;
    var$2 = $data.decimalSeparator;
    $this.$decimalSeparator = var$2 & 65535;
    var$2 = $data.perMille;
    $this.$perMill = var$2 & 65535;
    var$2 = $data.percent;
    $this.$percent = var$2 & 65535;
    $this.$digit = 35;
    $this.$patternSeparator = 59;
    var$3 = ($data.naN !== null ? $rt_str($data.naN) : null);
    $this.$nan = var$3;
    var$3 = ($data.infinity !== null ? $rt_str($data.infinity) : null);
    $this.$infinity = var$3;
    var$2 = $data.minusSign;
    $this.$minusSign = var$2 & 65535;
    var$2 = $data.decimalSeparator;
    $this.$monetaryDecimalSeparator = var$2 & 65535;
    var$3 = ($data.exponentSeparator !== null ? $rt_str($data.exponentSeparator) : null);
    $this.$exponentSeparator = var$3;
},
jt_DecimalFormatSymbols_getZeroDigit = $this => {
    return $this.$zeroDigit;
},
jt_DecimalFormatSymbols_getGroupingSeparator = $this => {
    return $this.$groupingSeparator;
},
jt_DecimalFormatSymbols_getPerMill = $this => {
    return $this.$perMill;
},
jt_DecimalFormatSymbols_getPercent = $this => {
    return $this.$percent;
},
jt_DecimalFormatSymbols_getLocale = $this => {
    return $this.$locale0;
},
jt_DecimalFormatSymbols_getDecimalSeparator = $this => {
    return $this.$decimalSeparator;
},
jt_DecimalFormatSymbols_getNaN = $this => {
    return $this.$nan;
},
jt_DecimalFormatSymbols_getInfinity = $this => {
    return $this.$infinity;
},
jt_DecimalFormatSymbols_getMinusSign = $this => {
    return $this.$minusSign;
},
jt_DecimalFormatSymbols_getExponentSeparator = $this => {
    return $this.$exponentSeparator;
},
jt_DecimalFormatSymbols_clone = $this => {
    let var$1, $e, $$je;
    a: {
        try {
            var$1 = jl_Object_clone($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_CloneNotSupportedException) {
                $e = $$je;
                break a;
            } else {
                throw $$e;
            }
        }
        return var$1;
    }
    $rt_throw(jl_AssertionError__init_0($rt_s(99), $e));
},
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException),
jl_NullPointerException__init_0 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_NullPointerException__init_2 = var_0 => {
    let var_1 = new jl_NullPointerException();
    jl_NullPointerException__init_0(var_1, var_0);
    return var_1;
},
jl_NullPointerException__init_1 = $this => {
    jl_RuntimeException__init_($this);
},
jl_NullPointerException__init_ = () => {
    let var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_1(var_0);
    return var_0;
};
function ju_Formatter() {
    let a = this; jl_Object.call(a);
    a.$locale1 = null;
    a.$out1 = null;
    a.$ioException0 = null;
}
let ju_Formatter__init_ = ($this, $a, $l) => {
    jl_Object__init_($this);
    $this.$out1 = $a;
    $this.$locale1 = $l;
},
ju_Formatter__init_0 = (var_0, var_1) => {
    let var_2 = new ju_Formatter();
    ju_Formatter__init_(var_2, var_0, var_1);
    return var_2;
},
ju_Formatter_requireOpen = $this => {
    if ($this.$out1 !== null)
        return;
    $rt_throw(ju_FormatterClosedException__init_0());
},
ju_Formatter_ioException = $this => {
    return $this.$ioException0;
},
ju_Formatter_format = ($this, $format, $args) => {
    return ju_Formatter_format0($this, $this.$locale1, $format, $args);
},
ju_Formatter_format0 = ($this, $l, $format, $args) => {
    let $e, $$je;
    ju_Formatter_requireOpen($this);
    a: {
        try {
            if ($args === null)
                $args = $rt_createArray(jl_Object, 1);
            (ju_Formatter$FormatWriter__init_0($this, $this.$out1, $l, $format, $args)).$write();
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                $e = $$je;
                $this.$ioException0 = $e;
                break a;
            } else {
                throw $$e;
            }
        }
    }
    return $this;
};
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
let otpp_AsyncCallbackWrapper__init_ = ($this, $realAsyncCallback) => {
    jl_Object__init_($this);
    $this.$realAsyncCallback = $realAsyncCallback;
},
otpp_AsyncCallbackWrapper__init_0 = var_0 => {
    let var_1 = new otpp_AsyncCallbackWrapper();
    otpp_AsyncCallbackWrapper__init_(var_1, var_0);
    return var_1;
},
otpp_AsyncCallbackWrapper_create = $realAsyncCallback => {
    return otpp_AsyncCallbackWrapper__init_0($realAsyncCallback);
},
otpp_AsyncCallbackWrapper_complete = ($this, $result) => {
    $this.$realAsyncCallback.$complete($result);
},
otpp_AsyncCallbackWrapper_error = ($this, $e) => {
    $this.$realAsyncCallback.$error($e);
};
function ju_IllegalFormatPrecisionException() {
    ju_IllegalFormatException.call(this);
    this.$precision2 = 0;
}
let ju_IllegalFormatPrecisionException__init_ = ($this, $precision) => {
    let var$2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(100)), $precision);
    ju_IllegalFormatException__init_($this, jl_StringBuilder_toString(var$2));
    $this.$precision2 = $precision;
},
ju_IllegalFormatPrecisionException__init_0 = var_0 => {
    let var_1 = new ju_IllegalFormatPrecisionException();
    ju_IllegalFormatPrecisionException__init_(var_1, var_0);
    return var_1;
};
function jl_Object$Monitor() {
    let a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
let jl_Object$Monitor__init_ = $this => {
    jl_Object__init_($this);
    $this.$owner = jl_Thread_currentThread();
},
jl_Object$Monitor__init_0 = () => {
    let var_0 = new jl_Object$Monitor();
    jl_Object$Monitor__init_(var_0);
    return var_0;
};
function nmn_MinecraftClientConnection$send$lambda$_8_0() {
    let a = this; jl_Object.call(a);
    a.$_03 = null;
    a.$_10 = null;
    a.$_20 = null;
    a.$_30 = 0;
}
let nmn_MinecraftClientConnection$send$lambda$_8_0__init_ = (var$0, var$1, var$2, var$3, var$4) => {
    jl_Object__init_(var$0);
    var$0.$_03 = var$1;
    var$0.$_10 = var$2;
    var$0.$_20 = var$3;
    var$0.$_30 = var$4;
},
nmn_MinecraftClientConnection$send$lambda$_8_0__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new nmn_MinecraftClientConnection$send$lambda$_8_0();
    nmn_MinecraftClientConnection$send$lambda$_8_0__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jl_Math = $rt_classWithoutFields(),
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_Math_abs = $n => {
    if ($n < 0)
        $n =  -$n | 0;
    return $n;
},
jl_Math_abs0 = $n => {
    if (Long_lt($n, Long_ZERO))
        $n = Long_neg($n);
    return $n;
},
jl_Math_absImpl = var$1 => {
    return Math.abs(var$1);
},
jl_Math_abs1 = var$1 => {
    return jl_Math_absImpl(var$1);
};
function jl_Byte() {
    jl_Number.call(this);
    this.$value2 = 0;
}
let jl_Byte_TYPE = null,
jl_Byte_byteCache = null,
jl_Byte_$callClinit = () => {
    jl_Byte_$callClinit = $rt_eraseClinit(jl_Byte);
    jl_Byte__clinit_();
},
jl_Byte__init_ = ($this, $value) => {
    jl_Byte_$callClinit();
    jl_Number__init_($this);
    $this.$value2 = $value;
},
jl_Byte__init_0 = var_0 => {
    let var_1 = new jl_Byte();
    jl_Byte__init_(var_1, var_0);
    return var_1;
},
jl_Byte_ensureByteCache = () => {
    let $byteCache, $j, var$3;
    jl_Byte_$callClinit();
    $byteCache = $rt_createArray(jl_Byte, 256);
    $j = 0;
    while (true) {
        var$3 = $byteCache.data;
        if ($j >= var$3.length)
            break;
        var$3[$j] = jl_Byte__init_0(($j - 128 | 0) << 24 >> 24);
        $j = $j + 1 | 0;
    }
    return $byteCache;
},
jl_Byte__clinit_ = () => {
    jl_Byte_TYPE = $rt_cls($rt_bytecls);
    jl_Byte_byteCache = jl_Byte_ensureByteCache();
};
function jm_RoundingMode() {
    jl_Enum.call(this);
    this.$bigDecimalRM = 0;
}
let jm_RoundingMode_UP = null,
jm_RoundingMode_DOWN = null,
jm_RoundingMode_CEILING = null,
jm_RoundingMode_FLOOR = null,
jm_RoundingMode_HALF_UP = null,
jm_RoundingMode_HALF_DOWN = null,
jm_RoundingMode_HALF_EVEN = null,
jm_RoundingMode_UNNECESSARY = null,
jm_RoundingMode_$VALUES = null,
jm_RoundingMode_$callClinit = () => {
    jm_RoundingMode_$callClinit = $rt_eraseClinit(jm_RoundingMode);
    jm_RoundingMode__clinit_();
},
jm_RoundingMode_values = () => {
    jm_RoundingMode_$callClinit();
    return jm_RoundingMode_$VALUES.$clone0();
},
jm_RoundingMode__init_0 = ($this, var$1, var$2, $rm) => {
    jm_RoundingMode_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
    $this.$bigDecimalRM = $rm;
},
jm_RoundingMode__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jm_RoundingMode();
    jm_RoundingMode__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jm_RoundingMode_$values = () => {
    let var$1, var$2;
    jm_RoundingMode_$callClinit();
    var$1 = $rt_createArray(jm_RoundingMode, 8);
    var$2 = var$1.data;
    var$2[0] = jm_RoundingMode_UP;
    var$2[1] = jm_RoundingMode_DOWN;
    var$2[2] = jm_RoundingMode_CEILING;
    var$2[3] = jm_RoundingMode_FLOOR;
    var$2[4] = jm_RoundingMode_HALF_UP;
    var$2[5] = jm_RoundingMode_HALF_DOWN;
    var$2[6] = jm_RoundingMode_HALF_EVEN;
    var$2[7] = jm_RoundingMode_UNNECESSARY;
    return var$1;
},
jm_RoundingMode__clinit_ = () => {
    jm_RoundingMode_UP = jm_RoundingMode__init_($rt_s(101), 0, 0);
    jm_RoundingMode_DOWN = jm_RoundingMode__init_($rt_s(102), 1, 1);
    jm_RoundingMode_CEILING = jm_RoundingMode__init_($rt_s(103), 2, 2);
    jm_RoundingMode_FLOOR = jm_RoundingMode__init_($rt_s(104), 3, 3);
    jm_RoundingMode_HALF_UP = jm_RoundingMode__init_($rt_s(105), 4, 4);
    jm_RoundingMode_HALF_DOWN = jm_RoundingMode__init_($rt_s(106), 5, 5);
    jm_RoundingMode_HALF_EVEN = jm_RoundingMode__init_($rt_s(107), 6, 6);
    jm_RoundingMode_UNNECESSARY = jm_RoundingMode__init_($rt_s(108), 7, 7);
    jm_RoundingMode_$VALUES = jm_RoundingMode_$values();
},
jl_IllegalAccessException = $rt_classWithoutFields(jl_ReflectiveOperationException),
jl_IllegalAccessException__init_0 = $this => {
    jl_ReflectiveOperationException__init_($this);
},
jl_IllegalAccessException__init_ = () => {
    let var_0 = new jl_IllegalAccessException();
    jl_IllegalAccessException__init_0(var_0);
    return var_0;
},
nmn_MinecraftClientConnection$_clinit_$lambda$_44_0 = $rt_classWithoutFields(),
nmn_MinecraftClientConnection$_clinit_$lambda$_44_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
nmn_MinecraftClientConnection$_clinit_$lambda$_44_0__init_0 = () => {
    let var_0 = new nmn_MinecraftClientConnection$_clinit_$lambda$_44_0();
    nmn_MinecraftClientConnection$_clinit_$lambda$_44_0__init_(var_0);
    return var_0;
};
function jt_DecimalFormatParser() {
    let a = this; jl_Object.call(a);
    a.$positivePrefix0 = null;
    a.$positiveSuffix0 = null;
    a.$negativePrefix0 = null;
    a.$negativeSuffix0 = null;
    a.$groupSize = 0;
    a.$minimumIntLength = 0;
    a.$intLength = 0;
    a.$minimumFracLength = 0;
    a.$fracLength = 0;
    a.$exponentLength = 0;
    a.$decimalSeparatorRequired = 0;
    a.$string = null;
    a.$index = 0;
    a.$multiplier0 = 0;
}
let jt_DecimalFormatParser__init_ = $this => {
    jl_Object__init_($this);
},
jt_DecimalFormatParser__init_0 = () => {
    let var_0 = new jt_DecimalFormatParser();
    jt_DecimalFormatParser__init_(var_0);
    return var_0;
},
jt_DecimalFormatParser_parse = ($this, $string) => {
    let var$2, var$3, var$4, var$5;
    $this.$groupSize = 0;
    $this.$minimumFracLength = 0;
    $this.$fracLength = 0;
    $this.$exponentLength = 0;
    $this.$decimalSeparatorRequired = 0;
    $this.$multiplier0 = 1;
    $this.$string = $string;
    $this.$index = 0;
    $this.$positivePrefix0 = $this.$parseText(0, 0);
    if ($this.$index == $string.$length()) {
        var$2 = new jl_IllegalArgumentException;
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(109)), $string);
        jl_IllegalArgumentException__init_(var$2, jl_StringBuilder_toString(var$3));
        $rt_throw(var$2);
    }
    jt_DecimalFormatParser_parseNumber($this, 1);
    $this.$negativePrefix0 = null;
    $this.$negativeSuffix0 = null;
    if ($this.$index < $string.$length() && $string.$charAt($this.$index) != 59)
        $this.$positiveSuffix0 = $this.$parseText(1, 0);
    if ($this.$index < $string.$length()) {
        var$4 = $this.$index;
        $this.$index = var$4 + 1 | 0;
        if ($string.$charAt(var$4) != 59) {
            var$2 = new jl_IllegalArgumentException;
            var$5 = $this.$index;
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(110)), var$5), $rt_s(111)), $string);
            jl_IllegalArgumentException__init_(var$2, jl_StringBuilder_toString(var$3));
            $rt_throw(var$2);
        }
        $this.$negativePrefix0 = $this.$parseText(0, 1);
        jt_DecimalFormatParser_parseNumber($this, 0);
        $this.$negativeSuffix0 = $this.$parseText(1, 1);
    }
},
jt_DecimalFormatParser_apply = ($this, $format) => {
    $format.$positivePrefix = $this.$positivePrefix0;
    $format.$positiveSuffix = $this.$positiveSuffix0;
    if ($this.$negativePrefix0 !== null)
        $format.$negativePrefix = $this.$negativePrefix0;
    else {
        $format.$negativePrefix = $rt_createArray(jt_DecimalFormat$FormatField, $this.$positivePrefix0.data.length + 1 | 0);
        jl_System_fastArraycopy($this.$positivePrefix0, 0, $format.$negativePrefix, 1, $this.$positivePrefix0.data.length);
        $format.$negativePrefix.data[0] = jt_DecimalFormat$MinusField__init_0();
    }
    $format.$negativeSuffix = $this.$negativeSuffix0 === null ? $this.$positiveSuffix0 : $this.$negativeSuffix0;
    $format.$setGroupingSize($this.$groupSize);
    $format.$setGroupingUsed($this.$groupSize <= 0 ? 0 : 1);
    $format.$setMinimumIntegerDigits(!$this.$decimalSeparatorRequired ? $this.$minimumIntLength : jl_Math_max(1, $this.$minimumIntLength));
    $format.$setMaximumIntegerDigits($this.$intLength);
    $format.$setMinimumFractionDigits($this.$minimumFracLength);
    $format.$setMaximumFractionDigits($this.$fracLength);
    $format.$setDecimalSeparatorAlwaysShown($this.$decimalSeparatorRequired);
    $format.$exponentDigits = $this.$exponentLength;
    $format.$setMultiplier($this.$multiplier0);
},
jt_DecimalFormatParser_parseText = ($this, $suffix, $end) => {
    let $fields, $sb, $c, var$6, var$7, var$8, var$9, $next;
    $fields = ju_ArrayList__init_1();
    $sb = jl_StringBuilder__init_();
    a: {
        b: {
            c: while (true) {
                if ($this.$index >= $this.$string.$length())
                    break a;
                d: {
                    $c = $this.$string.$charAt($this.$index);
                    switch ($c) {
                        case 35:
                        case 48:
                            if (!$suffix)
                                break a;
                            var$6 = new jl_IllegalArgumentException;
                            var$7 = $this.$index;
                            var$8 = $this.$string;
                            var$9 = jl_StringBuilder__init_();
                            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$9, $rt_s(112)), var$7), $rt_s(111)), var$8);
                            jl_IllegalArgumentException__init_(var$6, jl_StringBuilder_toString(var$9));
                            $rt_throw(var$6);
                        case 37:
                            if ($sb.$length() > 0) {
                                $fields.$add(jt_DecimalFormat$TextField__init_($sb.$toString()));
                                $sb.$setLength(0);
                            }
                            $fields.$add(jt_DecimalFormat$PercentField__init_0());
                            $this.$index = $this.$index + 1 | 0;
                            $this.$multiplier0 = 100;
                            break d;
                        case 39:
                            $this.$index = $this.$index + 1 | 0;
                            $next = $this.$string.$indexOf0(39, $this.$index);
                            if ($next < 0) {
                                var$6 = new jl_IllegalArgumentException;
                                var$7 = $this.$index;
                                var$8 = $this.$string;
                                var$9 = jl_StringBuilder__init_();
                                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$9, $rt_s(113)), var$7), $rt_s(114)), var$8);
                                jl_IllegalArgumentException__init_(var$6, jl_StringBuilder_toString(var$9));
                                $rt_throw(var$6);
                            }
                            if ($next == $this.$index)
                                $sb.$append0(39);
                            else
                                $sb.$append16($this.$string.$substring0($this.$index, $next));
                            $this.$index = $next + 1 | 0;
                            break d;
                        case 45:
                            if ($sb.$length() > 0) {
                                $fields.$add(jt_DecimalFormat$TextField__init_($sb.$toString()));
                                $sb.$setLength(0);
                            }
                            $fields.$add(jt_DecimalFormat$MinusField__init_0());
                            $this.$index = $this.$index + 1 | 0;
                            break d;
                        case 46:
                        case 69:
                            break c;
                        case 59:
                            break b;
                        case 164:
                            if ($sb.$length() > 0) {
                                $fields.$add(jt_DecimalFormat$TextField__init_($sb.$toString()));
                                $sb.$setLength(0);
                            }
                            $fields.$add(jt_DecimalFormat$CurrencyField__init_0());
                            $this.$index = $this.$index + 1 | 0;
                            break d;
                        case 8240:
                            if ($sb.$length() > 0) {
                                $fields.$add(jt_DecimalFormat$TextField__init_($sb.$toString()));
                                $sb.$setLength(0);
                            }
                            $fields.$add(jt_DecimalFormat$PerMillField__init_0());
                            $this.$index = $this.$index + 1 | 0;
                            $this.$multiplier0 = 1000;
                            break d;
                        default:
                    }
                    $sb.$append0($c);
                    $this.$index = $this.$index + 1 | 0;
                }
            }
            var$6 = new jl_IllegalArgumentException;
            var$7 = $this.$index;
            var$8 = $this.$string;
            var$9 = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$9, $rt_s(112)), var$7), $rt_s(111)), var$8);
            jl_IllegalArgumentException__init_(var$6, jl_StringBuilder_toString(var$9));
            $rt_throw(var$6);
        }
        if ($end) {
            var$6 = new jl_IllegalArgumentException;
            var$7 = $this.$index;
            var$8 = $this.$string;
            var$9 = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$9, $rt_s(112)), var$7), $rt_s(111)), var$8);
            jl_IllegalArgumentException__init_(var$6, jl_StringBuilder_toString(var$9));
            $rt_throw(var$6);
        }
    }
    if ($sb.$length() > 0)
        $fields.$add(jt_DecimalFormat$TextField__init_($sb.$toString()));
    return $fields.$toArray($rt_createArray(jt_DecimalFormat$FormatField, $fields.$size()));
},
jt_DecimalFormatParser_parseNumber = ($this, $apply) => {
    jt_DecimalFormatParser_parseIntegerPart($this, $apply);
    if ($this.$index < $this.$string.$length() && $this.$string.$charAt($this.$index) == 46) {
        $this.$index = $this.$index + 1 | 0;
        jt_DecimalFormatParser_parseFractionalPart($this, $apply);
    }
    if ($this.$index < $this.$string.$length() && $this.$string.$charAt($this.$index) == 69) {
        $this.$index = $this.$index + 1 | 0;
        jt_DecimalFormatParser_parseExponent($this, $apply);
    }
},
jt_DecimalFormatParser_parseIntegerPart = ($this, $apply) => {
    let $start, $lastGroup, $optionalDigits, $length, $minimumLength, var$7, var$8, var$9, var$10;
    $start = $this.$index;
    $lastGroup = $this.$index;
    $optionalDigits = 1;
    $length = 0;
    $minimumLength = 0;
    a: {
        b: while (true) {
            if ($this.$index >= $this.$string.$length())
                break a;
            c: {
                d: {
                    switch ($this.$string.$charAt($this.$index)) {
                        case 35:
                            if (!$optionalDigits)
                                break b;
                            $length = $length + 1 | 0;
                            break c;
                        case 44:
                            break d;
                        case 48:
                            break;
                        default:
                            break a;
                    }
                    $optionalDigits = 0;
                    $length = $length + 1 | 0;
                    $minimumLength = $minimumLength + 1 | 0;
                    break c;
                }
                if ($lastGroup == $this.$index) {
                    var$7 = new jl_IllegalArgumentException;
                    var$8 = $this.$index;
                    var$9 = $this.$string;
                    var$10 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$10, $rt_s(115)), var$8), $rt_s(111)), var$9);
                    jl_IllegalArgumentException__init_(var$7, jl_StringBuilder_toString(var$10));
                    $rt_throw(var$7);
                }
                if ($apply)
                    $this.$groupSize = $this.$index - $lastGroup | 0;
                $lastGroup = $this.$index + 1 | 0;
            }
            $this.$index = $this.$index + 1 | 0;
        }
        var$7 = new jl_IllegalArgumentException;
        var$8 = $this.$index;
        var$9 = $this.$string;
        var$10 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$10, $rt_s(116)), var$8), $rt_s(111)), var$9);
        jl_IllegalArgumentException__init_(var$7, jl_StringBuilder_toString(var$10));
        $rt_throw(var$7);
    }
    if (!$length) {
        var$7 = new jl_IllegalArgumentException;
        var$8 = $this.$index;
        var$9 = $this.$string;
        var$10 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$10, $rt_s(117)), var$8), $rt_s(111)), var$9);
        jl_IllegalArgumentException__init_(var$7, jl_StringBuilder_toString(var$10));
        $rt_throw(var$7);
    }
    if ($lastGroup == $this.$index) {
        var$7 = new jl_IllegalArgumentException;
        var$8 = $this.$index;
        var$9 = $this.$string;
        var$10 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$10, $rt_s(118)), var$8), $rt_s(111)), var$9);
        jl_IllegalArgumentException__init_(var$7, jl_StringBuilder_toString(var$10));
        $rt_throw(var$7);
    }
    if ($apply && $lastGroup > $start)
        $this.$groupSize = $this.$index - $lastGroup | 0;
    if ($apply) {
        $this.$intLength = $length;
        $this.$minimumIntLength = $minimumLength;
    }
},
jt_DecimalFormatParser_parseFractionalPart = ($this, $apply) => {
    let $optionalDigits, $length, $minimumLength, var$5, var$6, var$7, var$8;
    $optionalDigits = 0;
    $length = 0;
    $minimumLength = 0;
    a: {
        b: while (true) {
            if ($this.$index >= $this.$string.$length())
                break a;
            c: {
                switch ($this.$string.$charAt($this.$index)) {
                    case 35:
                        break;
                    case 44:
                        var$5 = new jl_IllegalArgumentException;
                        var$6 = $this.$index;
                        var$7 = $this.$string;
                        var$8 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$8, $rt_s(119)), var$6), $rt_s(111)), var$7);
                        jl_IllegalArgumentException__init_(var$5, jl_StringBuilder_toString(var$8));
                        $rt_throw(var$5);
                    case 46:
                        var$5 = new jl_IllegalArgumentException;
                        var$6 = $this.$index;
                        var$7 = $this.$string;
                        var$8 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$8, $rt_s(120)), var$6), $rt_s(111)), var$7);
                        jl_IllegalArgumentException__init_(var$5, jl_StringBuilder_toString(var$8));
                        $rt_throw(var$5);
                    case 48:
                        if ($optionalDigits)
                            break b;
                        $length = $length + 1 | 0;
                        $minimumLength = $minimumLength + 1 | 0;
                        break c;
                    default:
                        break a;
                }
                $length = $length + 1 | 0;
                $optionalDigits = 1;
            }
            $this.$index = $this.$index + 1 | 0;
        }
        var$5 = new jl_IllegalArgumentException;
        var$6 = $this.$index;
        var$7 = $this.$string;
        var$8 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$8, $rt_s(121)), var$6), $rt_s(111)), var$7);
        jl_IllegalArgumentException__init_(var$5, jl_StringBuilder_toString(var$8));
        $rt_throw(var$5);
    }
    if ($apply) {
        $this.$fracLength = $length;
        $this.$minimumFracLength = $minimumLength;
        $this.$decimalSeparatorRequired = $length ? 0 : 1;
    }
},
jt_DecimalFormatParser_parseExponent = ($this, $apply) => {
    let $length, var$3, var$4, var$5, var$6;
    $length = 0;
    a: {
        b: while (true) {
            if ($this.$index >= $this.$string.$length())
                break a;
            switch ($this.$string.$charAt($this.$index)) {
                case 35:
                case 44:
                case 46:
                case 69:
                    break b;
                case 48:
                    break;
                default:
                    break a;
            }
            $length = $length + 1 | 0;
            $this.$index = $this.$index + 1 | 0;
        }
        var$3 = new jl_IllegalArgumentException;
        var$4 = $this.$index;
        var$5 = $this.$string;
        var$6 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$6, $rt_s(122)), var$4), $rt_s(111)), var$5);
        jl_IllegalArgumentException__init_(var$3, jl_StringBuilder_toString(var$6));
        $rt_throw(var$3);
    }
    if ($length) {
        if ($apply)
            $this.$exponentLength = $length;
        return;
    }
    var$3 = new jl_IllegalArgumentException;
    var$4 = $this.$index;
    var$5 = $this.$string;
    var$6 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$6, $rt_s(123)), var$4), $rt_s(111)), var$5);
    jl_IllegalArgumentException__init_(var$3, jl_StringBuilder_toString(var$6));
    $rt_throw(var$3);
},
jlr_Modifier = $rt_classWithoutFields(),
jlr_Modifier_canonicalOrder = null,
jlr_Modifier_$callClinit = () => {
    jlr_Modifier_$callClinit = $rt_eraseClinit(jlr_Modifier);
    jlr_Modifier__clinit_();
},
jlr_Modifier_isPublic = $mod => {
    jlr_Modifier_$callClinit();
    return !($mod & 1) ? 0 : 1;
},
jlr_Modifier__clinit_ = () => {
    jlr_Modifier_canonicalOrder = $rt_createIntArrayFromData([1, 4, 2, 1024, 8, 16, 128, 64, 32, 256, 2048, 512]);
},
juc_ConcurrentLinkedQueue = $rt_classWithoutFields(),
juc_ConcurrentLinkedQueue__init_ = var$0 => {
    jl_Object__init_(var$0);
},
juc_ConcurrentLinkedQueue__init_0 = () => {
    let var_0 = new juc_ConcurrentLinkedQueue();
    juc_ConcurrentLinkedQueue__init_(var_0);
    return var_0;
},
juc_ConcurrentLinkedQueue_poll = var$0 => {
    return null;
},
juc_ConcurrentLinkedQueue_isEmpty = var$0 => {
    return 0;
},
juc_ConcurrentLinkedQueue_add = (var$0, var$1) => {
    return 0;
},
ju_Formattable = $rt_classWithoutFields(0);
function yx$6() {
    let a = this; jl_Object.call(a);
    a.$a0 = null;
    a.$b0 = null;
}
let yx$6__init_ = ($this, var$1, var$2) => {
    $this.$a0 = var$1;
    $this.$b0 = var$2;
    jl_Object__init_($this);
},
yx$6__init_0 = (var_0, var_1) => {
    let var_2 = new yx$6();
    yx$6__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount0 = 0;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
let ju_HashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
},
ju_HashMap__init_1 = $this => {
    ju_HashMap__init_($this, 16);
},
ju_HashMap__init_2 = () => {
    let var_0 = new ju_HashMap();
    ju_HashMap__init_1(var_0);
    return var_0;
},
ju_HashMap__init_ = ($this, $capacity) => {
    ju_HashMap__init_0($this, $capacity, 0.75);
},
ju_HashMap__init_3 = var_0 => {
    let var_1 = new ju_HashMap();
    ju_HashMap__init_(var_1, var_0);
    return var_1;
},
ju_HashMap_calculateCapacity = $x => {
    let var$2, var$3;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
},
ju_HashMap__init_0 = ($this, $capacity, $loadFactor) => {
    let var$3;
    ju_AbstractMap__init_($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount = 0;
        $this.$elementData = $this.$newElementArray(var$3);
        $this.$loadFactor = $loadFactor;
        ju_HashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
},
ju_HashMap__init_4 = (var_0, var_1) => {
    let var_2 = new ju_HashMap();
    ju_HashMap__init_0(var_2, var_0, var_1);
    return var_2;
},
ju_HashMap_computeThreshold = $this => {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor | 0;
},
ju_HashMap_get = ($this, $key) => {
    let $m;
    $m = ju_HashMap_entryByKey($this, $key);
    if ($m === null)
        return null;
    return $m.$value0;
},
ju_HashMap_entryByKey = ($this, $key) => {
    let $m, $hash, $index;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = $key.$hashCode0();
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    }
    return $m;
},
ju_HashMap_findNonNullKeyEntry = ($this, $key, $index, $keyHash) => {
    let $m;
    $m = $this.$elementData.data[$index];
    while ($m !== null && !($m.$origKeyHash == $keyHash && ju_HashMap_areEqualKeys($key, $m.$key))) {
        $m = $m.$next0;
    }
    return $m;
},
ju_HashMap_findNullKeyEntry = $this => {
    let $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next0;
    }
    return $m;
},
ju_HashMap_put = ($this, $key, $value) => {
    return ju_HashMap_putImpl($this, $key, $value);
},
ju_HashMap_putImpl = ($this, $key, $value) => {
    let $entry, var$4, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, null, 0, 0);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    } else {
        $hash = $key.$hashCode0();
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, $key, $index, $hash);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    }
    $result = $entry.$value0;
    $entry.$value0 = $value;
    return $result;
},
ju_HashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry;
    $entry = ju_HashMap$HashEntry__init_0($key, $hash);
    $entry.$next0 = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    return $entry;
},
ju_HashMap_rehash = ($this, $capacity) => {
    let $length, $newData, $i, $entry, var$6, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray($length);
    $i = 0;
    while ($i < $this.$elementData.data.length) {
        $entry = $this.$elementData.data[$i];
        $this.$elementData.data[$i] = null;
        while ($entry !== null) {
            var$6 = $newData.data;
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next0;
            $entry.$next0 = var$6[$index];
            var$6[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap_rehash0 = $this => {
    $this.$rehash0($this.$elementData.data.length);
},
ju_HashMap_areEqualKeys = ($key1, $key2) => {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
},
jt_DecimalFormat$MinusField = $rt_classWithoutFields(),
jt_DecimalFormat$MinusField__init_ = $this => {
    jl_Object__init_($this);
},
jt_DecimalFormat$MinusField__init_0 = () => {
    let var_0 = new jt_DecimalFormat$MinusField();
    jt_DecimalFormat$MinusField__init_(var_0);
    return var_0;
},
jt_DecimalFormat$MinusField_render = ($this, $format, $buffer) => {
    $buffer.$append3($format.$symbols.$getMinusSign());
},
otcit_DoubleAnalyzer = $rt_classWithoutFields(),
otcit_DoubleAnalyzer_MAX_MANTISSA = Long_ZERO,
otcit_DoubleAnalyzer_resultForLog10 = null,
otcit_DoubleAnalyzer_mantissa10Table = null,
otcit_DoubleAnalyzer_exp10Table = null,
otcit_DoubleAnalyzer_$callClinit = () => {
    otcit_DoubleAnalyzer_$callClinit = $rt_eraseClinit(otcit_DoubleAnalyzer);
    otcit_DoubleAnalyzer__clinit_();
},
otcit_DoubleAnalyzer_fastIntLog10 = $d => {
    let $result, $exponent;
    otcit_DoubleAnalyzer_$callClinit();
    $result = otcit_DoubleAnalyzer_resultForLog10;
    otcit_DoubleAnalyzer_analyze($d, $result);
    $exponent = $result.$exponent;
    if ($exponent < 0 && Long_gt($result.$mantissa, Long_create(1569325056, 23283064)))
        $exponent = $exponent + 1 | 0;
    return $exponent;
},
otcit_DoubleAnalyzer_analyze = ($d, $result) => {
    let $bits, $mantissa, $exponent, var$6, $decExponent, var$8, var$9, $binExponentCorrection, $mantissaShift, $decMantissa, var$13, var$14, var$15, $decMantissaHi, $decMantissaLow, $lowerPos, $upperPos, $posCmp;
    otcit_DoubleAnalyzer_$callClinit();
    $bits = jl_Double_doubleToLongBits($d);
    $result.$sign0 = Long_eq(Long_and($bits, Long_create(0, 2147483648)), Long_ZERO) ? 0 : 1;
    $mantissa = Long_and($bits, Long_create(4294967295, 1048575));
    $exponent = Long_lo(Long_shr($bits, 52)) & 2047;
    if (Long_eq($mantissa, Long_ZERO) && !$exponent) {
        $result.$mantissa = Long_ZERO;
        $result.$exponent = 0;
        return;
    }
    if ($exponent)
        var$6 = Long_or($mantissa, Long_create(0, 1048576));
    else {
        var$6 = Long_shl($mantissa, 1);
        while (Long_eq(Long_and(var$6, Long_create(0, 1048576)), Long_ZERO)) {
            var$6 = Long_shl(var$6, 1);
            $exponent = $exponent + (-1) | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch(otcit_DoubleAnalyzer_exp10Table, $exponent << 16 >> 16);
    if ($decExponent < 0)
        $decExponent =  -$decExponent | 0;
    var$8 = otcit_DoubleAnalyzer_exp10Table.data;
    var$9 = $decExponent + 1 | 0;
    $binExponentCorrection = $exponent - var$8[var$9] | 0;
    $mantissaShift = 12 + $binExponentCorrection | 0;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, otcit_DoubleAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    if (Long_le($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA)) {
        while (jl_Long_compareUnsigned($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA) <= 0) {
            $decExponent = $decExponent + (-1) | 0;
            $decMantissa = Long_add(Long_mul($decMantissa, Long_fromInt(10)), Long_fromInt(9));
        }
        var$8 = otcit_DoubleAnalyzer_exp10Table.data;
        var$9 = $decExponent + 1 | 0;
        var$13 = $exponent - var$8[var$9] | 0;
        $mantissaShift = 12 + var$13 | 0;
        $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, otcit_DoubleAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    }
    var$14 = Long_shl(var$6, 1);
    var$6 = Long_add(var$14, Long_fromInt(1));
    var$8 = otcit_DoubleAnalyzer_mantissa10Table.data;
    var$13 = $decExponent + 1 | 0;
    var$15 = var$8[var$13];
    var$9 = $mantissaShift - 1 | 0;
    $decMantissaHi = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, var$15, var$9);
    $decMantissaLow = otcit_DoubleAnalyzer_mulAndShiftRight(Long_sub(var$14, Long_fromInt(1)), otcit_DoubleAnalyzer_mantissa10Table.data[var$13], var$9);
    $lowerPos = otcit_DoubleAnalyzer_findLowerDistance($decMantissa, $decMantissaLow);
    $upperPos = otcit_DoubleAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = jl_Long_compareUnsigned($lowerPos, $upperPos);
    var$6 = $posCmp > 0 ? Long_mul(jl_Long_divideUnsigned($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? Long_add(Long_mul(jl_Long_divideUnsigned($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(jl_Long_divideUnsigned(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
    if (jl_Long_compareUnsigned(var$6, Long_create(2808348672, 232830643)) >= 0)
        while (true) {
            $decExponent = $decExponent + 1 | 0;
            var$6 = jl_Long_divideUnsigned(var$6, Long_fromInt(10));
            if (jl_Long_compareUnsigned(var$6, Long_create(2808348672, 232830643)) < 0)
                break;
        }
    else if (jl_Long_compareUnsigned(var$6, Long_create(1569325056, 23283064)) < 0) {
        $decExponent = $decExponent + (-1) | 0;
        var$6 = Long_mul(var$6, Long_fromInt(10));
    }
    $result.$mantissa = var$6;
    $result.$exponent = $decExponent - 330 | 0;
},
otcit_DoubleAnalyzer_findLowerDistance = ($mantissa, $lower) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        var$5 = jl_Long_divideUnsigned($mantissa, $pos_0);
        var$6 = jl_Long_divideUnsigned($lower, $pos_0);
        if (jl_Long_compareUnsigned(var$5, var$6) <= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_findUpperDistance = ($mantissa, $upper) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        var$5 = jl_Long_divideUnsigned($mantissa, $pos_0);
        var$6 = jl_Long_divideUnsigned($upper, $pos_0);
        if (jl_Long_compareUnsigned(var$5, var$6) >= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_mulAndShiftRight = ($a, $b, $shift) => {
    let $a1, $a2, $a3, $a4, $b1, $b2, $b3, $b4, $cm, $c0, $c1, $c2, $c3, $c, var$18;
    otcit_DoubleAnalyzer_$callClinit();
    $a1 = Long_and($a, Long_fromInt(65535));
    $a2 = Long_and(Long_shru($a, 16), Long_fromInt(65535));
    $a3 = Long_and(Long_shru($a, 32), Long_fromInt(65535));
    $a4 = Long_and(Long_shru($a, 48), Long_fromInt(65535));
    $b1 = Long_and($b, Long_fromInt(65535));
    $b2 = Long_and(Long_shru($b, 16), Long_fromInt(65535));
    $b3 = Long_and(Long_shru($b, 32), Long_fromInt(65535));
    $b4 = Long_and(Long_shru($b, 48), Long_fromInt(65535));
    $cm = Long_add(Long_add(Long_mul($b3, $a1), Long_mul($b2, $a2)), Long_mul($b1, $a3));
    $c0 = Long_add(Long_add(Long_add(Long_mul($b4, $a1), Long_mul($b3, $a2)), Long_mul($b2, $a3)), Long_mul($b1, $a4));
    $c1 = Long_add(Long_add(Long_mul($b4, $a2), Long_mul($b3, $a3)), Long_mul($b2, $a4));
    $c2 = Long_add(Long_mul($b4, $a3), Long_mul($b3, $a4));
    $c3 = Long_mul($b4, $a4);
    $c = Long_add(Long_add(Long_shl($c3, 32 + $shift | 0), Long_shl($c2, 16 + $shift | 0)), Long_shl($c1, $shift));
    var$18 = Long_add($cm, Long_shl($c0, 16));
    var$18 = Long_add($c, Long_shru(var$18, 32 - $shift | 0));
    return var$18;
},
otcit_DoubleAnalyzer__clinit_ = () => {
    otcit_DoubleAnalyzer_MAX_MANTISSA = jl_Long_divideUnsigned(Long_fromInt(-1), Long_fromInt(10));
    otcit_DoubleAnalyzer_resultForLog10 = otcit_DoubleAnalyzer$Result__init_();
    otcit_DoubleAnalyzer_mantissa10Table = $rt_createLongArrayFromData([Long_create(3251292512, 2194092222), Long_create(1766094183, 3510547556), Long_create(553881887, 2808438045), Long_create(443105509, 2246750436), Long_create(3285949193, 3594800697), Long_create(910772436, 2875840558), Long_create(2446604867, 2300672446), Long_create(2196580869, 3681075914), Long_create(2616258154, 2944860731), Long_create(1234013064, 2355888585), Long_create(1974420903, 3769421736), Long_create(720543263, 3015537389), Long_create(1435428070, 2412429911),
    Long_create(578697993, 3859887858), Long_create(2180945313, 3087910286), Long_create(885762791, 2470328229), Long_create(3135207384, 3952525166), Long_create(1649172448, 3162020133), Long_create(3037324877, 2529616106), Long_create(3141732885, 4047385770), Long_create(2513386308, 3237908616), Long_create(1151715587, 2590326893), Long_create(983751480, 4144523029), Long_create(1645994643, 3315618423), Long_create(3034782633, 2652494738), Long_create(3996658754, 4243991581), Long_create(2338333544, 3395193265),
    Long_create(1870666835, 2716154612), Long_create(4073513845, 2172923689), Long_create(3940641775, 3476677903), Long_create(575533043, 2781342323), Long_create(2178413352, 2225073858), Long_create(2626467905, 3560118173), Long_create(3819161242, 2848094538), Long_create(478348616, 2278475631), Long_create(3342338164, 3645561009), Long_create(3532863990, 2916448807), Long_create(1108304273, 2333159046), Long_create(55299919, 3733054474), Long_create(903233395, 2986443579), Long_create(1581580175, 2389154863),
    Long_create(1671534821, 3822647781), Long_create(478234397, 3058118225), Long_create(382587518, 2446494580), Long_create(612140029, 3914391328), Long_create(2207698941, 3131513062), Long_create(48172235, 2505210450), Long_create(77075576, 4008336720), Long_create(61660460, 3206669376), Long_create(3485302205, 2565335500), Long_create(1281516232, 4104536801), Long_create(166219527, 3283629441), Long_create(3568949458, 2626903552), Long_create(2274345296, 4203045684), Long_create(2678469696, 3362436547), Long_create(424788838, 2689949238),
    Long_create(2057817989, 2151959390), Long_create(3292508783, 3443135024), Long_create(3493000485, 2754508019), Long_create(3653393847, 2203606415), Long_create(1550462860, 3525770265), Long_create(1240370288, 2820616212), Long_create(3569276608, 2256492969), Long_create(3133862195, 3610388751), Long_create(1648096297, 2888311001), Long_create(459483578, 2310648801), Long_create(3312154103, 3697038081), Long_create(1790729823, 2957630465), Long_create(1432583858, 2366104372), Long_create(3151127633, 3785766995),
    Long_create(2520902106, 3028613596), Long_create(1157728226, 2422890877), Long_create(2711358621, 3876625403), Long_create(3887073815, 3101300322), Long_create(1391672133, 2481040258), Long_create(1367681954, 3969664413), Long_create(2812132482, 3175731530), Long_create(2249705985, 2540585224), Long_create(1022549199, 4064936359), Long_create(1677032818, 3251949087), Long_create(3918606632, 2601559269), Long_create(3692790234, 4162494831), Long_create(2095238728, 3329995865), Long_create(1676190982, 2663996692),
    Long_create(3540899031, 4262394707), Long_create(1114732307, 3409915766), Long_create(32792386, 2727932613), Long_create(1744220827, 2182346090), Long_create(2790753324, 3491753744), Long_create(3091596118, 2793402995), Long_create(2473276894, 2234722396), Long_create(2239256113, 3575555834), Long_create(2650398349, 2860444667), Long_create(402331761, 2288355734), Long_create(2361717736, 3661369174), Long_create(2748367648, 2929095339), Long_create(3057687578, 2343276271), Long_create(3174313206, 3749242034),
    Long_create(3398444024, 2999393627), Long_create(1000768301, 2399514902), Long_create(2460222741, 3839223843), Long_create(3686165111, 3071379074), Long_create(3807925548, 2457103259), Long_create(3515700499, 3931365215), Long_create(2812560399, 3145092172), Long_create(532061401, 2516073738), Long_create(4287272078, 4025717980), Long_create(3429817663, 3220574384), Long_create(3602847589, 2576459507), Long_create(2328582306, 4122335212), Long_create(144878926, 3297868170), Long_create(115903141, 2638294536),
    Long_create(2762425404, 4221271257), Long_create(491953404, 3377017006), Long_create(3829536560, 2701613604), Long_create(3922622707, 2161290883), Long_create(1122235577, 3458065414), Long_create(1756781920, 2766452331), Long_create(546432077, 2213161865), Long_create(874291324, 3541058984), Long_create(1558426518, 2832847187), Long_create(3823721592, 2266277749), Long_create(3540974170, 3626044399), Long_create(3691772795, 2900835519), Long_create(3812411695, 2320668415), Long_create(1804891416, 3713069465),
    Long_create(1443913133, 2970455572), Long_create(3732110884, 2376364457), Long_create(2535403578, 3802183132), Long_create(310335944, 3041746506), Long_create(3684242592, 2433397204), Long_create(3317807769, 3893435527), Long_create(936259297, 3114748422), Long_create(3325987815, 2491798737), Long_create(1885606668, 3986877980), Long_create(1508485334, 3189502384), Long_create(2065781726, 2551601907), Long_create(4164244222, 4082563051), Long_create(2472401918, 3266050441), Long_create(1118928075, 2612840353),
    Long_create(931291461, 4180544565), Long_create(745033169, 3344435652), Long_create(3173006913, 2675548521), Long_create(3358824142, 4280877634), Long_create(3546052773, 3424702107), Long_create(1118855300, 2739761686), Long_create(36090780, 2191809349), Long_create(1775732167, 3506894958), Long_create(3138572652, 2805515966), Long_create(1651864662, 2244412773), Long_create(1783990001, 3591060437), Long_create(4004172378, 2872848349), Long_create(4062331362, 2298278679), Long_create(3922749802, 3677245887),
    Long_create(1420212923, 2941796710), Long_create(1136170338, 2353437368), Long_create(958879082, 3765499789), Long_create(1626096725, 3012399831), Long_create(441883920, 2409919865), Long_create(707014273, 3855871784), Long_create(1424604878, 3084697427), Long_create(3716664280, 2467757941), Long_create(4228675929, 3948412706), Long_create(2523947284, 3158730165), Long_create(2019157827, 2526984132), Long_create(4089645983, 4043174611), Long_create(2412723327, 3234539689), Long_create(2789172121, 2587631751),
    Long_create(2744688475, 4140210802), Long_create(477763862, 3312168642), Long_create(2959191467, 2649734913), Long_create(3875712888, 4239575861), Long_create(2241576851, 3391660689), Long_create(2652254940, 2713328551), Long_create(1262810493, 2170662841), Long_create(302509870, 3473060546), Long_create(3677981733, 2778448436), Long_create(2083391927, 2222758749), Long_create(756446706, 3556413999), Long_create(1464150824, 2845131199), Long_create(2030314118, 2276104959), Long_create(671522212, 3641767935),
    Long_create(537217769, 2913414348), Long_create(2147761134, 2330731478), Long_create(2577424355, 3729170365), Long_create(2061939484, 2983336292), Long_create(4226531965, 2386669033), Long_create(1608490388, 3818670454), Long_create(2145785770, 3054936363), Long_create(3434615534, 2443949090), Long_create(1200417559, 3910318545), Long_create(960334047, 3128254836), Long_create(4204241074, 2502603868), Long_create(1572824964, 4004166190), Long_create(1258259971, 3203332952), Long_create(3583588354, 2562666361),
    Long_create(4015754449, 4100266178), Long_create(635623181, 3280212943), Long_create(2226485463, 2624170354), Long_create(985396364, 4198672567), Long_create(3365297469, 3358938053), Long_create(115257597, 2687150443), Long_create(1810192996, 2149720354), Long_create(319328417, 3439552567), Long_create(2832443111, 2751642053), Long_create(3983941407, 2201313642), Long_create(2938332415, 3522101828), Long_create(4068652850, 2817681462), Long_create(1536935362, 2254145170), Long_create(2459096579, 3606632272),
    Long_create(249290345, 2885305818), Long_create(1917419194, 2308244654), Long_create(490890333, 3693191447), Long_create(2969692644, 2954553157), Long_create(657767197, 2363642526), Long_create(3629407892, 3781828041), Long_create(2044532855, 3025462433), Long_create(3353613202, 2420369946), Long_create(3647794205, 3872591914), Long_create(3777228823, 3098073531), Long_create(2162789599, 2478458825), Long_create(3460463359, 3965534120), Long_create(2768370687, 3172427296), Long_create(1355703090, 2537941837),
    Long_create(3028118404, 4060706939), Long_create(3281488183, 3248565551), Long_create(1766197087, 2598852441), Long_create(1107928421, 4158163906), Long_create(27349277, 3326531125), Long_create(21879422, 2661224900), Long_create(35007075, 4257959840), Long_create(28005660, 3406367872), Long_create(2599384905, 2725094297), Long_create(361521006, 2180075438), Long_create(4014407446, 3488120700), Long_create(3211525957, 2790496560), Long_create(2569220766, 2232397248), Long_create(3251759766, 3571835597),
    Long_create(883420894, 2857468478), Long_create(2424723634, 2285974782), Long_create(443583977, 3657559652), Long_create(2931847559, 2926047721), Long_create(1486484588, 2340838177), Long_create(3237368801, 3745341083), Long_create(12914663, 2996272867), Long_create(2587312108, 2397018293), Long_create(3280705914, 3835229269), Long_create(3483558190, 3068183415), Long_create(2786846552, 2454546732), Long_create(1022980646, 3927274772), Long_create(3395364895, 3141819817), Long_create(998304997, 2513455854),
    Long_create(3315274914, 4021529366), Long_create(1793226472, 3217223493), Long_create(3152568096, 2573778794), Long_create(2467128576, 4118046071), Long_create(1114709402, 3294436857), Long_create(3468747899, 2635549485), Long_create(1255029343, 4216879177), Long_create(3581003852, 3373503341), Long_create(2005809622, 2698802673), Long_create(3322634616, 2159042138), Long_create(162254630, 3454467422), Long_create(2706784082, 2763573937), Long_create(447440347, 2210859150), Long_create(715904555, 3537374640),
    Long_create(572723644, 2829899712), Long_create(3035159293, 2263919769), Long_create(2279274491, 3622271631), Long_create(964426134, 2897817305), Long_create(771540907, 2318253844), Long_create(2952452370, 3709206150), Long_create(2361961896, 2967364920), Long_create(1889569516, 2373891936), Long_create(1305324308, 3798227098), Long_create(2762246365, 3038581678), Long_create(3927784010, 2430865342), Long_create(2848480580, 3889384548), Long_create(3996771382, 3111507638), Long_create(620436728, 2489206111),
    Long_create(3569679143, 3982729777), Long_create(1137756396, 3186183822), Long_create(3487185494, 2548947057), Long_create(2143522954, 4078315292), Long_create(4291798741, 3262652233), Long_create(856458615, 2610121787), Long_create(2229327243, 4176194859), Long_create(2642455254, 3340955887), Long_create(395977285, 2672764710), Long_create(633563656, 4276423536), Long_create(3942824761, 3421138828), Long_create(577279431, 2736911063), Long_create(2179810463, 2189528850), Long_create(3487696741, 3503246160),
    Long_create(2790157393, 2802596928), Long_create(3950112833, 2242077542), Long_create(2884206696, 3587324068), Long_create(4025352275, 2869859254), Long_create(4079275279, 2295887403), Long_create(1372879692, 3673419846), Long_create(239310294, 2938735877), Long_create(2768428613, 2350988701), Long_create(2711498862, 3761581922), Long_create(451212171, 3009265538), Long_create(2078956655, 2407412430), Long_create(3326330649, 3851859888), Long_create(84084141, 3081487911), Long_create(3503241150, 2465190328),
    Long_create(451225085, 3944304526), Long_create(3796953905, 3155443620), Long_create(3037563124, 2524354896), Long_create(3142114080, 4038967834), Long_create(3372684723, 3231174267), Long_create(980160860, 2584939414), Long_create(3286244294, 4135903062), Long_create(911008517, 3308722450), Long_create(728806813, 2646977960), Long_create(1166090902, 4235164736), Long_create(73879262, 3388131789), Long_create(918096869, 2710505431), Long_create(4170451332, 2168404344), Long_create(4095741754, 3469446951),
    Long_create(2417599944, 2775557561), Long_create(1075086496, 2220446049), Long_create(3438125312, 3552713678), Long_create(173519872, 2842170943), Long_create(1856802816, 2273736754), Long_create(393904128, 3637978807), Long_create(2892103680, 2910383045), Long_create(2313682944, 2328306436), Long_create(1983905792, 3725290298), Long_create(3305111552, 2980232238), Long_create(67108864, 2384185791), Long_create(2684354560, 3814697265), Long_create(2147483648, 3051757812), Long_create(0, 2441406250), Long_create(0, 3906250000),
    Long_create(0, 3125000000), Long_create(0, 2500000000), Long_create(0, 4000000000), Long_create(0, 3200000000), Long_create(0, 2560000000), Long_create(0, 4096000000), Long_create(0, 3276800000), Long_create(0, 2621440000), Long_create(0, 4194304000), Long_create(0, 3355443200), Long_create(0, 2684354560), Long_create(0, 2147483648), Long_create(3435973836, 3435973836), Long_create(1889785610, 2748779069), Long_create(2370821947, 2199023255), Long_create(3793315115, 3518437208), Long_create(457671715, 2814749767),
    Long_create(2943117749, 2251799813), Long_create(3849994940, 3602879701), Long_create(2221002492, 2882303761), Long_create(917808535, 2305843009), Long_create(3186480574, 3689348814), Long_create(3408177918, 2951479051), Long_create(1867548875, 2361183241), Long_create(1270091283, 3777893186), Long_create(157079567, 3022314549), Long_create(984657113, 2417851639), Long_create(3293438299, 3868562622), Long_create(916763721, 3094850098), Long_create(2451397895, 2475880078), Long_create(3063243173, 3961408125),
    Long_create(2450594538, 3169126500), Long_create(1960475630, 2535301200), Long_create(3136761009, 4056481920), Long_create(2509408807, 3245185536), Long_create(1148533586, 2596148429), Long_create(3555640657, 4153837486), Long_create(1985519066, 3323069989), Long_create(2447408712, 2658455991), Long_create(2197867021, 4253529586), Long_create(899300158, 3402823669), Long_create(1578433585, 2722258935), Long_create(1262746868, 2177807148), Long_create(1161401530, 3484491437), Long_create(3506101601, 2787593149),
    Long_create(3663874740, 2230074519), Long_create(3285219207, 3568119231), Long_create(1769181906, 2854495385), Long_create(1415345525, 2283596308), Long_create(1405559381, 3653754093), Long_create(2842434423, 2923003274), Long_create(3132940998, 2338402619), Long_create(2435725219, 3741444191), Long_create(1089586716, 2993155353), Long_create(2589656291, 2394524282), Long_create(707476229, 3831238852), Long_create(3142961361, 3064991081), Long_create(1655375629, 2451992865), Long_create(2648601007, 3923188584),
    Long_create(2977874265, 3138550867), Long_create(664312493, 2510840694), Long_create(2780886908, 4017345110), Long_create(2224709526, 3213876088), Long_create(3497754539, 2571100870), Long_create(1301439967, 4113761393), Long_create(2759138892, 3291009114), Long_create(3066304573, 2632807291), Long_create(3188100398, 4212491666), Long_create(1691486859, 3369993333), Long_create(3071176406, 2695994666), Long_create(1597947665, 2156795733), Long_create(1697722806, 3450873173), Long_create(3076165163, 2760698538),
    Long_create(4178919049, 2208558830), Long_create(2391303182, 3533694129), Long_create(2772036005, 2826955303), Long_create(3935615722, 2261564242), Long_create(2861011319, 3618502788), Long_create(4006795973, 2894802230), Long_create(3205436779, 2315841784), Long_create(2551718468, 3705346855), Long_create(2041374775, 2964277484), Long_create(2492093279, 2371421987), Long_create(551375410, 3794275180), Long_create(441100328, 3035420144), Long_create(1211873721, 2428336115), Long_create(1938997954, 3885337784),
    Long_create(2410191822, 3108270227), Long_create(210166539, 2486616182), Long_create(1195259923, 3978585891), Long_create(97214479, 3182868713), Long_create(1795758501, 2546294970), Long_create(2873213602, 4074071952), Long_create(580583963, 3259257562), Long_create(3041447548, 2607406049), Long_create(2289335700, 4171849679), Long_create(2690462019, 3337479743), Long_create(3870356534, 2669983794), Long_create(3615590076, 4271974071), Long_create(2033478602, 3417579257), Long_create(4203763259, 2734063405),
    Long_create(3363010607, 2187250724), Long_create(2803836594, 3499601159), Long_create(3102062734, 2799680927), Long_create(763663269, 2239744742), Long_create(2080854690, 3583591587), Long_create(4241664129, 2866873269), Long_create(4252324763, 2293498615), Long_create(2508752324, 3669597785), Long_create(2007001859, 2935678228), Long_create(3323588406, 2348542582), Long_create(1881767613, 3757668132), Long_create(4082394468, 3006134505), Long_create(3265915574, 2404907604), Long_create(2648484541, 3847852167),
    Long_create(400800715, 3078281734), Long_create(1179634031, 2462625387), Long_create(2746407909, 3940200619), Long_create(3056119786, 3152160495), Long_create(2444895829, 2521728396), Long_create(2193846408, 4034765434), Long_create(2614070585, 3227812347), Long_create(373269550, 2582249878), Long_create(4033205117, 4131599804), Long_create(4085557553, 3305279843), Long_create(691465664, 2644223875), Long_create(1106345063, 4230758200), Long_create(885076050, 3384606560), Long_create(708060840, 2707685248),
    Long_create(2284435591, 2166148198), Long_create(2796103486, 3465837117), Long_create(518895870, 2772669694), Long_create(1274110155, 2218135755), Long_create(2038576249, 3549017208), Long_create(3348847917, 2839213766), Long_create(1820084875, 2271371013), Long_create(2053142340, 3634193621), Long_create(783520413, 2907354897), Long_create(3203796708, 2325883917), Long_create(1690100896, 3721414268), Long_create(3070067635, 2977131414), Long_create(3315047567, 2381705131), Long_create(3586089190, 3810728210),
    Long_create(2868871352, 3048582568), Long_create(4013084000, 2438866054), Long_create(3843954022, 3902185687), Long_create(1357176299, 3121748550), Long_create(1085741039, 2497398840), Long_create(1737185663, 3995838144), Long_create(2248741989, 3196670515), Long_create(1798993591, 2557336412), Long_create(3737383206, 4091738259), Long_create(3848900024, 3273390607), Long_create(1361133101, 2618712486), Long_create(459826043, 4189939978), Long_create(2085847752, 3351951982), Long_create(4245658579, 2681561585),
    Long_create(2498086431, 4290498537), Long_create(280482227, 3432398830), Long_create(224385781, 2745919064), Long_create(1038502084, 2196735251), Long_create(4238583712, 3514776401), Long_create(2531873511, 2811821121), Long_create(1166505349, 2249456897), Long_create(2725402018, 3599131035), Long_create(2180321615, 2879304828), Long_create(3462244210, 2303443862), Long_create(2103616899, 3685510180), Long_create(1682893519, 2948408144), Long_create(2205308275, 2358726515), Long_create(3528493240, 3773962424),
    Long_create(3681788051, 3019169939), Long_create(3804423900, 2415335951), Long_create(74124026, 3864537523), Long_create(1777286139, 3091630018), Long_create(3139815829, 2473304014), Long_create(2446724950, 3957286423), Long_create(3675366878, 3165829138), Long_create(363313125, 2532663311), Long_create(3158281377, 4052261297), Long_create(808638183, 3241809038), Long_create(2364897465, 2593447230), Long_create(3783835944, 4149515568), Long_create(450088378, 3319612455), Long_create(360070702, 2655689964),
    Long_create(2294100042, 4249103942), Long_create(117293115, 3399283154), Long_create(952827951, 2719426523), Long_create(2480249279, 2175541218), Long_create(3109405388, 3480865949), Long_create(3346517769, 2784692759), Long_create(3536207675, 2227754207), Long_create(2221958443, 3564406732), Long_create(59579836, 2851525386), Long_create(3483637705, 2281220308), Long_create(419859574, 3649952494), Long_create(1194881118, 2919961995), Long_create(955904894, 2335969596), Long_create(4106428209, 3737551353),
    Long_create(708162189, 2990041083), Long_create(2284516670, 2392032866), Long_create(1937239754, 3827252586), Long_create(690798344, 3061802069), Long_create(1411632134, 2449441655), Long_create(2258611415, 3919106648), Long_create(3524876050, 3135285318), Long_create(242920462, 2508228255), Long_create(388672740, 4013165208), Long_create(2028925110, 3210532166), Long_create(764146629, 2568425733), Long_create(363641147, 4109481173), Long_create(2008899836, 3287584938), Long_create(3325106787, 2630067950),
    Long_create(1025203564, 4208108721), Long_create(4256136688, 3366486976), Long_create(2545915891, 2693189581), Long_create(1177739254, 2154551665), Long_create(1884382806, 3447282664), Long_create(2366499704, 2757826131), Long_create(1034206304, 2206260905), Long_create(1654730086, 3530017448), Long_create(3041770987, 2824013958), Long_create(4151403708, 2259211166), Long_create(629291719, 3614737867), Long_create(3080413753, 2891790293), Long_create(4182317920, 2313432234), Long_create(4114728295, 3701491575),
    Long_create(3291782636, 2961193260), Long_create(2633426109, 2368954608), Long_create(3354488315, 3790327373), Long_create(106610275, 3032261899), Long_create(944281679, 2425809519), Long_create(3228837605, 3881295230), Long_create(2583070084, 3105036184), Long_create(2925449526, 2484028947), Long_create(1244745405, 3974446316), Long_create(136802865, 3179557053), Long_create(1827429210, 2543645642), Long_create(3782880196, 4069833027), Long_create(1308317238, 3255866422), Long_create(3623634168, 2604693137),
    Long_create(2361840832, 4167509020), Long_create(1889472666, 3334007216), Long_create(652584673, 2667205773), Long_create(185142018, 4267529237), Long_create(2725093992, 3414023389), Long_create(3039068653, 2731218711), Long_create(1572261463, 2184974969), Long_create(4233605259, 3495959950), Long_create(3386884207, 2796767960), Long_create(2709507366, 2237414368), Long_create(3476218326, 3579862989), Long_create(3639968120, 2863890391), Long_create(2052981037, 2291112313), Long_create(2425776200, 3665779701),
    Long_create(1081627501, 2932623761), Long_create(6308541, 2346099009), Long_create(1728080585, 3753758414), Long_create(2241457927, 3003006731), Long_create(934172882, 2402405385), Long_create(1494676612, 3843848616), Long_create(336747830, 3075078893), Long_create(1987385183, 2460063114), Long_create(602835915, 3936100983), Long_create(2200255650, 3148880786), Long_create(901211061, 2519104629), Long_create(3159924616, 4030567406), Long_create(1668946233, 3224453925), Long_create(1335156987, 2579563140),
    Long_create(2136251179, 4127301024), Long_create(2567994402, 3301840819), Long_create(2913388981, 2641472655), Long_create(366455074, 4226356249), Long_create(1152157518, 3381084999), Long_create(1780719474, 2704867999), Long_create(2283569038, 2163894399), Long_create(1076730083, 3462231039), Long_create(1720377526, 2769784831), Long_create(517308561, 2215827865), Long_create(827693699, 3545324584), Long_create(1521148418, 2836259667), Long_create(3793899112, 2269007733), Long_create(916277824, 3630412374),
    Long_create(1592015718, 2904329899), Long_create(2132606034, 2323463919), Long_create(835189277, 3717542271), Long_create(4104125258, 2974033816), Long_create(2424306747, 2379227053), Long_create(3019897337, 3806763285), Long_create(2415917869, 3045410628), Long_create(3650721214, 2436328502), Long_create(2405180105, 3898125604), Long_create(2783137543, 3118500483), Long_create(3944496953, 2494800386), Long_create(298240911, 3991680619), Long_create(1097586188, 3193344495), Long_create(878068950, 2554675596),
    Long_create(3981890698, 4087480953), Long_create(608532181, 3269984763), Long_create(2204812663, 2615987810), Long_create(3527700261, 4185580496), Long_create(1963166749, 3348464397), Long_create(4147513777, 2678771517), Long_create(3200048207, 4286034428), Long_create(4278025484, 3428827542), Long_create(1704433468, 2743062034), Long_create(2222540234, 2194449627), Long_create(120090538, 3511119404), Long_create(955065889, 2808895523), Long_create(2482039630, 2247116418), Long_create(3112269949, 3595386269),
    Long_create(3348809418, 2876309015), Long_create(2679047534, 2301047212), Long_create(850502218, 3681675540), Long_create(680401775, 2945340432), Long_create(3121301797, 2356272345), Long_create(699115580, 3770035753), Long_create(2277279382, 3016028602), Long_create(103836587, 2412822882), Long_create(1025131999, 3860516611), Long_create(4256079436, 3088413288), Long_create(827883168, 2470730631), Long_create(3901593088, 3953169009)]);
    otcit_DoubleAnalyzer_exp10Table = $rt_createShortArrayFromData([(-70), (-66), (-63), (-60), (-56), (-53), (-50), (-46), (-43), (-40), (-36), (-33), (-30), (-26), (-23), (-20), (-16), (-13), (-10), (-6), (-3), 0, 4, 7, 10, 14, 17, 20, 23, 27, 30, 33, 37, 40, 43, 47, 50, 53, 57, 60, 63, 67, 70, 73, 77, 80, 83, 87, 90, 93, 97, 100, 103, 107, 110, 113, 116, 120, 123, 126, 130, 133, 136, 140, 143, 146, 150, 153, 156, 160, 163, 166, 170, 173, 176, 180, 183, 186, 190, 193, 196, 200, 203, 206, 210, 213, 216, 219,
    223, 226, 229, 233, 236, 239, 243, 246, 249, 253, 256, 259, 263, 266, 269, 273, 276, 279, 283, 286, 289, 293, 296, 299, 303, 306, 309, 312, 316, 319, 322, 326, 329, 332, 336, 339, 342, 346, 349, 352, 356, 359, 362, 366, 369, 372, 376, 379, 382, 386, 389, 392, 396, 399, 402, 406, 409, 412, 415, 419, 422, 425, 429, 432, 435, 439, 442, 445, 449, 452, 455, 459, 462, 465, 469, 472, 475, 479, 482, 485, 489, 492, 495, 499, 502, 505, 508, 512, 515, 518, 522, 525, 528, 532, 535, 538, 542, 545, 548, 552, 555, 558,
    562, 565, 568, 572, 575, 578, 582, 585, 588, 592, 595, 598, 601, 605, 608, 611, 615, 618, 621, 625, 628, 631, 635, 638, 641, 645, 648, 651, 655, 658, 661, 665, 668, 671, 675, 678, 681, 685, 688, 691, 695, 698, 701, 704, 708, 711, 714, 718, 721, 724, 728, 731, 734, 738, 741, 744, 748, 751, 754, 758, 761, 764, 768, 771, 774, 778, 781, 784, 788, 791, 794, 797, 801, 804, 807, 811, 814, 817, 821, 824, 827, 831, 834, 837, 841, 844, 847, 851, 854, 857, 861, 864, 867, 871, 874, 877, 881, 884, 887, 891, 894, 897,
    900, 904, 907, 910, 914, 917, 920, 924, 927, 930, 934, 937, 940, 944, 947, 950, 954, 957, 960, 964, 967, 970, 974, 977, 980, 984, 987, 990, 993, 997, 1000, 1003, 1007, 1010, 1013, 1017, 1020, 1023, 1027, 1030, 1033, 1037, 1040, 1043, 1047, 1050, 1053, 1057, 1060, 1063, 1067, 1070, 1073, 1077, 1080, 1083, 1086, 1090, 1093, 1096, 1100, 1103, 1106, 1110, 1113, 1116, 1120, 1123, 1126, 1130, 1133, 1136, 1140, 1143, 1146, 1150, 1153, 1156, 1160, 1163, 1166, 1170, 1173, 1176, 1180, 1183, 1186, 1189, 1193, 1196,
    1199, 1203, 1206, 1209, 1213, 1216, 1219, 1223, 1226, 1229, 1233, 1236, 1239, 1243, 1246, 1249, 1253, 1256, 1259, 1263, 1266, 1269, 1273, 1276, 1279, 1282, 1286, 1289, 1292, 1296, 1299, 1302, 1306, 1309, 1312, 1316, 1319, 1322, 1326, 1329, 1332, 1336, 1339, 1342, 1346, 1349, 1352, 1356, 1359, 1362, 1366, 1369, 1372, 1376, 1379, 1382, 1385, 1389, 1392, 1395, 1399, 1402, 1405, 1409, 1412, 1415, 1419, 1422, 1425, 1429, 1432, 1435, 1439, 1442, 1445, 1449, 1452, 1455, 1459, 1462, 1465, 1469, 1472, 1475, 1478,
    1482, 1485, 1488, 1492, 1495, 1498, 1502, 1505, 1508, 1512, 1515, 1518, 1522, 1525, 1528, 1532, 1535, 1538, 1542, 1545, 1548, 1552, 1555, 1558, 1562, 1565, 1568, 1572, 1575, 1578, 1581, 1585, 1588, 1591, 1595, 1598, 1601, 1605, 1608, 1611, 1615, 1618, 1621, 1625, 1628, 1631, 1635, 1638, 1641, 1645, 1648, 1651, 1655, 1658, 1661, 1665, 1668, 1671, 1674, 1678, 1681, 1684, 1688, 1691, 1694, 1698, 1701, 1704, 1708, 1711, 1714, 1718, 1721, 1724, 1728, 1731, 1734, 1738, 1741, 1744, 1748, 1751, 1754, 1758, 1761,
    1764, 1767, 1771, 1774, 1777, 1781, 1784, 1787, 1791, 1794, 1797, 1801, 1804, 1807, 1811, 1814, 1817, 1821, 1824, 1827, 1831, 1834, 1837, 1841, 1844, 1847, 1851, 1854, 1857, 1861, 1864, 1867, 1870, 1874, 1877, 1880, 1884, 1887, 1890, 1894, 1897, 1900, 1904, 1907, 1910, 1914, 1917, 1920, 1924, 1927, 1930, 1934, 1937, 1940, 1944, 1947, 1950, 1954, 1957, 1960, 1963, 1967, 1970, 1973, 1977, 1980, 1983, 1987, 1990, 1993, 1997, 2000, 2003, 2007, 2010, 2013, 2017, 2020, 2023, 2027, 2030, 2033, 2037, 2040, 2043,
    2047, 2050, 2053, 2057, 2060, 2063, 2066, 2070, 2073, 2076, 2080, 2083, 2086, 2090, 2093, 2096, 2100, 2103, 2106, 2110, 2113, 2116, 2120]);
};
function ju_IllegalFormatFlagsException() {
    ju_IllegalFormatException.call(this);
    this.$flags2 = null;
}
let ju_IllegalFormatFlagsException__init_0 = ($this, $flags) => {
    let var$2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(124)), $flags);
    ju_IllegalFormatException__init_($this, jl_StringBuilder_toString(var$2));
    $this.$flags2 = $flags;
},
ju_IllegalFormatFlagsException__init_ = var_0 => {
    let var_1 = new ju_IllegalFormatFlagsException();
    ju_IllegalFormatFlagsException__init_0(var_1, var_0);
    return var_1;
},
otcit_FloatAnalyzer$Result = $rt_classWithoutFields(),
otcit_FloatAnalyzer$Result__init_ = $this => {
    jl_Object__init_($this);
},
otcit_FloatAnalyzer$Result__init_0 = () => {
    let var_0 = new otcit_FloatAnalyzer$Result();
    otcit_FloatAnalyzer$Result__init_(var_0);
    return var_0;
};
$rt_packages([-1, "java", 0, "util", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 2, 0, [], 0, 3, 0, 0, ["$isEmptyMonitor", $rt_wrapFunction0(jl_Object_isEmptyMonitor), "$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$hashCode0", $rt_wrapFunction0(jl_Object_hashCode), "$equals", $rt_wrapFunction1(jl_Object_equals), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone0", $rt_wrapFunction0(jl_Object_clone)],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getLocalizedMessage", $rt_wrapFunction0(jl_Throwable_getLocalizedMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause), "$toString", $rt_wrapFunction0(jl_Throwable_toString), "$printStackTrace0", $rt_wrapFunction0(jl_Throwable_printStackTrace), "$printStackTrace", $rt_wrapFunction1(jl_Throwable_printStackTrace0)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Exception__init_), "$_init_", $rt_wrapFunction1(jl_Exception__init_0)],
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_RuntimeException__init_), "$_init_", $rt_wrapFunction1(jl_RuntimeException__init_0)],
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0)],
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jt_Format, 0, jl_Object, [ji_Serializable, jl_Cloneable], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jt_Format__init_), "$format7", $rt_wrapFunction1(jt_Format_format)],
jl_Record, 0, jl_Object, [], 1, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Number__init_)],
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Integer, "Integer", 2, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, ["$_init_3", $rt_wrapFunction1(jl_Integer__init_), "$intValue", $rt_wrapFunction0(jl_Integer_intValue), "$longValue", $rt_wrapFunction0(jl_Integer_longValue), "$doubleValue", $rt_wrapFunction0(jl_Integer_doubleValue), "$toString", $rt_wrapFunction0(jl_Integer_toString0), "$hashCode0", $rt_wrapFunction0(jl_Integer_hashCode)],
jl_CloneNotSupportedException, "CloneNotSupportedException", 2, jl_Exception, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_CloneNotSupportedException__init_)],
jl_ReflectiveOperationException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_ReflectiveOperationException__init_), "$_init_", $rt_wrapFunction1(jl_ReflectiveOperationException__init_0)],
jl_NoSuchFieldException, "NoSuchFieldException", 2, jl_ReflectiveOperationException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(jl_NoSuchFieldException__init_)],
jl_Long, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Long_$callClinit, 0,
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, 0, jl_Thread_$callClinit, ["$_init_", $rt_wrapFunction1(jl_Thread__init_0), "$_init_4", $rt_wrapFunction2(jl_Thread__init_)],
ju_Map, 0, jl_Object, [], 3, 3, 0, 0, 0,
jm_BigInteger, 0, jl_Number, [jl_Comparable, ji_Serializable], 0, 3, 0, jm_BigInteger_$callClinit, ["$_init_7", $rt_wrapFunction2(jm_BigInteger__init_4), "$_init_6", $rt_wrapFunction3(jm_BigInteger__init_1), "$_init_5", $rt_wrapFunction2(jm_BigInteger__init_2), "$_init_34", $rt_wrapFunction2(jm_BigInteger__init_5), "$abs1", $rt_wrapFunction0(jm_BigInteger_abs), "$negate", $rt_wrapFunction0(jm_BigInteger_negate), "$add1", $rt_wrapFunction1(jm_BigInteger_add), "$subtract0", $rt_wrapFunction1(jm_BigInteger_subtract),
"$signum", $rt_wrapFunction0(jm_BigInteger_signum), "$shiftRight0", $rt_wrapFunction1(jm_BigInteger_shiftRight), "$shiftLeft0", $rt_wrapFunction1(jm_BigInteger_shiftLeft), "$bitLength0", $rt_wrapFunction0(jm_BigInteger_bitLength), "$testBit", $rt_wrapFunction1(jm_BigInteger_testBit), "$intValue", $rt_wrapFunction0(jm_BigInteger_intValue), "$longValue", $rt_wrapFunction0(jm_BigInteger_longValue), "$doubleValue", $rt_wrapFunction0(jm_BigInteger_doubleValue), "$compareTo0", $rt_wrapFunction1(jm_BigInteger_compareTo),
"$equals", $rt_wrapFunction1(jm_BigInteger_equals), "$equalsArrays", $rt_wrapFunction1(jm_BigInteger_equalsArrays), "$multiply0", $rt_wrapFunction1(jm_BigInteger_multiply), "$pow0", $rt_wrapFunction1(jm_BigInteger_pow), "$divideAndRemainder", $rt_wrapFunction1(jm_BigInteger_divideAndRemainder), "$divide0", $rt_wrapFunction1(jm_BigInteger_divide), "$remainder", $rt_wrapFunction1(jm_BigInteger_remainder), "$cutOffLeadingZeroes", $rt_wrapFunction0(jm_BigInteger_cutOffLeadingZeroes), "$isOne", $rt_wrapFunction0(jm_BigInteger_isOne),
"$getFirstNonzeroDigit", $rt_wrapFunction0(jm_BigInteger_getFirstNonzeroDigit)],
jl_ArithmeticException, "ArithmeticException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(jl_ArithmeticException__init_0)],
pn_PacketPool, 0, jl_Object, [], 4, 3, 0, pn_PacketPool_$callClinit, 0,
otciu_CLDRHelper, 0, jl_Object, [], 4, 3, 0, 0, 0,
jt_DecimalFormat$FormatField, 0, jl_Object, [], 3, 0, 0, 0, 0,
jt_DecimalFormat$CurrencyField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jt_DecimalFormat$CurrencyField__init_), "$render", $rt_wrapFunction2(jt_DecimalFormat$CurrencyField_render)],
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_Member, 0, jl_Object, [], 3, 3, 0, 0, 0,
nmn_MinecraftClientConnection, 0, jl_Object, [], 0, 3, 0, nmn_MinecraftClientConnection_$callClinit, ["$_init_2", $rt_wrapFunction1(nmn_MinecraftClientConnection__init_), "$send1", $rt_wrapFunction1(nmn_MinecraftClientConnection_send), "$send", $rt_wrapFunction2(nmn_MinecraftClientConnection_send0), "$send0", $rt_wrapFunction3(nmn_MinecraftClientConnection_send1), "$initiateHandshake", $rt_wrapFunction2(nmn_MinecraftClientConnection_initiateHandshake)],
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 2, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
otcic_CurrencyHelper, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_String$_clinit_$lambda$_118_0__init_)],
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, 0, ["$_init_9", $rt_wrapFunction2(jl_Enum__init_), "$ordinal", $rt_wrapFunction0(jl_Enum_ordinal)],
nmnph_ClientIntent, 0, jl_Enum, [], 12, 3, 0, nmnph_ClientIntent_$callClinit, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_3", $rt_wrapFunction1(jl_AbstractStringBuilder__init_), "$append6", $rt_wrapFunction1(jl_AbstractStringBuilder_append3), "$append7", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$append8", $rt_wrapFunction1(jl_AbstractStringBuilder_append2), "$append1", $rt_wrapFunction2(jl_AbstractStringBuilder_append6),
"$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert5), "$append9", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert3), "$insert3", $rt_wrapFunction3(jl_AbstractStringBuilder_insert4), "$append10", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$insert4", $rt_wrapFunction2(jl_AbstractStringBuilder_insert0), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity),
"$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString), "$length", $rt_wrapFunction0(jl_AbstractStringBuilder_length), "$charAt", $rt_wrapFunction1(jl_AbstractStringBuilder_charAt), "$append5", $rt_wrapFunction3(jl_AbstractStringBuilder_append4), "$insert5", $rt_wrapFunction4(jl_AbstractStringBuilder_insert2), "$append11", $rt_wrapFunction1(jl_AbstractStringBuilder_append5), "$subSequence", $rt_wrapFunction2(jl_AbstractStringBuilder_subSequence), "$setLength", $rt_wrapFunction1(jl_AbstractStringBuilder_setLength),
"$substring0", $rt_wrapFunction2(jl_AbstractStringBuilder_substring)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_3", $rt_wrapFunction1(jl_StringBuilder__init_1), "$_init_0", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append16", $rt_wrapFunction1(jl_StringBuilder_append2), "$append14", $rt_wrapFunction1(jl_StringBuilder_append0), "$append2", $rt_wrapFunction1(jl_StringBuilder_append4), "$append0", $rt_wrapFunction1(jl_StringBuilder_append1), "$append12", $rt_wrapFunction3(jl_StringBuilder_append5),
"$append17", $rt_wrapFunction1(jl_StringBuilder_append3), "$insert9", $rt_wrapFunction2(jl_StringBuilder_insert1), "$insert6", $rt_wrapFunction4(jl_StringBuilder_insert2), "$insert7", $rt_wrapFunction2(jl_StringBuilder_insert6), "$insert8", $rt_wrapFunction2(jl_StringBuilder_insert3), "$insert10", $rt_wrapFunction2(jl_StringBuilder_insert7), "$substring0", $rt_wrapFunction2(jl_StringBuilder_substring), "$setLength", $rt_wrapFunction1(jl_StringBuilder_setLength), "$subSequence", $rt_wrapFunction2(jl_StringBuilder_subSequence),
"$insert5", $rt_wrapFunction4(jl_StringBuilder_insert4), "$append5", $rt_wrapFunction3(jl_StringBuilder_append6), "$charAt", $rt_wrapFunction1(jl_StringBuilder_charAt), "$length", $rt_wrapFunction0(jl_StringBuilder_length), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert0), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert5),
"$insert0", $rt_wrapFunction2(jl_StringBuilder_insert8)],
ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_ConcurrentModificationException__init_)],
ju_Currency, 0, jl_Object, [ji_Serializable], 4, 3, 0, 0, ["$getCurrencyCode", $rt_wrapFunction0(ju_Currency_getCurrencyCode), "$getSymbol", $rt_wrapFunction1(ju_Currency_getSymbol)],
jl_ClassCastException, "ClassCastException", 2, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_AccessibleObject, 0, jl_Object, [jlr_AnnotatedElement], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jlr_AccessibleObject__init_), "$setAccessible", $rt_wrapFunction1(jlr_AccessibleObject_setAccessible)],
jlr_Constructor, 0, jlr_AccessibleObject, [jlr_Member], 0, 3, 0, 0, ["$_init_30", function(var_1, var_2, var_3, var_4, var_5, var_6) { jlr_Constructor__init_(this, var_1, var_2, var_3, var_4, var_5, var_6); }, "$getModifiers0", $rt_wrapFunction0(jlr_Constructor_getModifiers), "$getParameterTypes", $rt_wrapFunction0(jlr_Constructor_getParameterTypes), "$getParameterCount", $rt_wrapFunction0(jlr_Constructor_getParameterCount), "$newInstance", $rt_wrapFunction1(jlr_Constructor_newInstance)],
nms_SoundEvent_STONE_FALL, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_StringBuffer__init_), "$append4", $rt_wrapFunction1(jl_StringBuffer_append0), "$append3", $rt_wrapFunction1(jl_StringBuffer_append), "$insert11", $rt_wrapFunction2(jl_StringBuffer_insert1), "$insert12", $rt_wrapFunction2(jl_StringBuffer_insert2), "$toString", $rt_wrapFunction0(jl_StringBuffer_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity), "$insert4", $rt_wrapFunction2(jl_StringBuffer_insert0),
"$insert0", $rt_wrapFunction2(jl_StringBuffer_insert)],
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0,
otcir_FieldWriter, 0, jl_Object, [], 3, 3, 0, 0, 0,
otcir_FieldWriter$forJs$lambda$_1_0, 0, jl_Object, [otcir_FieldWriter], 0, 3, 0, 0, ["$_init_12", $rt_wrapFunction1(otcir_FieldWriter$forJs$lambda$_1_0__init_)],
otcir_MethodCaller, 0, jl_Object, [], 3, 3, 0, 0, 0,
otcir_MethodCaller$forJs$lambda$_1_0, 0, jl_Object, [otcir_MethodCaller], 0, 3, 0, 0, ["$_init_13", $rt_wrapFunction1(otcir_MethodCaller$forJs$lambda$_1_0__init_), "$call", $rt_wrapFunction2(otcir_MethodCaller$forJs$lambda$_1_0_call)]]);
$rt_metadata([ji_IOException, 0, jl_Exception, [], 0, 3, 0, 0, 0,
jlr_Field, 0, jlr_AccessibleObject, [jlr_Member], 0, 3, 0, 0, ["$_init_29", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { jlr_Field__init_(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }, "$getName", $rt_wrapFunction0(jlr_Field_getName), "$getModifiers0", $rt_wrapFunction0(jlr_Field_getModifiers), "$get", $rt_wrapFunction1(jlr_Field_get), "$getWithoutCheck", $rt_wrapFunction1(jlr_Field_getWithoutCheck), "$checkGetAccess", $rt_wrapFunction0(jlr_Field_checkGetAccess)],
inu_ReferenceCounted, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_36", $rt_wrapFunction1(ju_AbstractList$1__init_), "$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next", $rt_wrapFunction0(ju_AbstractList$1_next)],
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otcit_DoubleAnalyzer$Result__init_0)],
otcir_FieldReader, 0, jl_Object, [], 3, 3, 0, 0, 0,
otcir_FieldReader$forJs$lambda$_1_0, 0, jl_Object, [otcir_FieldReader], 0, 3, 0, 0, ["$_init_14", $rt_wrapFunction1(otcir_FieldReader$forJs$lambda$_1_0__init_), "$read", $rt_wrapFunction1(otcir_FieldReader$forJs$lambda$_1_0_read)],
otpp_ResourceAccessor, 0, jl_Object, [], 4, 0, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractCollection__init_), "$toArray", $rt_wrapFunction1(ju_AbstractCollection_toArray)],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
juca_AtomicInteger, 0, jl_Number, [ji_Serializable], 0, 3, 0, 0, ["$_init_3", $rt_wrapFunction1(juca_AtomicInteger__init_), "$incrementAndGet", $rt_wrapFunction0(juca_AtomicInteger_incrementAndGet)],
ju_Locale, 0, jl_Object, [jl_Cloneable, ji_Serializable], 4, 3, 0, ju_Locale_$callClinit, ["$_init_17", $rt_wrapFunction2(ju_Locale__init_1), "$_init_16", $rt_wrapFunction3(ju_Locale__init_0), "$getCountry", $rt_wrapFunction0(ju_Locale_getCountry), "$getLanguage", $rt_wrapFunction0(ju_Locale_getLanguage)],
jl_Short, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Short_$callClinit, 0,
jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_DefaultUncaughtExceptionHandler__init_)],
jl_InstantiationException, "InstantiationException", 2, jl_ReflectiveOperationException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_InstantiationException__init_)],
otcir_FieldInfo, 0, jl_Object, [], 0, 3, 0, 0, 0,
jt_DecimalFormat$1, 0, jl_Object, [], 32, 0, 0, jt_DecimalFormat$1_$callClinit, 0,
jlr_Method, 0, jlr_AccessibleObject, [jlr_Member], 0, 3, 0, 0, ["$_init_31", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { jlr_Method__init_(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }, "$getName", $rt_wrapFunction0(jlr_Method_getName), "$getModifiers0", $rt_wrapFunction0(jlr_Method_getModifiers), "$getReturnType", $rt_wrapFunction0(jlr_Method_getReturnType), "$getParameterTypes", $rt_wrapFunction0(jlr_Method_getParameterTypes), "$invoke", $rt_wrapFunction2(jlr_Method_invoke)],
otji_JS, 0, jl_Object, [], 4, 3, 0, 0, 0,
otp_PlatformRunnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$_init_1", $rt_wrapFunction4(jl_Object$monitorEnterWait$lambda$_6_0__init_), "$run", $rt_wrapFunction0(jl_Object$monitorEnterWait$lambda$_6_0_run)],
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, ["$_init_18", $rt_wrapFunction2(ju_MapEntry__init_)],
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0, ["$_init_44", $rt_wrapFunction2(ju_HashMap$HashEntry__init_)],
nmnph_ClientIntentionPacket, 0, jl_Record, [nms_SoundEvent_STONE_FALL], 32772, 3, 0, nmnph_ClientIntentionPacket_$callClinit, 0,
ju_Queue, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
jl_ArrayStoreException, "ArrayStoreException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_ArrayStoreException__init_0)],
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
inb_ByteBufConvertible, 0, jl_Object, [], 3, 3, 0, 0, 0,
inb_ByteBuf, 0, jl_Object, [inu_ReferenceCounted, jl_Comparable, inb_ByteBufConvertible], 1, 3, 0, 0, 0,
vw, 0, inb_ByteBuf, [], 0, 3, 0, 0, 0,
yy, 0, jl_Object, [], 3, 3, 0, 0, 0,
aij$_clinit_$lambda$_14_1, 0, jl_Object, [yy], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(aij$_clinit_$lambda$_14_1__init_)],
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ji_OutputStream__init_)],
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_19", $rt_wrapFunction1(ji_FilterOutputStream__init_)],
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 0, 3, 0, 0, ["$_init_21", $rt_wrapFunction3(ji_PrintStream__init_), "$printf", $rt_wrapFunction2(ji_PrintStream_printf), "$format0", $rt_wrapFunction2(ji_PrintStream_format), "$format1", $rt_wrapFunction3(ji_PrintStream_format0), "$append13", $rt_wrapFunction1(ji_PrintStream_append0), "$append15", $rt_wrapFunction1(ji_PrintStream_append)],
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otcic_JsConsolePrintStream__init_), "$println1", $rt_wrapFunction1(otcic_JsConsolePrintStream_println), "$println", $rt_wrapFunction0(otcic_JsConsolePrintStream_println1), "$println0", $rt_wrapFunction1(otcic_JsConsolePrintStream_println0), "$print0", $rt_wrapFunction3(otcic_JsConsolePrintStream_print)],
otcic_JSStdoutPrintStream, 0, otcic_JsConsolePrintStream, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otcic_JSStdoutPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStdoutPrintStream_print)],
otji_JSWrapper, 0, jl_Object, [], 4, 3, 0, 0, 0,
wf, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractSet__init_)]]);
$rt_metadata([ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_HashSet__init_0), "$_init_22", $rt_wrapFunction1(ju_HashSet__init_), "$add", $rt_wrapFunction1(ju_HashSet_add)],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, 0,
wl, 0, jl_Object, [wf], 3, 3, 0, 0, 0,
jl_Boolean, 0, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, jl_Boolean_$callClinit, ["$_init_23", $rt_wrapFunction1(jl_Boolean__init_0)],
za, 0, jl_Object, [], 3, 3, 0, 0, 0,
aij$_clinit_$lambda$_14_0, 0, jl_Object, [za], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(aij$_clinit_$lambda$_14_0__init_)],
ju_NoSuchElementException, "NoSuchElementException", 1, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_NoSuchElementException__init_)],
otcic_JSStderrPrintStream, 0, otcic_JsConsolePrintStream, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otcic_JSStderrPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStderrPrintStream_print)],
jt_DecimalFormat$Constants, 0, jl_Object, [], 0, 0, 0, jt_DecimalFormat$Constants_$callClinit, 0,
oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_IllegalArgumentException, "IllegalArgumentException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalArgumentException__init_2), "$_init_", $rt_wrapFunction1(jl_IllegalArgumentException__init_)],
ju_IllegalFormatException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(ju_IllegalFormatException__init_)],
ju_UnknownFormatConversionException, "UnknownFormatConversionException", 1, ju_IllegalFormatException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(ju_UnknownFormatConversionException__init_0)],
jt_NumberFormat, 0, jt_Format, [], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jt_NumberFormat__init_), "$getCurrency", $rt_wrapFunction0(jt_NumberFormat_getCurrency), "$format", $rt_wrapFunction3(jt_NumberFormat_format), "$getMaximumFractionDigits", $rt_wrapFunction0(jt_NumberFormat_getMaximumFractionDigits), "$getMaximumIntegerDigits", $rt_wrapFunction0(jt_NumberFormat_getMaximumIntegerDigits), "$getMinimumFractionDigits", $rt_wrapFunction0(jt_NumberFormat_getMinimumFractionDigits), "$getMinimumIntegerDigits",
$rt_wrapFunction0(jt_NumberFormat_getMinimumIntegerDigits), "$isGroupingUsed", $rt_wrapFunction0(jt_NumberFormat_isGroupingUsed), "$setGroupingUsed", $rt_wrapFunction1(jt_NumberFormat_setGroupingUsed), "$setMaximumFractionDigits", $rt_wrapFunction1(jt_NumberFormat_setMaximumFractionDigits), "$setMaximumIntegerDigits", $rt_wrapFunction1(jt_NumberFormat_setMaximumIntegerDigits), "$setMinimumFractionDigits", $rt_wrapFunction1(jt_NumberFormat_setMinimumFractionDigits), "$setMinimumIntegerDigits", $rt_wrapFunction1(jt_NumberFormat_setMinimumIntegerDigits),
"$getRoundingMode", $rt_wrapFunction0(jt_NumberFormat_getRoundingMode)],
jt_DecimalFormat, 0, jt_NumberFormat, [], 0, 3, 0, jt_DecimalFormat_$callClinit, ["$_init_0", $rt_wrapFunction0(jt_DecimalFormat__init_1), "$_init_", $rt_wrapFunction1(jt_DecimalFormat__init_0), "$_init_24", $rt_wrapFunction2(jt_DecimalFormat__init_), "$applyPattern", $rt_wrapFunction1(jt_DecimalFormat_applyPattern), "$setDecimalFormatSymbols", $rt_wrapFunction1(jt_DecimalFormat_setDecimalFormatSymbols), "$setPositivePrefix", $rt_wrapFunction1(jt_DecimalFormat_setPositivePrefix), "$setNegativePrefix", $rt_wrapFunction1(jt_DecimalFormat_setNegativePrefix),
"$setNegativeSuffix", $rt_wrapFunction1(jt_DecimalFormat_setNegativeSuffix), "$setMultiplier", $rt_wrapFunction1(jt_DecimalFormat_setMultiplier), "$getGroupingSize", $rt_wrapFunction0(jt_DecimalFormat_getGroupingSize), "$setGroupingSize", $rt_wrapFunction1(jt_DecimalFormat_setGroupingSize), "$isDecimalSeparatorAlwaysShown", $rt_wrapFunction0(jt_DecimalFormat_isDecimalSeparatorAlwaysShown), "$setDecimalSeparatorAlwaysShown", $rt_wrapFunction1(jt_DecimalFormat_setDecimalSeparatorAlwaysShown), "$format", $rt_wrapFunction3(jt_DecimalFormat_format0),
"$format4", $rt_wrapFunction3(jt_DecimalFormat_format3), "$format3", $rt_wrapFunction3(jt_DecimalFormat_format2)],
jt_DecimalFormat$PerMillField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jt_DecimalFormat$PerMillField__init_), "$render", $rt_wrapFunction2(jt_DecimalFormat$PerMillField_render)],
ju_IllegalFormatConversionException, "IllegalFormatConversionException", 1, ju_IllegalFormatException, [], 0, 3, 0, 0, ["$_init_37", $rt_wrapFunction2(ju_IllegalFormatConversionException__init_0)],
pn_JsNetBridge, 0, jl_Object, [], 4, 3, 0, pn_JsNetBridge_$callClinit, 0,
jt_DecimalFormat$PercentField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jt_DecimalFormat$PercentField__init_), "$render", $rt_wrapFunction2(jt_DecimalFormat$PercentField_render)],
juf_Consumer, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractMap__init_)],
ju_IllegalFormatCodePointException, "IllegalFormatCodePointException", 1, ju_IllegalFormatException, [], 0, 3, 0, 0, ["$_init_3", $rt_wrapFunction1(ju_IllegalFormatCodePointException__init_)],
otcir_MethodInfo, 0, jl_Object, [], 0, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 4, 3, 0, 0, ["$toString", $rt_wrapFunction0(jl_Class_toString), "$getPlatformClass", $rt_wrapFunction0(jl_Class_getPlatformClass), "$isInstance", $rt_wrapFunction1(jl_Class_isInstance), "$isAssignableFrom", $rt_wrapFunction1(jl_Class_isAssignableFrom), "$getName", $rt_wrapFunction0(jl_Class_getName), "$isPrimitive", $rt_wrapFunction0(jl_Class_isPrimitive), "$isArray", $rt_wrapFunction0(jl_Class_isArray), "$isInterface", $rt_wrapFunction0(jl_Class_isInterface),
"$getComponentType", $rt_wrapFunction0(jl_Class_getComponentType), "$getDeclaredFields", $rt_wrapFunction0(jl_Class_getDeclaredFields), "$getFields", $rt_wrapFunction0(jl_Class_getFields), "$getDeclaredConstructors", $rt_wrapFunction0(jl_Class_getDeclaredConstructors), "$getConstructor", $rt_wrapFunction1(jl_Class_getConstructor), "$getDeclaredMethods", $rt_wrapFunction0(jl_Class_getDeclaredMethods), "$getMethod", $rt_wrapFunction2(jl_Class_getMethod), "$getSuperclass", $rt_wrapFunction0(jl_Class_getSuperclass),
"$getInterfaces", $rt_wrapFunction0(jl_Class_getInterfaces), "$initialize", $rt_wrapFunction0(jl_Class_initialize)],
jl_Float, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Float_$callClinit, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
agj, 0, jl_Object, [wl], 3, 3, 0, 0, 0,
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
jm_Conversion, 0, jl_Object, [], 0, 0, 0, jm_Conversion_$callClinit, 0,
p_ClientMain, 0, jl_Object, [], 4, 3, 0, p_ClientMain_$callClinit, 0,
jm_BigDecimal, 0, jl_Number, [jl_Comparable, ji_Serializable], 0, 3, 0, jm_BigDecimal_$callClinit, ["$_init_26", $rt_wrapFunction1(jm_BigDecimal__init_2), "$_init_27", $rt_wrapFunction2(jm_BigDecimal__init_0), "$multiply1", $rt_wrapFunction1(jm_BigDecimal_multiply), "$signum", $rt_wrapFunction0(jm_BigDecimal_signum), "$scale", $rt_wrapFunction0(jm_BigDecimal_scale), "$precision", $rt_wrapFunction0(jm_BigDecimal_precision), "$unscaledValue", $rt_wrapFunction0(jm_BigDecimal_unscaledValue), "$compareTo", $rt_wrapFunction1(jm_BigDecimal_compareTo)],
pn_NetBridge, 0, jl_Object, [], 4, 3, 0, pn_NetBridge_$callClinit, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
jt_FieldPosition, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_3", $rt_wrapFunction1(jt_FieldPosition__init_)],
jl_Object$monitorExit$lambda$_8_1, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$_init_2", $rt_wrapFunction1(jl_Object$monitorExit$lambda$_8_1__init_), "$run", $rt_wrapFunction0(jl_Object$monitorExit$lambda$_8_1_run)],
yz, 0, jl_Object, [], 3, 3, 0, 0, 0,
yx, 0, jl_Object, [yy, yz], 3, 3, 0, 0, 0,
ju_DuplicateFormatFlagsException, "DuplicateFormatFlagsException", 1, ju_IllegalFormatException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(ju_DuplicateFormatFlagsException__init_)],
ju_MissingFormatWidthException, "MissingFormatWidthException", 1, ju_IllegalFormatException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(ju_MissingFormatWidthException__init_0)],
zg, 0, jl_Object, [], 3, 3, 0, 0, 0,
otcir_ClassList, 0, jl_Object, [], 0, 3, 0, 0, 0,
zi, 0, jl_Record, [], 32772, 3, 0, 0, 0,
nmnph_ClientIntentionPacket$_clinit_$lambda$_14_1, 0, jl_Object, [yy], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(nmnph_ClientIntentionPacket$_clinit_$lambda$_14_1__init_)],
nmnph_ClientIntentionPacket$_clinit_$lambda$_14_0, 0, jl_Object, [za], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(nmnph_ClientIntentionPacket$_clinit_$lambda$_14_0__init_)],
jm_Multiplication, 0, jl_Object, [], 0, 0, 0, jm_Multiplication_$callClinit, 0,
aii, 0, jl_Enum, [], 12, 3, 0, aii_$callClinit, 0,
aij, 0, jl_Record, [zg], 32772, 3, 0, aij_$callClinit, 0,
aim, 0, jl_Object, [agj], 3, 3, 0, 0, 0]);
$rt_metadata([jl_Double, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Double_$callClinit, 0,
jm_Elementary, 0, jl_Object, [], 0, 0, 0, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_35", $rt_wrapFunction2(jl_Error__init_)],
ju_FormatFlagsConversionMismatchException, "FormatFlagsConversionMismatchException", 1, ju_IllegalFormatException, [], 0, 3, 0, 0, ["$_init_38", $rt_wrapFunction2(ju_FormatFlagsConversionMismatchException__init_)],
jl_AssertionError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_35", $rt_wrapFunction2(jl_AssertionError__init_)],
pr_RenderLoop, 0, jl_Object, [], 4, 3, 0, pr_RenderLoop_$callClinit, 0,
ju_List, 0, jl_Object, [ju_SequencedCollection], 3, 3, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractList__init_), "$iterator", $rt_wrapFunction0(ju_AbstractList_iterator)],
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_ArrayList__init_0), "$_init_3", $rt_wrapFunction1(ju_ArrayList__init_), "$ensureCapacity", $rt_wrapFunction1(ju_ArrayList_ensureCapacity), "$get0", $rt_wrapFunction1(ju_ArrayList_get), "$size", $rt_wrapFunction0(ju_ArrayList_size), "$add", $rt_wrapFunction1(ju_ArrayList_add)],
jl_IllegalMonitorStateException, "IllegalMonitorStateException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalMonitorStateException__init_)],
jm_Division, 0, jl_Object, [], 0, 0, 0, 0, 0,
jm_BitLevel, 0, jl_Object, [], 0, 0, 0, 0, 0,
otcir_Flags, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_String, "String", 2, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_0", $rt_wrapFunction0(jl_String__init_2), "$_init_15", $rt_wrapFunction1(jl_String__init_0), "$_init_2", $rt_wrapFunction1(jl_String__init_3), "$_init_10", $rt_wrapFunction3(jl_String__init_5), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$indexOf0", $rt_wrapFunction2(jl_String_indexOf0),
"$indexOf", $rt_wrapFunction1(jl_String_indexOf), "$lastIndexOf0", $rt_wrapFunction2(jl_String_lastIndexOf), "$lastIndexOf", $rt_wrapFunction1(jl_String_lastIndexOf0), "$substring0", $rt_wrapFunction2(jl_String_substring), "$substring", $rt_wrapFunction1(jl_String_substring0), "$subSequence", $rt_wrapFunction2(jl_String_subSequence), "$toString", $rt_wrapFunction0(jl_String_toString), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode), "$toUpperCase", $rt_wrapFunction0(jl_String_toUpperCase)],
jl_NegativeArraySizeException, "NegativeArraySizeException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NegativeArraySizeException__init_)],
jl_IllegalStateException, "IllegalStateException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalStateException__init_), "$_init_", $rt_wrapFunction1(jl_IllegalStateException__init_0)],
ju_FormatterClosedException, "FormatterClosedException", 1, jl_IllegalStateException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_FormatterClosedException__init_)],
jt_DecimalFormat$TextField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction1(jt_DecimalFormat$TextField__init_0), "$render", $rt_wrapFunction2(jt_DecimalFormat$TextField_render)],
jl_ClassNotFoundException, "ClassNotFoundException", 2, jl_ReflectiveOperationException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_ClassNotFoundException__init_)],
ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 3, 3, 0, 0, 0,
ju_ArrayDeque, 0, ju_AbstractCollection, [ju_Deque, jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_ArrayDeque__init_1), "$_init_3", $rt_wrapFunction1(ju_ArrayDeque__init_0), "$addLast", $rt_wrapFunction1(ju_ArrayDeque_addLast), "$offerLast", $rt_wrapFunction1(ju_ArrayDeque_offerLast), "$removeFirst", $rt_wrapFunction0(ju_ArrayDeque_removeFirst), "$pollFirst", $rt_wrapFunction0(ju_ArrayDeque_pollFirst), "$add", $rt_wrapFunction1(ju_ArrayDeque_add), "$offer", $rt_wrapFunction1(ju_ArrayDeque_offer),
"$remove", $rt_wrapFunction0(ju_ArrayDeque_remove), "$poll", $rt_wrapFunction0(ju_ArrayDeque_poll), "$size", $rt_wrapFunction0(ju_ArrayDeque_size), "$isEmpty", $rt_wrapFunction0(ju_ArrayDeque_isEmpty)],
jl_NoSuchMethodException, "NoSuchMethodException", 2, jl_ReflectiveOperationException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NoSuchMethodException__init_1), "$_init_", $rt_wrapFunction1(jl_NoSuchMethodException__init_)],
otcir_Converter, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_Formatter$FormatWriter, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_39", function(var_1, var_2, var_3, var_4, var_5) { ju_Formatter$FormatWriter__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$write", $rt_wrapFunction0(ju_Formatter$FormatWriter_write)],
jt_DecimalFormatSymbols, 0, jl_Object, [jl_Cloneable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jt_DecimalFormatSymbols__init_1), "$_init_25", $rt_wrapFunction1(jt_DecimalFormatSymbols__init_0), "$getZeroDigit", $rt_wrapFunction0(jt_DecimalFormatSymbols_getZeroDigit), "$getGroupingSeparator", $rt_wrapFunction0(jt_DecimalFormatSymbols_getGroupingSeparator), "$getPerMill", $rt_wrapFunction0(jt_DecimalFormatSymbols_getPerMill), "$getPercent", $rt_wrapFunction0(jt_DecimalFormatSymbols_getPercent), "$getLocale",
$rt_wrapFunction0(jt_DecimalFormatSymbols_getLocale), "$getDecimalSeparator", $rt_wrapFunction0(jt_DecimalFormatSymbols_getDecimalSeparator), "$getNaN", $rt_wrapFunction0(jt_DecimalFormatSymbols_getNaN), "$getInfinity", $rt_wrapFunction0(jt_DecimalFormatSymbols_getInfinity), "$getMinusSign", $rt_wrapFunction0(jt_DecimalFormatSymbols_getMinusSign), "$getExponentSeparator", $rt_wrapFunction0(jt_DecimalFormatSymbols_getExponentSeparator), "$clone0", $rt_wrapFunction0(jt_DecimalFormatSymbols_clone)],
jl_NullPointerException, "NullPointerException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(jl_NullPointerException__init_0), "$_init_0", $rt_wrapFunction0(jl_NullPointerException__init_1)],
ju_Formatter, 0, jl_Object, [ji_Closeable, ji_Flushable], 4, 3, 0, 0, ["$_init_20", $rt_wrapFunction2(ju_Formatter__init_), "$ioException", $rt_wrapFunction0(ju_Formatter_ioException), "$format2", $rt_wrapFunction2(ju_Formatter_format), "$format8", $rt_wrapFunction3(ju_Formatter_format0)],
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, 0, ["$_init_40", $rt_wrapFunction1(otpp_AsyncCallbackWrapper__init_), "$complete", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_complete), "$error", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_error)],
ju_IllegalFormatPrecisionException, "IllegalFormatPrecisionException", 1, ju_IllegalFormatException, [], 0, 3, 0, 0, ["$_init_3", $rt_wrapFunction1(ju_IllegalFormatPrecisionException__init_)],
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Object$Monitor__init_)],
nmn_MinecraftClientConnection$send$lambda$_8_0, 0, jl_Object, [juf_Consumer], 0, 3, 0, 0, ["$_init_8", $rt_wrapFunction4(nmn_MinecraftClientConnection$send$lambda$_8_0__init_)],
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Byte, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Byte_$callClinit, ["$_init_41", $rt_wrapFunction1(jl_Byte__init_)],
jm_RoundingMode, 0, jl_Enum, [], 12, 3, 0, jm_RoundingMode_$callClinit, 0,
jl_IllegalAccessException, "IllegalAccessException", 2, jl_ReflectiveOperationException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalAccessException__init_0)],
nmn_MinecraftClientConnection$_clinit_$lambda$_44_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(nmn_MinecraftClientConnection$_clinit_$lambda$_44_0__init_)],
jt_DecimalFormatParser, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jt_DecimalFormatParser__init_), "$parse", $rt_wrapFunction1(jt_DecimalFormatParser_parse), "$apply", $rt_wrapFunction1(jt_DecimalFormatParser_apply), "$parseText", $rt_wrapFunction2(jt_DecimalFormatParser_parseText)],
jlr_Modifier, 0, jl_Object, [], 0, 3, 0, jlr_Modifier_$callClinit, 0,
juc_ConcurrentLinkedQueue, 0, jl_Object, [ju_Queue, ji_Serializable], 32, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(juc_ConcurrentLinkedQueue__init_), "$poll", $rt_wrapFunction0(juc_ConcurrentLinkedQueue_poll), "$isEmpty", $rt_wrapFunction0(juc_ConcurrentLinkedQueue_isEmpty), "$add", $rt_wrapFunction1(juc_ConcurrentLinkedQueue_add)],
ju_Formattable, 0, jl_Object, [], 3, 3, 0, 0, 0,
yx$6, 0, jl_Object, [yx], 0, 0, 0, 0, ["$_init_33", $rt_wrapFunction2(yx$6__init_)],
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray), "$_init_0", $rt_wrapFunction0(ju_HashMap__init_1), "$_init_3", $rt_wrapFunction1(ju_HashMap__init_), "$_init_43", $rt_wrapFunction2(ju_HashMap__init_0), "$get", $rt_wrapFunction1(ju_HashMap_get), "$entryByKey", $rt_wrapFunction1(ju_HashMap_entryByKey), "$findNonNullKeyEntry", $rt_wrapFunction3(ju_HashMap_findNonNullKeyEntry), "$findNullKeyEntry", $rt_wrapFunction0(ju_HashMap_findNullKeyEntry),
"$put", $rt_wrapFunction2(ju_HashMap_put), "$rehash0", $rt_wrapFunction1(ju_HashMap_rehash), "$rehash", $rt_wrapFunction0(ju_HashMap_rehash0)],
jt_DecimalFormat$MinusField, 0, jl_Object, [jt_DecimalFormat$FormatField], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jt_DecimalFormat$MinusField__init_), "$render", $rt_wrapFunction2(jt_DecimalFormat$MinusField_render)],
otcit_DoubleAnalyzer, 0, jl_Object, [], 4, 3, 0, otcit_DoubleAnalyzer_$callClinit, 0,
ju_IllegalFormatFlagsException, "IllegalFormatFlagsException", 1, ju_IllegalFormatException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction1(ju_IllegalFormatFlagsException__init_0)],
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction0(otcit_FloatAnalyzer$Result__init_)]]);
let $rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_shortArrayCls = $rt_arraycls($rt_shortcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls),
$rt_longArrayCls = $rt_arraycls($rt_longcls);
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "", ": ", "\tat ", "Caused by: ", "main", "Negative bit address", "Negative exponent", "BigInteger divide by zero", "[MCC] ClientIntentionPacket not found: ", "[MCC] ClientIntent not found: ", "[MCC] Failed to resolve packet ID", "[MCC] Serialization error: ", "getId", "[MCC] packet.getId() failed: ", "No constructor with 4 params found", "LOGIN", "b", "LOGIN field not found", "[MCC] Initiated handshake to %s:%d%n", "[MCC] Failed to initiate handshake: ",
"[MCC] Handshake classes not available", "STATUS", "TRANSFER", "null", "Currency not found: ", "0", "en", "CA", "fr", "zh", "CN", "FR", "de", "DE", "it", "IT", "ja", "JP", "ko", "KR", "TW", "GB", "US", "\n", "false", "true", "Unknown format conversion: ", "-", "Can\'t avoid rounding", "Can\'t format argument of ", " using ", " conversion", "[RUNTIME C] JsNetBridge.onReceiveFrame ENTERED, frame.length=", "[RUNTIME C] Empty frame, returning", "[RUNTIME F] frameLength=", ", afterLen=", "[RUNTIME G] packetId=",
" from frameLength=", "[RUNTIME C] Dispatching packet ", "[NetBridge] Incomplete frame", "Can\'t convert code point ", " to char", "interface ", "class ", "<init>", "<clinit>", "Either src or dest is null", "[ClientMain] onReceiveFrame called (DCE prevention only): ", "[ClientMain] writePacket called (DCE prevention only): ", "[ClientMain] joinServer called (DCE prevention only): ", "localhost", "[ClientMain] callJoinServer called (DCE prevention only): ", "[ClientMain] initiateHandshake called (DCE prevention only): ",
"[ClientMain] exportCallInitiateHandshake called (DCE prevention only): ", "[ClientMain] exportCallJoinServer called (DCE prevention only): ", "[ClientMain] Browser client bootstrap complete", "Overflow", "Underflow", "[NetBridge] Channel not open, packet dropped", "[NetBridge] Sent packet %d (id=%d, len=%d)%n", "[NetBridge] Channel not open, joinServer dropped", "[NetBridge] joinServer(%s, %d)%n", "VarInt values must be >= 0", "Duplicate format flags: ", "Missing format with for specifier ", "power of ten too big",
"Illegal format flags ", " for conversion ", "[RenderLoop] Started", "%", "(", ")", "+", " ", "+ ", "0-", "0x", "--#+ 0,(<", "This exception should not been thrown", "Illegal precision: ", "UP", "DOWN", "CEILING", "FLOOR", "HALF_UP", "HALF_DOWN", "HALF_EVEN", "UNNECESSARY", "Positive number pattern not found in ", "Expected \';\' at ", " in ", "Prefix contains special character at ", "Quote opened at ", " was not closed in ", "Two group separators at ", "Unexpected \'#\' at non-optional digit part at ", "Pattern does not specify integer digits at ",
"Group separator at the end of number at ", "Group separator found at fractional part at ", "Unexpected second decimal separator at ", "Unexpected \'0\' at optional digit part at ", "Unexpected char at exponent at ", "Pattern does not specify exponent digits at ", "Illegal format flags: "]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_export_main = $rt_mainStarter(p_ClientMain_main);
$rt_export_main.javaException = $rt_javaException;
$rt_exports.main = $rt_export_main;
}));
