class Api::V1::CurrentUserController < ApplicationController

  def index
	  if user_signed_in?
			render json: UserSerializer.new(current_user)
		else
		  render json: {}, status: 401
		end
	end

end
