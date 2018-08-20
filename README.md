# senseBoard
Story-Board for the senseBox. Developed with for my bachelor thesis
Repository has 2 different sections : front-end and back-end
The application is hosted online can be accessed over : www.link.de

## Front-End
Built with React to display everything, makes calls through a proxy to a node.js server. To run the development server for React run the following commands from the senseBoard_frontend folder : 
``` 
npm install
``` 
afterwards run : 
```

yarn start 
```

## Back-End 
Built with NodeJS to act as an API whcih the front-end can call. Scripts for statistics rendering are in python

### How to 
To start the Back-End Server make sure you have python3 and NodeJS installed. If so run the following commands from the senseBoard_backend folder:
```

npm install
```


Afterwards run : 
```

    PORT=3001 node bin/www
```
