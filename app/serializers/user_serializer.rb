class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :first_name, :last_name, :email, :messages
	attributes :rooms do |user|
	  user.rooms.map(&:id)
	end
end
