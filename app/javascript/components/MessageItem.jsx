import React from 'react';
import PropTypes from 'prop-types';

class MessageItem extends React.Component {
  constructor(props) {
    super(props);
  }
	
	componentDidMount() {
		this.scroll_bottom();
	}
	
	scroll_bottom() {
		if ($("#message-area").length)
		{
			$('#message-area').scrollTop($('#message-area')[0].scrollHeight);
		}
	}
	
  render() {
		const message_item_color = (this.props.currentUser.id == this.props.message.user_id)? "message-item-me" : "message-item-others"		
    return (
      <div className={`message-item ${message_item_color}`}>
        <div className="message-author">{this.props.message.user_name}</div>
				<div className="message-body">{this.props.message.content}</div>
      </div>
    )
  }
}
export default MessageItem


