class AddSexualityToSearches < ActiveRecord::Migration
  def change
    add_column :searches, :sexuality, :string
  end
end
