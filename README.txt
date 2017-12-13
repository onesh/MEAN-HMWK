instructions/how stuff is working


the nodejs app is using two main custom made modules namely mongoHelper and readJSON;

1) as the name suggests mongoHelper handles the mongo connection, fetches the data;
2) as the name suggests readJSON is responsible for reading the JSON file containing the JSONified csv data;

3) the app.js (index.html) makes http request to the http server running on port 8080 that queries the database and returns the result;