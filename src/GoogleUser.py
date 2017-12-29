import urllib
import json
from GoogleAuthResponse import *

# Google user verifier
class GoogleUser:
    httpCodeOk = 200

    def __init__(self, appId: str):
        self.appId = appId
        assert(len(appId) > 0)
        self.responseLengthLimit = 1000 * 1000

    def verify(self, token: str) -> bool:
        requestArgs = {"id_token": token}
        request = urllib.request.urlopen("https://www.googleapis.com/oauth2/v3/tokeninfo?" + 
            urllib.parse.urlencode(query=requestArgs))
        response = request.read(self.responseLengthLimit)
        responseData = GoogleAuthResponse(json.loads(response))
        print(responseData.sub)
        return (request.getcode() == self.httpCodeOk) and (self.appId in responseData.aud)
