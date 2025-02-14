import React from 'react';
import { render } from '@testing-library/react';
import CreateEmployee from './CreateEmployee';

jest.mock('api/registerEmployee', () => ({
  useRegisterEmployeeMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('dayjs', () => () => ({
  format: () => '2025-01-01',
}));

jest.mock('components/atoms', () => ({
  InputField: (props: any) => <input {...props} />,
  SubmitButton: (props: any) => <button>{props.buttonContent}</button>,
}));

jest.mock('components/molecules', () => ({
  DocumentDatePicker: (props: any) => <input type="date" {...props} />,
}));

describe('CreateEmployee Component', () => {
  it('should render correctly and match snapshot', () => {
    const { container } = render(<CreateEmployee />);
    expect(container).toMatchSnapshot();
  });
});
