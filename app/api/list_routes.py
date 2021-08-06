from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List, Card
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

list_routes = Blueprint('list', __name__)

@list_routes.route('/change-card-order-both', methods=['PUT'])
@login_required
def change_card_order_both():
    # step 1 - get info from fetch
    request_data_body = request.get_json()
    source_listid = int(request_data_body['source_listid'])
    destination_listid = int(request_data_body['destination_listid'])
    dict_card_moved = request_data_body['card_moved']
    new_source_list_array = request_data_body['new_source_list_array']
    new_destination_list_array = request_data_body['new_destination_list_array']
    destinationindex = int(request_data_body['destinationindex'])

    #Step 2 - updatecard order and list id
    card_update = Card.query.get(dict_card_moved['id'])
    card_update.order = destinationindex
    card_update.list_id = destination_listid
    db.session.commit()

    #step 3 compile dict and array for source list
    for index, card in enumerate(new_source_list_array):
        card_to_change = Card.query.get(card['id'])
        card_to_change.order = index
        db.session.commit()

    sourcecards = Card.query.filter_by(list_id = source_listid).all()
    sourcecardsarray = [card.to_dict() for card in sourcecards]

    sourcecardsdict = {}

    for card in sourcecardsarray:
        cardSingle = {}
        cardSingle['id'] = card['id']
        cardSingle['list_id'] = card['list_id']
        cardSingle['name'] = card['name']
        cardSingle['order'] = card['order']

        sourcecardsdict[card['id']] = cardSingle

    #step 3.5
    sourcecardorder = []

    x = 0
    for i in range(len(sourcecardsarray)):
        for card in sourcecardsarray:
            if card['order'] == x:
                sourcecardorder.append(card)
                x = x + 1

    # step 4 compile dict and array for destination list
    for index, card in enumerate(new_destination_list_array):
        card_to_change = Card.query.get(card['id'])
        card_to_change.order = index
        db.session.commit()

    destinationcards = Card.query.filter_by(list_id = destination_listid).all()
    destinationcardsarray = [card.to_dict() for card in destinationcards]

    destinationcardsdict = {}

    for card in destinationcardsarray:
        cardSingle = {}
        cardSingle['id'] = card['id']
        cardSingle['list_id'] = card['list_id']
        cardSingle['name'] = card['name']
        cardSingle['order'] = card['order']

        destinationcardsdict[card['id']] = cardSingle

    #step 4.5
    destinationcardorder = []

    x = 0
    for i in range(len(destinationcardsarray)):
        for card in destinationcardsarray:
            if card['order'] == x:
                destinationcardorder.append(card)
                x = x + 1


    return {
        'sourcelist': {
                        'listid': source_listid,
                        'dict': sourcecardsdict,
                        'order': sourcecardorder
            },
        'destinationlist': {
                        'listid': destination_listid,
                        'dict': destinationcardsdict,
                        'order': destinationcardorder
    }
    }

@list_routes.route('/change-card-order/<int:listid>', methods=['PUT'])
@login_required
def change_card_order_same_list(listid):
    # step 1
    request_data_body = request.get_json()
    incoming_cardorder = request_data_body['newcardorder']

    for index, card in enumerate(incoming_cardorder):
        card_to_change = Card.query.get(card['id'])
        card_to_change.order = index
        db.session.commit()

    cards = Card.query.filter_by(list_id = listid).all()
    cardsarray = [card.to_dict() for card in cards]

    cardsdict = {}

    for card in cardsarray:
        cardSingle = {}
        cardSingle['id'] = card['id']
        cardSingle['list_id'] = card['list_id']
        cardSingle['name'] = card['name']
        cardSingle['order'] = card['order']

        cardsdict[card['id']] = cardSingle

    #step 6
    cardorder = []

    x = 0
    for i in range(len(cardsarray)):
        for card in cardsarray:
            if card['order'] == x:
                cardorder.append(card)
                x = x + 1

    return {
        'listid': listid,
        'dict': cardsdict,
        'order': cardorder
    }


