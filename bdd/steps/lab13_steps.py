from datetime import date

from behave import given, when, then

from src.validations import (
    clear_dr_date_when_disabled,
    validate_dr_consistency,
    validate_evidence_age,
    validate_required_fields,
)


@given("an intake record with required fields completed")
def step_required_fields_completed(context):
    context.record = {
        "name": "Core Banking Platform",
        "owner": "maria.silva@empresa.com",
        "support_model": "Internal Support",
    }


@given("an intake record with a name containing only spaces")
def step_name_only_spaces(context):
    context.record = {
        "name": "   ",
        "owner": "maria.silva@empresa.com",
        "support_model": "Internal Support",
    }


@given('an intake record with Disaster Recovery set to "No"')
def step_dr_set_to_no(context):
    context.record = {
        "disaster_recovery": "No",
        "last_test_date": None,
    }


@given("the intake record has a DR test date")
def step_record_has_dr_test_date(context):
    context.record["last_test_date"] = date(2026, 5, 1)


@given('an evidence file dated "{evidence_date}"')
def step_evidence_file_dated(context, evidence_date):
    context.evidence_date = date.fromisoformat(evidence_date)


@given('the server date is "{server_date}"')
def step_server_date_is(context, server_date):
    context.server_date = date.fromisoformat(server_date)


@when("the required fields are validated")
def step_required_fields_are_validated(context):
    context.result = validate_required_fields(context.record)


@when("the DR disabled cleanup rule is applied")
def step_dr_cleanup_rule_is_applied(context):
    context.result = clear_dr_date_when_disabled(context.record)


@when("the DR consistency is validated")
def step_dr_consistency_is_validated(context):
    context.result = validate_dr_consistency(context.record)


@when("the evidence age is validated")
def step_evidence_age_is_validated(context):
    context.result = validate_evidence_age(context.evidence_date, context.server_date)


@then("the required field validation should pass")
def step_required_field_validation_should_pass(context):
    assert context.result["is_valid"] is True


@then("the required field validation should fail")
def step_required_field_validation_should_fail(context):
    assert context.result["is_valid"] is False


@then('the intake status should be "{expected_status}"')
def step_intake_status_should_be(context, expected_status):
    assert context.result["status"] == expected_status


@then('the validation error for "{field}" should be "{expected_error}"')
def step_validation_error_for_field_should_be(context, field, expected_error):
    assert context.result["errors"][field] == expected_error


@then("the DR test date should be cleared")
def step_dr_test_date_should_be_cleared(context):
    assert context.result["last_test_date"] is None


@then("the DR consistency validation should fail")
def step_dr_consistency_validation_should_fail(context):
    assert context.result["is_valid"] is False


@then("the evidence should be accepted")
def step_evidence_should_be_accepted(context):
    assert context.result["is_valid"] is True
    assert context.result["status"] == "Accepted"


@then("the evidence should be rejected")
def step_evidence_should_be_rejected(context):
    assert context.result["is_valid"] is False
    assert context.result["status"] == "Rejected"


@then("the evidence age should be {expected_days:d} days")
def step_evidence_age_should_be(context, expected_days):
    assert context.result["age_days"] == expected_days


@then('the evidence error should be "{expected_error}"')
def step_evidence_error_should_be(context, expected_error):
    assert context.result["error"] == expected_error