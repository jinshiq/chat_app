import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";
import setAxiosHeaders from "../components/AxiosHeaders";

import RoomArea from "../components/RoomArea";
import MessageArea from "../components/MessageArea";
import "../components/index.css";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			currentUser: null,
			currentRoom: null,
			isLoading: true,
			errorMessage: null
    };
		this.getCurrentUser = this.getCurrentUser.bind(this);
		this.updateCurrentUser = this.updateCurrentUser.bind(this);
		this.updateCurrentRoom = this.updateCurrentRoom.bind(this);
		this.resetCurrentRoom = this.resetCurrentRoom.bind(this);
		this.handleErrors = this.handleErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }
	
  componentDidMount() {
		this.getCurrentUser();
  }
	
	getCurrentUser() {
    axios
      .get("/api/v1/current_user")
      .then(response => {
				this.clearErrors();
				this.setState({ isLoading: true });
        const current_user = response.data.data;
				this.updateCurrentUser(current_user);
				this.setState({ isLoading: false });
      })
      .catch(error => {
				this.setState({ isLoading: true });
        this.setState({
          errorMessage: {
            message: "There was an error loading the current user information ..."
          }
        });
      });
  }
	
	updateCurrentUser(user) {
		this.setState({currentUser: user});
	}
	
	updateCurrentRoom(room) {
		this.setState({currentRoom: room});
	}
	
	resetCurrentRoom() {
		this.setState({currentRoom: null});
	}
	
  handleErrors(errorMessage) {
    this.setState({ errorMessage });
  }
	
  clearErrors() {
    this.setState({
      errorMessage: null
    });
  }
	
  render() {
    return (
      <div>
			  {this.state.errorMessage && (
          <ErrorMessage errorMessage={this.state.errorMessage} />
        )}
			  {!this.state.isLoading && (
          <div className="row">
						<div className="col-md-5">
							<RoomArea 					
								currentUser={this.state.currentUser}
								currentRoom={this.state.currentRoom}
								updateCurrentRoom = {this.updateCurrentRoom}
								resetCurrentRoom = {this.resetCurrentRoom}								
								handleErrors={this.handleErrors}
                clearErrors={this.clearErrors}
							/>
						</div>
						<div className="col-md-1"></div>
						<div className="col-md-6">
							<MessageArea
								currentUser={this.state.currentUser}							
								currentRoom={this.state.currentRoom}								
								handleErrors={this.handleErrors}
                clearErrors={this.clearErrors}
							/>
						</div>
					</div>
        )}
        {this.state.isLoading && <Spinner />}
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('chat-app')
  app && ReactDOM.render(<ChatApp />, app)
})