import { render } from '@testing-library/react';

import { LockIcon } from './LockIcon';

describe('LockIcon Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<LockIcon />);
    expect(container).toBeInTheDocument();
  });

  it('should contain an SVG element with the correct attributes', () => {
    const { container } = render(<LockIcon />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  it('should render the path with the correct stroke color and width', () => {
    const { container } = render(<LockIcon />);
    const pathElement = container.querySelector('path');

    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('stroke', 'white');
    expect(pathElement).toHaveAttribute('stroke-width', '2');
  });
});
