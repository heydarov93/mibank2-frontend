import { render, fireEvent } from '@testing-library/react';

import { SubmitButton } from './SubmitButton';

describe('SubmitButton', () => {
  it('renders correctly with given props', () => {
    const { getByText } = render(
      <SubmitButton onClick={() => {}} buttonContent="Submit" />,
    );

    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <SubmitButton onClick={handleClick} buttonContent="Submit" />,
    );

    fireEvent.click(getByText('Submit'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders the correct button content', () => {
    const buttonContent = <span>Submit</span>;
    const { getByText } = render(
      <SubmitButton onClick={() => {}} buttonContent={buttonContent} />,
    );

    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('is disabled when isDisabled is true', () => {
    const { getByText } = render(
      <SubmitButton onClick={() => {}} buttonContent="Submit" isDisabled />,
    );

    const button = getByText('Submit').closest('button');
    expect(button).toBeDisabled();
  });

  it('is enabled when isDisabled is false or not provided', () => {
    const { getByText } = render(
      <SubmitButton onClick={() => {}} buttonContent="Submit" />,
    );

    const button = getByText('Submit').closest('button');
    expect(button).not.toBeDisabled();
  });
});
