from flask import Flask
flask = Flask(__name__)
import config

@flask.route(config.webPath)
def main():
    return "Welcome!"

flask.run()