from app.models import db, Checklist

    # id = db.Column(db.INTEGER, primary_key=True)
    # name = db.Column(db.VARCHAR, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    # list_id = db.Column(db.INTEGER, db.ForeignKey('list.id'), nullable=False)
    # user = db.relationship("User", back_populates="card")
    # list = db.relationship("List", back_populates="card")

# Adds a demo user, you can add other users here if you want
def seed_checklists():
    checklist0 = Checklist(
        name='checklist0',
        # user_id=1,
        card_id=1
        )
    checklist1 = Checklist(
        name='checklist1',
        # user_id=1,
        card_id=1
        )

    checklist2 = Checklist(
        name='checklist2',
        # user_id=1,
        card_id=2
        )


    db.session.add(checklist0)
    db.session.add(checklist1)
    db.session.add(checklist2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_checklists():
    db.session.execute('TRUNCATE checklist RESTART IDENTITY CASCADE;')
    db.session.commit()
