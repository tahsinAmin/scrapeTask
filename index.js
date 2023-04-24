/*
 * Title: Sraping Project
 * Description: A Sraping Project only for www.otomoto.pl site
 * Author: Muhammad Tahsin Amin
 * Date: 2023.04.17
 *
 */

const request = require("request-promise"); 
const cheerio = require("cheerio");
const utils = require("./helper/utils");

const filePath = "./scrapeTruckItem.csv";

let url =
  "https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc";
let initalUrlAdsCount = 0;

const getTotalAdsCount = () => {
  return initalUrlAdsCount;
};

const fetch_data = async () => {
  try {
    let i = 1,
      maxPages = 1;
    do {
      console.log("=> url =", url);

      let response = await request({
        url,
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        },
      });

      let $ = cheerio.load(response);

      let jsonData = JSON.parse($("script#__NEXT_DATA__").text());

      let urqlState = jsonData["props"]["pageProps"]["urqlState"];

      let data = "";
      for (var prop in urqlState) {
        if (prop === "-2580735814") {
          continue;
        }
        data = urqlState[prop]["data"];
      }
      if (data) {
        let advertSearch = JSON.parse(data)["advertSearch"];
        if (i == 1) {
          initalUrlAdsCount = advertSearch["pageInfo"]["pageSize"];

          maxPages = parseInt(
            $("li.pagination-item > a > span").eq(-1).text().trim()
          );
          console.log("=> Total Ads in Initial URL =", getTotalAdsCount());
          console.log("=> maxPages =", maxPages);
        }

        let edges = advertSearch["edges"];
        let truckItems = utils.addItems(edges);

        let ads = await utils.scrapeTruckItem(truckItems);
        utils.exportToCsvFile(filePath, ads);
      }
      url = utils.getNextPageUrl(url, i + 1); // TODO: Refactor code
      i++;
    } while (i <= maxPages);
  } catch (e) {
    console.log(e);
  }
};

fetch_data();
