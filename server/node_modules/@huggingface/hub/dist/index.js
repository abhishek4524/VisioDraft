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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

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
            run();
          if (!calledRun)
            dependenciesFulfilled = runCaller;
        };
        function run() {
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
        run();
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

// index.ts
var hub_exports = {};
__export(hub_exports, {
  DATASET_EXPANDABLE_KEYS: () => DATASET_EXPANDABLE_KEYS,
  DATASET_EXPAND_KEYS: () => DATASET_EXPAND_KEYS,
  DEFAULT_REVISION: () => DEFAULT_REVISION,
  HUB_URL: () => HUB_URL,
  HubApiError: () => HubApiError,
  InvalidApiResponseFormatError: () => InvalidApiResponseFormatError,
  MODEL_EXPANDABLE_KEYS: () => MODEL_EXPANDABLE_KEYS,
  MODEL_EXPAND_KEYS: () => MODEL_EXPAND_KEYS,
  REGEX_COMMIT_HASH: () => REGEX_COMMIT_HASH,
  REPO_ID_SEPARATOR: () => REPO_ID_SEPARATOR,
  RE_SAFETENSORS_FILE: () => RE_SAFETENSORS_FILE,
  RE_SAFETENSORS_INDEX_FILE: () => RE_SAFETENSORS_INDEX_FILE,
  RE_SAFETENSORS_SHARD_FILE: () => RE_SAFETENSORS_SHARD_FILE,
  SAFETENSORS_FILE: () => SAFETENSORS_FILE,
  SAFETENSORS_INDEX_FILE: () => SAFETENSORS_INDEX_FILE,
  SPACE_EXPANDABLE_KEYS: () => SPACE_EXPANDABLE_KEYS,
  SPACE_EXPAND_KEYS: () => SPACE_EXPAND_KEYS,
  __internal_XetBlob: () => XetBlob,
  __internal_sha256: () => sha256,
  checkRepoAccess: () => checkRepoAccess,
  commit: () => commit,
  commitIter: () => commitIter,
  countCommits: () => countCommits,
  createBranch: () => createBranch,
  createCollection: () => createCollection,
  createRepo: () => createRepo,
  datasetInfo: () => datasetInfo,
  deleteBranch: () => deleteBranch,
  deleteCollection: () => deleteCollection,
  deleteFile: () => deleteFile,
  deleteFiles: () => deleteFiles,
  deleteRepo: () => deleteRepo,
  downloadFile: () => downloadFile,
  downloadFileToCacheDir: () => downloadFileToCacheDir,
  fileDownloadInfo: () => fileDownloadInfo,
  fileExists: () => fileExists,
  getBlobStat: () => getBlobStat,
  getHFHubCachePath: () => getHFHubCachePath,
  getRepoFolderName: () => getRepoFolderName,
  listCollections: () => listCollections,
  listCommits: () => listCommits,
  listDatasets: () => listDatasets,
  listFiles: () => listFiles,
  listModels: () => listModels,
  listSpaces: () => listSpaces,
  modelInfo: () => modelInfo,
  oauthHandleRedirect: () => oauthHandleRedirect,
  oauthHandleRedirectIfPresent: () => oauthHandleRedirectIfPresent,
  oauthLoginUrl: () => oauthLoginUrl,
  parseRepoType: () => parseRepoType,
  parseSafetensorsMetadata: () => parseSafetensorsMetadata,
  parseSafetensorsShardFilename: () => parseSafetensorsShardFilename,
  pathsInfo: () => pathsInfo,
  repoExists: () => repoExists,
  scanCacheDir: () => scanCacheDir,
  scanCachedRepo: () => scanCachedRepo,
  scanRefsDir: () => scanRefsDir,
  scanSnapshotDir: () => scanSnapshotDir,
  snapshotDownload: () => snapshotDownload,
  spaceInfo: () => spaceInfo,
  uploadFile: () => uploadFile,
  uploadFiles: () => uploadFiles,
  uploadFilesWithProgress: () => uploadFilesWithProgress,
  whoAmI: () => whoAmI
});
module.exports = __toCommonJS(hub_exports);

// src/lib/cache-management.ts
var import_node_os = require("os");
var import_node_path = require("path");
var import_promises = require("fs/promises");
function getDefaultHome() {
  return (0, import_node_path.join)((0, import_node_os.homedir)(), ".cache");
}
function getDefaultCachePath() {
  return (0, import_node_path.join)(process.env["HF_HOME"] ?? (0, import_node_path.join)(process.env["XDG_CACHE_HOME"] ?? getDefaultHome(), "huggingface"), "hub");
}
function getHuggingFaceHubCache() {
  return process.env["HUGGINGFACE_HUB_CACHE"] ?? getDefaultCachePath();
}
function getHFHubCachePath() {
  return process.env["HF_HUB_CACHE"] ?? getHuggingFaceHubCache();
}
var FILES_TO_IGNORE = [".DS_Store"];
var REPO_ID_SEPARATOR = "--";
function getRepoFolderName({ name, type }) {
  const parts = [`${type}s`, ...name.split("/")];
  return parts.join(REPO_ID_SEPARATOR);
}
async function scanCacheDir(cacheDir = void 0) {
  if (!cacheDir)
    cacheDir = getHFHubCachePath();
  const s = await (0, import_promises.stat)(cacheDir);
  if (!s.isDirectory()) {
    throw new Error(
      `Scan cache expects a directory but found a file: ${cacheDir}. Please use \`cacheDir\` argument or set \`HF_HUB_CACHE\` environment variable.`
    );
  }
  const repos = [];
  const warnings = [];
  const directories = await (0, import_promises.readdir)(cacheDir);
  for (const repo of directories) {
    if (repo === ".locks")
      continue;
    const absolute = (0, import_node_path.join)(cacheDir, repo);
    const s2 = await (0, import_promises.stat)(absolute);
    if (!s2.isDirectory()) {
      continue;
    }
    try {
      const cached = await scanCachedRepo(absolute);
      repos.push(cached);
    } catch (err) {
      warnings.push(err);
    }
  }
  return {
    repos,
    size: [...repos.values()].reduce((sum, repo) => sum + repo.size, 0),
    warnings
  };
}
async function scanCachedRepo(repoPath) {
  const name = (0, import_node_path.basename)(repoPath);
  if (!name.includes(REPO_ID_SEPARATOR)) {
    throw new Error(`Repo path is not a valid HuggingFace cache directory: ${name}`);
  }
  const [type, ...remaining] = name.split(REPO_ID_SEPARATOR);
  const repoType = parseRepoType(type);
  const repoId = remaining.join("/");
  const snapshotsPath = (0, import_node_path.join)(repoPath, "snapshots");
  const refsPath = (0, import_node_path.join)(repoPath, "refs");
  const snapshotStat = await (0, import_promises.stat)(snapshotsPath);
  if (!snapshotStat.isDirectory()) {
    throw new Error(`Snapshots dir doesn't exist in cached repo ${snapshotsPath}`);
  }
  const refsByHash = /* @__PURE__ */ new Map();
  const refsStat = await (0, import_promises.stat)(refsPath);
  if (refsStat.isDirectory()) {
    await scanRefsDir(refsPath, refsByHash);
  }
  const cachedRevisions = [];
  const blobStats = /* @__PURE__ */ new Map();
  const snapshotDirs = await (0, import_promises.readdir)(snapshotsPath);
  for (const dir of snapshotDirs) {
    if (FILES_TO_IGNORE.includes(dir))
      continue;
    const revisionPath = (0, import_node_path.join)(snapshotsPath, dir);
    const revisionStat = await (0, import_promises.stat)(revisionPath);
    if (!revisionStat.isDirectory()) {
      throw new Error(`Snapshots folder corrupted. Found a file: ${revisionPath}`);
    }
    const cachedFiles = [];
    await scanSnapshotDir(revisionPath, cachedFiles, blobStats);
    const revisionLastModified = cachedFiles.length > 0 ? Math.max(...[...cachedFiles].map((file) => file.blob.lastModifiedAt.getTime())) : revisionStat.mtimeMs;
    cachedRevisions.push({
      commitOid: dir,
      files: cachedFiles,
      refs: refsByHash.get(dir) || [],
      size: [...cachedFiles].reduce((sum, file) => sum + file.blob.size, 0),
      path: revisionPath,
      lastModifiedAt: new Date(revisionLastModified)
    });
    refsByHash.delete(dir);
  }
  if (refsByHash.size > 0) {
    throw new Error(
      `Reference(s) refer to missing commit hashes: ${JSON.stringify(Object.fromEntries(refsByHash))} (${repoPath})`
    );
  }
  const repoStats = await (0, import_promises.stat)(repoPath);
  const repoLastAccessed = blobStats.size > 0 ? Math.max(...[...blobStats.values()].map((stat5) => stat5.atimeMs)) : repoStats.atimeMs;
  const repoLastModified = blobStats.size > 0 ? Math.max(...[...blobStats.values()].map((stat5) => stat5.mtimeMs)) : repoStats.mtimeMs;
  return {
    id: {
      name: repoId,
      type: repoType
    },
    path: repoPath,
    filesCount: blobStats.size,
    revisions: cachedRevisions,
    size: [...blobStats.values()].reduce((sum, stat5) => sum + stat5.size, 0),
    lastAccessedAt: new Date(repoLastAccessed),
    lastModifiedAt: new Date(repoLastModified)
  };
}
async function scanRefsDir(refsPath, refsByHash) {
  const refFiles = await (0, import_promises.readdir)(refsPath, { withFileTypes: true });
  for (const refFile of refFiles) {
    const refFilePath = (0, import_node_path.join)(refsPath, refFile.name);
    if (refFile.isDirectory())
      continue;
    const commitHash = await (0, import_promises.readFile)(refFilePath, "utf-8");
    const refName = refFile.name;
    if (!refsByHash.has(commitHash)) {
      refsByHash.set(commitHash, []);
    }
    refsByHash.get(commitHash)?.push(refName);
  }
}
async function scanSnapshotDir(revisionPath, cachedFiles, blobStats) {
  const files = await (0, import_promises.readdir)(revisionPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory())
      continue;
    const filePath = (0, import_node_path.join)(revisionPath, file.name);
    const blobPath = await (0, import_promises.realpath)(filePath);
    const blobStat = await getBlobStat(blobPath, blobStats);
    cachedFiles.push({
      path: filePath,
      blob: {
        path: blobPath,
        size: blobStat.size,
        lastAccessedAt: new Date(blobStat.atimeMs),
        lastModifiedAt: new Date(blobStat.mtimeMs)
      }
    });
  }
}
async function getBlobStat(blobPath, blobStats) {
  const blob = blobStats.get(blobPath);
  if (!blob) {
    const statResult = await (0, import_promises.lstat)(blobPath);
    blobStats.set(blobPath, statResult);
    return statResult;
  }
  return blob;
}
function parseRepoType(type) {
  switch (type) {
    case "models":
      return "model";
    case "datasets":
      return "dataset";
    case "spaces":
      return "space";
    default:
      throw new TypeError(`Invalid repo type: ${type}`);
  }
}

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

