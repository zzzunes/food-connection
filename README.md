# Food Connection

Before running the application, first install `nodejs` and `npm`:
```
# apt install nodejs npm
```

Setup guide:
```
$ git clone https://github.com/jragoon/food-connection
$ cd food-connection
$ npm install
```
Following the instructions above will clone the repository and install the necessary dependencies. If dependencies change in the project, you will need to
run `npm install` again. 

To start the express server, do the following:
```
$ cd backend
$ npm start
```

This will run the nodemon (nodemonitor) which adjusts to live changes in the backend. You should see a message similar to `Server is running on port: XXXX`.


# Contributing to Food Connection

In order for your contribution to be accepted, please respect the following guidelines:

    - No business logic in React components
    - Make sure any existing tests pass


# Testing the application using Expo

Before you can run expo for the first time, you must first install it using npm:
```
# npm install -g expo expo-cli
```
To run the application and test it on your phone, first install the Expo app from the Google Play Store / iOS store.
Then, run `npm start` while in the `food-connection` directory. This will bring up and host an expo server locally. At this point, it will provide a QR
code you can scan and run a test version of your app on your phone.


# Server Details

We currently have a free-tier cluster through [MongoDB atlas](https://www.mongodb.com/cloud/atlas).
This means that we have 512MB of storage space, 500 available connections, and shared CPU time. It is hosted in the Eastern US, and can be trivially upgraded in the future. Behind the scenes it is being hosted with Azure.
In order to connect to this account, <b>you must enter the password in the connection string</b> (the ATLAS_URI variable in `backend/.env`). Additionally, all calls in the app that reference api endpoints must reference your localhost. If you get a network request failed exception, <b> make sure that all of your calls are valid addresses on the same network as your mobile device. </b>

# Using the DB

Under backend, the models directory contains the declarations of our schema. Here is where we define schemas for users, food, etc. The DB is referenced in the application through the use of custom API endpoints that are defined in `backend/routes`.
To manually test an API endpoint and how it responds to GET/POST requests from our application, you may use a REST tool such
as Insomnia. Here is an example of adding a user to our database now that the backend is set up:
![Alt text](/screenshots/userAdded.png?raw=true "Insomnia Manual Request")

Additionally, this is what it looks like in the MongoDB Atlas dashboard after the request is successful:

![Alt text](/screenshots/databaseUserAdded.png?raw=true "MongoDB Add Success")


