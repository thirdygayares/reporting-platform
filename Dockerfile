FROM python:3.13-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Rest of your Dockerfile remains the same
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Set execute permissions properly
RUN chmod +x /app/entrypoint.sh && \
    chown -R 1000:1000 /app

# Create non-root user
RUN useradd -m myuser && chown -R myuser:myuser /app
USER root
RUN apt-get update && apt-get install -y curl wget
USER myuser

EXPOSE 8000

# Use entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
