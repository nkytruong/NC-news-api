# Northcoders News API

## Contents
1. [Project Description](#project-description)
2. [Local Setup](#local-setup)
3. [Project Structure]
4. [Link To Hosted API]

## Project Description
This project creates an API for the purpose of accessing application data programmatically. 

## Local Setup
1) Clone this [repository](https://github.com/nkytruong/NC-news-api) by running the following command:

   ```git clone https://github.com/nkytruong/NC-news-api ```

2) Navigate to the cloned repository and run the following command to install all the dependencies needed:

   ```npm install```

3) To successfully connect to the databases locally, you must add both a .env.test file containing 'PGDATABASE=[YOURTESTDATABASE]' and a .env.development file containing 'PGDATABASE=[YOURACTUALDATABASE].

4) Seed your local database by running the following command:
   ```npm run seed```

5) Test your data by running the following command: 
   ```npm test index.test.js```





--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
