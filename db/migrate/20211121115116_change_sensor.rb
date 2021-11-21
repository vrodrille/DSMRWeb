class ChangeSensor < ActiveRecord::Migration[6.1]
  def change
    change_table :sensors do |t|
      t.remove :longitude
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
    end
  end
end
