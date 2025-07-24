import { activateLicenseKey, validateLicenseKey } from "./api";

export const dodoPayments = {
  licenses: {
    validate: async (params: { licenseKey: string }) => {
      const response = await validateLicenseKey(params.licenseKey);

      if (!response.valid) {
        throw new Error("Invalid license key");
      }

      return response;
    },
    activate: async (params: { licenseKey: string; name: string }) => {
      const response = await activateLicenseKey(params.licenseKey, params.name);
      return response;
    },
  },
};
