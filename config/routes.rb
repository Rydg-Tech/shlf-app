Rails.application.routes.draw do
  resources :blogs
  resources :shlves
  devise_for :users
  root 'home#index'
  get '*path', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
