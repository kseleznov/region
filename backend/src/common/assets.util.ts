/**
 * Turns a stored asset key into an absolute URL the client can load.
 *
 * Place and city photos are stored in the DB as relative keys
 * (`places/couvent/1.jpg`) and served as static files under `/static`.
 * Anything already absolute (old external links, avatars) is passed through
 * untouched, so the migration to self-hosted images can be gradual.
 */
const ASSET_BASE_URL = process.env.ASSET_BASE_URL ?? 'http://localhost:3001';

export function toAssetUrl(value: string): string {
  if (!value || /^https?:\/\//.test(value)) {
    return value;
  }
  return `${ASSET_BASE_URL}/static/${value.replace(/^\/+/, '')}`;
}
