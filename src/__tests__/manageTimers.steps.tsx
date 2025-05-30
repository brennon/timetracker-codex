import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import path from 'path';
import App from '../App';
import { setDialogImpl } from '../utils/dialog';

const feature = loadFeature(path.join(__dirname, '../../features/manageTimers.feature'));

defineFeature(feature, test => {
  const getButtonFor = (name: string): HTMLButtonElement => {
    return screen
      .getByText(name)
      .closest('li')!
      .querySelector('button') as HTMLButtonElement;
  };

  let confirmMock: jest.Mock;
  let promptMock: jest.Mock;

  beforeEach(() => {
    confirmMock = jest.fn();
    promptMock = jest.fn().mockResolvedValue('work');
    setDialogImpl({ confirm: confirmMock, prompt: promptMock });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const setupTwoProjects = () => {
    fireEvent.change(screen.getByPlaceholderText('Project name'), {
      target: { value: 'Project 1' },
    });
    fireEvent.click(screen.getByText('Add Project'));
    fireEvent.change(screen.getByPlaceholderText('Project name'), {
      target: { value: 'Project 2' },
    });
    fireEvent.click(screen.getByText('Add Project'));
  };

  test('stop other timers when starting a new one', ({ given, when, then, and }) => {
    given('the app is mounted', () => {
      render(<App />);
    });

    and('two projects exist', () => {
      setupTwoProjects();
    });

    and('the first project is running', () => {
      fireEvent.click(getButtonFor('Project 1'));
    });

    when('the user confirms stopping timers and starts the second project', async () => {
      confirmMock.mockResolvedValue(true);
      await act(async () => {
        fireEvent.click(getButtonFor('Project 2'));
      });
    });

    then('the first project button should display "Start"', () => {
      expect(getButtonFor('Project 1').textContent).toBe('Start');
    });

    and('the second project button should display "Stop"', () => {
      expect(getButtonFor('Project 2').textContent).toBe('Stop');
    });
  });

  test('keep other timers running when starting a new one', ({ given, when, then, and }) => {
    given('the app is mounted', () => {
      render(<App />);
    });

    and('two projects exist', () => {
      setupTwoProjects();
    });

    and('the first project is running', () => {
      fireEvent.click(getButtonFor('Project 1'));
    });

    when('the user declines stopping timers and starts the second project', async () => {
      confirmMock.mockResolvedValue(false);
      await act(async () => {
        fireEvent.click(getButtonFor('Project 2'));
      });
    });

    then('the first project button should display "Stop"', () => {
      expect(getButtonFor('Project 1').textContent).toBe('Stop');
    });

    and('the second project button should display "Stop"', () => {
      expect(getButtonFor('Project 2').textContent).toBe('Stop');
    });
  });
});
