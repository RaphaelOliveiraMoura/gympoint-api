<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" style="border-radius:100px"/>
</h1>

<h3 align="center">
  Gym Management App made with Express 
</h3>


<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/LauraBeatris/gympoint-api?color=%23EE4D64">

  <a href="https://www.linkedin.com/in/laurabeatris/">
    <img alt="Made by Laura Beatris" src="https://img.shields.io/badge/made%20by-laurabeatris-%23EE4D64">
  </a>

  <img alt="License" src="https://img.shields.io/badge/licence-MIT-%23EE4D64">

  <a href="https://github.com/LauraBeatris/projects_store/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/LauraBeatris/gympoint-api?color=%23EE4D64">
  </a>
</p>

<p align="center">
  <a href="#rocket-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#ballot_box_with_check-goals">Goals</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#runner-instalattion">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licence">Licence</a>
</p>

## :rocket: About the project
  Rest API of the **Gympoint System**. As a admin, you're able to see the list of students, registrations and plans, as well edting/creating new ones. Also, answer and see the help orders that're pending.
  <br>
 As a student, you're able to do checkins, help orders and also get to know what the intructors answered. Students're allowed to do only 5 checkins per week. 
  
  
  Future features: 
    <br>
    - Trainings made by the Personal Trainer
    - Students can access some datas that show how they've been improving in their trainings
 
 To see the **student interface**, click here to take a look in the mobile aplicattion: [Gympoint Mobile](https://github.com/LauraBeatris/gympoint-mobile)
 <br>
  To see the **admin interface**, click here to take a look in the web aplicattion: [Gympoint Web](https://github.com/LauraBeatris/gympoint-web)


## :ballot_box_with_check: Goals

Apply all the important concepts of a Rest API with Express and Sequelize ORM, using a services like PostgreSQL, MongoDB, Redis with BeeQueue and Nodemailer with Mailgun. 

## :runner: Installation 

```   
  // 1 - Git Clone
  
  // 2 - Copy the .env.example and set the environment variables
  cp .env.example .env
  
  // 3 - Run the services (Be sure to have docker and docker-compose installed)
  docker-compose up -d 
  
  // 4 - Once the services are running, its time to install the dependencies
  yarn install
  
  // 5 - Run the application 
  yarn dev
  
  // 6 - Run the application queue for the mail job
  yarn queue-dev

  ```

## :incoming_envelope: Routes
Soon.

## Status Codes

Gympoint returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 422 | `UNPROCESSABLE ENTITY` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

## :memo: Licence

MIT Licence. See the file [LICENSE](LICENSE.md) for more details.

---

Made with ♥ by Laura :wave: [See my linkedin!](https://www.linkedin.com/in/laurabeatris/)
