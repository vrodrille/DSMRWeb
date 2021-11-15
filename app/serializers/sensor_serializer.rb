class SensorSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :location, :ip_address, :information
end