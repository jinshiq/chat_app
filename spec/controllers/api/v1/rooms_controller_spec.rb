require "rails_helper"

RSpec.describe Api::V1::RoomsController, :type => :controller do

  describe "index" do
    before do
		  user = FactoryBot.create(:user)
			sign_in user
			FactoryBot.create_list(:sequence_room, 10, created_by: user.id)
			
	    @rooms = RoomSerializer.new(Room.all).serialized_json    
    end
    
		it "should be successful to get all rooms" do
		  get 'index'
			expect(response.status).to eq(200)
			expect(JSON.parse(response.body)).to eq(YAML.load(@rooms))
		end
  end
	
end

