import { render, screen, act } from '@testing-library/react';

import { Timer } from './Timer';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.useFakeTimers();

describe('Timer Component', () => {
  const endTime = Date.now() + 10000;

  it('should render the initial time correctly', () => {
    render(<Timer time={10000} endTime={endTime} runTimer={jest.fn()} />);

    expect(screen.getByText('00:10')).toBeInTheDocument();
  });

  it('should update the time every second', () => {
    const setTime = jest.fn();
    const runTimer = jest.fn();

    render(
      <Timer
        time={10000}
        endTime={endTime}
        runTimer={runTimer}
        setTime={setTime}
      />,
    );

    expect(screen.getByText('00:10')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('00:09')).toBeInTheDocument();
  });

  it('should stop the timer when time reaches zero if setTime prop was passed', () => {
    const setTime = jest.fn();
    const runTimer = jest.fn();

    render(
      <Timer
        time={1000}
        endTime={Date.now() + 1000}
        runTimer={runTimer}
        setTime={setTime}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setTime).toHaveBeenCalledWith(0);
  });

  it('should stop the timer when time reaches zero if setTime prop wasnt passed', () => {
    const runTimer = jest.fn();

    render(
      <Timer time={1000} endTime={Date.now() + 1000} runTimer={runTimer} />,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(runTimer).toHaveBeenCalledWith(false);
  });

  it('should show resend code label when hasResendBtn is true', () => {
    const runTimer = jest.fn();

    render(
      <Timer time={10000} endTime={endTime} runTimer={runTimer} hasResendBtn />,
    );

    expect(screen.getByText('resendCodeIn 00:10')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByText('resendCode')).toBeInTheDocument();
  });
});
