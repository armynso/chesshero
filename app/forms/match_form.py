from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateMatch(FlaskForm):
    player1Username = StringField("player1Username", validators=[DataRequired()])
    player1Color = StringField("player1Color", validators=[DataRequired()])
    time = StringField("time", validators=[DataRequired()])
    # increment = StringField("increment", validators=[DataRequired()])
    # player1Elo = IntegerField("player1Elo", validators=[DataRequired()])
    rated = BooleanField("rated")
