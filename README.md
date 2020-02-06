This is a simple script to generate users for back-end testing.

Simply install the app, and run "npm start" script to synchronously generate 20 users with random names and emails that will pass basic validation checks, as well as the password "pass1234", encrypted for db storage.

If you want to generate more users, change the "n" value in the script.

If you don't need auto-generated ID's, simply remove the "temp.id" assignment in the generateUsers function.
