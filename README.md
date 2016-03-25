BarHawk
==========
[![Build Status](https://travis-ci.org/MKSBest/BarHawk.svg?branch=master)](https://travis-ci.org/MKSBest/BarHawk)

Overview 
======
BarHawk is a mobile-friendly web application designed to track bar orders and Blood Alcohol Content (BACs). Upon submitting a drink order, BarHawk's personalized algorithm calculates the current BAC based on a customer's weight, gender, grams of alcohol consumed, and time elapsed since starting to drink. Drink orders from all customers are neatly organized to minimize order surges. Bartenders will be less likely to overserve with the help of BarHawk's color-coded list of customer BACs. Customers receive text messages when their drink or closed tab is ready to be picked up at the bar. BarHawk ensures a smooth customer experience while also unburdening bartenders of stress and liability.

Installation
=============
To get started, run these commands from the terminal:
```
$ git clone https://github.com/MKSBest/BarHawk.git
$ cd BarHawk
$ npm install
$ npm start
```

Testing
=============
20 Mocha/Chai/Supertest server-side tests and 10 Jasmine/Karma client-side tests can be run by typing this command from the terminal:
```
$ npm test
```

Technology Stack
==========
![](http://res.cloudinary.com/hidgkk5lm/image/upload/v1458860341/Screen_Shot_2016-03-24_at_3.57.01_PM_hkmnxa.png)

File Structure
==========

Client Folder: Holds all files associated with the View, Controllers, and Factories. The client directory also contains the styling and assets.

ServerFolder: Contains the server, middleware, routing, database configuration, migration, and seeder files.

Specs: Contains 20 Mocha/Chai/Supertest server-side tests and 10 Jasmine/Karma client-side tests.

```
BarHawk
  |-client
    |---app             # Configuration, views, controllers, and factories
    |---assets          # Logos and images
    |---styles          # Stylesheets and logos
  |-server           
    |---database        # Sequelize instantiation
    |---migrations      # PostgreSQL migrations
    |---models          # Schema
    |---seeders         # Database prepopulation
  |-spec              
    |---client          # Jasmine/Karma client-side controller tests
    |---server          # Mocha/Chai/Supertest server-side tests

```

# Features
Customers:

- Sort menu options by price, calories, carbs, sugar, and alcoholic content
- Order drinks and close bar tab via smart phone
- Visualize up-to-date BAC
- Track order history

Bartenders:

- Track customers' BACs
- Notify customers via text message that drink is ready to be picked up
- Notify customers of Last Call for drink orders half an hour before bar closes
- Hail taxis for customers in need

# Future Features
With more time, we would have loved to implement the below features. Feel free to check out our current [issues](https://github.com/MKSBest/BarHawk/issues).

- Enable customers to order more than one drink at a time 
- Update BAC of one customer who received a drink purchased by a separate customer
- Upload customer photographs
- Solicit satisfaction ratings from customers and bartenders
- PayPal/credit card payment
- Move your drink order to the front of the queue by donating to Mothers Against Drunk Driving (MADD)

# Style Guide
All code adheres to the [style guide](https://github.com/MKSBest/BarHawk/blob/master/STYLE-GUIDE.md) which is based on the airbnb style guide.

Contributing
=========
Thank you for taking interest in contributing! Please read our [CONTRIBUTING.md](https://github.com/MKSBest/BarHawk/blob/master/CONTRIBUTING.md) and check out our current [issues](https://github.com/MKSBest/BarHawk/issues).

Engineers
==========
- [Collin Adams](https://github.com/collinadams)
- [John Chau](https://github.com/ydjjabt)
- [Daniel Novograd](https://github.com/danielnovograd)
- [Nadine Ott](https://github.com/nadineott)
- [Michael Serna](https://github.com/michaelserna)

![](http://res.cloudinary.com/hidgkk5lm/image/upload/c_scale,r_21,w_801/v1458866640/ThesisGroup_qd3vda.jpg)

