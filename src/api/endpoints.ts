export const endpoints = {
  userAccountManagement: {
    users: {
      authenticate: '/uas/api/user/authenticate',
      sendcode: '/uas/api/user/login/send-code',
      verifycode: '/uas/api/user/login/verify-code',
      userInformation: '/uas/api/user/details',
      checkEmail: '/uas/api/user/email',
      registerNewUser: '/uas/api/user/signup',
      getPostcode: '/uas/api/user/postcode',
    },
  },
  contactInfo: {
    version: '/is/contact/version',
    contacts: '/is/contact',
  },
};
