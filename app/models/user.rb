class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
	
	validates_presence_of :first_name
	validates_presence_of :last_name
	
	has_many :room_users, dependent: :destroy
	has_many :rooms, through: :room_users, source: :room
	has_many :messages, dependent: :destroy
	
end
