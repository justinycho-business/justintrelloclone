from app.models import db, Connection

    # id = db.Column(db.INTEGER, primary_key=True)
    # name = db.Column(db.VARCHAR, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)


# Adds a demo user, you can add other users here if you want
def seed_connections():
    connection0 = Connection(
        user_id  = 1,
        board_id = 1

    )
    connection1 = Connection(
        user_id  = 1,
        board_id = 2

    )
    connection2 = Connection(
        user_id  = 2,
        board_id = 3
    )


    db.session.add(connection0)
    db.session.add(connection1)
    db.session.add(connection2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_connections():
    db.session.execute('TRUNCATE connection RESTART IDENTITY CASCADE;')
    db.session.commit()
