import { useTheme } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MainContainer, MainText } from './BackOfficeNavigationLink.styled';

interface BackOfficeNavigationLinkProps {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  link: string;
  isFillBasedIcon?: boolean;
}

const BackOfficeNavigationLink = ({
  svg: SvgIcon,
  text,
  link,
  isFillBasedIcon,
}: BackOfficeNavigationLinkProps) => {
  const location = useLocation();
  const theme = useTheme();
  const isActive = location?.pathname === link;

  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <MainContainer
        sx={{
          '& path': {
            ...(isFillBasedIcon
              ? { fill: isActive ? theme.palette.common.white : '' }
              : { stroke: isActive ? theme.palette.common.white : '' }),
          },
        }}
      >
        <SvgIcon />
        <MainText isActive={isActive}>{text}</MainText>
      </MainContainer>
    </Link>
  );
};

export default BackOfficeNavigationLink;
