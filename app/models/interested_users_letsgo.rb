class InterestedUsersLetsgo < ActiveRecord::Base
  belongs_to :user
  belongs_to :letsgo
end