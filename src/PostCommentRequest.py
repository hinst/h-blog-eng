class PostCommentRequest:
    def __init__(self, dictionary: dict):
        self.token: str = dictionary["token"]
        self.comment: str = dictionary["comment"]