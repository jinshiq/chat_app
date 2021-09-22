import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import setAxiosHeaders from "./AxiosHeaders";

class RoomSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
    this.searchRef = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
		setAxiosHeaders();
    axios
      .post('/room_search', {
         q: this.searchRef.current.value
      })
      .then(response => {
        const new_rooms = response.data;
				this.props.updateRooms(new_rooms);
				this.props.clearErrors();
      })
      .catch(error => {
        this.props.handleErrors(error);
      })
    e.target.reset()
  }

  handleChange() {
		setAxiosHeaders();
    axios
      .post('/room_search', {
         q: this.searchRef.current.value
      })
      .then(response => {
        const new_rooms = response.data;
				this.props.updateRooms(new_rooms);
				this.props.clearErrors();
      })
      .catch(error => {
        this.props.handleErrors(error);
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="my-3">
        <div className="form-row" style={{display: "flex"}}>
          <div className="form-group col-md-8">
            <input
              type="text"
              name="search"
              ref={this.searchRef}
              required
              className="form-control"
              id="search"
							onChange={this.handleChange}
              placeholder="Enter keyword here..."
            />
          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">
              Search Room
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default RoomSearch
