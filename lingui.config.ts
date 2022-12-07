import { LinguiConfig } from "@lingui/conf";

const config: Partial<LinguiConfig> = {
  locales: ["en", "cn"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
};

export default config;
