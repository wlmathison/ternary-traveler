import apiManager from "./apiManager"
import htmlFactory from "./htmlFactory"
import buildHTML from "./buildHTML"
import appendHTML from "./appendHTML"

const displayContainer = document.getElementById("display-container");

const eventHandlers = {
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
    handleEditInterest() {
        let interestId = event.target.id.split("--")[1];
        let interestDiv = document.getElementById(`interest-div--${interestId}`);
        interestDiv.textContent = "";
        apiManager.getInterest(interestId)
            .then(interest => {
                return interestDiv.appendChild(buildHTML.buildEditForm(interest.name, interest.description, interest.cost, interest.review, interest.id));
            })
    },
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