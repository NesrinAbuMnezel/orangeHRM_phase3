Feature: Managing Candidate Statuses Feature

  Scenario: Change the candidate status to "Interview Passed"
    Given Log in as an Admin for Scenario 1
    When Access the candidate form
    And Change the candidate status to "Interview Passed"
    Then verify the status and the available button options for Interview Passed

  Scenario: Change the candidate status to "Interview Failed"
    Given Log in as an Admin for Scenario 2
    When Access the candidate form
    And Change the candidate status to "Interview Failed"
    Then verify the status and the available button options for Interview Failed