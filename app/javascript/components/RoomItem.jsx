import consumer from "../channels/consumer"
import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import setAxiosHeaders from "./AxiosHeaders";

class RoomItem extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
      editable: false,
    };
		this.joinRoom = this.joinRoom.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.inputRef = React.createRef();
  }

  unsubscribeRoom(room_id) {
		const subscription = consumer.subscriptions.subscriptions.find(x => JSON.parse(x.identifier).room_id == room_id);
		subscription.unsubscribe();
	}

	subscribeRoom(room) {
		const that = this;
		consumer.subscriptions.create({channel: "RoomChannel", room_id: room.id}, {
			connected() {
				console.log(`Connected to the room_${room.id} channel. (RoomItem.jsx)`);
			},
			received(data) {
				console.log(`Received data from the room_${room.id} channel. (RoomItem.jsx)`);
				const new_message = data.message.data.attributes;
		 /* const new_room = room;
				new_room.messages.push(new_message);
        that.props.updateCurrentRoom(new_room); */
		    const new_rooms = that.props.rooms;
				new_rooms.data.find(x => x.id == room.id).attributes.messages.push(new_message);
        that.props.updateRooms(new_rooms); 
        const new_room = new_rooms.data.find(x => x.id == room.id).attributes
        that.props.updateCurrentRoom(new_room);
			}
		})	
	}	
	
  joinRoom(room) {		
    const current_user_id = parseInt(this.props.currentUser.id);
		const room_user_ids = room.users.map( user => { return user.id });
    if (!room_user_ids.includes(current_user_id)) {
		  setAxiosHeaders();
			axios
				.post('/api/v1/room_users', {
					 room_user: {
						room_id: room.id
					},
				})
				.then(response => {
					//const room_user = response.data;
					this.props.clearErrors();
				})
				.catch(error => {
					this.props.handleErrors(error);
				})
		}
		if (!this.props.currentRoom)
		{
			//this.unsubscribeRoom(0);
			this.subscribeRoom(room);
			this.props.updateCurrentRoom(room);
			document.querySelector('head').dataset.roomId = room.id;
		}
		else if (this.props.currentRoom.id != room.id)
		{
			this.unsubscribeRoom(this.props.currentRoom.id);
			this.subscribeRoom(room);
			this.props.updateCurrentRoom(room);	
			document.querySelector('head').dataset.roomId = room.id;			
		}	
  }
	
	handleDelete(room) {	
		const clicked_room = room;
		setAxiosHeaders();
		const confirmation = confirm("Are you sure?");
		if (confirmation) {
			axios
				.delete(`/api/v1/rooms/${room.id}`)
				.then(response => {
					//const room = response.data;
					this.props.clearErrors();
				})
				.catch(error => {
					this.props.handleErrors(error);
				});
		}
  }

	handleEdit() {
    this.setState({editable: true});		
  }

	handleSave(room) {	
	  const current_name = this.inputRef.current.value
		setAxiosHeaders();
		axios
			.put(`/api/v1/rooms/${room.id}`, {
				room: {
					name: current_name
				}
			})
			.then(response => {
				//const new_room = response.data;
				this.setState({editable: false});
				this.props.clearErrors();
			})
			.catch(error => {
				this.props.handleErrors(error);
			});
  }		
	
	handleCancel() {	
		this.setState({editable: false});
  }	
	
  render() {
		const currentUserId = parseInt($("#current-user-id").html());
		const targetRoom = this.props.roomAttributes;
		const roomId = this.props.roomAttributes.id;
		const roomName = this.props.roomAttributes.name;
		const roomUserCount = this.props.roomAttributes.usercount;
		const room_color = (this.props.currentRoom && this.props.currentRoom.id == roomId)? "current-room" : "not-current-room"	
		
		if (this.props.roomAttributes.created_by == currentUserId) 
		{	
	    if (!this.state.editable)
	    {
				return (
					<div id={`room-${roomId}`} className="room-item">
						<div className={`room-info ${room_color}`}>
							<div id={`room-name-${roomId}`} className="room-name">{roomName}</div>
							<div className="room-count">({roomUserCount})</div>
						</div>
						<div className="room-join">
							<button onClick={() => this.joinRoom(targetRoom)} 
											id={`room-join-${roomId}`} 
											className="btn-warning">Join</button>
						</div>
						<div className="room-edit">
							<button onClick={() => this.handleEdit()} 
											id={`room-edit-${roomId}`} 
											className="btn-info">Edit</button>
						</div>
						<div className="room-delete">
							<button onClick={() => this.handleDelete(targetRoom)} 
											id={`room-delete-${roomId}`} 
											className="btn-danger">Delete</button>
						</div>
					</div>
				)
			}
			else
			{
				return (
					<div id={`room-${roomId}`} className="room-item">
					  <div className="room-input">
							<input
								type="text"
								defaultValue={roomName}
								ref={this.inputRef}
								className="form-control"
								id={`room-input-${roomId}`}
								autoFocus	
							/>
						</div>
						<div className="room-join">
							<button onClick={() => this.joinRoom(targetRoom)} 
											id={`room-join-${roomId}`} 
											className="btn-warning">Join</button>
						</div>
						<div className="room-edit">
							<button onClick={() => this.handleSave(targetRoom)} 
											id={`room-save-${roomId}`} 
											className="btn-primary">Save</button>
						</div>
						<div className="room-delete">
							<button onClick={() => this.handleCancel()} 
											id={`room-cancel-${roomId}`} 
											className="btn-alert">Cancel</button>
						</div>
					</div>
				)				
			}
		}
		else
    {
		  return (
				<div id={`room-${roomId}`} className="room-item">
					<div className={`room-info ${room_color}`}>
						<div id={`room-name-${roomId}`} className="room-name">{roomName}</div>
						<div className="room-count">({roomUserCount})</div>
					</div>
					<div className="room-join">
						<button onClick={() => this.joinRoom(targetRoom)} 
										id={`room-join-${roomId}`} 
										className="btn-warning">Join</button>
					</div>
					<div className="room-edit"></div>
					<div className="room-delete"></div>
				</div>
			)
		}	
  }
}
export default RoomItem


