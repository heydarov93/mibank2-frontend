import { TId } from 'types/types';

export const API_ENDPOINTS = {
  users: {
    authenticateUser: '/uas/api/user/authenticate',
    sendLoginCode: '/uas/api/user/login/send-code',
    verifyLoginCode: '/uas/api/user/login/verify-code',
    getUserDetails: (email: string) => `/uas/api/user/details?email=${email}`,
    addUserDetails: (email: string) =>
      `/uas/api/user/add/details?email=${email}`,
    checkUserEmail: '/uas/api/user/email',
    registerUser: '/uas/api/user/signup',
    getUserPostcode: '/uas/api/user/postcode',
    sendForgotPasswordCode: '/uas/api/user/forgot-password',
    confirmForgotPassword: '/uas/api/user/confirm-forgot-password',
    refreshAuthToken: '/uas/api/user/refresh-token',
    getUserId: `/uas/api/user/id`,
  },
  legalEntities: {
    checkLegalEntityUniques: '/uas/api/legal-entities/validate',
    registerLegalEntity: '/uas/api/legal-entities/signup',
  },
  employees: {
    setup2FA: '/emg/api/employee/2fa-setup',
    validateOTP: '/emg/api/employee/validate-otp',
    validateEmployeeEmail: '/emg/api/employee/email',
    registerEmployee: '/emg/api/employee/register-employee',
    getEmployeeList: '/emg/api/employee/list',
    updateEmployee: (employeeId: TId) =>
      `/emg/api/employee/update/${employeeId}`,
    deleteEmployee: (employeeId: TId) =>
      `/emg/api/employee/delete/${employeeId}`,
    authenticateEmployee: '/emg/api/employee/authenticate',
  },
  productManagement: {
    deposits: {
      createDeposit: '/ds/api/deposits',
      getDeposits: '/ds/api/deposits',
      deleteDeposit: '/ds/api/deposits',
      updateDeposit: '/ds/api/deposits',
    },
    userDeposits: {
      createUserDeposit: '/ds/api/user-deposits',
      getUserDeposits: (accountId: TId) =>
        `/ds/api/user-deposits/all/${accountId}`,
      getUserDepositsRecent: (accountId: TId) =>
        `/ds/api/user-deposits/recent/${accountId}`,
      getUserDeposit: (depositId: TId) => `/ds/api/user-deposits/${depositId}`,
      getUserDepositDetailed: (depositId: TId) =>
        `/ds/api/user-deposits/${depositId}/detailed`,
    },
    products: {
      getProducts: '/ds/api/product/products',
    },
  },
  offers: {
    getOfferPage: '/os/api/offer/retrieve/page',
    getOfferImages: '/os/api/offer',
  },
  contacts: {
    getContactVersion: '/is/contact/version',
    getContacts: '/is/contact',
  },
  exchangeRates: {
    getCurrentRates: '/as/api/exchange-rates',
    getPreviousRates: '/as/api/exchange-rates/previous',
    convertCurrency: '/as/api/exchange-rates/convert-currency',
  },
  cards: {
    searchCards: '/cs/api/card/detailed-search',
    createCard: '/cs/api/card/create-card',
    issueUserCard: '/cs/api/issue-user-card',
    getUserCards: (cardId: TId) => `/cs/api/user-cards/${cardId}`,
    getUserCardDetails: (cardId: TId) =>
      `/cs/api/user-cards/${cardId}/detailed-response`,
    updateCardStatus: (cardId: TId) =>
      `/cs/api/user-cards/${cardId}/update-status`,
    setPrimaryPaymentCard: (cardId: TId) =>
      `cs/api/user-cards/${cardId}/primary-payment-card`,
  },
  accounts: {
    transfers: {
      transferToIBAN: '/as/api/account/transfer-iban',
      transferToCard: '/as/api/account/transfer-card-number',
      getTransferFee: '/as/api/account/transfer-fee',
    },
    getUserAccountByIBAN: '/as/api/account/users',
    getAccountByCard: '/as/api/card',
    getAccountByToken: '/as/api/account/by-token',
    linkAccountWithCard: '/as/api/account/link-account-with-card',
    checkCardIssuance: '/as/api/account/check-card-issuance',
    createUserCardAccount: '/as/api/account/create-user-card-account',
    transactions: {
      getTransactionsByUserId: (userId: TId) =>
        `/as/api/transactions/${userId}`,
    },
  },
} as const;
