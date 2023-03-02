from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class EditGame(FlaskForm):
    player1Time = IntegerField("player1Time", validators=[DataRequired()])
    player2Time = IntegerField("player2Time", validators=[DataRequired()])
    movesCount = IntegerField("movesCount", validators=[DataRequired()])
    fen = StringField("fen", validators=[DataRequired()])
    lastMove = StringField("lastMove", validators=[DataRequired()])
    result = StringField("result")


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