// src/lib/check-repo-access.ts
async function checkRepoAccess(params) {
  const accessToken = params && checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const response = await (params.fetch || fetch)(`${params?.hubUrl || HUB_URL}/api/${repoId.type}s/${repoId.name}`, {
    headers: {
      ...accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
    }
  });
  if (!response.ok) {
    throw await createApiError(response);
  }
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
async function commit(params) {
  const iterator = commitIter(params);
  let res = await iterator.next();
  while (!res.done) {
    res = await iterator.next();
  }
  return res.value;
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

// src/lib/count-commits.ts
async function countCommits(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const url = `${params.hubUrl ?? HUB_URL}/api/${repoId.type}s/${repoId.name}/commits/${params.revision ?? "main"}?limit=1`;
  const res = await (params.fetch ?? fetch)(url, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  });
  if (!res.ok) {
    throw await createApiError(res);
  }
  return parseInt(res.headers.get("x-total-count") ?? "0", 10);
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

// src/lib/create-collection.ts
async function createCollection(params) {
  const accessToken = checkCredentials(params);
  const res = await (params.fetch ?? fetch)(`${params.hubUrl ?? HUB_URL}/api/collections`, {
    method: "POST",
    body: JSON.stringify(params.collection),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw await createApiError(res);
  }
  const output = await res.json();
  return { slug: output.slug };
}

// src/utils/pick.ts
function pick(o, props) {
  return Object.assign(
    {},
    ...props.map((prop) => {
      if (o[prop] !== void 0) {
        return { [prop]: o[prop] };
      }
    })
  );
}

// src/utils/parseLinkHeader.ts
function parseLinkHeader(header) {
  const regex = /<(https?:[/][/][^>]+)>;\s+rel="([^"]+)"/g;
  return Object.fromEntries([...header.matchAll(regex)].map(([, url, rel]) => [rel, url]));
}

// src/lib/list-datasets.ts
var DATASET_EXPAND_KEYS = [
  "private",
  "downloads",
  "gated",
  "likes",
  "lastModified"
];
var DATASET_EXPANDABLE_KEYS = [
  "author",
  "cardData",
  "citation",
  "createdAt",
  "disabled",
  "description",
  "downloads",
  "downloadsAllTime",
  "gated",
  "gitalyUid",
  "lastModified",
  "likes",
  "paperswithcode_id",
  "private",
  // "siblings",
  "sha",
  "tags"
];
async function* listDatasets(params) {
  const accessToken = params && checkCredentials(params);
  let totalToFetch = params?.limit ?? Infinity;
  const search = new URLSearchParams([
    ...Object.entries({
      limit: String(Math.min(totalToFetch, 500)),
      ...params?.search?.owner ? { author: params.search.owner } : void 0,
      ...params?.search?.query ? { search: params.search.query } : void 0
    }),
    ...params?.search?.tags?.map((tag) => ["filter", tag]) ?? [],
    ...DATASET_EXPAND_KEYS.map((val) => ["expand", val]),
    ...params?.additionalFields?.map((val) => ["expand", val]) ?? []
  ]).toString();
  let url = `${params?.hubUrl || HUB_URL}/api/datasets` + (search ? "?" + search : "");
  while (url) {
    const res = await (params?.fetch ?? fetch)(url, {
      headers: {
        accept: "application/json",
        ...accessToken ? { Authorization: `Bearer ${accessToken}` } : void 0
      }
    });
    if (!res.ok) {
      throw await createApiError(res);
    }
    const items = await res.json();
    for (const item of items) {
      yield {
        ...params?.additionalFields && pick(item, params.additionalFields),
        id: item._id,
        name: item.id,
        private: item.private,
        downloads: item.downloads,
        likes: item.likes,
        gated: item.gated,
        updatedAt: new Date(item.lastModified)
      };
      totalToFetch--;
      if (totalToFetch <= 0) {
        return;
      }
    }
    const linkHeader = res.headers.get("Link");
    url = linkHeader ? parseLinkHeader(linkHeader).next : void 0;
  }
}

// src/lib/dataset-info.ts
async function datasetInfo(params) {
  const accessToken = params && checkCredentials(params);
  const search = new URLSearchParams([
    ...DATASET_EXPAND_KEYS.map((val) => ["expand", val]),
    ...params?.additionalFields?.map((val) => ["expand", val]) ?? []
  ]).toString();
  const response = await (params.fetch || fetch)(
    `${params?.hubUrl || HUB_URL}/api/datasets/${params.name}/revision/${encodeURIComponent(
      params.revision ?? "HEAD"
    )}?${search.toString()}`,
    {
      headers: {
        ...accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        Accepts: "application/json"
      }
    }
  );
  if (!response.ok) {
    throw await createApiError(response);
  }
  const data = await response.json();
  return {
    ...params?.additionalFields && pick(data, params.additionalFields),
    id: data._id,
    name: data.id,
    private: data.private,
    downloads: data.downloads,
    likes: data.likes,
    gated: data.gated,
    updatedAt: new Date(data.lastModified)
  };
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

// src/lib/delete-file.ts
function deleteFile(params) {
  return commit({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: [
      {
        operation: "delete",
        path: params.path
      }
    ],
    title: params.commitTitle ?? `Delete ${params.path}`,
    description: params.commitDescription,
    hubUrl: params.hubUrl,
    branch: params.branch,
    isPullRequest: params.isPullRequest,
    parentCommit: params.parentCommit,
    fetch: params.fetch
  });
}

// src/lib/delete-files.ts
function deleteFiles(params) {
  return commit({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: params.paths.map((path2) => ({
      operation: "delete",
      path: path2
    })),
    title: params.commitTitle ?? `Deletes ${params.paths.length} files`,
    description: params.commitDescription,
    hubUrl: params.hubUrl,
    branch: params.branch,
    isPullRequest: params.isPullRequest,
    parentCommit: params.parentCommit,
    fetch: params.fetch
  });
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

// src/lib/delete-collection.ts
async function deleteCollection(params) {
  const accessToken = checkCredentials(params);
  const res = await (params.fetch ?? fetch)(`${params.hubUrl ?? HUB_URL}/api/collections/${params.slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw await createApiError(res);
  }
}

// src/vendor/lz4js/util.ts
function readU64(b, n) {
  let x = 0;
  x |= b[n++] << 0;
  x |= b[n++] << 8;
  x |= b[n++] << 16;
  x |= b[n++] << 24;
  x |= b[n++] << 32;
  x |= b[n++] << 40;
  x |= b[n++] << 48;
  x |= b[n++] << 56;
  return x;
}
function readU32(b, n) {
  let x = 0;
  x |= b[n++] << 0;
  x |= b[n++] << 8;
  x |= b[n++] << 16;
  x |= b[n++] << 24;
  return x;
}

// src/vendor/lz4js/index.ts
var minMatch = 4;
var hashSize = 1 << 16;
var mlBits = 4;
var mlMask = (1 << mlBits) - 1;
var runBits = 4;
var runMask = (1 << runBits) - 1;
var blockBuf = makeBuffer(5 << 20);
var hashTable = makeHashTable();
var magicNum = 407708164;
var fdContentChksum = 4;
var fdContentSize = 8;
var fdBlockChksum = 16;
var fdVersion = 64;
var fdVersionMask = 192;
var bsUncompressed = 2147483648;
var bsShift = 4;
var bsMask = 7;
var bsMap = {
  4: 65536,
  5: 262144,
  6: 1048576,
  7: 4194304
};
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
function sliceArray(array, start, end) {
  return array.slice(start, end);
}
function decompressBound(src) {
  let sIndex = 0;
  if (readU32(src, sIndex) !== magicNum) {
    throw new Error("invalid magic number");
  }
  sIndex += 4;
  const descriptor = src[sIndex++];
  if ((descriptor & fdVersionMask) !== fdVersion) {
    throw new Error("incompatible descriptor version " + (descriptor & fdVersionMask));
  }
  const useBlockSum = (descriptor & fdBlockChksum) !== 0;
  const useContentSize = (descriptor & fdContentSize) !== 0;
  const bsIdx = src[sIndex++] >> bsShift & bsMask;
  if (bsMap[bsIdx] === void 0) {
    throw new Error("invalid block size " + bsIdx);
  }
  const maxBlockSize = bsMap[bsIdx];
  if (useContentSize) {
    return readU64(src, sIndex);
  }
  sIndex++;
  let maxSize = 0;
  while (true) {
    let blockSize = readU32(src, sIndex);
    sIndex += 4;
    if (blockSize & bsUncompressed) {
      blockSize &= ~bsUncompressed;
      maxSize += blockSize;
    } else if (blockSize > 0) {
      maxSize += maxBlockSize;
    }
    if (blockSize === 0) {
      return maxSize;
    }
    if (useBlockSum) {
      sIndex += 4;
    }
    sIndex += blockSize;
  }
}
function decompressBlock(src, dst, sIndex, sLength, dIndex) {
  let mLength, mOffset, sEnd, n, i;
  const hasCopyWithin = dst.copyWithin !== void 0 && dst.fill !== void 0;
  sEnd = sIndex + sLength;
  while (sIndex < sEnd) {
    const token = src[sIndex++];
    let literalCount = token >> 4;
    if (literalCount > 0) {
      if (literalCount === 15) {
        while (true) {
          literalCount += src[sIndex];
          if (src[sIndex++] !== 255) {
            break;
          }
        }
      }
      for (n = sIndex + literalCount; sIndex < n; ) {
        dst[dIndex++] = src[sIndex++];
      }
    }
    if (sIndex >= sEnd) {
      break;
    }
    mLength = token & 15;
    mOffset = src[sIndex++] | src[sIndex++] << 8;
    if (mLength === 15) {
      while (true) {
        mLength += src[sIndex];
        if (src[sIndex++] !== 255) {
          break;
        }
      }
    }
    mLength += minMatch;
    if (hasCopyWithin && mOffset === 1) {
      dst.fill(dst[dIndex - 1] | 0, dIndex, dIndex + mLength);
      dIndex += mLength;
    } else if (hasCopyWithin && mOffset > mLength && mLength > 31) {
      dst.copyWithin(dIndex, dIndex - mOffset, dIndex - mOffset + mLength);
      dIndex += mLength;
    } else {
      for (i = dIndex - mOffset, n = i + mLength; i < n; ) {
        dst[dIndex++] = dst[i++] | 0;
      }
    }
  }
  return dIndex;
}
function decompressFrame(src, dst) {
  let useBlockSum, useContentSum, useContentSize, descriptor;
  let sIndex = 0;
  let dIndex = 0;
  if (readU32(src, sIndex) !== magicNum) {
    throw new Error("invalid magic number");
  }
  sIndex += 4;
  descriptor = src[sIndex++];
  if ((descriptor & fdVersionMask) !== fdVersion) {
    throw new Error("incompatible descriptor version");
  }
  useBlockSum = (descriptor & fdBlockChksum) !== 0;
  useContentSum = (descriptor & fdContentChksum) !== 0;
  useContentSize = (descriptor & fdContentSize) !== 0;
  const bsIdx = src[sIndex++] >> bsShift & bsMask;
  if (bsMap[bsIdx] === void 0) {
    throw new Error("invalid block size");
  }
  if (useContentSize) {
    sIndex += 8;
  }
  sIndex++;
  while (true) {
    var compSize;
    compSize = readU32(src, sIndex);
    sIndex += 4;
    if (compSize === 0) {
      break;
    }
    if (useBlockSum) {
      sIndex += 4;
    }
    if ((compSize & bsUncompressed) !== 0) {
      compSize &= ~bsUncompressed;
      for (let j = 0; j < compSize; j++) {
        dst[dIndex++] = src[sIndex++];
      }
    } else {
      dIndex = decompressBlock(src, dst, sIndex, compSize, dIndex);
      sIndex += compSize;
    }
  }
  if (useContentSum) {
    sIndex += 4;
  }
  return dIndex;
}
function decompress(src, maxSize) {
  let dst, size;
  if (maxSize === void 0) {
    maxSize = decompressBound(src);
  }
  dst = makeBuffer(maxSize);
  size = decompressFrame(src, dst);
  if (size !== maxSize) {
    dst = sliceArray(dst, 0, size);
  }
  return dst;
}

// src/utils/RangeList.ts
var RangeList = class {
  ranges = [];
  /**
   * Add a range to the list. If it overlaps with existing ranges,
   * it will split them and increment reference counts accordingly.
   */
  add(start, end) {
    if (end <= start) {
      throw new TypeError("End must be greater than start");
    }
    const overlappingRanges = [];
    for (let i = 0; i < this.ranges.length; i++) {
      const range2 = this.ranges[i];
      if (start < range2.end && end > range2.start) {
        overlappingRanges.push({ index: i, range: range2 });
      }
      if (range2.data !== null) {
        throw new Error("Overlapping range already has data");
      }
    }
    if (overlappingRanges.length === 0) {
      this.ranges.push({ start, end, refCount: 1, data: null });
      this.ranges.sort((a, b) => a.start - b.start);
      return;
    }
    const newRanges = [];
    let currentPos = start;
    for (let i = 0; i < overlappingRanges.length; i++) {
      const { range: range2 } = overlappingRanges[i];
      if (currentPos < range2.start) {
        newRanges.push({
          start: currentPos,
          end: range2.start,
          refCount: 1,
          data: null
        });
      } else if (range2.start < currentPos) {
        newRanges.push({
          start: range2.start,
          end: currentPos,
          refCount: range2.refCount,
          data: null
        });
      }
      newRanges.push({
        start: Math.max(currentPos, range2.start),
        end: Math.min(end, range2.end),
        refCount: range2.refCount + 1,
        data: null
      });
      if (range2.end > end) {
        newRanges.push({
          start: end,
          end: range2.end,
          refCount: range2.refCount,
          data: null
        });
      }
      currentPos = Math.max(currentPos, range2.end);
    }
    if (currentPos < end) {
      newRanges.push({
        start: currentPos,
        end,
        refCount: 1,
        data: null
      });
    }
    const firstIndex = overlappingRanges[0].index;
    const lastIndex = overlappingRanges[overlappingRanges.length - 1].index;
    this.ranges.splice(firstIndex, lastIndex - firstIndex + 1, ...newRanges);
    this.ranges.sort((a, b) => a.start - b.start);
  }
  /**
   * Remove a range from the list. The range must start and end at existing boundaries.
   */
  remove(start, end) {
    if (end <= start) {
      throw new TypeError("End must be greater than start");
    }
    const affectedRanges = [];
    for (let i = 0; i < this.ranges.length; i++) {
      const range2 = this.ranges[i];
      if (start < range2.end && end > range2.start) {
        affectedRanges.push({ index: i, range: range2 });
      }
    }
    if (affectedRanges.length === 0) {
      throw new Error("No ranges found to remove");
    }
    if (start !== affectedRanges[0].range.start || end !== affectedRanges[affectedRanges.length - 1].range.end) {
      throw new Error("Range boundaries must match existing boundaries");
    }
    for (let i = 0; i < affectedRanges.length; i++) {
      const { range: range2 } = affectedRanges[i];
      range2.refCount--;
    }
    this.ranges = this.ranges.filter((range2) => range2.refCount > 0);
  }
  /**
   * Get all ranges within the specified boundaries.
   */
  getRanges(start, end) {
    if (end <= start) {
      throw new TypeError("End must be greater than start");
    }
    return this.ranges.filter((range2) => start < range2.end && end > range2.start);
  }
  /**
   * Get all ranges in the list
   */
  getAllRanges() {
    return [...this.ranges];
  }
};

// src/utils/XetBlob.ts
var JWT_SAFETY_PERIOD = 6e4;
var JWT_CACHE_SIZE = 1e3;
var compressionSchemeLabels = {
  [0 /* None */]: "None",
  [1 /* LZ4 */]: "LZ4",
  [2 /* ByteGroupingLZ4 */]: "ByteGroupingLZ4"
};
var XET_CHUNK_HEADER_BYTES = 8;
var XetBlob = class extends Blob {
  fetch;
  accessToken;
  refreshUrl;
  reconstructionUrl;
  hash;
  start = 0;
  end = 0;
  internalLogging = false;
  reconstructionInfo;
  listener;
  constructor(params) {
    super([]);
    this.fetch = params.fetch ?? fetch.bind(globalThis);
    this.accessToken = checkCredentials(params);
    this.refreshUrl = params.refreshUrl;
    this.end = params.size;
    this.reconstructionUrl = params.reconstructionUrl;
    this.hash = params.hash;
    this.listener = params.listener;
    this.internalLogging = params.internalLogging ?? false;
    this.refreshUrl;
  }
  get size() {
    return this.end - this.start;
  }
  #clone() {
    const blob = new XetBlob({
      fetch: this.fetch,
      hash: this.hash,
      refreshUrl: this.refreshUrl,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      reconstructionUrl: this.reconstructionUrl,
      size: this.size
    });
    blob.accessToken = this.accessToken;
    blob.start = this.start;
    blob.end = this.end;
    blob.reconstructionInfo = this.reconstructionInfo;
    blob.listener = this.listener;
    blob.internalLogging = this.internalLogging;
    return blob;
  }
  slice(start = 0, end = this.size) {
    if (start < 0 || end < 0) {
      new TypeError("Unsupported negative start/end on XetBlob.slice");
    }
    const slice = this.#clone();
    slice.start = this.start + start;
    slice.end = Math.min(this.start + end, this.end);
    if (slice.start !== this.start || slice.end !== this.end) {
      slice.reconstructionInfo = void 0;
    }
    return slice;
  }
  #reconstructionInfoPromise;
  #loadReconstructionInfo() {
    if (this.#reconstructionInfoPromise) {
      return this.#reconstructionInfoPromise;
    }
    this.#reconstructionInfoPromise = (async () => {
      const connParams = await getAccessToken(this.accessToken, this.fetch, this.refreshUrl);
      const resp = await this.fetch(this.reconstructionUrl ?? `${connParams.casUrl}/v1/reconstruction/${this.hash}`, {
        headers: {
          Authorization: `Bearer ${connParams.accessToken}`,
          Range: `bytes=${this.start}-${this.end - 1}`
        }
      });
      if (!resp.ok) {
        throw await createApiError(resp);
      }
      this.reconstructionInfo = await resp.json();
      return this.reconstructionInfo;
    })().finally(() => this.#reconstructionInfoPromise = void 0);
    return this.#reconstructionInfoPromise;
  }
  async #fetch() {
    if (!this.reconstructionInfo) {
      await this.#loadReconstructionInfo();
    }
    const rangeLists = /* @__PURE__ */ new Map();
    if (!this.reconstructionInfo) {
      throw new Error("Failed to load reconstruction info");
    }
    for (const term of this.reconstructionInfo.terms) {
      let rangeList = rangeLists.get(term.hash);
      if (!rangeList) {
        rangeList = new RangeList();
        rangeLists.set(term.hash, rangeList);
      }
      rangeList.add(term.range.start, term.range.end);
    }
    const listener = this.listener;
    const log = this.internalLogging ? (...args) => console.log(...args) : () => {
    };
    async function* readData(reconstructionInfo, customFetch, maxBytes, reloadReconstructionInfo) {
      let totalBytesRead = 0;
      let readBytesToSkip = reconstructionInfo.offset_into_first_range;
      for (const term of reconstructionInfo.terms) {
        if (totalBytesRead >= maxBytes) {
          break;
        }
        const rangeList = rangeLists.get(term.hash);
        if (!rangeList) {
          throw new Error(`Failed to find range list for term ${term.hash}`);
        }
        {
          const termRanges = rangeList.getRanges(term.range.start, term.range.end);
          if (termRanges.every((range2) => range2.data)) {
            log("all data available for term", term.hash, readBytesToSkip);
            rangeLoop:
              for (const range2 of termRanges) {
                for (let chunk2 of range2.data) {
                  if (readBytesToSkip) {
                    const skipped = Math.min(readBytesToSkip, chunk2.byteLength);
                    chunk2 = chunk2.slice(skipped);
                    readBytesToSkip -= skipped;
                    if (!chunk2.byteLength) {
                      continue;
                    }
                  }
                  if (chunk2.byteLength > maxBytes - totalBytesRead) {
                    chunk2 = chunk2.slice(0, maxBytes - totalBytesRead);
                  }
                  totalBytesRead += chunk2.byteLength;
                  yield range2.refCount > 1 ? chunk2.slice() : chunk2;
                  listener?.({ event: "progress", progress: { read: totalBytesRead, total: maxBytes } });
                  if (totalBytesRead >= maxBytes) {
                    break rangeLoop;
                  }
                }
              }
            rangeList.remove(term.range.start, term.range.end);
            continue;
          }
        }
        const fetchInfo = reconstructionInfo.fetch_info[term.hash].find(
          (info) => info.range.start <= term.range.start && info.range.end >= term.range.end
        );
        if (!fetchInfo) {
          throw new Error(
            `Failed to find fetch info for term ${term.hash} and range ${term.range.start}-${term.range.end}`
          );
        }
        log("term", term);
        log("fetchinfo", fetchInfo);
        log("readBytesToSkip", readBytesToSkip);
        let resp = await customFetch(fetchInfo.url, {
          headers: {
            Range: `bytes=${fetchInfo.url_range.start}-${fetchInfo.url_range.end}`
          }
        });
        if (resp.status === 403) {
          reconstructionInfo = await reloadReconstructionInfo();
          resp = await customFetch(fetchInfo.url, {
            headers: {
              Range: `bytes=${fetchInfo.url_range.start}-${fetchInfo.url_range.end}`
            }
          });
        }
        if (!resp.ok) {
          throw await createApiError(resp);
        }
        log(
          "expected content length",
          resp.headers.get("content-length"),
          "range",
          fetchInfo.url_range,
          resp.headers.get("content-range")
        );
        const reader = resp.body?.getReader();
        if (!reader) {
          throw new Error("Failed to get reader from response body");
        }
        let done = false;
        let chunkIndex = fetchInfo.range.start;
        const ranges = rangeList.getRanges(fetchInfo.range.start, fetchInfo.range.end);
        let leftoverBytes = void 0;
        let totalFetchBytes = 0;
        fetchData:
          while (!done && totalBytesRead < maxBytes) {
            const result = await reader.read();
            listener?.({ event: "read" });
            done = result.done;
            log("read", result.value?.byteLength, "bytes", "total read", totalBytesRead, "toSkip", readBytesToSkip);
            if (!result.value) {
              log("no data in result, cancelled", result);
              continue;
            }
            totalFetchBytes += result.value.byteLength;
            if (leftoverBytes) {
              result.value = new Uint8Array([...leftoverBytes, ...result.value]);
              leftoverBytes = void 0;
            }
            while (totalBytesRead < maxBytes && result.value.byteLength) {
              if (result.value.byteLength < 8) {
                leftoverBytes = result.value;
                continue fetchData;
              }
              const header = new DataView(result.value.buffer, result.value.byteOffset, XET_CHUNK_HEADER_BYTES);
              const chunkHeader = {
                version: header.getUint8(0),
                compressed_length: header.getUint8(1) | header.getUint8(2) << 8 | header.getUint8(3) << 16,
                compression_scheme: header.getUint8(4),
                uncompressed_length: header.getUint8(5) | header.getUint8(6) << 8 | header.getUint8(7) << 16
              };
              log("chunk header", chunkHeader, "to skip", readBytesToSkip);
              if (chunkHeader.version !== 0) {
                throw new Error(`Unsupported chunk version ${chunkHeader.version}`);
              }
              if (chunkHeader.compression_scheme !== 0 /* None */ && chunkHeader.compression_scheme !== 1 /* LZ4 */ && chunkHeader.compression_scheme !== 2 /* ByteGroupingLZ4 */) {
                throw new Error(
                  `Unsupported compression scheme ${compressionSchemeLabels[chunkHeader.compression_scheme] ?? chunkHeader.compression_scheme}`
                );
              }
              if (result.value.byteLength < chunkHeader.compressed_length + XET_CHUNK_HEADER_BYTES) {
                leftoverBytes = result.value;
                continue fetchData;
              }
              result.value = result.value.slice(XET_CHUNK_HEADER_BYTES);
              let uncompressed = chunkHeader.compression_scheme === 1 /* LZ4 */ ? decompress(result.value.slice(0, chunkHeader.compressed_length), chunkHeader.uncompressed_length) : chunkHeader.compression_scheme === 2 /* ByteGroupingLZ4 */ ? bg4_regroup_bytes(
                decompress(
                  result.value.slice(0, chunkHeader.compressed_length),
                  chunkHeader.uncompressed_length
                )
              ) : result.value.slice(0, chunkHeader.compressed_length);
              const range2 = ranges.find((range3) => chunkIndex >= range3.start && chunkIndex < range3.end);
              const shouldYield = chunkIndex >= term.range.start && chunkIndex < term.range.end;
              const minRefCountToStore = shouldYield ? 2 : 1;
              let stored = false;
              if (range2 && range2.refCount >= minRefCountToStore) {
                range2.data ??= [];
                range2.data.push(uncompressed);
                stored = true;
              }
              if (shouldYield) {
                if (readBytesToSkip) {
                  const skipped = Math.min(readBytesToSkip, uncompressed.byteLength);
                  uncompressed = uncompressed.slice(readBytesToSkip);
                  readBytesToSkip -= skipped;
                }
                if (uncompressed.byteLength > maxBytes - totalBytesRead) {
                  uncompressed = uncompressed.slice(0, maxBytes - totalBytesRead);
                }
                if (uncompressed.byteLength) {
                  log(
                    "yield",
                    uncompressed.byteLength,
                    "bytes",
                    result.value.byteLength,
                    "total read",
                    totalBytesRead,
                    stored
                  );
                  totalBytesRead += uncompressed.byteLength;
                  yield stored ? uncompressed.slice() : uncompressed;
                  listener?.({ event: "progress", progress: { read: totalBytesRead, total: maxBytes } });
                }
              }
              chunkIndex++;
              result.value = result.value.slice(chunkHeader.compressed_length);
            }
          }
        if (done && totalBytesRead < maxBytes && totalFetchBytes < fetchInfo.url_range.end - fetchInfo.url_range.start + 1) {
          log("done", done, "total read", totalBytesRead, maxBytes, totalFetchBytes);
          log("failed to fetch all data for term", term.hash);
          throw new Error(
            `Failed to fetch all data for term ${term.hash}, fetched ${totalFetchBytes} bytes out of ${fetchInfo.url_range.end - fetchInfo.url_range.start + 1}`
          );
        }
        log("done", done, "total read", totalBytesRead, maxBytes, totalFetchBytes);
        log("cancel reader");
        await reader.cancel();
      }
    }
    const iterator = readData(
      this.reconstructionInfo,
      this.fetch,
      this.end - this.start,
      this.#loadReconstructionInfo.bind(this)
    );
    return new ReadableStream(
      {
        // todo: when Safari supports it, type controller as ReadableByteStreamController
        async pull(controller) {
          const result = await iterator.next();
          if (result.value) {
            controller.enqueue(result.value);
          }
          if (result.done) {
            controller.close();
          }
        },
        type: "bytes"
        // todo: when Safari supports it, add autoAllocateChunkSize param
      },
      // todo : use ByteLengthQueuingStrategy when there's good support for it, currently in Node.js it fails due to size being a function
      {
        highWaterMark: 1e3
        // 1_000 chunks for ~1MB of RAM
      }
    );
  }
  async arrayBuffer() {
    const result = await this.#fetch();
    return new Response(result).arrayBuffer();
  }
  async text() {
    const result = await this.#fetch();
    return new Response(result).text();
  }
  async response() {
    const result = await this.#fetch();
    return new Response(result);
  }
  stream() {
    const stream = new TransformStream();
    this.#fetch().then((response) => response.pipeThrough(stream)).catch((error) => stream.writable.abort(error.message));
    return stream.readable;
  }
};
var jwtPromises = /* @__PURE__ */ new Map();
var jwts = /* @__PURE__ */ new Map();
function cacheKey(params) {
  return JSON.stringify([params.refreshUrl, params.initialAccessToken]);
}
function bg4_regroup_bytes(bytes) {
  const split = Math.floor(bytes.byteLength / 4);
  const rem = bytes.byteLength % 4;
  const g1_pos = split + (rem >= 1 ? 1 : 0);
  const g2_pos = g1_pos + split + (rem >= 2 ? 1 : 0);
  const g3_pos = g2_pos + split + (rem == 3 ? 1 : 0);
  const ret = new Uint8Array(bytes.byteLength);
  for (let i = 0, j = 0; i < bytes.byteLength; i += 4, j++) {
    ret[i] = bytes[j];
  }
  for (let i = 1, j = g1_pos; i < bytes.byteLength; i += 4, j++) {
    ret[i] = bytes[j];
  }
  for (let i = 2, j = g2_pos; i < bytes.byteLength; i += 4, j++) {
    ret[i] = bytes[j];
  }
  for (let i = 3, j = g3_pos; i < bytes.byteLength; i += 4, j++) {
    ret[i] = bytes[j];
  }
  return ret;
}
async function getAccessToken(initialAccessToken, customFetch, refreshUrl) {
  const key = cacheKey({ refreshUrl, initialAccessToken });
  const jwt = jwts.get(key);
  if (jwt && jwt.expiresAt > new Date(Date.now() + JWT_SAFETY_PERIOD)) {
    return { accessToken: jwt.accessToken, casUrl: jwt.casUrl };
  }
  const existingPromise = jwtPromises.get(key);
  if (existingPromise) {
    return existingPromise;
  }
  const promise = (async () => {
    const resp = await customFetch(refreshUrl, {
      headers: {
        ...initialAccessToken ? {
          Authorization: `Bearer ${initialAccessToken}`
        } : {}
      }
    });
    if (!resp.ok) {
      throw new Error(`Failed to get JWT token: ${resp.status} ${await resp.text()}`);
    }
    const json = await resp.json();
    const jwt2 = {
      accessToken: json.accessToken,
      expiresAt: new Date(json.exp * 1e3),
      initialAccessToken,
      refreshUrl,
      casUrl: json.casUrl
    };
    jwtPromises.delete(key);
    for (const [key2, value] of jwts.entries()) {
      if (value.expiresAt < new Date(Date.now() + JWT_SAFETY_PERIOD)) {
        jwts.delete(key2);
      } else {
        break;
      }
    }
    if (jwts.size >= JWT_CACHE_SIZE) {
      const keyToDelete = jwts.keys().next().value;
      if (keyToDelete) {
        jwts.delete(keyToDelete);
      }
    }
    jwts.set(key, jwt2);
    return {
      accessToken: json.accessToken,
      casUrl: json.casUrl
    };
  })();
  jwtPromises.set(key, promise);
  return promise;
}

// src/lib/file-download-info.ts
async function fileDownloadInfo(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const hubUrl = params.hubUrl ?? HUB_URL;
  const url = `${hubUrl}/${repoId.type === "model" ? "" : `${repoId.type}s/`}${repoId.name}/${params.raw ? "raw" : "resolve"}/${encodeURIComponent(params.revision ?? "main")}/${params.path}` + (params.noContentDisposition ? "?noContentDisposition=1" : "");
  const resp = await (params.fetch ?? fetch)(url, {
    method: "GET",
    headers: {
      ...accessToken && {
        Authorization: `Bearer ${accessToken}`
      },
      Range: "bytes=0-0",
      Accept: "application/vnd.xet-fileinfo+json, */*"
    }
  });
  if (resp.status === 404 && resp.headers.get("X-Error-Code") === "EntryNotFound") {
    return null;
  }
  if (!resp.ok) {
    throw await createApiError(resp);
  }
  let size;
  let xetInfo;
  if (resp.headers.get("Content-Type")?.includes("application/vnd.xet-fileinfo+json")) {
    size = parseInt(resp.headers.get("X-Linked-Size") ?? "invalid");
    if (isNaN(size)) {
      throw new InvalidApiResponseFormatError("Invalid file size received in X-Linked-Size header");
    }
    const hash2 = resp.headers.get("X-Xet-Hash");
    const links = parseLinkHeader(resp.headers.get("Link") ?? "");
    const reconstructionUrl = (() => {
      try {
        return new URL(links["xet-reconstruction-info"]);
      } catch {
        return null;
      }
    })();
    const refreshUrl = (() => {
      try {
        return new URL(links["xet-auth"]);
      } catch {
        return null;
      }
    })();
    if (!hash2) {
      throw new InvalidApiResponseFormatError("No hash received in X-Xet-Hash header");
    }
    if (!reconstructionUrl || !refreshUrl) {
      throw new InvalidApiResponseFormatError("No xet-reconstruction-info or xet-auth link header");
    }
    xetInfo = {
      hash: hash2,
      refreshUrl,
      reconstructionUrl
    };
  }
  if (size === void 0 || isNaN(size)) {
    const contentRangeHeader = resp.headers.get("content-range");
    if (!contentRangeHeader) {
      throw new InvalidApiResponseFormatError("Expected size information");
    }
    const [, parsedSize] = contentRangeHeader.split("/");
    size = parseInt(parsedSize);
    if (isNaN(size)) {
      throw new InvalidApiResponseFormatError("Invalid file size received");
    }
  }
  const etag = resp.headers.get("X-Linked-ETag") ?? resp.headers.get("ETag") ?? void 0;
  if (!etag) {
    throw new InvalidApiResponseFormatError("Expected ETag");
  }
  return {
    etag,
    size,
    xet: xetInfo,
    // Cannot use resp.url in case it's a S3 url and the user adds an Authorization header to it.
    url: resp.url && (new URL(resp.url).origin === new URL(hubUrl).origin || resp.headers.get("X-Cache")?.endsWith(" cloudfront")) ? resp.url : url
  };
}

// src/lib/download-file.ts
async function downloadFile(params) {
  const accessToken = checkCredentials(params);
  const info = params.downloadInfo ?? await fileDownloadInfo({
    accessToken,
    repo: params.repo,
    path: params.path,
    revision: params.revision,
    hubUrl: params.hubUrl,
    fetch: params.fetch,
    raw: params.raw
  });
  if (!info) {
    return null;
  }
  if (info.xet && params.xet) {
    return new XetBlob({
      refreshUrl: info.xet.refreshUrl.href,
      reconstructionUrl: info.xet.reconstructionUrl.href,
      fetch: params.fetch,
      accessToken,
      size: info.size
    });
  }
  return new WebBlob(new URL(info.url), 0, info.size, "", true, params.fetch ?? fetch, accessToken);
}

// src/lib/download-file-to-cache-dir.ts
var import_node_path2 = require("path");
var import_promises4 = require("fs/promises");

// src/lib/paths-info.ts
async function pathsInfo(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const hubUrl = params.hubUrl ?? HUB_URL;
  const url = `${hubUrl}/api/${repoId.type}s/${repoId.name}/paths-info/${encodeURIComponent(
    params.revision ?? "main"
  )}`;
  const resp = await (params.fetch ?? fetch)(url, {
    method: "POST",
    headers: {
      ...accessToken && {
        Authorization: `Bearer ${accessToken}`
      },
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      paths: params.paths,
      expand: params.expand
    })
  });
  if (!resp.ok) {
    throw await createApiError(resp);
  }
  const json = await resp.json();
  if (!Array.isArray(json))
    throw new Error("malformed response: expected array");
  return json.map((item) => ({
    path: item.path,
    lfs: item.lfs,
    type: item.type,
    oid: item.oid,
    size: item.size,
    // expand fields
    securityFileStatus: item.securityFileStatus,
    lastCommit: item.lastCommit ? {
      date: new Date(item.lastCommit.date),
      title: item.lastCommit.title,
      id: item.lastCommit.id
    } : void 0
  }));
}

// src/utils/symlink.ts
var fs = __toESM(require("fs/promises"));
var path = __toESM(require("path"));
var os = __toESM(require("os"));
function expandUser(path2) {
  if (path2.startsWith("~")) {
    return path2.replace("~", os.homedir());
  }
  return path2;
}
async function createSymlink(params) {
  const abs_src = path.resolve(expandUser(params.sourcePath));
  const abs_dst = path.resolve(expandUser(params.finalPath));
  try {
    await fs.rm(abs_dst);
  } catch {
  }
  try {
    await fs.symlink(path.relative(path.dirname(abs_dst), abs_src), abs_dst);
  } catch {
    console.info(`Symlink not supported. Copying file from ${abs_src} to ${abs_dst}`);
    await fs.copyFile(abs_src, abs_dst);
  }
}

// src/lib/download-file-to-cache-dir.ts
var import_node_stream3 = require("stream");
var import_promises5 = require("stream/promises");
var import_node_fs2 = require("fs");
var REGEX_COMMIT_HASH = new RegExp("^[0-9a-f]{40}$");
function getFilePointer(storageFolder, revision, relativeFilename) {
  const snapshotPath = (0, import_node_path2.join)(storageFolder, "snapshots");
  return (0, import_node_path2.join)(snapshotPath, revision, relativeFilename);
}
async function exists(path2, followSymlinks) {
  try {
    if (followSymlinks) {
      await (0, import_promises4.stat)(path2);
    } else {
      await (0, import_promises4.lstat)(path2);
    }
    return true;
  } catch (err) {
    return false;
  }
}
async function downloadFileToCacheDir(params) {
  const revision = params.revision ?? "main";
  const cacheDir = params.cacheDir ?? getHFHubCachePath();
  const repoId = toRepoId(params.repo);
  const storageFolder = (0, import_node_path2.join)(cacheDir, getRepoFolderName(repoId));
  let commitHash;
  if (REGEX_COMMIT_HASH.test(revision)) {
    commitHash = revision;
    const pointerPath2 = getFilePointer(storageFolder, revision, params.path);
    if (await exists(pointerPath2, true))
      return pointerPath2;
  }
  const pathsInformation = await pathsInfo({
    ...params,
    paths: [params.path],
    revision,
    expand: true
  });
  if (!pathsInformation || pathsInformation.length !== 1)
    throw new Error(`cannot get path info for ${params.path}`);
  let etag;
  if (pathsInformation[0].lfs) {
    etag = pathsInformation[0].lfs.oid;
  } else {
    etag = pathsInformation[0].oid;
  }
  const pointerPath = getFilePointer(storageFolder, commitHash ?? pathsInformation[0].lastCommit.id, params.path);
  const blobPath = (0, import_node_path2.join)(storageFolder, "blobs", etag);
  if (await exists(pointerPath, true))
    return pointerPath;
  await (0, import_promises4.mkdir)((0, import_node_path2.dirname)(blobPath), { recursive: true });
  await (0, import_promises4.mkdir)((0, import_node_path2.dirname)(pointerPath), { recursive: true });
  if (await exists(blobPath)) {
    await createSymlink({ sourcePath: blobPath, finalPath: pointerPath });
    return pointerPath;
  }
  const incomplete = `${blobPath}.incomplete`;
  console.debug(`Downloading ${params.path} to ${incomplete}`);
  const blob = await downloadFile({
    ...params,
    revision: commitHash
  });
  if (!blob) {
    throw new Error(`invalid response for file ${params.path}`);
  }
  await (0, import_promises5.pipeline)(import_node_stream3.Readable.fromWeb(blob.stream()), (0, import_node_fs2.createWriteStream)(incomplete));
  await (0, import_promises4.rename)(incomplete, blobPath);
  await createSymlink({ sourcePath: blobPath, finalPath: pointerPath });
  return pointerPath;
}

// src/lib/file-exists.ts
async function fileExists(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const hubUrl = params.hubUrl ?? HUB_URL;
  const url = `${hubUrl}/${repoId.type === "model" ? "" : `${repoId.type}s/`}${repoId.name}/raw/${encodeURIComponent(
    params.revision ?? "main"
  )}/${params.path}`;
  const resp = await (params.fetch ?? fetch)(url, {
    method: "HEAD",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  });
  if (resp.status === 404) {
    return false;
  }
  if (!resp.ok) {
    throw await createApiError(resp);
  }
  return true;
}

// src/lib/list-commits.ts
async function* listCommits(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  let url = `${params.hubUrl ?? HUB_URL}/api/${repoId.type}s/${repoId.name}/commits/${params.revision ?? "main"}?limit=${params.batchSize ?? 100}`;
  while (url) {
    const res = await (params.fetch ?? fetch)(url, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
    });
    if (!res.ok) {
      throw await createApiError(res);
    }
    const resJson = await res.json();
    for (const commit2 of resJson) {
      yield {
        oid: commit2.id,
        title: commit2.title,
        message: commit2.message,
        authors: commit2.authors.map((author) => ({
          username: author.user,
          avatarUrl: author.avatar
        })),
        date: new Date(commit2.date)
      };
    }
    const linkHeader = res.headers.get("Link");
    url = linkHeader ? parseLinkHeader(linkHeader).next : void 0;
  }
}

// src/lib/list-files.ts
async function* listFiles(params) {
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  let url = `${params.hubUrl || HUB_URL}/api/${repoId.type}s/${repoId.name}/tree/${params.revision || "main"}${params.path ? "/" + params.path : ""}?recursive=${!!params.recursive}&expand=${!!params.expand}`;
  while (url) {
    const res = await (params.fetch ?? fetch)(url, {
      headers: {
        accept: "application/json",
        ...accessToken ? { Authorization: `Bearer ${accessToken}` } : void 0
      }
    });
    if (!res.ok) {
      throw await createApiError(res);
    }
    const items = await res.json();
    for (const item of items) {
      yield item;
    }
    const linkHeader = res.headers.get("Link");
    url = linkHeader ? parseLinkHeader(linkHeader).next : void 0;
  }
}

// src/utils/normalizeInferenceProviderMapping.ts
function normalizeInferenceProviderMapping(hfModelId, inferenceProviderMapping) {
  if (!inferenceProviderMapping) {
    return [];
  }
  if (Array.isArray(inferenceProviderMapping)) {
    return inferenceProviderMapping.map((entry) => ({
      ...entry,
      hfModelId
    }));
  }
  return Object.entries(inferenceProviderMapping).map(([provider, mapping]) => ({
    provider,
    hfModelId,
    providerId: mapping.providerId,
    status: mapping.status,
    task: mapping.task
  }));
}

// src/lib/list-models.ts
var MODEL_EXPAND_KEYS = [
  "pipeline_tag",
  "private",
  "gated",
  "downloads",
  "likes",
  "lastModified"
];
var MODEL_EXPANDABLE_KEYS = [
  "author",
  "cardData",
  "config",
  "createdAt",
  "disabled",
  "downloads",
  "downloadsAllTime",
  "gated",
  "gitalyUid",
  "inferenceProviderMapping",
  "lastModified",
  "library_name",
  "likes",
  "model-index",
  "pipeline_tag",
  "private",
  "safetensors",
  "sha",
  // "siblings",
  "spaces",
  "tags",
  "transformersInfo"
];
async function* listModels(params) {
  const accessToken = params && checkCredentials(params);
  let totalToFetch = params?.limit ?? Infinity;
  const search = new URLSearchParams([
    ...Object.entries({
      limit: String(Math.min(totalToFetch, 500)),
      ...params?.search?.owner ? { author: params.search.owner } : void 0,
      ...params?.search?.task ? { pipeline_tag: params.search.task } : void 0,
      ...params?.search?.query ? { search: params.search.query } : void 0,
      ...params?.search?.inferenceProviders ? { inference_provider: params.search.inferenceProviders.join(",") } : void 0
    }),
    ...params?.search?.tags?.map((tag) => ["filter", tag]) ?? [],
    ...MODEL_EXPAND_KEYS.map((val) => ["expand", val]),
    ...params?.additionalFields?.map((val) => ["expand", val]) ?? []
  ]).toString();
  let url = `${params?.hubUrl || HUB_URL}/api/models?${search}`;
  while (url) {
    const res = await (params?.fetch ?? fetch)(url, {
      headers: {
        accept: "application/json",
        ...accessToken ? { Authorization: `Bearer ${accessToken}` } : void 0
      }
    });
    if (!res.ok) {
      throw await createApiError(res);
    }
    const items = await res.json();
    for (const item of items) {
      const normalizedItem = { ...item };
      if (params?.additionalFields?.includes("inferenceProviderMapping") && item.inferenceProviderMapping) {
        normalizedItem.inferenceProviderMapping = normalizeInferenceProviderMapping(
          item.id,
          item.inferenceProviderMapping
        );
      }
      yield {
        ...params?.additionalFields && pick(normalizedItem, params.additionalFields),
        id: item._id,
        name: item.id,
        private: item.private,
        task: item.pipeline_tag,
        downloads: item.downloads,
        gated: item.gated,
        likes: item.likes,
        updatedAt: new Date(item.lastModified)
      };
      totalToFetch--;
      if (totalToFetch <= 0) {
        return;
      }
    }
    const linkHeader = res.headers.get("Link");
    url = linkHeader ? parseLinkHeader(linkHeader).next : void 0;
  }
}

// src/lib/list-spaces.ts
var SPACE_EXPAND_KEYS = [
  "sdk",
  "likes",
  "private",
  "lastModified"
];
var SPACE_EXPANDABLE_KEYS = [
  "author",
  "cardData",
  "datasets",
  "disabled",
  "gitalyUid",
  "lastModified",
  "createdAt",
  "likes",
  "private",
  "runtime",
  "sdk",
  // "siblings",
  "sha",
  "subdomain",
  "tags",
  "models"
];
async function* listSpaces(params) {
  const accessToken = params && checkCredentials(params);
  const search = new URLSearchParams([
    ...Object.entries({
      limit: "500",
      ...params?.search?.owner ? { author: params.search.owner } : void 0,
      ...params?.search?.query ? { search: params.search.query } : void 0
    }),
    ...params?.search?.tags?.map((tag) => ["filter", tag]) ?? [],
    ...[...SPACE_EXPAND_KEYS, ...params?.additionalFields ?? []].map(
      (val) => ["expand", val]
    )
  ]).toString();
  let url = `${params?.hubUrl || HUB_URL}/api/spaces?${search}`;
  while (url) {
    const res = await (params?.fetch ?? fetch)(url, {
      headers: {
        accept: "application/json",
        ...accessToken ? { Authorization: `Bearer ${accessToken}` } : void 0
      }
    });
    if (!res.ok) {
      throw await createApiError(res);
    }
    const items = await res.json();
    for (const item of items) {
      yield {
        ...params?.additionalFields && pick(item, params.additionalFields),
        id: item._id,
        name: item.id,
        sdk: item.sdk,
        likes: item.likes,
        private: item.private,
        updatedAt: new Date(item.lastModified)
      };
    }
    const linkHeader = res.headers.get("Link");
    url = linkHeader ? parseLinkHeader(linkHeader).next : void 0;
  }
}

// src/lib/list-collections.ts
async function* listCollections(params) {
  const accessToken = params && checkCredentials(params);
  const searchParams = new URLSearchParams();
  let totalToFetch = params?.limit ?? Infinity;
  searchParams.append("limit", String(Math.min(totalToFetch, 100)));
  if (params?.sort) {
    searchParams.append("sort", params.sort);
  }
  if (params?.search?.owner) {
    for (const owner of params.search.owner) {
      searchParams.append("owner", owner);
    }
  }
  if (params?.search?.item) {
    for (const item of params.search.item) {
      searchParams.append("item", item);
    }
  }
  if (params?.search?.q) {
    searchParams.append("q", params.search.q);
  }
  let url = `${params?.hubUrl || HUB_URL}/api/collections?${searchParams}`;
  while (url) {
    const res = await (params?.fetch ?? fetch)(url, {
      headers: {
        accept: "application/json",
        ...accessToken ? { Authorization: `Bearer ${accessToken}` } : void 0
      }
    });
    if (!res.ok) {
      throw await createApiError(res);
    }
    const collections = await res.json();
    for (const collection of collections) {
      yield collection;
      totalToFetch--;
      if (totalToFetch <= 0) {
        return;
      }
    }
    const linkHeader = res.headers.get("Link");
    url = linkHeader ? parseLinkHeader(linkHeader).next : void 0;
  }
}

// src/lib/model-info.ts
async function modelInfo(params) {
  const accessToken = params && checkCredentials(params);
  const search = new URLSearchParams([
    ...MODEL_EXPAND_KEYS.map((val) => ["expand", val]),
    ...params?.additionalFields?.map((val) => ["expand", val]) ?? []
  ]).toString();
  const response = await (params.fetch || fetch)(
    `${params?.hubUrl || HUB_URL}/api/models/${params.name}/revision/${encodeURIComponent(
      params.revision ?? "HEAD"
    )}?${search.toString()}`,
    {
      headers: {
        ...accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        Accepts: "application/json"
      }
    }
  );
  if (!response.ok) {
    throw await createApiError(response);
  }
  const data = await response.json();
  const normalizedData = { ...data };
  if (params?.additionalFields?.includes("inferenceProviderMapping") && data.inferenceProviderMapping) {
    normalizedData.inferenceProviderMapping = normalizeInferenceProviderMapping(data.id, data.inferenceProviderMapping);
  }
  return {
    ...params?.additionalFields && pick(normalizedData, params.additionalFields),
    id: data._id,
    name: data.id,
    private: data.private,
    task: data.pipeline_tag,
    downloads: data.downloads,
    gated: data.gated,
    likes: data.likes,
    updatedAt: new Date(data.lastModified)
  };
}

// src/lib/oauth-handle-redirect.ts
async function oauthHandleRedirect(opts) {
  if (typeof window === "undefined" && !opts?.redirectedUrl) {
    throw new Error("oauthHandleRedirect is only available in the browser, unless you provide redirectedUrl");
  }
  if (typeof localStorage === "undefined" && (!opts?.nonce || !opts?.codeVerifier)) {
    throw new Error(
      "oauthHandleRedirect requires localStorage to be available, unless you provide nonce and codeVerifier"
    );
  }
  const redirectedUrl = opts?.redirectedUrl ?? window.location.href;
  const searchParams = (() => {
    try {
      return new URL(redirectedUrl).searchParams;
    } catch (err) {
      throw new Error("Failed to parse redirected URL: " + redirectedUrl);
    }
  })();
  const [error, errorDescription] = [searchParams.get("error"), searchParams.get("error_description")];
  if (error) {
    throw new Error(`${error}: ${errorDescription}`);
  }
  const code = searchParams.get("code");
  const nonce = opts?.nonce ?? localStorage.getItem("huggingface.co:oauth:nonce");
  if (!code) {
    throw new Error("Missing oauth code from query parameters in redirected URL: " + redirectedUrl);
  }
  if (!nonce) {
    throw new Error("Missing oauth nonce from localStorage");
  }
  const codeVerifier = opts?.codeVerifier ?? localStorage.getItem("huggingface.co:oauth:code_verifier");
  if (!codeVerifier) {
    throw new Error("Missing oauth code_verifier from localStorage");
  }
  const state = searchParams.get("state");
  if (!state) {
    throw new Error("Missing oauth state from query parameters in redirected URL");
  }
  let parsedState;
  try {
    parsedState = JSON.parse(state);
  } catch {
    throw new Error("Invalid oauth state in redirected URL, unable to parse JSON: " + state);
  }
  if (parsedState.nonce !== nonce) {
    throw new Error("Invalid oauth state in redirected URL");
  }
  const hubUrl = opts?.hubUrl || HUB_URL;
  const openidConfigUrl = `${new URL(hubUrl).origin}/.well-known/openid-configuration`;
  const openidConfigRes = await fetch(openidConfigUrl, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!openidConfigRes.ok) {
    throw await createApiError(openidConfigRes);
  }
  const openidConfig = await openidConfigRes.json();
  const tokenRes = await fetch(openidConfig.token_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: parsedState.redirectUri,
      code_verifier: codeVerifier
    }).toString()
  });
  if (!opts?.codeVerifier) {
    localStorage.removeItem("huggingface.co:oauth:code_verifier");
  }
  if (!opts?.nonce) {
    localStorage.removeItem("huggingface.co:oauth:nonce");
  }
  if (!tokenRes.ok) {
    throw await createApiError(tokenRes);
  }
  const token = await tokenRes.json();
  const accessTokenExpiresAt = new Date(Date.now() + token.expires_in * 1e3);
  const userInfoRes = await fetch(openidConfig.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  });
  if (!userInfoRes.ok) {
    throw await createApiError(userInfoRes);
  }
  const userInfo = await userInfoRes.json();
  return {
    accessToken: token.access_token,
    accessTokenExpiresAt,
    userInfo,
    state: parsedState.state,
    scope: token.scope
  };
}
async function oauthHandleRedirectIfPresent(opts) {
  if (typeof window === "undefined" && !opts?.redirectedUrl) {
    throw new Error("oauthHandleRedirect is only available in the browser, unless you provide redirectedUrl");
  }
  if (typeof localStorage === "undefined" && (!opts?.nonce || !opts?.codeVerifier)) {
    throw new Error(
      "oauthHandleRedirect requires localStorage to be available, unless you provide nonce and codeVerifier"
    );
  }
  const searchParams = new URLSearchParams(opts?.redirectedUrl ?? window.location.search);
  if (searchParams.has("error")) {
    return oauthHandleRedirect(opts);
  }
  if (searchParams.has("code")) {
    if (!localStorage.getItem("huggingface.co:oauth:nonce")) {
      console.warn(
        "Missing oauth nonce from localStorage. This can happen when the user refreshes the page after logging in, without changing the URL."
      );
      return false;
    }
    return oauthHandleRedirect(opts);
  }
  return false;
}

// src/lib/oauth-login-url.ts
async function oauthLoginUrl(opts) {
  if (typeof window === "undefined" && (!opts?.redirectUrl || !opts?.clientId)) {
    throw new Error("oauthLogin is only available in the browser, unless you provide clientId and redirectUrl");
  }
  if (typeof localStorage === "undefined" && !opts?.localStorage) {
    throw new Error(
      "oauthLogin requires localStorage to be available in the context, unless you provide a localStorage empty object as argument"
    );
  }
  const hubUrl = opts?.hubUrl || HUB_URL;
  const openidConfigUrl = `${new URL(hubUrl).origin}/.well-known/openid-configuration`;
  const openidConfigRes = await fetch(openidConfigUrl, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!openidConfigRes.ok) {
    throw await createApiError(openidConfigRes);
  }
  const opendidConfig = await openidConfigRes.json();
  const newNonce = globalThis.crypto.randomUUID();
  const newCodeVerifier = globalThis.crypto.randomUUID() + globalThis.crypto.randomUUID();
  if (opts?.localStorage) {
    if (opts.localStorage.codeVerifier !== void 0 && opts.localStorage.codeVerifier !== null) {
      throw new Error(
        "localStorage.codeVerifier must be initially set to null or undefined, and will be filled by oauthLoginUrl"
      );
    }
    if (opts.localStorage.nonce !== void 0 && opts.localStorage.nonce !== null) {
      throw new Error(
        "localStorage.nonce must be initially set to null or undefined, and will be filled by oauthLoginUrl"
      );
    }
    opts.localStorage.codeVerifier = newCodeVerifier;
    opts.localStorage.nonce = newNonce;
  } else {
    localStorage.setItem("huggingface.co:oauth:nonce", newNonce);
    localStorage.setItem("huggingface.co:oauth:code_verifier", newCodeVerifier);
  }
  const redirectUri = opts?.redirectUrl || (typeof window !== "undefined" ? window.location.href : void 0);
  if (!redirectUri) {
    throw new Error("Missing redirectUrl");
  }
  const state = JSON.stringify({
    nonce: newNonce,
    redirectUri,
    state: opts?.state
  });
  const variables = (
    // @ts-expect-error window.huggingface is defined inside static Spaces.
    typeof window !== "undefined" ? window.huggingface?.variables ?? null : null
  );
  const clientId = opts?.clientId || variables?.OAUTH_CLIENT_ID;
  if (!clientId) {
    if (variables) {
      throw new Error("Missing clientId, please add hf_oauth: true to the README.md's metadata in your static Space");
    }
    throw new Error("Missing clientId");
  }
  const challenge = base64FromBytes(
    new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(newCodeVerifier)))
  ).replace(/[+]/g, "-").replace(/[/]/g, "_").replace(/=/g, "");
  return `${opendidConfig.authorization_endpoint}?${new URLSearchParams({
    client_id: clientId,
    scope: opts?.scopes || variables?.OAUTH_SCOPES || "openid profile",
    response_type: "code",
    redirect_uri: redirectUri,
    state,
    code_challenge: challenge,
    code_challenge_method: "S256"
  }).toString()}`;
}

// src/utils/typedInclude.ts
function typedInclude(arr, v) {
  return arr.includes(v);
}

// src/utils/omit.ts
function omit(o, props) {
  const propsArr = Array.isArray(props) ? props : [props];
  const letsKeep = Object.keys(o).filter((prop) => !typedInclude(propsArr, prop));
  return pick(o, letsKeep);
}

// src/utils/typedEntries.ts
function typedEntries(obj) {
  return Object.entries(obj);
}

// src/lib/parse-safetensors-metadata.ts
var SAFETENSORS_FILE = "model.safetensors";
var SAFETENSORS_INDEX_FILE = "model.safetensors.index.json";
var RE_SAFETENSORS_FILE = /\.safetensors$/;
var RE_SAFETENSORS_INDEX_FILE = /\.safetensors\.index\.json$/;
var RE_SAFETENSORS_SHARD_FILE = /^(?<prefix>(?<basePrefix>.*?)[_-])(?<shard>\d{5})-of-(?<total>\d{5})\.safetensors$/;
function parseSafetensorsShardFilename(filename) {
  const match = RE_SAFETENSORS_SHARD_FILE.exec(filename);
  if (match && match.groups) {
    return {
      prefix: match.groups["prefix"],
      basePrefix: match.groups["basePrefix"],
      shard: match.groups["shard"],
      total: match.groups["total"]
    };
  }
  return null;
}
var PARALLEL_DOWNLOADS = 20;
var MAX_HEADER_LENGTH = 25e6;
var SafetensorParseError = class extends Error {
};
async function fetchModelConfig(params) {
  try {
    const configBlob = await downloadFile({
      ...params,
      path: "config.json"
    });
    if (!configBlob) {
      return null;
    }
    const config = JSON.parse(await configBlob.text());
    return config;
  } catch (error) {
    return null;
  }
}
async function parseSingleFile(path2, params) {
  const blob = await downloadFile({ ...params, path: path2 });
  if (!blob) {
    throw new SafetensorParseError(`Failed to parse file ${path2}: failed to fetch safetensors header length.`);
  }
  const bufLengthOfHeaderLE = await blob.slice(0, 8).arrayBuffer();
  const lengthOfHeader = new DataView(bufLengthOfHeaderLE).getBigUint64(0, true);
  if (lengthOfHeader <= 0) {
    throw new SafetensorParseError(`Failed to parse file ${path2}: safetensors header is malformed.`);
  }
  if (lengthOfHeader > MAX_HEADER_LENGTH) {
    throw new SafetensorParseError(
      `Failed to parse file ${path2}: safetensor header is too big. Maximum supported size is ${MAX_HEADER_LENGTH} bytes.`
    );
  }
  try {
    const header = JSON.parse(await blob.slice(8, 8 + Number(lengthOfHeader)).text());
    return header;
  } catch (err) {
    throw new SafetensorParseError(`Failed to parse file ${path2}: safetensors header is not valid JSON.`);
  }
}
async function parseShardedIndex(path2, params) {
  const indexBlob = await downloadFile({
    ...params,
    path: path2
  });
  if (!indexBlob) {
    throw new SafetensorParseError(`Failed to parse file ${path2}: failed to fetch safetensors index.`);
  }
  try {
    const index = JSON.parse(await indexBlob.slice(0, 1e7).text());
    return index;
  } catch (error) {
    throw new SafetensorParseError(`Failed to parse file ${path2}: not a valid JSON.`);
  }
}
async function fetchAllHeaders(path2, index, params) {
  const pathPrefix = path2.slice(0, path2.lastIndexOf("/") + 1);
  const filenames = [...new Set(Object.values(index.weight_map))];
  const shardedMap = Object.fromEntries(
    await promisesQueue(
      filenames.map(
        (filename) => async () => [filename, await parseSingleFile(pathPrefix + filename, params)]
      ),
      PARALLEL_DOWNLOADS
    )
  );
  return shardedMap;
}
async function parseSafetensorsMetadata(params) {
  const repoId = toRepoId(params.repo);
  if (repoId.type !== "model") {
    throw new TypeError("Only model repos should contain safetensors files.");
  }
  const modelConfig = params.computeParametersCount ? await fetchModelConfig(params) : null;
  const quantConfig = modelConfig?.quantization_config;
  if (params.path && RE_SAFETENSORS_FILE.test(params.path) || await fileExists({ ...params, path: SAFETENSORS_FILE })) {
    const header = await parseSingleFile(params.path ?? SAFETENSORS_FILE, params);
    return {
      sharded: false,
      header,
      ...params.computeParametersCount ? {
        parameterCount: computeNumOfParamsByDtypeSingleFile(header, quantConfig),
        parameterTotal: (
          /// shortcut: get param count directly from metadata
          header.__metadata__.total_parameters ? typeof header.__metadata__.total_parameters === "number" ? header.__metadata__.total_parameters : typeof header.__metadata__.total_parameters === "string" ? parseInt(header.__metadata__.total_parameters) : void 0 : void 0
        )
      } : void 0
    };
  } else if (params.path && RE_SAFETENSORS_INDEX_FILE.test(params.path) || await fileExists({ ...params, path: SAFETENSORS_INDEX_FILE })) {
    const path2 = params.path ?? SAFETENSORS_INDEX_FILE;
    const index = await parseShardedIndex(path2, params);
    const shardedMap = await fetchAllHeaders(path2, index, params);
    return {
      sharded: true,
      index,
      headers: shardedMap,
      ...params.computeParametersCount ? {
        parameterCount: computeNumOfParamsByDtypeSharded(shardedMap, quantConfig),
        parameterTotal: (
          /// shortcut: get param count directly from metadata
          index.metadata?.total_parameters ? typeof index.metadata.total_parameters === "number" ? index.metadata.total_parameters : typeof index.metadata.total_parameters === "string" ? parseInt(index.metadata.total_parameters) : void 0 : void 0
        )
      } : void 0
    };
  } else {
    throw new Error("model id does not seem to contain safetensors weights");
  }
}
function isQuantizedTensor(tensorName, quantConfig) {
  if (!quantConfig || !quantConfig.modules_to_not_convert) {
    return false;
  }
  for (const pattern of quantConfig.modules_to_not_convert) {
    const regexPattern = pattern.replace(/\*/g, ".*");
    const regex = new RegExp(regexPattern);
    if (regex.test(tensorName)) {
      return false;
    }
  }
  return true;
}
function getQuantizationMultiplier(tensorName, dtype, quantConfig) {
  if (!quantConfig || !isQuantizedTensor(tensorName, quantConfig)) {
    return 1;
  }
  switch (quantConfig.quant_method) {
    case "mxfp4":
      if (dtype === "U8" && tensorName.includes("_blocks")) {
        return 2;
      }
      return 1;
    case "gptq":
    case "awq":
      if (quantConfig.bits === 4 && dtype === "U8") {
        return 2;
      }
      if (quantConfig.bits === 2 && dtype === "U8") {
        return 4;
      }
      return 1;
    case "bitsandbytes":
      if (quantConfig.load_in_4bit && dtype === "U8") {
        return 2;
      }
      if (quantConfig.load_in_8bit) {
        return 1;
      }
      return 1;
    default:
      if (quantConfig.load_in_4bit && dtype === "U8") {
        return 2;
      }
      if (quantConfig.bits === 4 && dtype === "U8") {
        return 2;
      }
      return 1;
  }
}
function computeNumOfParamsByDtypeSingleFile(header, quantConfig) {
  const counter = {};
  const tensors = omit(header, "__metadata__");
  for (const [tensorName, v] of typedEntries(tensors)) {
    if (v.shape.length === 0) {
      continue;
    }
    const elements = v.shape.reduce((a, b) => a * b);
    const multiplier = quantConfig ? getQuantizationMultiplier(tensorName, v.dtype, quantConfig) : 1;
    counter[v.dtype] = (counter[v.dtype] ?? 0) + elements * multiplier;
  }
  return counter;
}
function computeNumOfParamsByDtypeSharded(shardedMap, quantConfig) {
  const counter = {};
  for (const header of Object.values(shardedMap)) {
    for (const [k, v] of typedEntries(computeNumOfParamsByDtypeSingleFile(header, quantConfig))) {
      counter[k] = (counter[k] ?? 0) + (v ?? 0);
    }
  }
  return counter;
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

// src/lib/space-info.ts
async function spaceInfo(params) {
  const accessToken = params && checkCredentials(params);
  const search = new URLSearchParams([
    ...SPACE_EXPAND_KEYS.map((val) => ["expand", val]),
    ...params?.additionalFields?.map((val) => ["expand", val]) ?? []
  ]).toString();
  const response = await (params.fetch || fetch)(
    `${params?.hubUrl || HUB_URL}/api/spaces/${params.name}/revision/${encodeURIComponent(
      params.revision ?? "HEAD"
    )}?${search.toString()}`,
    {
      headers: {
        ...accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        Accepts: "application/json"
      }
    }
  );
  if (!response.ok) {
    throw await createApiError(response);
  }
  const data = await response.json();
  return {
    ...params?.additionalFields && pick(data, params.additionalFields),
    id: data._id,
    name: data.id,
    sdk: data.sdk,
    likes: data.likes,
    private: data.private,
    updatedAt: new Date(data.lastModified)
  };
}

// src/lib/snapshot-download.ts
var import_node_path3 = require("path");
var import_promises6 = require("fs/promises");
var DEFAULT_REVISION = "main";
async function snapshotDownload(params) {
  let cacheDir;
  if (params.cacheDir) {
    cacheDir = params.cacheDir;
  } else {
    cacheDir = getHFHubCachePath();
  }
  let revision;
  if (params.revision) {
    revision = params.revision;
  } else {
    revision = DEFAULT_REVISION;
  }
  const repoId = toRepoId(params.repo);
  let repoInfo;
  switch (repoId.type) {
    case "space":
      repoInfo = await spaceInfo({
        ...params,
        name: repoId.name,
        additionalFields: ["sha"],
        revision
      });
      break;
    case "dataset":
      repoInfo = await datasetInfo({
        ...params,
        name: repoId.name,
        additionalFields: ["sha"],
        revision
      });
      break;
    case "model":
      repoInfo = await modelInfo({
        ...params,
        name: repoId.name,
        additionalFields: ["sha"],
        revision
      });
      break;
    default:
      throw new Error(`invalid repository type ${repoId.type}`);
  }
  const commitHash = repoInfo.sha;
  const storageFolder = (0, import_node_path3.join)(cacheDir, getRepoFolderName(repoId));
  const snapshotFolder = (0, import_node_path3.join)(storageFolder, "snapshots", commitHash);
  if (revision !== commitHash) {
    const refPath = (0, import_node_path3.join)(storageFolder, "refs", revision);
    await (0, import_promises6.mkdir)((0, import_node_path3.dirname)(refPath), { recursive: true });
    await (0, import_promises6.writeFile)(refPath, commitHash);
  }
  const cursor = listFiles({
    ...params,
    repo: params.repo,
    recursive: true,
    revision: repoInfo.sha
  });
  for await (const entry of cursor) {
    switch (entry.type) {
      case "file":
        await downloadFileToCacheDir({
          ...params,
          path: entry.path,
          revision: commitHash,
          cacheDir
        });
        break;
      case "directory":
        await (0, import_promises6.mkdir)((0, import_node_path3.join)(snapshotFolder, entry.path), { recursive: true });
        break;
      default:
        throw new Error(`unknown entry type: ${entry.type}`);
    }
  }
  return snapshotFolder;
}

// src/lib/upload-file.ts
function uploadFile(params) {
  const path2 = params.file instanceof URL ? params.file.pathname.split("/").at(-1) ?? "file" : "path" in params.file ? params.file.path : params.file.name;
  return commit({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: [
      {
        operation: "addOrUpdate",
        path: path2,
        content: "content" in params.file ? params.file.content : params.file
      }
    ],
    title: params.commitTitle ?? `Add ${path2}`,
    description: params.commitDescription,
    hubUrl: params.hubUrl,
    branch: params.branch,
    isPullRequest: params.isPullRequest,
    parentCommit: params.parentCommit,
    fetch: params.fetch,
    useWebWorkers: params.useWebWorkers,
    abortSignal: params.abortSignal
  });
}

// src/lib/upload-files.ts
function uploadFiles(params) {
  return commit({
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
    fetch: params.fetch,
    useWebWorkers: params.useWebWorkers,
    abortSignal: params.abortSignal
  });
}

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

// src/lib/who-am-i.ts
async function whoAmI(params) {
  const accessToken = checkCredentials(params);
  const res = await (params.fetch ?? fetch)(`${params.hubUrl ?? HUB_URL}/api/whoami-v2`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!res.ok) {
    throw await createApiError(res);
  }
  const response = await res.json();
  if (typeof response.auth.accessToken?.createdAt === "string") {
    response.auth.accessToken.createdAt = new Date(response.auth.accessToken.createdAt);
  }
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DATASET_EXPANDABLE_KEYS,
  DATASET_EXPAND_KEYS,
  DEFAULT_REVISION,
  HUB_URL,
  HubApiError,
  InvalidApiResponseFormatError,
  MODEL_EXPANDABLE_KEYS,
  MODEL_EXPAND_KEYS,
  REGEX_COMMIT_HASH,
  REPO_ID_SEPARATOR,
  RE_SAFETENSORS_FILE,
  RE_SAFETENSORS_INDEX_FILE,
  RE_SAFETENSORS_SHARD_FILE,
  SAFETENSORS_FILE,
  SAFETENSORS_INDEX_FILE,
  SPACE_EXPANDABLE_KEYS,
  SPACE_EXPAND_KEYS,
  __internal_XetBlob,
  __internal_sha256,
  checkRepoAccess,
  commit,
  commitIter,
  countCommits,
  createBranch,
  createCollection,
  createRepo,
  datasetInfo,
  deleteBranch,
  deleteCollection,
  deleteFile,
  deleteFiles,
  deleteRepo,
  downloadFile,
  downloadFileToCacheDir,
  fileDownloadInfo,
  fileExists,
  getBlobStat,
  getHFHubCachePath,
  getRepoFolderName,
  listCollections,
  listCommits,
  listDatasets,
  listFiles,
  listModels,
  listSpaces,
  modelInfo,
  oauthHandleRedirect,
  oauthHandleRedirectIfPresent,
  oauthLoginUrl,
  parseRepoType,
  parseSafetensorsMetadata,
  parseSafetensorsShardFilename,
  pathsInfo,
  repoExists,
  scanCacheDir,
  scanCachedRepo,
  scanRefsDir,
  scanSnapshotDir,
  snapshotDownload,
  spaceInfo,
  uploadFile,
  uploadFiles,
  uploadFilesWithProgress,
  whoAmI
});
