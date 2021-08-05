from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List, Card
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

list_routes = Blueprint('list', __name__)

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
