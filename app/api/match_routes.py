from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Discourse, Forum, Match, db
from app.forms import CreateForum, CreateDiscourse, CreateMatch

match_routes = Blueprint('matches', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@match_routes.route('/')
def matches():
    matches = Match.query.all()
    return {'matches': [match.to_dict() for match in matches]}


@match_routes.route('/createMatch', methods=['POST'])
@login_required
def createMatch():
    form = CreateMatch()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        match = Match(
            user_id = current_user.id,
            player1Elo = current_user.elo,
            player1Username = form.data['player1Username'],
            player1Color = form.data['player1Color'],
            time = form.data['time'],
            increment = form.data['increment'],
            rated = form.data['rated']
        )

        db.session.add(match)
        db.session.commit()

        return match.to_dict(), 200

    return {'errors': form.errors  or 'Create Form Failed'}, 400

@match_routes.route('/deleteMatch/<int:id>', methods=['DELETE'])
@login_required
def deleteMatch(id):
    thisMatch = Match.query.get(id)

    if not thisMatch:
        return {'Error': 'Match not Found'}, 404
    if current_user.id != thisMatch.user_id:
        return {"Error": "Forbidden"}, 403

    db.session.delete(thisMatch)
    db.session.commit()

    return {'Message': 'The Match has been deleted!'}, 200
