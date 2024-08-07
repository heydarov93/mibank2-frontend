export const endpoints = {
  userAccountManagement: {
    users: {
      authenticate: '/uas/api/user/authenticate',
      sendcode: '/uas/api/user/login/send-code',
      verifycode: '/uas/api/user/login/verifycode',
      userInformation: '/uas/api/user/details',
    },
  },
  contactInfo: {
    version: '/is/contact/version',
    contacts: '/is/contact',
  },
};
