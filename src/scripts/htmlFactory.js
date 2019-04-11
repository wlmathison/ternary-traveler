const htmlFactory = {
    // Function to build and return a fieldset with label and input that is required
    buildRequiredFieldset(labelText, placeholderText, inputId) {
        let fieldsetEl = document.createElement("fieldset");
        let labelEl = document.createElement("label");
        labelEl.textContent = labelText;
        fieldsetEl.appendChild(labelEl);
        let inputEl = document.createElement("input");
        inputEl.id = inputId;
        inputEl.setAttribute("required", "");
        inputEl.required = true;
        inputEl.placeholder = placeholderText;
        fieldsetEl.appendChild(inputEl);
        return fieldsetEl;
    },
    // Function to build and return a fieldset with label and input
    buildFieldset(labelText, placeholderText, inputId) {
        let fieldsetEl = document.createElement("fieldset");
        let labelEl = document.createElement("label");
        labelEl.textContent = labelText;
        fieldsetEl.appendChild(labelEl);
        let inputEl = document.createElement("input");
        inputEl.id = inputId;
        inputEl.placeholder = placeholderText;
        fieldsetEl.appendChild(inputEl);
        return fieldsetEl;
    },
    // Function to build and return an option
    buildOption(name, id) {
        let option = document.createElement("option");
        option.value = id;
        option.textContent = name;
        return option;
    },
    // Factory function to build an interest object
    createInterestObject(placeId, name, description, cost, review) {
        return {
            "placeId": placeId,
            "name": name,
            "description": description,
            "cost": cost,
            "review": review
        }
    },
    // Factory function to build and return a smaller interest object with only cost and review
    createChangeObject(cost, review) {
        return {
            "cost": cost,
            "review": review
        }
    },
    // Function to clear an element which is passed as an argument
    clearContainer(elementToClear) {
        while (elementToClear.firstChild) {
            elementToClear.removeChild(elementToClear.firstChild);
        }
    }
}

export default htmlFactory