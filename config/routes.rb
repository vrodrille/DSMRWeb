Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    resources :sensors, param: :id
  end
  get '*path', to: 'pages#index', via: :all
end
