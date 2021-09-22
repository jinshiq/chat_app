class MessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :room_id, :user_id
	attributes :user_name do |message|
	  message.user.first_name.capitalize + " " + message.user.last_name.capitalize
	end
  attributes :content, :created_at, :updated_at
end
