// https://www.gatsbyjs.org/docs/environment-variables/#additional-environments-staging-test-etc
const GDL_ENVIRONMENT = process.env.GDL_ENVIRONMENT || 'dev';
const GDL_AUTH_CLIENT_ID = process.env.GDL_AUTH_CLIENT_ID || '';

const apiDocs = apiName => {
  switch (GDL_ENVIRONMENT) {
    case 'dev':
      return `https://api.test.digitallibrary.io/${apiName}/api-docs`;
    case 'prod':
      return `https://api.digitallibrary.io/${apiName}/api-docs`;
    default:
      return `https://api.${GDL_ENVIRONMENT}.digitallibrary.io/${apiName}/api-docs`;
  }
};

const oauthRedirectUrl = () => {
  switch (GDL_ENVIRONMENT) {
    case 'dev':
      return 'need to configure proxy for dev to work';
    case 'prod':
      return 'https://developer.digitallibrary.io/oauth2-redirect';
    default:
      return `https://developer.${GDL_ENVIRONMENT}.digitallibrary.io/oauth2-redirect`;
  }
};

module.exports = {
  GDL_ENVIRONMENT,
  GDL_AUTH_CLIENT_ID,
  apiDocs,
  oauthRedirectUrl
};
