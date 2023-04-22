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

    fs.writeFileSync("newData2.json", JSON.stringify(jsonData), "utf8");

    let jsonString = fs.readFileSync("./newData2.json", "utf8");

    let data =
      JSON.parse(jsonString)["props"]["pageProps"]["urqlState"]["55239821566"][
        "data"
      ];
    let edges = JSON.parse(data)["advertSearch"]["edges"];
    console.log("edges =", edges);
    console.log("Json file to arrray");
  } catch (e) {
    console.log(e);
  }
};

fetch_data();
