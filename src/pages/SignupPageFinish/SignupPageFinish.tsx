import { Box } from '@mui/material';

import { StyledLink, StyledTitle, StyledText } from './SignupPageFinish.styled';

import { BackArrow } from 'components/atoms/BackArrow/BackArrow';
import { AuthWrapper, Footer } from 'components/organisms';
import { TO_SIGN_IN } from 'constants/routesName';

export const SignupPageFinish = () => {
  return (
    <>
      <BackArrow />
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
          <StyledText>
            We sent a link for verification via email{' '}
            <b>{localStorage.getItem('email')}</b>{' '}
          </StyledText>
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
