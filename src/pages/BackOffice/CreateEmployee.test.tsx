import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import CreateEmployee from './CreateEmployee';

describe('CreateEmployee Component', () => {
  it('renders the form correctly', () => {
    render(<CreateEmployee />);

    expect(
      screen.getByPlaceholderText('Enter the First Name'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter the Last Name'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('example@gmail.com'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Choose here')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Date Added')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('enables the submit button when the form is valid', async () => {
    render(<CreateEmployee />);

    fireEvent.change(screen.getByPlaceholderText('Enter the First Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter the Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('example@gmail.com'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Choose here'), {
      target: { value: 'Administrator' },
    });
    fireEvent.change(screen.getByPlaceholderText('Date Added'), {
      target: { value: '2000-01-16' },
    });

    await waitFor(() => {
      const saveButton = screen.getByText('Save');
      expect(saveButton).toBeInTheDocument();
    });
  });
});
