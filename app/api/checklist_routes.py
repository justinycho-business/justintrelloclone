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


    return {
        'checklistid': checklistid,
        'bulletdict': bulletdict
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


    return {
        'checklistid': checklistid,
        'bulletdict': bulletdict
    }
