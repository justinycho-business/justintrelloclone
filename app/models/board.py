from .db import db

class Board(db.Model):
    __tablename__ = 'board'

    id = db.Column(db.INTEGER, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
    user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship("User", back_populates="board")
    list = db.relationship("List", back_populates="board")
    connection = db.relationship("Connection", back_populates="board")

    def to_dict(self):
            return {
              'id': self.id,
              'name': self.name,
              'user_id': self.user_id,

            }
