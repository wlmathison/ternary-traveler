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
        displayContainer.appendChild(containerDiv);
        return containerDiv;
    }
}

export default buildHTML