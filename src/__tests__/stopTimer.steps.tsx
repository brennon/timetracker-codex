import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import path from 'path';
import App from '../App';

const feature = loadFeature(path.join(__dirname, '../../features/stopTimer.feature'));

defineFeature(feature, test => {
  test('start and stop a timer', ({ given, when, then, and }) => {
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

    then('the button for the project should display "Stop"', () => {
      expect(screen.getByText('Stop')).toBeInTheDocument();
    });

    and('the user clicks "Stop"', () => {
      fireEvent.click(screen.getByText('Stop'));
    });

    then('the button for the project should display "Start"', () => {
      expect(screen.getByText('Start')).toBeInTheDocument();
    });
  });
});
