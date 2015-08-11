require 'oauth'

class TwittersController < ApplicationController
  before_filter :user_loged_in
  def authorize
    begin
      target_profile_id = params[:target_profile_id]
      consumer = OAuth::Consumer.new("awkQ6gu5lvZuBjAt5yQMCKuVS", "CQEwuVlBkA4L17DcXp1jiXLWLGEsFOHV1cX6cUjWDfpqrZhbpV", :site => "https://api.twitter.com")
      request_token = consumer.get_request_token pin_auth_parameters(target_profile_id)
      session[:twitter_request_secret] = request_token.secret
      session[:twitter_request_token] = request_token.token
      url = generate_authorize_url(consumer, request_token, target_profile_id)
      redirect_to url
    rescue Exception => e
      flash[:notice] = "Failed to connect Twitter."
      user_url(current_user)
    end
  end

  def return
    begin
      consumer = OAuth::Consumer.new("awkQ6gu5lvZuBjAt5yQMCKuVS", "CQEwuVlBkA4L17DcXp1jiXLWLGEsFOHV1cX6cUjWDfpqrZhbpV", :site => "https://api.twitter.com")
      request_token = OAuth::RequestToken.new(consumer, session[:twitter_request_token], session[:twitter_request_secret])
      access_token = request_token.get_access_token :oauth_verifier => params["oauth_verifier"]
      token = AccessToken.where("user_id =? AND social_network =?", current_user.id, AccessToken::TWITTER).first
      if token.present? == false
        AccessToken.create(:user_id => current_user.id, :social_network => AccessToken::TWITTER,
                                        :access_token => access_token.token, :access_secret => access_token.secret)
      end
      flash[:notice] = "You are successfully connected to Twitter."
    rescue Exception => e
      flash[:notice] = "Failed to connect Twitter."
    end
    redirect_to settings_user_url(current_user)
  end

  protected

  def generate_authorize_url(consumer, request_token, target_profile_id)
    request = consumer.create_signed_request(:get, consumer.authorize_path, request_token, pin_auth_parameters(target_profile_id))
    params = request['Authorization'].sub(/^OAuth\s+/, '').split(/,\s+/).map do |param|
      key, value = param.split('=')
      value =~ /"(.*?)"/
      "#{key}=#{CGI::escape($1)}"
    end.join('&')
    "https://api.twitter.com#{request.path}?#{params}"
  end

  def pin_auth_parameters(target_profile_id)
    {:oauth_callback => return_twitter_url(:target_profile_id => target_profile_id)}
  end

end
