require "rails_helper"

RSpec.describe Api::V1::CurrentUserController, :type => :controller do

  describe "index without login" do
    before do
      get 'index'
    end
    
		it "should not be successful" do
			expect(response).not_to be_successful
		end
  end
	
	describe "index with login" do
    before do
		  user = FactoryBot.create(:user)
			sign_in user
      get 'index'
    end
    
		it "should be successful" do
			expect(response).to be_successful
		end
  end
end

