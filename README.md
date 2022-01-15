## Virtual Learning Buddy

* [Hosted Project](#hosted-project)
* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## Hosted Project
https://dtc04-5a24d.web.app/htmls/todo.html  
Please view in mobile dimensions.

## General Info
This is the project folder for COMP 1800 project in the term 1 of the CST program at BCIT. This project is developed by Team DTC-04 which includes Abdullah Hannani, Aditya Singh Attri and Sepehr Zohoori Rad. Our team, is developing "VLB (Virtual Learning Buddy" to help online learners to overcome distractions and stay focused by combining everything that is needed for an interactive learning environment in one place. This project was handed in on December 3, 2021.

## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Firebase 
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── 404.html                 # 404 page created by firebase   
├── class_data.csv           # Class data CSV file which includes the schedule for all sets
├── index.html               # Landing HTML file, this is what users see when you click on our URL
├── login.html               # Login HTML file, this is where we use firebase to authenticate our users
├── main.html                # Main HTML file, this is the first page our authenticated users see
└── README.md                # The page you are reading right now

 It has the following subfolders and files:
├── .git                     # Folder for git repo
├── .vscode                  # Folder for VSCode
    /setting.json            # VSCode settings data
├── htmls                    # Folder for all HTML files that are not top level
    /clasroom.html           # Classroom HTML file, this is where the users see their lecture schedule
    /lecture.html            # Lecture HTML file, this is a dummy lecture page
    /notes.html              # Notes HTML file, this is where users see their notes collections
    /notetakingpage.html     # Notetakingpage HTML file, this is where users take new notes
    /profile.html            # Profile HTML file, this is where users can change their name and set
    /todo.html               # Todo HTML file, this is where users can show their to-do items
    /todomore.html           # Todomore HTML file, this is where users can edit their to-do items
    /updatenotes.html        # Updatenotes HTML file, this is where users can edit their notes
    /viewnotes.html          # Viewnotes HTML file, this is where users can see the notes for each class
├── images                   # Folder for images
    /account.png             # Profile icon
    /Aditya.jpg              # Picture of developer for index.html
    /clipart4449942.png      # App logo for index.html
    /event.png               # Icon for index.html
    /mic.png                 # Microphone icon for lecture.html
    /Sepehr.jfif             # Picture of developer for index.html
    /snapseed.jpg            # Picture of developer for index.html
    /student1.jpg            # Static video image for lecture.html
    /student2.jpg            # Static video image for lecture.html
    /student3.jpg            # Static video image for lecture.html
    /student4.jpg            # Static video image for lecture.html
    /teacher.jpg             # Static video image for lecture.html
    /verified.png            # Icon for index.html
    /webcam.png              # Webcam icon for lecture.html
├── scripts                  # Folder for scripts
    /classroom.js            # Scripts for clasroom.html
    /firebaseAPI.js          # Script to connect to our Firestore Database
    /login.js                # Scripts for login.html
    /notes.js                # Scripts for notes.html
    /notetakingpage.js       # Scripts for notetakingpage.html
    /profile.js              # Scripts for profile.html
    /todo.js                 # Scripts for todo.html
    /todomore.js             # Scripts for todomore.html
    /updatenotes.js          # Scripts for updatenotes.html
    /viewnotes.js            # Scripts for viewnotes.html
├── styles                   # Folder for styles
    /classroom.css           # Style sheet for classroom.html
    /colour_styles.css       # Style sheet for colour for all pages
    /index.css               # Style sheet for index.html
    /lecture.css             # Style sheet for lecture.html
    /login.css               # Style sheet for login.html
    /main.css                # Style sheet for main.html
    /notes.css               # Style sheet for notes.html
    /profile.css             # Style sheet for profile.html
    /todo.css                # Style sheet for todo.html

Firebase hosting files: 
├── .firebase
    /hosting..cache
├── .firebaserc
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules

```

Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation

