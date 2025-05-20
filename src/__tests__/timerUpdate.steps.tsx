import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import path from 'path';
import App from '../App';

const feature = loadFeature(path.join(__dirname, '../../features/timerUpdate.feature'));

defineFeature(feature, test => {
  test('timer increments while project is running', ({ given, when, and, then }) => {
    jest.useFakeTimers();
    given('the app is mounted', () => {
      render(<App />);
    });

    when(/^the user types "([^"]*)" into the project name input$/, name => {
      fireEvent.change(screen.getByPlaceholderText('Project name'), {
        target: { value: name },
      });
    });

    and('the user clicks "Add Project"', () => {
      fireEvent.click(screen.getByText('Add Project'));
    });

    and('the user clicks "Start"', () => {
      fireEvent.click(screen.getByText('Start'));
    });

    and(/^(\d+) seconds pass$/, seconds => {
      act(() => {
        jest.advanceTimersByTime(Number(seconds) * 1000);
      });
    });

    then(/^the project list should show the time "([^"]*)"$/, time => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });
});
