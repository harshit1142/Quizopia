# Quizopia
Quizopia is a MERN website for Three(3) Profile Types Admin, Teacher, and Student
 * <h4>Admin:-</h1>
- Accept/Remove the Teacher's request to work on it.
- Add/View Notice for All Teachers (with Date and Time)
- View All Teacher and Student
* <h4>Teacher:-</h1>
- Add/View Notice for Student (according to their Branch and Graduation Year)
- Add/View Quiz Details (according to their Branch and Graduation Year)
- View Admin Notice (with Date and Time)
- View All Student
* <h4>Student:-</h1>
- View All Teacher Quiz Details (according to each student Branch and Graduation Year)
- View All Teacher Notices (with Date and Time)

## Extra Features of Application :
- Single webPage Website
- Login and Register with hash Password
- Logout

 
## Tools used 
### FrontEnd part :
- HTML/CSS/JS
- React Js
- Bootstrap 5

### BackEnd Part :
- Node js
- MongoDB


## How To Use

To clone and run this Website, you'll need [Git](https://git-scm.com) and [Node](https://nodejs.org/en/download/) installed on your computer.

```bash
# Clone this repository
$ git clone https://github.com/harshit1142/Quizopia.git
# Go into the repository
$ cd Quizopia
# Install dependencies
$ npm install
```

Create .env.local file in side Newshash folder and add following text with your own api key.
```
 MONGO_PROD_URI= "Your MongoDB connection link"
 JWT_KEY="jwt key "
```
Start frontend with following command.
```
$ npm start
```
Start backend with following command.
```
$ cd backend
$ npm start
```