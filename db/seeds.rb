User.create!([
  {first_name: "First01", last_name: "Last01", email: "user-1@example.com", password: "password"},
	{first_name: "First02", last_name: "Last02", email: "user-2@example.com", password: "password"},
	{first_name: "First03", last_name: "Last03", email: "user-3@example.com", password: "password"},
	{first_name: "First04", last_name: "Last04", email: "user-4@example.com", password: "password"},
	{first_name: "First05", last_name: "Last05", email: "user-5@example.com", password: "password"}
])

Room.create!([
  {name: "Earth", created_by: 1},
	{name: "Moon",  created_by: 1},
	{name: "Mars",  created_by: 1},
	{name: "Jupiter", created_by: 2},
	{name: "Saturn",  created_by: 2}
])

Message.create!([
  {room_id: 1, user_id: 3, content: "Hello Everyone"},
	{room_id: 1, user_id: 2, content: "Nice to see all you here"},
	{room_id: 1, user_id: 1, content: "Great!"},
	{room_id: 1, user_id: 1, content: "This is a beautiful day."},	
  {room_id: 2, user_id: 1, content: "I am the first one here."},
	{room_id: 2, user_id: 2, content: "Ha ha ..."},
])

RoomUser.create([
  {room_id: 1, user_id: 1},
	{room_id: 1, user_id: 2},
	{room_id: 1, user_id: 3},
	{room_id: 2, user_id: 1},
	{room_id: 2, user_id: 2}
])