@list_routes.route('/delete-card/<int:cardid>', methods=['DELETE'])
@login_required
def deletecard(cardid):
    # step 1
    request_data_body = request.get_json()
    list_id = request_data_body['listid']
    card_to_dlt = Card.query.filter_by(id = cardid).first()
    delete_card_dict = card_to_dlt.to_dict()
    index_of_deleted = delete_card_dict['order']
    # step 2
    db.session.delete(card_to_dlt)
    #step 3
    db.session.commit()
    # return {'message': f'List with ID of {listid} has been deleted'}
    cards = Card.query.filter_by(list_id = int(list_id)).all()

    cardsarray = [card.to_dict() for card in cards]

    cardsdict = {}
    for card in cardsarray:
        cardSingle = {}
        cardSingle['id'] = card['id']
        cardSingle['list_id'] = card['list_id']
        cardSingle['name'] = card['name']

        if card['order'] > index_of_deleted:
            cardSingle['order'] = (card['order'] - 1)
            card_update = Card.query.get(card['id'])
            card_update.order = (card['order'] - 1)
            db.session.commit()

        else:
            cardSingle['order'] = card['order']

        cardsdict[card['id']] = cardSingle

    cards2 = Card.query.filter_by(list_id = int(list_id)).all()
    cardsarray2 = [card.to_dict() for card in cards2]


    #step 6
    cardorder = []

    x = 0
    for i in range(len(cardsarray2)):
        for card in cardsarray2:
            if card['order'] == x:
                cardorder.append(card)
                x = x + 1



    return {
        'listid': int(list_id),
        'dict': cardsdict,
        'order': cardorder
    }

@list_routes.route('/change-name-card/<int:cardid>', methods=['PUT'])
@login_required
def changenamecards(cardid):
    # step 1
    request_data_body = request.get_json()
    cardname = request_data_body['cardname']
    list__id = request_data_body['listid']

    card_to_change = Card.query.get(cardid)
    card_to_change.name = cardname

    #step 2
    db.session.commit()

    # return {'message': f'List with ID of {listid} has been deleted'}
    cards = Card.query.filter_by(list_id = int(list__id)).all()
    cardsarray = [card.to_dict() for card in cards]

    #step 5
    cardsdict = {}

    for card in cardsarray:
        cardSingle = {}
        cardSingle['id'] = card['id']
        cardSingle['list_id'] = card['list_id']
        cardSingle['name'] = card['name']
        cardSingle['order'] = card['order']

        cardsdict[card['id']] = cardSingle

    #step 6
    cardorder = []

    x = 0
    for i in range(len(cardsarray)):
        for card in cardsarray:
            if card['order'] == x:
                cardorder.append(card)
                x = x + 1

    return {
        'listid': int(list__id),
        'dict': cardsdict,
        'order': cardorder
    }


@list_routes.route('/create-card/<int:listid>', methods=['POST'])
@login_required
def createcards(listid):
    # step 1
    request_data_body = request.get_json()
    cardlength = request_data_body['cardlength']
    card_to_create = Card(
        name = "New Card",
        list_id = listid,
        order = cardlength
    )
    # step 2
    db.session.add(card_to_create)
    #step 3
    db.session.commit()

    #step 4
    just_added_card = Card.query.filter_by(list_id = listid).all()
    cardsarray = [card.to_dict() for card in just_added_card]

    #step 5
    cardsdict = {}

    for card in cardsarray:
        cardSingle = {}
        cardSingle['id'] = card['id']
        cardSingle['list_id'] = card['list_id']
        cardSingle['name'] = card['name']
        cardSingle['order'] = card['order']

        cardsdict[card['id']] = cardSingle

    #step 6
    cardorder = []

    x = 0
    for i in range(len(cardsarray)):
        for card in cardsarray:
            if card['order'] == x:
                cardorder.append(card)
                x = x + 1

    return {
        'listid': listid,
        'dict': cardsdict,
        'order': cardorder
    }

@list_routes.route('/<int:listid>')
@login_required
def getcards(listid):

    # step 1
    cards = Card.query.filter_by(list_id = listid).all()

    #step 2
    cardsarray = [card.to_dict() for card in cards]


    for i in range(len(cardsarray)):
        orderupdate = Card.query.get(cardsarray[i]['id'])
        if (orderupdate.order == None):
            orderupdate.order = i
            db.session.commit()



    cards2 = Card.query.filter_by(list_id = listid).all()
    cardsarray2 = [card.to_dict() for card in cards2]

    #step 3
    cardsdict = {}
    cardorder = []

    x = 0
    for i in range(len(cardsarray2)):
        for card in cardsarray2:
            if card['order'] == x:
                cardorder.append(card)
                x = x + 1


    for card in cardsarray2:
        cardSingle = {}
        cardSingle['id'] = card['id']
        cardSingle['list_id'] = card['list_id']
        cardSingle['name'] = card['name']
        cardSingle['order'] = card['order']

        cardsdict[card['id']] = cardSingle


    return {
        'listid': listid,
        'dict': cardsdict,
        'order': cardorder
    }
