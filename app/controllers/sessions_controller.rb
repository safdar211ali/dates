class SessionsController < ApplicationController
  before_filter :user_loged_in, :except => [:new, :create]
  def new
  end
  
  def create
    user = User.find_by_email(params[:email]) || User.find_by_username(params[:email])
    if user && user.authenticate(params[:password])
      if params[:remember_me]
        cookies.permanent[:auth_token] = user.auth_token
      else
        cookies[:auth_token] = user.auth_token
      end
      user.touch
      redirect_to root_url, :notice => "Logged in!"
    else
      flash.now.alert = "Email or password is invalid"
      render "new"
    end
  end
  
  def destroy
    current_user.touch
    cookies.delete(:auth_token)
    redirect_to root_url, notice: "Logged Out!"
end
end
