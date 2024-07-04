# Quizopia

Live : https://quizopia.vercel.app/

Developed a comprehensive platform designed to empower educators by providing a clear and user-friendly interface for sharing and conducting quizzes and various class activities.

Key Features:

- Quiz Management: Enabled the creation and scheduling of quizzes with specific times and dates, including multiple-choice questions.
- Real-Time Updates: Integrated socket.io for real-time updates and interactions.
- Automatic Submission: Implemented automatic quiz submission upon time completion.
- Leaderboard: Developed a dynamic leaderboard to display quiz results and rankings.
- Admin Control: Provided admin functionalities to grant or deny teachers access to the platform, ensuring secure and controlled usage.


 * <h4>Admin:-</h1>
- Accept/Remove the Teacher's request to work on it.
- Add/View Notice for All Teachers (with Date and Time)
- View All Teacher and Student
![1](https://github.com/harshit1142/Quizopia/assets/112557145/47bd405c-a4bd-493d-b266-9d69ea07de72)
![1 5](https://github.com/harshit1142/Quizopia/assets/112557145/bfdc0920-c350-4cb0-9dc9-efa562addec3)
![2](https://github.com/harshit1142/Quizopia/assets/112557145/67044447-fd46-4572-b391-3f04d32972f1)
![3](https://github.com/harshit1142/Quizopia/assets/112557145/5f761989-34db-47ea-a71c-8fb9d1027df4)
![4](https://github.com/harshit1142/Quizopia/assets/112557145/ff97f8ab-4d95-4a99-8a26-b6cd827bf94a)
![5](https://github.com/harshit1142/Quizopia/assets/112557145/b141c216-bf75-49b1-94af-149526c2dc10)
![7](https://github.com/harshit1142/Quizopia/assets/112557145/71401f05-9eb5-4f60-b0c9-b6682c551e15)
![8](https://github.com/harshit1142/Quizopia/assets/112557145/d14aab55-0107-4cf2-bb29-660c8ec425db)


* <h4>Teacher:-</h1>
- Add/Delete Quiz (according to their Branch and Graduation Year)
- Add Question, Date and Time and Duration
- View Ranking after the Quiz End
- Add/View Notice for Student (according to their Branch and Graduation Year)
- View Admin Notice (with Date and Time)
- View All Student
![1](https://github.com/harshit1142/Quizopia/assets/112557145/1c62b80d-2e51-4738-94fd-8a8ecc188f84)
![2](https://github.com/harshit1142/Quizopia/assets/112557145/3815509b-c0a6-489b-b3f9-9216fb4ba50a)
![3](https://github.com/harshit1142/Quizopia/assets/112557145/f622182e-40ad-42ea-9517-df2f9c100231)
![4](https://github.com/harshit1142/Quizopia/assets/112557145/c67d5161-c40e-43b3-9ac4-8d2b601eaa4b)
![5](https://github.com/harshit1142/Quizopia/assets/112557145/a4b63650-4979-47bf-bf2c-3096e0c55531)
![6](https://github.com/harshit1142/Quizopia/assets/112557145/1ad66383-860c-43e1-8c95-2c533645037f)



* <h4>Student:-</h1>
- View All Teacher Quiz  (according to each student Branch and Graduation Year)
- Take Part in Quiz as per the quiz date and Time
- View Quiz Ranking (if participated in that quiz)
- View All Teacher Notices (with Date and Time)
![1](https://github.com/harshit1142/Quizopia/assets/112557145/b2bdb90e-9a86-4016-8e97-2042c5848a98)
![2](https://github.com/harshit1142/Quizopia/assets/112557145/e22ce1fc-bf31-4f48-a21d-3be6935c6ec5)
![3](https://github.com/harshit1142/Quizopia/assets/112557145/8ad3b47c-8ed3-4100-8ace-6252be871c8c)

* <h4>Quiz Window:-</h1>
- Quiz Timer and Progress Bar
- Auto Submission of quiz
- Question Details 
![11](https://github.com/harshit1142/Quizopia/assets/112557145/7635425e-8fba-44a8-9db5-19923308ae0d)
![2](https://github.com/harshit1142/Quizopia/assets/112557145/4d545b01-fac4-4ba8-aa47-25d61277b6d4)


* <h4>LeaderBoard:-</h1>
- Quiz Details
- Ranking are sorted according to the marks 
![1](https://github.com/harshit1142/Quizopia/assets/112557145/83f9765c-8122-4b12-9eff-8f1d1f0583ee)



## Extra Features of Application :
- Single webPage Website
- Login and Register with hash Password
- Logout
![1](https://github.com/harshit1142/Quizopia/assets/112557145/e8613587-76f2-4139-9ae5-16b880ac18c4)
![2](https://github.com/harshit1142/Quizopia/assets/112557145/329837e4-a21c-4855-8ef7-e2d4144359a3)
![3](https://github.com/harshit1142/Quizopia/assets/112557145/4243fa73-c1ba-4e32-aaee-2a1218157e0c)


## Tools used 
### FrontEnd part :
- HTML/CSS/JS
- React Js
- Bootstrap 5
- Redux/Redux toolkit

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
