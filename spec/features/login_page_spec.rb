require "rails_helper"

describe "Login page" do

  describe "invalid username or password", js: true do		
		it "displays an error message" do
		  user = FactoryBot.create(:user)
			visit '/'
			fill_in 'Email', with: 'john_doe@example.com'
			fill_in 'Password', with: 'passwordx'
			click_button 'Log in'
			
			expect(page).to have_content("Invalid Email or password") 
		end
	end

  describe "valid username and password" do			
		it "signs me in" do
		  user = FactoryBot.create(:user)
			visit '/'
			fill_in 'Email', with: 'john_doe@example.com'
			fill_in 'Password', with: 'password'
			click_button 'Log in'
			
			expect(page).not_to have_content("Invalid Email or password") 
		end
	end
end
