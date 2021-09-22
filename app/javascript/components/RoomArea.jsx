import 'channels'
import consumer from "../channels/consumer"
import RoomsChannel from 'channels/rooms_channel'
import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import setAxiosHeaders from "./AxiosHeaders";

import RoomForm from "./RoomForm"
import RoomSearch from "./RoomSearch"
import RoomList from "./RoomList"

class RoomArea extends React.Component {
  constructor(props) {
    super(props)
		this.state = {
      rooms: [],
			isLoading: true,
    };
		this.getRooms = this.getRooms.bind(this);
		this.updateRooms = this.updateRooms.bind(this);
		this.createRoom = this.createRoom.bind(this);
		this.deleteRoom = this.deleteRoom.bind(this);
		this.unsubscribeRoom = this.unsubscribeRoom.bind(this);
  }

  componentDidMount() {
		this.getRooms();
		RoomsChannel.received = (data) => {
			console.log("Received data from the rooms channel. (RoomArea.jsx)");
			console.log("received_data=", data);
			if (data.action == "create") {
				this.createRoom(data.room);
			}
			if (data.action == "delete") {
				this.deleteRoom(data.room_id);
  			if (this.props.currentRoom && parseInt(data.room_id) == this.props.currentRoom.id) {
				  this.props.resetCurrentRoom();
					this.unsubscribeRoom(data.room_id);
			  }
			}
		  if (data.action == "update") {
				const rooms = this.state.rooms;
 				rooms.data.find(x => x.id == parseInt(data.room_id)).attributes = data.room.data.attributes;
				this.setState({rooms: rooms});
				if (parseInt(data.room_id) == this.props.currentRoom.id) {
					const new_room = rooms.data.find(x => x.id == this.props.currentRoom.id).attributes
					this.props.updateCurrentRoom(new_room);
        }				
			}
		} 
  }

  getRooms() {
		console.log("This is getRooms().");
    axios
      .get("/api/v1/rooms")
      .then(response => {
				this.props.clearErrors();
				this.setState({ isLoading: true });
        const rooms = response.data;
        this.setState({ rooms });
				this.setState({ isLoading: false });
      })
      .catch(error => {
				this.setState({ isLoading: true });
        this.setState({
          errorMessage: {
            message: "There was an error loading the rooms information ..."
          }
        });
      });
  }	

	updateRooms(rooms) {
		this.setState({rooms: rooms});
	}
	
	createRoom(room) {
		const rooms = this.state.rooms;
		const new_rooms = rooms.data.push(room.data);
		this.setState({rooms: rooms});
  }
	
	deleteRoom(room_id) {
		const rooms = this.state.rooms;
		const room = rooms.data.find(x => x.id == room_id);
		const new_rooms = rooms.data.pop(room.data);
		this.setState({rooms: rooms});
  }

  unsubscribeRoom(room_id) {
		const subscription = consumer.subscriptions.subscriptions.find(x => JSON.parse(x.identifier).room_id == room_id);
		subscription.unsubscribe();
	}
	
  render() {
    return (
		  <div>
			  <div>
				  <h1>Chat Rooms</h1>
				</div>
				<RoomForm 		  
					handleErrors={this.props.handleErrors}
          clearErrors={this.props.clearErrors}
				/>
			  <RoomSearch
          updateRooms={this.updateRooms}				
					handleErrors={this.props.handleErrors}
          clearErrors={this.props.clearErrors}				
				/>
				<RoomList   			
					currentUser={this.props.currentUser}
					currentRoom={this.props.currentRoom}
					updateCurrentRoom = {this.props.updateCurrentRoom}
				  rooms={this.state.rooms}
					updateRooms={this.updateRooms}
					handleErrors={this.props.handleErrors}
          clearErrors={this.props.clearErrors}
				/>
						
			</div>
    )
  }
}

export default RoomArea
