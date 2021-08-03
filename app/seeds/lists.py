from app.models import db, List

    # id = db.Column(db.INTEGER, primary_key=True)
    # name = db.Column(db.VARCHAR, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    # board_id = db.Column(db.INTEGER, db.ForeignKey('board.id'), nullable=False)
    # user = db.relationship("User", back_populates="list")
    # board = db.relationship("Board", back_populates="list")

# Adds a demo user, you can add other users here if you want
def seed_lists():
    list0 = List(
        name='list0',
        # user_id=1,
        board_id=1
        )
    list1 = List(
        name='list1',
        # user_id=1,
        board_id=1
        )
    list2 = List(
        name='list2',
        # user_id=1,
        board_id=2
        )
    list3 = List(
        name='list3',
        # user_id=1,
        board_id=1
        )
    list4 = List(
        name='list4',
        # user_id=1,
        board_id=1
        )
    list5 = List(
        name='list5',
        # user_id=1,
        board_id=1
        )
    list6 = List(
        name='list6',
        # user_id=1,
        board_id=1
        )
    list7 = List(
        name='list7',
        # user_id=1,
        board_id=1
        )


    db.session.add(list0)
    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.add(list6)
    db.session.add(list7)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_lists():
    db.session.execute('TRUNCATE list RESTART IDENTITY CASCADE;')
    db.session.commit()
