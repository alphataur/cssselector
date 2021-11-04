const cheerio = require("cheerio")

const INVALID_TEXT = "Invalid HTML input"
const SELECT_ALL = "select_all"
const SELECT_ONE = "select_one"

class Selector{
  constructor(text){
    if(text === undefined) throw new Error(INVALID_TEXT)
    this.text = text
    this.dom = cheerio.load(this.text)
  }
  css(path, mode){
    return new Promise((resolve, reject) => {
      if(mode === undefined || mode === SELECT_ONE){
        this.dom(path).each((index, value) => {
          return resolve(this.dom(value))
        })
      }
      else if(mode === SELECT_ALL){
        let results = []
        this.dom(path).each((index, value) => {
          console.log(this.dom(value).attr("href"))
          results.push(this.dom(value).attr("href"))
        })
        return resolve(results)
      }
    })
  }
}

module.exports = {
  INVALID_TEXT,
  SELECT_ONE,
  SELECT_ALL,
  Selector
}
