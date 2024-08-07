import { useNavigate } from 'react-router-dom';

import { StyledButton } from './BackButton.styled';

import { ReactComponent as BackArrow } from 'assets/icons/BackArrow.svg';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <StyledButton onClick={handleClick}>
      <BackArrow />
    </StyledButton>
  );
};
