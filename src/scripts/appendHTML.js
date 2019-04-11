import buildHTML from "./buildHTML"
import apiManager from "./apiManager"

const displayContainer = document.getElementById("display-container");

const appendHTML = {
    // Function to append all interests to the DOM
    appendInterests() {
        const interestsContainer = document.createElement("div");
        interestsContainer.classList = "card split-div";
        displayContainer.appendChild(interestsContainer);

        return apiManager.getAllInterests()
            .then(interests => {
                let headerDiv = document.createElement("div");
                headerDiv.classList = "card-header interests-header"
                headerDiv.textContent = "POINTS OF INTEREST";
                interestsContainer.appendChild(headerDiv);
                let interestsDiv = document.createElement("div");
                interestsDiv.classList = "interests-body";

                interests.forEach(interest => {

                    interestsDiv.appendChild(buildHTML.buildInterest(interest.name, interest.description, Number(interest.cost), interest.review, interest.place.name, interest.id))
                })
                interestsContainer.appendChild(interestsDiv);
            })
    }
}

export default appendHTML