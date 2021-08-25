Plants API
A guide to the API for Water My Plants

BASE URL: https://web44-water-my-plants.herokuapp.com/

ENDPOINTS:
AUTHENTICATION
[POST] (SIGN-UP) '/api/auth/register' || username, password, and phone_number required. username must be unique
[POST] (LOGIN) '/api/auth/login' || username, password, and phone_number required.

USERS
[GET] '/api/users/:id' || returns array of a single user in the db. only needed for displaying personal information / greeting user.
[PUT] '/api/users/:id' || only password and phone number are needed

PLANTS
[GET] '/api/plants' || returns all of the plants
[GET] '/api/plants/:id' || returns single plant
[POST] '/api/plants' || all fields are required except for image. This will return the plant that was just posted.
[PUT] '/api/plants/:id' || Used to update any plant, all fields are still required besides the image. Returns the updated plant.
[DELETE] '/api/plants/:id' || Deletes the plant specified and prints back a message that it was successfully deleted.
