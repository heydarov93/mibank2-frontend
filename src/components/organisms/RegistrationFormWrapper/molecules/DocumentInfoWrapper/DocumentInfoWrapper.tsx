import { useFormContext } from 'react-hook-form';

import { DocumentInfo } from '../DocumentInfo/DocumentInfo';
import { EUDocumentInfo } from '../EUDocumentInfo/EUDocumentInfo';

import { StyledBoxContainer } from './DocumentInfoWrapper.styled';

import { checkEUStatus } from 'utils/checkers/EUStatusChecker';

export const DocumentInfoWrapper = ({ onBack }: { onBack: () => void }) => {
  const { watch } = useFormContext();
  const isEU = checkEUStatus(watch('citizenship'));

  return (
    <StyledBoxContainer>
      {isEU ? (
        <EUDocumentInfo onBack={onBack} />
      ) : (
        <DocumentInfo onBack={onBack} />
      )}
    </StyledBoxContainer>
  );
};
