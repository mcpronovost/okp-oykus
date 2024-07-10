FROM python:3.12.4-slim-bullseye
LABEL maintainer="M-C Pronovost"

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    gettext \
    && apt-get clean

COPY requirements.txt /code/requirements.txt

RUN pip install -r requirements.txt

COPY . /code/

EXPOSE 8000

CMD ["gunicorn", "okp.wsgi"]
