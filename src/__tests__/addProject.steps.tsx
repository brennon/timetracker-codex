import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import path from 'path';
import App from '../App';

const feature = loadFeature(path.join(__dirname, '../../features/addProject.feature'));

defineFeature(feature, test => {
  test('add a project to the list', ({ given, when, then, and }) => {
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

    then(/^the project list should show an item named "([^"]*)"$/, name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
