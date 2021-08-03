from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

board_routes = Blueprint('board', __name__)


@board_routes.route('/changename-board/<int:boardid>', methods=['PUT'])
@login_required
def changeboardname(boardid):
    # step 1
    request_data_body = request.get_json()
    board__name = request_data_body['boardname']
    user__id = request_data_body['userid']

    board_to_change = Board.query.get(boardid)
    print(board_to_change, '----------======------')
    board_to_change.name = board__name

    #step 2
    db.session.commit()

    print('db committed')
    # return {'message': f'List with ID of {listid} has been deleted'}
    board_deets = {}
    board_deets['id'] = boardid
    board_deets['name'] = board__name
    board_deets['user_id'] = user__id



    return board_deets

@board_routes.route('/changename-list/<int:listid>', methods=['PUT'])
@login_required
def changelistname(listid):
    # step 1
    request_data_body = request.get_json()
    listname = request_data_body['listname']
    board__id = request_data_body['boardid']

    list_to_change = List.query.get(listid)
    print(list_to_change, '----------======------')
    list_to_change.name = listname

    #step 2
    db.session.commit()

    print('db committed')
    # return {'message': f'List with ID of {listid} has been deleted'}
    lists = List.query.filter_by(board_id = int(board__id)).all()
    listsarray = [lst.to_dict() for lst in lists]
    listsdict = {}
    for lst in listsarray:
        listSingle = {}
        listSingle['id'] = lst['id']
        listSingle['board_id'] = lst['board_id']
        listSingle['name'] = lst['name']
        listsdict[lst['id']] = listSingle

    return listsdict

@board_routes.route('/delete-list/<int:listid>', methods=['DELETE'])
@login_required
def deletelist(listid):
    # step 1
    request_data_body = request.get_json()
    boardid = request_data_body['boardid']
    list_to_dlt = List.query.filter_by(id = listid).first()
    # step 2
    db.session.delete(list_to_dlt)
    #step 3
    db.session.commit()
    # return {'message': f'List with ID of {listid} has been deleted'}
    lists = List.query.filter_by(board_id = int(boardid)).all()
    listsarray = [lst.to_dict() for lst in lists]
    listsdict = {}
    for lst in listsarray:
        listSingle = {}
        listSingle['id'] = lst['id']
        listSingle['board_id'] = lst['board_id']
        listSingle['name'] = lst['name']
        listsdict[lst['id']] = listSingle

    return listsdict

@board_routes.route('/delete-board/<int:boardid>', methods=['DELETE'])
@login_required
def deleteboard(boardid):
    board_to_dlt = Board.query.filter_by(id = boardid).first()
    # step 2
    db.session.delete(board_to_dlt)
    #step 3
    db.session.commit()

    return {'board_details': None,
            'lists_in_board': None
     }

@board_routes.route('/create-list/<int:boardid>', methods=['POST'])
@login_required
def createlist(boardid):
    # step 1
    list_to_create = List(
        name = "New List",
        board_id = boardid
        )
    # step 2
    db.session.add(list_to_create)
    #step 3
    db.session.commit()

    #step 4
    just_added_list = List.query.filter_by(board_id = boardid).all()
    listsarray = [lst.to_dict() for lst in just_added_list]
    listsdict = {}
    for lst in listsarray:
        listSingle = {}
        listSingle['id'] = lst['id']
        listSingle['board_id'] = lst['board_id']
        listSingle['name'] = lst['name']
        listsdict[lst['id']] = listSingle

    return listsdict

@board_routes.route('/create-board/<int:userid>', methods=['POST'])
@login_required
def createboard(userid):
    # step 1
    board_to_create = Board(
        name = "New Board",
        user_id = userid
        )
    # step 2
    db.session.add(board_to_create)
    #step 3
    db.session.commit()

    #step 4
    just_added_board = Board.query.filter_by(user_id = userid).order_by(Board.id.desc()).first()

    boarddict = just_added_board.to_dict()


    return {
        "lists_in_board": {},
        "board_details": boarddict
    }

@board_routes.route('/<int:boardid>')
@login_required
def getboards(boardid):

    # step 1
    board = Board.query.filter_by(id = boardid).first()
    lists = List.query.filter_by(board_id = boardid).all()

    #step 2
    boarddict = board.to_dict()
    listsarray = [lst.to_dict() for lst in lists]

    #step 3
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
