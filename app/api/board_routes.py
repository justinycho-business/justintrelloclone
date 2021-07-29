from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

board_routes = Blueprint('board', __name__)




@board_routes.route('/<int:boardid>')
@login_required
def getboards(boardid):
    print(boardid, '----------------------------')
    board = Board.query.filter_by(id = boardid).first()
    lists = List.query.filter_by(board_id = boardid).all()
    print(board)
    print(lists)

    boarddict = board.to_dict()
    listsarray = [lst.to_dict() for lst in lists]

    print(boarddict)
    print(listsarray, '=========================')

    listsdict = {}
    for lst in listsarray:
        listSingle = {}
        listSingle['id'] = lst['id']
        listSingle['board_id'] = lst['board_id']
        listSingle['name'] = lst['name']
        listsdict[lst['id']] = listSingle

    print(listsdict, "===================")
    return {
        "lists_in_board": listsdict,
        "board_details": boarddict
    }
