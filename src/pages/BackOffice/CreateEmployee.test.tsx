import { render } from '@testing-library/react';

import { CreateEmployee } from './CreateEmployee';

jest.mock("api/services/employee-service/employees.api", () => ({
  useRegisterEmployeeMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('dayjs', () => () => ({
  format: () => '2025-01-01',
}));

jest.mock('components/atoms', () => ({
  InputField: (props: any) => {
    const { id, name, placeholder } = props;
    return <input id={id} name={name} placeholder={placeholder} />;
  },
  SubmitButton: (props: any) => <button>{props.buttonContent}</button>,
}));

jest.mock('components/molecules', () => ({
  DocumentDatePicker: (props: any) => {
    const { id, name, placeholder } = props;
    return <input type="date" id={id} name={name} placeholder={placeholder} />;
  },
}));

describe('CreateEmployee Component', () => {
  it('should render correctly and match snapshot', () => {
    const { container } = render(<CreateEmployee />);
    expect(container).toMatchSnapshot();
  });
});
