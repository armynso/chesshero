from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Discourse, Forum, db
from app.forms import CreateForum, CreateDiscourse


forum_routes = Blueprint('forums', __name__)

#a forum has many posts, only a post is correspond to a forum, thus creating a 1 to 1 relationship.
#forum to user has one to many relationships, a user can have multiple forums


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@forum_routes.route('/')
def forums():
    forums = Forum.query.all()
    return {'forums': [forum.to_dict() for forum in forums]}

@forum_routes.route('/createForum', methods=['POST'])
@login_required
def postForums():
    form = CreateForum()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        forum = Forum(
            user_id = current_user.id,
            header = form.data['header'],
            content = form.data['content'],
            category = form.data['category']
        )
        db.session.add(forum)
        db.session.commit()

        return forum.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)  or 'Create Form Failed'}, 400

@forum_routes.route('/editForum/<int:id>', methods=['PUT'])
@login_required
def editForums(id):
    form = CreateForum()
    form['csrf_token'].data = request.cookies['csrf_token']

    oldForum = Forum.query.get(id)

    if oldForum.header == form.data['header']:
        oldForum.content = form.data['content']

        db.session.commit()
        return oldForum.to_dict(), 200

    if form.validate_on_submit():
        oldForum.header = form.data['header']
        oldForum.content = form.data['content']

        db.session.commit()

        return oldForum.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors) or 'Edit Form Failed'}, 400


@forum_routes.route('/<int:forum_id>')
def getForums(forum_id):
    forums = Forum.query.get(forum_id)
    return {'forum': forum.to_dict()}
