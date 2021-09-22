require "rails_helper"

describe "Chat page" do

  describe "chat room area", js: true do
    before do
      @user = FactoryBot.create(:user)
			login_as(@user)
    end
		
		context "when there is no chat room" do
			it "does not contain room-item class and Join button" do
				visit '/'
				expect(page).not_to have_css(".room-item")
				expect(page).not_to have_button("Join")
			 end
		end
		 
		context "when there are chat rooms" do
		  before(:each) do
				FactoryBot.create_list(:sequence_room, 5, created_by: @user.id)
			end
	
			it "displays all chat rooms with Join button" do
				visit '/'
				expect(page).to have_css(".room-item", count: 5)
				expect(page).to have_button("Join", count: 5)
				expect(page).to have_content("Room-1")
				expect(page).to have_content("Room-2")
				expect(page).to have_content("Room-3")
				expect(page).to have_content("Room-4")
				expect(page).to have_content("Room-5")
				find("#room-1").click_button("Join")
				expect(page).to have_content("Welcome to: Room-1")
				expect(page).to have_content("Send")
				fill_in "msg", with: "Hello everyone!"
				sleep 3
				click_button("Send")
				sleep 3
			end
				  	
		end
		
	end

end

