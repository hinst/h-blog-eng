class DbUserRow:
    def __init__(self):
        self.rowid = 0
        self.userId = ""
        self.name = ""
        self.picture = ""

    def asDbDict(self):
        return {'userId': self.userId, 'name': self.name, 'picture': self.picture}

    dbColumnListStr = "rowid, userId, name, picture"

    def load(self, a: list):
        self.rowid = a[0]
        self.userId = a[1]
        self.name = a[2]
        self.picture = a[3]