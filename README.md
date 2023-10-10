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
  | `POST`   |  Login user and returns token with validation of password & email | http://localhost:3000/login |

The following JSON is to be entered in the request:
  ```
  {
  "email": "email@email.com",
  "password": "123456"
  }
  ```

#### Talker

  | Method     | Functionality | URL |
  | ----------- | ----------- | ----------- |
  | `GET`   | Returns data of all talkers, if any exist | http://localhost:3000/talker |
  | `GET`   | Returns data of a specific talker, if any  exist| http://localhost:3000/talker/:id |
  | `GET`   |  |  |
  | `PUT`   |  |  |
  | `POST`   | Create a new talker | http://localhost:3000/talker |
  | `DELTE`   |  |  |

The following JSON is to be entered in the request PUT & POST:
  ```
  {
  "name": "Palestrante",
  "age": 30,
  "talk": {
    "watchedAt": "22/104/2022",
    "rate": 6
  }
  }
  ```
