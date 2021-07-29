from flask.cli import AppGroup
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards
from .connections import seed_connections, undo_connections
from .lists import seed_lists, undo_lists
from .cards import seed_cards, undo_cards
from .checklists import seed_checklists, undo_checklists
from .bullets import seed_bullets, undo_bullets

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_boards()
    seed_connections()
    seed_lists()
    seed_cards()
    seed_checklists()
    seed_bullets()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_bullets()
    undo_checklists()
    undo_cards()
    undo_lists()
    undo_connections()
    undo_boards()
    undo_users()
    # Add other undo functions here
