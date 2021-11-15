# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Sensor.delete_all

sensors = Sensor.create([
	{
		latitude: "Sensor 1 Latitude",
		longitude: "Sensor 1 longitude",
		location: "Sensor 1 location",
		ip_address: "0.0.0.1",
		information: "Sensor 1 information"
	},
	{
		latitude: "Sensor 2 Latitude",
		longitude: "Sensor 2 longitude",
		location: "Sensor 2 location",
		ip_address: "0.0.0.2",
		information: "Sensor 2 information"
	},
	{
		latitude: "Sensor 3 Latitude",
		longitude: "Sensor 3 longitude",
		location: "Sensor 3 location",
		ip_address: "0.0.0.3",
		information: "Sensor 3 information"
	}
])