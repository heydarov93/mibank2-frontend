import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useForm, FieldErrors } from 'react-hook-form';

import { PasswordField } from './PasswordField';

import { ISignupFormInput } from 'models/IAuth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () => 'Password',
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

interface WrapperComponentProps {
  errors?: FieldErrors<ISignupFormInput>;
  isFormDisabled?: boolean;
  name: 'password' | 'confirmPassword';
  id: 'password' | 'confirmPassword';
}

const WrapperComponent = ({
  errors = {},
  isFormDisabled = false,
  id,
}: WrapperComponentProps) => {
  const { control } = useForm<ISignupFormInput>();

  return (
    <ThemeProvider theme={createTheme()}>
      <PasswordField
        control={control}
        name="password"
        id={id}
        errors={errors}
        isFormDisabled={isFormDisabled}
      />
    </ThemeProvider>
  );
};

describe('PasswordField Component', () => {
  afterEach(cleanup);

  it('renders password input with default type as password', () => {
    render(<WrapperComponent name="password" id="password" />);

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility on icon button click', () => {
    render(<WrapperComponent name="password" id="password" />);

    const toggleButton = screen.getByRole('button', {
      name: /toggle password visibility/i,
    });
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('displays error message when there is an error', () => {
    const errors: FieldErrors<ISignupFormInput> = {
      password: {
        type: 'required',
        message: 'Password is required',
      },
    };
    render(<WrapperComponent errors={errors} name="password" id="password" />);

    const errorMessage = screen.getByText('Password is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders visibility toggle button and prevents default mouse down behavior', () => {
    render(<WrapperComponent name="password" id="password" />);

    const toggleButton = screen.getByRole('button', {
      name: /toggle password visibility/i,
    });

    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });

    fireEvent(toggleButton, mouseDownEvent);

    expect(mouseDownEvent.defaultPrevented).toBe(true);

    expect(toggleButton).toBeInTheDocument();
  });

  it('prevents cut and copy actions on the input field', () => {
    render(<WrapperComponent name="password" id="password" />);

    const passwordInput = screen.getByLabelText('Password');

    fireEvent.cut(passwordInput);
    fireEvent.copy(passwordInput);

    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
