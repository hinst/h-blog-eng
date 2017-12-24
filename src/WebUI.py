from flask import Flask, send_file
from os import listdir
from os.path import isfile, join

class WebUI:
    def __init__(self, flask: Flask = None, webPath = "/h-blog"):
        self.flask = flask
        self.webPath = webPath
        if False: self.debugListFiles()
        self.prepareLayout()

        @flask.route(webPath)
        def main():
            return 'Welcome!'

        @flask.route(webPath + '/js-bin/<string:fileName>')
        def js_bin(fileName):
            return send_file('../js-bin/' + fileName, conditional=True)

    def registerStaticFileFolder(self, folder: str):
        @self.flask.route(self.webPath + '/' + folder + '/<string:fileName>')
        def fileDeliverer(fileName):
            return send_file('../' + folder + '/' + fileName, conditional=True)
    
    def prepareLayout(self):
        with open('src/layout.html', 'r') as file:
            content: str = file.read()
            content = content.replace('_web_path_', self.webPath)
            with open('html-bin/layout.html', 'r') as outputFile:
                outputFile.write(content)

    def debugListFiles(self):
        print("Files:")
        for file in listdir("."):
            print(file)



