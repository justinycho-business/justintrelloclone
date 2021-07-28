from .db import db

class Bullet(db.Model):
    __tablename__ = 'bullet'

    id = db.Column(db.INTEGER, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
    content = db.Column(db.VARCHAR, nullable=False)
    completed = db.Column(db.BOOLEAN, nullable=False)
    user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    checklist_id = db.Column(db.INTEGER, db.ForeignKey('checklist.id'), nullable=False)
    user = db.relationship("User", back_populates="bullet")
    checklist = db.relationship("Checklist", back_populates="bullet")

    def to_dict(self):
            return {
              'id': self.id,
              'name': self.name,
              'content': self.content,
              'completed': self.completed,
              'user_id': self.user_id,
              'checklist_id': self.checklist_id,
            }
