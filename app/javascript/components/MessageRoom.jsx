import React from 'react';
import PropTypes from 'prop-types';


class MessageRoom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
		  <div>
			  <div>
				  <h1>Welcome to: {this.props.currentRoom.name}</h1>
				</div>				
			</div>
    )
  }
}

export default MessageRoom
