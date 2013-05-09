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


def downcase(str):
    return_str = ""

    if len(str) != 0:
        for char in str:
            return_str += char.lower()

    return return_str


class Mood(db.Model):
    name = db.StringProperty()
    color = db.StringProperty()
    user_id = db.StringProperty()
    tag_id = db.IntegerProperty()

    def to_dict(self):
        mood = {"name": downcase(self.name),
                "color": self.color,
                "user_id": self.user_id,
                "tag_id": self.tag_id,
                "id": self.key().id()}

        return mood


class Tag(db.Model):
    name = db.StringProperty()

    def to_dict(self):
        tag = {"name": downcase(self.name),
               "moods": self.moods(),
               "id": self.key().id()}

        return tag

    def moods(self):
        my_moods = []
        mood_query = db.GqlQuery("SELECT * FROM Mood WHERE tag_id = :1", self.key().id())

        for mood in mood_query:
            my_moods.append(mood.to_dict())

        return my_moods


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

            for mood in moods:
                formatted_moods.append(mood.to_dict())

        self.response.out.write(json.dumps(formatted_moods))

    def post(self):
        user = users.get_current_user()
        mood_data = json.loads(self.request.body)

        name = mood_data.get("name", "")
        color = mood_data.get("color", "")

        tag = db.GqlQuery("SELECT * FROM Tag WHERE name = :1", name).get()

        if tag:
            mood = Mood(name=name, color=color, user_id=user.user_id(), tag_id=tag.key().id())
            mood.put()
        else:
            new_tag = Tag(name=name)
            new_tag.put()
            mood = Mood(name=name, color=color, user_id=user.user_id(), tag_id=new_tag.key().id())
            mood.put()

        self.response.out.write(json.dumps(mood.to_dict()))


class TagsHandler(webapp2.RequestHandler):
    def get(self):
        return_tags = []

        for tag in Tag.all():
            return_tags.append(tag.to_dict())

        self.response.out.write(json.dumps(return_tags))


class UserHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        formatted_user = {"name": user.nickname(), "email": user.email(), "id": user.user_id()}
        self.response.out.write(json.dumps(formatted_user))


app = webapp2.WSGIApplication([
  ('/', MainPage),
  ('/moods', MoodsHandler),
  ('/tags', TagsHandler),
  ('/user', UserHandler)
  ],  debug=True)
