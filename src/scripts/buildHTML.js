import htmlFactory from "./htmlFactory"
import apiManager from "./apiManager"
import eventHandlers from "./eventHandlers"

const displayContainer = document.getElementById("display-container");

const buildHTML = {
    // Function to build an interest with HTML and return it in a document fragment
    buildInterest(name, description, cost, review, place, id) {
        let documentFrag = document.createDocumentFragment();
        let containerDiv = document.createElement("div");
        containerDiv.id = `interest-div--${id}`;
        containerDiv.classList = "card-body"
        let interestName = document.createElement("h2");
        interestName.textContent = name;
        containerDiv.appendChild(interestName);
        let interestDescription = document.createElement("p");
        interestDescription.textContent = description;
        containerDiv.appendChild(interestDescription);
        let interestCost = document.createElement("p");
        interestCost.textContent = `Cost: $${cost}`;
        containerDiv.appendChild(interestCost);
        if (review !== "") {
            let interestReview = document.createElement("p");
            interestReview.textContent = `Review: ${review}`;
            containerDiv.appendChild(interestReview);
        }
        let interestPlace = document.createElement("p");
        interestPlace.textContent = `City: ${place}`;
        interestPlace.style.fontStyle = "italic";
        containerDiv.appendChild(interestPlace);
        let editButton = document.createElement("button");
        editButton.classList = "btn btn-info"
        editButton.textContent = "Edit Interest";
        editButton.id = `edit-button--${id}`;
        editButton.addEventListener("click", eventHandlers.handleEditInterest);
        containerDiv.appendChild(editButton);
        let deleteButton = document.createElement("button");
        deleteButton.classList = "btn btn-danger"
        deleteButton.textContent = "Delete Interest";
        deleteButton.id = `delete-button--${id}`;
        deleteButton.addEventListener("click", eventHandlers.handleDelete);
        containerDiv.appendChild(deleteButton);
        containerDiv.appendChild(document.createElement("hr"));
        documentFrag.appendChild(containerDiv);
        return documentFrag;
    },
    // Function to build the form for adding a new interest
    buildNewInterestForm() {
        let formDiv = document.createElement("div");
        formDiv.classList = "card split-div";
        formDiv.id = "new-interest-form";
        let headerDiv = document.createElement("div")
        headerDiv.classList = "card-header form-header"
        headerDiv.textContent = "CREATE NEW POINT OF INTEREST"
        formDiv.appendChild(headerDiv);
        let bodyDiv = document.createElement("div")
        bodyDiv.classList = "card-body form-body";
        let newInterestForm = document.createElement("form");
        newInterestForm.appendChild(htmlFactory.buildRequiredFieldset("Name:", "Please enter name", "name-input"));
        newInterestForm.appendChild(htmlFactory.buildRequiredFieldset("Description:", "Please enter description", "description-input"));
        newInterestForm.appendChild(htmlFactory.buildFieldset("Cost:", "Please enter cost", "cost-input"));
        newInterestForm.appendChild(htmlFactory.buildFieldset("Review:", "Please enter your review", "review-input"));
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
                newInterestForm.appendChild(document.createElement("hr"));
                let saveButton = document.createElement("button");
                saveButton.classList = "btn btn-primary"
                saveButton.textContent = "Save Point Of Interest";
                saveButton.addEventListener("click", eventHandlers.handleSaveInterest);
                newInterestForm.appendChild(saveButton);
                bodyDiv.appendChild(newInterestForm)
                formDiv.appendChild(bodyDiv);
                displayContainer.appendChild(formDiv);
                return newInterestForm;
            })
    },
    // Function to build the form component to edit an interest after edit button has been clicked
    buildEditForm(name, description, cost, review, id) {
        let documentFrag = document.createDocumentFragment();
        let interestName = document.createElement("h2");
        interestName.textContent = name;
        documentFrag.appendChild(interestName);
        let interestDescription = document.createElement("p");
        interestDescription.textContent = description;
        documentFrag.appendChild(interestDescription);
        let costLabel = document.createElement("label");
        costLabel.textContent = "Cost:";
        documentFrag.appendChild(costLabel);
        let costInput = document.createElement("input");
        costInput.id = "edit-cost";
        if (cost !== "") {
            costInput.placeholder = cost;
        } else {
            costInput.placeholder = "Please enter cost";
        }
        documentFrag.appendChild(costInput);
        let reviewLabel = document.createElement("label");
        reviewLabel.textContent = "Review:";
        documentFrag.appendChild(reviewLabel);
        let reviewInput = document.createElement("input");
        reviewInput.id = "edit-review";
        if (review !== "") {
            reviewInput.placeholder = review;
        } else {
            reviewInput.placeholder = "Please enter review";
        }
        documentFrag.appendChild(reviewInput);
        let saveButton = document.createElement("button");
        saveButton.classList = "btn btn-primary"
        saveButton.id = `save-button--${id}`;
        saveButton.textContent = "Save Changes";
        saveButton.addEventListener("click", eventHandlers.handleSaveEdit)
        documentFrag.appendChild(saveButton);
        return documentFrag;
    }
}

export default buildHTML