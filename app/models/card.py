from .db import db

class Card(db.Model):
    __tablename__ = 'card'

    id = db.Column(db.INTEGER, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
    order = db.Column(db.INTEGER, nullable=True)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    list_id = db.Column(db.INTEGER, db.ForeignKey('list.id'), nullable=False)
    # user = db.relationship("User", back_populates="card")
    list = db.relationship("List", back_populates="card")
    checklist = db.relationship("Checklist", back_populates="card", cascade="all, delete-orphan")

    def to_dict(self):
            return {
              'id': self.id,
              'name': self.name,
              'order': self.order,
              # 'user_id': self.user_id,
              'list_id': self.list_id,
            }
