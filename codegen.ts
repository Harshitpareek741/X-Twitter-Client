
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://x-twitter-server.onrender.com/graphql",
  documents: "**/*.{tsx,ts}", 
  ignoreNoDocuments : false,
  generates: {
    "gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
