import urllib
import json
from GoogleAuthResponse import *

# Google user verifier
class GoogleUser:
    httpCodeOk = 200

    def __init__(self, appId: str):
        self.appId = appId
        self.userId = ""
        self.userName = ""
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
            responseData = GoogleAuthResponse(json.loads(response))
            self.userId = responseData.sub
            self.userName = responseData.name
            return (self.appId in responseData.aud)
        else:
            return False
