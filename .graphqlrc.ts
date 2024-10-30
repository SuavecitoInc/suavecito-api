import { shopifyApiProject, ApiType } from '@shopify/api-codegen-preset';
import dotenv from 'dotenv';

dotenv.config();

const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2024-07';

export default {
  // For syntax highlighting / auto-complete when writing operations
  schema: `https://shopify.dev/admin-graphql-direct-proxy/${API_VERSION}`,
  // documents: ['./app/**/*.{js,ts,jsx,tsx}'],
  documents: [
    './src/lib/handlers/mutations/*.ts',
    './src/lib/handlers/queries/*.ts',
  ],
  projects: {
    // To produce variable / return types for Admin API operations
    default: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: API_VERSION,
      documents: [
        './src/lib/handlers/mutations/*.ts',
        './src/lib/handlers/queries/*.ts',
      ],
      outputDir: './src/lib/types',
    }),
  },
};
