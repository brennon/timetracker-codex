Feature: Stop a timer
  As a user
  I want to record work when stopping a timer
  So that my project history captures activities

  Scenario: log activity when stopping
    Given the app is mounted
    When the user types "My Project" into the project name input
    And the user clicks "Add Project"
    And the user clicks "Start"
    And 1 second passes
    And the description prompt returns "Coding"
    And the user clicks "Stop"
    Then the project timer should display "00:00:00"
    And the activity list should contain "Coding - 00:00:01"

  Scenario: continue previous activity
    Given the app is mounted
    And the user has logged "Coding" for 1 second
    When the user clicks "Start"
    And 1 second passes
    And the confirm to continue returns true
    And the user clicks "Stop"
    Then the activity list should contain "Coding - 00:00:02"
