# Unit 12 MySQL Homework: Employee Tracker

This is a basic content management system for companies to use to manage departments, employees, and roles.

Users are walked through the command line interface to select whether to view, add, or update a user.

The functionality works as may be expected but there are a few flaws:

* Manager_ID can't be null yet. In order to allow for null answers I'd have to parse the inquirer input for empty entries and replace it with a null value
* The UI is very basic and not user friendly; in order to assign roles or managers the user needs to input their user ID, when it'd be much better for users to select from a list of options.