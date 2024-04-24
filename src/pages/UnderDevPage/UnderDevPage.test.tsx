import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UnderDevPage } from './UnderDevPage';

const mockNavigate = jest.fn();
jest.mock('react-router', () => {
  return {
    useNavigate: () => mockNavigate,
  };
});

describe('UnderDevPage', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(<UnderDevPage />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('buttons click test', () => {
    render(<UnderDevPage />);

    const button = screen.getByRole('button', {
      name: 'UnderDevPage.buttonLabel',
    });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(mockNavigate).toBeCalledWith(-1);
  });
});
