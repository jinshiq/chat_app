import React from 'react';
import PropTypes from 'prop-types';

import RoomItem from "./RoomItem"

class RoomList extends React.Component {
  constructor(props) {
    super(props);
  }
	
  render() {
		if (this.props.rooms.data)
		{
			return (
				<div>
					<hr />
					{this.props.rooms.data.map((room, index) => 
						<RoomItem 
							key={index}
							roomAttributes={room.attributes}							
							currentUser={this.props.currentUser}
							currentRoom={this.props.currentRoom}
							updateCurrentRoom = {this.props.updateCurrentRoom}
							rooms={this.props.rooms}
							updateRooms={this.props.updateRooms}
							handleErrors={this.props.handleErrors}
							clearErrors={this.props.clearErrors}
						/>
					)}

				</div>
			)
		}
		else 
		{
			return (
			  <div>
				</div>
			)
		}
  }
}
export default RoomList


