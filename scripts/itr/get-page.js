const selectors = require("../../utils/selectors")
const net = require("../../utils/net")

async function getShoots(url){
  let res = await net.fetch(url)
  let selector = new selectors.Selector(res)
  let results =  await selector.css(".post-title > a", selectors.SELECT_ALL)
  console.log(results)
  return results
}

async function main(){
  let url = "https://in-the-raw.org/page/1"
  let shoots = await getShoots(url)
}

main()
