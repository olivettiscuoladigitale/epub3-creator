export enum ZipExportType {
    // the result will be a string, the binary in a base64 form
    base64 = 'base64',
    // deprecated
    string = 'string',
    // the result will be a string in “binary” form, using 1 byte per char (2 bytes).
    binarystring = 'binarystring',
    // the result will be an Array of bytes (numbers between 0 and 255) containing the zip.
    array = 'array',
    // the result will be a Uint8Array containing the zip. This requires a compatible browser.
    uint8array = 'uint8array',
    // the result will be a ArrayBuffer containing the zip. This requires a compatible browser.
    arraybuffer = 'arraybuffer',
    // the result will be a Blob containing the zip. This requires a compatible browser.
    blob = 'blob',
    // the result will be a nodejs Buffer containing the zip. This requires nodejs
    nodebuffer = 'nodebuffer'
}