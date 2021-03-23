# GameStartWeb
Front end for GameStart


# GameStartWeb

## Project Description

GameStartWeb is the front end portion of a web application that provides users with a platform to search and review a list of games. It uses a Java backend called GameStart that uses a custom api to allow commuication between a user and a PostgreSQL database. It provides a list of the top 10 rated games based on users' ratings and a personal list of saved games.

## Technologies Used

* HTML 5
* CSS 3
* JavaScript - version ECMAScript 2020
* Bootstrap - version 5.0.0
* Node.js - version 14.16.0
* Git - version 2.31.0

## Features

List of features ready and TODOs for future development
* Login/Register feature with authentication
* Displays the top 10 rated games
* Displays a list of favorite games in the user's profile
* Displays the reviews of other users

To-do list:
* The ability to update/deleting reviews
* Register as an admin

## Getting Started
* NOTE: You will need to have the other part of this project already set up in order to hit the endpoints. Here is a link to the Java portion of this project with its own README file setup: https://github.com/GabMoon/GameStart   
1. git clone https://github.com/GabMoon/GameStartWeb.git
2. Once you open the project, you will need to change the URL in each JavaScript file. These link to where ever you are running the Java backend of this project, whether it is localhost, Amazon Elastic Beanstalk, or some other place. Only change up to the .com part. All parts after that are paths to specific endpoints in the Java backend.
3. You will need Node.js if you plan on running this locally because the POST requests require a server for it to run successfully. Once you have installed Node.js, run npx http-server -c-1 in the terminal or npx http-server.
4. Go to localhost:8080 or where ever the terminal tells you the front end is running.
(include all environment setup steps)

> Be sure to include BOTH Windows and Unix command  
> Be sure to mention if the commands only work on a specific platform (eg. AWS, GCP)

- All the `code` required to get started
- Images of what it should look like

## Usage
* If you go to the /home HTML page, you will see the following:
![image](https://user-images.githubusercontent.com/77693248/112175652-cd120980-8bcd-11eb-9443-2152b6d19d63.png)

* Clicking on the Login button at the top right will bring you to the following screen:
![image](https://user-images.githubusercontent.com/77693248/112175822-f16de600-8bcd-11eb-8e2d-97c8a9f19179.png)

* If you don't have an account, click on New Account button located at the bottom.
![image](https://user-images.githubusercontent.com/77693248/112175941-0ba7c400-8bce-11eb-8801-b20926b66069.png)

* Inside the register page, you have to make an account that has a username and email that have not been used before.
![image](https://user-images.githubusercontent.com/77693248/112176153-3d208f80-8bce-11eb-9fa9-c48d0cdb7164.png)

* After you register or login, you will be taken to the home page with the Login button changed to Logout.
![image](https://user-images.githubusercontent.com/77693248/112176392-71944b80-8bce-11eb-83a3-660c049a2b03.png)

*
![image](https://user-images.githubusercontent.com/77693248/112181222-9ee2f880-8bd2-11eb-94b7-a6ae6b0af592.png)

![image](https://user-images.githubusercontent.com/77693248/112176636-a6a09e00-8bce-11eb-973c-f380af17c294.png)

![image](https://user-images.githubusercontent.com/77693248/112177494-5b3abf80-8bcf-11eb-9a8b-733ccaa8cb10.png)

![image](https://user-images.githubusercontent.com/77693248/112181627-faad8180-8bd2-11eb-9ab3-ed90106b0f93.png)





> Here, you instruct other people on how to use your project after they’ve installed it. This would also be a good place to include screenshots of your project in action.

## Contributors

> Gabrielle Luna, Calvin Zheng, Tuan Mai, and Daniel Skwarcha

## License

This project uses the following license: [<license_name>](<link>).
