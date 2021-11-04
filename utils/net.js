const axios = require("axios")
const fs = require("fs")
const path = require("path")

const FETCH = "fetch"
const DOWNLOAD = "download"

function makeRequest(uri, opts){
  let method;
  if(opts === undefined || opts.method === undefined) method = "get"
  else method = opts.method
  let defaults = {
    method,
    url: uri,
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
    }}

  if(opts === undefined || opts.mode === FETCH){
    return {
      ...defaults
    }
  }
  else if(opts.mode === DOWNLOAD){
    return {
      ...defaults,
      responseType: "stream"
    }
  }
}

async function download(uri, fpath){
  let res = await axios(makeRequest(uri, { mode: DOWNLOAD}))
  let file = fs.createWriteStream(fpath)
  res.data.on("end", () => console.log("download completed"))
  res.data.pipe(file)
}

download("http://kelseymcnair.com/Kel's%20Music/iTunes/iTunes%20Music/Podcasts/Naruto%20Soundtrack/21%20Naruto%20Main%20Theme.mp3", "something.mp3")
