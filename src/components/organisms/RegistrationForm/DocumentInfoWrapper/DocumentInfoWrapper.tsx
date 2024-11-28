import { useSelector } from 'react-redux';

import { DocumentInfo } from '../DocumentInfo/DocumentInfo';
import { EUDocumentInfo } from '../EUDocumentInfo/EUDocumentInfo';

import { StyledBoxContainer } from './DocumentInfoWrapper.styled';

import { getEU } from 'store/selectors/StepperSelectors';

export const DocumentInfoWrapper = () => {
  const isEU = useSelector(getEU);
  return (
    <StyledBoxContainer>
      {isEU ? <EUDocumentInfo /> : <DocumentInfo />}
    </StyledBoxContainer>
  );
};
