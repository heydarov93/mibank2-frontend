import { fireEvent, render, screen } from '@testing-library/react';

import { UnderDevPage } from './UnderDevPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('UnderDevPage', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(<UnderDevPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('buttons click test', () => {
    render(<UnderDevPage />);

    const button = screen.getByRole('button', {
      name: 'buttonLabel',
    });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockNavigate).toBeCalledWith(-1);
  });
});
