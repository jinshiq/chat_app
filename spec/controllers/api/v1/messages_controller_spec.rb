require "rails_helper"

RSpec.describe Api::V1::MessagesController, :type => :controller do

  describe "index" do
    before do
		  user = FactoryBot.create(:user)
			sign_in user
			room = Room.create(name: "Room-1", created_by: user.id)
			FactoryBot.create_list(:sequence_message, 5, user_id: user.id, room_id: room.id)
	    @messages = MessageSerializer.new(user.messages).serialized_json    
    end
    
		it "should be successful to get all messages" do
		  get 'index'
			expect(response.status).to eq(200)
			expect(JSON.parse(response.body)).to eq(YAML.load(@messages))
		end
  end
	
	describe "create" do
    before do
		  user = FactoryBot.create(:user)
			sign_in user
			room = Room.create(name: "Room-1", created_by: user.id)
			@number_of_messages_before = Message.count
			@new_message_params = { room_id: room.id, user_id: user.id, content: "This is a test message." }
    end
    
		it "should be successful to create a message" do
		  post 'create', params: { message: @new_message_params }
			expect(response.status).to eq(200)
			expect(JSON.parse(response.body)["data"]["attributes"]["content"]).to eq(@new_message_params[:content])
			@number_of_messages_after = Message.count
			expect(@number_of_messages_after).to eq(@number_of_messages_before + 1)
		end
  end
end

