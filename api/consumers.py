import json
from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import JsonWebsocketConsumer
from channels.exceptions import StopConsumer
import json   
import pandas as pd 
from channels.generic.websocket import AsyncWebsocketConsumer
import io
from .Scraper import ChannelScraper
import sys

from youtube_transcript_api import YouTubeTranscriptApi


class NewSessionConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()

    def receive(self, text_data=None, bytes_data=None): 
        print(text_data)
        vals = json.loads(text_data)
        url = vals['url']
        print(vals, text_data)
        scraper = ChannelScraper()
        videos = scraper.scrape(url)
        print(videos, 28)
        self.send(json.dumps(videos), 200)
        
    def disconnect(self, close_code):
        self.close()
        raise StopConsumer()



class TranscriptsConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()

    def receive(self, text_data=None, bytes_data=None):
        print(text_data)
        vals = json.loads(text_data)
        video_id = vals['v']
        transcript_res = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        print(transcript_res)
        transcript = ''
        for item in transcript_res:
            transcript += item['text'] + '\n'
        res = {'transcript': transcript, 'v': video_id}
        self.send(json.dumps(res), 200)

    def disconnect(self, close_code):
        pass
        # raise StopConsumer()