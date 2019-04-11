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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2FwcGVuZEhUTUwuanMiLCIuLi9zY3JpcHRzL2J1aWxkSFRNTC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRIYW5kbGVycy5qcyIsIi4uL3NjcmlwdHMvaHRtbEZhY3RvcnkuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLEdBQUcsR0FBRztBQUNSLEVBQUEsZUFBZSxHQUFHO0FBQ2QsV0FBTyxLQUFLLENBQUMsK0NBQUQsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FKTzs7QUFLUixFQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWE7QUFDcEIsV0FBTyxLQUFLLENBQUUsbUNBQWtDLFVBQVcsRUFBL0MsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FSTzs7QUFTUixFQUFBLFNBQVMsR0FBRztBQUNSLFdBQU8sS0FBSyxDQUFDLDhCQUFELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBWk87O0FBYVIsRUFBQSxZQUFZLENBQUMsV0FBRCxFQUFjO0FBQ3RCLFdBQU8sS0FBSyxDQUFDLGlDQUFELEVBQW9DO0FBQzVDLE1BQUEsTUFBTSxFQUFFLE1BRG9DO0FBRTVDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGbUM7QUFLNUMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmO0FBTHNDLEtBQXBDLENBQUwsQ0FNSixJQU5JLENBTUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBTlosQ0FBUDtBQU9ILEdBckJPOztBQXNC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LE1BQUEsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsY0FBYyxDQUFDLFVBQTFDO0FBQ0g7QUFDSjs7QUFsRGUsQ0FBcEI7ZUFxRGUsVzs7Ozs7O0FDckRmOztBQUNBOzs7O0FBRUEsbUJBQVUsb0JBQVY7O0FBQ0Esb0JBQVcsZUFBWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwaSA9IHtcclxuICAgIGdldEFsbEludGVyZXN0cygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzP19leHBhbmQ9cGxhY2VcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGdldEludGVyZXN0KGludGVyZXN0SWQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHMvJHtpbnRlcmVzdElkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBnZXRQbGFjZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3BsYWNlc1wiKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgcG9zdEludGVyZXN0KG5ld0ludGVyZXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0ludGVyZXN0KVxyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0cyA9PiByZXN1bHRzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwYXRjaEludGVyZXN0KGludGVyZXN0SWQsIGNoYW5nZXNPYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnRlcmVzdHMvJHtpbnRlcmVzdElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNoYW5nZXNPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVJbnRlcmVzdChpbnRlcmVzdElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzLyR7aW50ZXJlc3RJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaSIsImltcG9ydCBidWlsZEhUTUwgZnJvbSBcIi4vYnVpbGRIVE1MXCJcclxuaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcblxyXG5jb25zdCBkaXNwbGF5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWNvbnRhaW5lclwiKTtcclxuXHJcbmNvbnN0IGFwcGVuZEhUTUwgPSB7XHJcbiAgICBhcHBlbmRJbnRlcmVzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgaW50ZXJlc3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpbnRlcmVzdHNDb250YWluZXIuY2xhc3NMaXN0ID0gXCJjYXJkIHNwbGl0LWRpdlwiO1xyXG4gICAgICAgIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoaW50ZXJlc3RzQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFwaU1hbmFnZXIuZ2V0QWxsSW50ZXJlc3RzKClcclxuICAgICAgICAgICAgLnRoZW4oaW50ZXJlc3RzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyRGl2LmNsYXNzTGlzdCA9IFwiY2FyZC1oZWFkZXJcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGVyRGl2LnRleHRDb250ZW50ID0gXCJQT0lOVFMgT0YgSU5URVJFU1RcIjtcclxuICAgICAgICAgICAgICAgIGludGVyZXN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJEaXYpO1xyXG5cclxuICAgICAgICAgICAgICAgIGludGVyZXN0cy5mb3JFYWNoKGludGVyZXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpbnRlcmVzdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRIVE1MLmJ1aWxkSW50ZXJlc3QoaW50ZXJlc3QubmFtZSwgaW50ZXJlc3QuZGVzY3JpcHRpb24sIE51bWJlcihpbnRlcmVzdC5jb3N0KSwgaW50ZXJlc3QucmV2aWV3LCBpbnRlcmVzdC5wbGFjZS5uYW1lLCBpbnRlcmVzdC5pZCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcHBlbmRIVE1MIiwiaW1wb3J0IGh0bWxGYWN0b3J5IGZyb20gXCIuL2h0bWxGYWN0b3J5XCJcclxuaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBldmVudEhhbmRsZXJzIGZyb20gXCIuL2V2ZW50SGFuZGxlcnNcIlxyXG5cclxuY29uc3QgZGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1jb250YWluZXJcIik7XHJcblxyXG5jb25zdCBidWlsZEhUTUwgPSB7XHJcbiAgICBidWlsZEludGVyZXN0KG5hbWUsIGRlc2NyaXB0aW9uLCBjb3N0LCByZXZpZXcsIHBsYWNlLCBpZCkge1xyXG4gICAgICAgIGxldCBkb2N1bWVudEZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmlkID0gYGludGVyZXN0LWRpdi0tJHtpZH1gO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5jbGFzc0xpc3QgPSBcImNhcmQtYm9keVwiXHJcbiAgICAgICAgbGV0IGludGVyZXN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICBpbnRlcmVzdE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdE5hbWUpO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdERlc2NyaXB0aW9uKTtcclxuICAgICAgICBsZXQgaW50ZXJlc3RDb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3RDb3N0LnRleHRDb250ZW50ID0gYENvc3Q6ICQke2Nvc3R9YDtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaW50ZXJlc3RDb3N0KTtcclxuICAgICAgICBpZiAocmV2aWV3ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcmVzdFJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgICAgICBpbnRlcmVzdFJldmlldy50ZXh0Q29udGVudCA9IHJldmlldztcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGludGVyZXN0UmV2aWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGludGVyZXN0UGxhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBpbnRlcmVzdFBsYWNlLnRleHRDb250ZW50ID0gcGxhY2U7XHJcbiAgICAgICAgaW50ZXJlc3RQbGFjZS5zdHlsZS5mb250U3R5bGUgPSBcIml0YWxpY1wiO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdFBsYWNlKTtcclxuICAgICAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QgPSBcImJ0biBidG4taW5mb1wiXHJcbiAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdCBJbnRlcmVzdFwiO1xyXG4gICAgICAgIGVkaXRCdXR0b24uaWQgPSBgZWRpdC1idXR0b24tLSR7aWR9YDtcclxuICAgICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXJzLmhhbmRsZUVkaXRJbnRlcmVzdCk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QgPSBcImJ0biBidG4tZGFuZ2VyXCJcclxuICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZSBJbnRlcmVzdFwiO1xyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5pZCA9IGBkZWxldGUtYnV0dG9uLS0ke2lkfWA7XHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXJzLmhhbmRsZURlbGV0ZSk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKSk7XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKGNvbnRhaW5lckRpdik7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50RnJhZztcclxuICAgIH0sXHJcbiAgICBidWlsZE5ld0ludGVyZXN0Rm9ybSgpIHtcclxuICAgICAgICBsZXQgZm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgZm9ybURpdi5jbGFzc0xpc3QgPSBcImNhcmQgc3BsaXQtZGl2XCI7XHJcbiAgICAgICAgZm9ybURpdi5pZCA9IFwibmV3LWludGVyZXN0LWZvcm1cIjtcclxuICAgICAgICBsZXQgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGhlYWRlckRpdi5jbGFzc0xpc3QgPSBcImNhcmQtaGVhZGVyXCJcclxuICAgICAgICBoZWFkZXJEaXYudGV4dENvbnRlbnQgPSBcIkNSRUFURSBORVcgUE9JTlQgT0YgSU5URVJFU1RcIlxyXG4gICAgICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoaGVhZGVyRGl2KTtcclxuICAgICAgICBsZXQgYm9keURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBib2R5RGl2LmNsYXNzTGlzdCA9IFwiY2FyZC1ib2R5XCI7XHJcbiAgICAgICAgbGV0IG5ld0ludGVyZXN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgICAgIG5ld0ludGVyZXN0Rm9ybS5hcHBlbmRDaGlsZChodG1sRmFjdG9yeS5idWlsZFJlcXVpcmVkRmllbGRzZXQoXCJOYW1lOlwiLCBcIlBsZWFzZSBlbnRlciBuYW1lXCIsIFwibmFtZS1pbnB1dFwiKSk7XHJcbiAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKGh0bWxGYWN0b3J5LmJ1aWxkUmVxdWlyZWRGaWVsZHNldChcIkRlc2NyaXB0aW9uOlwiLCBcIlBsZWFzZSBlbnRlciBkZXNjcmlwdGlvblwiLCBcImRlc2NyaXB0aW9uLWlucHV0XCIpKTtcclxuICAgICAgICBuZXdJbnRlcmVzdEZvcm0uYXBwZW5kQ2hpbGQoaHRtbEZhY3RvcnkuYnVpbGRGaWVsZHNldChcIkNvc3Q6XCIsIFwiUGxlYXNlIGVudGVyIGNvc3RcIiwgXCJjb3N0LWlucHV0XCIpKTtcclxuICAgICAgICBuZXdJbnRlcmVzdEZvcm0uYXBwZW5kQ2hpbGQoaHRtbEZhY3RvcnkuYnVpbGRGaWVsZHNldChcIlJldmlldzpcIiwgXCJQbGVhc2UgZW50ZXIgeW91ciByZXZpZXdcIiwgXCJyZXZpZXctaW5wdXRcIikpO1xyXG4gICAgICAgIGxldCBkcm9wZG93bkZpZWxkc2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xyXG4gICAgICAgIGxldCBkcm9wZG93bkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgICAgIGRyb3Bkb3duTGFiZWwudGV4dENvbnRlbnQgPSBcIkNob29zZSBsb2NhdGlvblwiO1xyXG4gICAgICAgIGRyb3Bkb3duRmllbGRzZXQuYXBwZW5kQ2hpbGQoZHJvcGRvd25MYWJlbCk7XHJcbiAgICAgICAgbGV0IGRyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgICAgICBkcm9wZG93bi5pZCA9IFwiZHJvcGRvd25cIjtcclxuICAgICAgICBkcm9wZG93bi5uYW1lID0gXCJsb2NhdGlvblwiO1xyXG4gICAgICAgIGFwaU1hbmFnZXIuZ2V0UGxhY2VzKClcclxuICAgICAgICAgICAgLnRoZW4ocGxhY2VzID0+IHtcclxuICAgICAgICAgICAgICAgIHBsYWNlcy5mb3JFYWNoKHBsYWNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJvcGRvd24uYXBwZW5kQ2hpbGQoaHRtbEZhY3RvcnkuYnVpbGRPcHRpb24ocGxhY2UubmFtZSwgcGxhY2UuaWQpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd25GaWVsZHNldC5hcHBlbmRDaGlsZChkcm9wZG93bik7XHJcbiAgICAgICAgICAgICAgICBuZXdJbnRlcmVzdEZvcm0uYXBwZW5kQ2hpbGQoZHJvcGRvd25GaWVsZHNldCk7XHJcbiAgICAgICAgICAgICAgICBuZXdJbnRlcmVzdEZvcm0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpKTtcclxuICAgICAgICAgICAgICAgIGxldCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIHNhdmVCdXR0b24uY2xhc3NMaXN0ID0gXCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZSBQb2ludCBPZiBJbnRlcmVzdFwiO1xyXG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnRIYW5kbGVycy5oYW5kbGVTYXZlSW50ZXJlc3QpO1xyXG4gICAgICAgICAgICAgICAgbmV3SW50ZXJlc3RGb3JtLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgYm9keURpdi5hcHBlbmRDaGlsZChuZXdJbnRlcmVzdEZvcm0pXHJcbiAgICAgICAgICAgICAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGJvZHlEaXYpO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtRGl2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbnRlcmVzdEZvcm07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYnVpbGRFZGl0Rm9ybShuYW1lLCBkZXNjcmlwdGlvbiwgY29zdCwgcmV2aWV3LCBpZCkge1xyXG4gICAgICAgIGxldCBkb2N1bWVudEZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgbGV0IGludGVyZXN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICBpbnRlcmVzdE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChpbnRlcmVzdE5hbWUpO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChpbnRlcmVzdERlc2NyaXB0aW9uKTtcclxuICAgICAgICBsZXQgY29zdExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgICAgIGNvc3RMYWJlbC50ZXh0Q29udGVudCA9IFwiQ29zdDpcIjtcclxuICAgICAgICBkb2N1bWVudEZyYWcuYXBwZW5kQ2hpbGQoY29zdExhYmVsKTtcclxuICAgICAgICBsZXQgY29zdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGNvc3RJbnB1dC5pZCA9IFwiZWRpdC1jb3N0XCI7XHJcbiAgICAgICAgaWYgKGNvc3QgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29zdElucHV0LnBsYWNlaG9sZGVyID0gY29zdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb3N0SW5wdXQucGxhY2Vob2xkZXIgPSBcIlBsZWFzZSBlbnRlciBjb3N0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChjb3N0SW5wdXQpO1xyXG4gICAgICAgIGxldCByZXZpZXdMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgICAgICByZXZpZXdMYWJlbC50ZXh0Q29udGVudCA9IFwiUmV2aWV3OlwiO1xyXG4gICAgICAgIGRvY3VtZW50RnJhZy5hcHBlbmRDaGlsZChyZXZpZXdMYWJlbCk7XHJcbiAgICAgICAgbGV0IHJldmlld0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIHJldmlld0lucHV0LmlkID0gXCJlZGl0LXJldmlld1wiO1xyXG4gICAgICAgIGlmIChyZXZpZXcgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV2aWV3SW5wdXQucGxhY2Vob2xkZXIgPSByZXZpZXc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV2aWV3SW5wdXQucGxhY2Vob2xkZXIgPSBcIlBsZWFzZSBlbnRlciByZXZpZXdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKHJldmlld0lucHV0KTtcclxuICAgICAgICBsZXQgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgc2F2ZUJ1dHRvbi5jbGFzc0xpc3QgPSBcImJ0biBidG4tcHJpbWFyeVwiXHJcbiAgICAgICAgc2F2ZUJ1dHRvbi5pZCA9IGBzYXZlLWJ1dHRvbi0tJHtpZH1gO1xyXG4gICAgICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmUgQ2hhbmdlc1wiO1xyXG4gICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50SGFuZGxlcnMuaGFuZGxlU2F2ZUVkaXQpXHJcbiAgICAgICAgZG9jdW1lbnRGcmFnLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudEZyYWc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkSFRNTCIsImltcG9ydCBhcGlNYW5hZ2VyIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgaHRtbEZhY3RvcnkgZnJvbSBcIi4vaHRtbEZhY3RvcnlcIlxyXG5pbXBvcnQgYnVpbGRIVE1MIGZyb20gXCIuL2J1aWxkSFRNTFwiXHJcbmltcG9ydCBhcHBlbmRIVE1MIGZyb20gXCIuL2FwcGVuZEhUTUxcIlxyXG5cclxuY29uc3QgZGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1jb250YWluZXJcIik7XHJcblxyXG5jb25zdCBldmVudEhhbmRsZXJzID0ge1xyXG4gICAgaGFuZGxlU2F2ZUludGVyZXN0KCkge1xyXG4gICAgICAgIGxldCBwbGFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcGRvd25cIikudmFsdWU7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWUtaW5wdXRcIikudmFsdWU7XHJcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvbi1pbnB1dFwiKS52YWx1ZTtcclxuICAgICAgICBsZXQgY29zdCA9IE51bWJlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvc3QtaW5wdXRcIikudmFsdWUpO1xyXG4gICAgICAgIGxldCByZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJldmlldy1pbnB1dFwiKS52YWx1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIjFcIilcclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJcIiB8fCBkZXNjcmlwdGlvbiA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXBpTWFuYWdlci5wb3N0SW50ZXJlc3QoaHRtbEZhY3RvcnkuY3JlYXRlSW50ZXJlc3RPYmplY3QocGxhY2UsIG5hbWUsIGRlc2NyaXB0aW9uLCBjb3N0LCByZXZpZXcpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWxGYWN0b3J5LmNsZWFyQ29udGFpbmVyKGRpc3BsYXlDb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWlsZEhUTUwuYnVpbGROZXdJbnRlcmVzdEZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihhcHBlbmRIVE1MLmFwcGVuZEludGVyZXN0cyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBoYW5kbGVFZGl0SW50ZXJlc3QoKSB7XHJcbiAgICAgICAgbGV0IGludGVyZXN0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcclxuICAgICAgICBsZXQgaW50ZXJlc3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaW50ZXJlc3QtZGl2LS0ke2ludGVyZXN0SWR9YCk7XHJcbiAgICAgICAgaW50ZXJlc3REaXYudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIGFwaU1hbmFnZXIuZ2V0SW50ZXJlc3QoaW50ZXJlc3RJZClcclxuICAgICAgICAgICAgLnRoZW4oaW50ZXJlc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVyZXN0RGl2LmFwcGVuZENoaWxkKGJ1aWxkSFRNTC5idWlsZEVkaXRGb3JtKGludGVyZXN0Lm5hbWUsIGludGVyZXN0LmRlc2NyaXB0aW9uLCBpbnRlcmVzdC5jb3N0LCBpbnRlcmVzdC5yZXZpZXcsIGludGVyZXN0LmlkKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgaGFuZGxlU2F2ZUVkaXQoKSB7XHJcbiAgICAgICAgbGV0IGludGVyZXN0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcclxuICAgICAgICBsZXQgY29zdHNDaGFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtY29zdFwiKS52YWx1ZTtcclxuICAgICAgICBpZiAoY29zdHNDaGFuZ2UgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29zdHNDaGFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtY29zdFwiKS5wbGFjZWhvbGRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldmlld0NoYW5nZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1yZXZpZXdcIikudmFsdWU7XHJcbiAgICAgICAgbGV0IGNoYW5nZU9iaiA9IGh0bWxGYWN0b3J5LmNyZWF0ZUNoYW5nZU9iamVjdChjb3N0c0NoYW5nZSwgcmV2aWV3Q2hhbmdlKVxyXG4gICAgICAgIGh0bWxGYWN0b3J5LmNsZWFyQ29udGFpbmVyKGRpc3BsYXlDb250YWluZXIpO1xyXG4gICAgICAgIGFwaU1hbmFnZXIucGF0Y2hJbnRlcmVzdChpbnRlcmVzdElkLCBjaGFuZ2VPYmopXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJ1aWxkSFRNTC5idWlsZE5ld0ludGVyZXN0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgYXBwZW5kSFRNTC5hcHBlbmRJbnRlcmVzdHMoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVEZWxldGUoKSB7XHJcbiAgICAgICAgbGV0IGludGVyZXN0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXTtcclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGludGVyZXN0P1wiKVxyXG4gICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBodG1sRmFjdG9yeS5jbGVhckNvbnRhaW5lcihkaXNwbGF5Q29udGFpbmVyKTtcclxuICAgICAgICAgICAgYXBpTWFuYWdlci5kZWxldGVJbnRlcmVzdChpbnRlcmVzdElkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkSFRNTC5idWlsZE5ld0ludGVyZXN0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZEhUTUwuYXBwZW5kSW50ZXJlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50SGFuZGxlcnMiLCJjb25zdCBodG1sRmFjdG9yeSA9IHtcclxuICAgIGJ1aWxkUmVxdWlyZWRGaWVsZHNldChsYWJlbFRleHQsIHBsYWNlaG9sZGVyVGV4dCwgaW5wdXRJZCkge1xyXG4gICAgICAgIGxldCBmaWVsZHNldEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xyXG4gICAgICAgIGxldCBsYWJlbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgICAgIGxhYmVsRWwudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XHJcbiAgICAgICAgZmllbGRzZXRFbC5hcHBlbmRDaGlsZChsYWJlbEVsKTtcclxuICAgICAgICBsZXQgaW5wdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBpbnB1dEVsLmlkID0gaW5wdXRJZDtcclxuICAgICAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwiXCIpO1xyXG4gICAgICAgIGlucHV0RWwucmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgIGlucHV0RWwucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlclRleHQ7XHJcbiAgICAgICAgZmllbGRzZXRFbC5hcHBlbmRDaGlsZChpbnB1dEVsKTtcclxuICAgICAgICByZXR1cm4gZmllbGRzZXRFbDtcclxuICAgIH0sXHJcbiAgICBidWlsZEZpZWxkc2V0KGxhYmVsVGV4dCwgcGxhY2Vob2xkZXJUZXh0LCBpbnB1dElkKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkc2V0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XHJcbiAgICAgICAgbGV0IGxhYmVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcclxuICAgICAgICBmaWVsZHNldEVsLmFwcGVuZENoaWxkKGxhYmVsRWwpO1xyXG4gICAgICAgIGxldCBpbnB1dEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGlucHV0RWwuaWQgPSBpbnB1dElkO1xyXG4gICAgICAgIGlucHV0RWwucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlclRleHQ7XHJcbiAgICAgICAgZmllbGRzZXRFbC5hcHBlbmRDaGlsZChpbnB1dEVsKTtcclxuICAgICAgICByZXR1cm4gZmllbGRzZXRFbDtcclxuICAgIH0sXHJcbiAgICBidWlsZE9wdGlvbihuYW1lLCBpZCkge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGlkO1xyXG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVJbnRlcmVzdE9iamVjdChwbGFjZUlkLCBuYW1lLCBkZXNjcmlwdGlvbiwgY29zdCwgcmV2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJwbGFjZUlkXCI6IHBsYWNlSWQsXHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lLFxyXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBcImNvc3RcIjogY29zdCxcclxuICAgICAgICAgICAgXCJyZXZpZXdcIjogcmV2aWV3XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUNoYW5nZU9iamVjdChjb3N0LCByZXZpZXcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImNvc3RcIjogY29zdCxcclxuICAgICAgICAgICAgXCJyZXZpZXdcIjogcmV2aWV3XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsZWFyQ29udGFpbmVyKGVsZW1lbnRUb0NsZWFyKSB7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnRUb0NsZWFyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxlbWVudFRvQ2xlYXIucmVtb3ZlQ2hpbGQoZWxlbWVudFRvQ2xlYXIuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBodG1sRmFjdG9yeSIsImltcG9ydCBhcHBlbmRIVE1MIGZyb20gXCIuL2FwcGVuZEhUTUxcIlxyXG5pbXBvcnQgYnVpbGRIVE1MIGZyb20gXCIuL2J1aWxkSFRNTFwiXHJcblxyXG5idWlsZEhUTUwuYnVpbGROZXdJbnRlcmVzdEZvcm0oKTtcclxuYXBwZW5kSFRNTC5hcHBlbmRJbnRlcmVzdHMoKTsiXX0=
