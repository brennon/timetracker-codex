import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import path from 'path';
import App from '../App';

const feature = loadFeature(path.join(__dirname, '../../features/stopTimer.feature'));

defineFeature(feature, test => {
  let promptSpy: jest.SpyInstance;
  let confirmSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    promptSpy = jest.spyOn(window, 'prompt');
    confirmSpy = jest.spyOn(window, 'confirm');
  });

  afterEach(() => {
    jest.useRealTimers();
    promptSpy.mockRestore();
    confirmSpy.mockRestore();
  });

  test('log activity when stopping', ({ given, when, and, then }) => {
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

    and('1 second passes', () => {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    });

    and(/^the description prompt returns "([^"]*)"$/, desc => {
      promptSpy.mockReturnValue(desc);
    });

    and('the user clicks "Stop"', () => {
      fireEvent.click(screen.getByText('Stop'));
    });

    then('the project timer should display "00:00:00"', () => {
      expect(screen.getByText('00:00:00')).toBeInTheDocument();
    });

    and(/^the activity list should contain "([^"]*)"$/, text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test('continue previous activity', ({ given, and, when, then }) => {
    given('the app is mounted', () => {
      render(<App />);
    });

    and('the user has logged "Coding" for 1 second', () => {
      fireEvent.change(screen.getByPlaceholderText('Project name'), {
        target: { value: 'My Project' },
      });
      fireEvent.click(screen.getByText('Add Project'));
      fireEvent.click(screen.getByText('Start'));
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      promptSpy.mockReturnValue('Coding');
      fireEvent.click(screen.getByText('Stop'));
    });

    when('the user clicks "Start"', () => {
      fireEvent.click(screen.getByText('Start'));
    });

    and('1 second passes', () => {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    });

    and('the confirm to continue returns true', () => {
      confirmSpy.mockReturnValue(true);
    });

    and('the user clicks "Stop"', () => {
      fireEvent.click(screen.getByText('Stop'));
    });

    then(/^the activity list should contain "([^"]*)"$/, text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
