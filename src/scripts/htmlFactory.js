const htmlFactory = {
    buildFieldset(labelText, placeholderText) {
        let fieldsetEl = document.createElement("fieldset");
        let labelEl = document.createElement("label");
        labelEl.textContent = labelText;
        fieldsetEl.appendChild(labelEl);
        let inputEl = document.createElement("input");
        inputEl.placeholder = placeholderText;
        fieldsetEl.appendChild(inputEl);
        return fieldsetEl;
    },
    buildOption(place) {
        let option = document.createElement("option");
        option.value = place;
        option.textContent = place;
        return option;
    },
    createInterestObject(placeId, name, description, cost, review) {
        return {
            "placeID": placeId,
            "name": name,
            "description": description,
            "cost": cost,
            "review": review
        }
    }
}

export default htmlFactory