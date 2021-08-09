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

@card_routes.route('/delete-checklist/<int:checklistid>', methods=['DELETE'])
@login_required
def deletechecklist(checklistid):
    # step 1
    request_data_body = request.get_json()
    card_id = request_data_body['cardid']
    checklist_to_dlt = Checklist.query.filter_by(id = checklistid).first()
    # step 2
    db.session.delete(checklist_to_dlt)
    #step 3
    db.session.commit()
    # return {'message': f'List with ID of {listid} has been deleted'}
    checklists = Checklist.query.filter_by(card_id = int(card_id)).all()

    checklistsarray = [checklist.to_dict() for checklist in checklists]

    checklistdict = {}

    for checklist in checklistsarray:
        checklistSingle = {}
        checklistSingle['id'] = checklist['id']
        checklistSingle['card_id'] = checklist['card_id']
        checklistSingle['name'] = checklist['name']

        checklistdict[checklist['id']] = checklistSingle


    return {
        'cardid': int(card_id),
        'checklistdict': checklistdict
    }

@card_routes.route('/change-name-checklist/<int:checklistid>', methods=['PUT'])
@login_required
def changenamechecklist(checklistid):
    # step 1
    request_data_body = request.get_json()
    checklistname = request_data_body['checklistname']
    card__id = request_data_body['cardid']

    checklist_to_change = Checklist.query.get(checklistid)
    checklist_to_change.name = checklistname

    #step 2
    db.session.commit()

    # return {'message': f'List with ID of {listid} has been deleted'}
    checklists = Checklist.query.filter_by(card_id = int(card__id)).all()
    checklistsarray = [checklist.to_dict() for checklist in checklists]

    #step 5
    checklistdict = {}

    for checklist in checklistsarray:
        checklistSingle = {}
        checklistSingle['id'] = checklist['id']
        checklistSingle['card_id'] = checklist['card_id']
        checklistSingle['name'] = checklist['name']

        checklistdict[checklist['id']] = checklistSingle


    return {
        'cardid': int(card__id),
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
