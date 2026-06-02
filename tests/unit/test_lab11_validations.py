from src.validations import (
    validate_dashboard_url,
    validate_hostname_uniqueness,
    validate_integration_owner_email,
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
