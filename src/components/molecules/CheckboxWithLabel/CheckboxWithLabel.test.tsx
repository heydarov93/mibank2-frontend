import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import { FieldErrors, useForm } from 'react-hook-form';

import { CheckboxWithLabel } from './CheckboxWithLabel';

import { IFormInput } from 'models/IAuth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

const WrapperComponent = ({
  errors = {},
  isFormDisabled = false,
}: {
  errors?: FieldErrors<IFormInput>;
  isFormDisabled?: boolean;
}) => {
  const { control } = useForm<IFormInput>();

  return (
    <ThemeProvider theme={createTheme()}>
      <CheckboxWithLabel
        control={control}
        errors={errors}
        isFormDisabled={isFormDisabled}
      />
    </ThemeProvider>
  );
};

describe('CheckboxWithLabel Component', () => {
  it('renders checkbox with correct default state', () => {
    render(<WrapperComponent />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  it('displays error state when there is an error', () => {
    const errors: FieldErrors<IFormInput> = {
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
