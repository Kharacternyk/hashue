export const toHex = (bytes) =>
  [/* because bytes is an Uint8Array */ ...bytes]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
