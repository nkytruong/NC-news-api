# Northcoders News API

## Contents

1. [Project Description](#project-description)
2. [Local Setup](#local-setup)
3. [Minimum Version Requirements](#minimum-version-requirements)
4. [Link To Hosted API](#link-to-hosted-api)

## Project Description

This project creates an API using Node.js and Postgres, which mimics the building of a real world backend service such as Reddit. 

Users can view articles and interact with posted articles by commenting on or upvoting.

## Local Setup

1. Clone this [repository](https://github.com/nkytruong/NC-news-api) by running the following command:

   `git clone https://github.com/nkytruong/NC-news-api `

2. Navigate to the cloned repository and run the following command to install all the dependencies needed:

   `npm install`

3. To successfully connect to the databases locally, you must add both a **.env.test** file containing **'PGDATABASE=[YOURTESTDATABASE]'** and a **.env.development** file containing **'PGDATABASE=[YOURACTUALDATABASE]'**.

4. Seed your local database by running the following commands:
   ```
   npm run setup-dbs

   npm run seed
   ```

5. Test your data by running the following command:
   `npm test index.test.js`

## Minimum Version Requirements
- **Node.js** v21.7.2
- **Postgres** v14.11.0

## Link To Hosted API
Here is a link to the hosted API, deployed with Render, which will also provide you with a selection of endpoints that you can have a play around with:

[https://nc-news-api-j07x.onrender.com/api](https://nc-news-api-j07x.onrender.com/api)


---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
