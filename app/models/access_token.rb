class AccessToken < ActiveRecord::Base
  belongs_to :user

  FACEBOOK = 'F'
  TWITTER = 'T'

  def self.fb_token(user_id)
    access_token(user_id, FACEBOOK)
  end

  def self.tw_token(user_id)
    access_token(user_id, TWITTER)
  end

  def self.find_or_create_access_token(user_id, access_token)
    token = where(["user_id =? AND social_network = ?", user_id, FACEBOOK]).first
    if token.present? == false
      create(:user_id => user_id, :social_network => FACEBOOK, :access_token => access_token)
    end
  end

  def self.access_token(user_id, network)
    network_access_token = where(["user_id =? AND social_network = ?", user_id, network]).first
    if network_access_token.nil?
      raise "Access Token Not Found"
    else
      return network_access_token
    end
  end

  def self.fb_token_expired(user_id, access_token = nil)
    access_token(user_id, FACEBOOK).destroy if access_token.present?
  end

end
