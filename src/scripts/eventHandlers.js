import apiManager from "./apiManager"
import htmlFactory from "./htmlFactory"
import buildHTML from "./buildHTML"
import appendHTML from "./appendHTML"

const displayContainer = document.getElementById("display-container");

const eventHandlers = {
    // Function to save a new interest when save button clicked and the POST that interest to API and rebuild DOM
    handleSaveInterest() {
        let place = document.getElementById("dropdown").value;
        let name = document.getElementById("name-input").value;
        let description = document.getElementById("description-input").value;
        let cost = Number(document.getElementById("cost-input").value);
        let review = document.getElementById("review-input").value;
        console.log("1")
        if (name === "" || description === "") {
            console.log("hello");
            return false;
        } else {
            apiManager.postInterest(htmlFactory.createInterestObject(place, name, description, cost, review))
                .then(() => {
                    htmlFactory.clearContainer(displayContainer);
                    return buildHTML.buildNewInterestForm()
                        .then(appendHTML.appendInterests);
                })
        }
    },
    // Function to load the edit form to make changes to an interest
    handleEditInterest() {
        let interestId = event.target.id.split("--")[1];
        let interestDiv = document.getElementById(`interest-div--${interestId}`);
        interestDiv.textContent = "";
        apiManager.getInterest(interestId)
            .then(interest => {
                return interestDiv.appendChild(buildHTML.buildEditForm(interest.name, interest.description, interest.cost, interest.review, interest.id));
            })
    },
    // Function to PATCH changes to an interest when user clicks the save button and refresh the DOM
    handleSaveEdit() {
        let interestId = event.target.id.split("--")[1];
        let costsChange = document.getElementById("edit-cost").value;
        if (costsChange === "") {
            costsChange = document.getElementById("edit-cost").placeholder;
        }
        let reviewChange = document.getElementById("edit-review").value;
        let changeObj = htmlFactory.createChangeObject(costsChange, reviewChange)
        htmlFactory.clearContainer(displayContainer);
        apiManager.patchInterest(interestId, changeObj)
            .then(() => {
                buildHTML.buildNewInterestForm();
                appendHTML.appendInterests()
            });
    },
    // Function to confirm delete and DELETE an interest when user clicks delete button
    handleDelete() {
        let interestId = event.target.id.split("--")[1];
        let response = confirm("Are you sure you want to delete this interest?")
        if (response) {
            htmlFactory.clearContainer(displayContainer);
            apiManager.deleteInterest(interestId)
                .then(() => {
                    buildHTML.buildNewInterestForm();
                    appendHTML.appendInterests();
                });
        }
    }
}

export default eventHandlers