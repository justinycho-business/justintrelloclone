from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List, Card
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

list_routes = Blueprint('list', __name__)

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
