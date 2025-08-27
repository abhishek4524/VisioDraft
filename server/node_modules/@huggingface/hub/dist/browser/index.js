"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }





var _chunkGBTJQUG5js = require('./chunk-GBTJQUG5.js');

// src/consts.ts
var HUB_URL = "https://huggingface.co";

// src/error.ts
async function createApiError(response, opts) {
  var _a, _b;
  const error = new HubApiError(response.url, response.status, (_a = response.headers.get("X-Request-Id")) != null ? _a : opts == null ? void 0 : opts.requestId);
  error.message = `Api error with status ${error.statusCode}${(opts == null ? void 0 : opts.message) ? `. ${opts.message}` : ""}`;
  const trailer = [`URL: ${error.url}`, error.requestId ? `Request ID: ${error.requestId}` : void 0].filter(Boolean).join(". ");
  if ((_b = response.headers.get("Content-Type")) == null ? void 0 : _b.startsWith("application/json")) {
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
  constructor(url, statusCode, requestId, message) {
    super(message);
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "statusCode");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "url");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "requestId");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "data");
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
  var _a;
  if (params.accessToken) {
    checkAccessToken(params.accessToken);
    return params.accessToken;
  }
  if ((_a = params.credentials) == null ? void 0 : _a.accessToken) {
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
  const response = await (params.fetch || fetch)(`${(params == null ? void 0 : params.hubUrl) || HUB_URL}/api/${repoId.type}s/${repoId.name}`, {
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
    let resolve2;
    let reject;
    const p = new Promise((res, rej) => {
      resolve2 = res;
      reject = rej;
    });
    promises.push({ p, resolve: resolve2, reject });
  }
  addPromise();
  const callbackRes = Promise.resolve().then(
    () => cb(
      (y) => {
        var _a;
        addPromise();
        (_a = promises.at(-2)) == null ? void 0 : _a.resolve({ done: false, value: y });
      },
      (r) => {
        var _a;
        addPromise();
        (_a = promises.at(-2)) == null ? void 0 : _a.resolve({ done: true, value: r });
      },
      (err) => {
        var _a;
        return (_a = promises.shift()) == null ? void 0 : _a.reject(err);
      }
    )
  ).catch((err) => {
    var _a;
    return (_a = promises.shift()) == null ? void 0 : _a.reject(err);
  });
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
  const sha256Module = await Promise.resolve().then(() => _interopRequireWildcard(require("./sha256-wrapper-JCNWPRBN.js")));
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
  var _a, _b;
  yield 0;
  const maxCryptoSize = typeof (opts == null ? void 0 : opts.useWebWorker) === "object" && (opts == null ? void 0 : opts.useWebWorker.minSize) !== void 0 ? opts.useWebWorker.minSize : 1e7;
  if (buffer.size < maxCryptoSize && ((_a = globalThis.crypto) == null ? void 0 : _a.subtle)) {
    const res = hexFromBytes(
      new Uint8Array(
        await globalThis.crypto.subtle.digest("SHA-256", buffer instanceof Blob ? await buffer.arrayBuffer() : buffer)
      )
    );
    yield 1;
    return res;
  }
  if (isFrontend) {
    if (opts == null ? void 0 : opts.useWebWorker) {
      try {
        const poolSize = typeof (opts == null ? void 0 : opts.useWebWorker) === "object" ? opts.useWebWorker.poolSize : void 0;
        const worker = await getWorker(poolSize);
        let messageHandler;
        let errorHandler;
        const cleanup = () => {
          worker.removeEventListener("message", messageHandler);
          worker.removeEventListener("error", errorHandler);
        };
        return yield* eventToGenerator((yieldCallback, returnCallback, rejectCallback) => {
          var _a2, _b2;
          messageHandler = (event) => {
            var _a3;
            if (event.data.sha256) {
              cleanup();
              freeWorker(worker, poolSize);
              returnCallback(event.data.sha256);
            } else if (event.data.progress) {
              yieldCallback(event.data.progress);
              try {
                (_a3 = opts.abortSignal) == null ? void 0 : _a3.throwIfAborted();
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
          if (opts == null ? void 0 : opts.abortSignal) {
            try {
              (_a2 = opts.abortSignal) == null ? void 0 : _a2.throwIfAborted();
            } catch (err) {
              cleanup();
              destroyWorker(worker);
              rejectCallback((_b2 = opts.abortSignal.reason) != null ? _b2 : new DOMException("Aborted", "AbortError"));
              return;
            }
            const abortListener = () => {
              var _a3, _b3, _c;
              cleanup();
              destroyWorker(worker);
              rejectCallback((_b3 = (_a3 = opts.abortSignal) == null ? void 0 : _a3.reason) != null ? _b3 : new DOMException("Aborted", "AbortError"));
              (_c = opts.abortSignal) == null ? void 0 : _c.removeEventListener("abort", abortListener);
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
      wasmModule = await Promise.resolve().then(() => _interopRequireWildcard(require("./sha256-wrapper-JCNWPRBN.js")));
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
      (_b = opts == null ? void 0 : opts.abortSignal) == null ? void 0 : _b.throwIfAborted();
    }
    return sha2562.digest("hex");
  }
  if (!cryptoModule) {
    cryptoModule = await Promise.resolve().then(() => _interopRequireWildcard(require("./sha256-node-FT2Y3VXD.js")));
  }
  return yield* cryptoModule.sha256Node(buffer, { abortSignal: opts == null ? void 0 : opts.abortSignal });
}
var cryptoModule;
var wasmModule;

// src/utils/WebBlob.ts
var WebBlob = class extends Blob {
  constructor(url, start, end, contentType, full, customFetch, accessToken) {
    super([]);
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "url");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "start");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "end");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "contentType");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "full");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "fetch");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "accessToken");
    this.url = url;
    this.start = start;
    this.end = end;
    this.contentType = contentType;
    this.full = full;
    this.fetch = customFetch;
    this.accessToken = accessToken;
  }
  static async create(url, opts) {
    var _a, _b;
    const customFetch = (_a = opts == null ? void 0 : opts.fetch) != null ? _a : fetch;
    const response = await customFetch(url, {
      method: "HEAD",
      ...(opts == null ? void 0 : opts.accessToken) && {
        headers: {
          Authorization: `Bearer ${opts.accessToken}`
        }
      }
    });
    const size = Number(response.headers.get("content-length"));
    const contentType = response.headers.get("content-type") || "";
    const supportRange = response.headers.get("accept-ranges") === "bytes";
    if (!supportRange || size < ((_b = opts == null ? void 0 : opts.cacheBelow) != null ? _b : 1e6)) {
      return await (await customFetch(url)).blob();
    }
    return new WebBlob(url, 0, size, contentType, true, customFetch, opts == null ? void 0 : opts.accessToken);
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
    this.fetchRange().then((response) => {
      var _a;
      return (_a = response.body) == null ? void 0 : _a.pipeThrough(stream);
    }).catch((error) => stream.writable.abort(error.message));
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
    const blob = await WebBlob.create(url, { fetch: opts == null ? void 0 : opts.fetch, accessToken: opts == null ? void 0 : opts.accessToken });
    return [{ path: destPath, blob }];
  }
  if (isFrontend) {
    throw new TypeError(`Unsupported URL protocol "${url.protocol}"`);
  }
  if (url.protocol === "file:") {
    const { FileBlob } = await Promise.resolve().then(() => _interopRequireWildcard(require("./FileBlob-YC2EPDW4.js")));
    const { subPaths } = await Promise.resolve().then(() => _interopRequireWildcard(require("./sub-paths-RH3O65LG.js")));
    const paths = await subPaths(url, opts == null ? void 0 : opts.maxFolderDepth);
    if (paths.length === 1 && paths[0].relativePath === ".") {
      const blob = await FileBlob.create(url);
      return [{ path: destPath, blob }];
    }
    return Promise.all(
      paths.map(async (path) => ({
        path: `${destPath}/${path.relativePath}`.replace(/\/[.]$/, "").replaceAll("//", "/").replace(/^[.]?\//, ""),
        blob: await FileBlob.create(new URL(path.path))
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
  var _a, _b, _c, _d, _e, _f, _g;
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
        abortSignal == null ? void 0 : abortSignal.throwIfAborted();
        return lazyBlobs.map((blob) => ({
          ...operation,
          content: blob.blob,
          path: blob.path
        }));
      })
    )).flat(1);
    const gitAttributes = (_a = allOperations.filter(isFileOperation).find((op) => op.path === ".gitattributes")) == null ? void 0 : _a.content;
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
      abortSignal == null ? void 0 : abortSignal.throwIfAborted();
      const res = await ((_b = params.fetch) != null ? _b : fetch)(
        `${(_c = params.hubUrl) != null ? _c : HUB_URL}/api/${repoId.type}s/${repoId.name}/preupload/${encodeURIComponent(
          (_d = params.branch) != null ? _d : "main"
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
      abortSignal == null ? void 0 : abortSignal.throwIfAborted();
      const payload = {
        operation: "upload",
        // multipart is a custom protocol for HF
        transfers: ["basic", "multipart"],
        hash_algo: "sha_256",
        ...!params.isPullRequest && {
          ref: {
            name: (_e = params.branch) != null ? _e : "main"
          }
        },
        objects: operations.map((op, i) => ({
          oid: shas[i],
          size: op.content.size
        }))
      };
      const res = await ((_f = params.fetch) != null ? _f : fetch)(
        `${(_g = params.hubUrl) != null ? _g : HUB_URL}/${repoId.type === "model" ? "" : repoId.type + "s/"}${repoId.name}.git/info/lfs/objects/batch`,
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
            var _a2, _b2, _c2;
            const op = shaToOperation.get(obj.oid);
            if (!op) {
              throw new InvalidApiResponseFormatError("Unrequested object ID in response");
            }
            abortSignal == null ? void 0 : abortSignal.throwIfAborted();
            if (obj.error) {
              const errorMessage = `Error while doing LFS batch call for ${operations[shas.indexOf(obj.oid)].path}: ${obj.error.message}${batchRequestId ? ` - Request ID: ${batchRequestId}` : ""}`;
              throw new HubApiError(res.url, obj.error.code, batchRequestId, errorMessage);
            }
            if (!((_a2 = obj.actions) == null ? void 0 : _a2.upload)) {
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
            if (header == null ? void 0 : header.chunk_size) {
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
                  var _a3;
                  abortSignal == null ? void 0 : abortSignal.throwIfAborted();
                  const index = parseInt(part) - 1;
                  const slice = content.slice(index * chunkSize, (index + 1) * chunkSize);
                  const res3 = await ((_a3 = params.fetch) != null ? _a3 : fetch)(header[part], {
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
              abortSignal == null ? void 0 : abortSignal.throwIfAborted();
              const res2 = await ((_b2 = params.fetch) != null ? _b2 : fetch)(completionUrl, {
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
              const res2 = await ((_c2 = params.fetch) != null ? _c2 : fetch)(obj.actions.upload.href, {
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
    abortSignal == null ? void 0 : abortSignal.throwIfAborted();
    yield { event: "phase", phase: "committing" };
    return yield* eventToGenerator(
      async (yieldCallback, returnCallback, rejectCallback) => {
        var _a2, _b2, _c2;
        return ((_a2 = params.fetch) != null ? _a2 : fetch)(
          `${(_b2 = params.hubUrl) != null ? _b2 : HUB_URL}/api/${repoId.type}s/${repoId.name}/commit/${encodeURIComponent(
            (_c2 = params.branch) != null ? _c2 : "main"
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
        }).catch(rejectCallback);
      }
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
  var _a, _b, _c, _d;
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const url = `${(_a = params.hubUrl) != null ? _a : HUB_URL}/api/${repoId.type}s/${repoId.name}/commits/${(_b = params.revision) != null ? _b : "main"}?limit=1`;
  const res = await ((_c = params.fetch) != null ? _c : fetch)(url, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  });
  if (!res.ok) {
    throw await createApiError(res);
  }
  return parseInt((_d = res.headers.get("x-total-count")) != null ? _d : "0", 10);
}

// src/lib/create-repo.ts
async function createRepo(params) {
  var _a, _b;
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const [namespace, repoName] = repoId.name.split("/");
  if (!namespace || !repoName) {
    throw new TypeError(
      `"${repoId.name}" is not a fully qualified repo name. It should be of the form "{namespace}/{repoName}".`
    );
  }
  const res = await ((_a = params.fetch) != null ? _a : fetch)(`${(_b = params.hubUrl) != null ? _b : HUB_URL}/api/repos/create`, {
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
  var _a, _b;
  const repoId = toRepoId(params.repo);
  const res = await ((_a = params.fetch) != null ? _a : fetch)(
    `${(_b = params.hubUrl) != null ? _b : HUB_URL}/api/${repoId.type}s/${repoId.name}/branch/${encodeURIComponent(params.branch)}`,
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
  var _a, _b;
  const accessToken = checkCredentials(params);
  const res = await ((_a = params.fetch) != null ? _a : fetch)(`${(_b = params.hubUrl) != null ? _b : HUB_URL}/api/collections`, {
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const accessToken = params && checkCredentials(params);
  let totalToFetch = (_a = params == null ? void 0 : params.limit) != null ? _a : Infinity;
  const search = new URLSearchParams([
    ...Object.entries({
      limit: String(Math.min(totalToFetch, 500)),
      ...((_b = params == null ? void 0 : params.search) == null ? void 0 : _b.owner) ? { author: params.search.owner } : void 0,
      ...((_c = params == null ? void 0 : params.search) == null ? void 0 : _c.query) ? { search: params.search.query } : void 0
    }),
    ...(_f = (_e = (_d = params == null ? void 0 : params.search) == null ? void 0 : _d.tags) == null ? void 0 : _e.map((tag) => ["filter", tag])) != null ? _f : [],
    ...DATASET_EXPAND_KEYS.map((val) => ["expand", val]),
    ...(_h = (_g = params == null ? void 0 : params.additionalFields) == null ? void 0 : _g.map((val) => ["expand", val])) != null ? _h : []
  ]).toString();
  let url = `${(params == null ? void 0 : params.hubUrl) || HUB_URL}/api/datasets` + (search ? "?" + search : "");
  while (url) {
    const res = await ((_i = params == null ? void 0 : params.fetch) != null ? _i : fetch)(url, {
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
        ...(params == null ? void 0 : params.additionalFields) && pick(item, params.additionalFields),
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
  var _a, _b, _c;
  const accessToken = params && checkCredentials(params);
  const search = new URLSearchParams([
    ...DATASET_EXPAND_KEYS.map((val) => ["expand", val]),
    ...(_b = (_a = params == null ? void 0 : params.additionalFields) == null ? void 0 : _a.map((val) => ["expand", val])) != null ? _b : []
  ]).toString();
  const response = await (params.fetch || fetch)(
    `${(params == null ? void 0 : params.hubUrl) || HUB_URL}/api/datasets/${params.name}/revision/${encodeURIComponent(
      (_c = params.revision) != null ? _c : "HEAD"
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
    ...(params == null ? void 0 : params.additionalFields) && pick(data, params.additionalFields),
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
  var _a, _b;
  const repoId = toRepoId(params.repo);
  const res = await ((_a = params.fetch) != null ? _a : fetch)(
    `${(_b = params.hubUrl) != null ? _b : HUB_URL}/api/${repoId.type}s/${repoId.name}/branch/${encodeURIComponent(params.branch)}`,
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
  var _a;
  return commit({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: [
      {
        operation: "delete",
        path: params.path
      }
    ],
    title: (_a = params.commitTitle) != null ? _a : `Delete ${params.path}`,
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
  var _a;
  return commit({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: params.paths.map((path) => ({
      operation: "delete",
      path
    })),
    title: (_a = params.commitTitle) != null ? _a : `Deletes ${params.paths.length} files`,
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
  var _a, _b;
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const [namespace, repoName] = repoId.name.split("/");
  const res = await ((_a = params.fetch) != null ? _a : fetch)(`${(_b = params.hubUrl) != null ? _b : HUB_URL}/api/repos/delete`, {
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
  var _a, _b;
  const accessToken = checkCredentials(params);
  const res = await ((_a = params.fetch) != null ? _a : fetch)(`${(_b = params.hubUrl) != null ? _b : HUB_URL}/api/collections/${params.slug}`, {
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
  constructor() {
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "ranges", []);
  }
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
var _clone, clone_fn, _reconstructionInfoPromise, _loadReconstructionInfo, loadReconstructionInfo_fn, _fetch, fetch_fn;
var _XetBlob = class extends Blob {
  constructor(params) {
    var _a, _b;
    super([]);
    _chunkGBTJQUG5js.__privateAdd.call(void 0, this, _clone);
    _chunkGBTJQUG5js.__privateAdd.call(void 0, this, _loadReconstructionInfo);
    _chunkGBTJQUG5js.__privateAdd.call(void 0, this, _fetch);
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "fetch");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "accessToken");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "refreshUrl");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "reconstructionUrl");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "hash");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "start", 0);
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "end", 0);
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "internalLogging", false);
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "reconstructionInfo");
    _chunkGBTJQUG5js.__publicField.call(void 0, this, "listener");
    _chunkGBTJQUG5js.__privateAdd.call(void 0, this, _reconstructionInfoPromise, void 0);
    this.fetch = (_a = params.fetch) != null ? _a : fetch.bind(globalThis);
    this.accessToken = checkCredentials(params);
    this.refreshUrl = params.refreshUrl;
    this.end = params.size;
    this.reconstructionUrl = params.reconstructionUrl;
    this.hash = params.hash;
    this.listener = params.listener;
    this.internalLogging = (_b = params.internalLogging) != null ? _b : false;
    this.refreshUrl;
  }
  get size() {
    return this.end - this.start;
  }
  slice(start = 0, end = this.size) {
    if (start < 0 || end < 0) {
      new TypeError("Unsupported negative start/end on XetBlob.slice");
    }
    const slice = _chunkGBTJQUG5js.__privateMethod.call(void 0, this, _clone, clone_fn).call(this);
    slice.start = this.start + start;
    slice.end = Math.min(this.start + end, this.end);
    if (slice.start !== this.start || slice.end !== this.end) {
      slice.reconstructionInfo = void 0;
    }
    return slice;
  }
  async arrayBuffer() {
    const result = await _chunkGBTJQUG5js.__privateMethod.call(void 0, this, _fetch, fetch_fn).call(this);
    return new Response(result).arrayBuffer();
  }
  async text() {
    const result = await _chunkGBTJQUG5js.__privateMethod.call(void 0, this, _fetch, fetch_fn).call(this);
    return new Response(result).text();
  }
  async response() {
    const result = await _chunkGBTJQUG5js.__privateMethod.call(void 0, this, _fetch, fetch_fn).call(this);
    return new Response(result);
  }
  stream() {
    const stream = new TransformStream();
    _chunkGBTJQUG5js.__privateMethod.call(void 0, this, _fetch, fetch_fn).call(this).then((response) => response.pipeThrough(stream)).catch((error) => stream.writable.abort(error.message));
    return stream.readable;
  }
};
var XetBlob = _XetBlob;
_clone = new WeakSet();
clone_fn = function() {
  const blob = new _XetBlob({
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
};
_reconstructionInfoPromise = new WeakMap();
_loadReconstructionInfo = new WeakSet();
loadReconstructionInfo_fn = function() {
  if (_chunkGBTJQUG5js.__privateGet.call(void 0, this, _reconstructionInfoPromise)) {
    return _chunkGBTJQUG5js.__privateGet.call(void 0, this, _reconstructionInfoPromise);
  }
  _chunkGBTJQUG5js.__privateSet.call(void 0, this, _reconstructionInfoPromise, (async () => {
    var _a;
    const connParams = await getAccessToken(this.accessToken, this.fetch, this.refreshUrl);
    const resp = await this.fetch((_a = this.reconstructionUrl) != null ? _a : `${connParams.casUrl}/v1/reconstruction/${this.hash}`, {
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
  })().finally(() => _chunkGBTJQUG5js.__privateSet.call(void 0, this, _reconstructionInfoPromise, void 0)));
  return _chunkGBTJQUG5js.__privateGet.call(void 0, this, _reconstructionInfoPromise);
};
_fetch = new WeakSet();
fetch_fn = async function() {
  if (!this.reconstructionInfo) {
    await _chunkGBTJQUG5js.__privateMethod.call(void 0, this, _loadReconstructionInfo, loadReconstructionInfo_fn).call(this);
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
    var _a, _b, _c, _d;
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
                listener == null ? void 0 : listener({ event: "progress", progress: { read: totalBytesRead, total: maxBytes } });
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
      const reader = (_a = resp.body) == null ? void 0 : _a.getReader();
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
          listener == null ? void 0 : listener({ event: "read" });
          done = result.done;
          log("read", (_b = result.value) == null ? void 0 : _b.byteLength, "bytes", "total read", totalBytesRead, "toSkip", readBytesToSkip);
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
                `Unsupported compression scheme ${(_c = compressionSchemeLabels[chunkHeader.compression_scheme]) != null ? _c : chunkHeader.compression_scheme}`
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
              (_d = range2.data) != null ? _d : range2.data = [];
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
                listener == null ? void 0 : listener({ event: "progress", progress: { read: totalBytesRead, total: maxBytes } });
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
    _chunkGBTJQUG5js.__privateMethod.call(void 0, this, _loadReconstructionInfo, loadReconstructionInfo_fn).bind(this)
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const hubUrl = (_a = params.hubUrl) != null ? _a : HUB_URL;
  const url = `${hubUrl}/${repoId.type === "model" ? "" : `${repoId.type}s/`}${repoId.name}/${params.raw ? "raw" : "resolve"}/${encodeURIComponent((_b = params.revision) != null ? _b : "main")}/${params.path}` + (params.noContentDisposition ? "?noContentDisposition=1" : "");
  const resp = await ((_c = params.fetch) != null ? _c : fetch)(url, {
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
  if ((_d = resp.headers.get("Content-Type")) == null ? void 0 : _d.includes("application/vnd.xet-fileinfo+json")) {
    size = parseInt((_e = resp.headers.get("X-Linked-Size")) != null ? _e : "invalid");
    if (isNaN(size)) {
      throw new InvalidApiResponseFormatError("Invalid file size received in X-Linked-Size header");
    }
    const hash2 = resp.headers.get("X-Xet-Hash");
    const links = parseLinkHeader((_f = resp.headers.get("Link")) != null ? _f : "");
    const reconstructionUrl = (() => {
      try {
        return new URL(links["xet-reconstruction-info"]);
      } catch (e) {
        return null;
      }
    })();
    const refreshUrl = (() => {
      try {
        return new URL(links["xet-auth"]);
      } catch (e) {
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
  const etag = (_h = (_g = resp.headers.get("X-Linked-ETag")) != null ? _g : resp.headers.get("ETag")) != null ? _h : void 0;
  if (!etag) {
    throw new InvalidApiResponseFormatError("Expected ETag");
  }
  return {
    etag,
    size,
    xet: xetInfo,
    // Cannot use resp.url in case it's a S3 url and the user adds an Authorization header to it.
    url: resp.url && (new URL(resp.url).origin === new URL(hubUrl).origin || ((_i = resp.headers.get("X-Cache")) == null ? void 0 : _i.endsWith(" cloudfront"))) ? resp.url : url
  };
}

// src/lib/download-file.ts
async function downloadFile(params) {
  var _a, _b;
  const accessToken = checkCredentials(params);
  const info = (_a = params.downloadInfo) != null ? _a : await fileDownloadInfo({
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
  return new WebBlob(new URL(info.url), 0, info.size, "", true, (_b = params.fetch) != null ? _b : fetch, accessToken);
}

// src/lib/file-exists.ts
async function fileExists(params) {
  var _a, _b, _c;
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const hubUrl = (_a = params.hubUrl) != null ? _a : HUB_URL;
  const url = `${hubUrl}/${repoId.type === "model" ? "" : `${repoId.type}s/`}${repoId.name}/raw/${encodeURIComponent(
    (_b = params.revision) != null ? _b : "main"
  )}/${params.path}`;
  const resp = await ((_c = params.fetch) != null ? _c : fetch)(url, {
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
  var _a, _b, _c, _d;
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  let url = `${(_a = params.hubUrl) != null ? _a : HUB_URL}/api/${repoId.type}s/${repoId.name}/commits/${(_b = params.revision) != null ? _b : "main"}?limit=${(_c = params.batchSize) != null ? _c : 100}`;
  while (url) {
    const res = await ((_d = params.fetch) != null ? _d : fetch)(url, {
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
  var _a;
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  let url = `${params.hubUrl || HUB_URL}/api/${repoId.type}s/${repoId.name}/tree/${params.revision || "main"}${params.path ? "/" + params.path : ""}?recursive=${!!params.recursive}&expand=${!!params.expand}`;
  while (url) {
    const res = await ((_a = params.fetch) != null ? _a : fetch)(url, {
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const accessToken = params && checkCredentials(params);
  let totalToFetch = (_a = params == null ? void 0 : params.limit) != null ? _a : Infinity;
  const search = new URLSearchParams([
    ...Object.entries({
      limit: String(Math.min(totalToFetch, 500)),
      ...((_b = params == null ? void 0 : params.search) == null ? void 0 : _b.owner) ? { author: params.search.owner } : void 0,
      ...((_c = params == null ? void 0 : params.search) == null ? void 0 : _c.task) ? { pipeline_tag: params.search.task } : void 0,
      ...((_d = params == null ? void 0 : params.search) == null ? void 0 : _d.query) ? { search: params.search.query } : void 0,
      ...((_e = params == null ? void 0 : params.search) == null ? void 0 : _e.inferenceProviders) ? { inference_provider: params.search.inferenceProviders.join(",") } : void 0
    }),
    ...(_h = (_g = (_f = params == null ? void 0 : params.search) == null ? void 0 : _f.tags) == null ? void 0 : _g.map((tag) => ["filter", tag])) != null ? _h : [],
    ...MODEL_EXPAND_KEYS.map((val) => ["expand", val]),
    ...(_j = (_i = params == null ? void 0 : params.additionalFields) == null ? void 0 : _i.map((val) => ["expand", val])) != null ? _j : []
  ]).toString();
  let url = `${(params == null ? void 0 : params.hubUrl) || HUB_URL}/api/models?${search}`;
  while (url) {
    const res = await ((_k = params == null ? void 0 : params.fetch) != null ? _k : fetch)(url, {
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
      if (((_l = params == null ? void 0 : params.additionalFields) == null ? void 0 : _l.includes("inferenceProviderMapping")) && item.inferenceProviderMapping) {
        normalizedItem.inferenceProviderMapping = normalizeInferenceProviderMapping(
          item.id,
          item.inferenceProviderMapping
        );
      }
      yield {
        ...(params == null ? void 0 : params.additionalFields) && pick(normalizedItem, params.additionalFields),
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
  var _a, _b, _c, _d, _e, _f, _g;
  const accessToken = params && checkCredentials(params);
  const search = new URLSearchParams([
    ...Object.entries({
      limit: "500",
      ...((_a = params == null ? void 0 : params.search) == null ? void 0 : _a.owner) ? { author: params.search.owner } : void 0,
      ...((_b = params == null ? void 0 : params.search) == null ? void 0 : _b.query) ? { search: params.search.query } : void 0
    }),
    ...(_e = (_d = (_c = params == null ? void 0 : params.search) == null ? void 0 : _c.tags) == null ? void 0 : _d.map((tag) => ["filter", tag])) != null ? _e : [],
    ...[...SPACE_EXPAND_KEYS, ...(_f = params == null ? void 0 : params.additionalFields) != null ? _f : []].map(
      (val) => ["expand", val]
    )
  ]).toString();
  let url = `${(params == null ? void 0 : params.hubUrl) || HUB_URL}/api/spaces?${search}`;
  while (url) {
    const res = await ((_g = params == null ? void 0 : params.fetch) != null ? _g : fetch)(url, {
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
        ...(params == null ? void 0 : params.additionalFields) && pick(item, params.additionalFields),
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
  var _a, _b, _c, _d, _e;
  const accessToken = params && checkCredentials(params);
  const searchParams = new URLSearchParams();
  let totalToFetch = (_a = params == null ? void 0 : params.limit) != null ? _a : Infinity;
  searchParams.append("limit", String(Math.min(totalToFetch, 100)));
  if (params == null ? void 0 : params.sort) {
    searchParams.append("sort", params.sort);
  }
  if ((_b = params == null ? void 0 : params.search) == null ? void 0 : _b.owner) {
    for (const owner of params.search.owner) {
      searchParams.append("owner", owner);
    }
  }
  if ((_c = params == null ? void 0 : params.search) == null ? void 0 : _c.item) {
    for (const item of params.search.item) {
      searchParams.append("item", item);
    }
  }
  if ((_d = params == null ? void 0 : params.search) == null ? void 0 : _d.q) {
    searchParams.append("q", params.search.q);
  }
  let url = `${(params == null ? void 0 : params.hubUrl) || HUB_URL}/api/collections?${searchParams}`;
  while (url) {
    const res = await ((_e = params == null ? void 0 : params.fetch) != null ? _e : fetch)(url, {
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
  var _a, _b, _c, _d;
  const accessToken = params && checkCredentials(params);
  const search = new URLSearchParams([
    ...MODEL_EXPAND_KEYS.map((val) => ["expand", val]),
    ...(_b = (_a = params == null ? void 0 : params.additionalFields) == null ? void 0 : _a.map((val) => ["expand", val])) != null ? _b : []
  ]).toString();
  const response = await (params.fetch || fetch)(
    `${(params == null ? void 0 : params.hubUrl) || HUB_URL}/api/models/${params.name}/revision/${encodeURIComponent(
      (_c = params.revision) != null ? _c : "HEAD"
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
  if (((_d = params == null ? void 0 : params.additionalFields) == null ? void 0 : _d.includes("inferenceProviderMapping")) && data.inferenceProviderMapping) {
    normalizedData.inferenceProviderMapping = normalizeInferenceProviderMapping(data.id, data.inferenceProviderMapping);
  }
  return {
    ...(params == null ? void 0 : params.additionalFields) && pick(normalizedData, params.additionalFields),
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
  var _a, _b, _c;
  if (typeof window === "undefined" && !(opts == null ? void 0 : opts.redirectedUrl)) {
    throw new Error("oauthHandleRedirect is only available in the browser, unless you provide redirectedUrl");
  }
  if (typeof localStorage === "undefined" && (!(opts == null ? void 0 : opts.nonce) || !(opts == null ? void 0 : opts.codeVerifier))) {
    throw new Error(
      "oauthHandleRedirect requires localStorage to be available, unless you provide nonce and codeVerifier"
    );
  }
  const redirectedUrl = (_a = opts == null ? void 0 : opts.redirectedUrl) != null ? _a : window.location.href;
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
  const nonce = (_b = opts == null ? void 0 : opts.nonce) != null ? _b : localStorage.getItem("huggingface.co:oauth:nonce");
  if (!code) {
    throw new Error("Missing oauth code from query parameters in redirected URL: " + redirectedUrl);
  }
  if (!nonce) {
    throw new Error("Missing oauth nonce from localStorage");
  }
  const codeVerifier = (_c = opts == null ? void 0 : opts.codeVerifier) != null ? _c : localStorage.getItem("huggingface.co:oauth:code_verifier");
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
  } catch (e) {
    throw new Error("Invalid oauth state in redirected URL, unable to parse JSON: " + state);
  }
  if (parsedState.nonce !== nonce) {
    throw new Error("Invalid oauth state in redirected URL");
  }
  const hubUrl = (opts == null ? void 0 : opts.hubUrl) || HUB_URL;
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
  if (!(opts == null ? void 0 : opts.codeVerifier)) {
    localStorage.removeItem("huggingface.co:oauth:code_verifier");
  }
  if (!(opts == null ? void 0 : opts.nonce)) {
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
  var _a;
  if (typeof window === "undefined" && !(opts == null ? void 0 : opts.redirectedUrl)) {
    throw new Error("oauthHandleRedirect is only available in the browser, unless you provide redirectedUrl");
  }
  if (typeof localStorage === "undefined" && (!(opts == null ? void 0 : opts.nonce) || !(opts == null ? void 0 : opts.codeVerifier))) {
    throw new Error(
      "oauthHandleRedirect requires localStorage to be available, unless you provide nonce and codeVerifier"
    );
  }
  const searchParams = new URLSearchParams((_a = opts == null ? void 0 : opts.redirectedUrl) != null ? _a : window.location.search);
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
  var _a, _b;
  if (typeof window === "undefined" && (!(opts == null ? void 0 : opts.redirectUrl) || !(opts == null ? void 0 : opts.clientId))) {
    throw new Error("oauthLogin is only available in the browser, unless you provide clientId and redirectUrl");
  }
  if (typeof localStorage === "undefined" && !(opts == null ? void 0 : opts.localStorage)) {
    throw new Error(
      "oauthLogin requires localStorage to be available in the context, unless you provide a localStorage empty object as argument"
    );
  }
  const hubUrl = (opts == null ? void 0 : opts.hubUrl) || HUB_URL;
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
  if (opts == null ? void 0 : opts.localStorage) {
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
  const redirectUri = (opts == null ? void 0 : opts.redirectUrl) || (typeof window !== "undefined" ? window.location.href : void 0);
  if (!redirectUri) {
    throw new Error("Missing redirectUrl");
  }
  const state = JSON.stringify({
    nonce: newNonce,
    redirectUri,
    state: opts == null ? void 0 : opts.state
  });
  const variables = (
    // @ts-expect-error window.huggingface is defined inside static Spaces.
    typeof window !== "undefined" ? (_b = (_a = window.huggingface) == null ? void 0 : _a.variables) != null ? _b : null : null
  );
  const clientId = (opts == null ? void 0 : opts.clientId) || (variables == null ? void 0 : variables.OAUTH_CLIENT_ID);
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
    scope: (opts == null ? void 0 : opts.scopes) || (variables == null ? void 0 : variables.OAUTH_SCOPES) || "openid profile",
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
async function parseSingleFile(path, params) {
  const blob = await downloadFile({ ...params, path });
  if (!blob) {
    throw new SafetensorParseError(`Failed to parse file ${path}: failed to fetch safetensors header length.`);
  }
  const bufLengthOfHeaderLE = await blob.slice(0, 8).arrayBuffer();
  const lengthOfHeader = new DataView(bufLengthOfHeaderLE).getBigUint64(0, true);
  if (lengthOfHeader <= 0) {
    throw new SafetensorParseError(`Failed to parse file ${path}: safetensors header is malformed.`);
  }
  if (lengthOfHeader > MAX_HEADER_LENGTH) {
    throw new SafetensorParseError(
      `Failed to parse file ${path}: safetensor header is too big. Maximum supported size is ${MAX_HEADER_LENGTH} bytes.`
    );
  }
  try {
    const header = JSON.parse(await blob.slice(8, 8 + Number(lengthOfHeader)).text());
    return header;
  } catch (err) {
    throw new SafetensorParseError(`Failed to parse file ${path}: safetensors header is not valid JSON.`);
  }
}
async function parseShardedIndex(path, params) {
  const indexBlob = await downloadFile({
    ...params,
    path
  });
  if (!indexBlob) {
    throw new SafetensorParseError(`Failed to parse file ${path}: failed to fetch safetensors index.`);
  }
  try {
    const index = JSON.parse(await indexBlob.slice(0, 1e7).text());
    return index;
  } catch (error) {
    throw new SafetensorParseError(`Failed to parse file ${path}: not a valid JSON.`);
  }
}
async function fetchAllHeaders(path, index, params) {
  const pathPrefix = path.slice(0, path.lastIndexOf("/") + 1);
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
  var _a, _b, _c;
  const repoId = toRepoId(params.repo);
  if (repoId.type !== "model") {
    throw new TypeError("Only model repos should contain safetensors files.");
  }
  const modelConfig = params.computeParametersCount ? await fetchModelConfig(params) : null;
  const quantConfig = modelConfig == null ? void 0 : modelConfig.quantization_config;
  if (params.path && RE_SAFETENSORS_FILE.test(params.path) || await fileExists({ ...params, path: SAFETENSORS_FILE })) {
    const header = await parseSingleFile((_a = params.path) != null ? _a : SAFETENSORS_FILE, params);
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
    const path = (_b = params.path) != null ? _b : SAFETENSORS_INDEX_FILE;
    const index = await parseShardedIndex(path, params);
    const shardedMap = await fetchAllHeaders(path, index, params);
    return {
      sharded: true,
      index,
      headers: shardedMap,
      ...params.computeParametersCount ? {
        parameterCount: computeNumOfParamsByDtypeSharded(shardedMap, quantConfig),
        parameterTotal: (
          /// shortcut: get param count directly from metadata
          ((_c = index.metadata) == null ? void 0 : _c.total_parameters) ? typeof index.metadata.total_parameters === "number" ? index.metadata.total_parameters : typeof index.metadata.total_parameters === "string" ? parseInt(index.metadata.total_parameters) : void 0 : void 0
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
  var _a;
  const counter = {};
  const tensors = omit(header, "__metadata__");
  for (const [tensorName, v] of typedEntries(tensors)) {
    if (v.shape.length === 0) {
      continue;
    }
    const elements = v.shape.reduce((a, b) => a * b);
    const multiplier = quantConfig ? getQuantizationMultiplier(tensorName, v.dtype, quantConfig) : 1;
    counter[v.dtype] = ((_a = counter[v.dtype]) != null ? _a : 0) + elements * multiplier;
  }
  return counter;
}
function computeNumOfParamsByDtypeSharded(shardedMap, quantConfig) {
  var _a;
  const counter = {};
  for (const header of Object.values(shardedMap)) {
    for (const [k, v] of typedEntries(computeNumOfParamsByDtypeSingleFile(header, quantConfig))) {
      counter[k] = ((_a = counter[k]) != null ? _a : 0) + (v != null ? v : 0);
    }
  }
  return counter;
}

// src/lib/paths-info.ts
async function pathsInfo(params) {
  var _a, _b, _c;
  const accessToken = checkCredentials(params);
  const repoId = toRepoId(params.repo);
  const hubUrl = (_a = params.hubUrl) != null ? _a : HUB_URL;
  const url = `${hubUrl}/api/${repoId.type}s/${repoId.name}/paths-info/${encodeURIComponent(
    (_b = params.revision) != null ? _b : "main"
  )}`;
  const resp = await ((_c = params.fetch) != null ? _c : fetch)(url, {
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

// src/lib/repo-exists.ts
async function repoExists(params) {
  var _a, _b;
  const repoId = toRepoId(params.repo);
  const res = await ((_a = params.fetch) != null ? _a : fetch)(
    `${(_b = params.hubUrl) != null ? _b : HUB_URL}/api/${repoId.type}s/${repoId.name}?expand[]=likes`,
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
  var _a, _b, _c;
  const accessToken = params && checkCredentials(params);
  const search = new URLSearchParams([
    ...SPACE_EXPAND_KEYS.map((val) => ["expand", val]),
    ...(_b = (_a = params == null ? void 0 : params.additionalFields) == null ? void 0 : _a.map((val) => ["expand", val])) != null ? _b : []
  ]).toString();
  const response = await (params.fetch || fetch)(
    `${(params == null ? void 0 : params.hubUrl) || HUB_URL}/api/spaces/${params.name}/revision/${encodeURIComponent(
      (_c = params.revision) != null ? _c : "HEAD"
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
    ...(params == null ? void 0 : params.additionalFields) && pick(data, params.additionalFields),
    id: data._id,
    name: data.id,
    sdk: data.sdk,
    likes: data.likes,
    private: data.private,
    updatedAt: new Date(data.lastModified)
  };
}

// src/lib/upload-file.ts
function uploadFile(params) {
  var _a, _b;
  const path = params.file instanceof URL ? (_a = params.file.pathname.split("/").at(-1)) != null ? _a : "file" : "path" in params.file ? params.file.path : params.file.name;
  return commit({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: [
      {
        operation: "addOrUpdate",
        path,
        content: "content" in params.file ? params.file.content : params.file
      }
    ],
    title: (_b = params.commitTitle) != null ? _b : `Add ${path}`,
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
  var _a;
  return commit({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: params.files.map((file) => {
      var _a2;
      return {
        operation: "addOrUpdate",
        path: file instanceof URL ? (_a2 = file.pathname.split("/").at(-1)) != null ? _a2 : "file" : "path" in file ? file.path : file.name,
        content: "content" in file ? file.content : file
      };
    }),
    title: (_a = params.commitTitle) != null ? _a : `Add ${params.files.length} files`,
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
  var _a;
  return yield* commitIter({
    ...params.accessToken ? { accessToken: params.accessToken } : { credentials: params.credentials },
    repo: params.repo,
    operations: params.files.map((file) => {
      var _a2;
      return {
        operation: "addOrUpdate",
        path: file instanceof URL ? (_a2 = file.pathname.split("/").at(-1)) != null ? _a2 : "file" : "path" in file ? file.path : file.name,
        content: "content" in file ? file.content : file
      };
    }),
    title: (_a = params.commitTitle) != null ? _a : `Add ${params.files.length} files`,
    description: params.commitDescription,
    hubUrl: params.hubUrl,
    branch: params.branch,
    isPullRequest: params.isPullRequest,
    parentCommit: params.parentCommit,
    useWebWorkers: params.useWebWorkers,
    abortSignal: params.abortSignal,
    fetch: async (input, init) => {
      var _a2;
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
      (_a2 = init.signal) == null ? void 0 : _a2.throwIfAborted();
      xhr.send(init.body);
      return new Promise((resolve2, reject) => {
        xhr.addEventListener("load", () => {
          resolve2(
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
            var _a3;
            xhr.abort();
            try {
              (_a3 = init.signal) == null ? void 0 : _a3.throwIfAborted();
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
  var _a, _b, _c;
  const accessToken = checkCredentials(params);
  const res = await ((_a = params.fetch) != null ? _a : fetch)(`${(_b = params.hubUrl) != null ? _b : HUB_URL}/api/whoami-v2`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!res.ok) {
    throw await createApiError(res);
  }
  const response = await res.json();
  if (typeof ((_c = response.auth.accessToken) == null ? void 0 : _c.createdAt) === "string") {
    response.auth.accessToken.createdAt = new Date(response.auth.accessToken.createdAt);
  }
  return response;
}




















































exports.DATASET_EXPANDABLE_KEYS = DATASET_EXPANDABLE_KEYS; exports.DATASET_EXPAND_KEYS = DATASET_EXPAND_KEYS; exports.HUB_URL = HUB_URL; exports.HubApiError = HubApiError; exports.InvalidApiResponseFormatError = InvalidApiResponseFormatError; exports.MODEL_EXPANDABLE_KEYS = MODEL_EXPANDABLE_KEYS; exports.MODEL_EXPAND_KEYS = MODEL_EXPAND_KEYS; exports.RE_SAFETENSORS_FILE = RE_SAFETENSORS_FILE; exports.RE_SAFETENSORS_INDEX_FILE = RE_SAFETENSORS_INDEX_FILE; exports.RE_SAFETENSORS_SHARD_FILE = RE_SAFETENSORS_SHARD_FILE; exports.SAFETENSORS_FILE = SAFETENSORS_FILE; exports.SAFETENSORS_INDEX_FILE = SAFETENSORS_INDEX_FILE; exports.SPACE_EXPANDABLE_KEYS = SPACE_EXPANDABLE_KEYS; exports.SPACE_EXPAND_KEYS = SPACE_EXPAND_KEYS; exports.__internal_XetBlob = XetBlob; exports.__internal_sha256 = sha256; exports.checkRepoAccess = checkRepoAccess; exports.commit = commit; exports.commitIter = commitIter; exports.countCommits = countCommits; exports.createBranch = createBranch; exports.createCollection = createCollection; exports.createRepo = createRepo; exports.datasetInfo = datasetInfo; exports.deleteBranch = deleteBranch; exports.deleteCollection = deleteCollection; exports.deleteFile = deleteFile; exports.deleteFiles = deleteFiles; exports.deleteRepo = deleteRepo; exports.downloadFile = downloadFile; exports.fileDownloadInfo = fileDownloadInfo; exports.fileExists = fileExists; exports.listCollections = listCollections; exports.listCommits = listCommits; exports.listDatasets = listDatasets; exports.listFiles = listFiles; exports.listModels = listModels; exports.listSpaces = listSpaces; exports.modelInfo = modelInfo; exports.oauthHandleRedirect = oauthHandleRedirect; exports.oauthHandleRedirectIfPresent = oauthHandleRedirectIfPresent; exports.oauthLoginUrl = oauthLoginUrl; exports.parseSafetensorsMetadata = parseSafetensorsMetadata; exports.parseSafetensorsShardFilename = parseSafetensorsShardFilename; exports.pathsInfo = pathsInfo; exports.repoExists = repoExists; exports.spaceInfo = spaceInfo; exports.uploadFile = uploadFile; exports.uploadFiles = uploadFiles; exports.uploadFilesWithProgress = uploadFilesWithProgress; exports.whoAmI = whoAmI;
