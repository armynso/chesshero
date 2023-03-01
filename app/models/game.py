from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
