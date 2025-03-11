export const endpoints = {
  userAccountManagement: {
    users: {
      authenticate: '/uas/api/user/authenticate',
      sendcode: '/uas/api/user/login/send-code',
      verifycode: '/uas/api/user/login/verify-code',
      userInformation: '/uas/api/user/details',
      postRegistrationInfo: '/uas/api/user/add/details',
      checkEmail: '/uas/api/user/email',
      registerNewUser: '/uas/api/user/signup',
      getPostcode: '/uas/api/user/postcode',
      forgotPassword: '/uas/api/user/forgot-password',
      confirmForgotPassword: '/uas/api/user/confirm-forgot-password',
      refreshToken: 'uas/api/user/refresh-token',
    },
  },
  contactInfo: {
    version: '/is/contact/version',
    contacts: '/is/contact',
  },
  employeeAccountManagement: {
    employees: {
      authenticatorSetup: '/emg/api/employee/2fa-setup',
      validateOtp: '/emg/api/employee/validate-otp',
      validateEmail: '/emg/api/employee/email',
      registerEmployee: '/emg/api/employee/register-employee',
      viewEmployee: '/emg/api/employee/list',
      authenticateEmployee: '/emg/api/employee/authenticate',
    },
  },
  productManagement: {
    deposits: {
      createDeposit: '/ds/api/deposits',
    },
  },
};
