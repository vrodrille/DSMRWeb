Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    resources :sensors, param: :id
  end

  # This line is needed in order to let React realize the routing between pages instead of Rails
  get '*path', to: 'pages#index', via: :all
end
