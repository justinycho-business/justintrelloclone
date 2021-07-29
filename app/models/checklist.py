from .db import db

class Checklist(db.Model):
    __tablename__ = 'checklist'

    id = db.Column(db.INTEGER, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    card_id = db.Column(db.INTEGER, db.ForeignKey('card.id'), nullable=False)
    # user = db.relationship("User", back_populates="checklist")
    card = db.relationship("Card", back_populates="checklist")
    bullet = db.relationship("Bullet", back_populates="checklist")
    def to_dict(self):
            return {
              'id': self.id,
              'name': self.name,
              # 'user_id': self.user_id,
              'card_id': self.card_id,
            }
