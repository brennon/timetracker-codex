Feature: Manage multiple timers
  As a user
  I want control over other running timers when starting a new one
  So that I can choose to stop them or keep them running

  Scenario: stop other timers when starting a new one
    Given the app is mounted
    And two projects exist
    And the first project is running
    When the user confirms stopping timers and starts the second project
    Then the first project button should display "Start"
    And the second project button should display "Stop"

  Scenario: keep other timers running when starting a new one
    Given the app is mounted
    And two projects exist
    And the first project is running
    When the user declines stopping timers and starts the second project
    Then the first project button should display "Stop"
    And the second project button should display "Stop"
