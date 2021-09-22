class RoomSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :created_by
	
	attributes :messages do |room|
	  room.messages.map {|x| {id: x.id, room_id: x.room_id, user_id: x.user_id, user_name: x.user.first_name.capitalize + " " + x.user.last_name.capitalize, content: x.content, created_at: x.created_at, updated_at: x.updated_at}}
	end
	attributes :users do |room|
	  room.users.map {|x| {id: x.id, first_name: x.first_name, last_name: x.last_name, email: x.email}}
	end
	attributes :usercount do |room|
	  room.users.count
	end
end
