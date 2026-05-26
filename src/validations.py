from datetime import date


def validate_required_fields(data):
    errors = {}
    clean_data = dict(data)

    required_fields = {
        "name": "MISSING_NAME",
        "owner": "MISSING_OWNER",
        "support_model": "MISSING_SUPPORT_MODEL",
    }

    for field, error_code in required_fields.items():
        value = data.get(field, "")
        if isinstance(value, str):
            clean_data[field] = value.strip()

        if not str(clean_data.get(field, "")).strip():
            errors[field] = error_code

    return {
        "is_valid": len(errors) == 0,
        "status": "Ready" if len(errors) == 0 else "Incomplete",
        "errors": errors,
        "clean_data": clean_data,
    }


def validate_dr_consistency(data):
    errors = {}

    if data.get("disaster_recovery") == "Yes" and not data.get("last_test_date"):
        errors["last_test_date"] = "DR_TEST_DATE_REQUIRED"

    if data.get("disaster_recovery") == "No" and data.get("last_test_date"):
        errors["last_test_date"] = "DR_DATE_FORBIDDEN"

    return {
        "is_valid": len(errors) == 0,
        "status": "Ready" if len(errors) == 0 else "Inconsistent",
        "errors": errors,
    }


def clear_dr_date_when_disabled(data):
    clean_data = dict(data)

    if clean_data.get("disaster_recovery") == "No":
        clean_data["last_test_date"] = None

    return clean_data


def validate_evidence_age(evidence_date, server_date):
    if not isinstance(evidence_date, date):
        raise TypeError("evidence_date must be a date")

    if not isinstance(server_date, date):
        raise TypeError("server_date must be a date")

    age_days = (server_date - evidence_date).days

    if age_days > 365:
        return {
            "is_valid": False,
            "status": "Rejected",
            "error": "EVIDENCE_EXPIRED",
            "age_days": age_days,
        }

    return {
        "is_valid": True,
        "status": "Accepted",
        "error": None,
        "age_days": age_days,
    }