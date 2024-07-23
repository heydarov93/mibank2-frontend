export const endpoints = {
  userAccountManagement: {
    users: {
      authenticate: '/uas/api/user/authenticate',
      sendcode: '/uas/api/user/login/sendcode',
      verifycode: '/uas/api/user/login/verifycode',
      userInformation: '/uas/api/user/details',
    },
  },
};
