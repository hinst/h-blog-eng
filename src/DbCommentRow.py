from datetime import datetime

class DbCommentRow:
    def __init__(self, dbList: list = None):
        self.rowid = 0
        self.userId = ""
        self.moment = datetime.strftime(datetime.utcnow(), "%Y-%m-%d %H:%M:%S")
        self.content = ""
        self.topic = ""
        if dbList != None:
            self.load(dbList)

    def asDbDict(self):
        return {'userId': self.userId,
            'moment': self.moment,
            'topic': self.topic,
            'content': self.content}

    dbColumnListStr = "rowid, userId, moment, topic, content"

    def load(self, a: list):
        self.rowid = a[0]
        self.userId = a[1]
        self.moment = a[2]
        self.topic = a[3]
        self.content = a[4]

