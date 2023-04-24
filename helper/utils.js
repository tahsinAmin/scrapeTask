/*
 * Title: Helper functions
 * Description: Utility Helper functions for code reuasbility for future use.
 * Author: Muhammad Tahsin Amin
 * Date: 2023.04.24
 *
 */

const fs = require("fs");
const { parse } = require("json2csv");

let request = require("request-promise");
let cheerio = require("cheerio");

let urlUpdated = false;

// Utils object - Module scaffolding
const utils = {};

// Takes file path to write or append in CSV file
utils.exportToCsvFile = (fPath, data) => {
  if (fs.existsSync(fPath)) { // [3]
    console.log("File exist");
    let csv = parse(data, { header: false });
    fs.appendFileSync(fPath, "\r\n");
    fs.appendFile(fPath, csv, (err) => {
      if (err) console.error("Couldn't append the data");
      console.log("The data was appended to file!");
    });
  } else {
    let csv = parse(data, { header: true });
    console.log("File Doesn't exist");
    fs.writeFileSync(fPath, csv, "utf-8");
  }
};

// Generate Next Page URL by the current url and next page number
utils.getNextPageUrl = (givenUrl, pageNum) => {
  let concatString = `&page=${pageNum}`;
  if (urlUpdated) {
    return givenUrl.substring(0, givenUrl.indexOf("&page=")) + concatString;
  }
  givenUrl += concatString;
  urlUpdated = true;
  return givenUrl;
};

utils.addItems = (edgesArray) => {
  const itemsData = [];
  try {
    for (let j = 0; j < edgesArray.length; j++) {
      let node = edgesArray[j]["node"];
      let id = node["id"];
      let url = node["url"];

      itemsData.push({
        id,
        url,
      });
    }
  } catch (e) {
    console.log(e);
  }

  return itemsData;
};

utils.scrapeTruckItem = async (items) => {
  let adsData = [],
    item = {};
  for (let m = 0; m < items.length; m++) {
    item = items[m];
    item["registrationDate"] = "";
    item["productionDate"] = "";
    item["title"] = "";
    item["price"] = "";
    item["mileage"] = "";
    item["power"] = "";
    // console.log(item.url);
    truckItemResponse = await request({
      uri: item["url"],
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
    });
    $ = cheerio.load(truckItemResponse);

    $("div#parameters ul li").each((i, elm) => {
      let label = $(elm).children("span").text().trim();
      let value = $(elm).children("div").text().trim();

      // TODO: Code Refactor here.
      if (label.startsWith("Data pierwszej rejestracji")) {
        item["registrationDate"] = value;
      } else if (label.startsWith("Rok produkcji")) {
        item["productionDate"] = value;
      } else if (label.startsWith("Przebieg")) {
        item["mileage"] = value;
      } else if (label.startsWith("Moc")) {
        item["power"] = value;
      }
    });

    item["title"] = $("span.offer-title.big-text.fake-title").text().trim();
    item["price"] = $("div.wrapper span.offer-price__number")
      .contents()
      .first()
      .text()
      .trim()
      .replace(" ", ""); // [1]

    delete item["url"]; // [2]
    adsData.push(item);
  }
  return adsData;
};

// Export the library
module.exports = utils;
