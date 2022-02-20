02/17/2022
Gluay-
$ rails new apartment-app -d postgresql -T
$ cd apartment-app
$ rails db:create
Add the remote from your GitHub classroom repository
Create a default branch (main)
Make an initial commit to the repository
$ bundle add rspec-rails
$ rails generate rspec:install
$ bundle add devise
$ rails generate devise:install
$ rails generate devise User
$ bundle add react-rails
$ rails webpacker:install:react
$ rails generate react:install
$ rails generate react:component App
$ rails generate controller Home
$ rails db:migrate
$ rails s
- add bootstrap
yarn add bootstrap
yarn add reactstrap
Add to src/index.js: import 'bootstrap/dist/css/bootstrap.min.css'
- add jest in package.json
"jest": {
    "roots": [
      "app/javascript/components"
    ]
  }

yarn add react-router-dom@5.3.0

add components
+ components
- assets
- components
- pages

rails g resource Shlf name:string room_temp:string refrigerator_temp:string freezer_temp:string image:text

rails db:migrate

rails g resource Blog name:string comment:string user_id:integer shlf_id:integer

rails db:migrate

app/models
user.rb has_many :blog
blog.rb belongs_to :user
blog.rb belongs_to :shlf
shlf.rb has-many :blog

=========================
02/19/2022
bin/webpack-dev-server

- changed the Nav order and name
- added a tag on the shlf logo to link to localhost:3000
- ShlfIndex.js
- ShlfShow.js
- added link to FDA info
- added About page
- added BlogIndex page
- added BlogShow page
- read/create/update/delete functionalities 

02/20/2022
- added more items to both blog and shlf mockDatas


