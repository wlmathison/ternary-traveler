import apiManager from "./apiManager"
import htmlFactory from "./htmlFactory"
import buildHTML from "./buildHTML";

const eventHandlers = {
    handleSaveInterest() {
        let place = document.getElementById("dropdown").value;
        let name = document.getElementById("name-input").value;
        let description = document.getElementById("description-input").value;
        let cost = Number(document.getElementById("cost-input").value);
        let review = document.getElementById("review-input").value;

        if (name === "" || description === "") {
            return false;
        } else {
            apiManager.postInterest(htmlFactory.createInterestObject(place, name, description, cost, review))
        }

    },
    handleEditInterest() {
        let interestId = event.target.id.split("--")[1];
        let interestDiv = document.getElementById(`interest-div--${interestId}`);
        interestDiv.textContent = "";
        apiManager.getInterest(interestId)
            .then(interest => {
                return interestDiv.appendChild(buildHTML.buildEditForm(interest.name, interest.description, interest.cost, interest.review));
            })
    }
}

export default eventHandlers