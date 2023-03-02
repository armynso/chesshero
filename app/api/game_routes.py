from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Discourse, Forum, Match, db
from app.forms import CreateForum, CreateDiscourse, CreateMatch

game_routes = Blueprint('games', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@game_routes.route('/')
def games():
    games = Game.query.all()
    return {'games': [game.to_dict() for game in games]}


@game_routes.route('/createGame/<int:id>', methods=['POST'])
@login_required
def createGame(id):
    form = CreateGame()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        game = Game(
            player1 = form.data['player1'],
            player2 = form.data['player2'],
            player1Color = form.data['player1Color'],
            player1Time = form.data['player1Time'],
            player2Time = form.data['player2Time'],
            increment = form.data['increment'],
            rated = form.data['rated']
            player2Time = form.data['player2Time'],
            player2Elo = form.data['player2Elo']
        )

        thisMatch = Match.query.get(id)
        db.session.delete(thisMatch)

        db.session.add(game)
        db.session.commit()

        return game.to_dict(), 200

    return {'errors': form.errors  or 'Create Form Failed'}, 400
