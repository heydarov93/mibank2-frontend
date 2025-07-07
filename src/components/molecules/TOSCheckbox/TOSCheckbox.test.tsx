import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import { FieldErrors, useForm } from 'react-hook-form';

import { TOSCheckbox } from './TOSCheckbox';

import { ILoginFormInput } from 'models/IAuth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const WrapperComponent = ({
  errors = {},
  isFormDisabled = false,
}: {
  errors?: FieldErrors<ILoginFormInput>;
  isFormDisabled?: boolean;
}) => {
  const { control } = useForm<ILoginFormInput>();

  return (
    <ThemeProvider theme={createTheme()}>
      <TOSCheckbox
        name="checkbox"
        control={control}
        errors={errors}
        isFormDisabled={isFormDisabled}
      />
    </ThemeProvider>
  );
};

describe('TOSCheckbox Component', () => {
  it('renders checkbox with correct default state', () => {
    render(<WrapperComponent />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  it('displays error state when there is an error', () => {
    const errors: FieldErrors<ILoginFormInput> = {
      checkbox: {
        type: 'required',
        message: 'Error',
      },
    };
    render(<WrapperComponent errors={errors} />);

    const checkboxContainer = screen.getByRole('checkbox').closest('.shake');
    expect(checkboxContainer).toBeInTheDocument();
  });

  it('disables checkbox when form is disabled', () => {
    render(<WrapperComponent isFormDisabled={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('renders links with correct URLs', () => {
    render(<WrapperComponent />);

    const termsLink = screen.getByText('footer.footerBottom.terms');
    const policyLink = screen.getByText('footer.footerBottom.policy');

    expect(termsLink).toHaveAttribute(
      'href',
      expect.stringMatching(/\/Terms\+of\+Use\.pdf\?/),
    );
    expect(policyLink).toHaveAttribute(
      'href',
      expect.stringMatching(/\/Privacy\+Policy\.pdf\?/),
    );
  });

  it('renders and handles checkbox interaction correctly', () => {
    render(<WrapperComponent />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
