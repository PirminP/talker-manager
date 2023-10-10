# Project Talker manager

#### This project consists of an API built for registering talkers, in order to register, view, search, edit and delete information.

* Developed using Node.js/nodemon, Express, MySQL & Docker
* Application that obtains information using the `fs` module

### Instructions
* To run the repository locally, clone the project and use the following commands to initialize Docker:
  
  ```
  docker-compose up -d // start application with docker
  docker attach talker_manager
  npm install // install dependencies
  docker-compose down // stop application
  ```

Use the following command to run the application:
  ```
  npm start or npm run dev
  ```

### Endpoints
#### Login

  | Method     | Functionality | URL |
  | ----------- | ----------- | ----------- |
  | `POST`   | ...  | http://localhost:3000/login |

#### Talker

  | Method     | Functionality | URL |
  | ----------- | ----------- | ----------- |
  | `GET`   | Returns data of all talkers, if registrated | http://localhost:3000/talker |
  | 2   |  |  |
  | 3   |  |  |
  | 4   |  |  |
  | 5   |  |  |
  | 6   |  |  |
