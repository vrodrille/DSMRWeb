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
		latitude: 37.78727,
		longitude: -3.77723,
		location: "Sensor 1 location",
		ip_address: "0.0.0.1",
		information: "Sensor 1 information"
	},
	{
		latitude: 37.78736,
		longitude: -3.77812,
		location: "Sensor 2 location",
		ip_address: "0.0.0.2",
		information: "Sensor 2 information"
	},
	{
		latitude: 37.78697,
		longitude: -3.77755,
		location: "Sensor 3 location",
		ip_address: "0.0.0.3",
		information: "Sensor 3 information"
	}
])