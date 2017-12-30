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
    def __init__(self):
        self.userId = ""
        self.moment = str(datetime.now())
        self.content = ""

    def asDbDict(self):
        return {'userId': self.userId, 'moment': self.moment, 'content': self.content}

class DB:
    def __init__(self):
        self.dbFilePath = "db.db"

    def start(self):
        connection = self.connect()
        connection.execute("CREATE TABLE IF NOT EXISTS comments(userId TEXT, moment TEXT, content TEXT)")
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
        cursor.execute("insert into comments (userId, moment, content) values (:userId, :moment, :content)", commentRow.asDbDict())

    def addComment(self, connection: sqlite3.Connection, user: DbUserRow, content: str):
        self.updateUser(connection, user)
        comment = DbCommentRow()
        comment.userId = user.userId
        comment.content = content
        self.addCommentDirect(connection, comment)