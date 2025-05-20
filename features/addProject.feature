Feature: Add a project
  As a user
  I want to add a project
  So that I can track time for it

  Scenario: add a project to the list
    Given the app is mounted
    When the user types "My Project" into the project name input
    And the user clicks "Add Project"
    Then the project list should show an item named "My Project"
