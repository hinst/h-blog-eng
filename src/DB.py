import sqlite3
from GoogleUser import *

class DbUserRow:
    def __init__(self):
        self.name = ""
        self.id = ""

class DB:
    def __init__(self):
        self.dbFilePath = "db.db"

    def start(self):
        connection = self.connect()
        connection.execute("CREATE TABLE IF NOT EXISTS comments(userId TEXT, moment TEXT, content TEXT)")
        connection.execute("CREATE TABLE IF NOT EXISTS users(userId TEXT PRIMARY KEY, name TEXT)")
        connection.close()

    def updateUser(self, connection: sqlite3.Connection, user: DbUserRow):
        existingUser = self.readUserById(connection, user.id)
        if existingUser != None:
            #if existingUser.name != user.name:
                print("updating")
                connection.execute("update users set name=:name where userId=:userId", 
                    {'name': user.name, 'userId': user.id})
        else:
            print("inserting")
            connection.execute("insert into users (userId, name) values (:userId, :name)",
                {'name': user.name, 'userId': user.id})

    def readUserById(self, connection: sqlite3.Connection, id: str) -> DbUserRow:
        result: DbUserRow = None
        cursor = connection.cursor()
        cursor.execute("select userId, name from users where userId=?", [id])
        users = cursor.fetchall()
        if len(users) > 0:
            user = users[0]
            print("users")
            print(users)
            result = DbUserRow()
            result.id = user[0]
            result.name = user[1]
        return result
    
    def connect(self):
        return sqlite3.connect(self.dbFilePath)
