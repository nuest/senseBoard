# senseBoard

Story-Board for the senseBox, developed as part of the bachelor thesis "A multi-spatial dashboard related to senseBox data".

The repository has 2 different sections: frontend and backend.

A demo application is hosted online at [https://senseboard.netlify.com/](https://senseboard.netlify.com/).
The research conducted alongside the development of this application can be found [here](#).

## Setting up the application for development 

### Frontend

See directory `frontend`.

Built with React for display/UI.
The frontend makes calls through a proxy to a node.js server.
To run the development server for React run the following commands from the `frontend` folder: 

```bash
npm install
yarn start
```

The user interface should open automatically at [http://localhost:3000](http://localhost:3000).

### Backend 

Built with NodeJS to act as an API which the front-end can call.
Scripts for statistics rendering are in Python.

To start the backend server make sure you have `python3` and NodeJS installed.
If so run the following commands from the `backend` folder:

```bash
npm install
PORT=3001 DEBUG=* node bin/www
```
