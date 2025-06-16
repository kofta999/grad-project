import type { AppOpenAPI } from "./types";
import { apiReference } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json" with { type: "json" };

export default function configureOpenAPI(app: AppOpenAPI) {
  const securitySchemes = {
		bearerAuth: {
			type: "http" as const,
			scheme: "bearer" as const,
			bearerFormat: "JWT" as const,
		},
	};

	app.openAPIRegistry.registerComponent(
		"securitySchemes",
		"bearerAuth",
		securitySchemes.bearerAuth,
	);
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "MIS API For Faculty of Engineering, Suez Canal University",
    },
  });

  app.get(
    "/reference",
    apiReference({
      defaultHttpClient: {
        targetKey: "shell",
        clientKey: "curl",
      },
      spec: {
        url: "/doc",
      },
    })
  );
}
