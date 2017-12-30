import flask
from flask import Flask
import os
import io
from DB import *
from GoogleUser import *
from PostCommentRequest import*
from Config import *

class WebUI:
    fileDirs = ['css-3rd', 'css-3rd/highlight.js', 'js-3rd', 'html-bin', 'js-bin', 'css']
    maxContentLength = 1000 * 1000

    def __init__(self, flask: Flask, db: DB, config: Config):
        self.flask = flask
        self.db: DB = db
        self.webPath = config.webPath
        self.googleSignInAppId = config.googleSignInAppId
        self.dynamicLayoutEnabled = False
        if False: self.debugListFiles()
        self.prepareLayout()
        self.startRoutes()
        for fileDir in self.fileDirs:
            self.registerStaticFileFolder(fileDir)
    
    def startRoutes(self):
        @self.flask.route(self.webPath)
        def main():
            return self.deliverLayoutContent()
        @self.flask.route(self.webPath + "/page/<path:path>")
        def page(path):
            return self.deliverLayoutContent()
        @self.flask.route(self.webPath + "/entries")
        def entries(): return self.getBlogEntryList()
        @self.flask.route(self.webPath + "/entry/<string:filename>")
        def entry(filename):
            filename = filename + ".txt"
            lengthArg = flask.request.args.get("length")
            contentLength = self.maxContentLength if lengthArg == None else int(lengthArg)
            return self.getBlogEntryContent(filename, contentLength)
        @self.flask.route(self.webPath + "/postComment", methods=["POST"])
        def postComment():
            return self.postComment()
        @self.flask.route(self.webPath + "/comments/<string:entryName>")
        def readCommentsByTopic(entryName):
            return self.readCommentsByTopic(entryName)
        

    def registerStaticFileFolder(self, folder: str):
        url = self.webPath + '/' + folder + '/<string:fileName>'
        def fileDeliverer(fileName):
            return flask.send_file('../' + folder + '/' + fileName, conditional=True)
        fileDeliverer.__name__ = 'fileDeliverer_' + folder
        self.flask.add_url_rule(url, view_func=fileDeliverer)
    
    def prepareLayout(self):
        with io.open('html-bin/layout.html', mode='w', encoding="utf-8") as outputFile:
            outputFile.write(self.createLayoutContent())

    def createLayoutContent(self):
        with io.open('src/layout.html', mode='r', encoding="utf-8") as file:
            content: str = file.read()
            content = content.replace('_web_path_', self.webPath)
            content = content.replace("_google_signInAppId_", self.googleSignInAppId)
            return content

    def debugListFiles(self):
        print("Files:")
        for file in os.listdir("."):
            print(file)

    def getBlogEntryList(self):
        files = os.listdir("blog")
        files = [os.path.splitext(filename)[0] for filename in files]
        files = sorted(files, reverse=True)
        return flask.jsonify(files)

    def getBlogEntryContent(self, filename: str, length: int):
        if ".." in filename: return
        if "/" in filename: return
        with io.open('blog/' + filename, mode='r', encoding="utf-8") as file:
            content = file.read(length)
            return content

    def deliverLayoutContent(self):
        if self.dynamicLayoutEnabled:
            return self.createLayoutContent()
        else:
            return flask.send_file('../html-bin/layout.html', conditional=True)

    def postComment(self):
        receivedJson = flask.request.get_json()
        requestData = PostCommentRequest(receivedJson)
        googleUser = self.googleUser() 
        userValid = googleUser.verify(requestData.token)
        if userValid:
            userRow = DbUserRow()
            userRow.userId = googleUser.userId
            userRow.name = googleUser.userName
            commentRow = DbCommentRow()
            commentRow.content = requestData.comment
            commentRow.topic = requestData.topic
            connection = self.db.connect()
            self.db.addComment(connection, userRow, commentRow)
            connection.commit()
            connection.close()
            return "success"

    def googleUser(self):
        return GoogleUser(appId = self.googleSignInAppId)

    def readCommentsByTopic(self, entryName):
        comments = self.db.readCommentsByTopic(entryName)
        for comment in comments:
            comment.userId = ""
            comment.topic = ""
        return flask.jsonify(comments)