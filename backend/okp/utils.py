def get_abbr(string, max=2):
    parts = string.split()
    if not parts:
        return ""

    abbr = ""
    if len(parts) >= 2:
        # First letter of first word
        abbr += parts[0][0]

        # For middle words
        for part in parts[1:-1]:
            if len(abbr) >= max:
                break
            abbr += part[0]

        # Last letter if we still have room
        if len(abbr) < max:
            abbr += parts[-1][0]
    else:
        abbr = parts[0][0]

    return abbr.upper()[:max]