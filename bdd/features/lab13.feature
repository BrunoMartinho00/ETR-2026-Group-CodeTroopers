Feature: Data quality validation for asset intake
  This feature validates key acceptance behaviors for required fields,
  Disaster Recovery consistency, and evidence expiry.

  # REQ links: REQ-001, REQ-003, REQ-005

  # REQ-001 / AC-1
  Scenario: Happy path — Final submission is valid when required fields are complete
    Given an intake record with required fields completed
    When the required fields are validated
    Then the required field validation should pass
    And the intake status should be "Ready"

  # REQ-001 / AC-2
  Scenario: Negative path — Final submission is blocked when required fields contain only spaces
    Given an intake record with a name containing only spaces
    When the required fields are validated
    Then the required field validation should fail
    And the validation error for "name" should be "MISSING_NAME"

  # REQ-003 / AC-2
  Scenario: Alternative flow — DR test date is cleared when Disaster Recovery changes to No
    Given an intake record with Disaster Recovery set to "No"
    And the intake record has a DR test date
    When the DR disabled cleanup rule is applied
    Then the DR test date should be cleared

  # REQ-003 / AC-3
  Scenario: Negative path — Submission is inconsistent when DR is No but a test date exists
    Given an intake record with Disaster Recovery set to "No"
    And the intake record has a DR test date
    When the DR consistency is validated
    Then the DR consistency validation should fail
    And the intake status should be "Inconsistent"
    And the validation error for "last_test_date" should be "DR_DATE_FORBIDDEN"

  # REQ-005 / AC-1 / AC-2
  Scenario: Boundary behavior — Evidence exactly 365 days old is accepted
    Given an evidence file dated "2025-05-26"
    And the server date is "2026-05-26"
    When the evidence age is validated
    Then the evidence should be accepted
    And the evidence age should be 365 days

  # REQ-005 / AC-1 / AC-2
  Scenario: Negative path — Evidence older than 365 days is rejected
    Given an evidence file dated "2025-05-25"
    And the server date is "2026-05-26"
    When the evidence age is validated
    Then the evidence should be rejected
    And the evidence error should be "EVIDENCE_EXPIRED"