import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import setAxiosHeaders from "./AxiosHeaders";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.msgRef = React.createRef();
  }

  sendMessage(e) {
    e.preventDefault();
		setAxiosHeaders();
    axios
      .post('/api/v1/messages', {
         message: {  
          room_id: this.props.currentRoom.id,
					user_id: this.props.currentUser.id,
					content: this.msgRef.current.value
        },
      })
      .then(response => {
		 /* const new_message = response.data.data.attributes;
				const current_room = this.props.currentRoom;
				current_room.messages.push(new_message);
				this.setState({currentRoom: current_room}); */
				this.props.clearErrors();
      })
      .catch(error => {
        this.props.handleErrors(error);
      })
    e.target.reset()
  }

  render() {
    return (
      <form onSubmit={this.sendMessage} className="my-3">
        <div className="form-row">
          <div className="form-group">
            <textarea
              type="text"
              name="msg"
              ref={this.msgRef}
              required
              className="form-control"
              id="msg"
              placeholder="Type message here..."
            />
          </div>
          <div className="form-group" style={{textAlign: "center", marginTop: 10}}>
            <button className="btn-primary" style={{width: 200}}>
              Send
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default MessageForm
