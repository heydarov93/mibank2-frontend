import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import { SyntheticEvent, KeyboardEvent } from 'react';
import { FieldError, useForm } from 'react-hook-form';

import { InputField } from './InputField';

import { ILoginFormInput, ISignupFormInput } from 'models/IAuth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

const enum FieldName {
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

const WrapperComponent = ({
  name,
  id,
  placeholder,
  error,
  disabled,
  InputProps,
  onCopy,
  onCut,
  onKeyUp,
}: {
  name: `${FieldName}`;
  id: `${FieldName}`;
  placeholder: string;
  error?: FieldError;
  disabled?: boolean;
  InputProps?: {
    endAdornment: JSX.Element;
  };
  onCut?: (e: SyntheticEvent) => void;
  onCopy?: (e: SyntheticEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}) => {
  const { control } = useForm<ILoginFormInput | ISignupFormInput>();

  return (
    <ThemeProvider theme={createTheme()}>
      <InputField
        name={name}
        id={id}
        placeholder={placeholder}
        control={control}
        error={error}
        disabled={disabled}
        InputProps={InputProps}
        onCopy={onCopy}
        onCut={onCut}
        onKeyUp={onKeyUp}
      />
    </ThemeProvider>
  );
};

describe('InputField component', () => {
  it('renders the input field with the correct props', () => {
    render(
      <WrapperComponent
        name={'email'}
        id={'email'}
        placeholder={'example@gmail.com'}
      />,
    );
    const inputElement = screen.getByPlaceholderText('example@gmail.com');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', 'email');
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).not.toBeDisabled();
  }),
    it('renders the input field with an error message', () => {
      const errorMessage = 'This field is required';
      render(
        <WrapperComponent
          name={'email'}
          id={'email'}
          placeholder={'example@gmail.com'}
          error={{ type: 'required', message: errorMessage }}
        />,
      );
      const errorElement = screen.getByText(/This field is required/i);
      expect(errorElement).toBeInTheDocument();
    });

  it('handles custom events (onCut, onCopy, onKeyUp)', () => {
    const onCut = jest.fn();
    const onCopy = jest.fn();
    const onKeyUp = jest.fn();
    render(
      <WrapperComponent
        name={'email'}
        id={'email'}
        placeholder={'example@gmail.com'}
        onCut={onCut}
        onCopy={onCopy}
        onKeyUp={onKeyUp}
      />,
    );

    const inputElement = screen.getByPlaceholderText('example@gmail.com');

    fireEvent.cut(inputElement);
    fireEvent.copy(inputElement);
    fireEvent.keyUp(inputElement, { key: 'A', code: 'KeyA' });

    expect(onCut).toHaveBeenCalledTimes(1);
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  it('renders the input field as disabled', () => {
    render(
      <WrapperComponent
        name={'email'}
        id={'email'}
        placeholder={'example@gmail.com'}
        disabled
      />,
    );
    const inputElement = screen.getByPlaceholderText('example@gmail.com');
    expect(inputElement).toBeDisabled();
  });

  it('renders input field with custom InputProps', () => {
    const endAdornment = <div>End Adornment</div>;
    render(
      <WrapperComponent
        name={'email'}
        id={'email'}
        placeholder={'example@gmail.com'}
        InputProps={{ endAdornment }}
      />,
    );

    expect(screen.getByText('End Adornment')).toBeInTheDocument();
  });
});
