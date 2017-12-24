from flask import Flask, send_file
from os import listdir
from os.path import isfile, join

class WebUI:
    fileDirs = ['css-3rd', 'js-3rd', 'html-bin', 'js-bin']

    def __init__(self, flask: Flask = None, webPath = "/h-blog"):
        self.flask = flask
        self.webPath = webPath
        if False: self.debugListFiles()
        self.prepareLayout()
        @flask.route(webPath)
        def main():
            return send_file("../html-bin/layout.html", conditional=True)
        for fileDir in self.fileDirs:
            self.registerStaticFileFolder(fileDir)

    def registerStaticFileFolder(self, folder: str):
        url = self.webPath + '/' + folder + '/<string:fileName>'
        def fileDeliverer(fileName):
            return send_file('../' + folder + '/' + fileName, conditional=True)
        fileDeliverer.__name__ = 'fileDeliverer_' + folder
        self.flask.add_url_rule(url, view_func=fileDeliverer)
    
    def prepareLayout(self):
        with open('src/layout.html', 'r') as file:
            content: str = file.read()
            content = content.replace('_web_path_', self.webPath)
            with open('html-bin/layout.html', 'w') as outputFile:
                outputFile.write(content)

    def debugListFiles(self):
        print("Files:")
        for file in listdir("."):
            print(file)



