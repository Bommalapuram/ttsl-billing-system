FROM python:3.9-slim
WORKDIR /app
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*
RUN pip install flask psycopg2-binary
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
