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
      getUserAccounts: '/as/api/account/by-token',
      userId: 'uas/api/user/id',
    },
  },
  contactInfo: {
    version: '/is/contact/version',
    contacts: '/is/contact',
  },
  exchangeRates: {
    getRates: '/api/exchangerates/tables/C',
    getCurrentRates: 'as/api/exchange-rates',
    getPreviousRates: 'as/api/exchange-rates/previous',
    convertCurrency: 'as/api/exchange-rates/convert-currency',
  },
  employeeAccountManagement: {
    employees: {
      authenticatorSetup: '/emg/api/employee/2fa-setup',
      validateOtp: '/emg/api/employee/validate-otp',
      validateEmail: '/emg/api/employee/email',
      registerEmployee: '/emg/api/employee/register-employee',
      viewEmployee: '/emg/api/employee/list',
      updateEmployee: '/emg/api/employee/update',
      deleteEmployee: '/emg/api/employee/delete',
      authenticateEmployee: '/emg/api/employee/authenticate',
    },
  },
  productManagement: {
    deposits: {
      createDeposit: '/ds/api/deposits',
      getDeposits: '/ds/api/deposits',
      deleteDeposit: '/ds/api/deposits',
      updateDeposit: 'ds/api/deposits',
    },
    userDeposits: {
      createDeposit: '/ds/api/user-deposits',
      getDeposit: (accountId: string) => `/ds/api/user-deposits/${accountId}`,
    },
    cards: {
      createCard: '/cs/api/card/create-card',
    },
    products: {
      getProducts: '/ds/api/product/products',
    },
  },
  offers: {
    getOffer: '/os/api/offer/retrieve/page',
    getOfferImages: '/os/api/offer',
  },
  accounts: {
    transfer: {
      toIBAN: '/as/api/account/transfer-iban',
      toCard: '/as/api/account/transfer-card-number',
      fee: '/as/api/account/transfer-fee',
    },
    iban: '/as/api/account/users',
    card: '/as/api/card',
  },
};
