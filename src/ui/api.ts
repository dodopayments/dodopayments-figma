import {
  LicenseKeyActivationResponse,
  LicenseKeyValidationResponse,
} from "./types";

// TODO: change this to live_mode when your plugin is ready
const API_MODE: "test_mode" | "live_mode" = "test_mode";

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

  const res = await fetch(req);

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

  const res = await fetch(req);

  if (!res.ok) {
    const error = (await res.json()) as { code: string; message: string };
    throw new Error(error.message);
  }

  const resJson = (await res.json()) as LicenseKeyActivationResponse;
  return { ...resJson, license_key: licenseKey };
}
