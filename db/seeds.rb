# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

annab = User.create!(username: 'annab', name:'annab', password:'annab')


anna1 = User.create!(username: 'anna1', name:'anna1', password:'anna1')


Event.create!(user: annab, title: 'skisession', description: 'grosse journee ski', address: "Avoriaz")


Event.create!(user: annab, title: 'soleil', description: 'grosse rando', address: "chamonix")



Event.create!(user: anna1, title: 'velo', description: '3 h de VTT dans les bois ', address: "meudon")


Event.create!(user: anna1, title: 'cour de freeride', description: 'petit cours', address: "les arcs")
