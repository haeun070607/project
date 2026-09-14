FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    libaio1t64 \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Python.wsgi:application"]