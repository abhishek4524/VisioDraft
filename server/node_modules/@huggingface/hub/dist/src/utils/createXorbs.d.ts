/**
 * Todo: add dedup: we actually need to remember chunks already written, and not add them to the xorb, and also
 *  take that into account for file reconstruction
 * Todo: byte grouping?
 */
export declare function createXorbs(fileSource: Blob): AsyncGenerator<{
    xorb: Uint8Array;
    hash: string;
}, void, undefined>;
//# sourceMappingURL=createXorbs.d.ts.map