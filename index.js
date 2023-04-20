const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

let url =
  "https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc";
// https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc&page=2
let states = [];
let urlUpdated = false

const getNextPageUrl = (givenUrl, pageNum) => {
    console.log("Pagenum =", )
    let concatString = `&page=${pageNum}`;
    if (urlUpdated) {
        return givenUrl.substring(0, givenUrl.indexOf("&page=")) + concatString
    }
    givenUrl += concatString
    urlUpdated = true
    return givenUrl
}

const fetch_data = async () => {
  try {
    // let res = await axios.get(url);
    // let $ = await cheerio.load(res.data);

    // GETS THE ITEMS' TITLE ONLY AS ARRAY
    // $(
    //     "div.ooa-1nihvj5.eayvfn615 > h2 > a"
    // ).each((i, e) => {
    //     states.push($(e).text().trim());
    // });

    // CONSOLE LOGS THE LAST NUMBER OF THE PAGINATION
    // let lastPageNumber = $(
    //     "li.pagination-item > a > span"
    // ).eq(-1).text().trim()

    // console.log("=> lastPageNumber =", lastPageNumber)

    // GIVING A DUMMY VALUE JUST TO SEE IF IT WORKS.
    let lastPageNumber = 3;
    console.log("=> url =", url)
    for (let i = 1; i <= lastPageNumber; i++) {
        // let res = await axios.get(url);
        // let $ = await cheerio.load(res.data);

        // $("div.ooa-1nihvj5.eayvfn615 > h2 > a").each((i, e) => {
        //     states.push($(e).text().trim());
        // });
        url = getNextPageUrl(url, i+1)
    }
  } catch (e) {
    console.log(e);
  }
  console.log("Finish");
};

fetch_data();

const app = express();
const port = process.env.PORT || 5000;

app.get("/states", (req, res) => {
  res.send(states);
});

app.listen(port, () => console.log("Server Running"));
