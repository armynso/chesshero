from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    player1 = db.Column(db.String, nullable=False)
    player2 = db.Column(db.String, nullable=False)
    player1Color = db.Column(db.String, nullable=False)
    player1Time = db.Column(db.Integer, nullable=False)
    player2Time = db.Column(db.Integer, nullable=False)
    increment = db.Column(db.Integer, nullable=False)
    rated = db.Column(db.Boolean, nullable=False, default=False)
    player1Elo = db.Column(db.Integer, nullable=False)
    player2Elo = db.Column(db.Integer, nullable=False)
    movesCount = db.Column(db.Integer, nullable=True, default=0)
    fen = db.Column(db.String, nullable=True, default='start')
    result = db.Column(db.String, nullable=True)
    lastMove = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.id,
            'player1': self.player1,
            'player2': self.player2,
            'player1Color': self.player1Color,
            'player1Time': self.player1Time,
            'player2Time': self.player2Time,
            'increment': self.increment,
            'rated': self.rated,
            'player1Elo': self.player1Elo,
            'player2Elo': self.player2Elo,
            'movesCount': self.movesCount,
            'fen': self.fen,
            'result': self.result,
            'lastMove': self.lastMove,
            'created_at': self.created_at,
            'updated_at': self.updated_at
            # 'discourse': self.discourse,
            # 'by_user': self.user
        }
