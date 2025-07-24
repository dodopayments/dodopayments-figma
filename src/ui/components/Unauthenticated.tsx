import type {
  LicenseKeyActivationResponse,
  LicenseKeyValidationResponse,
} from "../types";
import { LicenseKeyInput } from "./LicenseKeyInput";

export interface UnauthenticatedProps {
  onValidation: (
    validation: LicenseKeyValidationResponse | LicenseKeyActivationResponse,
  ) => void;
}

export const Unauthenticated = ({ onValidation }: UnauthenticatedProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-y-16">
      <div className="flex flex-col gap-y-2 items-center">
        <h3 className="text-lg font-medium">
          Dodo Payments License Key Example
        </h3>
        <p className="text-sm text-gray-500">
          Enter your license key to continue
        </p>
      </div>
      <LicenseKeyInput
        onValidation={onValidation}
        onActivation={onValidation}
        // Set to true if your configured Dodo Payments License Key has a limit of activations
        needsActivation={false}
      />
    </div>
  );
};
