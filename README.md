# Sprint 12 - What to Wear Back End

## Overview

- Project Description
- Methods / Tools
- Git Hub
- Testing

### Project Description

This project covers setting up the back end of the What to Wear application using Express and MongoDB. One of the largest challenges here is using Postman and Git Hub to identify and correct errors before submission.

- Install / Configure Mongo DB
- Install Express package, and set up the back end server
- Install and configure eslint to follow AirBNB guidelines
- Create all routes as described in requrements
- Handle error conditions, assign appropriate error codes to events
- Test all routes
- Complete tesing in Git Hub Actions, make corrections as required

### Methods / Tools

- Back End Database is MongoDB:
  http://mongodb.com

- Mongoose object model is used to access database using javascript:
  http://mongoosejs.com

- Routes are tested on local machine using Postman:
  http://www.postman.com

- Express is used to set up and run the back end server:
  http://www.expressjs.com

### Git Hub

Project is version contolled and deployed on Git Hub:

https://github.com/ArloPannell/se_project_express

### Testing

Routes are tested on local machine with Postman during development, but tested with scripts on Git Hub Actions when committed. Project can be submitted when all tests on Git Hub are passed.

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently submitting.

### Sprint 13 Project Pitch Video

View the recording here:
https://drive.google.com/file/d/1QktIyxf1PqJYZhvAW9b8Hm_RKITC0qPJ/view?usp=sharing

#### Introduction

Hello, my name is **Arlo Pannell**, and this project was completed as part of **Sprint 13** in the **Triple Ten Software Engineering Bootcamp**.

The goal of this sprint was to build the **back-end foundation of a web application**, focusing on database setup, server configuration, and secure user authentication.

This project uses **MongoDB** for the database, with a server built using **Node.js** and **Express.js**.  
User authentication is implemented with **bcryptjs** for password hashing and **JSON Web Tokens (JWT)** for session management and authorization.

#### Process

For this project, I worked methodically through the provided steps, completing each requirement from start to finish while being careful not to duplicate code and following the required project structure.

One of the main architectural goals was keeping the codebase clean and reusable.  
The `app.js` file is intentionally kept as simple as possible, handling core configuration only. Routes are organized logically, with the main routes defined in `index.js` to maintain clean, readable URLs. Additional routes for users and items are separated into their own files, along with dedicated controllers that handle user-related and item-related logic.

Data validation is handled at the model level through the database schema, ensuring consistency and reliability across the application.  
To avoid repetitive error-handling code, I built a shared utility to standardize error messages across all promise chain `catch` blocks.

Once development was complete, I tested the application using **Postman** alongside the provided validation tests. Finally, I used a **GitHub Actions** workflow to run the automated tests required for initial submission before moving on to the next sprint.

#### Challenges and Solutions

One of the main challenges I faced was passing the Postman tests, particularly when errors originated in `catch` blocks and were routed through the centralized error handler. At times, it wasn’t immediately clear which part of the request lifecycle was triggering the failure.

One specific issue occurred during the login process. If a request was missing either the email or password, the error was being thrown with the wrong status code. I resolved this by adding an explicit validation check in the login controller to ensure both fields were present before continuing, along with a custom error message tied directly to that condition.

Because this was our first project without accompanying walkthrough videos, I utlized the AI tools built into VS Code when I got stuck, instead of traditional Google searches or MDN documentation. This turned out to be very efficient, and several of the AI-generated suggestions were refined and incorporated into the final project.

Another challenge involved the authorization middleware. I used AI tools to help identify missing elements and ensure the correct HTTP status codes were returned for authentication errors. One solution I particularly liked was using a regular expression to handle all possible variations of the word “Bearer” in the authorization token, which made the middleware more robust and production-ready.

#### Conclusion

Overall, the last two sprints resulted in a **solid, reusable back-end system** for web applications that require authentication and user data storage. I gained a strong understanding of how routes, controllers, models, and middleware work together to form a secure and maintainable application.

A potential improvement for this project would be storing avatar images as uploaded files on the server rather than using image URLs, which would more closely reflect how production systems manage media. Another future enhancement would be digging deeper into JWT handling and possibly writing a small utility library to automatically strip the “Bearer” prefix from tokens for inclusion across any web applications I develop using this authentication system.

res.status(200).send({message: "Signing off before the token expires"}) 🚀
