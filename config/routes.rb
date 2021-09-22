Rails.application.routes.draw do
  devise_for :users
	
	devise_scope :user do
		authenticated :user do
			root "pages#home", as: :authenticated_root
		end
	end
	
	root 'devise/sessions#new'
	
	mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
		  resources :rooms, only: [:index, :show, :create, :update, :destroy]
			resources :users, only: [:index]
			resources :current_user, only: [:index]
			resources :room_users, only: [:create, :destroy]
			resources :messages
    end
  end

  get "/my_room_messages/:id", to: "api/v1/messages#my_room_messages"
	
	post "/room_search", to: "api/v1/rooms#search"

	
end
