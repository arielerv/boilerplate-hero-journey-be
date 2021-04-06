# Hero's Journey Back-End
![alt text](https://github.com/arielerv/hero-journey/raw/master/public/logo.ico "Logo")

The project is a boilerplate for node JS and use mongo with the driver mongoose for the database.<br/>

## Environment Variables
```
NODE_ENV=development
PORT=5051

DATABASE_URL=
CRYPT_KEY=

#SERVICE GMAIL WITH OAUTH2 AND GMAIL APIS
TYPE_CONFIRM=email
EMAIL_USER=
EMAIL_PASSWORD=
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_REFRESH_TOKEN=
```

Change `TYPE_CONFIRM` to "" if you don't want or don't have an established email sender.<br/>
*This also has to be set in the Front-End.<br/><br/>

If you don't have a db mongo, you can create free one on <a href=https://www.mongodb.com/cloud/atlas/register>Mongo Atlas</a> ( <a href=https://docs.atlas.mongodb.com/getting-started>guide</a> ), or you can run a local db. 

### Structure</h2>
Routes <br/>
Controllers <br/>
Services <br/>
Models <br/>


After clone this project you should install the npm packages and bower packages.
```
  npm install --force
```

To run the app you should use this command.
```
  npm start
```

Or you can run the project with nodemon to automatically restarting.
```
  npm run dev
```



Enjoy.<br/>
AE
