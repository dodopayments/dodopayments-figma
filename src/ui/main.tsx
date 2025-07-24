import { dodoPayments } from "./dodo-payments";
import React, { useCallback, useEffect, useState } from "react";
import type {
  LicenseKeyActivationResponse,
  LicenseKeyValidationResponse,
} from "./types";
import { Authenticated } from "./components/Authenticated";
import { createRoot } from "react-dom/client";
import "./input.css";
import { Unauthenticated } from "./components/Unauthenticated";

function Plugin() {
  const [validation, setValidation] = useState<string | null>(null);

  const onValidation = useCallback(
    (
      licenseKeyValidation:
        | LicenseKeyValidationResponse
        | LicenseKeyActivationResponse,
    ) => {
      const licenseKey = licenseKeyValidation.license_key;

      parent.postMessage(
        {
          pluginMessage: {
            type: "setLicenseKey",
            data: licenseKey,
          },
        },
        "*",
      );

      setValidation(licenseKey);
    },
    [],
  );

  const initialize = useCallback(async () => {
    window.onmessage = async (e) => {
      const persistedLicenseKey = e.data.pluginMessage.data;

      switch (e.data.pluginMessage.type) {
        case "getLicenseKey":
          if (persistedLicenseKey) {
            try {
              const validation = await dodoPayments.licenses.validate({
                licenseKey: persistedLicenseKey,
              });

              setValidation(validation.license_key);
            } catch (error) {
              console.error("License validation failed:", error);
            }
          }

          break;
      }
    };

    parent.postMessage(
      { pluginMessage: { type: "getLicenseKey", data: null } },
      "*",
    );
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="flex flex-col h-full w-full bg-white p-8">
      {validation ? (
        <Authenticated />
      ) : (
        <Unauthenticated onValidation={onValidation} />
      )}
    </div>
  );
}

const container =
  document.getElementById("root") ?? document.createElement("div");
const root = createRoot(container);
root.render(<Plugin />);
