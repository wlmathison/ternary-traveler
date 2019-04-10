(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const api = {
  getAllInterests() {
    return fetch("http://localhost:8088/interests?_expand=place").then(response => response.json());
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

const appendHTML = {
  appendInterests() {
    _apiManager.default.getAllInterests().then(interests => {
      interests.forEach(interest => {
        console.log(interest.cost);

        _buildHTML.default.buildInterest(interest.name, interest.description, interest.cost, interest.review, interest.place.name);
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

};
var _default = buildHTML;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

var _appendHTML = _interopRequireDefault(require("./appendHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_appendHTML.default.appendInterests();

},{"./appendHTML":2}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2FwcGVuZEhUTUwuanMiLCIuLi9zY3JpcHRzL2J1aWxkSFRNTC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sR0FBRyxHQUFHO0FBQ1IsRUFBQSxlQUFlLEdBQUc7QUFDZCxXQUFPLEtBQUssQ0FBQywrQ0FBRCxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFSDs7QUFKTyxDQUFaO2VBT2UsRzs7Ozs7Ozs7Ozs7QUNQZjs7QUFDQTs7OztBQUVBLE1BQU0sVUFBVSxHQUFHO0FBQ2YsRUFBQSxlQUFlLEdBQUc7QUFDZCx3QkFBVyxlQUFYLEdBQ0ssSUFETCxDQUNVLFNBQVMsSUFBSTtBQUNmLE1BQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsUUFBUSxJQUFJO0FBQzFCLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxRQUFRLENBQUMsSUFBckI7O0FBQ0EsMkJBQVUsYUFBVixDQUF3QixRQUFRLENBQUMsSUFBakMsRUFBdUMsUUFBUSxDQUFDLFdBQWhELEVBQTZELFFBQVEsQ0FBQyxJQUF0RSxFQUE0RSxRQUFRLENBQUMsTUFBckYsRUFBNkYsUUFBUSxDQUFDLEtBQVQsQ0FBZSxJQUE1RztBQUNILE9BSEQ7QUFJSCxLQU5MO0FBT0g7O0FBVGMsQ0FBbkI7ZUFZZSxVOzs7Ozs7Ozs7O0FDZmYsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixtQkFBeEIsQ0FBekI7QUFFQSxNQUFNLFNBQVMsR0FBRztBQUNkLEVBQUEsYUFBYSxDQUFDLElBQUQsRUFBTyxXQUFQLEVBQW9CLElBQXBCLEVBQTBCLE1BQTFCLEVBQWtDLEtBQWxDLEVBQXlDO0FBQ2xELFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EsUUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBbkI7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLEdBQTJCLElBQTNCO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixDQUF5QixZQUF6QjtBQUNBLFFBQUksbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBMUI7QUFDQSxJQUFBLG1CQUFtQixDQUFDLFdBQXBCLEdBQWtDLFdBQWxDO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixDQUF5QixtQkFBekI7QUFDQSxRQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFuQjtBQUNBLElBQUEsWUFBWSxDQUFDLFdBQWIsR0FBMkIsSUFBM0I7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLFlBQXpCOztBQUNBLFFBQUksTUFBTSxLQUFLLEVBQWYsRUFBbUI7QUFDZixVQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFyQjtBQUNBLE1BQUEsY0FBYyxDQUFDLFdBQWYsR0FBNkIsTUFBN0I7QUFDQSxNQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLGNBQXpCO0FBQ0g7O0FBQ0QsUUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBcEI7QUFDQSxJQUFBLGFBQWEsQ0FBQyxXQUFkLEdBQTRCLEtBQTVCO0FBQ0EsSUFBQSxZQUFZLENBQUMsV0FBYixDQUF5QixhQUF6QjtBQUNBLElBQUEsZ0JBQWdCLENBQUMsV0FBakIsQ0FBNkIsWUFBN0I7QUFDQSxXQUFPLFlBQVA7QUFDSDs7QUF0QmEsQ0FBbEI7ZUF5QmUsUzs7Ozs7O0FDM0JmOzs7O0FBRUEsb0JBQVcsZUFBWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwaSA9IHtcclxuICAgIGdldEFsbEludGVyZXN0cygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzP19leHBhbmQ9cGxhY2VcIilcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaSIsImltcG9ydCBidWlsZEhUTUwgZnJvbSBcIi4vYnVpbGRIVE1MXCJcclxuaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcblxyXG5jb25zdCBhcHBlbmRIVE1MID0ge1xyXG4gICAgYXBwZW5kSW50ZXJlc3RzKCkge1xyXG4gICAgICAgIGFwaU1hbmFnZXIuZ2V0QWxsSW50ZXJlc3RzKClcclxuICAgICAgICAgICAgLnRoZW4oaW50ZXJlc3RzID0+IHtcclxuICAgICAgICAgICAgICAgIGludGVyZXN0cy5mb3JFYWNoKGludGVyZXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnRlcmVzdC5jb3N0KVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkSFRNTC5idWlsZEludGVyZXN0KGludGVyZXN0Lm5hbWUsIGludGVyZXN0LmRlc2NyaXB0aW9uLCBpbnRlcmVzdC5jb3N0LCBpbnRlcmVzdC5yZXZpZXcsIGludGVyZXN0LnBsYWNlLm5hbWUpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcHBlbmRIVE1MIiwiY29uc3QgZGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1jb250YWluZXJcIik7XHJcblxyXG5jb25zdCBidWlsZEhUTUwgPSB7XHJcbiAgICBidWlsZEludGVyZXN0KG5hbWUsIGRlc2NyaXB0aW9uLCBjb3N0LCByZXZpZXcsIHBsYWNlKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGV0IGludGVyZXN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICBpbnRlcmVzdE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdE5hbWUpO1xyXG4gICAgICAgIGxldCBpbnRlcmVzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpbnRlcmVzdERlc2NyaXB0aW9uKTtcclxuICAgICAgICBsZXQgaW50ZXJlc3RDb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgaW50ZXJlc3RDb3N0LnRleHRDb250ZW50ID0gY29zdDtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaW50ZXJlc3RDb3N0KTtcclxuICAgICAgICBpZiAocmV2aWV3ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcmVzdFJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgICAgICBpbnRlcmVzdFJldmlldy50ZXh0Q29udGVudCA9IHJldmlldztcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGludGVyZXN0UmV2aWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGludGVyZXN0UGxhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBpbnRlcmVzdFBsYWNlLnRleHRDb250ZW50ID0gcGxhY2U7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGludGVyZXN0UGxhY2UpO1xyXG4gICAgICAgIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyRGl2KTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEhUTUwiLCJpbXBvcnQgYXBwZW5kSFRNTCBmcm9tIFwiLi9hcHBlbmRIVE1MXCJcclxuXHJcbmFwcGVuZEhUTUwuYXBwZW5kSW50ZXJlc3RzKCk7Il19
