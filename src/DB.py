import sqlite3

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
