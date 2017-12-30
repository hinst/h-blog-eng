import urllib
import json
from GoogleAuthResponse import *

# Google user verifier
class GoogleUser:
    httpCodeOk = 200

    def __init__(self, appId: str):
        self.appId = appId
        self.response: GoogleAuthResponse = None
        self.userId = ""
        self.userName = ""
        self.pictureUrl = ""
        assert(len(appId) > 0)
        self.responseLengthLimit = 1000 * 1000

    def verify(self, token: str) -> bool:
        requestArgs = {"id_token": token}
        requestSuccess = False
        try:
            request = urllib.request.urlopen("https://www.googleapis.com/oauth2/v3/tokeninfo?" + 
                urllib.parse.urlencode(query=requestArgs))
            response = request.read(self.responseLengthLimit)
            requestSuccess = request.getcode() == self.httpCodeOk
        except urllib.error.HTTPError:
            requestSuccess = False
        if requestSuccess:
            self.response = GoogleAuthResponse(json.loads(response))
            self.userId = self.response.sub
            self.userName = self.response.name
            self.pictureUrl = self.response.picture
            return (self.appId in self.response.aud)
        else:
            return False
