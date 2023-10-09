import { AuthConfig } from '@auth0/auth0-angular';
import { environment } from './environment';
import { LogsInitConfiguration } from '@datadog/browser-logs';

export const AUTH_CONFIG: AuthConfig = {
  domain: 'article-translator.au.auth0.com',
  clientId: 'd0v7HCbUtbc2qlR6ABygsitLPThbqnNT',
  authorizationParams: {
    connection: 'Username-Password-Authentication',
    audience: 'https://article-translator.au.auth0.com/api/v2/',
    redirect_uri: `${window.location.protocol}//${window.location.host}`,
  },
  // The AuthHttpInterceptor configuration
  httpInterceptor: {
    allowedList: [environment.apiUrl + '/*'],
  },
};

export const DATADOG_ENV: LogsInitConfiguration = {
  clientToken: 'cb6337a8c3f3401481a929583aa1d627628d84e7',
  site: 'us1.datadoghq.com',
  service: 'article-translator-site',
  env: environment.datadogEnvironment,
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
  beforeSend: (log) => {
    //
    //  Don't send dev server errors
    //
    if ((log.message ?? '').indexOf('[webpack-dev-server]') > -1) {
      return false;
    }

    return;
  },
};

export const DATADOG_CONTEXT = {
  app: 'article-translator',
  host: window.location.host,
};
