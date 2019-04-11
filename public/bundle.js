(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const api = {
  // Fetch call to get and return all intrests
  getAllInterests() {
    return fetch("http://localhost:8088/interests?_expand=place").then(response => response.json());
  },

  // Fetch call to get and return one intrest
  getInterest(interestId) {
    return fetch(`http://localhost:8088/interests/${interestId}`).then(response => response.json());
  },

  // Fetch call to get and return all places
  getPlaces() {
    return fetch("http://localhost:8088/places").then(response => response.json());
  },

  // Fetch call to POST intrest
  postInterest(newInterest) {
    return fetch("http://localhost:8088/interests", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newInterest)
    }).then(results => results.json());
  },

  // Fetch call to PATCH changes into interest
  patchInterest(interestId, changesObject) {
    return fetch(`http://localhost:8088/interests/${interestId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(changesObject)
    });
  },

  // Fetch call to DELETE an interest
  deleteInterest(interestId) {
    return fetch(`http://localhost:8088/interests/${interestId}`, {
      method: "DELETE"
    });
  }

};
var _default = api;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _buildHTML = _interopRequireDefault(require("./buildHTML"));

var _apiManager = _interopRequireDefault(require("./apiManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const displayContainer = document.getElementById("display-container");
const appendHTML = {
  // Function to append all interests to the DOM
  appendInterests() {
    const interestsContainer = document.createElement("div");
    interestsContainer.classList = "card split-div";
    displayContainer.appendChild(interestsContainer);
    return _apiManager.default.getAllInterests().then(interests => {
      let headerDiv = document.createElement("div");
      headerDiv.classList = "card-header";
      headerDiv.textContent = "POINTS OF INTEREST";
      interestsContainer.appendChild(headerDiv);
      interests.forEach(interest => {
        interestsContainer.appendChild(_buildHTML.default.buildInterest(interest.name, interest.description, Number(interest.cost), interest.review, interest.place.name, interest.id));
      });
    });
  }

};
var _default = appendHTML;
exports.default = _default;

},{"./apiManager":1,"./buildHTML":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlFactory = _interopRequireDefault(require("./htmlFactory"));

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _eventHandlers = _interopRequireDefault(require("./eventHandlers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const displayContainer = document.getElementById("display-container");
const buildHTML = {
  // Function to build an interest with HTML and return it in a document fragment
  buildInterest(name, description, cost, review, place, id) {
    let documentFrag = document.createDocumentFragment();
    let containerDiv = document.createElement("div");
    containerDiv.id = `interest-div--${id}`;
    containerDiv.classList = "card-body";
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
    editButton.classList = "btn btn-info";
    editButton.textContent = "Edit Interest";
    editButton.id = `edit-button--${id}`;
    editButton.addEventListener("click", _eventHandlers.default.handleEditInterest);
    containerDiv.appendChild(editButton);
    let deleteButton = document.createElement("button");
    deleteButton.classList = "btn btn-danger";
    deleteButton.textContent = "Delete Interest";
    deleteButton.id = `delete-button--${id}`;
    deleteButton.addEventListener("click", _eventHandlers.default.handleDelete);
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
    let headerDiv = document.createElement("div");
    headerDiv.classList = "card-header form-header";
    headerDiv.textContent = "CREATE NEW POINT OF INTEREST";
    formDiv.appendChild(headerDiv);
    let bodyDiv = document.createElement("div");
    bodyDiv.classList = "card-body form-body";
    let newInterestForm = document.createElement("form");
    newInterestForm.appendChild(_htmlFactory.default.buildRequiredFieldset("Name:", "Please enter name", "name-input"));
    newInterestForm.appendChild(_htmlFactory.default.buildRequiredFieldset("Description:", "Please enter description", "description-input"));
    newInterestForm.appendChild(_htmlFactory.default.buildFieldset("Cost:", "Please enter cost", "cost-input"));
    newInterestForm.appendChild(_htmlFactory.default.buildFieldset("Review:", "Please enter your review", "review-input"));
    let dropdownFieldset = document.createElement("fieldset");
    let dropdownLabel = document.createElement("label");
    dropdownLabel.textContent = "Choose location";
    dropdownFieldset.appendChild(dropdownLabel);
    let dropdown = document.createElement("select");
    dropdown.id = "dropdown";
    dropdown.name = "location";

    _apiManager.default.getPlaces().then(places => {
      places.forEach(place => {
        return dropdown.appendChild(_htmlFactory.default.buildOption(place.name, place.id));
      });
    }).then(() => {
      dropdownFieldset.appendChild(dropdown);
      newInterestForm.appendChild(dropdownFieldset);
      newInterestForm.appendChild(document.createElement("hr"));
      let saveButton = document.createElement("button");
      saveButton.classList = "btn btn-primary";
      saveButton.textContent = "Save Point Of Interest";
      saveButton.addEventListener("click", _eventHandlers.default.handleSaveInterest);
      newInterestForm.appendChild(saveButton);
      bodyDiv.appendChild(newInterestForm);
      formDiv.appendChild(bodyDiv);
      displayContainer.appendChild(formDiv);
      return newInterestForm;
    });
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
    saveButton.classList = "btn btn-primary";
    saveButton.id = `save-button--${id}`;
    saveButton.textContent = "Save Changes";
    saveButton.addEventListener("click", _eventHandlers.default.handleSaveEdit);
    documentFrag.appendChild(saveButton);
    return documentFrag;
  }

};
var _default = buildHTML;
exports.default = _default;

},{"./apiManager":1,"./eventHandlers":4,"./htmlFactory":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _htmlFactory = _interopRequireDefault(require("./htmlFactory"));

var _buildHTML = _interopRequireDefault(require("./buildHTML"));

var _appendHTML = _interopRequireDefault(require("./appendHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const displayContainer = document.getElementById("display-container");
const eventHandlers = {
  // Function to save a new interest when save button clicked and the POST that interest to API and rebuild DOM
  handleSaveInterest() {
    let place = document.getElementById("dropdown").value;
    let name = document.getElementById("name-input").value;
    let description = document.getElementById("description-input").value;
    let cost = Number(document.getElementById("cost-input").value);
    let review = document.getElementById("review-input").value;
    console.log("1");

    if (name === "" || description === "") {
      console.log("hello");
      return false;
    } else {
      _apiManager.default.postInterest(_htmlFactory.default.createInterestObject(place, name, description, cost, review)).then(() => {
        _htmlFactory.default.clearContainer(displayContainer);

        return _buildHTML.default.buildNewInterestForm().then(_appendHTML.default.appendInterests);
      });
    }
  },

  // Function to load the edit form to make changes to an interest
  handleEditInterest() {
    let interestId = event.target.id.split("--")[1];
    let interestDiv = document.getElementById(`interest-div--${interestId}`);
    interestDiv.textContent = "";

    _apiManager.default.getInterest(interestId).then(interest => {
      return interestDiv.appendChild(_buildHTML.default.buildEditForm(interest.name, interest.description, interest.cost, interest.review, interest.id));
    });
  },

  // Function to PATCH changes to an interest when user clicks the save button and refresh the DOM
  handleSaveEdit() {
    let interestId = event.target.id.split("--")[1];
    let costsChange = document.getElementById("edit-cost").value;

    if (costsChange === "") {
      costsChange = document.getElementById("edit-cost").placeholder;
    }

    let reviewChange = document.getElementById("edit-review").value;

    let changeObj = _htmlFactory.default.createChangeObject(costsChange, reviewChange);

    _htmlFactory.default.clearContainer(displayContainer);

    _apiManager.default.patchInterest(interestId, changeObj).then(() => {
      _buildHTML.default.buildNewInterestForm();

      _appendHTML.default.appendInterests();
    });
  },

  // Function to confirm delete and DELETE an interest when user clicks delete button
  handleDelete() {
    let interestId = event.target.id.split("--")[1];
    let response = confirm("Are you sure you want to delete this interest?");

    if (response) {
      _htmlFactory.default.clearContainer(displayContainer);

      _apiManager.default.deleteInterest(interestId).then(() => {
        _buildHTML.default.buildNewInterestForm();

        _appendHTML.default.appendInterests();
      });
    }
  }

};
var _default = eventHandlers;
exports.default = _default;

},{"./apiManager":1,"./appendHTML":2,"./buildHTML":3,"./htmlFactory":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
    };
  },

  // Factory function to build and return a smaller interest object with only cost and review
  createChangeObject(cost, review) {
    return {
      "cost": cost,
      "review": review
    };
  },

  // Function to clear an element which is passed as an argument
  clearContainer(elementToClear) {
    while (elementToClear.firstChild) {
      elementToClear.removeChild(elementToClear.firstChild);
    }
  }

};
var _default = htmlFactory;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

var _appendHTML = _interopRequireDefault(require("./appendHTML"));

var _buildHTML = _interopRequireDefault(require("./buildHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_buildHTML.default.buildNewInterestForm();

_appendHTML.default.appendInterests();

},{"./appendHTML":2,"./buildHTML":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2FwcGVuZEhUTUwuanMiLCIuLi9zY3JpcHRzL2J1aWxkSFRNTC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRIYW5kbGVycy5qcyIsIi4uL3NjcmlwdHMvaHRtbEZhY3RvcnkuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLEdBQUcsR0FBRztBQUNSO0FBQ0EsRUFBQSxlQUFlLEdBQUc7QUFDZCxXQUFPLEtBQUssQ0FBQywrQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUxPOztBQU1SO0FBQ0EsRUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhO0FBQ3BCLFdBQU8sS0FBSyxDQUFFLG1DQUFrQyxVQUFXLEVBQS9DLENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBVk87O0FBV1I7QUFDQSxFQUFBLFNBQVMsR0FBRztBQUNSLFdBQU8sS0FBSyxDQUFDLDhCQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBZk87O0FBZ0JSO0FBQ0EsRUFBQSxZQUFZLENBQUMsV0FBRCxFQUFjO0FBQ3RCLFdBQU8sS0FBSyxDQUFDLGlDQUFELEVBQW9DO0FBQzVDLE1BQUEsTUFBTSxFQUFFLE1BRG9DO0FBRTVDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGbUM7QUFLNUMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmO0FBTHNDLEtBQXBDLENBQUwsQ0FNSixJQU5JLENBTUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBTlos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QUNILGNBQVEsSUFETDtBQUVILGdCQUFVO0FBRlAsS0FBUDtBQUlILEdBbERlOztBQW1EaEI7QUFDQSxFQUFBLGNBQWMsQ0FBQyxjQUFELEVBQWlCO0FBQzNCLFdBQU8sY0FBYyxDQUFDLFVBQXRCLEVBQWtDO0FBQzlCLE1BQUEsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsY0FBYyxDQUFDLFVBQTFDO0FBQ0g7QUFDSjs7QUF4RGUsQ0FBcEI7ZUEyRGUsVzs7Ozs7O0FDM0RmOztBQUNBOzs7O0FBRUEsbUJBQVUsb0JBQVY7O0FBQ0Esb0JBQVcsZUFBWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwaSA9IHtcclxuICAgIC8vIEZldGNoIGNhbGwgdG8gZ2V0IGFuZCByZXR1cm4gYWxsIGludHJlc3RzXHJcbiAgICBnZXRBbGxJbnRlcmVzdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0cz9fZXhwYW5kPXBsYWNlXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICAvLyBGZXRjaCBjYWxsIHRvIGdldCBhbmQgcmV0dXJuIG9uZSBpbnRyZXN0XHJcbiAgICBnZXRJbnRlcmVzdChpbnRlcmVzdElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzLyR7aW50ZXJlc3RJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgLy8gRmV0Y2ggY2FsbCB0byBnZXQgYW5kIHJldHVybiBhbGwgcGxhY2VzXHJcbiAgICBnZXRQbGFjZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3BsYWNlc1wiKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgLy8gRmV0Y2ggY2FsbCB0byBQT1NUIGludHJlc3RcclxuICAgIHBvc3RJbnRlcmVzdChuZXdJbnRlcmVzdCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdJbnRlcmVzdClcclxuICAgICAgICB9KS50aGVuKHJlc3VsdHMgPT4gcmVzdWx0cy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgLy8gRmV0Y2ggY2FsbCB0byBQQVRDSCBjaGFuZ2VzIGludG8gaW50ZXJlc3RcclxuICAgIHBhdGNoSW50ZXJlc3QoaW50ZXJlc3RJZCwgY2hhbmdlc09iamVjdCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0cy8ke2ludGVyZXN0SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2hhbmdlc09iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIEZldGNoIGNhbGwgdG8gREVMRVRFIGFuIGludGVyZXN0XHJcbiAgICBkZWxldGVJbnRlcmVzdChpbnRlcmVzdElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzLyR7aW50ZXJlc3RJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaSIsImltcG9ydCBidWlsZEhUTUwgZnJvbSBcIi4vYnVpbGRIVE1MXCJcclxuaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcblxyXG5jb25zdCBkaXNwbGF5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWNvbnRhaW5lclwiKTtcclxuXHJcbmNvbnN0IGFwcGVuZEhUTUwgPSB7XHJcbiAgICAvLyBGdW5jdGlvbiB0byBhcHBlbmQgYWxsIGludGVyZXN0cyB0byB0aGUgRE9NXHJcbiAgICBhcHBlbmRJbnRlcmVzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgaW50ZXJlc3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpbnRlcmVzdHNDb250YWluZXIuY2xhc3NMaXN0ID0gXCJjYXJkIHNwbGl0LWRpdlwiO1xyXG4gICAgICAgIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoaW50ZXJlc3RzQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFwaU1hbmFnZXIuZ2V0QWxsSW50ZXJlc3RzKClcclxuICAgICAgICAgICAgLnRoZW4oaW50ZXJlc3RzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyRGl2LmNsYXNzTGlzdCA9IFwiY2FyZC1oZWFkZXJcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGVyRGl2LnRleHRDb250ZW50ID0gXCJQT0lOVFMgT0YgSU5URVJFU1RcIjtcclxuICAgICAgICAgICAgICAgIGludGVyZXN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJEaXYpO1xyXG5cclxuICAgICAgICAgICAgICAgIGludGVyZXN0cy5mb3JFYWNoKGludGVyZXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpbnRlcmVzdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRIVE1MLmJ1aWxkSW50ZXJlc3QoaW50ZXJlc3QubmFtZSwgaW50ZXJlc3QuZGVzY3JpcHRpb24sIE51bWJlcihpbnRlcmVzdC5jb3N0KSwgaW50ZXJlc3QucmV2aWV3LCBpbnRlcmVzdC5wbGFjZS5uYW1lLCBpbnRlcmVzdC5pZCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcHBlbmRIVE1MIiwiaW1wb3J0IGh0bWxGYWN0b3J5IGZyb20gXCIuL2h0bWxGYWN0b3J5XCJcclxuaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBldmVudEhhbmRsZXJzIGZyb20gXCIuL2V2ZW50SGFuZGxlcnNcIlxyXG5cclxuY29uc3QgZGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1jb250YWluZXJcIik7XHJcblxyXG5jb25zdCBidWlsZEhUTUwgPSB7XHJcbiAgICAvLyBGdW5jdGlvbiB0byBidWlsZCBhbiBpbnRlcmVzdCB3aXRoIEhUTUwgYW5kIHJldHVybiBpdCBpbiBhIGRvY3VtZW50IGZyYWdtZW50XHJcbiAgICBidWlsZEludGVyZXN0KG5hbWUsIGRlc2NyaXB0aW9uLCBjb3N0LCByZXZpZXcsIHBsYWNlLCBpZCkge1xyXG4gICAgICAgIGxldCBkb2N1bWVudEZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmlkID0gYGludGVyZXN0LWRpdi0tJHtpZH1gO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5jbGFzc0xpc3QgPSBcImNhcmQtYm9keVwiXHJcbiAgICAgICAgbGV0IGludGVyZXN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICBpbnRlcmVzdE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdE5hbWUpO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdERlc2NyaXB0aW9uKTtcclxuICAgICAgICBsZXQgaW50ZXJlc3RDb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3RDb3N0LnRleHRDb250ZW50ID0gYENvc3Q6ICQke2Nvc3R9YDtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaW50ZXJlc3RDb3N0KTtcclxuICAgICAgICBpZiAocmV2aWV3ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcmVzdFJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgICAgICBpbnRlcmVzdFJldmlldy50ZXh0Q29udGVudCA9IGBSZXZpZXc6ICR7cmV2aWV3fWA7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdFJldmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbnRlcmVzdFBsYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3RQbGFjZS50ZXh0Q29udGVudCA9IGBDaXR5OiAke3BsYWNlfWA7XHJcbiAgICAgICAgaW50ZXJlc3RQbGFjZS5zdHlsZS5mb250U3R5bGUgPSBcIml0YWxpY1wiO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdFBsYWNlKTtcclxuICAgICAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QgPSBcImJ0biBidG4taW5mb1wiXHJcbiAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdCBJbnRlcmVzdFwiO1xyXG4gICAgICAgIGVkaXRCdXR0b24uaWQgPSBgZWRpdC1idXR0b24tLSR7aWR9YDtcclxuICAgICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXJzLmhhbmRsZUVkaXRJbnRlcmVzdCk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QgPSBcImJ0biBidG4tZGFuZ2VyXCJcclxuICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZSBJbnRlcmVzdFwiO1xyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5pZCA9IGBkZWxldGUtYnV0dG9uLS0ke2lkfWA7XHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXJzLmhhbmRsZURlbGV0ZSk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKSk7XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKGNvbnRhaW5lckRpdik7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50RnJhZztcclxuICAgIH0sXHJcbiAgICAvLyBGdW5jdGlvbiB0byBidWlsZCB0aGUgZm9ybSBmb3IgYWRkaW5nIGEgbmV3IGludGVyZXN0XHJcbiAgICBidWlsZE5ld0ludGVyZXN0Rm9ybSgpIHtcclxuICAgICAgICBsZXQgZm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgZm9ybURpdi5jbGFzc0xpc3QgPSBcImNhcmQgc3BsaXQtZGl2XCI7XHJcbiAgICAgICAgZm9ybURpdi5pZCA9IFwibmV3LWludGVyZXN0LWZvcm1cIjtcclxuICAgICAgICBsZXQgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGhlYWRlckRpdi5jbGFzc0xpc3QgPSBcImNhcmQtaGVhZGVyIGZvcm0taGVhZGVyXCJcclxuICAgICAgICBoZWFkZXJEaXYudGV4dENvbnRlbnQgPSBcIkNSRUFURSBORVcgUE9JTlQgT0YgSU5URVJFU1RcIlxyXG4gICAgICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoaGVhZGVyRGl2KTtcclxuICAgICAgICBsZXQgYm9keURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBib2R5RGl2LmNsYXNzTGlzdCA9IFwiY2FyZC1ib2R5IGZvcm0tYm9keVwiO1xyXG4gICAgICAgIGxldCBuZXdJbnRlcmVzdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcclxuICAgICAgICBuZXdJbnRlcmVzdEZvcm0uYXBwZW5kQ2hpbGQoaHRtbEZhY3RvcnkuYnVpbGRSZXF1aXJlZEZpZWxkc2V0KFwiTmFtZTpcIiwgXCJQbGVhc2UgZW50ZXIgbmFtZVwiLCBcIm5hbWUtaW5wdXRcIikpO1xyXG4gICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChodG1sRmFjdG9yeS5idWlsZFJlcXVpcmVkRmllbGRzZXQoXCJEZXNjcmlwdGlvbjpcIiwgXCJQbGVhc2UgZW50ZXIgZGVzY3JpcHRpb25cIiwgXCJkZXNjcmlwdGlvbi1pbnB1dFwiKSk7XHJcbiAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGh0bWxGYWN0b3J5LmJ1aWxkRmllbGRzZXQoXCJDb3N0OlwiLCBcIlBsZWFzZSBlbnRlciBjb3N0XCIsIFwiY29zdC1pbnB1dFwiKSk7XHJcbiAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGh0bWxGYWN0b3J5LmJ1aWxkRmllbGRzZXQoXCJSZXZpZXc6XCIsIFwiUGxlYXNlIGVudGVyIHlvdXIgcmV2aWV3XCIsIFwicmV2aWV3LWlucHV0XCIpKTtcclxuICAgICAgICBsZXQgZHJvcGRvd25GaWVsZHNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcclxuICAgICAgICBsZXQgZHJvcGRvd25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgICAgICBkcm9wZG93bkxhYmVsLnRleHRDb250ZW50ID0gXCJDaG9vc2UgbG9jYXRpb25cIjtcclxuICAgICAgICBkcm9wZG93bkZpZWxkc2V0LmFwcGVuZENoaWxkKGRyb3Bkb3duTGFiZWwpO1xyXG4gICAgICAgIGxldCBkcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICAgICAgZHJvcGRvd24uaWQgPSBcImRyb3Bkb3duXCI7XHJcbiAgICAgICAgZHJvcGRvd24ubmFtZSA9IFwibG9jYXRpb25cIjtcclxuICAgICAgICBhcGlNYW5hZ2VyLmdldFBsYWNlcygpXHJcbiAgICAgICAgICAgIC50aGVuKHBsYWNlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZXMuZm9yRWFjaChwbGFjZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyb3Bkb3duLmFwcGVuZENoaWxkKGh0bWxGYWN0b3J5LmJ1aWxkT3B0aW9uKHBsYWNlLm5hbWUsIHBsYWNlLmlkKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duRmllbGRzZXQuYXBwZW5kQ2hpbGQoZHJvcGRvd24pO1xyXG4gICAgICAgICAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGRyb3Bkb3duRmllbGRzZXQpO1xyXG4gICAgICAgICAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdCA9IFwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmUgUG9pbnQgT2YgSW50ZXJlc3RcIjtcclxuICAgICAgICAgICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50SGFuZGxlcnMuaGFuZGxlU2F2ZUludGVyZXN0KTtcclxuICAgICAgICAgICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgIGJvZHlEaXYuYXBwZW5kQ2hpbGQobmV3SW50ZXJlc3RGb3JtKVxyXG4gICAgICAgICAgICAgICAgZm9ybURpdi5hcHBlbmRDaGlsZChib2R5RGl2KTtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybURpdik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW50ZXJlc3RGb3JtO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGJ1aWxkIHRoZSBmb3JtIGNvbXBvbmVudCB0byBlZGl0IGFuIGludGVyZXN0IGFmdGVyIGVkaXQgYnV0dG9uIGhhcyBiZWVuIGNsaWNrZWRcclxuICAgIGJ1aWxkRWRpdEZvcm0obmFtZSwgZGVzY3JpcHRpb24sIGNvc3QsIHJldmlldywgaWQpIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgICAgaW50ZXJlc3ROYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoaW50ZXJlc3ROYW1lKTtcclxuICAgICAgICBsZXQgaW50ZXJlc3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGludGVyZXN0RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoaW50ZXJlc3REZXNjcmlwdGlvbik7XHJcbiAgICAgICAgbGV0IGNvc3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgICAgICBjb3N0TGFiZWwudGV4dENvbnRlbnQgPSBcIkNvc3Q6XCI7XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKGNvc3RMYWJlbCk7XHJcbiAgICAgICAgbGV0IGNvc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBjb3N0SW5wdXQuaWQgPSBcImVkaXQtY29zdFwiO1xyXG4gICAgICAgIGlmIChjb3N0ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvc3RJbnB1dC5wbGFjZWhvbGRlciA9IGNvc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29zdElucHV0LnBsYWNlaG9sZGVyID0gXCJQbGVhc2UgZW50ZXIgY29zdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoY29zdElucHV0KTtcclxuICAgICAgICBsZXQgcmV2aWV3TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICAgICAgcmV2aWV3TGFiZWwudGV4dENvbnRlbnQgPSBcIlJldmlldzpcIjtcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQocmV2aWV3TGFiZWwpO1xyXG4gICAgICAgIGxldCByZXZpZXdJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICByZXZpZXdJbnB1dC5pZCA9IFwiZWRpdC1yZXZpZXdcIjtcclxuICAgICAgICBpZiAocmV2aWV3ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldmlld0lucHV0LnBsYWNlaG9sZGVyID0gcmV2aWV3O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldmlld0lucHV0LnBsYWNlaG9sZGVyID0gXCJQbGVhc2UgZW50ZXIgcmV2aWV3XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChyZXZpZXdJbnB1dCk7XHJcbiAgICAgICAgbGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0ID0gXCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgIHNhdmVCdXR0b24uaWQgPSBgc2F2ZS1idXR0b24tLSR7aWR9YDtcclxuICAgICAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlIENoYW5nZXNcIjtcclxuICAgICAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXJzLmhhbmRsZVNhdmVFZGl0KVxyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnRGcmFnO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEhUTUwiLCJpbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGh0bWxGYWN0b3J5IGZyb20gXCIuL2h0bWxGYWN0b3J5XCJcclxuaW1wb3J0IGJ1aWxkSFRNTCBmcm9tIFwiLi9idWlsZEhUTUxcIlxyXG5pbXBvcnQgYXBwZW5kSFRNTCBmcm9tIFwiLi9hcHBlbmRIVE1MXCJcclxuXHJcbmNvbnN0IGRpc3BsYXlDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktY29udGFpbmVyXCIpO1xyXG5cclxuY29uc3QgZXZlbnRIYW5kbGVycyA9IHtcclxuICAgIC8vIEZ1bmN0aW9uIHRvIHNhdmUgYSBuZXcgaW50ZXJlc3Qgd2hlbiBzYXZlIGJ1dHRvbiBjbGlja2VkIGFuZCB0aGUgUE9TVCB0aGF0IGludGVyZXN0IHRvIEFQSSBhbmQgcmVidWlsZCBET01cclxuICAgIGhhbmRsZVNhdmVJbnRlcmVzdCgpIHtcclxuICAgICAgICBsZXQgcGxhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3Bkb3duXCIpLnZhbHVlO1xyXG4gICAgICAgIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lLWlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb24taW5wdXRcIikudmFsdWU7XHJcbiAgICAgICAgbGV0IGNvc3QgPSBOdW1iZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3N0LWlucHV0XCIpLnZhbHVlKTtcclxuICAgICAgICBsZXQgcmV2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXZpZXctaW5wdXRcIikudmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIxXCIpXHJcbiAgICAgICAgaWYgKG5hbWUgPT09IFwiXCIgfHwgZGVzY3JpcHRpb24gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWxsb1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFwaU1hbmFnZXIucG9zdEludGVyZXN0KGh0bWxGYWN0b3J5LmNyZWF0ZUludGVyZXN0T2JqZWN0KHBsYWNlLCBuYW1lLCBkZXNjcmlwdGlvbiwgY29zdCwgcmV2aWV3KSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sRmFjdG9yeS5jbGVhckNvbnRhaW5lcihkaXNwbGF5Q29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVpbGRIVE1MLmJ1aWxkTmV3SW50ZXJlc3RGb3JtKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oYXBwZW5kSFRNTC5hcHBlbmRJbnRlcmVzdHMpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gRnVuY3Rpb24gdG8gbG9hZCB0aGUgZWRpdCBmb3JtIHRvIG1ha2UgY2hhbmdlcyB0byBhbiBpbnRlcmVzdFxyXG4gICAgaGFuZGxlRWRpdEludGVyZXN0KCkge1xyXG4gICAgICAgIGxldCBpbnRlcmVzdElkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XHJcbiAgICAgICAgbGV0IGludGVyZXN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludGVyZXN0LWRpdi0tJHtpbnRlcmVzdElkfWApO1xyXG4gICAgICAgIGludGVyZXN0RGl2LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICBhcGlNYW5hZ2VyLmdldEludGVyZXN0KGludGVyZXN0SWQpXHJcbiAgICAgICAgICAgIC50aGVuKGludGVyZXN0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcmVzdERpdi5hcHBlbmRDaGlsZChidWlsZEhUTUwuYnVpbGRFZGl0Rm9ybShpbnRlcmVzdC5uYW1lLCBpbnRlcmVzdC5kZXNjcmlwdGlvbiwgaW50ZXJlc3QuY29zdCwgaW50ZXJlc3QucmV2aWV3LCBpbnRlcmVzdC5pZCkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIEZ1bmN0aW9uIHRvIFBBVENIIGNoYW5nZXMgdG8gYW4gaW50ZXJlc3Qgd2hlbiB1c2VyIGNsaWNrcyB0aGUgc2F2ZSBidXR0b24gYW5kIHJlZnJlc2ggdGhlIERPTVxyXG4gICAgaGFuZGxlU2F2ZUVkaXQoKSB7XHJcbiAgICAgICAgbGV0IGludGVyZXN0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcclxuICAgICAgICBsZXQgY29zdHNDaGFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtY29zdFwiKS52YWx1ZTtcclxuICAgICAgICBpZiAoY29zdHNDaGFuZ2UgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29zdHNDaGFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtY29zdFwiKS5wbGFjZWhvbGRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldmlld0NoYW5nZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1yZXZpZXdcIikudmFsdWU7XHJcbiAgICAgICAgbGV0IGNoYW5nZU9iaiA9IGh0bWxGYWN0b3J5LmNyZWF0ZUNoYW5nZU9iamVjdChjb3N0c0NoYW5nZSwgcmV2aWV3Q2hhbmdlKVxyXG4gICAgICAgIGh0bWxGYWN0b3J5LmNsZWFyQ29udGFpbmVyKGRpc3BsYXlDb250YWluZXIpO1xyXG4gICAgICAgIGFwaU1hbmFnZXIucGF0Y2hJbnRlcmVzdChpbnRlcmVzdElkLCBjaGFuZ2VPYmopXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJ1aWxkSFRNTC5idWlsZE5ld0ludGVyZXN0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgYXBwZW5kSFRNTC5hcHBlbmRJbnRlcmVzdHMoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyBGdW5jdGlvbiB0byBjb25maXJtIGRlbGV0ZSBhbmQgREVMRVRFIGFuIGludGVyZXN0IHdoZW4gdXNlciBjbGlja3MgZGVsZXRlIGJ1dHRvblxyXG4gICAgaGFuZGxlRGVsZXRlKCkge1xyXG4gICAgICAgIGxldCBpbnRlcmVzdElkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpbnRlcmVzdD9cIilcclxuICAgICAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaHRtbEZhY3RvcnkuY2xlYXJDb250YWluZXIoZGlzcGxheUNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGFwaU1hbmFnZXIuZGVsZXRlSW50ZXJlc3QoaW50ZXJlc3RJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZEhUTUwuYnVpbGROZXdJbnRlcmVzdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICBhcHBlbmRIVE1MLmFwcGVuZEludGVyZXN0cygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEhhbmRsZXJzIiwiY29uc3QgaHRtbEZhY3RvcnkgPSB7XHJcbiAgICAvLyBGdW5jdGlvbiB0byBidWlsZCBhbmQgcmV0dXJuIGEgZmllbGRzZXQgd2l0aCBsYWJlbCBhbmQgaW5wdXQgdGhhdCBpcyByZXF1aXJlZFxyXG4gICAgYnVpbGRSZXF1aXJlZEZpZWxkc2V0KGxhYmVsVGV4dCwgcGxhY2Vob2xkZXJUZXh0LCBpbnB1dElkKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkc2V0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XHJcbiAgICAgICAgbGV0IGxhYmVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcclxuICAgICAgICBmaWVsZHNldEVsLmFwcGVuZENoaWxkKGxhYmVsRWwpO1xyXG4gICAgICAgIGxldCBpbnB1dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGlucHV0RWwuaWQgPSBpbnB1dElkO1xyXG4gICAgICAgIGlucHV0RWwuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJcIik7XHJcbiAgICAgICAgaW5wdXRFbC5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgaW5wdXRFbC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyVGV4dDtcclxuICAgICAgICBmaWVsZHNldEVsLmFwcGVuZENoaWxkKGlucHV0RWwpO1xyXG4gICAgICAgIHJldHVybiBmaWVsZHNldEVsO1xyXG4gICAgfSxcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGJ1aWxkIGFuZCByZXR1cm4gYSBmaWVsZHNldCB3aXRoIGxhYmVsIGFuZCBpbnB1dFxyXG4gICAgYnVpbGRGaWVsZHNldChsYWJlbFRleHQsIHBsYWNlaG9sZGVyVGV4dCwgaW5wdXRJZCkge1xyXG4gICAgICAgIGxldCBmaWVsZHNldEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xyXG4gICAgICAgIGxldCBsYWJlbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsRWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XHJcbiAgICAgICAgZmllbGRzZXRFbC5hcHBlbmRDaGlsZChsYWJlbEVsKTtcclxuICAgICAgICBsZXQgaW5wdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBpbnB1dEVsLmlkID0gaW5wdXRJZDtcclxuICAgICAgICBpbnB1dEVsLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXJUZXh0O1xyXG4gICAgICAgIGZpZWxkc2V0RWwuYXBwZW5kQ2hpbGQoaW5wdXRFbCk7XHJcbiAgICAgICAgcmV0dXJuIGZpZWxkc2V0RWw7XHJcbiAgICB9LFxyXG4gICAgLy8gRnVuY3Rpb24gdG8gYnVpbGQgYW5kIHJldHVybiBhbiBvcHRpb25cclxuICAgIGJ1aWxkT3B0aW9uKG5hbWUsIGlkKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gaWQ7XHJcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfSxcclxuICAgIC8vIEZhY3RvcnkgZnVuY3Rpb24gdG8gYnVpbGQgYW4gaW50ZXJlc3Qgb2JqZWN0XHJcbiAgICBjcmVhdGVJbnRlcmVzdE9iamVjdChwbGFjZUlkLCBuYW1lLCBkZXNjcmlwdGlvbiwgY29zdCwgcmV2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJwbGFjZUlkXCI6IHBsYWNlSWQsXHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBcImNvc3RcIjogY29zdCxcclxuICAgICAgICAgICAgXCJyZXZpZXdcIjogcmV2aWV3XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIEZhY3RvcnkgZnVuY3Rpb24gdG8gYnVpbGQgYW5kIHJldHVybiBhIHNtYWxsZXIgaW50ZXJlc3Qgb2JqZWN0IHdpdGggb25seSBjb3N0IGFuZCByZXZpZXdcclxuICAgIGNyZWF0ZUNoYW5nZU9iamVjdChjb3N0LCByZXZpZXcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImNvc3RcIjogY29zdCxcclxuICAgICAgICAgICAgXCJyZXZpZXdcIjogcmV2aWV3XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGNsZWFyIGFuIGVsZW1lbnQgd2hpY2ggaXMgcGFzc2VkIGFzIGFuIGFyZ3VtZW50XHJcbiAgICBjbGVhckNvbnRhaW5lcihlbGVtZW50VG9DbGVhcikge1xyXG4gICAgICAgIHdoaWxlIChlbGVtZW50VG9DbGVhci5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUb0NsZWFyLnJlbW92ZUNoaWxkKGVsZW1lbnRUb0NsZWFyLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaHRtbEZhY3RvcnkiLCJpbXBvcnQgYXBwZW5kSFRNTCBmcm9tIFwiLi9hcHBlbmRIVE1MXCJcclxuaW1wb3J0IGJ1aWxkSFRNTCBmcm9tIFwiLi9idWlsZEhUTUxcIlxyXG5cclxuYnVpbGRIVE1MLmJ1aWxkTmV3SW50ZXJlc3RGb3JtKCk7XHJcbmFwcGVuZEhUTUwuYXBwZW5kSW50ZXJlc3RzKCk7Il19
