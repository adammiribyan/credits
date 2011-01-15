namespace :db do  
  desc "Erase and fill the database"
  task :populate => :environment do
    require 'populator'
    require 'faker' 
    
    [Request].each(&:delete_all)
    
    Request.populate 100 do |request|
      request.fullname = Faker::Name.name
      request.email = Faker::Internet.email
      request.price = 200..8000
      request.details = Populator.words(5)
      request.created_at = 2.years.ago..Time.now
    end 

  end
end