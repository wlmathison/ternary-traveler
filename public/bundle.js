(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const api = {
  getAllInterests() {
    return fetch("http://localhost:8088/interests?_expand=place").then(response => response.json());
  },

  getInterest(interestId) {
    return fetch(`http://localhost:8088/interests/${interestId}`).then(response => response.json());
  },

  getPlaces() {
    return fetch("http://localhost:8088/places").then(response => response.json());
  },

  postInterest(newInterest) {
    return fetch("http://localhost:8088/interests", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newInterest)
    }).then(results => results.json());
  },

  patchInterest(interestId, changesObject) {
    return fetch(`http://localhost:8088/interests/${interestId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(changesObject)
    });
  },

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
  appendInterests() {
    return _apiManager.default.getAllInterests().then(interests => {
      let headerDiv = document.createElement("div");
      headerDiv.classList = "card-header";
      headerDiv.textContent = "POINTS OF INTEREST";
      displayContainer.appendChild(headerDiv);
      interests.forEach(interest => {
        // console.log(interest.cost)
        _buildHTML.default.buildInterest(interest.name, interest.description, interest.cost, interest.review, interest.place.name, interest.id);
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
  buildInterest(name, description, cost, review, place, id) {
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
    displayContainer.appendChild(containerDiv);
    return containerDiv;
  },

  buildNewInterestForm() {
    let formDiv = document.createElement("div");
    formDiv.classList = "card";
    let headerDiv = document.createElement("div");
    headerDiv.classList = "card-header";
    headerDiv.textContent = "CREATE NEW POINT OF INTEREST";
    formDiv.appendChild(headerDiv);
    let bodyDiv = document.createElement("div");
    bodyDiv.classList = "card-body";
    let newInterestForm = document.createElement("form");
    newInterestForm.appendChild(_htmlFactory.default.buildRequiredFieldset("Name:", "Please enter point of interest", "name-input"));
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
      bodyDiv.appendChild(newInterestForm);
      formDiv.appendChild(bodyDiv);
      let footerDiv = document.createElement("div");
      footerDiv.classList = "card-footer";
      let saveButton = document.createElement("button");
      saveButton.classList = "btn btn-primary";
      saveButton.textContent = "Save Point Of Interest";
      saveButton.addEventListener("click", _eventHandlers.default.handleSaveInterest);
      footerDiv.appendChild(saveButton);
      formDiv.appendChild(footerDiv);
      displayContainer.appendChild(formDiv);
      return newInterestForm;
    });
  },

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
  handleSaveInterest() {
    let place = document.getElementById("dropdown").value;
    let name = document.getElementById("name-input").value;
    let description = document.getElementById("description-input").value;
    let cost = Number(document.getElementById("cost-input").value);
    let review = document.getElementById("review-input").value;

    if (name === "" || description === "") {
      return false;
    } else {
      _apiManager.default.postInterest(_htmlFactory.default.createInterestObject(place, name, description, cost, review));
    }
  },

  handleEditInterest() {
    let interestId = event.target.id.split("--")[1];
    let interestDiv = document.getElementById(`interest-div--${interestId}`);
    interestDiv.textContent = "";

    _apiManager.default.getInterest(interestId).then(interest => {
      return interestDiv.appendChild(_buildHTML.default.buildEditForm(interest.name, interest.description, interest.cost, interest.review, interest.id));
    });
  },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2FwcGVuZEhUTUwuanMiLCIuLi9zY3JpcHRzL2J1aWxkSFRNTC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRIYW5kbGVycy5qcyIsIi4uL3NjcmlwdHMvaHRtbEZhY3RvcnkuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLEdBQUcsR0FBRztBQUNSLEVBQUEsZUFBZSxHQUFHO0FBQ2QsV0FBTyxLQUFLLENBQUMsK0NBQUQsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FKTzs7QUFLUixFQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWE7QUFDcEIsV0FBTyxLQUFLLENBQUUsbUNBQWtDLFVBQVcsRUFBL0MsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FSTzs7QUFTUixFQUFBLFNBQVMsR0FBRztBQUNSLFdBQU8sS0FBSyxDQUFDLDhCQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBWk87O0FBYVIsRUFBQSxZQUFZLENBQUMsV0FBRCxFQUFjO0FBQ3RCLFdBQU8sS0FBSyxDQUFDLGlDQUFELEVBQW9DO0FBQzVDLE1BQUEsTUFBTSxFQUFFLE1BRG9DO0FBRTVDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGbUM7QUFLNUMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmO0FBTHNDLEtBQXBDLENBQUwsQ0FNSixJQU5JLENBTUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBTlosQ0FBUDtBQU9ILEdBckJPOztBQXNC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Q0EsSUFBQSxNQUFNLENBQUMsS0FBUCxHQUFlLEVBQWY7QUFDQSxJQUFBLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLElBQXJCO0FBQ0EsV0FBTyxNQUFQO0FBQ0gsR0E5QmU7O0FBK0JoQixFQUFBLG9CQUFvQixDQUFDLE9BQUQsRUFBVSxJQUFWLEVBQWdCLFdBQWhCLEVBQTZCLElBQTdCLEVBQW1DLE1BQW5DLEVBQTJDO0FBQzNELFdBQU87QUFDSCxpQkFBVyxPQURSO0FBRUgsY0FBUSxJQUZMO0FBR0gscUJBQWUsV0FIWjtBQUlILGNBQVEsSUFKTDtBQUtILGdCQUFVO0FBTFAsS0FBUDtBQU9ILEdBdkNlOztBQXdDaEIsRUFBQSxrQkFBa0IsQ0FBQyxJQUFELEVBQU8sTUFBUCxFQUFlO0FBQzdCLFdBQU87QUFDSCxjQUFRLElBREw7QUFFSCxnQkFBVTtBQUZQLEtBQVA7QUFJSCxHQTdDZTs7QUE4Q2hCLEVBQUEsY0FBYyxDQUFDLGNBQUQsRUFBaUI7QUFDM0IsV0FBTyxjQUFjLENBQUMsVUFBdEIsRUFBa0M7QUFDOUIsTUFBQSxjQUFjLENBQUMsV0FBZixDQUEyQixjQUFjLENBQUMsVUFBMUM7QUFDSDtBQUNKOztBQWxEZSxDQUFwQjtlQXFEZSxXOzs7Ozs7QUNyRGY7O0FBQ0E7Ozs7QUFFQSxtQkFBVSxvQkFBVjs7QUFDQSxvQkFBVyxlQUFYIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBpID0ge1xyXG4gICAgZ2V0QWxsSW50ZXJlc3RzKCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHM/X2V4cGFuZD1wbGFjZVwiKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZ2V0SW50ZXJlc3QoaW50ZXJlc3RJZCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0cy8ke2ludGVyZXN0SWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGdldFBsYWNlcygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2VzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwb3N0SW50ZXJlc3QobmV3SW50ZXJlc3QpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3SW50ZXJlc3QpXHJcbiAgICAgICAgfSkudGhlbihyZXN1bHRzID0+IHJlc3VsdHMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHBhdGNoSW50ZXJlc3QoaW50ZXJlc3RJZCwgY2hhbmdlc09iamVjdCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0cy8ke2ludGVyZXN0SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2hhbmdlc09iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUludGVyZXN0KGludGVyZXN0SWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHMvJHtpbnRlcmVzdElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpIiwiaW1wb3J0IGJ1aWxkSFRNTCBmcm9tIFwiLi9idWlsZEhUTUxcIlxyXG5pbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuXHJcbmNvbnN0IGRpc3BsYXlDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXktY29udGFpbmVyXCIpO1xyXG5cclxuY29uc3QgYXBwZW5kSFRNTCA9IHtcclxuICAgIGFwcGVuZEludGVyZXN0cygpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFwaU1hbmFnZXIuZ2V0QWxsSW50ZXJlc3RzKClcclxuICAgICAgICAgICAgLnRoZW4oaW50ZXJlc3RzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyRGl2LmNsYXNzTGlzdCA9IFwiY2FyZC1oZWFkZXJcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGVyRGl2LnRleHRDb250ZW50ID0gXCJQT0lOVFMgT0YgSU5URVJFU1RcIjtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyRGl2KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnRlcmVzdHMuZm9yRWFjaChpbnRlcmVzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW50ZXJlc3QuY29zdClcclxuICAgICAgICAgICAgICAgICAgICBidWlsZEhUTUwuYnVpbGRJbnRlcmVzdChpbnRlcmVzdC5uYW1lLCBpbnRlcmVzdC5kZXNjcmlwdGlvbiwgaW50ZXJlc3QuY29zdCwgaW50ZXJlc3QucmV2aWV3LCBpbnRlcmVzdC5wbGFjZS5uYW1lLCBpbnRlcmVzdC5pZClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwcGVuZEhUTUwiLCJpbXBvcnQgaHRtbEZhY3RvcnkgZnJvbSBcIi4vaHRtbEZhY3RvcnlcIlxyXG5pbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRIYW5kbGVyc1wiXHJcblxyXG5jb25zdCBkaXNwbGF5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWNvbnRhaW5lclwiKTtcclxuXHJcbmNvbnN0IGJ1aWxkSFRNTCA9IHtcclxuICAgIGJ1aWxkSW50ZXJlc3QobmFtZSwgZGVzY3JpcHRpb24sIGNvc3QsIHJldmlldywgcGxhY2UsIGlkKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmlkID0gYGludGVyZXN0LWRpdi0tJHtpZH1gO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5jbGFzc0xpc3QgPSBcImNhcmQtYm9keVwiXHJcbiAgICAgICAgbGV0IGludGVyZXN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICBpbnRlcmVzdE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdE5hbWUpO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdERlc2NyaXB0aW9uKTtcclxuICAgICAgICBsZXQgaW50ZXJlc3RDb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3RDb3N0LnRleHRDb250ZW50ID0gY29zdDtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaW50ZXJlc3RDb3N0KTtcclxuICAgICAgICBpZiAocmV2aWV3ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcmVzdFJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgICAgICBpbnRlcmVzdFJldmlldy50ZXh0Q29udGVudCA9IHJldmlldztcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGludGVyZXN0UmV2aWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGludGVyZXN0UGxhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBpbnRlcmVzdFBsYWNlLnRleHRDb250ZW50ID0gcGxhY2U7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGludGVyZXN0UGxhY2UpO1xyXG4gICAgICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdCA9IFwiYnRuIGJ0bi1pbmZvXCJcclxuICAgICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0IEludGVyZXN0XCI7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0tJHtpZH1gO1xyXG4gICAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50SGFuZGxlcnMuaGFuZGxlRWRpdEludGVyZXN0KTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcbiAgICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdCA9IFwiYnRuIGJ0bi1kYW5nZXJcIlxyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlIEludGVyZXN0XCI7XHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLmlkID0gYGRlbGV0ZS1idXR0b24tLSR7aWR9YDtcclxuICAgICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50SGFuZGxlcnMuaGFuZGxlRGVsZXRlKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTtcclxuICAgICAgICBkaXNwbGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lckRpdik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgIH0sXHJcbiAgICBidWlsZE5ld0ludGVyZXN0Rm9ybSgpIHtcclxuICAgICAgICBsZXQgZm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgZm9ybURpdi5jbGFzc0xpc3QgPSBcImNhcmRcIjtcclxuICAgICAgICBsZXQgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGhlYWRlckRpdi5jbGFzc0xpc3QgPSBcImNhcmQtaGVhZGVyXCJcclxuICAgICAgICBoZWFkZXJEaXYudGV4dENvbnRlbnQgPSBcIkNSRUFURSBORVcgUE9JTlQgT0YgSU5URVJFU1RcIlxyXG4gICAgICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoaGVhZGVyRGl2KTtcclxuICAgICAgICBsZXQgYm9keURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBib2R5RGl2LmNsYXNzTGlzdCA9IFwiY2FyZC1ib2R5XCI7XHJcbiAgICAgICAgbGV0IG5ld0ludGVyZXN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChodG1sRmFjdG9yeS5idWlsZFJlcXVpcmVkRmllbGRzZXQoXCJOYW1lOlwiLCBcIlBsZWFzZSBlbnRlciBwb2ludCBvZiBpbnRlcmVzdFwiLCBcIm5hbWUtaW5wdXRcIikpO1xyXG4gICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChodG1sRmFjdG9yeS5idWlsZFJlcXVpcmVkRmllbGRzZXQoXCJEZXNjcmlwdGlvbjpcIiwgXCJQbGVhc2UgZW50ZXIgZGVzY3JpcHRpb25cIiwgXCJkZXNjcmlwdGlvbi1pbnB1dFwiKSk7XHJcbiAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGh0bWxGYWN0b3J5LmJ1aWxkRmllbGRzZXQoXCJDb3N0OlwiLCBcIlBsZWFzZSBlbnRlciBjb3N0XCIsIFwiY29zdC1pbnB1dFwiKSk7XHJcbiAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGh0bWxGYWN0b3J5LmJ1aWxkRmllbGRzZXQoXCJSZXZpZXc6XCIsIFwiUGxlYXNlIGVudGVyIHlvdXIgcmV2aWV3XCIsIFwicmV2aWV3LWlucHV0XCIpKTtcclxuICAgICAgICBsZXQgZHJvcGRvd25GaWVsZHNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcclxuICAgICAgICBsZXQgZHJvcGRvd25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgICAgICBkcm9wZG93bkxhYmVsLnRleHRDb250ZW50ID0gXCJDaG9vc2UgbG9jYXRpb25cIjtcclxuICAgICAgICBkcm9wZG93bkZpZWxkc2V0LmFwcGVuZENoaWxkKGRyb3Bkb3duTGFiZWwpO1xyXG4gICAgICAgIGxldCBkcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICAgICAgZHJvcGRvd24uaWQgPSBcImRyb3Bkb3duXCI7XHJcbiAgICAgICAgZHJvcGRvd24ubmFtZSA9IFwibG9jYXRpb25cIjtcclxuICAgICAgICBhcGlNYW5hZ2VyLmdldFBsYWNlcygpXHJcbiAgICAgICAgICAgIC50aGVuKHBsYWNlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZXMuZm9yRWFjaChwbGFjZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyb3Bkb3duLmFwcGVuZENoaWxkKGh0bWxGYWN0b3J5LmJ1aWxkT3B0aW9uKHBsYWNlLm5hbWUsIHBsYWNlLmlkKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duRmllbGRzZXQuYXBwZW5kQ2hpbGQoZHJvcGRvd24pO1xyXG4gICAgICAgICAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGRyb3Bkb3duRmllbGRzZXQpO1xyXG4gICAgICAgICAgICAgICAgYm9keURpdi5hcHBlbmRDaGlsZChuZXdJbnRlcmVzdEZvcm0pXHJcbiAgICAgICAgICAgICAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGJvZHlEaXYpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvb3RlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJEaXYuY2xhc3NMaXN0ID0gXCJjYXJkLWZvb3RlclwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QgPSBcImJ0biBidG4tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlIFBvaW50IE9mIEludGVyZXN0XCI7XHJcbiAgICAgICAgICAgICAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXJzLmhhbmRsZVNhdmVJbnRlcmVzdClcclxuICAgICAgICAgICAgICAgIGZvb3RlckRpdi5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoZm9vdGVyRGl2KTtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybURpdik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW50ZXJlc3RGb3JtO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGJ1aWxkRWRpdEZvcm0obmFtZSwgZGVzY3JpcHRpb24sIGNvc3QsIHJldmlldywgaWQpIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgICAgaW50ZXJlc3ROYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoaW50ZXJlc3ROYW1lKTtcclxuICAgICAgICBsZXQgaW50ZXJlc3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGludGVyZXN0RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoaW50ZXJlc3REZXNjcmlwdGlvbik7XHJcbiAgICAgICAgbGV0IGNvc3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgICAgICBjb3N0TGFiZWwudGV4dENvbnRlbnQgPSBcIkNvc3Q6XCI7XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKGNvc3RMYWJlbCk7XHJcbiAgICAgICAgbGV0IGNvc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBjb3N0SW5wdXQuaWQgPSBcImVkaXQtY29zdFwiO1xyXG4gICAgICAgIGlmIChjb3N0ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvc3RJbnB1dC5wbGFjZWhvbGRlciA9IGNvc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29zdElucHV0LnBsYWNlaG9sZGVyID0gXCJQbGVhc2UgZW50ZXIgY29zdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoY29zdElucHV0KTtcclxuICAgICAgICBsZXQgcmV2aWV3TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICAgICAgcmV2aWV3TGFiZWwudGV4dENvbnRlbnQgPSBcIlJldmlldzpcIjtcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQocmV2aWV3TGFiZWwpO1xyXG4gICAgICAgIGxldCByZXZpZXdJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICByZXZpZXdJbnB1dC5pZCA9IFwiZWRpdC1yZXZpZXdcIjtcclxuICAgICAgICBpZiAocmV2aWV3ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldmlld0lucHV0LnBsYWNlaG9sZGVyID0gcmV2aWV3O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldmlld0lucHV0LnBsYWNlaG9sZGVyID0gXCJQbGVhc2UgZW50ZXIgcmV2aWV3XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChyZXZpZXdJbnB1dCk7XHJcbiAgICAgICAgbGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0ID0gXCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgIHNhdmVCdXR0b24uaWQgPSBgc2F2ZS1idXR0b24tLSR7aWR9YDtcclxuICAgICAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlIENoYW5nZXNcIjtcclxuICAgICAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXJzLmhhbmRsZVNhdmVFZGl0KVxyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnRGcmFnO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRIVE1MIiwiaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBodG1sRmFjdG9yeSBmcm9tIFwiLi9odG1sRmFjdG9yeVwiXHJcbmltcG9ydCBidWlsZEhUTUwgZnJvbSBcIi4vYnVpbGRIVE1MXCJcclxuaW1wb3J0IGFwcGVuZEhUTUwgZnJvbSBcIi4vYXBwZW5kSFRNTFwiXHJcblxyXG5jb25zdCBkaXNwbGF5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWNvbnRhaW5lclwiKTtcclxuXHJcbmNvbnN0IGV2ZW50SGFuZGxlcnMgPSB7XHJcbiAgICBoYW5kbGVTYXZlSW50ZXJlc3QoKSB7XHJcbiAgICAgICAgbGV0IHBsYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wZG93blwiKS52YWx1ZTtcclxuICAgICAgICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS1pbnB1dFwiKS52YWx1ZTtcclxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgIGxldCBjb3N0ID0gTnVtYmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29zdC1pbnB1dFwiKS52YWx1ZSk7XHJcbiAgICAgICAgbGV0IHJldmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmV2aWV3LWlucHV0XCIpLnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJcIiB8fCBkZXNjcmlwdGlvbiA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXBpTWFuYWdlci5wb3N0SW50ZXJlc3QoaHRtbEZhY3RvcnkuY3JlYXRlSW50ZXJlc3RPYmplY3QocGxhY2UsIG5hbWUsIGRlc2NyaXB0aW9uLCBjb3N0LCByZXZpZXcpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRWRpdEludGVyZXN0KCkge1xyXG4gICAgICAgIGxldCBpbnRlcmVzdElkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XHJcbiAgICAgICAgbGV0IGludGVyZXN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludGVyZXN0LWRpdi0tJHtpbnRlcmVzdElkfWApO1xyXG4gICAgICAgIGludGVyZXN0RGl2LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICBhcGlNYW5hZ2VyLmdldEludGVyZXN0KGludGVyZXN0SWQpXHJcbiAgICAgICAgICAgIC50aGVuKGludGVyZXN0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcmVzdERpdi5hcHBlbmRDaGlsZChidWlsZEhUTUwuYnVpbGRFZGl0Rm9ybShpbnRlcmVzdC5uYW1lLCBpbnRlcmVzdC5kZXNjcmlwdGlvbiwgaW50ZXJlc3QuY29zdCwgaW50ZXJlc3QucmV2aWV3LCBpbnRlcmVzdC5pZCkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGhhbmRsZVNhdmVFZGl0KCkge1xyXG4gICAgICAgIGxldCBpbnRlcmVzdElkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XHJcbiAgICAgICAgbGV0IGNvc3RzQ2hhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LWNvc3RcIikudmFsdWU7XHJcbiAgICAgICAgaWYgKGNvc3RzQ2hhbmdlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvc3RzQ2hhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LWNvc3RcIikucGxhY2Vob2xkZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXZpZXdDaGFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtcmV2aWV3XCIpLnZhbHVlO1xyXG4gICAgICAgIGxldCBjaGFuZ2VPYmogPSBodG1sRmFjdG9yeS5jcmVhdGVDaGFuZ2VPYmplY3QoY29zdHNDaGFuZ2UsIHJldmlld0NoYW5nZSlcclxuICAgICAgICBodG1sRmFjdG9yeS5jbGVhckNvbnRhaW5lcihkaXNwbGF5Q29udGFpbmVyKTtcclxuICAgICAgICBhcGlNYW5hZ2VyLnBhdGNoSW50ZXJlc3QoaW50ZXJlc3RJZCwgY2hhbmdlT2JqKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidWlsZEhUTUwuYnVpbGROZXdJbnRlcmVzdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgIGFwcGVuZEhUTUwuYXBwZW5kSW50ZXJlc3RzKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRGVsZXRlKCkge1xyXG4gICAgICAgIGxldCBpbnRlcmVzdElkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpbnRlcmVzdD9cIilcclxuICAgICAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaHRtbEZhY3RvcnkuY2xlYXJDb250YWluZXIoZGlzcGxheUNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGFwaU1hbmFnZXIuZGVsZXRlSW50ZXJlc3QoaW50ZXJlc3RJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZEhUTUwuYnVpbGROZXdJbnRlcmVzdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICBhcHBlbmRIVE1MLmFwcGVuZEludGVyZXN0cygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50SGFuZGxlcnMiLCJjb25zdCBodG1sRmFjdG9yeSA9IHtcclxuICAgIGJ1aWxkUmVxdWlyZWRGaWVsZHNldChsYWJlbFRleHQsIHBsYWNlaG9sZGVyVGV4dCwgaW5wdXRJZCkge1xyXG4gICAgICAgIGxldCBmaWVsZHNldEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xyXG4gICAgICAgIGxldCBsYWJlbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsRWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XHJcbiAgICAgICAgZmllbGRzZXRFbC5hcHBlbmRDaGlsZChsYWJlbEVsKTtcclxuICAgICAgICBsZXQgaW5wdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBpbnB1dEVsLmlkID0gaW5wdXRJZDtcclxuICAgICAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwiXCIpO1xyXG4gICAgICAgIGlucHV0RWwucmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgIGlucHV0RWwucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlclRleHQ7XHJcbiAgICAgICAgZmllbGRzZXRFbC5hcHBlbmRDaGlsZChpbnB1dEVsKTtcclxuICAgICAgICByZXR1cm4gZmllbGRzZXRFbDtcclxuICAgIH0sXHJcbiAgICBidWlsZEZpZWxkc2V0KGxhYmVsVGV4dCwgcGxhY2Vob2xkZXJUZXh0LCBpbnB1dElkKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkc2V0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XHJcbiAgICAgICAgbGV0IGxhYmVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcclxuICAgICAgICBmaWVsZHNldEVsLmFwcGVuZENoaWxkKGxhYmVsRWwpO1xyXG4gICAgICAgIGxldCBpbnB1dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGlucHV0RWwuaWQgPSBpbnB1dElkO1xyXG4gICAgICAgIGlucHV0RWwucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlclRleHQ7XHJcbiAgICAgICAgZmllbGRzZXRFbC5hcHBlbmRDaGlsZChpbnB1dEVsKTtcclxuICAgICAgICByZXR1cm4gZmllbGRzZXRFbDtcclxuICAgIH0sXHJcbiAgICBidWlsZE9wdGlvbihuYW1lLCBpZCkge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGlkO1xyXG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVJbnRlcmVzdE9iamVjdChwbGFjZUlkLCBuYW1lLCBkZXNjcmlwdGlvbiwgY29zdCwgcmV2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJwbGFjZUlkXCI6IHBsYWNlSWQsXHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBcImNvc3RcIjogY29zdCxcclxuICAgICAgICAgICAgXCJyZXZpZXdcIjogcmV2aWV3XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUNoYW5nZU9iamVjdChjb3N0LCByZXZpZXcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImNvc3RcIjogY29zdCxcclxuICAgICAgICAgICAgXCJyZXZpZXdcIjogcmV2aWV3XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsZWFyQ29udGFpbmVyKGVsZW1lbnRUb0NsZWFyKSB7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnRUb0NsZWFyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxlbWVudFRvQ2xlYXIucmVtb3ZlQ2hpbGQoZWxlbWVudFRvQ2xlYXIuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBodG1sRmFjdG9yeSIsImltcG9ydCBhcHBlbmRIVE1MIGZyb20gXCIuL2FwcGVuZEhUTUxcIlxyXG5pbXBvcnQgYnVpbGRIVE1MIGZyb20gXCIuL2J1aWxkSFRNTFwiXHJcblxyXG5idWlsZEhUTUwuYnVpbGROZXdJbnRlcmVzdEZvcm0oKTtcclxuYXBwZW5kSFRNTC5hcHBlbmRJbnRlcmVzdHMoKTsiXX0=
