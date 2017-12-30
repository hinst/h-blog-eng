class DbUserRow:
    def __init__(self):
        self.rowid = 0
        self.userId = ""
        self.name = ""

    def asDbDict(self):
        return {'userId': self.userId, 'name': self.name}

    dbColumnListStr = "rowid, userId, name"

    def load(self, a: list):
        self.rowid = a[0]
        self.userId = a[1]
        self.name = a[2]