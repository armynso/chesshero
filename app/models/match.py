from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Match(db.Model):
    __tablename__ = 'matches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    player1Username = db.Column(db.String, nullable=False)
    player2Username = db.Column(db.String, nullable=True)
    player1Color = db.Column(db.String, nullable=False)
    time = db.Column(db.String, nullable=False)
    increment = db.Column(db.String, nullable=False)
    rated = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)


    user = db.relationship("User", back_populates="matches")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.id,
            'player1Username': self.player1Username,
            'player2Username': self.player2Username,
            'player1Color': self.player1Color,
            'time': self.time,
            'increment': self.increment,
            'rated': self.rated,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'username': self.user.to_dict()['username']
            # 'discourse': self.discourse,
            # 'by_user': self.user
        }
