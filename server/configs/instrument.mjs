import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://8d38863d108ac5eb8c54677d750b0f1b@o4510944910639104.ingest.us.sentry.io/4510944921321472",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});