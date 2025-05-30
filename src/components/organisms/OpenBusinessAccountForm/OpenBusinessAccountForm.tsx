import {
  BusinessSelectedCardInfo,
  OpenBusinessAccountActions,
  OpenBusinessAccountSelects,
} from 'components/molecules';

interface OpenBusinessAccountFormProps {
  isDataFilled: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEdit: () => void;
}

export const OpenBusinessAccountForm = ({
  isDataFilled,
  onCancel,
  onSubmit,
  onEdit,
}: OpenBusinessAccountFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <OpenBusinessAccountSelects sx={{ mt: 3 }} />

      {isDataFilled && (
        <BusinessSelectedCardInfo onEdit={onEdit} sx={{ mt: 4 }} />
      )}

      <OpenBusinessAccountActions onCancel={onCancel} sx={{ mt: 4 }} />
    </form>
  );
};
