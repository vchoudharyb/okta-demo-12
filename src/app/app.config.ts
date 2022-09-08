// const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;
// const USE_INTERACTION_CODE = process.env.USE_INTERACTION_CODE || false;

export default {
    oidc: {
      clientId: '0oa50csq1ikzhrZX65d7',
      issuer:'https://dev-93021309.okta.com/oauth2/default',
      redirectUri: 'http://localhost:4200/callback',
      scopes: ['openid', 'profile', 'email'],
      testing: {
        disableHttpsCheck: false, //`${OKTA_TESTING_DISABLEHTTPSCHECK}`
      },
    },
    widget: {
      useInteractionCodeFlow: false,  //`${USE_INTERACTION_CODE}`,
    },
    resourceServer: {
      messagesUrl: 'http://localhost:8000/api/messages',
    },
  };