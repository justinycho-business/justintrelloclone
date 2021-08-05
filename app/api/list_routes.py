from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List, Card
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

list_routes = Blueprint('list', __name__)

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
