import { useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import type {
  LicenseKeyActivationResponse,
  LicenseKeyValidationResponse,
} from "../types";
import { dodoPayments } from "../dodo-payments";

export interface LicenseKeyInputProps {
  needsActivation?: boolean;
  onValidation?: (validation: LicenseKeyValidationResponse) => void;
  onActivation?: (activation: LicenseKeyActivationResponse) => void;
}

export const LicenseKeyInput = ({
  needsActivation,
  onActivation,
  onValidation,
}: LicenseKeyInputProps) => {
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleError = useCallback((error: string) => {
    setError(error);
  }, []);

  const handleActivation = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const activation = await dodoPayments.licenses.activate({
        licenseKey,
        name: "Figma Plugin",
      });

      onActivation?.(activation);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [licenseKey, onActivation, handleError]);

  const handleValidation = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const validation = await dodoPayments.licenses.validate({
        licenseKey,
      });

      onValidation?.(validation);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [onValidation, licenseKey, handleError]);

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <input
        className="bg-gray-100 py-2 px-4 rounded-xl w-full"
        placeholder="License Key"
        value={licenseKey}
        onChange={(e) => setLicenseKey(e.target.value)}
      />
      {error && (
        <div className="flex rounded-lg px-4 py-2 bg-red-50">
          <p className="text-red-500 text-xs">{error}</p>
        </div>
      )}
      <button
        className={twMerge(
          "text-white py-2 px-4 rounded-xl",
          loading ? "bg-gray-300" : "bg-blue-500",
        )}
        onClick={needsActivation ? handleActivation : handleValidation}
        type="button"
        disabled={loading}
      >
        {loading ? "Validating..." : "Validate"}
      </button>
    </div>
  );
};
