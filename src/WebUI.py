from flask import Flask, send_file
from os import listdir
from os.path import isfile, join

class WebUI:
    def __init__(self, flask: Flask = None, webPath = "/h-blog"):
        self.flask = flask

        @flask.route(webPath)
        def main():
            return 'Welcome!'

        @flask.route(webPath + '/js-bin/<string:fileName>')
        def js_bin(fileName):
            return send_file('../js-bin/' + fileName, conditional=True)


