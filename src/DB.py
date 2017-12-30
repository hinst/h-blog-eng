import sqlite3
from GoogleUser import *
from DbUserRow import *
from DbCommentRow import *

class DB:
    def __init__(self):
        self.dbFilePath = "db.db"

    def start(self):
        connection = self.connect()
        connection.execute("CREATE TABLE IF NOT EXISTS comments(userId TEXT, moment TEXT, topic TEXT, content TEXT)")
        connection.execute("CREATE TABLE IF NOT EXISTS users(userId TEXT PRIMARY KEY, name TEXT, picture TEXT)")
        connection.close()

    def connect(self):
        return sqlite3.connect(self.dbFilePath)

    def updateUser(self, connection: sqlite3.Connection, user: DbUserRow):
        existingUser = self.readUserById(connection, user.userId)
        if existingUser != None:
            if (existingUser.name != user.name) or (existingUser.picture != user.picture):
                connection.execute("update users set name=:name, picture=:picture where userId=:userId", user.asDbDict())
        else:
            connection.execute("insert into users (userId, name, picture) values (:userId, :name, :picture)", user.asDbDict())

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

    def readCommentsByTopic(self, connection: sqlite3.Connection, topic: str) -> [(DbUserRow, DbCommentRow)]:
        cursor = connection.cursor()
        cursor.execute("select rowid, userId, moment, topic, content from comments where topic=?", [topic])
        rows = cursor.fetchall()
        comments = [DbCommentRow(row) for row in rows]
        fullComments = [(self.getCommentUser(connection, comment), comment) for comment in comments]
        return fullComments

    def getCommentUser(self, connection: sqlite3.Connection, comment: DbCommentRow) -> DbUserRow:
        user = DbUserRow()
        cursor = connection.cursor()
        cursor.execute("select " + user.dbColumnListStr + " from users where userId=?", [comment.userId])
        rows = cursor.fetchall()
        if len(rows) > 0:
            user.load(rows[0])
        else:
            user = None
        return user