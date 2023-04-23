const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

let url =
  "https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc";

var ads = {
  table: []
};

let urlUpdated = false

const finishFunction = () => {
  console.log("Task Complete");
}

const getNextPageUrl = (givenUrl, pageNum) => {
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
    let lastPageNumber = 2;
    
    for (let i = 1; i <= lastPageNumber; i++) {
        let res = await axios.get(url);
        let $ = await cheerio.load(res.data);

        $("div.ooa-1nihvj5.eayvfn615 > h2 > a").each((i, e) => {
            let title = $(e).text().trim();
            ads.table.push({title});
        });
        console.log("=> url =", url)
        url = getNextPageUrl(url, i+1)
    }

    fs.writeFile('adsJSON.json', JSON.stringify(ads), 'utf8', finishFunction);

  } catch (e) {
    console.log(e);
  }
};

fetch_data();

const app = express();
const port = process.env.PORT || 5000;


app.listen(port, () => console.log("Server Running"));
