from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateForum(FlaskForm):
    header = StringField("header", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
