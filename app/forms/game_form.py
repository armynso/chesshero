from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateGame(FlaskForm):
    player1 = StringField("player1", validators=[DataRequired()])
    player2 = StringField("player2", validators=[DataRequired()])
    player1Color = StringField("player1Color", validators=[DataRequired()])

    player1Time = IntegerField("player1Time", validators=[DataRequired()])
    player2Time = IntegerField("player2Time", validators=[DataRequired()])
    increment = IntegerField("increment", validators=[DataRequired()])
    rated = BooleanField("rated")

    player1Elo = IntegerField("player1Elo", validators=[DataRequired()])
    player2Elo = IntegerField("player2Elo", validators=[DataRequired()])






    # player1 = db.Column(db.String, nullable=False)
    # player2 = db.Column(db.String, nullable=False)
    # player1Color = db.Column(db.String, nullable=False)
    # player1Time = db.Column(db.Integer, nullable=False)
    # player2Time = db.Column(db.Integer, nullable=False)
    # increment = db.Column(db.Integer, nullable=False)
    # rated = db.Column(db.Boolean, nullable=False, default=False)
    # player1Elo = db.Column(db.Integer, nullable=False)
    # player2Elo = db.Column(db.Integer, nullable=False)
    # movesCount = db.Column(db.Integer, nullable=True, default=0)
    # fen = db.Column(db.String, nullable=True, default='start')
    # result = db.Column(db.String, nullable=True)
    # lastMove = db.Column(db.String, nullable=True)
