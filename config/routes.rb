Rails.application.routes.draw do

  post '/login' => "sessions#create"
  delete '/logout' => "sessions#destroy"
  resources :users
  get '/profile' => "users#profile"
  resources :events
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
