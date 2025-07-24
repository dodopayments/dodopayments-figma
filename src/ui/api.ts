import {
  LicenseKeyActivationResponse,
  LicenseKeyValidationResponse,
} from "./types";

// TODO: change this to live_mode when your plugin is ready
const API_MODE: "test_mode" | "live_mode" = "test_mode";

export const PROXY_URL = new URL(
  "https://dodo-payments-proxy.aagarwal9782.workers.dev/dodo-payments-proxy/",
);

function reqToProxy(req: Request): Request {
  const originalUrl = req.url;

  const searchParams = new URLSearchParams({
    apiurl: originalUrl,
  });

  const newReq = new Request(PROXY_URL + "?" + searchParams.toString(), {
    body: req.body,
    method: req.method,
    headers: req.headers,
    // @ts-expect-error No types for this
    duplex: "half",
  });

  return newReq;
}

export async function validateLicenseKey(
  licenseKey: string,
): Promise<LicenseKeyValidationResponse> {
  const baseUrl =
    API_MODE === "live_mode"
      ? "https://live.dodopayments.com"
      : "https://test.dodopayments.com";

  const req = new Request(baseUrl + "/licenses/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ license_key: licenseKey }),
  });

  const proxyReq = reqToProxy(req);
  const res = await fetch(proxyReq);

  const resJson = (await res.json()) as { valid: boolean };
  if (resJson.valid) {
    return { valid: resJson.valid, license_key: licenseKey };
  }

  return { valid: resJson.valid, license_key: null };
}

export async function activateLicenseKey(
  licenseKey: string,
  name: string,
): Promise<LicenseKeyActivationResponse> {
  const baseUrl =
    API_MODE === "live_mode"
      ? "https://live.dodopayments.com"
      : "https://test.dodopayments.com";

  const req = new Request(baseUrl + "/licenses/activate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ license_key: licenseKey, name }),
  });

  const proxyReq = reqToProxy(req);
  const res = await fetch(proxyReq);

  if (!res.ok) {
    const error = (await res.json()) as { code: string; message: string };
    throw new Error(error.message);
  }

  const resJson = (await res.json()) as LicenseKeyActivationResponse;
  return { ...resJson, license_key: licenseKey };
}
