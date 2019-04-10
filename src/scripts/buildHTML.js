import htmlFactory from "./htmlFactory"
import apiManager from "./apiManager"

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
        newInterestForm.appendChild(htmlFactory.buildFieldset("Name", "Please enter point of interest name"));
        newInterestForm.appendChild(htmlFactory.buildFieldset("Description", "Please enter description"));
        newInterestForm.appendChild(htmlFactory.buildFieldset("Cost", "Please enter cost"));
        let dropdownFieldset = document.createElement("fieldset");
        let dropdownLabel = document.createElement("label");
        dropdownLabel.textContent = "Choose location";
        dropdownFieldset.appendChild(dropdownLabel);
        let dropdown = document.createElement("select");
        dropdown.name = "location";
        apiManager.getPlaces()
            .then(places => {
                places.forEach(place => {
                    return dropdown.appendChild(htmlFactory.buildOption(place.name));
                })
            }).then(() => {
                dropdownFieldset.appendChild(dropdown);
                newInterestForm.appendChild(dropdownFieldset);
                let saveButton = document.createElement("button");
                saveButton.textContent = "Save Point Of Interest";
                saveButton.addEventListener("click", () => {
                    console.log("save button clicked")
                })
                newInterestForm.appendChild(saveButton);
                displayContainer.appendChild(newInterestForm);
                return newInterestForm;
            })
    }
}

export default buildHTML