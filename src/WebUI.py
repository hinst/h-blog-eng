import flask
from flask import Flask
import os
import io

class WebUI:
    fileDirs = ['css-3rd', 'js-3rd', 'html-bin', 'js-bin']
    maxContentLength = 1000 * 1000

    def __init__(self, flask: Flask = None, webPath = "/h-blog"):
        self.flask = flask
        self.webPath = webPath
        if False: self.debugListFiles()
        self.prepareLayout()
        self.startRoutes()
        for fileDir in self.fileDirs:
            self.registerStaticFileFolder(fileDir)
    
    def startRoutes(self):
        @self.flask.route(self.webPath)
        def main():
            return self.getLayoutContent()
        @self.flask.route(self.webPath + "/page/<path:path>")
        def page(path):
            return self.getLayoutContent()
        @self.flask.route(self.webPath + "/entries")
        def entries(): return self.getBlogEntryList()
        @self.flask.route(self.webPath + "/entry/<string:filename>")
        def entry(filename):
            filename = filename + ".txt"
            lengthArg = flask.request.args.get("length")
            contentLength = self.maxContentLength if lengthArg == None else int(lengthArg)
            return self.getBlogEntryContent(filename, contentLength)

    def registerStaticFileFolder(self, folder: str):
        url = self.webPath + '/' + folder + '/<string:fileName>'
        def fileDeliverer(fileName):
            return flask.send_file('../' + folder + '/' + fileName, conditional=True)
        fileDeliverer.__name__ = 'fileDeliverer_' + folder
        self.flask.add_url_rule(url, view_func=fileDeliverer)
    
    def prepareLayout(self):
        with open('html-bin/layout.html', 'w') as outputFile:
            outputFile.write(self.getLayoutContent())

    def getLayoutContent(self):
        with open('src/layout.html', 'r') as file:
            content: str = file.read()
            content = content.replace('_web_path_', self.webPath)
            return content

    def debugListFiles(self):
        print("Files:")
        for file in os.listdir("."):
            print(file)

    def getBlogEntryList(self):
        files = os.listdir("blog")
        files = [os.path.splitext(filename)[0] for filename in files]
        return flask.jsonify(files)

    def getBlogEntryContent(self, filename: str, length: int):
        if ".." in filename: return
        if "/" in filename: return
        with io.open('blog/' + filename, mode='r', encoding="utf-8") as file:
            content = file.read(length)
            return content