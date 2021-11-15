class CreateSensor < ActiveRecord::Migration[6.1]
  def change
    create_table :sensors do |t|
      t.string :latitude
      t.string :longitude
      t.string :location
      t.string :ip_address
      t.text :information 
      t.timestamps
    end
  end
end
