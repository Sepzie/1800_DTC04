var currentUser

function saveUserTodo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here:
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            //Save new info to database
            todo = document.getElementById('exampleFormControlInput1').value; //get the value of the field with id="exampleFormControlInput1"
            date = document.getElementById('myDate').value; //get the value of the field with id="myDate"

            console.log(todo);
            console.log(date)

            currentUser = db.collection("users").doc(user.uid).collection("todo");

            currentUser.add({
                    To_Do: todo,
                    Due_Date: date
                })

                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    doc_id = docRef.id  // get the document ID where where the To_Do and Due_Date were added
                    currentUser.doc(docRef.id).set({  // add the doc ID to the field too
                        To_Do: todo,
                        Due_Date: date,
                        Doc_ID: docRef.id 
                    })
                    displayNewTodo(todo, date, doc_id);
                })
            console.log(todo + ' and ' + date + ' was added to the To-Do List')
        } else {
            // No user is signed in.
        }
    });
}

function displayNewTodo(string, date, id) {
    // display the new task without refreshing the page
    let newcard = CardTemplate.content.cloneNode(true);
    //add the task, due date and doc id to display the new card
    newcard.querySelector('.card-item').innerHTML = string;
    newcard.querySelector('.card-date').innerHTML = "Due Date: " + date;
    newcard.querySelector('.doc-id').innerHTML = id;


    //attach the card to the parent element of all the cards
    document.getElementById("todoitem-go-here").appendChild(newcard);

}

function displayAfterDelete(id) {
    // delete the card from the HTML without refreshing the page
    id.parentNode.parentNode.parentNode.removeChild(id.parentNode.parentNode)
}


function deleteTodo(id) {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            console.log(id)
            // Delete the document from the database with the selected card details

            db.collection("users").doc(user.uid).collection("todo").doc(id).delete();
            console.log('Successfully deleted ' + id)

        } else {
            // No user is signed in.
        }
    });
}

function setEditData(id) {
    // Add the document ID in the database of the card selected to the local storage

    var doc_id = id.slice(1, )
    localStorage.setItem("Doc_ID", doc_id)

}

function displayTodo() {
    // Display all the cards with their To-do item and due date 
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            let CardTemplate = document.getElementById("CardTemplate");

            db.collection("users").doc(user.uid).collection("todo").get()
                .then(snap => {
                    var i = 1;
                    snap.forEach(doc => { //iterate through each doc
                        var item = doc.data().To_Do;
                        var date = doc.data().Due_Date;
                        var doc_id = doc.data().Doc_ID
                        let newcard = CardTemplate.content.cloneNode(true);

                        //update task title and due date
                        newcard.querySelector('.card-item').innerHTML = item;
                        newcard.querySelector('.card-date').innerHTML = "Due Date: " + date;
                        newcard.querySelector('.doc-id').innerHTML = doc_id;

                        //give unique ids to all elements for future use
                        newcard.querySelector('.card-item').setAttribute("id", "citem" + i);
                        newcard.querySelector('.card-date').setAttribute("id", "cdate" + i);
                        newcard.querySelector('.doc-id').setAttribute("name", "doc-id" + i);
                        newcard.querySelector('.doc-id').setAttribute("id", doc_id)
                        newcard.querySelector('.DeleteButton').setAttribute("id", doc_id)
                        newcard.querySelector('.EditButton').setAttribute("id", "u" + doc_id)

                        //attach the card to the parent element of all the cards
                        document.getElementById("todoitem-go-here").appendChild(newcard);
                        i++;
                    })
                })
        } else {

        }
    });
}

function sortByAscending() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // delete the previously displayed cards ONLY from the HTML
            const card = document.querySelector('.dataCards');
            card.parentElement.innerHTML = "";

            let CardTemplate = document.getElementById("CardTemplate");
            // get the items from database sorted in ascending order of their dates
            db.collection("users").doc(user.uid).collection("todo").orderBy("Due_Date").get()
                .then(snap => {
                    var i = 1;
                    snap.forEach(doc => { //iterate through each doc
                        var item = doc.data().To_Do;
                        var date = doc.data().Due_Date;
                        var doc_id = doc.data().Doc_ID
                        let newcard = CardTemplate.content.cloneNode(true);

                        //update task title and due date
                        newcard.querySelector('.card-item').innerHTML = item;
                        newcard.querySelector('.card-date').innerHTML = "Due Date: " + date;
                        newcard.querySelector('.doc-id').innerHTML = doc_id;

                        //give unique ids to all elements for future use
                        newcard.querySelector('.card-item').setAttribute("id", "citem" + i);
                        newcard.querySelector('.card-date').setAttribute("id", "cdate" + i);
                        newcard.querySelector('.doc-id').setAttribute("name", "doc-id" + i);
                        newcard.querySelector('.doc-id').setAttribute("id", doc_id)
                        newcard.querySelector('.DeleteButton').setAttribute("id", doc_id)
                        newcard.querySelector('.EditButton').setAttribute("id", "u" + doc_id)

                        //attach the card to the parent element of all the cards
                        document.getElementById("todoitem-go-here").appendChild(newcard);
                        i++;
                    })
                })

        } else {

        }
    });
}

function sortByDescending() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // delete the previously displayed cards ONLY from the HTML
            const card = document.querySelector('.dataCards');
            card.parentElement.innerHTML = "";

            let CardTemplate = document.getElementById("CardTemplate");
            // get the items from database sorted in descending order of their dates
            db.collection("users").doc(user.uid).collection("todo").orderBy("Due_Date", "desc").get()
                .then(snap => {
                    var i = 1;
                    snap.forEach(doc => { //iterate through each doc
                        var item = doc.data().To_Do;
                        var date = doc.data().Due_Date;
                        var doc_id = doc.data().Doc_ID
                        let newcard = CardTemplate.content.cloneNode(true);

                        //update task title and due date
                        newcard.querySelector('.card-item').innerHTML = item;
                        newcard.querySelector('.card-date').innerHTML = "Due Date: " + date;
                        newcard.querySelector('.doc-id').innerHTML = doc_id;

                        //give unique ids to all elements for future use
                        newcard.querySelector('.card-item').setAttribute("id", "citem" + i);
                        newcard.querySelector('.card-date').setAttribute("id", "cdate" + i);
                        newcard.querySelector('.doc-id').setAttribute("name", "doc-id" + i);
                        newcard.querySelector('.doc-id').setAttribute("id", doc_id)
                        newcard.querySelector('.DeleteButton').setAttribute("id", doc_id)
                        newcard.querySelector('.EditButton').setAttribute("id", "u" + doc_id)
                    
                        //attach the card to the parent element of all the cards
                        document.getElementById("todoitem-go-here").appendChild(newcard);
                        i++;
                    })
                })

        } else {

        }
    });
}

// Call the function to display the data from the database
displayTodo();