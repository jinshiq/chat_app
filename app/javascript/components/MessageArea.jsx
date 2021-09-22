import React from 'react';
import PropTypes from 'prop-types';

import MessageRoom from "./MessageRoom"
import MessageList from "./MessageList"
import MessageForm from "./MessageForm"

class MessageArea extends React.Component {
  constructor(props) {
    super(props)
    this.titleRef = React.createRef()
  }

  render() {
		if (this.props.currentRoom)
		{
			return (
				<div>
					<MessageRoom currentRoom={this.props.currentRoom}/>
					<MessageList 					
						currentUser={this.props.currentUser}
						currentRoom={this.props.currentRoom}
					/>
					<MessageForm 
					  currentUser={this.props.currentUser}
						currentRoom={this.props.currentRoom}					
						handleErrors={this.props.handleErrors}
						clearErrors={this.props.clearErrors}
					/>
				</div>
			)
		}
		else
		{
			return (
				<div>
					<h1>Join a room to chat.</h1>
					<hr />
				</div>
			)
		}	
  }
}

export default MessageArea
