import React from 'react';
import { Link } from 'react-router-dom';

import { MainText, MainContainer } from './BackOfficeNavigationLink.styled';

interface BackOfficeNavigationLinkProps {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  link: string;
}

const BackOfficeNavigationLink = ({
  svg: SvgIcon,
  text,
  link,
}: BackOfficeNavigationLinkProps) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <MainContainer>
        <SvgIcon />
        <MainText>{text}</MainText>
      </MainContainer>
    </Link>
  );
};

export default BackOfficeNavigationLink;
