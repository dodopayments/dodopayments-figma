# dodo-payments-figma-demo

A simple example of how to use Dodo Payments License Key validation in a Figma plugin.

### Development

Import this plugin into Figma using "Import Manifest". Run the following command to start the development server:

```bash
npm run dev
```

### Configuration

#### Organization ID

Replace `ORGANIZATION_ID` in `src/ui/main.tsx` with your actual organization ID. It can be found in your Dodo Payments Organization Settings page.

#### Environment

Set the environment in `src/ui/dodo-payments.ts` to `"test_mode"` to use the sandbox server for development. Switch this to `"live_mode"` when you're ready to go live.

#### Manifest

It is very important to allow the plugin to access the Dodo Payments API. You can allow this by adding the following to the `networkAccess` section in `manifest.json`:

```json
"networkAccess": {
	"allowedDomains": ["https://*.dodopayments.com"]
}
```

This allows the plugin to validate license keys using the Dodo Payments API server.

### TODO: Implementation Steps

This plugin currently contains placeholder code. To complete the implementation:

1. **Install Dodo Payments SDK**: Add the actual Dodo Payments Node.js SDK to your dependencies
2. **Replace TODOs in `src/ui/dodo-payments.ts`**: Implement actual SDK initialization and license validation
3. **Update TypeScript types**: Replace placeholder types with actual Dodo Payments SDK types
4. **Test license validation**: Verify that license key validation works with your Dodo Payments setup

### Build Commands

- `npm run build` - Build the plugin for production
- `npm run dev` - Start development server with file watching
- `npm run lint` - Check code style and errors
- `npm run format` - Format code with Prettier
