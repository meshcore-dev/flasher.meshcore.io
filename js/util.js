export function delay(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export function toSlug(text) {
  return String(text).toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function fetchJson(url) {
  const absoluteUrl = new URL(url, location.origin);
  if(absoluteUrl.protocol !== 'https:') {
    throw new Error(`Refusing to load ${url} over an insecure (non-HTTPS) connection.`);
  }

  const res = await fetch(absoluteUrl);
  if(!res.ok) throw new Error(`Could not load ${url}: HTTP ${res.status}`);

  return await res.json();
}

// esptool.js expects firmware as a "binary string" (one char per byte)
export async function blobToBinaryString(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const chunkSize = 0x8000;
  let binString = '';

  for(let i = 0; i < bytes.length; i += chunkSize) {
    binString += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return binString;
}
