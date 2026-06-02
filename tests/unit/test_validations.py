# --------------------------- LAB 11 ---------------------------

from src.validations import (
    validate_dashboard_url,
    validate_integration_owner_email,
    validate_hostname_uniqueness,
)


def test_dashboard_url_accepts_valid_https_url():
    assert validate_dashboard_url("https://monitoring.empresa.com") is True


def test_dashboard_url_rejects_http_url():
    assert validate_dashboard_url("http://monitoring.empresa.com") is False


def test_dashboard_url_rejects_invalid_domain():
    assert validate_dashboard_url("https://invalid") is False


def test_integration_owner_accepts_corporate_email():
    assert validate_integration_owner_email("maria.silva@empresa.com") is True


def test_integration_owner_rejects_external_email():
    assert validate_integration_owner_email("maria.silva@gmail.com") is False


def test_integration_owner_rejects_missing_local_part():
    assert validate_integration_owner_email("@empresa.com") is False


def test_duplicate_hostname_blocks_ready_transition():
    assert validate_hostname_uniqueness("CORE-ERP", {"CORE-ERP"}) is False


def test_unique_hostname_allows_ready_transition():
    assert validate_hostname_uniqueness("CORE-ERP", {"CORE-CRM"}) is True

# --------------------------- LAB 12 ---------------------------

from datetime import date


from src.validations import (
    clear_dr_date_when_disabled,
    validate_dr_consistency,
    validate_evidence_age,
    validate_required_fields,
)


def test_required_fields_accept_valid_values():
    data = {
        "name": "Core Banking Platform",
        "owner": "maria.silva@empresa.com",
        "support_model": "Internal Support",
    }

    result = validate_required_fields(data)

    assert result["is_valid"] is True
    assert result["status"] == "Ready"
    assert result["errors"] == {}


def test_required_fields_trim_extra_spaces():
    data = {
        "name": "  Core Banking Platform  ",
        "owner": "  maria.silva@empresa.com  ",
        "support_model": "  Internal Support  ",
    }

    result = validate_required_fields(data)

    assert result["is_valid"] is True
    assert result["clean_data"]["name"] == "Core Banking Platform"
    assert result["clean_data"]["owner"] == "maria.silva@empresa.com"
    assert result["clean_data"]["support_model"] == "Internal Support"


def test_required_fields_reject_whitespace_only_name():
    data = {
        "name": "   ",
        "owner": "maria.silva@empresa.com",
        "support_model": "Internal Support",
    }

    result = validate_required_fields(data)

    assert result["is_valid"] is False
    assert result["status"] == "Incomplete"
    assert result["errors"]["name"] == "MISSING_NAME"


def test_required_fields_reject_missing_owner():
    data = {
        "name": "Core Banking Platform",
        "owner": "",
        "support_model": "Internal Support",
    }

    result = validate_required_fields(data)

    assert result["is_valid"] is False
    assert result["status"] == "Incomplete"
    assert result["errors"]["owner"] == "MISSING_OWNER"


def test_dr_yes_with_test_date_is_valid():
    data = {
        "disaster_recovery": "Yes",
        "last_test_date": date(2026, 5, 1),
    }

    result = validate_dr_consistency(data)

    assert result["is_valid"] is True
    assert result["status"] == "Ready"
    assert result["errors"] == {}


def test_dr_no_with_test_date_is_inconsistent():
    data = {
        "disaster_recovery": "No",
        "last_test_date": date(2026, 5, 1),
    }

    result = validate_dr_consistency(data)

    assert result["is_valid"] is False
    assert result["status"] == "Inconsistent"
    assert result["errors"]["last_test_date"] == "DR_DATE_FORBIDDEN"


def test_dr_date_is_cleared_when_dr_changes_to_no():
    data = {
        "disaster_recovery": "No",
        "last_test_date": date(2026, 5, 1),
    }

    result = clear_dr_date_when_disabled(data)

    assert result["disaster_recovery"] == "No"
    assert result["last_test_date"] is None


def test_evidence_365_days_old_is_accepted():
    server_date = date(2026, 5, 26)
    evidence_date = date(2025, 5, 26)

    result = validate_evidence_age(evidence_date, server_date)

    assert result["is_valid"] is True
    assert result["status"] == "Accepted"
    assert result["error"] is None
    assert result["age_days"] == 365


def test_evidence_366_days_old_is_rejected():
    server_date = date(2026, 5, 26)
    evidence_date = date(2025, 5, 25)

    result = validate_evidence_age(evidence_date, server_date)

    assert result["is_valid"] is False
    assert result["status"] == "Rejected"
    assert result["error"] == "EVIDENCE_EXPIRED"
    assert result["age_days"] == 366


def test_dr_yes_without_test_date_is_inconsistent():
    data = {
        "disaster_recovery": "Yes",
        "last_test_date": None,
    }

    result = validate_dr_consistency(data)

    assert result["is_valid"] is False
    assert result["status"] == "Inconsistent"
    assert result["errors"]["last_test_date"] == "DR_TEST_DATE_REQUIRED"


def test_evidence_300_days_old_is_accepted():
    server_date = date(2026, 5, 26)
    evidence_date = date(2025, 7, 30)

    result = validate_evidence_age(evidence_date, server_date)

    assert result["is_valid"] is True
    assert result["status"] == "Accepted"
    assert result["error"] is None
    assert result["age_days"] == 300
