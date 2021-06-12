  
from django.urls import re_path
from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'ws/session/new', consumers.NewSessionConsumer.as_asgi()),
    url(r'ws/session/transcripts', consumers.TranscriptsConsumer.as_asgi()),
]