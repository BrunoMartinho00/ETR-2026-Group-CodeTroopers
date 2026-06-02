Feature: Validation rules for asset intake
  This feature validates the selected Lab 11 requirements.

  # REQ links: REQ-004, REQ-006, REQ-007

  Scenario: Happy path — Valid dashboard URL is accepted
    Given the dashboard URL is "https://monitoring.empresa.com"
    When the dashboard URL is validated
    Then the dashboard URL should be accepted

  Scenario: Negative path — Insecure dashboard URL is rejected
    Given the dashboard URL is "http://monitoring.empresa.com"
    When the dashboard URL is validated
    Then the dashboard URL should be rejected

  Scenario: Negative path — Duplicate hostname blocks the transition
    Given the hostname "CORE-ERP" already exists
    When the hostname "CORE-ERP" is validated
    Then the hostname should be rejected as duplicate