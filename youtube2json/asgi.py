  
import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.security.websocket import AllowedHostsOriginValidator, OriginValidator
import api.routing as SessionRouting

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings') 

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        SessionRouting.websocket_urlpatterns
    )
})