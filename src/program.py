from flask import Flask
import config
from DB import *
from WebUI import *

flask = Flask(__name__)
db = DB()
db.start()
webUI = WebUI(flask, db, googleSignInAppId=config.googleSignInAppId)

flask.run()