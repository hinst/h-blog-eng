import sqlite3
from GoogleUser import *
from datetime import datetime

class DbUserRow:
    def __init__(self):
        self.rowid = 0
        self.userId = ""
        self.name = ""

    def asDbDict(self):
        return {'userId': self.userId, 'name': self.name}

class DbCommentRow:
    def __init__(self, dbList: list = None):
        if dbList == None:
            self.rowid = 0
            self.userId = ""
            self.moment = datetime.strftime(datetime.utcnow(), "%Y-%m-%d %H:%M:%S")
            self.content = ""
            self.topic = ""
        else:
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

class DB:
    def __init__(self):
        self.dbFilePath = "db.db"

    def start(self):
        connection = self.connect()
        connection.execute("CREATE TABLE IF NOT EXISTS comments(userId TEXT, moment TEXT, topic TEXT, content TEXT)")
        connection.execute("CREATE TABLE IF NOT EXISTS users(userId TEXT PRIMARY KEY, name TEXT)")
        connection.close()

    def connect(self):
        return sqlite3.connect(self.dbFilePath)

    def updateUser(self, connection: sqlite3.Connection, user: DbUserRow):
        existingUser = self.readUserById(connection, user.userId)
        if existingUser != None:
            if existingUser.name != user.name:
                connection.execute("update users set name=:name where userId=:userId", user.asDbDict())
        else:
            connection.execute("insert into users (userId, name) values (:userId, :name)", user.asDbDict())

    def readUserById(self, connection: sqlite3.Connection, id: str) -> DbUserRow:
        result: DbUserRow = None
        cursor = connection.cursor()
        cursor.execute("select userId, name from users where userId=?", [id])
        users = cursor.fetchall()
        if len(users) > 0:
            user = users[0]
            result = DbUserRow()
            result.userId = user[0]
            result.name = user[1]
        return result
    
    def addCommentDirect(self, connection: sqlite3.Connection, commentRow: DbCommentRow):
        cursor = connection.cursor()
        queryStr = "insert into comments (userId, moment, topic, content)"
        queryStr +=             " values (:userId, :moment, :topic, :content)"
        cursor.execute(queryStr, commentRow.asDbDict())

    def addComment(self, connection: sqlite3.Connection, user: DbUserRow, comment: DbCommentRow):
        self.updateUser(connection, user)
        comment.userId = user.userId
        self.addCommentDirect(connection, comment)

    def readCommentsByTopic(self, connection: sqlite3.Connection, topic: str):
        cursor = connection.cursor()
        cursor.execute("select rowid, userId, moment, topic, content from comments where topic=?", [topic])
        rows = cursor.fetchall()
        comments = [DbCommentRow(row) for row in rows]
        return comments