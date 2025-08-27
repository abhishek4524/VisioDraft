#! /usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/vendor/hash-wasm/sha256.js
var import_meta, Module, sha256_default;
var init_sha256 = __esm({
  "src/vendor/hash-wasm/sha256.js"() {
    "use strict";
    import_meta = {};
    Module = (() => {
      var _unused = import_meta.url;
      return function(moduleArg = {}) {
        var Module2 = moduleArg;
        var readyPromiseResolve, readyPromiseReject;
        Module2["ready"] = new Promise((resolve3, reject) => {
          readyPromiseResolve = resolve3;
          readyPromiseReject = reject;
        });
        var moduleOverrides = Object.assign({}, Module2);
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => {
          throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = typeof window == "object";
        var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
        var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
        var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
        var scriptDirectory = "";
        function locateFile(path2) {
          if (Module2["locateFile"]) {
            return Module2["locateFile"](path2, scriptDirectory);
          }
          return scriptDirectory + path2;
        }
        var read_, readAsync, readBinary;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
          if (ENVIRONMENT_IS_WORKER) {
            scriptDirectory = self.location.href;
          } else if (typeof document != "undefined" && document.currentScript) {
            scriptDirectory = document.currentScript.src;
          }
          if (false) {
            scriptDirectory = false;
          }
          if (scriptDirectory.startsWith("blob:")) {
            scriptDirectory = "";
          } else {
            scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
          }
          {
            read_ = (url) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.send(null);
              return xhr.responseText;
            };
            if (ENVIRONMENT_IS_WORKER) {
              readBinary = (url) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(
                  /** @type{!ArrayBuffer} */
                  xhr.response
                );
              };
            }
            readAsync = (url, onload, onerror) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, true);
              xhr.responseType = "arraybuffer";
              xhr.onload = () => {
                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                  onload(xhr.response);
                  return;
                }
                onerror();
              };
              xhr.onerror = onerror;
              xhr.send(null);
            };
          }
        } else {
        }
        var out = Module2["print"] || console.log.bind(console);
        var err = Module2["printErr"] || console.error.bind(console);
        Object.assign(Module2, moduleOverrides);
        moduleOverrides = null;
        if (Module2["arguments"])
          arguments_ = Module2["arguments"];
        if (Module2["thisProgram"])
          thisProgram = Module2["thisProgram"];
        if (Module2["quit"])
          quit_ = Module2["quit"];
        var wasmBinary;
        if (Module2["wasmBinary"])
          wasmBinary = Module2["wasmBinary"];
        if (typeof WebAssembly != "object") {
          abort("no native wasm support detected");
        }
        function intArrayFromBase64(s) {
          var decoded = atob(s);
          var bytes = new Uint8Array(decoded.length);
          for (var i = 0; i < decoded.length; ++i) {
            bytes[i] = decoded.charCodeAt(i);
          }
          return bytes;
        }
        function tryParseAsDataURI(filename) {
          if (!isDataURI(filename)) {
            return;
          }
          return intArrayFromBase64(filename.slice(dataURIPrefix.length));
        }
        var wasmMemory;
        var ABORT = false;
        var EXITSTATUS;
        function assert(condition, text) {
          if (!condition) {
            abort(text);
          }
        }
        var HEAP, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateMemoryViews() {
          var b = wasmMemory.buffer;
          Module2["HEAP8"] = HEAP8 = new Int8Array(b);
          Module2["HEAP16"] = HEAP16 = new Int16Array(b);
          Module2["HEAPU8"] = HEAPU8 = new Uint8Array(b);
          Module2["HEAPU16"] = HEAPU16 = new Uint16Array(b);
          Module2["HEAP32"] = HEAP32 = new Int32Array(b);
          Module2["HEAPU32"] = HEAPU32 = new Uint32Array(b);
          Module2["HEAPF32"] = HEAPF32 = new Float32Array(b);
          Module2["HEAPF64"] = HEAPF64 = new Float64Array(b);
        }
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATEXIT__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        function preRun() {
          if (Module2["preRun"]) {
            if (typeof Module2["preRun"] == "function")
              Module2["preRun"] = [Module2["preRun"]];
            while (Module2["preRun"].length) {
              addOnPreRun(Module2["preRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
          runtimeInitialized = true;
          callRuntimeCallbacks(__ATINIT__);
        }
        function postRun() {
          if (Module2["postRun"]) {
            if (typeof Module2["postRun"] == "function")
              Module2["postRun"] = [Module2["postRun"]];
            while (Module2["postRun"].length) {
              addOnPostRun(Module2["postRun"].shift());
            }
          }
          callRuntimeCallbacks(__ATPOSTRUN__);
        }
        function addOnPreRun(cb) {
          __ATPRERUN__.unshift(cb);
        }
        function addOnInit(cb) {
          __ATINIT__.unshift(cb);
        }
        function addOnExit(cb) {
        }
        function addOnPostRun(cb) {
          __ATPOSTRUN__.unshift(cb);
        }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function getUniqueRunDependency(id) {
          return id;
        }
        function addRunDependency(id) {
          runDependencies++;
          Module2["monitorRunDependencies"]?.(runDependencies);
        }
        function removeRunDependency(id) {
          runDependencies--;
          Module2["monitorRunDependencies"]?.(runDependencies);
          if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
            }
            if (dependenciesFulfilled) {
              var callback = dependenciesFulfilled;
              dependenciesFulfilled = null;
              callback();
            }
          }
        }
        function abort(what) {
          Module2["onAbort"]?.(what);
          what = "Aborted(" + what + ")";
          err(what);
          ABORT = true;
          EXITSTATUS = 1;
          what += ". Build with -sASSERTIONS for more info.";
          var e = new WebAssembly.RuntimeError(what);
          readyPromiseReject(e);
          throw e;
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        var isDataURI = (filename) => filename.startsWith(dataURIPrefix);
        var isFileURI = (filename) => filename.startsWith("file://");
        var wasmBinaryFile;
        wasmBinaryFile = "data:application/octet-stream;base64,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";
        if (!isDataURI(wasmBinaryFile)) {
          wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinarySync(file) {
          if (file == wasmBinaryFile && wasmBinary) {
            return new Uint8Array(wasmBinary);
          }
          var binary = tryParseAsDataURI(file);
          if (binary) {
            return binary;
          }
          if (readBinary) {
            return readBinary(file);
          }
          throw "both async and sync fetching of the wasm failed";
        }
        function getBinaryPromise(binaryFile) {
          return Promise.resolve().then(() => getBinarySync(binaryFile));
        }
        function instantiateArrayBuffer(binaryFile, imports, receiver) {
          return getBinaryPromise(binaryFile).then((binary) => {
            return WebAssembly.instantiate(binary, imports);
          }).then(receiver, (reason) => {
            err(`failed to asynchronously prepare wasm: ${reason}`);
            abort(reason);
          });
        }
        function instantiateAsync(binary, binaryFile, imports, callback) {
          return instantiateArrayBuffer(binaryFile, imports, callback);
        }
        function createWasm() {
          var info = {
            "env": wasmImports,
            "wasi_snapshot_preview1": wasmImports
          };
          function receiveInstance(instance, module2) {
            wasmExports = instance.exports;
            wasmMemory = wasmExports["memory"];
            updateMemoryViews();
            addOnInit(wasmExports["__wasm_call_ctors"]);
            removeRunDependency("wasm-instantiate");
            return wasmExports;
          }
          addRunDependency("wasm-instantiate");
          function receiveInstantiationResult(result) {
            receiveInstance(result["instance"]);
          }
          if (Module2["instantiateWasm"]) {
            try {
              return Module2["instantiateWasm"](info, receiveInstance);
            } catch (e) {
              err(`Module.instantiateWasm callback failed with error: ${e}`);
              readyPromiseReject(e);
            }
          }
          instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
          return {};
        }
        var tempDouble;
        var tempI64;
        function ExitStatus(status) {
          this.name = "ExitStatus";
          this.message = `Program terminated with exit(${status})`;
          this.status = status;
        }
        var callRuntimeCallbacks = (callbacks) => {
          while (callbacks.length > 0) {
            callbacks.shift()(Module2);
          }
        };
        function getValue(ptr, type = "i8") {
          if (type.endsWith("*"))
            type = "*";
          switch (type) {
            case "i1":
              return HEAP8[ptr];
            case "i8":
              return HEAP8[ptr];
            case "i16":
              return HEAP16[ptr >> 1];
            case "i32":
              return HEAP32[ptr >> 2];
            case "i64":
              abort("to do getValue(i64) use WASM_BIGINT");
            case "float":
              return HEAPF32[ptr >> 2];
            case "double":
              return HEAPF64[ptr >> 3];
            case "*":
              return HEAPU32[ptr >> 2];
            default:
              abort(`invalid type for getValue: ${type}`);
          }
        }
        var noExitRuntime = Module2["noExitRuntime"] || true;
        function setValue(ptr, value, type = "i8") {
          if (type.endsWith("*"))
            type = "*";
          switch (type) {
            case "i1":
              HEAP8[ptr] = value;
              break;
            case "i8":
              HEAP8[ptr] = value;
              break;
            case "i16":
              HEAP16[ptr >> 1] = value;
              break;
            case "i32":
              HEAP32[ptr >> 2] = value;
              break;
            case "i64":
              abort("to do setValue(i64) use WASM_BIGINT");
            case "float":
              HEAPF32[ptr >> 2] = value;
              break;
            case "double":
              HEAPF64[ptr >> 3] = value;
              break;
            case "*":
              HEAPU32[ptr >> 2] = value;
              break;
            default:
              abort(`invalid type for setValue: ${type}`);
          }
        }
        var wasmImports = {};
        var wasmExports = createWasm();
        var ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports["__wasm_call_ctors"])();
        var _Hash_Update = Module2["_Hash_Update"] = (a0) => (_Hash_Update = Module2["_Hash_Update"] = wasmExports["Hash_Update"])(a0);
        var _Hash_Final = Module2["_Hash_Final"] = () => (_Hash_Final = Module2["_Hash_Final"] = wasmExports["Hash_Final"])();
        var _Hash_Init = Module2["_Hash_Init"] = (a0) => (_Hash_Init = Module2["_Hash_Init"] = wasmExports["Hash_Init"])(a0);
        var _GetBufferPtr = Module2["_GetBufferPtr"] = () => (_GetBufferPtr = Module2["_GetBufferPtr"] = wasmExports["GetBufferPtr"])();
        var stackSave = () => (stackSave = wasmExports["stackSave"])();
        var stackRestore = (a0) => (stackRestore = wasmExports["stackRestore"])(a0);
        var stackAlloc = (a0) => (stackAlloc = wasmExports["stackAlloc"])(a0);
        var calledRun;
        dependenciesFulfilled = function runCaller() {
          if (!calledRun)
            run2();
          if (!calledRun)
            dependenciesFulfilled = runCaller;
        };
        function run2() {
          if (runDependencies > 0) {
            return;
          }
          preRun();
          if (runDependencies > 0) {
            return;
          }
          function doRun() {
            if (calledRun)
              return;
            calledRun = true;
            Module2["calledRun"] = true;
            if (ABORT)
              return;
            initRuntime();
            readyPromiseResolve(Module2);
            if (Module2["onRuntimeInitialized"])
              Module2["onRuntimeInitialized"]();
            postRun();
          }
          if (Module2["setStatus"]) {
            Module2["setStatus"]("Running...");
            setTimeout(function() {
              setTimeout(function() {
                Module2["setStatus"]("");
              }, 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }
        if (Module2["preInit"]) {
          if (typeof Module2["preInit"] == "function")
            Module2["preInit"] = [Module2["preInit"]];
          while (Module2["preInit"].length > 0) {
            Module2["preInit"].pop()();
          }
        }
        run2();
        return moduleArg.ready;
      };
    })();
    sha256_default = Module;
  }
});

// src/vendor/hash-wasm/sha256-wrapper.ts
var sha256_wrapper_exports = {};
__export(sha256_wrapper_exports, {
  createSHA256: () => createSHA256,
  createSHA256WorkerCode: () => createSHA256WorkerCode
});
async function createSHA256(isInsideWorker = false) {
  const BUFFER_MAX_SIZE = 8 * 1024 * 1024;
  const wasm = isInsideWorker ? (
    // @ts-expect-error WasmModule will be populated inside self object
    await self["SHA256WasmModule"]()
  ) : await sha256_default();
  const heap = wasm.HEAPU8.subarray(wasm._GetBufferPtr());
  return {
    init() {
      wasm._Hash_Init(256);
    },
    update(data) {
      let byteUsed = 0;
      while (byteUsed < data.byteLength) {
        const bytesLeft = data.byteLength - byteUsed;
        const length = Math.min(bytesLeft, BUFFER_MAX_SIZE);
        heap.set(data.subarray(byteUsed, byteUsed + length));
        wasm._Hash_Update(length);
        byteUsed += length;
      }
    },
    digest(method) {
      if (method !== "hex") {
        throw new Error("Only digest hex is supported");
      }
      wasm._Hash_Final();
      const result = Array.from(heap.slice(0, 32));
      return result.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  };
}
function createSHA256WorkerCode() {
  return `
		self.addEventListener('message', async (event) => {
      const { file } = event.data;
      const sha256 = await self.createSHA256(true);
      sha256.init();
      const reader = file.stream().getReader();
      const total = file.size;
      let bytesDone = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        sha256.update(value);
        bytesDone += value.length;
        postMessage({ progress: bytesDone / total });
      }
      postMessage({ sha256: sha256.digest('hex') });
    });
    self.SHA256WasmModule = ${sha256_default.toString()};
    self.createSHA256 = ${createSHA256.toString()};
  `;
}
var init_sha256_wrapper = __esm({
  "src/vendor/hash-wasm/sha256-wrapper.ts"() {
    "use strict";
    init_sha256();
  }
});

// src/utils/sha256-node.ts
var sha256_node_exports = {};
__export(sha256_node_exports, {
  sha256Node: () => sha256Node
});
async function* sha256Node(buffer, opts) {
  const sha256Stream = (0, import_node_crypto.createHash)("sha256");
  const size = buffer instanceof Blob ? buffer.size : buffer.byteLength;
  let done = 0;
  const readable = buffer instanceof Blob ? import_node_stream.Readable.fromWeb(buffer.stream()) : import_node_stream.Readable.from(Buffer.from(buffer));
  for await (const buffer2 of readable) {
    sha256Stream.update(buffer2);
    done += buffer2.length;
    yield done / size;
    opts?.abortSignal?.throwIfAborted();
  }
  return sha256Stream.digest("hex");
}
var import_node_stream, import_node_crypto;
var init_sha256_node = __esm({
  "src/utils/sha256-node.ts"() {
    "use strict";
    import_node_stream = require("stream");
    import_node_crypto = require("crypto");
  }
});

// src/utils/FileBlob.ts
var FileBlob_exports = {};
__export(FileBlob_exports, {
  FileBlob: () => FileBlob
});
var import_node_fs, import_promises2, import_node_stream2, import_node_url, FileBlob;
var init_FileBlob = __esm({
  "src/utils/FileBlob.ts"() {
    "use strict";
    import_node_fs = require("fs");
    import_promises2 = require("fs/promises");
    import_node_stream2 = require("stream");
    import_node_url = require("url");
    FileBlob = class extends Blob {
      /**
       * Creates a new FileBlob on the provided file.
       *
       * @param path Path to the file to be lazy readed
       */
      static async create(path2) {
        path2 = path2 instanceof URL ? (0, import_node_url.fileURLToPath)(path2) : path2;
        const { size } = await (0, import_promises2.stat)(path2);
        const fileBlob = new FileBlob(path2, 0, size);
        return fileBlob;
      }
      path;
      start;
      end;
      constructor(path2, start, end) {
        super();
        this.path = path2;
        this.start = start;
        this.end = end;
      }
      /**
       * Returns the size of the blob.
       */
      get size() {
        return this.end - this.start;
      }
      /**
       * Returns a new instance of FileBlob that is a slice of the current one.
       *
       * The slice is inclusive of the start and exclusive of the end.
       *
       * The slice method does not supports negative start/end.
       *
       * @param start beginning of the slice
       * @param end end of the slice
       */
      slice(start = 0, end = this.size) {
        if (start < 0 || end < 0) {
          new TypeError("Unsupported negative start/end on FileBlob.slice");
        }
        const slice = new FileBlob(this.path, this.start + start, Math.min(this.start + end, this.end));
        return slice;
      }
      /**
       * Read the part of the file delimited by the FileBlob and returns it as an ArrayBuffer.
       */
      async arrayBuffer() {
        const slice = await this.execute((file) => file.read(Buffer.alloc(this.size), 0, this.size, this.start));
        return slice.buffer;
      }
      /**
       * Read the part of the file delimited by the FileBlob and returns it as a string.
       */
      async text() {
        const buffer = await this.arrayBuffer();
        return buffer.toString("utf8");
      }
      /**
       * Returns a stream around the part of the file delimited by the FileBlob.
       */
      stream() {
        return import_node_stream2.Readable.toWeb((0, import_node_fs.createReadStream)(this.path, { start: this.start, end: this.end - 1 }));
      }
      /**
       * We are opening and closing the file for each action to prevent file descriptor leaks.
       *
       * It is an intended choice of developer experience over performances.
       */
      async execute(action) {
        const file = await (0, import_promises2.open)(this.path, "r");
        try {
          return await action(file);
        } finally {
          await file.close();
        }
      }
    };
  }
});

// src/utils/sub-paths.ts
var sub_paths_exports = {};
__export(sub_paths_exports, {
  subPaths: () => subPaths
});
async function subPaths(path2, maxDepth = 10) {
  const state = await (0, import_promises3.stat)(path2);
  if (!state.isDirectory()) {
    return [{ path: path2, relativePath: "." }];
  }
  const files = await (0, import_promises3.readdir)(path2, { withFileTypes: true });
  const ret = [];
  for (const file of files) {
    const filePath = (0, import_node_url2.pathToFileURL)((0, import_node_url2.fileURLToPath)(path2) + "/" + file.name);
    if (file.isDirectory()) {
      ret.push(
        ...(await subPaths(filePath, maxDepth - 1)).map((subPath) => ({
          ...subPath,
          relativePath: `${file.name}/${subPath.relativePath}`
        }))
      );
    } else {
      ret.push({ path: filePath, relativePath: file.name });
    }
  }
  return ret;
}
var import_promises3, import_node_url2;
var init_sub_paths = __esm({
  "src/utils/sub-paths.ts"() {
    "use strict";
    import_promises3 = require("fs/promises");
    import_node_url2 = require("url");
  }
});

// cli.ts
var import_node_util = require("util");

// src/utils/typedEntries.ts
function typedEntries(obj) {
  return Object.entries(obj);
}

// src/lib/cache-management.ts
var import_node_os = require("os");
var import_node_path = require("path");
var import_promises = require("fs/promises");

// src/consts.ts
var HUB_URL = "https://huggingface.co";

// src/error.ts
async function createApiError(response, opts) {
  const error = new HubApiError(response.url, response.status, response.headers.get("X-Request-Id") ?? opts?.requestId);
  error.message = `Api error with status ${error.statusCode}${opts?.message ? `. ${opts.message}` : ""}`;
  const trailer = [`URL: ${error.url}`, error.requestId ? `Request ID: ${error.requestId}` : void 0].filter(Boolean).join(". ");
  if (response.headers.get("Content-Type")?.startsWith("application/json")) {
    const json = await response.json();
    error.message = json.error || json.message || error.message;
    if (json.error_description) {
      error.message = error.message ? error.message + `: ${json.error_description}` : json.error_description;
    }
    error.data = json;
  } else {
    error.data = { message: await response.text() };
  }
  error.message += `. ${trailer}`;
  throw error;
}
var HubApiError = class extends Error {
  statusCode;
  url;
  requestId;
  data;
  constructor(url, statusCode, requestId, message) {
    super(message);
    this.statusCode = statusCode;
    this.requestId = requestId;
    this.url = url;
  }
};
var InvalidApiResponseFormatError = class extends Error {
};

// src/utils/checkCredentials.ts
function checkAccessToken(accessToken) {
  if (!accessToken.startsWith("hf_")) {
    throw new TypeError("Your access token must start with 'hf_'");
  }
}
function checkCredentials(params) {
  if (params.accessToken) {
    checkAccessToken(params.accessToken);
    return params.accessToken;
  }
  if (params.credentials?.accessToken) {
    checkAccessToken(params.credentials.accessToken);
    return params.credentials.accessToken;
  }
}

// src/utils/toRepoId.ts
function toRepoId(repo) {
  if (typeof repo !== "string") {
    return repo;
  }
  if (repo.startsWith("model/") || repo.startsWith("models/")) {
    throw new TypeError(
      "A repo designation for a model should not start with 'models/', directly specify the model namespace / name"
    );
  }
  if (repo.startsWith("space/")) {
    throw new TypeError("Spaces should start with 'spaces/', plural, not 'space/'");
  }
  if (repo.startsWith("dataset/")) {
    throw new TypeError("Datasets should start with 'dataset/', plural, not 'dataset/'");
  }
  const slashes = repo.split("/").length - 1;
  if (repo.startsWith("spaces/")) {
    if (slashes !== 2) {
      throw new TypeError("Space Id must include namespace and name of the space");
    }
    return {
      type: "space",
      name: repo.slice("spaces/".length)
    };
  }
  if (repo.startsWith("datasets/")) {
    if (slashes > 2) {
      throw new TypeError("Too many slashes in repo designation: " + repo);
    }
    return {
      type: "dataset",
      name: repo.slice("datasets/".length)
    };
  }
  if (slashes > 1) {
    throw new TypeError("Too many slashes in repo designation: " + repo);
  }
  return {
    type: "model",
    name: repo
  };
}

// src/utils/range.ts
function range(n, b) {
  return b ? Array(b - n).fill(0).map((_, i) => n + i) : Array(n).fill(0).map((_, i) => i);
}

// src/utils/chunk.ts
function chunk(arr, chunkSize) {
  if (isNaN(chunkSize) || chunkSize < 1) {
    throw new RangeError("Invalid chunk size: " + chunkSize);
  }
  if (!arr.length) {
    return [];
  }
  if (arr.length <= chunkSize) {
    return [arr];
  }
  return range(Math.ceil(arr.length / chunkSize)).map((i) => {
    return arr.slice(i * chunkSize, (i + 1) * chunkSize);
  });
}

// src/utils/promisesQueue.ts
async function promisesQueue(factories, concurrency) {
  const results = [];
  const executing = /* @__PURE__ */ new Set();
  let index = 0;
  for (const factory of factories) {
    const closureIndex = index++;
    const e = factory().then((r) => {
      results[closureIndex] = r;
      executing.delete(e);
    });
    executing.add(e);
    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }
  await Promise.all(executing);
  return results;
}

// src/utils/promisesQueueStreaming.ts
async function promisesQueueStreaming(factories, concurrency) {
  const executing = [];
  for await (const factory of factories) {
    const e = factory().then(() => {
      executing.splice(executing.indexOf(e), 1);
    });
    executing.push(e);
    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }
  await Promise.all(executing);
}

// src/utils/eventToGenerator.ts
async function* eventToGenerator(cb) {
  const promises = [];
  function addPromise() {
    let resolve3;
    let reject;
    const p = new Promise((res, rej) => {
      resolve3 = res;
      reject = rej;
    });
    promises.push({ p, resolve: resolve3, reject });
  }
  addPromise();
  const callbackRes = Promise.resolve().then(
    () => cb(
      (y) => {
        addPromise();
        promises.at(-2)?.resolve({ done: false, value: y });
      },
      (r) => {
        addPromise();
        promises.at(-2)?.resolve({ done: true, value: r });
      },
      (err) => promises.shift()?.reject(err)
    )
  ).catch((err) => promises.shift()?.reject(err));
  while (1) {
    const p = promises[0];
    if (!p) {
      throw new Error("Logic error in eventGenerator, promises should never be empty");
    }
    const result = await p.p;
    promises.shift();
    if (result.done) {
      await callbackRes;
      return result.value;
    }
    yield result.value;
  }
  throw new Error("Unreachable");
}

// src/utils/hexFromBytes.ts
function hexFromBytes(arr) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("hex");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(byte.toString(16).padStart(2, "0"));
    });
    return bin.join("");
  }
}

