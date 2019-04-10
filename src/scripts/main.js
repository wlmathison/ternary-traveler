import appendHTML from "./appendHTML"
import buildHTML from "./buildHTML"

appendHTML.appendInterests().then(buildHTML.buildNewInterestForm);