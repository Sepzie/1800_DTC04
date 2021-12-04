function insertName() {
    // insertName function is imported from other pages that use this function and we use it here to
    // authenticate the user. Other functions that need user authentication are called within this function.
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    userSet = userDoc.data().set
                    displaySchedule(userSet)                // Calling display schedule function
                    //console.log(user_Name);
                    //document.getElementById("username").innerText = n;         //using javascript
                    $("#name-goes-here1").text(user_Name); //using jquery
                })
        } else {
            // No user is signed in.
            console.log("no user signed in")
        }
    });
}

function displaySchedule(userSet) {
    // This function retrieves the schedule data from the database, and creates banners for each day and 
    // cards for classes under each banner.
    let DateTemplate = document.getElementById("DateTemplate")
    let ClassTemplate = document.getElementById("ClassTemplate")

    var set = db.collection("classes").doc(userSet)
    set.get()
        .then(setDoc => {
            var Dates = setDoc.data().Dates;
            for (i = 0; i < Dates.length; i++) {
                // This for loop iterates through the dates inside a set and creates a banner for each
                let date = Dates[i];
                let newdate = DateTemplate.content.cloneNode(true)
                newdate.querySelector('.date-goes-here').innerHTML = date
                newdate.querySelector('.class-goes-here').setAttribute("id", date)
                document.getElementById('body').appendChild(newdate)
                // It then creates the cards for each class under it's banner
                set.collection(date).get().then(snap => {
                    snap.forEach(classDoc => { //iterate thru each doc (class)
                        var CourseID = classDoc.data().CourseID
                        var Instructor = classDoc.data().Instructor
                        var Time = classDoc.data().Time
                        var ClassName = classDoc.data().CourseName

                        let newclass = ClassTemplate.content.cloneNode(true)
                        // update class card
                        newclass.querySelector('.card-title').innerHTML = CourseID
                        newclass.querySelector('.class-name').innerHTML = ClassName
                        newclass.querySelector('.instructor').innerHTML = "Instructor: " +
                            Instructor
                        newclass.querySelector('.time').innerHTML = "Time: " + Time
                        newclass.querySelector('.card-body').setAttribute("id", date +
                            CourseID)
                        document.getElementById(date).appendChild(newclass);


                    })
                })
            }
        })
}

async function getClassCSVdata() {
    // This function is to update the database with the class schedules. The schedule is saved in a CSV file.
    // This function is only ran when we need to update the whole database.
    // The classes set in the database must be deleted before running this function to avoid
    // creating duplicate documents.
    const response = await fetch('../class-data.csv'); //send get request
    const data = await response.text(); //get file response
    const list = data.split('\n').slice(1); //get line
    list.forEach(async row => {
        const columns = row.split(','); //get token 
        const set = columns[0];
        const date = columns[1];
        const courseID = columns[2];
        const courseName = columns[3];
        const instructor = columns[4];
        const time = columns[5];

        // Update the array of class dates with the dates of all classes
        const classDates = db.collection('classes').doc(set);
        const addDates = await classDates.update({
            Dates: firebase.firestore.FieldValue.arrayUnion(date)
        })

        classData = {
            CourseID: courseID,
            CourseName: courseName,
            Instructor: instructor,
            Time: time
        }

        // console.log(classData)
        db.collection('classes').doc(set).collection(date).add(classData)
    })
}


insertName();