This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

#####################################################
README

This is a Neighborhood Map Application with data from Google Maps API, React-Google-Maps, and the Yelp API. The Yelp API does not support CORS, so a backend is required to fetch API data. Backend logic is included in YelpAPI.php. To run the application:
* Start backend server using MAMP or another local PHP server, listening to src folder of project
* Change api URL in Places to the local server that the PHP file will run on
  (i.e. My MAMP is using http://localhost:4000/YelpAPI.php)
* Run npm start to launch application

Troubleshooting
* If Yelp data is unavailable, it is most likely that MAMP or your chosen backend is not running. Confirm that the URL is correct in Yelp.js and that the backend server is running