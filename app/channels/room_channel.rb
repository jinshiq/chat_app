class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:room_id]}"
		
		#ActionCable.server.broadcast({channel: 'RoomChannel', room_id: params[:room_id]}, { message: Room.find(params[:room_id]).messages.last })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
