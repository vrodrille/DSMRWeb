class Sensor < ApplicationRecord
  validates :latitude, :longitude, :location, :ip_address, :information, presence: true
  validates :information, length: {maximum: 200}
end