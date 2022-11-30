import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mokoocode.mysafecodemerchant",
  appName: "MySafeCodeMerchant",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: "http://localhost:8100", // if u wan to debug on real device (live reload)
  },
};

export default config;
