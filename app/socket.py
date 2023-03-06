from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = "*"
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

@socketio.on("chatroom")
def handle_chatroom(data):
    emit("chatroom", data, broadcast=True)

@socketio.on("join")
def on_join(data):
    room = data['room']
    join_room(room)
    send(f'Player {data["player"]} has joined the room {room}.', room=room)

@socketio.on("move")
def on_move(data):
    room = data['room']
    send(data, room=room)

# @socketio.on("chatroom")
# def on_chatroom(data):
#     room = data['room']
#     send(data, room=room)

@socketio.on("leave")
def on_leave(data):
    room = data['room']
    leave_room(room)
    send(f'Player {data["player"]} has left the room {room}.', room=room)
