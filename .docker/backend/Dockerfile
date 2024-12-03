FROM python:3.12 AS base
LABEL org.opencontainers.image.authors="mcpronovost"

# Prevent Python from writing bytecode, and buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set environment variables
ENV PATH=/home/oykus/.local/bin:$PATH

# Update system packages and install required dependencies
RUN apt-get update && apt-get upgrade -y && apt-get install -y gettext

# ================================================================
# Create builder stage for installing Python dependencies
FROM base AS builder

WORKDIR /app

# Install Python dependencies using requirements.txt
# This step is separated to leverage Docker layer caching
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# ================================================================
# Create final stage with minimal image size
FROM base

WORKDIR /app

# Copy Python packages and executables from builder stage
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application source code
COPY . .

RUN groupadd -r oykus && useradd -r -g oykus -d /app -s /sbin/nologin -c "Docker image user" oykus
RUN chown -R oykus:oykus /app
USER oykus

# ================================================================
# Start Django development server
# ================================================================
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
