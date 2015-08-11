require 'oauth'
class FacebooksController < ApplicationController
  def callback
    unless AccessToken.find_by_user_id_and_social_network(current_user.id, 'F')
      auth = request.env["omniauth.auth"]
      AccessToken.create(:user_id => current_user.id, :social_network => AccessToken::FACEBOOK,
                         :access_token => auth['credentials']['token'])
      flash[:notice] = "You are successfully connected to Facebook."
    end
    if request.xhr?
      render :json => {:notice => flash[:notice]}
    else
      redirect_to settings_user_url(current_user)
    end
  end

end