const htmlFactory = {
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
    buildOption(name, id) {
        let option = document.createElement("option");
        option.value = id;
        option.textContent = name;
        return option;
    },
    createInterestObject(placeId, name, description, cost, review) {
        return {
            "placeId": placeId,
            "name": name,
            "description": description,
            "cost": cost,
            "review": review
        }
    }
}

export default htmlFactory