from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Game, Forum, Match, db
from app.forms import CreateForum, CreateGame, EditGame

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
            rated = form.data['rated'],
            player1Elo = form.data['player1Elo'],
            player2Elo = form.data['player2Elo']
        )

        thisMatch = Match.query.get(id)
        db.session.delete(thisMatch)

        db.session.add(game)
        db.session.commit()

        return game.to_dict(), 200

    return {'errors': form.errors  or 'Create Form Failed'}, 400


@game_routes.route('/editGame/<int:id>', methods=['POST'])
@login_required
def editGame(id):
    form = EditGame()
    form['csrf_token'].data = request.cookies['csrf_token']

    oldGame = Game.query.get(id)

    # player1 = db.Column(db.String, nullable=False)
    # player2 = db.Column(db.String, nullable=False)
    # player1Color = db.Column(db.String, nullable=False)
    # player1Time = db.Column(db.Integer, nullable=False)
    # player2Time = db.Column(db.Integer, nullable=False)
    # increment = db.Column(db.Integer, nullable=False)
    # rated = db.Column(db.Boolean, nullable=False, default=False)
    # player1Elo = db.Column(db.Integer, nullable=False)
    # player2Elo = db.Column(db.Integer, nullable=False)
    # movesCount = db.Column(db.Integer, nullable=True, default=0)
    # fen = db.Column(db.String, nullable=True, default='start')
    # result = db.Column(db.String, nullable=True)
    # lastMove = db.Column(db.String, nullable=True)

    if form.validate_on_submit():
        oldGame.player1Time = form.data['player1Time']
        oldGame.player2Time = form.data['player2Time']
        oldGame.movesCount = form.data['movesCount']
        oldGame.fen = form.data['fen']
        oldGame.lastMove = form.data['lastMove']
        oldGame.result = form.data['result']

        db.session.commit()

        return oldGame.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors) or 'Edit Form Failed'}, 400

@game_routes.route('/deleteGame/<int:id>', methods=['DELETE'])
@login_required
def deleteGame(id):
    thisGame = Game.query.get(id)

    if not thisGame:
        return {'Error': 'Match not Found'}, 404

    db.session.delete(thisGame)
    db.session.commit()

    return {'Message': 'The Game has been deleted!'}, 200
