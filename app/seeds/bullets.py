from app.models import db, Bullet

    # id = db.Column(db.INTEGER, primary_key=True)
    # name = db.Column(db.VARCHAR, nullable=False)
    # content = db.Column(db.VARCHAR, nullable=False)
    # completed = db.Column(db.BOOLEAN, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    # checklist_id = db.Column(db.INTEGER, db.ForeignKey('checklist.id'), nullable=False)
    # user = db.relationship("User", back_populates="bullet")
    # checklist = db.relationship("Checklist", back_populates="bullet")
# Adds a demo user, you can add other users here if you want
def seed_bullets():
    bullet0 = Bullet(
        name=' bullet0',
        content= "hi, I am the first bullet",
        completed= False,
        # user_id=1,
        checklist_id=1
        )
    bullet1 = Bullet(
        name=' bullet1',
        content= "hi, I am the bullet one",
        completed= True,
        # user_id=1,
        checklist_id=1
        )
    bullet2 = Bullet(
        name=' bullet2',
        content= "hi, I am the bullet two",
        completed= False,
        # user_id=1,
        checklist_id=2
        )


    db.session.add(bullet0)
    db.session.add(bullet1)
    db.session.add(bullet2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_bullets():
    db.session.execute('TRUNCATE bullet RESTART IDENTITY CASCADE;')
    db.session.commit()
