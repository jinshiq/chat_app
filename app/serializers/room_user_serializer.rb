class RoomUserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :room_id, :user_id
end
