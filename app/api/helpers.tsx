import crypto from "crypto";

/**
 * Membuat Digest dari body JSON
 * @param body JSON string dari body
 * @returns Digest dalam base64
 */
export const createDigest = (body: string): string => {
  const hash = crypto.createHash("sha256").update(body).digest("base64");
  return `SHA-256=${hash}`;
};

/**
 * Membuat Signature
 * @param clientId Client ID
 * @param requestId Request ID
 * @param timestamp ISO8601 timestamp
 * @param target Request target
 * @param digest Digest string
 * @param secretKey Secret Key
 * @returns Signature string
 */
export const createSignature = (
  clientId: string,
  requestId: string,
  timestamp: string,
  target: string,
  digest: string,
  secretKey: string
): string => {
  const rawSignature = [
    `Client-Id:${clientId}`,
    `Request-Id:${requestId}`,
    `Request-Timestamp:${timestamp}`,
    `Request-Target:${target}`,
    `Digest:${digest}`,
  ].join("\n");

  const hmac = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("base64");

  return `HMACSHA256=${hmac}`;
};
