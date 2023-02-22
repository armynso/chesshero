from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Forum(db.Model):
    __tablename__ = 'forums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    header = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    # post_id = db.Column(db.Integer, db.ForeignKey("discourses.id"))

    discourses = db.relationship("Discourse", back_populates="forum")
    user = db.relationship("User", back_populates="forums")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.id,
            'header': self.header,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'discourse': self.discourse,
            # 'by_user': self.user
        }
