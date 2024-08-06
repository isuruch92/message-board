# Simple Message Board App

A very simple message board application developed using a Node.js server and a React.js client.

## Features

- Post messages
- View messages

## Technologies Used

- Node.js
- React.js | uses React context API for state management and CSS modules for styles

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/isuruch92/message-board.git
    cd message-board
    ```

2. Install and run server:

## STEP 1

Run `npm i` to install the dependencies

## STEP 2

Run `npm run dev` to Run the app.  
It should start on [http://localhost:8080]  
You can verify it by loading the URL [http://localhost:8080/channels] on your browser.


3. Install and run client:

## STEP 1

Make sure that the NodeJS server is up and running on the the URL (http://localhost:8080).  
 -- If its not, please go to the server directory root and check the Readme file there to run the server  
If it is on a different URL, please go to the .env file at the root and modify the URL.  
You can also change the URL in the context/ChannelsContext.js

## STEP 2

Run `npm i` to install the dependencies

## STEP 3

Run `npm start` to Run the app in the development mode  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- Post and view messages on the message board.

### Author
Isuru Chamara  
isuruch92@gmail.com
