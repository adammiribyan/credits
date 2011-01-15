class ChangeRolesMaskToUsers < ActiveRecord::Migration
  def self.up
    remove_column :users, :roles_mask
    add_column    :users, :roles_mask, :integer, :default => 1
  end

  def self.down
  end
end
