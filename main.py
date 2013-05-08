import os
import webapp2
import jinja2
import json
from google.appengine.ext import db
from google.appengine.api import users

jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))


def is_devserver():
    return os.environ['SERVER_SOFTWARE'].startswith("Dev")


class Mood(db.Model):
    name = db.StringProperty()
    color = db.StringProperty()
    user_id = db.StringProperty()

    def to_dict(self):
        mood = {"name": self.name, "color": self.color, "user_id": self.user_id}
        return mood


class MainPage(webapp2.RequestHandler):
    def get(self):
        values = {
          # 'debug': is_devserver()
        }
        template = jinja_environment.get_template('templates/index.html')
        self.response.out.write(template.render(values))


class MoodsHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        formatted_moods = []
        if user:
            mood_query = db.GqlQuery("SELECT * FROM Moods WHERE user_id = :1", user.user_id())
            moods = mood_query.get()
            if moods:
                for mood in moods:
                    formatted_moods.append(mood.to_dict())
        self.response.out.write(json.dumps(formatted_moods))


app = webapp2.WSGIApplication([
  ('/', MainPage),
  ('/moods', MoodsHandler)
  ],  debug=True)
