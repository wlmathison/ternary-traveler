import apiManager from "./apiManager"
import htmlFactory from "./htmlFactory"

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

    }
}

export default eventHandlers