export type ValidatedLicenseKey = {
  licenseKey: string;
};

export type LicenseKeyActivationRead = {
  licenseKey: string;
  name: string;
};

export type LicenseKeyValidationResponse = {
  license_key: string | null;
  valid: boolean;
};

export type LicenseKeyActivationResponse = {
  business_id: string;
  created_at: string;
  id: string;
  license_key_id: string;
  license_key: string;
  name: string;
};
