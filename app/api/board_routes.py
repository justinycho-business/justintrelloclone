from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

board_routes = Blueprint('board', __name__)

@board_routes.route('/user/<int:userid>')
@login_required
def getuserboards(userid):

    # step 1
    boards = Board.query.filter_by(user_id = userid).all()

    #step 2
    boardarray = [board.to_dict() for board in boards]


    return {
        "userboards": boardarray
    }

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
    listorder = []

    for lst in listsarray:
        listSingle = {}
        listSingle['id'] = lst['id']
        listSingle['board_id'] = lst['board_id']
        listSingle['name'] = lst['name']
        listSingle['order'] = lst['order']

        listsdict[lst['id']] = listSingle

    x = 0
    for i in range(len(listsarray)):
        for lst in listsarray:
            if lst['order'] == x:
                listorder.append(lst)
                x = x + 1

    return {'lists_in_board': listsdict,
            'list_order': listorder}


@board_routes.route('/change-list-order/<int:boardid>', methods=['PUT'])
@login_required
def changelistorder(boardid):
    # step 1
    request_data_body = request.get_json()
    incoming_listorder = request_data_body['listorder']
    board__id = request_data_body['boardid']

    for index, lst in enumerate(incoming_listorder):
        neworder = index
        list_to_change = List.query.get(lst['id'])
        list_to_change.order = neworder
        db.session.commit()

    lists = List.query.filter_by(board_id = int(board__id)).all()
    listsarray2 = [lst.to_dict() for lst in lists]

    listorder = []

    x = 0
    for i in range(len(listsarray2)):
        for lst in listsarray2:
            if lst['order'] == x:
                listorder.append(lst)
                x = x + 1



    return {'list_order': listorder}


@board_routes.route('/delete-list/<int:listid>', methods=['DELETE'])
@login_required
def deletelist(listid):
    # step 1
    request_data_body = request.get_json()
    boardid = request_data_body['boardid']
    list_to_dlt = List.query.filter_by(id = listid).first()
    delete_list_dict = list_to_dlt.to_dict()
    index_of_deleted = delete_list_dict['order']
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

        if lst['order'] > index_of_deleted:
            listSingle['order'] = (lst['order'] - 1)
            list_update = List.query.get(lst['id'])
            list_update.order = (lst['order'] - 1)
            db.session.commit()

        else:
            listSingle['order'] = lst['order']

        listsdict[lst['id']] = listSingle

    lists2 = List.query.filter_by(board_id = int(boardid)).all()
    listsarray2 = [lst.to_dict() for lst in lists2]

    listorder = []

    x = 0
    for i in range(len(listsarray2)):
        for lst in listsarray2:
            if lst['order'] == x:
                listorder.append(lst)
                x = x + 1



    return {'list_order': listorder,
            'lists_in_board': listsdict }

@board_routes.route('/delete-board/<int:boardid>', methods=['DELETE'])
@login_required
def deleteboard(boardid):
    board_to_dlt = Board.query.filter_by(id = boardid).first()
    # step 2
    db.session.delete(board_to_dlt)
    #step 3
    db.session.commit()

    return {'board_details': None,
            'lists_in_board': None,
            "list_order": []
     }

@board_routes.route('/create-list/<int:boardid>', methods=['POST'])
@login_required
def createlist(boardid):
    # step 1
    request_data_body = request.get_json()
    listlength = request_data_body['listlength']
    list_to_create = List(
        name = "New List",
        board_id = boardid,
        order = listlength
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
        listSingle['order'] = lst['order']
        listsdict[lst['id']] = listSingle

    listorder = []

    x = 0
    for i in range(len(listsarray)):
        for lst in listsarray:
            if lst['order'] == x:
                listorder.append(lst)
                x = x + 1



    return {'list_order': listorder,
            'lists_in_board': listsdict }



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
        "board_details": boarddict,
        "list_order": []
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


    for i in range(len(listsarray)):
        orderupdate = List.query.get(listsarray[i]['id'])
        if (orderupdate.order == None):
            orderupdate.order = i
            db.session.commit()



    lists2 = List.query.filter_by(board_id = boardid).all()
    listsarray2 = [lst.to_dict() for lst in lists2]

    #step 3
    listsdict = {}
    listorder = []

    x = 0
    for i in range(len(listsarray2)):
        for lst in listsarray2:
            if lst['order'] == x:
                listorder.append(lst)
                x = x + 1


    for lst in listsarray2:
        listSingle = {}
        listSingle['id'] = lst['id']
        listSingle['board_id'] = lst['board_id']
        listSingle['name'] = lst['name']
        listSingle['order'] = lst['order']

        listsdict[lst['id']] = listSingle

    print(listsdict, "line 196 ===================")
    return {
        "lists_in_board": listsdict,
        "board_details": boarddict,
        "list_order": listorder
    }
