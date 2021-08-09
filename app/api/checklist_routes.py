from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, List, Card, Checklist, Bullet
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

checklist_routes = Blueprint('checklist', __name__)

@checklist_routes.route('/<int:checklistid>')
@login_required
def getbullets(checklistid):
    # step 1
    bullets = Bullet.query.filter_by(checklist_id = checklistid).all()

    #step 2
    bulletsarray = [bullet.to_dict() for bullet in bullets]

    #step 3
    bulletdict = {}


    for bullet in bulletsarray:
        single = {}
        single['id'] = bullet['id']
        single['checklist_id'] = bullet['checklist_id']
        single['name'] = bullet['name']
        single['content'] = bullet['content']
        single['completed'] = bullet['completed']
        bulletdict[bullet['id']] = single

    count = 0
    for bullet in bulletsarray:
        if bullet['completed'] == True:
            count += 1

    completion = 100
    if (len(bulletsarray)) == 0:
        completion = 0
    else:
        completion = round(count / (len(bulletsarray)), 2)

    return {
        'checklistid': checklistid,
        'bulletdict': bulletdict,
        'completion': completion
    }

@checklist_routes.route('/delete-bullet/<int:bulletid>', methods=['DELETE'])
@login_required
def deletebullet(bulletid):
    # step 1
    request_data_body = request.get_json()
    checklistid = request_data_body['checklistid']
    bullet_to_dlt = Bullet.query.filter_by(id = bulletid).first()
    # step 2
    db.session.delete(bullet_to_dlt)
    #step 3
    db.session.commit()
    # return {'message': f'List with ID of {listid} has been deleted'}
    bullets = Bullet.query.filter_by(checklist_id = int(checklistid)).all()

    #step 2
    bulletsarray = [bullet.to_dict() for bullet in bullets]

    #step 3
    bulletdict = {}

    for bullet in bulletsarray:
        single = {}
        single['id'] = bullet['id']
        single['checklist_id'] = bullet['checklist_id']
        single['name'] = bullet['name']
        single['content'] = bullet['content']
        single['completed'] = bullet['completed']
        bulletdict[bullet['id']] = single

    count = 0
    for bullet in bulletsarray:
        if bullet['completed'] == True:
            count += 1

    completion = 100
    if (len(bulletsarray)) == 0:
        completion = 0
    else:
        completion = round(count / (len(bulletsarray)), 2)

    return {
        'checklistid': checklistid,
        'bulletdict': bulletdict,
        'completion': completion
    }

@checklist_routes.route('/change-content-bullet/<int:bulletid>', methods=['PUT'])
@login_required
def changecontentbullet(bulletid):
    # step 1
    request_data_body = request.get_json()
    bulletcontent = request_data_body['bulletcontent']
    checklistid = request_data_body['checklistid']

    bullet_to_change = Bullet.query.get(bulletid)
    bullet_to_change.content = bulletcontent

    #step 2
    db.session.commit()

    bullets = Bullet.query.filter_by(checklist_id = int(checklistid)).all()

    #step 2
    bulletsarray = [bullet.to_dict() for bullet in bullets]

    #step 3
    bulletdict = {}

    for bullet in bulletsarray:
        single = {}
        single['id'] = bullet['id']
        single['checklist_id'] = bullet['checklist_id']
        single['name'] = bullet['name']
        single['content'] = bullet['content']
        single['completed'] = bullet['completed']
        bulletdict[bullet['id']] = single


    count = 0
    for bullet in bulletsarray:
        if bullet['completed'] == True:
            count += 1

    completion = 100
    if (len(bulletsarray)) == 0:
        completion = 0
    else:
        completion = round(count / (len(bulletsarray)), 2)

    return {
        'checklistid': checklistid,
        'bulletdict': bulletdict,
        'completion': completion
    }

@checklist_routes.route('/change-completed-bullet/<int:bulletid>', methods=['PUT'])
@login_required
def changecompletedbullet(bulletid):
    # step 1
    request_data_body = request.get_json()
    checklistid = request_data_body['checklistid']

    bullet_to_change = Bullet.query.get(bulletid)
    bullet_to_change.completed = not bullet_to_change.completed

    #step 2
    db.session.commit()

    bullets = Bullet.query.filter_by(checklist_id = int(checklistid)).all()

    #step 2
    bulletsarray = [bullet.to_dict() for bullet in bullets]

    #step 3
    bulletdict = {}

    for bullet in bulletsarray:
        single = {}
        single['id'] = bullet['id']
        single['checklist_id'] = bullet['checklist_id']
        single['name'] = bullet['name']
        single['content'] = bullet['content']
        single['completed'] = bullet['completed']
        bulletdict[bullet['id']] = single


    count = 0
    for bullet in bulletsarray:
        if bullet['completed'] == True:
            count += 1

    completion = 100
    if (len(bulletsarray)) == 0:
        completion = 0
    else:
        completion = round(count / (len(bulletsarray)), 2)

    return {
        'checklistid': checklistid,
        'bulletdict': bulletdict,
        'completion': completion
    }


@checklist_routes.route('create-bullet/<int:checklistid>', methods=['POST'])
@login_required
def createbullet(checklistid):
    # step 1
    bullet_to_create = Bullet(
        name = "New Bullet",
        content = "New Bullet",
        completed = False,
        checklist_id = checklistid
    )
    # step 2
    db.session.add(bullet_to_create)
    #step 3
    db.session.commit()

    bullets = Bullet.query.filter_by(checklist_id = checklistid).all()

    #step 2
    bulletsarray = [bullet.to_dict() for bullet in bullets]

    #step 3
    bulletdict = {}

    for bullet in bulletsarray:
        single = {}
        single['id'] = bullet['id']
        single['checklist_id'] = bullet['checklist_id']
        single['name'] = bullet['name']
        single['content'] = bullet['content']
        single['completed'] = bullet['completed']
        bulletdict[bullet['id']] = single


    count = 0
    for bullet in bulletsarray:
        if bullet['completed'] == True:
            count += 1

    completion = 100
    if (len(bulletsarray)) == 0:
        completion = 0
    else:
        completion = round(count / (len(bulletsarray)), 2)

    return {
        'checklistid': checklistid,
        'bulletdict': bulletdict,
        'completion': completion
    }
