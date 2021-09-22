# README

<b>####Environment</b>

Ruby version: 3.0.1

Rails version: 6.1.4

<b>###Overview</b>

This is a simple but complete chat application, which is built with <b>Rails</b> + <b>React</b> + <b>ActionCable</b>.

The front-end (React) calls back-end (Rails) <b>REST API</b> and they are integrated with Rails ActionCable.

In this application, users can perform all <b>CRUD</b> operations on chat room, including 
  (1). create a chat room
  (2). see all available chat rooms
	(3). update a chat room (only permitted for the user who created the chat room)
  (4). delete a chat room (only permitted for the user who created the chat room)
	
Any CRUD operation on chat room will be instantly synchronized to other users through ActionCable.

Users can also search chat rooms using keyword. 	

After logged in, a user can join a chat room and start live chat with other users in the same chat room. 

The REST APIs and chat features were tested pass by rspec tests and manual tests.

The <b>live demo</b> is available [here] (https://polar-hollows-76807.herokuapp.com/).