// src/utils/isBackend.ts
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
var isWebWorker = typeof self === "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";
var isBackend = !isBrowser && !isWebWorker;

// src/utils/isFrontend.ts
var isFrontend = !isBackend;

// src/utils/sha256.ts
async function getWebWorkerCode() {
  const sha256Module = await Promise.resolve().then(() => (init_sha256_wrapper(), sha256_wrapper_exports));
  return URL.createObjectURL(new Blob([sha256Module.createSHA256WorkerCode()]));
}
var pendingWorkers = [];
var runningWorkers = /* @__PURE__ */ new Set();
var resolve;
var waitPromise = new Promise((r) => {
  resolve = r;
});
async function getWorker(poolSize) {
  {
    const worker2 = pendingWorkers.pop();
    if (worker2) {
      runningWorkers.add(worker2);
      return worker2;
    }
  }
  if (!poolSize) {
    const worker2 = new Worker(await getWebWorkerCode());
    runningWorkers.add(worker2);
    return worker2;
  }
  if (poolSize <= 0) {
    throw new TypeError("Invalid webworker pool size: " + poolSize);
  }
  while (runningWorkers.size >= poolSize) {
    await waitPromise;
  }
  const worker = new Worker(await getWebWorkerCode());
  runningWorkers.add(worker);
  return worker;
}
async function freeWorker(worker, poolSize) {
  if (!poolSize) {
    return destroyWorker(worker);
  }
  runningWorkers.delete(worker);
  pendingWorkers.push(worker);
  const r = resolve;
  waitPromise = new Promise((r2) => {
    resolve = r2;
  });
  r();
}
function destroyWorker(worker) {
  runningWorkers.delete(worker);
  worker.terminate();
  const r = resolve;
  waitPromise = new Promise((r2) => {
    resolve = r2;
  });
  r();
}
async function* sha256(buffer, opts) {
  yield 0;
  const maxCryptoSize = typeof opts?.useWebWorker === "object" && opts?.useWebWorker.minSize !== void 0 ? opts.useWebWorker.minSize : 1e7;
  if (buffer.size < maxCryptoSize && globalThis.crypto?.subtle) {
    const res = hexFromBytes(
      new Uint8Array(
        await globalThis.crypto.subtle.digest("SHA-256", buffer instanceof Blob ? await buffer.arrayBuffer() : buffer)
      )
    );
    yield 1;
    return res;
  }
  if (isFrontend) {
    if (opts?.useWebWorker) {
      try {
        const poolSize = typeof opts?.useWebWorker === "object" ? opts.useWebWorker.poolSize : void 0;
        const worker = await getWorker(poolSize);
        let messageHandler;
        let errorHandler;
        const cleanup = () => {
          worker.removeEventListener("message", messageHandler);
          worker.removeEventListener("error", errorHandler);
        };
        return yield* eventToGenerator((yieldCallback, returnCallback, rejectCallback) => {
          messageHandler = (event) => {
            if (event.data.sha256) {
              cleanup();
              freeWorker(worker, poolSize);
              returnCallback(event.data.sha256);
            } else if (event.data.progress) {
              yieldCallback(event.data.progress);
              try {
                opts.abortSignal?.throwIfAborted();
              } catch (err) {
                cleanup();
                destroyWorker(worker);
                rejectCallback(err);
              }
            } else {
              cleanup();
              destroyWorker(worker);
              rejectCallback(event);
            }
          };
          errorHandler = (event) => {
            cleanup();
            destroyWorker(worker);
            rejectCallback(event.error);
          };
          if (opts?.abortSignal) {
            try {
              opts.abortSignal?.throwIfAborted();
            } catch (err) {
              cleanup();
              destroyWorker(worker);
              rejectCallback(opts.abortSignal.reason ?? new DOMException("Aborted", "AbortError"));
              return;
            }
            const abortListener = () => {
              cleanup();
              destroyWorker(worker);
              rejectCallback(opts.abortSignal?.reason ?? new DOMException("Aborted", "AbortError"));
              opts.abortSignal?.removeEventListener("abort", abortListener);
            };
            opts.abortSignal.addEventListener("abort", abortListener);
          }
          worker.addEventListener("message", messageHandler);
          worker.addEventListener("error", errorHandler);
          worker.postMessage({ file: buffer });
        });
      } catch (err) {
        console.warn("Failed to use web worker for sha256", err);
      }
    }
    if (!wasmModule) {
      wasmModule = await Promise.resolve().then(() => (init_sha256_wrapper(), sha256_wrapper_exports));
    }
    const sha2562 = await wasmModule.createSHA256();
    sha2562.init();
    const reader = buffer.stream().getReader();
    const total = buffer.size;
    let bytesDone = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      sha2562.update(value);
      bytesDone += value.length;
      yield bytesDone / total;
      opts?.abortSignal?.throwIfAborted();
    }
    return sha2562.digest("hex");
  }
  if (!cryptoModule) {
    cryptoModule = await Promise.resolve().then(() => (init_sha256_node(), sha256_node_exports));
  }
  return yield* cryptoModule.sha256Node(buffer, { abortSignal: opts?.abortSignal });
}
var cryptoModule;
var wasmModule;

