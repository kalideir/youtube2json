FROM python:3.8.9-buster

WORKDIR /usr/src/app

COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir  --prefer-binary -r requirements.txt
COPY . .

CMD ["python", "./manage.py", "makemigrations"]
CMD ["python", "./manage.py", "migrate"]
CMD [ "python", "./manage.py", "runserver"]