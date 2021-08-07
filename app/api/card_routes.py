from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List, Card, Checklist
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

card_routes = Blueprint('card', __name__)

@card_routes.route('/<int:cardid>')
@login_required
def getchecklists(cardid):
    # step 1
    checklists = Checklist.query.filter_by(card_id = cardid).all()

    #step 2
    checklistsarray = [checklist.to_dict() for checklist in checklists]

    #step 3
    checklistdict = {}

    for checklist in checklistsarray:
        single = {}
        single['id'] = checklist['id']
        single['card_id'] = checklist['card_id']
        single['name'] = checklist['name']
        checklistdict[checklist['id']] = single


    return {
        'cardid': cardid,
        'checklistdict': checklistdict
    }

@card_routes.route('create-checklist/<int:cardid>', methods=['POST'])
@login_required
def createchecklist(cardid):
    # step 1
    checklist_to_create = Checklist(
        name = "New Checklist",
        card_id = cardid
    )
    # step 2
    db.session.add(checklist_to_create)
    #step 3
    db.session.commit()

    checklists = Checklist.query.filter_by(card_id = cardid).all()

    #step 2
    checklistsarray = [checklist.to_dict() for checklist in checklists]

    #step 3
    checklistdict = {}

    for checklist in checklistsarray:
        single = {}
        single['id'] = checklist['id']
        single['card_id'] = checklist['card_id']
        single['name'] = checklist['name']
        checklistdict[checklist['id']] = single


    return {
        'cardid': cardid,
        'checklistdict': checklistdict
    }
