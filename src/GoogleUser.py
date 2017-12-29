import urllib
import json
    
class GoogleUser:
    def __init__(self):
        self.responseLengthLimit = 1000 * 1000

    def verify(self, token: str):
        request = urllib.request.urlopen("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
            urllib.parse.urlencode(token))
        response = request.read(self.responseLengthLimit)
        json.loads(response)
        print(response)