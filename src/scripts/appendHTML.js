import buildHTML from "./buildHTML"
import apiManager from "./apiManager"

const appendHTML = {
    appendInterests() {
        return apiManager.getAllInterests()
            .then(interests => {
                interests.forEach(interest => {
                    // console.log(interest.cost)
                    buildHTML.buildInterest(interest.name, interest.description, interest.cost, interest.review, interest.place.name)
                })
            })
    }
}

export default appendHTML