from app import db
from sqlalchemy import Identity, ForeignKey


class Comment(db.Model):
    __tablename__ = "comments"
    comment_id = db.Column(db.Integer, Identity(), primary_key=True)
    story_title = db.Column(db.String(120), nullable=False)
    story_body = db.Column(db.Text, nullable=False)
    story_image = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, ForeignKey("users.user_id"), nullable=False)
    user = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            "comment_id": self.comment_id,
            "story_title": self.story_title,
            "story_body": self.story_body,
            "story_image": self.story_image,
            "user_id": self.user_id,
        }
