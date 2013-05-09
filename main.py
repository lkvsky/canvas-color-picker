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
        user = users.get_current_user()

        if user:
            values = {
              # 'debug': is_devserver()
            }
            template = jinja_environment.get_template('templates/index.html')
            self.response.out.write(template.render(values))
        else:
            greeting = ("<a href=\"%s\">Sign in or register</a>." %
            users.create_login_url("/"))
            self.response.out.write("<html><body>%s</body></html>" % greeting)


class MoodsHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        formatted_moods = []

        if user:
            moods = db.GqlQuery("SELECT * FROM Mood WHERE user_id = :1", user.user_id())

            if moods:
                for mood in moods:
                    formatted_moods.append(mood.to_dict())

        self.response.out.write(json.dumps(formatted_moods))

    def post(self):
        user = users.get_current_user()
        mood_data = json.loads(self.request.body)

        name = mood_data.get("name", "")
        color = mood_data.get("color", "")

        mood = Mood(name=name, color=color, user_id=user.user_id())
        mood.put()

        self.response.out.write(json.dumps(mood.to_dict()))


class UserHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        formatted_user = {"name": user.nickname(), "email": user.email(), "id": user.user_id()}
        self.response.out.write(json.dumps(formatted_user))


app = webapp2.WSGIApplication([
  ('/', MainPage),
  ('/moods', MoodsHandler),
  ('/user', UserHandler)
  ],  debug=True)
