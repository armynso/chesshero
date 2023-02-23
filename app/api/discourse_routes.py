from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Discourse, Forum, db
from app.forms import CreateForum, CreateDiscourse

discourse_routes = Blueprint('discourses', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@discourse_routes.route('/')
def discourses():
    discourses = Discourse.query.all()
    return {'discourses': [discourse.to_dict() for discourse in discourses]}

@discourse_routes.route('/createDiscourse/<int:id>', methods=['POST'])
@login_required
def postDiscourses(id):
    form = CreateDiscourse()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        discourse = Discourse(
            user_id = current_user.id,
            post = form.data['post'],
            forum_id = id
            # category = form.data['category']
        )
        db.session.add(discourse)
        db.session.commit()

        return discourse.to_dict(), 200

    return {'error': validation_errors_to_error_messages(form.errors)}, 401
