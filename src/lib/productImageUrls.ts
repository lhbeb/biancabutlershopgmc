const BUCKET = 'product-images';
const STORAGE_MARKER = `/storage/v1/object/public/${BUCKET}/`;
const PROXY_MARKER = '/api/product-images/';
const SITE_ORIGIN = 'https://biancabutler.shop';

export function encodeStoragePath(path: string): string {
  return path
    .split('/')
    .filter(Boolean)
    .map(segment => encodeURIComponent(segment))
    .join('/');
}

export function extractProductImageStoragePath(value: string): string | null {
  if (!value || typeof value !== 'string') return null;

  if (value.startsWith(PROXY_MARKER)) {
    return decodeURIComponent(value.slice(PROXY_MARKER.length));
  }

  try {
    const url = new URL(value);
    const proxyIndex = url.pathname.indexOf(PROXY_MARKER);
    if (proxyIndex >= 0) {
      return decodeURIComponent(url.pathname.slice(proxyIndex + PROXY_MARKER.length));
    }

    const storageIndex = url.pathname.indexOf(STORAGE_MARKER);
    if (storageIndex >= 0) {
      return decodeURIComponent(url.pathname.slice(storageIndex + STORAGE_MARKER.length));
    }
  } catch {
    const storageIndex = value.indexOf(STORAGE_MARKER);
    if (storageIndex >= 0) {
      return decodeURIComponent(value.slice(storageIndex + STORAGE_MARKER.length));
    }
  }

  return null;
}

export function productImageStorageUrl(storagePath: string): string {
  return `${SITE_ORIGIN}${PROXY_MARKER}${encodeStoragePath(storagePath)}`;
}

export function toBiancaButlerProductImageUrl(value: string): string {
  const storagePath = extractProductImageStoragePath(value);
  if (!storagePath) return value;

  return productImageStorageUrl(storagePath);
}
