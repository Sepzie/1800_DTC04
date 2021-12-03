function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                console.log(userDoc.data().set)
                displaySchedule(userDoc.data().set);
                $("#name-goes-here").text(user_Name);
            })
        } else {}
    });
}

function displaySchedule(setName) {
    let DateTemplate = document.getElementById("DateTemplate")
    let ClassTemplate = document.getElementById("ClassTemplate")

    var set = db.collection("classes").doc(setName)
    set.get()
        .then(setDoc => {
            var Dates = setDoc.data().Dates;
            for (i = 0; i < Dates.length; i++) {
                console.log(setDoc.id)
                let date = Dates[i];
                let newdate = DateTemplate.content.cloneNode(true)
                newdate.querySelector('.date-goes-here').innerHTML = date
                newdate.querySelector('.class-goes-here').setAttribute("id", date)
                document.getElementById('body').appendChild(newdate)
                set.collection(date).get().then(snap => {
                    snap.forEach(classDoc => {
                        var CourseID = classDoc.data().CourseID
                        console.log(CourseID)
                        var Instructor = classDoc.data().Instructor
                        var Time = classDoc.data().Time

                        let newclass = ClassTemplate.content.cloneNode(true)
                        newclass.querySelector('.card-title').innerHTML = CourseID
                        newclass.querySelector('.instructor').innerHTML = "Instructor: " + Instructor
                        newclass.querySelector('.time').innerHTML = "Time: " + Time
                        newclass.querySelector('.card-body').setAttribute("id", date + CourseID)
                        newclass.querySelector('.viewMore').setAttribute("id", CourseID)
                        document.getElementById(date).appendChild(newclass);


                    })
                })
            }
        })

}

function setLocalStorage(courseName) {
    localStorage.setItem("course", courseName)
}

insertName();