// src/utils/WebBlob.ts
var WebBlob = class extends Blob {
  static async create(url, opts) {
    const customFetch = opts?.fetch ?? fetch;
    const response = await customFetch(url, {
      method: "HEAD",
      ...opts?.accessToken && {
        headers: {
          Authorization: `Bearer ${opts.accessToken}`
        }
      }
    });
    const size = Number(response.headers.get("content-length"));
    const contentType = response.headers.get("content-type") || "";
    const supportRange = response.headers.get("accept-ranges") === "bytes";
    if (!supportRange || size < (opts?.cacheBelow ?? 1e6)) {
      return await (await customFetch(url)).blob();
    }
    return new WebBlob(url, 0, size, contentType, true, customFetch, opts?.accessToken);
  }
  url;
  start;
  end;
  contentType;
  full;
  fetch;
  accessToken;
  constructor(url, start, end, contentType, full, customFetch, accessToken) {
    super([]);
    this.url = url;
    this.start = start;
    this.end = end;
    this.contentType = contentType;
    this.full = full;
    this.fetch = customFetch;
    this.accessToken = accessToken;
  }
  get size() {
    return this.end - this.start;
  }
  get type() {
    return this.contentType;
  }
  slice(start = 0, end = this.size) {
    if (start < 0 || end < 0) {
      new TypeError("Unsupported negative start/end on WebBlob.slice");
    }
    const slice = new WebBlob(
      this.url,
      this.start + start,
      Math.min(this.start + end, this.end),
      this.contentType,
      start === 0 && end === this.size ? this.full : false,
      this.fetch,
      this.accessToken
    );
    return slice;
  }
  async arrayBuffer() {
    const result = await this.fetchRange();
    return result.arrayBuffer();
  }
  async text() {
    const result = await this.fetchRange();
    return result.text();
  }
  stream() {
    const stream = new TransformStream();
    this.fetchRange().then((response) => response.body?.pipeThrough(stream)).catch((error) => stream.writable.abort(error.message));
    return stream.readable;
  }
  fetchRange() {
    const fetch2 = this.fetch;
    if (this.full) {
      return fetch2(this.url, {
        ...this.accessToken && {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then((resp) => resp.ok ? resp : createApiError(resp));
    }
    return fetch2(this.url, {
      headers: {
        Range: `bytes=${this.start}-${this.end - 1}`,
        ...this.accessToken && { Authorization: `Bearer ${this.accessToken}` }
      }
    }).then((resp) => resp.ok ? resp : createApiError(resp));
  }
};

// src/utils/base64FromBytes.ts
function base64FromBytes(arr) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

// src/utils/createBlobs.ts
async function createBlobs(url, destPath, opts) {
  if (url.protocol === "http:" || url.protocol === "https:") {
    const blob = await WebBlob.create(url, { fetch: opts?.fetch, accessToken: opts?.accessToken });
    return [{ path: destPath, blob }];
  }
  if (isFrontend) {
    throw new TypeError(`Unsupported URL protocol "${url.protocol}"`);
  }
  if (url.protocol === "file:") {
    const { FileBlob: FileBlob2 } = await Promise.resolve().then(() => (init_FileBlob(), FileBlob_exports));
    const { subPaths: subPaths2 } = await Promise.resolve().then(() => (init_sub_paths(), sub_paths_exports));
    const paths = await subPaths2(url, opts?.maxFolderDepth);
    if (paths.length === 1 && paths[0].relativePath === ".") {
      const blob = await FileBlob2.create(url);
      return [{ path: destPath, blob }];
    }
    return Promise.all(
      paths.map(async (path2) => ({
        path: `${destPath}/${path2.relativePath}`.replace(/\/[.]$/, "").replaceAll("//", "/").replace(/^[.]?\//, ""),
        blob: await FileBlob2.create(new URL(path2.path))
      }))
    );
  }
  throw new TypeError(`Unsupported URL protocol "${url.protocol}"`);
}

// src/lib/commit.ts
var CONCURRENT_SHAS = 5;
var CONCURRENT_LFS_UPLOADS = 5;
var MULTIPART_PARALLEL_UPLOAD = 5;
function isFileOperation(op) {
  const ret = op.operation === "addOrUpdate";
  if (ret && !(op.content instanceof Blob)) {
    throw new TypeError("Precondition failed: op.content should be a Blob");
  }
  return ret;
}
async function* commitIter(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  yield { event: "phase", phase: "preuploading" };
  const lfsShas = /* @__PURE__ */ new Map();
  const abortController = new AbortController();
  const abortSignal = abortController.signal;
  if (!abortSignal.throwIfAborted) {
    abortSignal.throwIfAborted = () => {
      if (abortSignal.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }
    };
  }
  if (params.abortSignal) {
    params.abortSignal.addEventListener("abort", () => abortController.abort());
  }
  try {
    const allOperations = (await Promise.all(
      params.operations.map(async (operation) => {
        if (operation.operation !== "addOrUpdate") {
          return operation;
        }
        if (!(operation.content instanceof URL)) {
          return { ...operation, content: operation.content };
        }
        const lazyBlobs = await createBlobs(operation.content, operation.path, {
          fetch: params.fetch,
          maxFolderDepth: params.maxFolderDepth
        });
        abortSignal?.throwIfAborted();
        return lazyBlobs.map((blob) => ({
          ...operation,
          content: blob.blob,
          path: blob.path
        }));
      })
    )).flat(1);
    const gitAttributes = allOperations.filter(isFileOperation).find((op) => op.path === ".gitattributes")?.content;
    for (const operations of chunk(allOperations.filter(isFileOperation), 100)) {
      const payload = {
        gitAttributes: gitAttributes && await gitAttributes.text(),
        files: await Promise.all(
          operations.map(async (operation) => ({
            path: operation.path,
            size: operation.content.size,
            sample: base64FromBytes(new Uint8Array(await operation.content.slice(0, 512).arrayBuffer()))
          }))
        )
      };
      abortSignal?.throwIfAborted();
      const res = await (params.fetch ?? fetch)(
        `${params.hubUrl ?? HUB_URL}/api/${repoId.type}s/${repoId.name}/preupload/${encodeURIComponent(
          params.branch ?? "main"
        )}` + (params.isPullRequest ? "?create_pr=1" : ""),
        {
          method: "POST",
          headers: {
            ...accessToken && { Authorization: `Bearer ${accessToken}` },
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
          signal: abortSignal
        }
      );
      if (!res.ok) {
        throw await createApiError(res);
      }
      const json = await res.json();
      for (const file of json.files) {
        if (file.uploadMode === "lfs") {
          lfsShas.set(file.path, null);
        }
      }
    }
    yield { event: "phase", phase: "uploadingLargeFiles" };
    for (const operations of chunk(
      allOperations.filter(isFileOperation).filter((op) => lfsShas.has(op.path)),
      100
    )) {
      const shas = yield* eventToGenerator((yieldCallback, returnCallback, rejectCallack) => {
        return promisesQueue(
          operations.map((op) => async () => {
            const iterator = sha256(op.content, { useWebWorker: params.useWebWorkers, abortSignal });
            let res2;
            do {
              res2 = await iterator.next();
              if (!res2.done) {
                yieldCallback({ event: "fileProgress", path: op.path, progress: res2.value, state: "hashing" });
              }
            } while (!res2.done);
            const sha = res2.value;
            lfsShas.set(op.path, res2.value);
            return sha;
          }),
          CONCURRENT_SHAS
        ).then(returnCallback, rejectCallack);
      });
      abortSignal?.throwIfAborted();
      const payload = {
        operation: "upload",
        // multipart is a custom protocol for HF
        transfers: ["basic", "multipart"],
        hash_algo: "sha_256",
        ...!params.isPullRequest && {
          ref: {
            name: params.branch ?? "main"
          }
        },
        objects: operations.map((op, i) => ({
          oid: shas[i],
          size: op.content.size
        }))
      };
      const res = await (params.fetch ?? fetch)(
        `${params.hubUrl ?? HUB_URL}/${repoId.type === "model" ? "" : repoId.type + "s/"}${repoId.name}.git/info/lfs/objects/batch`,
        {
          method: "POST",
          headers: {
            ...accessToken && { Authorization: `Bearer ${accessToken}` },
            Accept: "application/vnd.git-lfs+json",
            "Content-Type": "application/vnd.git-lfs+json"
          },
          body: JSON.stringify(payload),
          signal: abortSignal
        }
      );
      if (!res.ok) {
        throw await createApiError(res);
      }
      const json = await res.json();
      const batchRequestId = res.headers.get("X-Request-Id") || void 0;
      const shaToOperation = new Map(operations.map((op, i) => [shas[i], op]));
      yield* eventToGenerator((yieldCallback, returnCallback, rejectCallback) => {
        return promisesQueueStreaming(
          json.objects.map((obj) => async () => {
            const op = shaToOperation.get(obj.oid);
            if (!op) {
              throw new InvalidApiResponseFormatError("Unrequested object ID in response");
            }
            abortSignal?.throwIfAborted();
            if (obj.error) {
              const errorMessage = `Error while doing LFS batch call for ${operations[shas.indexOf(obj.oid)].path}: ${obj.error.message}${batchRequestId ? ` - Request ID: ${batchRequestId}` : ""}`;
              throw new HubApiError(res.url, obj.error.code, batchRequestId, errorMessage);
            }
            if (!obj.actions?.upload) {
              yieldCallback({
                event: "fileProgress",
                path: op.path,
                progress: 1,
                state: "uploading"
              });
              return;
            }
            yieldCallback({
              event: "fileProgress",
              path: op.path,
              progress: 0,
              state: "uploading"
            });
            const content = op.content;
            const header = obj.actions.upload.header;
            if (header?.chunk_size) {
              const chunkSize = parseInt(header.chunk_size);
              const completionUrl = obj.actions.upload.href;
              const parts = Object.keys(header).filter((key) => /^[0-9]+$/.test(key));
              if (parts.length !== Math.ceil(content.size / chunkSize)) {
                throw new Error("Invalid server response to upload large LFS file, wrong number of parts");
              }
              const completeReq = {
                oid: obj.oid,
                parts: parts.map((part) => ({
                  partNumber: +part,
                  etag: ""
                }))
              };
              const progressCallback = (progress) => yieldCallback({ event: "fileProgress", path: op.path, progress, state: "uploading" });
              await promisesQueueStreaming(
                parts.map((part) => async () => {
                  abortSignal?.throwIfAborted();
                  const index = parseInt(part) - 1;
                  const slice = content.slice(index * chunkSize, (index + 1) * chunkSize);
                  const res3 = await (params.fetch ?? fetch)(header[part], {
                    method: "PUT",
                    /** Unfortunately, browsers don't support our inherited version of Blob in fetch calls */
                    body: slice instanceof WebBlob && isFrontend ? await slice.arrayBuffer() : slice,
                    signal: abortSignal,
                    ...{
                      progressHint: {
                        path: op.path,
                        part: index,
                        numParts: parts.length,
                        progressCallback
                      }
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    }
                  });
                  if (!res3.ok) {
                    throw await createApiError(res3, {
                      requestId: batchRequestId,
                      message: `Error while uploading part ${part} of ${operations[shas.indexOf(obj.oid)].path} to LFS storage`
                    });
                  }
                  const eTag = res3.headers.get("ETag");
                  if (!eTag) {
                    throw new Error("Cannot get ETag of part during multipart upload");
                  }
                  completeReq.parts[Number(part) - 1].etag = eTag;
                }),
                MULTIPART_PARALLEL_UPLOAD
              );
              abortSignal?.throwIfAborted();
              const res2 = await (params.fetch ?? fetch)(completionUrl, {
                method: "POST",
                body: JSON.stringify(completeReq),
                headers: {
                  Accept: "application/vnd.git-lfs+json",
                  "Content-Type": "application/vnd.git-lfs+json"
                },
                signal: abortSignal
              });
              if (!res2.ok) {
                throw await createApiError(res2, {
                  requestId: batchRequestId,
                  message: `Error completing multipart upload of ${operations[shas.indexOf(obj.oid)].path} to LFS storage`
                });
              }
              yieldCallback({
                event: "fileProgress",
                path: op.path,
                progress: 1,
                state: "uploading"
              });
            } else {
              const res2 = await (params.fetch ?? fetch)(obj.actions.upload.href, {
                method: "PUT",
                headers: {
                  ...batchRequestId ? { "X-Request-Id": batchRequestId } : void 0
                },
                /** Unfortunately, browsers don't support our inherited version of Blob in fetch calls */
                body: content instanceof WebBlob && isFrontend ? await content.arrayBuffer() : content,
                signal: abortSignal,
                ...{
                  progressHint: {
                    path: op.path,
                    progressCallback: (progress) => yieldCallback({
                      event: "fileProgress",
                      path: op.path,
                      progress,
                      state: "uploading"
                    })
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }
              });
              if (!res2.ok) {
                throw await createApiError(res2, {
                  requestId: batchRequestId,
                  message: `Error while uploading ${operations[shas.indexOf(obj.oid)].path} to LFS storage`
                });
              }
              yieldCallback({
                event: "fileProgress",
                path: op.path,
                progress: 1,
                state: "uploading"
              });
            }
          }),
          CONCURRENT_LFS_UPLOADS
        ).then(returnCallback, rejectCallback);
      });
    }
    abortSignal?.throwIfAborted();
    yield { event: "phase", phase: "committing" };
    return yield* eventToGenerator(
      async (yieldCallback, returnCallback, rejectCallback) => (params.fetch ?? fetch)(
        `${params.hubUrl ?? HUB_URL}/api/${repoId.type}s/${repoId.name}/commit/${encodeURIComponent(
          params.branch ?? "main"
        )}` + (params.isPullRequest ? "?create_pr=1" : ""),
        {
          method: "POST",
          headers: {
            ...accessToken && { Authorization: `Bearer ${accessToken}` },
            "Content-Type": "application/x-ndjson"
          },
          body: [
            {
              key: "header",
              value: {
                summary: params.title,
                description: params.description,
                parentCommit: params.parentCommit
              }
            },
            ...await Promise.all(
              allOperations.map((operation) => {
                if (isFileOperation(operation)) {
                  const sha = lfsShas.get(operation.path);
                  if (sha) {
                    return {
                      key: "lfsFile",
                      value: {
                        path: operation.path,
                        algo: "sha256",
                        size: operation.content.size,
                        oid: sha
                      }
                    };
                  }
                }
                return convertOperationToNdJson(operation);
              })
            )
          ].map((x) => JSON.stringify(x)).join("\n"),
          signal: abortSignal,
          ...{
            progressHint: {
              progressCallback: (progress) => {
                for (const op of allOperations) {
                  if (isFileOperation(op) && !lfsShas.has(op.path)) {
                    yieldCallback({
                      event: "fileProgress",
                      path: op.path,
                      progress,
                      state: "uploading"
                    });
                  }
                }
              }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw await createApiError(res);
        }
        const json = await res.json();
        returnCallback({
          pullRequestUrl: json.pullRequestUrl,
          commit: {
            oid: json.commitOid,
            url: json.commitUrl
          },
          hookOutput: json.hookOutput
        });
      }).catch(rejectCallback)
    );
  } catch (err) {
    abortController.abort();
    throw err;
  }
}
async function convertOperationToNdJson(operation) {
  switch (operation.operation) {
    case "addOrUpdate": {
      return {
        key: "file",
        value: {
          content: base64FromBytes(new Uint8Array(await operation.content.arrayBuffer())),
          path: operation.path,
          encoding: "base64"
        }
      };
    }
    case "delete": {
      return {
        key: "deletedFile",
        value: {
          path: operation.path
        }
      };
    }
    default:
      throw new TypeError("Unknown operation: " + operation.operation);
  }
}

// src/lib/create-repo.ts
async function createRepo(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const [namespace, repoName] = repoId.name.split("/");
  if (!namespace || !repoName) {
    throw new TypeError(
      `"${repoId.name}" is not a fully qualified repo name. It should be of the form "{namespace}/{repoName}".`
    );
  }
  const res = await (params.fetch ?? fetch)(`${params.hubUrl ?? HUB_URL}/api/repos/create`, {
    method: "POST",
    body: JSON.stringify({
      name: repoName,
      private: params.private,
      organization: namespace,
      license: params.license,
      ...repoId.type === "space" ? {
        type: "space",
        sdk: "static"
      } : {
        type: repoId.type
      },
      files: params.files ? await Promise.all(
        params.files.map(async (file) => ({
          encoding: "base64",
          path: file.path,
          content: base64FromBytes(
            new Uint8Array(file.content instanceof Blob ? await file.content.arrayBuffer() : file.content)
          )
        }))
      ) : void 0
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw await createApiError(res);
  }
  const output = await res.json();
  return { repoUrl: output.url };
}

// src/lib/create-branch.ts
async function createBranch(params) {
  const repoId = toRepoId(params.repo);
  const res = await (params.fetch ?? fetch)(
    `${params.hubUrl ?? HUB_URL}/api/${repoId.type}s/${repoId.name}/branch/${encodeURIComponent(params.branch)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...params.accessToken && {
          Authorization: `Bearer ${params.accessToken}`
        }
      },
      body: JSON.stringify({
        startingPoint: params.revision,
        ...params.empty && { emptyBranch: true },
        overwrite: params.overwrite
      })
    }
  );
  if (!res.ok) {
    throw await createApiError(res);
  }
}

// src/lib/delete-branch.ts
async function deleteBranch(params) {
  const repoId = toRepoId(params.repo);
  const res = await (params.fetch ?? fetch)(
    `${params.hubUrl ?? HUB_URL}/api/${repoId.type}s/${repoId.name}/branch/${encodeURIComponent(params.branch)}`,
    {
      method: "DELETE",
      headers: {
        ...params.accessToken && {
          Authorization: `Bearer ${params.accessToken}`
        }
      }
    }
  );
  if (!res.ok) {
    throw await createApiError(res);
  }
}

// src/lib/delete-repo.ts
async function deleteRepo(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const [namespace, repoName] = repoId.name.split("/");
  const res = await (params.fetch ?? fetch)(`${params.hubUrl ?? HUB_URL}/api/repos/delete`, {
    method: "DELETE",
    body: JSON.stringify({
      name: repoName,
      organization: namespace,
      type: repoId.type
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw await createApiError(res);
  }
}

// src/vendor/lz4js/index.ts
var hashSize = 1 << 16;
var mlBits = 4;
var mlMask = (1 << mlBits) - 1;
var runBits = 4;
var runMask = (1 << runBits) - 1;
var blockBuf = makeBuffer(5 << 20);
var hashTable = makeHashTable();
function makeHashTable() {
  try {
    return new Uint32Array(hashSize);
  } catch (error) {
    const hashTable2 = new Array(hashSize);
    for (let i = 0; i < hashSize; i++) {
      hashTable2[i] = 0;
    }
    return hashTable2;
  }
}
function makeBuffer(size) {
  return new Uint8Array(size);
}

// src/lib/download-file-to-cache-dir.ts
var import_node_path2 = require("path");
var import_promises4 = require("fs/promises");

// src/utils/symlink.ts
var fs = __toESM(require("fs/promises"));
var path = __toESM(require("path"));
var os = __toESM(require("os"));

// src/lib/download-file-to-cache-dir.ts
var import_node_stream3 = require("stream");
var import_promises5 = require("stream/promises");
var import_node_fs2 = require("fs");
var REGEX_COMMIT_HASH = new RegExp("^[0-9a-f]{40}$");

// src/utils/typedInclude.ts
function typedInclude(arr, v) {
  return arr.includes(v);
}

// src/lib/repo-exists.ts
async function repoExists(params) {
  const repoId = toRepoId(params.repo);
  const res = await (params.fetch ?? fetch)(
    `${params.hubUrl ?? HUB_URL}/api/${repoId.type}s/${repoId.name}?expand[]=likes`,
    {
      method: "GET",
      headers: {
        ...params.accessToken && {
          Authorization: `Bearer ${params.accessToken}`
        }
      }
    }
  );
  if (res.status === 404 || res.status === 401) {
    return false;
  }
  if (!res.ok) {
    throw await createApiError(res);
  }
  return true;
}

// src/lib/snapshot-download.ts
var import_node_path3 = require("path");
var import_promises6 = require("fs/promises");

// src/lib/upload-files-with-progress.ts
var multipartUploadTracking = /* @__PURE__ */ new WeakMap();
async function* uploadFilesWithProgress(params) {
  return yield* commitIter({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: params.files.map((file) => ({
      operation: "addOrUpdate",
      path: file instanceof URL ? file.pathname.split("/").at(-1) ?? "file" : "path" in file ? file.path : file.name,
      content: "content" in file ? file.content : file
    })),
    title: params.commitTitle ?? `Add ${params.files.length} files`,
    description: params.commitDescription,
    hubUrl: params.hubUrl,
    branch: params.branch,
    isPullRequest: params.isPullRequest,
    parentCommit: params.parentCommit,
    useWebWorkers: params.useWebWorkers,
    abortSignal: params.abortSignal,
    fetch: async (input, init) => {
      if (!init) {
        return fetch(input);
      }
      if (!typedInclude(["PUT", "POST"], init.method) || !("progressHint" in init) || !init.progressHint || typeof XMLHttpRequest === "undefined" || typeof input !== "string" || !(init.body instanceof ArrayBuffer) && !(init.body instanceof Blob) && !(init.body instanceof File) && typeof init.body !== "string") {
        return fetch(input, init);
      }
      const progressHint = init.progressHint;
      const progressCallback = progressHint.progressCallback;
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          if (progressHint.part !== void 0) {
            let tracking = multipartUploadTracking.get(progressCallback);
            if (!tracking) {
              tracking = { numParts: progressHint.numParts, partsProgress: {} };
              multipartUploadTracking.set(progressCallback, tracking);
            }
            tracking.partsProgress[progressHint.part] = event.loaded / event.total;
            let totalProgress = 0;
            for (const partProgress of Object.values(tracking.partsProgress)) {
              totalProgress += partProgress;
            }
            if (totalProgress === tracking.numParts) {
              progressCallback(0.9999999999);
            } else {
              progressCallback(totalProgress / tracking.numParts);
            }
          } else {
            if (event.loaded === event.total) {
              progressCallback(0.9999999999);
            } else {
              progressCallback(event.loaded / event.total);
            }
          }
        }
      });
      xhr.open(init.method, input, true);
      if (init.headers) {
        const headers = new Headers(init.headers);
        headers.forEach((value, key) => {
          xhr.setRequestHeader(key, value);
        });
      }
      init.signal?.throwIfAborted();
      xhr.send(init.body);
      return new Promise((resolve3, reject) => {
        xhr.addEventListener("load", () => {
          resolve3(
            new Response(xhr.responseText, {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: Object.fromEntries(
                xhr.getAllResponseHeaders().trim().split("\n").map((header) => [header.slice(0, header.indexOf(":")), header.slice(header.indexOf(":") + 1).trim()])
              )
            })
          );
        });
        xhr.addEventListener("error", () => {
          reject(new Error(xhr.statusText));
        });
        if (init.signal) {
          init.signal.addEventListener("abort", () => {
            xhr.abort();
            try {
              init.signal?.throwIfAborted();
            } catch (err) {
              reject(err);
            }
          });
        }
      });
    }
  });
}

// cli.ts
var import_node_url3 = require("url");
var import_promises7 = require("fs/promises");
var import_node_path4 = require("path");

// package.json
var version = "2.4.1";

// cli.ts
var commands = {
  upload: {
    description: "Upload a folder to a repo on the Hub",
    args: [
      {
        name: "repo-name",
        description: "The name of the repo to upload to",
        positional: true,
        required: true
      },
      {
        name: "local-folder",
        description: "The local folder to upload. Defaults to the current working directory",
        positional: true,
        default: () => process.cwd()
      },
      {
        name: "path-in-repo",
        description: "The path in the repo to upload the folder to. Defaults to the root of the repo",
        positional: true,
        default: "."
      },
      {
        name: "quiet",
        short: "q",
        description: "Suppress all output",
        boolean: true
      },
      {
        name: "repo-type",
        enum: ["dataset", "model", "space"],
        description: "The type of repo to upload to. Defaults to model. You can also prefix the repo name with the type, e.g. datasets/username/repo-name"
      },
      {
        name: "revision",
        description: "The revision to upload to. Defaults to the main branch",
        default: "main"
      },
      {
        name: "commit-message",
        description: "The commit message to use. Defaults to 'Upload files using @huggingface/hub'",
        default: "Upload files using @huggingface/hub"
      },
      {
        name: "private",
        description: "If creating a new repo, make it private",
        boolean: true
      },
      {
        name: "token",
        description: "The access token to use for authentication. If not provided, the HF_TOKEN environment variable will be used.",
        default: process.env.HF_TOKEN
      }
    ]
  },
  branch: {
    description: "Manage repository branches",
    subcommands: {
      create: {
        description: "Create a new branch in a repo, or update an existing one",
        args: [
          {
            name: "repo-name",
            description: "The name of the repo to create the branch in",
            positional: true,
            required: true
          },
          {
            name: "branch",
            description: "The name of the branch to create",
            positional: true,
            required: true
          },
          {
            name: "repo-type",
            enum: ["dataset", "model", "space"],
            description: "The type of the repo to create the branch into. Defaults to model. You can also prefix the repo name with the type, e.g. datasets/username/repo-name"
          },
          {
            name: "revision",
            description: "The revision to create the branch from. Defaults to the main branch, or existing branch if it exists."
          },
          {
            name: "empty",
            boolean: true,
            description: "Create an empty branch. This will erase all previous commits on the branch if it exists."
          },
          {
            name: "force",
            short: "f",
            boolean: true,
            description: "Overwrite the branch if it already exists. Otherwise, throws an error if the branch already exists. No-ops if no revision is provided and the branch exists."
          },
          {
            name: "token",
            description: "The access token to use for authentication. If not provided, the HF_TOKEN environment variable will be used.",
            default: process.env.HF_TOKEN
          }
        ]
      },
      delete: {
        description: "Delete a branch in a repo",
        args: [
          {
            name: "repo-name",
            description: "The name of the repo to delete the branch from",
            positional: true,
            required: true
          },
          {
            name: "branch",
            description: "The name of the branch to delete",
            positional: true,
            required: true
          },
          {
            name: "repo-type",
            enum: ["dataset", "model", "space"],
            description: "The type of repo to delete the branch from. Defaults to model. You can also prefix the repo name with the type, e.g. datasets/username/repo-name"
          },
          {
            name: "token",
            description: "The access token to use for authentication. If not provided, the HF_TOKEN environment variable will be used.",
            default: process.env.HF_TOKEN
          }
        ]
      }
    }
  },
  repo: {
    description: "Manage repositories on the Hub",
    subcommands: {
      delete: {
        description: "Delete a repository from the Hub",
        args: [
          {
            name: "repo-name",
            description: "The name of the repo to delete. You can also prefix the repo name with the type, e.g. datasets/username/repo-name",
            positional: true,
            required: true
          },
          {
            name: "repo-type",
            enum: ["dataset", "model", "space"],
            description: "The type of the repo to delete. Defaults to model. You can also prefix the repo name with the type, e.g. datasets/username/repo-name"
          },
          {
            name: "token",
            description: "The access token to use for authentication. If not provided, the HF_TOKEN environment variable will be used.",
            default: process.env.HF_TOKEN
          }
        ]
      }
    }
  },
  version: {
    description: "Print the version of the CLI",
    args: []
  }
};
var mainCommandName = process.argv[2];
var subCommandName;
var cliArgs;
if (mainCommandName && mainCommandName in commands && commands[mainCommandName] && "subcommands" in commands[mainCommandName]) {
  subCommandName = process.argv[3];
  cliArgs = process.argv.slice(4);
} else {
  cliArgs = process.argv.slice(3);
}
async function run() {
  switch (mainCommandName) {
    case void 0:
    case "--help":
    case "help": {
      const helpArgs = mainCommandName === "help" ? process.argv.slice(3) : [];
      if (helpArgs.length > 0) {
        const cmdName = helpArgs[0];
        if (cmdName && commands[cmdName]) {
          const cmdDef = commands[cmdName];
          if ("subcommands" in cmdDef) {
            if (helpArgs.length > 1) {
              const subCmdName = helpArgs[1];
              if (subCmdName in cmdDef.subcommands && cmdDef.subcommands[subCmdName]) {
                console.log(detailedUsageForSubcommand(cmdName, subCmdName));
                break;
              } else {
                console.error(`Error: Unknown subcommand '${subCmdName}' for command '${cmdName}'.`);
                console.log(listSubcommands(cmdName, cmdDef));
                process.exitCode = 1;
                break;
              }
            } else {
              console.log(listSubcommands(cmdName, cmdDef));
              break;
            }
          } else {
            console.log(detailedUsageForCommand(cmdName));
            break;
          }
        } else {
          console.error(`Error: Unknown command '${cmdName}' for help.`);
          process.exitCode = 1;
        }
      } else {
        console.log(
          `Hugging Face CLI Tools (hfjs)

Available commands:

` + typedEntries(commands).map(([name, def]) => `  ${usage(name)}: ${def.description}`).join("\n")
        );
        console.log("\nTo get help on a specific command, run `hfjs help <command>` or `hfjs <command> --help`");
        console.log(
          "For commands with subcommands (like 'branch'), run `hfjs help <command> <subcommand>` or `hfjs <command> <subcommand> --help`"
        );
        if (mainCommandName === void 0) {
          process.exitCode = 1;
        }
      }
      break;
    }
    case "upload": {
      const cmdDef = commands.upload;
      if (cliArgs[0] === "--help" || cliArgs[0] === "-h") {
        console.log(detailedUsageForCommand("upload"));
        break;
      }
      const parsedArgs = advParseArgs(cliArgs, cmdDef.args, "upload");
      const {
        repoName,
        localFolder,
        repoType,
        revision,
        token,
        quiet,
        commitMessage,
        pathInRepo,
        private: isPrivate
      } = parsedArgs;
      const repoId = repoType ? { type: repoType, name: repoName } : repoName;
      if (!await repoExists({ repo: repoId, revision, accessToken: token, hubUrl: process.env.HF_ENDPOINT ?? HUB_URL })) {
        if (!quiet) {
          console.log(`Repo ${repoName} does not exist. Creating it...`);
        }
        await createRepo({
          repo: repoId,
          accessToken: token,
          private: !!isPrivate,
          hubUrl: process.env.HF_ENDPOINT ?? HUB_URL
        });
      }
      const isFile = (await (0, import_promises7.stat)(localFolder)).isFile();
      const files = isFile ? [
        {
          content: (0, import_node_url3.pathToFileURL)(localFolder),
          path: (0, import_node_path4.join)(pathInRepo, `${(0, import_node_path4.basename)(localFolder)}`).replace(/^[.]?\//, "")
        }
      ] : [{ content: (0, import_node_url3.pathToFileURL)(localFolder), path: pathInRepo.replace(/^[.]?\//, "") }];
      for await (const event of uploadFilesWithProgress({
        repo: repoId,
        files,
        branch: revision,
        accessToken: token,
        commitTitle: commitMessage?.trim().split("\n")[0],
        commitDescription: commitMessage?.trim().split("\n").slice(1).join("\n").trim(),
        hubUrl: process.env.HF_ENDPOINT ?? HUB_URL
      })) {
        if (!quiet) {
          console.log(event);
        }
      }
      break;
    }
    case "branch": {
      const branchCommandGroup = commands.branch;
      const currentSubCommandName = subCommandName;
      if (cliArgs[0] === "--help" || cliArgs[0] === "-h") {
        if (currentSubCommandName && branchCommandGroup.subcommands[currentSubCommandName]) {
          console.log(detailedUsageForSubcommand("branch", currentSubCommandName));
        } else {
          console.log(listSubcommands("branch", branchCommandGroup));
        }
        break;
      }
      if (!currentSubCommandName || !branchCommandGroup.subcommands[currentSubCommandName]) {
        console.error(`Error: Missing or invalid subcommand for 'branch'.`);
        console.log(listSubcommands("branch", branchCommandGroup));
        process.exitCode = 1;
        break;
      }
      const subCmdDef = branchCommandGroup.subcommands[currentSubCommandName];
      switch (currentSubCommandName) {
        case "create": {
          const parsedArgs = advParseArgs(cliArgs, subCmdDef.args, "branch create");
          const { repoName, branch, revision, empty, repoType, token, force } = parsedArgs;
          await createBranch({
            repo: repoType ? { type: repoType, name: repoName } : repoName,
            branch,
            accessToken: token,
            revision,
            empty: empty ?? void 0,
            overwrite: force ?? void 0,
            hubUrl: process.env.HF_ENDPOINT ?? HUB_URL
          });
          console.log(`Branch '${branch}' created successfully in repo '${repoName}'.`);
          break;
        }
        case "delete": {
          const parsedArgs = advParseArgs(cliArgs, subCmdDef.args, "branch delete");
          const { repoName, branch, repoType, token } = parsedArgs;
          await deleteBranch({
            repo: repoType ? { type: repoType, name: repoName } : repoName,
            branch,
            accessToken: token,
            hubUrl: process.env.HF_ENDPOINT ?? HUB_URL
          });
          console.log(`Branch '${branch}' deleted successfully from repo '${repoName}'.`);
          break;
        }
        default:
          console.error(`Error: Unknown subcommand '${currentSubCommandName}' for 'branch'.`);
          console.log(listSubcommands("branch", branchCommandGroup));
          process.exitCode = 1;
          break;
      }
      break;
    }
    case "repo": {
      const repoCommandGroup = commands.repo;
      const currentSubCommandName = subCommandName;
      if (cliArgs[0] === "--help" || cliArgs[0] === "-h") {
        if (currentSubCommandName && repoCommandGroup.subcommands[currentSubCommandName]) {
          console.log(detailedUsageForSubcommand("repo", currentSubCommandName));
        } else {
          console.log(listSubcommands("repo", repoCommandGroup));
        }
        break;
      }
      if (!currentSubCommandName || !repoCommandGroup.subcommands[currentSubCommandName]) {
        console.error(`Error: Missing or invalid subcommand for 'repo'.`);
        console.log(listSubcommands("repo", repoCommandGroup));
        process.exitCode = 1;
        break;
      }
      const subCmdDef = repoCommandGroup.subcommands[currentSubCommandName];
      switch (currentSubCommandName) {
        case "delete": {
          const parsedArgs = advParseArgs(cliArgs, subCmdDef.args, `repo ${currentSubCommandName}`);
          const { repoName, repoType, token } = parsedArgs;
          const repoDesignation = repoType ? { type: repoType, name: repoName } : repoName;
          await deleteRepo({
            repo: repoDesignation,
            accessToken: token,
            hubUrl: process.env.HF_ENDPOINT ?? HUB_URL
          });
          console.log(`Repository '${repoName}' deleted successfully.`);
          break;
        }
        default:
          console.error(`Error: Unknown subcommand '${currentSubCommandName}' for 'repo'.`);
          console.log(listSubcommands("repo", repoCommandGroup));
          process.exitCode = 1;
          break;
      }
      break;
    }
    case "version": {
      if (cliArgs[0] === "--help" || cliArgs[0] === "-h") {
        console.log(detailedUsageForCommand("version"));
        break;
      }
      console.log(`hfjs version: ${version}`);
      break;
    }
    default:
      console.error("Command not found: " + mainCommandName);
      console.log(
        `
Available commands:

` + typedEntries(commands).map(([name, def]) => `  ${usage(name)}: ${def.description}`).join("\n")
      );
      console.log("\nTo get help on a specific command, run `hfjs help <command>` or `hfjs <command> --help`");
      process.exitCode = 1;
      break;
  }
}
run().catch((err) => {
  console.error("\x1B[31mError:\x1B[0m", err.message);
  console.error(err);
  process.exitCode = 1;
});
function usage(commandName, subCommandName2) {
  const commandEntry = commands[commandName];
  let cmdArgs;
  let fullCommandName = commandName;
  if ("subcommands" in commandEntry) {
    if (subCommandName2 && subCommandName2 in commandEntry.subcommands) {
      cmdArgs = commandEntry.subcommands[subCommandName2].args;
      fullCommandName = `${commandName} ${subCommandName2}`;
    } else {
      return `${commandName} <subcommand>`;
    }
  } else {
    cmdArgs = commandEntry.args;
  }
  return `${fullCommandName} ${(cmdArgs || []).map((arg) => {
    if (arg.positional) {
      return arg.required ? `<${arg.name}>` : `[${arg.name}]`;
    }
    return `[--${arg.name}${arg.short ? `|-${arg.short}` : ""}${arg.enum ? ` {${arg.enum.join("|")}}` : arg.boolean ? "" : ` <${arg.name.toUpperCase().replace(/-/g, "_")}>`}]`;
  }).join(" ")}`.trim();
}
function _detailedUsage(args, usageLine, commandDescription) {
  let ret = `usage: hfjs ${usageLine}
`;
  if (commandDescription) {
    ret += `
${commandDescription}
`;
  }
  const positionals = args.filter((p) => p.positional);
  const options = args.filter((p) => !p.positional);
  if (positionals.length > 0) {
    ret += `
Positional arguments:
`;
    for (const arg of positionals) {
      ret += `  ${arg.name}	${arg.description}${arg.default ? ` (default: ${typeof arg.default === "function" ? arg.default() : arg.default})` : ""}
`;
    }
  }
  if (options.length > 0) {
    ret += `
Options:
`;
    for (const arg of options) {
      const nameAndAlias = `--${arg.name}${arg.short ? `, -${arg.short}` : ""}`;
      const valueHint = arg.enum ? `{${arg.enum.join("|")}}` : arg.boolean ? "" : `<${arg.name.toUpperCase().replace(/-/g, "_")}>`;
      ret += `  ${nameAndAlias}${valueHint ? " " + valueHint : ""}	${arg.description}${arg.default !== void 0 ? ` (default: ${typeof arg.default === "function" ? arg.default() : arg.default})` : ""}
`;
    }
  }
  ret += `
`;
  return ret;
}
function detailedUsageForCommand(commandName) {
  const commandDef = commands[commandName];
  if ("subcommands" in commandDef) {
    return listSubcommands(commandName, commandDef);
  }
  return _detailedUsage(commandDef.args, usage(commandName), commandDef.description);
}
function detailedUsageForSubcommand(commandName, subCommandName2) {
  const commandGroup = commands[commandName];
  if (!("subcommands" in commandGroup) || !(subCommandName2 in commandGroup.subcommands)) {
    throw new Error(`Subcommand ${subCommandName2} not found for ${commandName}`);
  }
  const subCommandDef = commandGroup.subcommands[subCommandName2];
  return _detailedUsage(subCommandDef.args, usage(commandName, subCommandName2), subCommandDef.description);
}
function listSubcommands(commandName, commandGroup) {
  let ret = `usage: hfjs ${commandName} <subcommand> [options]

`;
  ret += `${commandGroup.description}

`;
  ret += `Available subcommands for '${commandName}':
`;
  ret += typedEntries(commandGroup.subcommands).map(([subName, subDef]) => `  ${subName}	${subDef.description}`).join("\n");
  ret += `

Run \`hfjs help ${commandName} <subcommand>\` for more information on a specific subcommand.`;
  return ret;
}
function advParseArgs(args, argDefs, commandNameForError) {
  const { tokens } = (0, import_node_util.parseArgs)({
    options: Object.fromEntries(
      argDefs.filter((arg) => !arg.positional).map((arg) => {
        const optionConfig = {
          type: arg.boolean ? "boolean" : "string",
          ...arg.short && { short: arg.short },
          ...arg.default !== void 0 && {
            default: typeof arg.default === "function" ? arg.default() : arg.default
          }
        };
        return [arg.name, optionConfig];
      })
    ),
    args,
    allowPositionals: true,
    strict: false,
    // We do custom validation based on tokens and argDefs
    tokens: true
  });
  const expectedPositionals = argDefs.filter((arg) => arg.positional);
  const providedPositionalTokens = tokens.filter((token) => token.kind === "positional");
  if (providedPositionalTokens.length < expectedPositionals.filter((arg) => arg.required).length) {
    throw new Error(
      `Command '${commandNameForError}': Missing required positional arguments. Usage: hfjs ${usage(
        commandNameForError.split(" ")[0],
        commandNameForError.split(" ")[1]
      )}`
    );
  }
  if (providedPositionalTokens.length > expectedPositionals.length) {
    throw new Error(
      `Command '${commandNameForError}': Too many positional arguments. Usage: hfjs ${usage(
        commandNameForError.split(" ")[0],
        commandNameForError.split(" ")[1]
      )}`
    );
  }
  const result = {};
  for (const argDef of argDefs) {
    if (argDef.default !== void 0) {
      result[argDef.name] = typeof argDef.default === "function" ? argDef.default() : argDef.default;
    } else if (argDef.boolean) {
      result[argDef.name] = false;
    }
  }
  providedPositionalTokens.forEach((token, i) => {
    if (expectedPositionals[i]) {
      result[expectedPositionals[i].name] = token.value;
    }
  });
  tokens.filter((token) => token.kind === "option").forEach((token) => {
    const argDef = argDefs.find((def) => def.name === token.name || def.short === token.name);
    if (!argDef) {
      throw new Error(`Command '${commandNameForError}': Unknown option: ${token.rawName}`);
    }
    if (argDef.boolean) {
      result[argDef.name] = true;
    } else {
      if (token.value === void 0) {
        throw new Error(`Command '${commandNameForError}': Missing value for option: ${token.rawName}`);
      }
      if (argDef.enum && !argDef.enum.includes(token.value)) {
        throw new Error(
          `Command '${commandNameForError}': Invalid value '${token.value}' for option ${token.rawName}. Expected one of: ${argDef.enum.join(", ")}`
        );
      }
      result[argDef.name] = token.value;
    }
  });
  for (const argDef of argDefs) {
    if (argDef.required && result[argDef.name] === void 0) {
      throw new Error(`Command '${commandNameForError}': Missing required argument: ${argDef.name}`);
    }
  }
  return Object.fromEntries(
    Object.entries(result).map(([name, val]) => [kebabToCamelCase(name), val])
  );
}
function kebabToCamelCase(str) {
  return str.replace(/-./g, (match) => match[1].toUpperCase());
}
