
Youtube2JSON
====

Fetch the transcript of all the Youtube videos in a channel, built with channels and youtube-transcript-api


## Installation

1- You need to install pipenv to run the project, you can install it using pip `pip install pipenv`, after that 
you can install the project's packages through either:

```pipenv
pipenv install
```
or 
```pip
pipenv install -r requirements.txt
```

2- On windows install Memurai (a redis alternative), get it from here [here](https://www.memurai.com/), 
and if you're using a linux-based system install and run a redis server.

3- Install a chrome web driver to run selenium, install the approporiate driver according to your 
system using [this link](https://chromedriver.chromium.org/downloads), after the installation make
sure you add the executable driver to the path.


4- Make sure you have the latest npm


5- Install client side dependencies: 

```
cd client && npm i
```


6- Run the server by: `pipenv run server`, then run the client: `npm run start`
7- Add a YouTube channel's url. The url should be of the format `https://www.youtube.com/c/<channel_name_or_id>/videos`

