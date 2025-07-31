# Dodo Payments Figma

A complete Figma plugin example demonstrating Dodo Payments license key validation and activation functionality.

## Getting Started

1. Create your own figma plugin project using [this guide](https://www.figma.com/plugin-docs/plugin-quickstart-guide/). This should generate a scaffold for your plugin with a `manifest.json`.
2. Clone this repository and update it's `manifest.json` with the name and id from the manifest of the previously generated plugin folder.
3. Run `npm install` to install dependencies.
4. Customize the ui in `src/ui/components/Authenticated.tsx` to expose functionality for users with valid license keys.
5. Customise `LicenseKeyInput.tsx` to your linking.
6. Set the `API_MODE` in `src/ui/api.ts` to `"test_mode"` for development or `"live_mode"` when ready for production use.
7. The rest of the process should be obvious and figuring out publishing, testing, etc. is left to the developer using this template.

## Development

Import this plugin into Figma using "Import Manifest". Run the following command to start the development server:

```bash
npm run dev
```

## Configuration

### Environment

Set the `API_MODE` in `src/ui/api.ts` to `"test_mode"` for development or `"live_mode"` for production.

### Manifest

The plugin needs network access to communicate with the CORS proxy. Add the following to the `networkAccess` section in `manifest.json`:

```json
"networkAccess": {
	"allowedDomains": ["https://dodo-payments-proxy.aagarwal9782.workers.dev"]
}
```

This allows the plugin to validate and activate license keys using the Dodo Payments API.

### Features

This plugin includes:

- **License Key Validation**: Validates license keys against the Dodo Payments API
- **License Key Activation**: Activates license keys with user identification
- **Environment Support**: Configurable for both test and live environments  
- **CORS Proxy**: Uses a Cloudflare Worker proxy to handle CORS restrictions
- **TypeScript Support**: Fully typed implementation with proper error handling

### Build Commands

- `npm run build` - Build the plugin for production
- `npm run dev` - Start development server with file watching
- `npm run lint` - Check code style and errors
- `npm run format` - Format code with Prettier
