import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

export const initSentry = (app) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      Sentry.httpIntegration(),
      Sentry.expressIntegration(app),
      nodeProfilingIntegration(),
    ],
    tracesSampleRate: 1.0, // reduce to 0.2 in prod
    environment: process.env.NODE_ENV || "development",
  });
};

export default Sentry;
