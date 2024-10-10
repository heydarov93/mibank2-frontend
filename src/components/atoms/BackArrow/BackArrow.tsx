import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';

import { StyledBackArrow } from './BackArrow.styled';

export const BackArrow = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <StyledBackArrow onClick={handleClick}>
      <KeyboardArrowLeftIcon />
      Back
    </StyledBackArrow>
  );
};
