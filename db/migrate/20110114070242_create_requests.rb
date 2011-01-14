class CreateRequests < ActiveRecord::Migration
  def self.up
    create_table :requests do |t|
      t.string :fullname
      t.string :email
      t.integer :price
      t.text :details

      t.timestamps
    end
  end

  def self.down
    drop_table :requests
  end
end
