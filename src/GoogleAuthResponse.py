class GoogleAuthResponse:
    def __init__(self, dictionary: dict):
        self.iss: str = dictionary["iss"]
        self.sub: str = dictionary["sub"] # user id
        self.aud: str = dictionary["aud"] # google api app id
        self.name: str = dictionary["name"]
        self.picture: str = dictionary["picture"]
