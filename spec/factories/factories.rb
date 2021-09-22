FactoryBot.define do

	factory :user do
		first_name { "John" }
		last_name  { "Doe" }
		email { "john_doe@example.com" }
		password { "password" }
	end
	
  factory :sequence_user, class: User do
		sequence(:first_name) { |n| "First#{n}" }
		sequence(:last_name) { |n| "Last#{n}" }
		sequence(:email) { |n| "First#{n}_Last#{n}@example.com" }
		password { "password" }	
	end
	
	factory :sequence_room, class: Room do
	  sequence(:name) {|n| "Room-#{n}"}
	end
	
	factory :sequence_message, class: Message do
	  sequence(:content) { |n| "The No.#{n} message in the Room-#{n}."}
	end
	
end
