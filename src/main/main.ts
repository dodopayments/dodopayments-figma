figma.showUI(__html__, { themeColors: true, height: 480, width: 360 });

interface GetLicenseKey {
  type: "getLicenseKey";
  data: null;
}

interface SetLicenseKey {
  type: "setLicenseKey";
  data: string;
}

figma.ui.onmessage = async (message: GetLicenseKey | SetLicenseKey) => {
  switch (message.type) {
    case "getLicenseKey": {
      const licenseKey = await figma.clientStorage.getAsync("license_key");

      figma.ui.postMessage({
        type: "getLicenseKey",
        data: licenseKey,
      });
      break;
    }
    case "setLicenseKey": {
      await figma.clientStorage.setAsync("license_key", message.data);

      figma.ui.postMessage({
        type: "setLicenseKey",
        data: message.data,
      });
      break;
    }
  }
};
