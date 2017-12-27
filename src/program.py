from flask import Flask
import config
from WebUI import *

flask = Flask(__name__)
webUI = WebUI(flask, googleSignInAppId=config.googleSignInAppId)

flask.run()