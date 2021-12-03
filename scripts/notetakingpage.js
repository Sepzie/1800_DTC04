var currentUser

let courseName = localStorage.getItem("course")
console.log(courseName)
document.getElementById('note-title').innerHTML = courseName;

async function saveUserNote() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            note = document.getElementById('exampleFormControlTextarea1')
                .value;
            title = document.getElementById('title').value;

            let course = localStorage.getItem("course")

            document.getElementById('note-title').innerHTML = course;

            currentUser = db.collection("users").doc(user.uid).collection(course);

            currentUser.add({
                Title: title,
                Note: note
            });
            console.log(note + ' with title of ' + title + ' was added to ' + course + '!');
            setTimeout(function () {
                window.location.href = "./viewnotes.html";
            }, 500);
        } else {

        }
    });
}

function redirect() {
    window.location.assign("viewnotes.html");
}

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name);
            })
        } else {}
    });
}
insertName();