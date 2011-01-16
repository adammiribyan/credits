Credits::Application.routes.draw do
  resources :requests
  
  match "/check_for_new_requests" => "requests#check_for_new_requests", :as => :check_for_new_requests

  root :to => "requests#new"
end
