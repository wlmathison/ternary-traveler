import buildHTML from "./buildHTML"
import apiManager from "./apiManager"

const displayContainer = document.getElementById("display-container");

const appendHTML = {
    appendInterests() {

        return apiManager.getAllInterests()
            .then(interests => {
                let headerDiv = document.createElement("div");
                headerDiv.classList = "card-header"
                headerDiv.textContent = "POINTS OF INTEREST";
                displayContainer.appendChild(headerDiv);

                interests.forEach(interest => {
                    // console.log(interest.cost)
                    buildHTML.buildInterest(interest.name, interest.description, interest.cost, interest.review, interest.place.name, interest.id)
                })
            })
    }
}

export default appendHTML