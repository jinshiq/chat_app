import React from 'react';
import PropTypes from 'prop-types';

import MessageItem from "./MessageItem"

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }
	
  render() {
    return (
      <div className="message-container">
			  <hr />
				<div id="message-area">
					{this.props.currentRoom.messages.map((message, index) => 
						<MessageItem 
							key={index}
							message={message}
							currentUser={this.props.currentUser}
						/>
					)}
				</div>
      </div>
    )
  }
}
export default MessageList


