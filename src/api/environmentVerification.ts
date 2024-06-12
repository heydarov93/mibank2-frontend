export const BASE_URL = () => {
  const env = process.env;

  switch (env.REACT_APP_NODE_ENV) {
    case 'production':
      return env.REACT_APP_PROD;
    default:
      return env.REACT_APP_DEV;
  }
};
