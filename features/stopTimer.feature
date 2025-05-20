Feature: Stop a timer
  As a user
  I want to stop tracking time for a project
  So that I can pause work on it

  Scenario: start and stop a timer
    Given the app is mounted
    When the user types "My Project" into the project name input
    And the user clicks "Add Project"
    And the user clicks "Start"
    Then the button for the project should display "Stop"
    And the user clicks "Stop"
    Then the button for the project should display "Start"
