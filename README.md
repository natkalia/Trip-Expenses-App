# Trip Expenses App


Group project created for CodersCamp 2019 (part of Team Warsaw). Check [demo at Heroku](https://tripexpenses.herokuapp.com) and source code at [Github](https://github.com/dobrzyckahanna/TravelPlanner).

## Authors:

- Małgosia and her [Github](https://github.com/ireshka)
- Ania and her [Github](https://github.com/apiwonska)
- Natalia and her [Github](https://github.com/natkalia)
- Agata and her [Github](https://github.com/ceglarzagata)



## Project requirements:
- React
- Redux
- database (relational or non-relational), its maintenance & input validation
- client/server communication, HTTP request handling
- environment variables
- authorization & authentication
- heroku deployment

## Used technologies and libraries:
- React
- Redux
- React Styled Components
- MongoDB, mongoose, @hapi/joi
- Express.js
- dotenv, config
- bcryptjs, jsonwebtoken
- axios
- heroku deployment
- react-datepicker
- react-select
- moment

## Main features:

Managing trip expenses:
- adding / modifying / deleting trips (name, startdate, description)
- adding / modifying / deleting expenses (amount, currency, category, description)
- generating trip summary - 
    comparison of spent and left amount according to budget, 
    graph with expenses divided into categories
- main features can be used only by logged in users
- exchange rates are converted dynamically to main budget currency using external API

## Setup for development:

### Before getting started
To run project on your local machine for development and testing purposes you need to install the following software:

- node.js & npm
- MongoDB

### Getting started
1. Clone repository
```
https://github.com/dobrzyckahanna/TravelPlanner.git
```
2. [Create your database on MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and add .env file to your repository (main folder)
```
.env
```
```
NODE_CONFIG_DIR=./server/config
DB_USER=your Atlas database user name (not user name to Mongo account)
DB_PASSWORD=your Atlas database password (not password to Mongo account)
DB_DATABASE_ADDRESS=your Atlas database address
DB_DATABASE_NAME=your Atlas database name
NODE_ENV=development
DEBUG=server:startup,server:database
DEBUG_COLORS=true
DEBUG_FD=1
JWT_PRIVATEKEY=your secret jwt key
```
3. Install required project dependencies
```
cd TravelPlanner
npm run install:app
```
4. Run developer server
```
npm run start:app
```
5. To see and test app open on [localhost:3000](http://localhost:3000)

## Credits:
- Icons used:
    - Icon made by Smashicons from www.flaticon.com
    - Icon made by Freepik from www.flaticon.com
- background photo by Louis Hansel on https://unsplash.com/
- icons from <a href="https://fontawesome.com/">Font Awesome</a>
- external exchange rates API: https://api.exchangerate-api.com/v4/latest/

## To improve:
- keeping user logged in after page refresh
- secure Private Route (change the validation method)
- redux refactor 
- improve solution with exchange rates object
- add animation to dropdown menu
- remove or hash password in login payload
- change user status to "loggedIn" after registration

## Future features:
- adding / modifying custom categories
- searching in user trips
- sorting user trips
- sorting and filtering user expenses


## About CodersCamp
This is the 5th edition od the camp. More info about the camp: https://coderscamp.edu.pl/