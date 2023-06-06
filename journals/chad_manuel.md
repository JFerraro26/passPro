Chad Manuel

# 5/15/23

## Topics

-   FastAPI
-   Mongodb
-   PostgreSQL

## What was worked on?

Features/issues:

-   Today we focused on finishing how our BaseModel will look like moving forward.
-   The team also discussed possibly moving from our initial mongodb database over to sql

## To-Do

-   Decide on picking what database to use after consulting with Rosheen tomorrow(5/16)
-   Divy up the work
-   Research more about creating tables with UUID

## Additional Thoughts/Idea

-   I need to do some more research on sql tables to get a better understanding

---

# 5/16/23

## Topics

-   Postgresql

-   Mongodb

-   FastAPI

## What was worked on?

-   Today we worked on finalizing our pydantic models and finishing the api endpoints
-   We had some instructor input to help us decide on which database we’re using for the project
-   We had each group member make a simple api request to test out which database we would like to use and will talk about it more tomorrow.
-   I worked on mongodb with fast api, setting up the database was nice and smooth, having some difficulties setting up a list view though but I just need more practice with fastapi to get what else I’m missing.

## To-Do

-   Discuss sql vs no sql
-   Work on our User stories Tomorrow!!!!

## Additional Thoughts/Idea

-   Need more practice with Fastapi but glad to start getting to coding again

---

# 5/17/23

## Topics

-   PostGreSQL

-   Authentication

-   FastAPI

## What was worked on?

-   Today we finalized on using PostGreSQL as our database
-   We finished 2 user stories with still a lot to go.
-   We made some adjustments to our final models adding a new state model also adding more properties to our events.
-   We were also did some soft dividing of our work and we’ll be planning on working on.

## To-Do

-   Get started on authentication
-   Make some SQL tables tonight to get some practice
-   Finish the rest of our User Issues these next couple of days and finalize on who is doing what
-   Work on dockerfile to get everything working.

## Additional Thoughts/Idea

-   Figure out git workflow Merge request in particular

---

# 5/17/23

## Topics

PostGreSQL

Docker-Compose

## What was worked on?

-   Today we worked setting up our database and finishing up our tables.
-   We were successful in setting up the database after dealing with a few errors.
-   We learned how to set up a delay where a service only starts when a certain service is done getting setup

## To-Do

-   We need to do some more research on UUID and how to implement that as our id for our tables
-   Need to get started on auth during the weekend and hopefully finish by the end of the week.

## Additional Thoughts/Idea

---

# 5/22/23

## Topics

Redux
Auth
FastAPI

## What was worked on?

-   Today we were able to finish the authentication for the back end.
-   I also ended up getting openssl up and running today to create our signing keys
-   I got started with the front-end authentication but is currently not working.
-   We also did some of our user stories

## To-Do

-   Figure out how to implement frontend authentication
-   Learn more on styling utilizing tailwind

## Additional Thoughts/Idea

---

# 5/23/23

## Topics

Redux
Auth
FastAPI

## What was worked on?

-   Today I focused on learning more about redux and figuring out on how to use it alongside with authentication, I'm still in the process of rewatching and coding along the learn videos and am hoping to finish this by tonight or the latest tomorrow night.
-   As a team we were successfully able to merge a decent sized branch thanks to Joe and Michael
-   Last night after the exploration I was able to dabble a little bit into tailwind and I'm excited on how it will look eventually

## To-Do

-   Finish front end auth including registration, logging in, and logging out in redux
-   We still need to continue on finishing out the user stories we've had.

## Additional Thoughts/Idea

---

# 5/24/23

## Topics

Redux
Auth
FastAPI
Front-End
Tailwind

## What was worked on?

-   Today I worked on finishing up the front end auth and learning more about how redux actually works. We learned on how to access the state that is stored in the store. I was able to figure out how to also attach the headers automatically thanks to some guidance from learn.

## To-Do

-   Get started on the profile page front end and start having all the components ready for it.

## Additional Thoughts/Idea

-   I definitely need to read more on accessing states inside of stores for redux.

---

# 5/25/23

## Topics

Redux
Redux Tool Kit
Auth
FastAPI
Front-End

## What was worked on?

-   Today I worked on finalizing the edit portion of the account in the back end and got started with the front end today. Unfortunately for the front end, I started to get some errors because the state was not loaded yet but the page tries to load first. I finally figured out how to wrap the whole thing into an async method with await as well. I am still trying to figure out how I can pass through the ID to redux to populate the api call for a put request.

## To-Do

-   I still need to finish the edit portion of the front end
-   Get started on the profile page hopefully.

## Additional Thoughts/Idea

---

# 5/26/23

## Topics

Redux
Auth
FastAPI
Front-End

## What was worked on?

-   Today I worked on one single bug, I can't seem to fix the issue where it holds the previous token even though I've tried to sign in and log out. I added a logout feature onto the front end too to be able to log out of the account

## To-Do

-   Figure out whats going on with the state management and see why its showing the old information in there

## Additional Thoughts/Idea

---

# 5/30/23

## Topics

Redux
ES6
Auth

## What was worked on?

-   Today I worked on the front end portion of the my profile. We were also able to to fix the issues with the react redux not holding onto the account info or updating with the account info correctly. I was able to nest a component inside with an onclick and using ternary operator

## To-Do

-   Finish my profile page and nest all neccessary information inside of the page.

## Additional Thoughts/Idea

---

# 5/31/2023

## Topic

Redux
Auth

## What was worked ?

-   Today I was trying to handle the edit account information to where it would reflect the changes of the edit but unfortunately we couldn't get it to change the information. We ended up making a new slice and trying to store the account information through there. We are still having issues with it and couldn't figure out why it wasn't updating properly.

## To-Do

-   Figure out why the update portion isn't working for the accounts information.

## Additional Thoughts/Idea

---

# 6/1/2023

## Topic

Redux
State management

## What was worked ?

-   Today we worked on fixing merge conflicts. We were also able to fix the edit account issue where it would not update the state. Joe was able to think of a great idea to create another get request in the backend. I ended up adding a few things into the backend to require a logged in account

## To-Do

-   Get started with deployment tonight

## Additional Thoughts/Idea

-   Need to start drafting up Read me.

---

# 6/2/2023

## Topic

Deployment

## What was worked ?

-   Today I mainly focused on getting our backend deployed but was running into some issues with fixing the pipelines inside of gitlab. Our whole team was able to successfully verify our accounts in gitlab. Last night I was able to finish the API endpoint readme portion.

## To-Do

-   Figure out blocker for backend deployment and get started deploying frontend

## Additional Thoughts/Idea

---

# 6/3/2023

## Topic

Deployment

## What was worked ?

-   Today we were able to get our backend deployed. I mainly worked on getting the frontend deployed.

## To-Do

-   I need to refactor my code to call a different api in order to get the sales and event info.

## Additional Thoughts/Idea

---
