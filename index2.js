const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

let url =
  "https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc&page=12";

const fetch_data = async () => {
  try {
    const response = await request({
      url,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
    });
    let $ = await cheerio.load(response);

    let jsonData = JSON.parse($("script#__NEXT_DATA__").text());

    let urqlState = jsonData["props"]["pageProps"]["urqlState"];

    let data = "";
    for (var prop in urqlState) {
      if (prop === "-2580735814") {
        continue;
      }
      data = urqlState[prop]["data"];
    }
    let advertSearch = JSON.parse(data)["advertSearch"];
    let pageSize = advertSearch["pageInfo"]["pageSize"];
    let edges = advertSearch["edges"];
  } catch (e) {
    console.log(e);
  }
};

fetch_data();