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
      interestReview.textContent = review;
      containerDiv.appendChild(interestReview);
    }

    let interestPlace = document.createElement("p");
    interestPlace.textContent = place;
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
    headerDiv.classList = "card-header";
    headerDiv.textContent = "CREATE NEW POINT OF INTEREST";
    formDiv.appendChild(headerDiv);
    let bodyDiv = document.createElement("div");
    bodyDiv.classList = "card-body";
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
    };
  },

  createChangeObject(cost, review) {
    return {
      "cost": cost,
      "review": review
    };
  },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2FwcGVuZEhUTUwuanMiLCIuLi9zY3JpcHRzL2J1aWxkSFRNTC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRIYW5kbGVycy5qcyIsIi4uL3NjcmlwdHMvaHRtbEZhY3RvcnkuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLEdBQUcsR0FBRztBQUNSO0FBQ0EsRUFBQSxlQUFlLEdBQUc7QUFDZCxXQUFPLEtBQUssQ0FBQywrQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUxPOztBQU1SO0FBQ0EsRUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhO0FBQ3BCLFdBQU8sS0FBSyxDQUFFLG1DQUFrQyxVQUFXLEVBQS9DLENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBVk87O0FBV1I7QUFDQSxFQUFBLFNBQVMsR0FBRztBQUNSLFdBQU8sS0FBSyxDQUFDLDhCQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBZk87O0FBZ0JSO0FBQ0EsRUFBQSxZQUFZLENBQUMsV0FBRCxFQUFjO0FBQ3RCLFdBQU8sS0FBSyxDQUFDLGlDQUFELEVBQW9DO0FBQzVDLE1BQUEsTUFBTSxFQUFFLE1BRG9DO0FBRTVDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGbUM7QUFLNUMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmO0FBTHNDLEtBQXBDLENBQUwsQ0FNSixJQU5JLENBTUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBTlos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QUE4Q2hCLEVBQUEsY0FBYyxDQUFDLGNBQUQsRUFBaUI7QUFDM0IsV0FBTyxjQUFjLENBQUMsVUFBdEIsRUFBa0M7QUFDOUIsTUFBQSxjQUFjLENBQUMsV0FBZixDQUEyQixjQUFjLENBQUMsVUFBMUM7QUFDSDtBQUNKOztBQWxEZSxDQUFwQjtlQXFEZSxXOzs7Ozs7QUNyRGY7O0FBQ0E7Ozs7QUFFQSxtQkFBVSxvQkFBVjs7QUFDQSxvQkFBVyxlQUFYIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBpID0ge1xyXG4gICAgLy8gRmV0Y2ggY2FsbCB0byBnZXQgYW5kIHJldHVybiBhbGwgaW50cmVzdHNcclxuICAgIGdldEFsbEludGVyZXN0cygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzP19leHBhbmQ9cGxhY2VcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIC8vIEZldGNoIGNhbGwgdG8gZ2V0IGFuZCByZXR1cm4gb25lIGludHJlc3RcclxuICAgIGdldEludGVyZXN0KGludGVyZXN0SWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHMvJHtpbnRlcmVzdElkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICAvLyBGZXRjaCBjYWxsIHRvIGdldCBhbmQgcmV0dXJuIGFsbCBwbGFjZXNcclxuICAgIGdldFBsYWNlcygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2VzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICAvLyBGZXRjaCBjYWxsIHRvIFBPU1QgaW50cmVzdFxyXG4gICAgcG9zdEludGVyZXN0KG5ld0ludGVyZXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0ludGVyZXN0KVxyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0cyA9PiByZXN1bHRzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICAvLyBGZXRjaCBjYWxsIHRvIFBBVENIIGNoYW5nZXMgaW50byBpbnRlcmVzdFxyXG4gICAgcGF0Y2hJbnRlcmVzdChpbnRlcmVzdElkLCBjaGFuZ2VzT2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzLyR7aW50ZXJlc3RJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjaGFuZ2VzT2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8gRmV0Y2ggY2FsbCB0byBERUxFVEUgYW4gaW50ZXJlc3RcclxuICAgIGRlbGV0ZUludGVyZXN0KGludGVyZXN0SWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHMvJHtpbnRlcmVzdElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpIiwiaW1wb3J0IGJ1aWxkSFRNTCBmcm9tIFwiLi9idWlsZEhUTUxcIlxyXG5pbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuXHJcbmNvbnN0IGRpc3BsYXlDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktY29udGFpbmVyXCIpO1xyXG5cclxuY29uc3QgYXBwZW5kSFRNTCA9IHtcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGFwcGVuZCBhbGwgaW50ZXJlc3RzIHRvIHRoZSBET01cclxuICAgIGFwcGVuZEludGVyZXN0cygpIHtcclxuICAgICAgICBjb25zdCBpbnRlcmVzdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGludGVyZXN0c0NvbnRhaW5lci5jbGFzc0xpc3QgPSBcImNhcmQgc3BsaXQtZGl2XCI7XHJcbiAgICAgICAgZGlzcGxheUNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnRlcmVzdHNDb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYXBpTWFuYWdlci5nZXRBbGxJbnRlcmVzdHMoKVxyXG4gICAgICAgICAgICAudGhlbihpbnRlcmVzdHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJEaXYuY2xhc3NMaXN0ID0gXCJjYXJkLWhlYWRlclwiXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJEaXYudGV4dENvbnRlbnQgPSBcIlBPSU5UUyBPRiBJTlRFUkVTVFwiO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJlc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlckRpdik7XHJcblxyXG4gICAgICAgICAgICAgICAgaW50ZXJlc3RzLmZvckVhY2goaW50ZXJlc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVyZXN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZEhUTUwuYnVpbGRJbnRlcmVzdChpbnRlcmVzdC5uYW1lLCBpbnRlcmVzdC5kZXNjcmlwdGlvbiwgTnVtYmVyKGludGVyZXN0LmNvc3QpLCBpbnRlcmVzdC5yZXZpZXcsIGludGVyZXN0LnBsYWNlLm5hbWUsIGludGVyZXN0LmlkKSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwcGVuZEhUTUwiLCJpbXBvcnQgaHRtbEZhY3RvcnkgZnJvbSBcIi4vaHRtbEZhY3RvcnlcIlxyXG5pbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRIYW5kbGVyc1wiXHJcblxyXG5jb25zdCBkaXNwbGF5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWNvbnRhaW5lclwiKTtcclxuXHJcbmNvbnN0IGJ1aWxkSFRNTCA9IHtcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGJ1aWxkIGFuIGludGVyZXN0IHdpdGggSFRNTCBhbmQgcmV0dXJuIGl0IGluIGEgZG9jdW1lbnQgZnJhZ21lbnRcclxuICAgIGJ1aWxkSW50ZXJlc3QobmFtZSwgZGVzY3JpcHRpb24sIGNvc3QsIHJldmlldywgcGxhY2UsIGlkKSB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50RnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICBsZXQgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXJEaXYuaWQgPSBgaW50ZXJlc3QtZGl2LS0ke2lkfWA7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmNsYXNzTGlzdCA9IFwiY2FyZC1ib2R5XCJcclxuICAgICAgICBsZXQgaW50ZXJlc3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICAgIGludGVyZXN0TmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGludGVyZXN0TmFtZSk7XHJcbiAgICAgICAgbGV0IGludGVyZXN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBpbnRlcmVzdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGludGVyZXN0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdENvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBpbnRlcmVzdENvc3QudGV4dENvbnRlbnQgPSBgQ29zdDogJCR7Y29zdH1gO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdENvc3QpO1xyXG4gICAgICAgIGlmIChyZXZpZXcgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IGludGVyZXN0UmV2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgICAgIGludGVyZXN0UmV2aWV3LnRleHRDb250ZW50ID0gcmV2aWV3O1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaW50ZXJlc3RSZXZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW50ZXJlc3RQbGFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGludGVyZXN0UGxhY2UudGV4dENvbnRlbnQgPSBwbGFjZTtcclxuICAgICAgICBpbnRlcmVzdFBsYWNlLnN0eWxlLmZvbnRTdHlsZSA9IFwiaXRhbGljXCI7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGludGVyZXN0UGxhY2UpO1xyXG4gICAgICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdCA9IFwiYnRuIGJ0bi1pbmZvXCJcclxuICAgICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0IEludGVyZXN0XCI7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0tJHtpZH1gO1xyXG4gICAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50SGFuZGxlcnMuaGFuZGxlRWRpdEludGVyZXN0KTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcbiAgICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdCA9IFwiYnRuIGJ0bi1kYW5nZXJcIlxyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlIEludGVyZXN0XCI7XHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLmlkID0gYGRlbGV0ZS1idXR0b24tLSR7aWR9YDtcclxuICAgICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50SGFuZGxlcnMuaGFuZGxlRGVsZXRlKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTtcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoY29udGFpbmVyRGl2KTtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnRGcmFnO1xyXG4gICAgfSxcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGJ1aWxkIHRoZSBmb3JtIGZvciBhZGRpbmcgYSBuZXcgaW50ZXJlc3RcclxuICAgIGJ1aWxkTmV3SW50ZXJlc3RGb3JtKCkge1xyXG4gICAgICAgIGxldCBmb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBmb3JtRGl2LmNsYXNzTGlzdCA9IFwiY2FyZCBzcGxpdC1kaXZcIjtcclxuICAgICAgICBmb3JtRGl2LmlkID0gXCJuZXctaW50ZXJlc3QtZm9ybVwiO1xyXG4gICAgICAgIGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgaGVhZGVyRGl2LmNsYXNzTGlzdCA9IFwiY2FyZC1oZWFkZXJcIlxyXG4gICAgICAgIGhlYWRlckRpdi50ZXh0Q29udGVudCA9IFwiQ1JFQVRFIE5FVyBQT0lOVCBPRiBJTlRFUkVTVFwiXHJcbiAgICAgICAgZm9ybURpdi5hcHBlbmRDaGlsZChoZWFkZXJEaXYpO1xyXG4gICAgICAgIGxldCBib2R5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGJvZHlEaXYuY2xhc3NMaXN0ID0gXCJjYXJkLWJvZHlcIjtcclxuICAgICAgICBsZXQgbmV3SW50ZXJlc3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XHJcbiAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGh0bWxGYWN0b3J5LmJ1aWxkUmVxdWlyZWRGaWVsZHNldChcIk5hbWU6XCIsIFwiUGxlYXNlIGVudGVyIG5hbWVcIiwgXCJuYW1lLWlucHV0XCIpKTtcclxuICAgICAgICBuZXdJbnRlcmVzdEZvcm0uYXBwZW5kQ2hpbGQoaHRtbEZhY3RvcnkuYnVpbGRSZXF1aXJlZEZpZWxkc2V0KFwiRGVzY3JpcHRpb246XCIsIFwiUGxlYXNlIGVudGVyIGRlc2NyaXB0aW9uXCIsIFwiZGVzY3JpcHRpb24taW5wdXRcIikpO1xyXG4gICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChodG1sRmFjdG9yeS5idWlsZEZpZWxkc2V0KFwiQ29zdDpcIiwgXCJQbGVhc2UgZW50ZXIgY29zdFwiLCBcImNvc3QtaW5wdXRcIikpO1xyXG4gICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChodG1sRmFjdG9yeS5idWlsZEZpZWxkc2V0KFwiUmV2aWV3OlwiLCBcIlBsZWFzZSBlbnRlciB5b3VyIHJldmlld1wiLCBcInJldmlldy1pbnB1dFwiKSk7XHJcbiAgICAgICAgbGV0IGRyb3Bkb3duRmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XHJcbiAgICAgICAgbGV0IGRyb3Bkb3duTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICAgICAgZHJvcGRvd25MYWJlbC50ZXh0Q29udGVudCA9IFwiQ2hvb3NlIGxvY2F0aW9uXCI7XHJcbiAgICAgICAgZHJvcGRvd25GaWVsZHNldC5hcHBlbmRDaGlsZChkcm9wZG93bkxhYmVsKTtcclxuICAgICAgICBsZXQgZHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gICAgICAgIGRyb3Bkb3duLmlkID0gXCJkcm9wZG93blwiO1xyXG4gICAgICAgIGRyb3Bkb3duLm5hbWUgPSBcImxvY2F0aW9uXCI7XHJcbiAgICAgICAgYXBpTWFuYWdlci5nZXRQbGFjZXMoKVxyXG4gICAgICAgICAgICAudGhlbihwbGFjZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGxhY2VzLmZvckVhY2gocGxhY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkcm9wZG93bi5hcHBlbmRDaGlsZChodG1sRmFjdG9yeS5idWlsZE9wdGlvbihwbGFjZS5uYW1lLCBwbGFjZS5pZCkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bkZpZWxkc2V0LmFwcGVuZENoaWxkKGRyb3Bkb3duKTtcclxuICAgICAgICAgICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChkcm9wZG93bkZpZWxkc2V0KTtcclxuICAgICAgICAgICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QgPSBcImJ0biBidG4tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlIFBvaW50IE9mIEludGVyZXN0XCI7XHJcbiAgICAgICAgICAgICAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXJzLmhhbmRsZVNhdmVJbnRlcmVzdCk7XHJcbiAgICAgICAgICAgICAgICBuZXdJbnRlcmVzdEZvcm0uYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICBib2R5RGl2LmFwcGVuZENoaWxkKG5ld0ludGVyZXN0Rm9ybSlcclxuICAgICAgICAgICAgICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoYm9keURpdik7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1EaXYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0ludGVyZXN0Rm9ybTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyBGdW5jdGlvbiB0byBidWlsZCB0aGUgZm9ybSBjb21wb25lbnQgdG8gZWRpdCBhbiBpbnRlcmVzdCBhZnRlciBlZGl0IGJ1dHRvbiBoYXMgYmVlbiBjbGlja2VkXHJcbiAgICBidWlsZEVkaXRGb3JtKG5hbWUsIGRlc2NyaXB0aW9uLCBjb3N0LCByZXZpZXcsIGlkKSB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50RnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICBsZXQgaW50ZXJlc3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICAgIGludGVyZXN0TmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKGludGVyZXN0TmFtZSk7XHJcbiAgICAgICAgbGV0IGludGVyZXN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBpbnRlcmVzdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKGludGVyZXN0RGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGxldCBjb3N0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICAgICAgY29zdExhYmVsLnRleHRDb250ZW50ID0gXCJDb3N0OlwiO1xyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChjb3N0TGFiZWwpO1xyXG4gICAgICAgIGxldCBjb3N0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgY29zdElucHV0LmlkID0gXCJlZGl0LWNvc3RcIjtcclxuICAgICAgICBpZiAoY29zdCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb3N0SW5wdXQucGxhY2Vob2xkZXIgPSBjb3N0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvc3RJbnB1dC5wbGFjZWhvbGRlciA9IFwiUGxlYXNlIGVudGVyIGNvc3RcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKGNvc3RJbnB1dCk7XHJcbiAgICAgICAgbGV0IHJldmlld0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgICAgIHJldmlld0xhYmVsLnRleHRDb250ZW50ID0gXCJSZXZpZXc6XCI7XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKHJldmlld0xhYmVsKTtcclxuICAgICAgICBsZXQgcmV2aWV3SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgcmV2aWV3SW5wdXQuaWQgPSBcImVkaXQtcmV2aWV3XCI7XHJcbiAgICAgICAgaWYgKHJldmlldyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXZpZXdJbnB1dC5wbGFjZWhvbGRlciA9IHJldmlldztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXZpZXdJbnB1dC5wbGFjZWhvbGRlciA9IFwiUGxlYXNlIGVudGVyIHJldmlld1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQocmV2aWV3SW5wdXQpO1xyXG4gICAgICAgIGxldCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBzYXZlQnV0dG9uLmNsYXNzTGlzdCA9IFwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICBzYXZlQnV0dG9uLmlkID0gYHNhdmUtYnV0dG9uLS0ke2lkfWA7XHJcbiAgICAgICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZSBDaGFuZ2VzXCI7XHJcbiAgICAgICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnRIYW5kbGVycy5oYW5kbGVTYXZlRWRpdClcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoc2F2ZUJ1dHRvbik7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50RnJhZztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRIVE1MIiwiaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBodG1sRmFjdG9yeSBmcm9tIFwiLi9odG1sRmFjdG9yeVwiXHJcbmltcG9ydCBidWlsZEhUTUwgZnJvbSBcIi4vYnVpbGRIVE1MXCJcclxuaW1wb3J0IGFwcGVuZEhUTUwgZnJvbSBcIi4vYXBwZW5kSFRNTFwiXHJcblxyXG5jb25zdCBkaXNwbGF5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWNvbnRhaW5lclwiKTtcclxuXHJcbmNvbnN0IGV2ZW50SGFuZGxlcnMgPSB7XHJcbiAgICAvLyBGdW5jdGlvbiB0byBzYXZlIGEgbmV3IGludGVyZXN0IHdoZW4gc2F2ZSBidXR0b24gY2xpY2tlZCBhbmQgdGhlIFBPU1QgdGhhdCBpbnRlcmVzdCB0byBBUEkgYW5kIHJlYnVpbGQgRE9NXHJcbiAgICBoYW5kbGVTYXZlSW50ZXJlc3QoKSB7XHJcbiAgICAgICAgbGV0IHBsYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wZG93blwiKS52YWx1ZTtcclxuICAgICAgICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS1pbnB1dFwiKS52YWx1ZTtcclxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgIGxldCBjb3N0ID0gTnVtYmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29zdC1pbnB1dFwiKS52YWx1ZSk7XHJcbiAgICAgICAgbGV0IHJldmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmV2aWV3LWlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiMVwiKVxyXG4gICAgICAgIGlmIChuYW1lID09PSBcIlwiIHx8IGRlc2NyaXB0aW9uID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcGlNYW5hZ2VyLnBvc3RJbnRlcmVzdChodG1sRmFjdG9yeS5jcmVhdGVJbnRlcmVzdE9iamVjdChwbGFjZSwgbmFtZSwgZGVzY3JpcHRpb24sIGNvc3QsIHJldmlldykpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbEZhY3RvcnkuY2xlYXJDb250YWluZXIoZGlzcGxheUNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkSFRNTC5idWlsZE5ld0ludGVyZXN0Rm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGFwcGVuZEhUTUwuYXBwZW5kSW50ZXJlc3RzKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIEZ1bmN0aW9uIHRvIGxvYWQgdGhlIGVkaXQgZm9ybSB0byBtYWtlIGNoYW5nZXMgdG8gYW4gaW50ZXJlc3RcclxuICAgIGhhbmRsZUVkaXRJbnRlcmVzdCgpIHtcclxuICAgICAgICBsZXQgaW50ZXJlc3RJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpbnRlcmVzdC1kaXYtLSR7aW50ZXJlc3RJZH1gKTtcclxuICAgICAgICBpbnRlcmVzdERpdi50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgYXBpTWFuYWdlci5nZXRJbnRlcmVzdChpbnRlcmVzdElkKVxyXG4gICAgICAgICAgICAudGhlbihpbnRlcmVzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJlc3REaXYuYXBwZW5kQ2hpbGQoYnVpbGRIVE1MLmJ1aWxkRWRpdEZvcm0oaW50ZXJlc3QubmFtZSwgaW50ZXJlc3QuZGVzY3JpcHRpb24sIGludGVyZXN0LmNvc3QsIGludGVyZXN0LnJldmlldywgaW50ZXJlc3QuaWQpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyBGdW5jdGlvbiB0byBQQVRDSCBjaGFuZ2VzIHRvIGFuIGludGVyZXN0IHdoZW4gdXNlciBjbGlja3MgdGhlIHNhdmUgYnV0dG9uIGFuZCByZWZyZXNoIHRoZSBET01cclxuICAgIGhhbmRsZVNhdmVFZGl0KCkge1xyXG4gICAgICAgIGxldCBpbnRlcmVzdElkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XHJcbiAgICAgICAgbGV0IGNvc3RzQ2hhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LWNvc3RcIikudmFsdWU7XHJcbiAgICAgICAgaWYgKGNvc3RzQ2hhbmdlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvc3RzQ2hhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LWNvc3RcIikucGxhY2Vob2xkZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXZpZXdDaGFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtcmV2aWV3XCIpLnZhbHVlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VPYmogPSBodG1sRmFjdG9yeS5jcmVhdGVDaGFuZ2VPYmplY3QoY29zdHNDaGFuZ2UsIHJldmlld0NoYW5nZSlcclxuICAgICAgICBodG1sRmFjdG9yeS5jbGVhckNvbnRhaW5lcihkaXNwbGF5Q29udGFpbmVyKTtcclxuICAgICAgICBhcGlNYW5hZ2VyLnBhdGNoSW50ZXJlc3QoaW50ZXJlc3RJZCwgY2hhbmdlT2JqKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidWlsZEhUTUwuYnVpbGROZXdJbnRlcmVzdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgIGFwcGVuZEhUTUwuYXBwZW5kSW50ZXJlc3RzKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy8gRnVuY3Rpb24gdG8gY29uZmlybSBkZWxldGUgYW5kIERFTEVURSBhbiBpbnRlcmVzdCB3aGVuIHVzZXIgY2xpY2tzIGRlbGV0ZSBidXR0b25cclxuICAgIGhhbmRsZURlbGV0ZSgpIHtcclxuICAgICAgICBsZXQgaW50ZXJlc3RJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdO1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaW50ZXJlc3Q/XCIpXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGh0bWxGYWN0b3J5LmNsZWFyQ29udGFpbmVyKGRpc3BsYXlDb250YWluZXIpO1xyXG4gICAgICAgICAgICBhcGlNYW5hZ2VyLmRlbGV0ZUludGVyZXN0KGludGVyZXN0SWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRIVE1MLmJ1aWxkTmV3SW50ZXJlc3RGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kSFRNTC5hcHBlbmRJbnRlcmVzdHMoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRIYW5kbGVycyIsImNvbnN0IGh0bWxGYWN0b3J5ID0ge1xyXG4gICAgYnVpbGRSZXF1aXJlZEZpZWxkc2V0KGxhYmVsVGV4dCwgcGxhY2Vob2xkZXJUZXh0LCBpbnB1dElkKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkc2V0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XHJcbiAgICAgICAgbGV0IGxhYmVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcclxuICAgICAgICBmaWVsZHNldEVsLmFwcGVuZENoaWxkKGxhYmVsRWwpO1xyXG4gICAgICAgIGxldCBpbnB1dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGlucHV0RWwuaWQgPSBpbnB1dElkO1xyXG4gICAgICAgIGlucHV0RWwuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJcIik7XHJcbiAgICAgICAgaW5wdXRFbC5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgaW5wdXRFbC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyVGV4dDtcclxuICAgICAgICBmaWVsZHNldEVsLmFwcGVuZENoaWxkKGlucHV0RWwpO1xyXG4gICAgICAgIHJldHVybiBmaWVsZHNldEVsO1xyXG4gICAgfSxcclxuICAgIGJ1aWxkRmllbGRzZXQobGFiZWxUZXh0LCBwbGFjZWhvbGRlclRleHQsIGlucHV0SWQpIHtcclxuICAgICAgICBsZXQgZmllbGRzZXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcclxuICAgICAgICBsZXQgbGFiZWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgICAgICBsYWJlbEVsLnRleHRDb250ZW50ID0gbGFiZWxUZXh0O1xyXG4gICAgICAgIGZpZWxkc2V0RWwuYXBwZW5kQ2hpbGQobGFiZWxFbCk7XHJcbiAgICAgICAgbGV0IGlucHV0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgaW5wdXRFbC5pZCA9IGlucHV0SWQ7XHJcbiAgICAgICAgaW5wdXRFbC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyVGV4dDtcclxuICAgICAgICBmaWVsZHNldEVsLmFwcGVuZENoaWxkKGlucHV0RWwpO1xyXG4gICAgICAgIHJldHVybiBmaWVsZHNldEVsO1xyXG4gICAgfSxcclxuICAgIGJ1aWxkT3B0aW9uKG5hbWUsIGlkKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gaWQ7XHJcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZUludGVyZXN0T2JqZWN0KHBsYWNlSWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBjb3N0LCByZXZpZXcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcInBsYWNlSWRcIjogcGxhY2VJZCxcclxuICAgICAgICAgICAgXCJuYW1lXCI6IG5hbWUsXHJcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIFwiY29zdFwiOiBjb3N0LFxyXG4gICAgICAgICAgICBcInJldmlld1wiOiByZXZpZXdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlQ2hhbmdlT2JqZWN0KGNvc3QsIHJldmlldykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwiY29zdFwiOiBjb3N0LFxyXG4gICAgICAgICAgICBcInJldmlld1wiOiByZXZpZXdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2xlYXJDb250YWluZXIoZWxlbWVudFRvQ2xlYXIpIHtcclxuICAgICAgICB3aGlsZSAoZWxlbWVudFRvQ2xlYXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50VG9DbGVhci5yZW1vdmVDaGlsZChlbGVtZW50VG9DbGVhci5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGh0bWxGYWN0b3J5IiwiaW1wb3J0IGFwcGVuZEhUTUwgZnJvbSBcIi4vYXBwZW5kSFRNTFwiXHJcbmltcG9ydCBidWlsZEhUTUwgZnJvbSBcIi4vYnVpbGRIVE1MXCJcclxuXHJcbmJ1aWxkSFRNTC5idWlsZE5ld0ludGVyZXN0Rm9ybSgpO1xyXG5hcHBlbmRIVE1MLmFwcGVuZEludGVyZXN0cygpOyJdfQ==
