class RoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "rooms"
		
		#ActionCable.server.broadcast('rooms', { room: Room.last })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
