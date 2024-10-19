FROM python:3.12.4-slim-bullseye
LABEL maintainer="M-C Pronovost"

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    gettext \
    && apt-get clean

COPY requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 8000