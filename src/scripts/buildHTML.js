import htmlFactory from "./htmlFactory"
import apiManager from "./apiManager"
import eventHandlers from "./eventHandlers"

const displayContainer = document.getElementById("display-container");

const buildHTML = {
    buildInterest(name, description, cost, review, place) {
        let containerDiv = document.createElement("div");
        let interestName = document.createElement("h2");
        interestName.textContent = name;
        containerDiv.appendChild(interestName);
        let interestDescription = document.createElement("p");
        interestDescription.textContent = description;
        containerDiv.appendChild(interestDescription);
        let interestCost = document.createElement("p");
        interestCost.textContent = cost;
        containerDiv.appendChild(interestCost);
        if (review !== "") {
            let interestReview = document.createElement("p");
            interestReview.textContent = review;
            containerDiv.appendChild(interestReview);
        }
        let interestPlace = document.createElement("p");
        interestPlace.textContent = place;
        containerDiv.appendChild(interestPlace);
        containerDiv.appendChild(document.createElement("hr"));
        displayContainer.appendChild(containerDiv);
        return containerDiv;
    },
    buildNewInterestForm() {
        let newInterestForm = document.createElement("form");
        let formLabel = document.createElement("label")
        formLabel.textContent = "CREATE NEW POINT OF INTEREST"
        newInterestForm.appendChild(formLabel);
        newInterestForm.appendChild(htmlFactory.buildFieldset("Name", "Please enter point of interest name", "name-input"));
        newInterestForm.appendChild(htmlFactory.buildFieldset("Description", "Please enter description", "description-input"));
        newInterestForm.appendChild(htmlFactory.buildFieldset("Cost", "Please enter cost", "cost-input"));
        newInterestForm.appendChild(htmlFactory.buildFieldset("Review", "Please enter your review", "review-input"));
        let dropdownFieldset = document.createElement("fieldset");
        let dropdownLabel = document.createElement("label");
        dropdownLabel.textContent = "Choose location";
        dropdownFieldset.appendChild(dropdownLabel);
        let dropdown = document.createElement("select");
        dropdown.id = "dropdown";
        dropdown.name = "location";
        apiManager.getPlaces()
            .then(places => {
                places.forEach(place => {
                    return dropdown.appendChild(htmlFactory.buildOption(place.name, place.id));
                })
            }).then(() => {
                dropdownFieldset.appendChild(dropdown);
                newInterestForm.appendChild(dropdownFieldset);
                let saveButton = document.createElement("button");
                saveButton.textContent = "Save Point Of Interest";
                saveButton.addEventListener("click", eventHandlers.handleSaveInterest)
                newInterestForm.appendChild(saveButton);
                displayContainer.appendChild(newInterestForm);
                return newInterestForm;
            })
    }
}

export default buildHTML