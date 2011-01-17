Credits::Application.routes.draw do
  resources :requests
  
  match "/check_for_new_requests" => "requests#check_for_new_requests", :as => :check_for_new_requests
  match "/fetch_new_requests" => "requests#fetch_new_requests", :as => :fetch_for_new_requests
  match "/update_requests_count" => "requests#update_requests_count", :as => :update_requests_count

  root :to => "requests#new"
end
