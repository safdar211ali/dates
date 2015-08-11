class CreateAccessTokensTable < ActiveRecord::Migration
  def change
    create_table :access_tokens do |t|
        t.integer :user_id
        t.text :access_token
        t.string :access_secret
        t.string :social_network, :limit => 1
        t.timestamps
    end
  end
end
