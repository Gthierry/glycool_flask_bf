from app import db
from sqlalchemy import Identity


class Story(db.Model):
    __tablename__ = "stories"
    story_id = db.Column(db.Integer, Identity(), primary_key=True)
    story_title = db.Column(db.String(255), nullable=False)
    story_body = db.Column(db.Text, nullable=False)
    story_image = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    user = db.relationship("User", back_populates="story")
    # TODO check for the image table maybe, then image id here

    def to_dict(self):
        return {
            "story_id": self.story_id,
            "story_title": self.story_title,
            "story_body": self.story_body,
            "story_image": self.story_image,
            "user_id": self.user_id,
        }
