'use strict';

module.exports = function (environment) {
  const isTestEnv = environment === 'test';
  const mirageEnabled = process.env.MIRAGE === 'true' || isTestEnv;
  const host = mirageEnabled ? null : process.env.API_HOST;
  const baseUrl = process.env.BASE_URL || 'http://localhost:4200';

  const ENV = {
    modulePrefix: 'nonprofit-filings-frontend',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },
    apiHost: host,
    contentSecurityPolicy: {
      'connect-src': "'self' http://localhost:3000"
    },
    'ember-cli-mirage': {
      enabled: mirageEnabled
    },
    fontawesome: {
      defaultPrefix: 'fal'
    },
    baseUrl,

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
