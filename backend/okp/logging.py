from logging import Filter


class SkipStaticFilter(Filter):
    """ Logging filter to skip logging of staticfiles to terminal """
    def filter(self, record):
        if str(record.getMessage()).startswith("\"GET /static/"):
            return False
        return True
