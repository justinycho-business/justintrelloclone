from .db import db

class List(db.Model):
    __tablename__ = 'list'

    id = db.Column(db.INTEGER, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    board_id = db.Column(db.INTEGER, db.ForeignKey('board.id'), nullable=False)
    # user = db.relationship("User", back_populates="list")
    board = db.relationship("Board", back_populates="list")
    card = db.relationship("Card", back_populates="list", cascade="all, delete-orphan")

    def to_dict(self):
            return {
              'id': self.id,
              'name': self.name,
              # 'user_id': self.user_id,
              'board_id': self.board_id,
            }
