from sqlalchemy.orm import relationship, backref
from .db import db

class Connection(db.Model):
    __tablename__ = 'connection'
    id = db.Column(db.INTEGER, primary_key=True)
    user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'))
    board_id = db.Column(db.INTEGER, db.ForeignKey('board.id'))

    # ... any other fields


    # user = db.relationship("User", backref=backref("connection", cascade="all, delete-orphan"))
    # board = db.relationship("Board", backref=backref("connection", cascade="all, delete-orphan"))

    user = db.relationship("User", back_populates="connection")
    board = db.relationship("Board", back_populates="connection")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'board_id': self.board_id,
        }
