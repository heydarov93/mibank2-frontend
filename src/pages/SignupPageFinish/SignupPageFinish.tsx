import { Box } from '@mui/material';

import { StyledLink, StyledTitle, StyledText } from './SignupPageFinish.styled';

import { AuthWrapper, Footer } from 'components/organisms';
import { TO_SIGN_IN } from 'constants/routesName';

export const SignupPageFinish = () => {
  return (
    <>
      <AuthWrapper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: '50px',
          }}
        >
          <StyledTitle>Email verification</StyledTitle>
          <StyledText>We sent a link for verification via email </StyledText>
          <b>{localStorage.getItem('email')}</b>
          <StyledText>
            Already confirmed an account?
            <StyledLink to={TO_SIGN_IN}>Log in</StyledLink>
          </StyledText>
        </Box>
      </AuthWrapper>
      <Footer />
    </>
  );
};
