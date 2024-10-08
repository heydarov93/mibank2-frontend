import { render, screen } from '@testing-library/react';

import { ValidationTag } from './ValidationTag';

describe('ValidationTag', () => {
  it('should render without crashing', () => {
    const { container } = render(<ValidationTag tagText={''} isValidated />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct text', () => {
    render(<ValidationTag tagText="Minimum 8 characters" isValidated />);
    expect(screen.getByText('Minimum 8 characters')).toBeInTheDocument();
  });

  it('renders CheckIcon when isValidated is true', () => {
    render(<ValidationTag tagText="" isValidated />);
    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument();
  });

  it('renders ClearIcon when isValidated is false', () => {
    render(<ValidationTag tagText="" isValidated={false} />);
    expect(screen.getByTestId('ClearIcon')).toBeInTheDocument();
  });

  it('renders info icon when isSpecial is true', () => {
    render(<ValidationTag tagText="" isValidated isSpecial />);
    const infoIcon = screen.getByTestId('InfoOutlinedIcon');
    expect(infoIcon).toBeInTheDocument();
  });
});
