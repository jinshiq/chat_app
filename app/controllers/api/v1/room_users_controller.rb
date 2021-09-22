class Api::V1::RoomUsersController < ApplicationController

  before_action :authenticate_user!
	before_action :find_room_user, only: [:show, :edit, :update, :destroy]
	
	def create
		@room_user = current_user.room_users.build(room_user_params)

		if @room_user.save
		  ActionCable.server.broadcast('rooms', { action: "update", room_id: @room_user.room_id, room: RoomSerializer.new(@room_user.room) })
			render json: RoomUserSerializer.new(@room_user)
		else
			render json: @room_user.errors, status: :unprocessable_entity
		end
	end
	
	def destroy
		if authorized?
			@room_user.destroy
			respond_to do |format|
				format.json { head :no_content }
			end
		else
			handle_unauthorized
		end
	end


	private

		def find_room_user
			@room_user = RoomUser.find(params[:id])
		end
		
    def room_user_params
        params.require(:room_user).permit(:room_id)
    end
end
