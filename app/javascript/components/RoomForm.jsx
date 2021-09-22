import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import setAxiosHeaders from "./AxiosHeaders";

class RoomForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleRef = React.createRef()
  }

  handleSubmit(e) {
    e.preventDefault();
		setAxiosHeaders();
    axios
      .post('/api/v1/rooms', {
         room: {
          name: this.titleRef.current.value
        },
      })
      .then(response => {
        const room = response.data;
				this.props.clearErrors();
      })
      .catch(error => {
        this.props.handleErrors(error);
      })
    e.target.reset()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="my-3">
        <div className="form-row" style={{display: "flex"}}>
          <div className="form-group col-md-8">
            <input
              type="text"
              name="title"
              ref={this.titleRef}
              required
              className="form-control"
              id="title"
              placeholder="Enter name here..."
            />
          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">
              Create Room
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default RoomForm
