from flask import Flask
from Config import *
from DB import *
from WebUI import *

config = Config()
flask = Flask(__name__)
db = DB()
db.start()
webUI = WebUI(flask, db, config)

flask.run()