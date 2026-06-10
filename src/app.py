from datetime import date

from src.validations import (
    validate_dashboard_url,
    validate_dr_consistency,
    validate_evidence_age,
    validate_hostname_uniqueness,
    validate_integration_owner_email,
    validate_required_fields,
)


def main():
    record = {
        "name": "Core Banking Platform",
        "owner": "maria.silva@empresa.com",
        "support_model": "Internal Support",
        "disaster_recovery": "Yes",
        "last_test_date": date(2026, 5, 1),
    }

    existing_hostnames = {"CORE-ERP", "CORE-CRM"}

    print("Asset Intake Validation Demo")
    print("----------------------------")
    print("Required fields:", validate_required_fields(record))
    print("DR consistency:", validate_dr_consistency(record))
    print("Evidence age:", validate_evidence_age(date(2025, 5, 26), date(2026, 5, 26)))
    print("Dashboard URL valid:", validate_dashboard_url("https://monitoring.empresa.com"))
    print("Owner email valid:", validate_integration_owner_email(record["owner"]))
    print("Hostname unique:", validate_hostname_uniqueness("CORE-BANKING", existing_hostnames))


if __name__ == "__main__":
    main()