from app.models import db, Board

    # id = db.Column(db.INTEGER, primary_key=True)
    # name = db.Column(db.VARCHAR, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    # user = db.relationship("User", back_populates="list")

# Adds a demo user, you can add other users here if you want
def seed_boards():
    board0 = Board(
        name='board0',
        user_id=1,
        )
    board1 = Board(
        name='board1',
        user_id=1,
        )
    board2 = Board(
        name='board2',
        user_id=2,
        )

    db.session.add(board0)
    db.session.add(board1)
    db.session.add(board2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_boards():
    db.session.execute('TRUNCATE board RESTART IDENTITY CASCADE;')
    db.session.commit()
