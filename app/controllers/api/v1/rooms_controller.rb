class Api::V1::RoomsController < ApplicationController
  before_action :authenticate_user!
	before_action :find_room, only: [:show, :edit, :update, :destroy]

	def index
	  @rooms = Room.all
		render json: RoomSerializer.new(@rooms)
	end
	
	def search
		@rooms = Room.where("lower(name) like '%#{params[:q].downcase}%'")
		render json: RoomSerializer.new(@rooms)
	end
	
	def show
		render json: RoomSerializer.new(@room)
	end
	
	def create
	  params[:room][:created_by] = current_user.id 
		@room = Room.new(room_params)

		if @room.save
		  ActionCable.server.broadcast('rooms', { action: "create", room_id: @room.id, room: RoomSerializer.new(@room) })
			render json: RoomSerializer.new(@room)
		else
			render json: @room.errors, status: :unprocessable_entity
		end
	end
	
	def update
		if authorized?
			if @room.update(room_params)
			  ActionCable.server.broadcast('rooms', { action: "update", room_id: params[:id], room: RoomSerializer.new(@room)})
				render json: RoomSerializer.new(@room)
			else
				render json: @room.errors, status: :unprocessable_entity
			end
		else
			handle_unauthorized
		end
	end
	
	def destroy
		if authorized?
			@room.destroy
			respond_to do |format|
			  ActionCable.server.broadcast('rooms', { action: "delete", room_id: params[:id]})
				format.json { head :no_content }
			end
		else
			handle_unauthorized
		end
	end
	
	
	private
	
		def find_room
			@room = Room.find(params[:id])
		end
		
		def authorized?
			@room.created_by == current_user.id
		end
		
		def handle_unauthorized
			unless authorized?
				respond_to do |format|
					format.json { render :unauthorized, status: 401 }
				end
			end
		end

    def room_params
        params.require(:room).permit(:name, :created_by)
    end
end
