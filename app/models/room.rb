class Room < ApplicationRecord

  has_many :room_users, dependent: :destroy
  has_many :users, through: :room_users, source: :user
	has_many :messages, dependent: :destroy

  validates_presence_of :name
	validates_uniqueness_of :name, :case_sensitive => false

end
