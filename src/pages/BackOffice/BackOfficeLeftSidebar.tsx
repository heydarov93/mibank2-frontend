import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { StyledIcon, StyledLogo } from 'components/atoms/Logo/Logo.styled';

const BackOfficeLeftSidebar = ({
  location,
}: {
  location: { pathname: string };
}) => {
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <Box width={'100%'}>
      <Box color={'white'}>
        <Typography>Millennium Bank</Typography>
        <StyledLogo isSmall={false}>
          <StyledIcon isWhite={true} />
        </StyledLogo>
      </Box>

      <Box mt={5}>
        <Typography
          variant="h6"
          color={isActive('/back-office/create-employee') ? 'white' : '#A8ADBA'}
        >
          Employees
        </Typography>
        <Box ml={2.5} mt={1}>
          <Link
            to="/back-office/create-employee"
            style={{
              textDecoration: 'none',
              color: isActive('/back-office/create-employee')
                ? 'white'
                : '#A8ADBA',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <ControlPointIcon /> Add a new employee
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default BackOfficeLeftSidebar;
