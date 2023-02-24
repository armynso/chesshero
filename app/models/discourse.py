from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Discourse(db.Model):
    __tablename__ = 'discourses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    post = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    forum_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("forums.id")))

    forum = db.relationship("Forum", uselist=False, back_populates="discourses")



    user = db.relationship("User", back_populates="discourses")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post': self.post,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'username': self.user.to_dict()['username'],
            'forumId': self.forum_id
            # 'by_user': self.user
        }
