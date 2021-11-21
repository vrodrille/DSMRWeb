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
		latitude: 42.3,
		longitude: -26,
		location: "Sensor 1 location",
		ip_address: "0.0.0.1",
		information: "Sensor 1 information"
	},
	{
		latitude: 21.1,
		longitude: 24.4,
		location: "Sensor 2 location",
		ip_address: "0.0.0.2",
		information: "Sensor 2 information"
	},
	{
		latitude: -5.8,
		longitude: 9.6,
		location: "Sensor 3 location",
		ip_address: "0.0.0.3",
		information: "Sensor 3 information"
	}
])