import htmlFactory from "./htmlFactory"
import apiManager from "./apiManager"
import eventHandlers from "./eventHandlers"

const displayContainer = document.getElementById("display-container");

const buildHTML = {
    buildInterest(name, description, cost, review, place, id) {
        let containerDiv = document.createElement("div");
        containerDiv.id = `interest-div--${id}`;
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
        let editButton = document.createElement("button");
        editButton.textContent = "Edit Interest";
        editButton.id = `edit-button--${id}`;
        editButton.addEventListener("click", eventHandlers.handleEditInterest);
        containerDiv.appendChild(editButton);
        containerDiv.appendChild(document.createElement("hr"));
        displayContainer.appendChild(containerDiv);
        return containerDiv;
    },
    buildNewInterestForm() {
        let newInterestForm = document.createElement("form");
        let formLabel = document.createElement("label")
        formLabel.textContent = "CREATE NEW POINT OF INTEREST"
        newInterestForm.appendChild(formLabel);
        newInterestForm.appendChild(htmlFactory.buildRequiredFieldset("Name", "Please enter point of interest name", "name-input"));
        newInterestForm.appendChild(htmlFactory.buildRequiredFieldset("Description", "Please enter description", "description-input"));
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
    },
    buildEditForm(name, description, cost, review, place) {
        let documentFrag = document.createDocumentFragment();
        let interestName = document.createElement("h2");
        interestName.textContent = name;
        documentFrag.appendChild(interestName);
        let interestDescription = document.createElement("p");
        interestDescription.textContent = description;
        documentFrag.appendChild(interestDescription);
        let costInput = document.createElement("input");
        if (cost !== "") {
            costInput.placeholder = cost;
        } else {
            costInput.placeholder = "Please enter cost";
        }
        documentFrag.appendChild(costInput);
        let reviewInput = document.createElement("input");
        if (review !== "") {
            reviewInput.placeholder = review;
        } else {
            reviewInput.placeholder = "Please enter review";
        }
        documentFrag.appendChild(reviewInput);
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save Changes";
        // saveButton.addEventListener("click", eventHandlers.handleSaveInterest)
        documentFrag.appendChild(saveButton);
        return documentFrag;

    }
}

export default buildHTML