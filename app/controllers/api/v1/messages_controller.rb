class Api::V1::MessagesController < ApplicationController

  before_action :authenticate_user!
	before_action :find_message, only: [:show, :edit, :update, :destroy]

	def index
	  @messages = current_user.messages
		render json: MessageSerializer.new(@messages)
	end
	
	def show
		respond_to do |format|
			format.json { render :show }
		end
	end
	
	def create
		@message = current_user.messages.build(message_params)

		if @message.save
		  ActionCable.server.broadcast("room_#{@message.room_id}", { action: "create", room_id: @message.room_id, message_id: @message.id, message: MessageSerializer.new(@message) })
			render json: MessageSerializer.new(@message)
		else
			render json: @message.errors, status: :unprocessable_entity
		end
	end
	
	def update
		if authorized?
			respond_to do |format|
				if @message.update(message_params)
					format.json { render :show, status: :ok, location: api_v1_message_path(@message) }
				else
					format.json { render json: @message.errors, status: :unprocessable_entity }
				end
			end
		else
			handle_unauthorized
		end
	end
	
	def destroy
		if authorized?
			@message.destroy
			respond_to do |format|
				format.json { head :no_content }
			end
		else
			handle_unauthorized
		end
	end
	
	
	private
	
		def find_message
			@message = Message.find(params[:id])
		end
		
		def authorized?
			@message.user_id == current_user.id
		end
		
		def handle_unauthorized
			unless authorized?
				respond_to do |format|
					format.json { render :unauthorized, status: 401 }
				end
			end
		end

    def message_params
        params.require(:message).permit(:room_id, :user_id, :content)
    end

end
