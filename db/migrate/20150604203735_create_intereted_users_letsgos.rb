class CreateInteretedUsersLetsgos < ActiveRecord::Migration
  def change
    create_table :interested_users_letsgos do |t|
      t.integer :user_id, :null => false
      t.integer :letsgo_id, :null => false
    end
  end
end
