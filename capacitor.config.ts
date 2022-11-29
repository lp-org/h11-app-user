import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mokoocode.mysafecodemerchant",
  appName: "MySafeCodeMerchant",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    cleartext: true,
  },
};

export default config;
