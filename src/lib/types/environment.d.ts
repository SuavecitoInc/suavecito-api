declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WEBHOOK_SECRET: string;
      SHOPIFY_ADMIN_API_KEY: string;
      SHOPIFY_STORE: string;
      SHOPIFY_ACCESS_TOKEN: string;
      SENTRY_DSN: string;
      SECRET_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
