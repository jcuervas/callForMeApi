# callForMeApi
Service to bring an api to mobile app Call 4 me (not published yet). 
## Description
This is a personal project for an automated calls management mobile app. 
This app will provide users a service to perform automated and programmed calls, sms sending and agenda events handling. Users can record or write a message to be sent via sms or phone call to selected contacts on selected dates. A text to speech service will speak that message if it's written. 
Calls and sms sending use [https://www.plivo.com/](Plivo) so target contacts don't need to have this app installed as communication uses standar operator calls.
This is the api that holds server logic

## Tech stack
This api is written in typescript using nestjs and is ready to be deployed to firebase hosting  
Data is stored in a MySql database and connectivity is performed with typeOrm

## Getting started
1. Install dependencies with npm or yarn
2. Create a firebase project and enable hosting and functions services
3. Install firebase-tools globally
4. Login to your firebase account

## Work with this app
Firebase act as a serverless service with functions. An http request function will serve the express app.
Data is managed by a MySql layer but database cannot live in firebase so a MySql service is needed.

## Nest Refactor
App is being rewritten for nest framework so at this time is not fully functional yet.
