import { render, screen } from '@testing-library/react';

import { ProgressStepper } from './ProgressStepper';

const defaultProps = {
  steps: [1, 2, 3, 4],
  activeStep: 1,
};

describe('ProgressStepper', () => {
  describe('Rendering', () => {
    it('renders stepper with correct active step', () => {
      render(<ProgressStepper {...defaultProps} />);

      const stepper = screen.getByTestId('stepper');
      expect(stepper).toBeInTheDocument();
      expect(stepper).toHaveAttribute('data-active-step', '1');
    });

    it('renders all step elements', () => {
      render(<ProgressStepper {...defaultProps} />);

      const steps = screen.getAllByTestId('step');
      expect(steps).toHaveLength(4);
    });

    it('renders all step labels with correct content', () => {
      render(<ProgressStepper {...defaultProps} />);

      const stepLabels = screen.getAllByTestId('step-label');
      expect(stepLabels).toHaveLength(4);
      expect(stepLabels[0]).toHaveTextContent('1');
      expect(stepLabels[1]).toHaveTextContent('2');
      expect(stepLabels[2]).toHaveTextContent('3');
      expect(stepLabels[3]).toHaveTextContent('4');
    });
  });

  describe('Active step visibility', () => {
    it('shows active step label as visible', () => {
      render(<ProgressStepper steps={[1, 2, 3]} activeStep={1} />);

      const stepLabels = screen.getAllByTestId('step-label');
      expect(stepLabels[1]).toHaveClass('visible');
    });

    it('shows non-active step labels as hidden', () => {
      render(<ProgressStepper steps={[1, 2, 3]} activeStep={1} />);

      const stepLabels = screen.getAllByTestId('step-label');
      expect(stepLabels[0]).toHaveClass('hidden');
      expect(stepLabels[2]).toHaveClass('hidden');
    });

    it('updates visibility when active step changes', () => {
      const { rerender } = render(
        <ProgressStepper steps={[1, 2, 3]} activeStep={0} />,
      );

      let stepLabels = screen.getAllByTestId('step-label');
      expect(stepLabels[0]).toHaveClass('visible');
      expect(stepLabels[1]).toHaveClass('hidden');

      rerender(<ProgressStepper steps={[1, 2, 3]} activeStep={1} />);

      stepLabels = screen.getAllByTestId('step-label');
      expect(stepLabels[0]).toHaveClass('hidden');
      expect(stepLabels[1]).toHaveClass('visible');
    });
  });

  describe('Different step configurations', () => {
    it('handles single step', () => {
      render(<ProgressStepper steps={[1]} activeStep={0} />);

      expect(screen.getByTestId('step')).toBeInTheDocument();
      expect(screen.getByTestId('step-label')).toHaveTextContent('1');
      expect(screen.getByTestId('step-label')).toHaveClass('visible');
    });

    it('handles multiple steps with different values', () => {
      render(<ProgressStepper steps={[10, 20, 30]} activeStep={2} />);

      const stepLabels = screen.getAllByTestId('step-label');
      expect(stepLabels).toHaveLength(3);
      expect(stepLabels[0]).toHaveTextContent('10');
      expect(stepLabels[1]).toHaveTextContent('20');
      expect(stepLabels[2]).toHaveTextContent('30');
      expect(stepLabels[2]).toHaveClass('visible');
    });

    it('handles empty steps array', () => {
      render(<ProgressStepper steps={[]} activeStep={0} />);

      expect(screen.getByTestId('stepper')).toBeInTheDocument();
      expect(screen.queryByTestId('step')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles active step beyond array bounds', () => {
      render(<ProgressStepper steps={[1, 2, 3]} activeStep={5} />);

      const stepLabels = screen.getAllByTestId('step-label');
      stepLabels.forEach((label) => {
        expect(label).toHaveClass('hidden');
      });
    });

    it('handles negative active step', () => {
      render(<ProgressStepper steps={[1, 2, 3]} activeStep={-1} />);

      const stepLabels = screen.getAllByTestId('step-label');
      stepLabels.forEach((label) => {
        expect(label).toHaveClass('hidden');
      });
    });
  });
});
