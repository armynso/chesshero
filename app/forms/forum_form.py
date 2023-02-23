from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Forum

def header_exists(form, field):
    header = field.data
    forum = Forum.query.filter(Forum.header == header).first()
    if forum:
        raise ValidationError('This subject has already been created by another user.')

class CreateForum(FlaskForm):
    header = StringField("header", validators=[DataRequired(), header_exists])
    content = StringField("content", validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
