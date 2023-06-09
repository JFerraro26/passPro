Michael Gianoulakis

# 5/12/23

## Topics

MVP goals

Code of conduct

API endpoints

## What was worked on?

Features/issues

MVP feedback:

- Would you have more than 1 type of user (event manager vs consumer?) if so you need to make sure you account for that in the signup form or somewhere else.
- An idea: you can make using a payment api like Stripe a stretch goal. :)
- As a consumer, I can search a list of events and filter by event type, performer, city, etc. to buy a ticket. You should tackle this after you built out some of the CRUD
- As a consumer I can pick a membership tier, that changes any processing fees and a rewards system. This is probably a stretch goal and rewards is probably it's own bullet point
- Main page will show events where the event manager has paid for advertisement. If this is before the login, this is a stretch goal. We grade protected endpoints (i.e endpoints called after login

Mostly worked on endpoints. We were struggling to figure out how to implement a cart and have relationships between it and accounts/events.

## To-Do

Complete last few endpoint pages

Figure out cart interactions

Go over models

Discuss and set up user stories and issues

## Additional Thoughts/Idea

Need more time planning things out before working on code.

We’ll need to flesh out some details to better understand how to implement.

# 5/15/23

## Topics

Project/Endpoint presentations

User stories/issues

Models

Databases

## What was worked on?

Features/issues:

- Completed endpoints and presented them
- Reviewed Learn for user stories/issues
- Created project tasks and sprint pages in notion
- We updated our models to fit our endpoints
- Thinking between different databases to use
- Speaking with instructors tomorrow on options

## To-Do

Update sprint page

Review database tutorials/notes

## Additional Thoughts/Idea

Lots of progress today

# 5/16/23

## Topics

Databases

Endpoints

Models

Standup

## What was worked on?

Updated endpoints

Introduced standup conversations and presented them

Discussed database options with instructors

Started database trials to see which one we’d prefer to use

- I started using PostgreSQL

## To-Do

Finish database trials

User stories

Set up sprints

Set up readme

## Additional Thoughts/Idea

Decide on a database to start bulk of project

# 5/17/23

## Topics

Database

User stories

Gitlab

## What was worked on?

Features/issues:

- Chose to use PostgreSQL
- Added mvp info to notion project home
- Added user stories to gitlab
- Started readme

## To-Do

Update sprints

Set up docker/database

Finish user stories

## Additional Thoughts/Idea

Review FastAPI/PostgreSQL

Update notion tasks, etc

# 5/18/23

## Topics

Docker compose

PostgreSQL

Migrations

Git workflow

## What was worked on?

Features/issues:

- Set up project with docker and database
- Ran into a bunch of issues/errors
- Fixed them and finally got containers, migrations, and beekeeper working
- Reviewed git workflow for multiple branches and merge requests with seirs
- Reviewed UUIDs with instructor
- Asked why db password wouldn’t take in beekeeper but “password” would work. Will have to revisit to research reason

## To-Do

- Review PostgreSQL and FastAPI
- Research UUID implementation
- Update notion
- Resources
- Sprints
- Tasks

## Additional Thoughts/Idea

- Should double check all code from team members so far and get familiar with it

# 5/22/23

## Topics

User stories

Endpoints

Merging

## What was worked on?

Features/issues:

- Added more user stories
- Added resources page on notion
- Updated sprint schedule to fit expected project deadlines
- Approved and merged account and event endpoints
- Added sales post endpoint
- Started states endpoint

## To-Do

Figure out how to set up states

- Can I get them to automatically go into the DB at creation?

# Additional Thoughts/Idea

Holding off on states until later

# 5/23/23

## Topics

Backend endpoints

APIs

# What was worked on?

Features/issues

Completed post and get endpoint for sales (backend)

## To-Do

Start frontend sales

## Additional Thoughts/Idea

Look into third part apis for fastapi to use for states possibly

# 5/24/23

## Topics

Merging

Front end

User stories

## What was worked on?

Features/issues

Added front end for cart and my tickets

Approved merge request for sign in

Added two new user stories

## To-Do

Complete cart and my tickets pages

- Set up state
- Fetch data
- onChanges
- Figure out filter/foreign key options to list

## Additional Thoughts/Idea

Getting basic data and pages working and will update pages with more detail later.

# 5/25/23

## Topics

Front end

Cart

Foreign keys

## What was worked on?

Features/issues

Updated front sales pages

- Added state to cart
- Fetch data to my tickets page and display it

## To-Do

- Figure out how to populate list of events (specifically selected from user) in the cart.
- Put a temp “add to cart” button to event manager to test
- Reeeeeduuuuuxxxxxxxx!
- Confirm one event populates after pressing button
- Update to reflect list and not one UUID or string
- Remove account input on cart form and have it instead register logged in account when completing sales purchase.
- Add data to onSubmit for sales POST
- Replace the displaying UUID on the my tickets page with the information from events the account/user purchased.
- Review fastapi learn videos
- See if sql joins might work
- Find out best way to populate US state data to use for event creation.
- Populate state data on start up?
- Third-party api?
- Create a function that holds and calls state data when needed?

# 5/26/23

## Topics

Front end pages

SQL table joins

## What was worked on?

Features/issues

Checking merge request

- App broken so didn’t approve merge

Looked up table joins for grabbing event details in sales

## To-Do

- Figure out how to populate list of events (specifically selected from user) in the cart.
- Put a temp “add to cart” button to event manager to test
- Reeeeeduuuuuxxxxxxxx!
- Confirm one event populates after pressing button
- Update to reflect list and not one UUID or string
- Remove account input on cart form and have it instead register logged in account when completing sales purchase.
- Add data to onSubmit for sales POST
- Replace the displaying UUID on the my tickets page with the information from events the account/user purchased.
- Review fastapi learn videos
- See if sql joins might work
- Find out best way to populate US state data to use for event creation.
- Populate state data on start up?
- Third-party api?
- Create a function that holds and calls state data when needed?

# 5/30/23

## Topics

Redux

Events list page

## What was worked on?

Features/issues

Updated my tickets page to use redux and store state globally

Added an Events List page

Did several merge requests for development

## To-Do

Add more redux to current react local state pages

Update cart page

## Additional Thoughts/Idea

Review redux

# 5/31/23

## Topics

Deployment

Events List page

## What was worked on?

Features/issues

Spent some time troubleshooting deployment with Rosheen

Debugging merge issues which caused bugs in the my tickets page

## To-Do

Get events to populate into cart from global state in redux

# 6/1/23

## What was worked on?

Features/issues

- Redux
- Cart
- Events List

## To-Do

Fix bug where sales no longer post

Update ticket quantity logic to update events DB info

# 6/2/23

## Topics

Redux

Cart

Unit testing

## What was worked on?

Features/issues

Started unit testing

Worked on redux cart bug more

- Waiting on HMU for assistance

## To-Do

Fix cart bug

Complete unit tests

Update endpoints with error handling

Update readme

User stories

- Update for DoD
- Check/mark off completed user stories

Clean up code and add comments

Look into ticket quantity changes

# 6/5/23

## Topics

- Testing
- Readme

## What was worked on?

Features/issues

- Completed Unit Testing
- Started on Readme

## To-Do

- Finish readme
- Need to update info previous put in during planning stage
- Update sale/cart interaction

# 6/6/23

## Topics

Cart

## What was worked on?

Features/issues

- Added ticket price and and total price to cart
- In the middle of updating ticket quantity for cart

## To-Do

- Get ticket quantity to reflect each ticket with the price and saved state

# 6/8/23

## Topics

Redux

Tailwind

## What was worked on?

Features/issues

Updated event links to buttons

Updated event details styling

Added event delete button for cart

## To-Do

Complete user stories

Test production

Prep for demo
