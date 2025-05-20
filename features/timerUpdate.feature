Feature: Running timer updates
  As a user
  I want the displayed time to update while a project is running
  So that I can see time tracked in real time

  Scenario: timer increments while project is running
    Given the app is mounted
    When the user types "Test Project" into the project name input
    And the user clicks "Add Project"
    And the user clicks "Start"
    And 2 seconds pass
    Then the project list should show the time "00:00:02"
