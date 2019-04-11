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
                headerDiv.classList = "card-header"
                headerDiv.textContent = "POINTS OF INTEREST";
                interestsContainer.appendChild(headerDiv);

                interests.forEach(interest => {
                    interestsContainer.appendChild(buildHTML.buildInterest(interest.name, interest.description, Number(interest.cost), interest.review, interest.place.name, interest.id))
                })
            })
    }
}

export default appendHTML