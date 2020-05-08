// Params
export default {
  site: {
    name: 'OAuth',
    description: 'OAuth 2.0 examples for various providers in one place',
    author: 'Atul Yadav',
    url: 'https://github.com/atulmy/oauth',
    copyright: '© 2020',
  },

  // common
  common: {
    endpoint: {
      url: '/:operation?',
      upload: '/upload',
    },

    errors: {
      auth: 'error_auth',
      validation: 'error_validation',
    },
  },

  // user
  user: {
    oauth: {
      redirectUri: 'authorize/',
    },
  },
}
