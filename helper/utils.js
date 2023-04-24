/*
 * Title: Helper functions
 * Description: Utility Helper functions for code reuasbility for future use.
 * Author: Muhammad Tahsin Amin
 * Date: 2023.04.24
 *
 */

const fs = require("fs");
const { parse } = require("json2csv");

const request2 = require("request-promise");
const cheerio2 = require("cheerio");

let urlUpdated = false;

// Utils object - Module scaffolding
const utils = {};

// Takes file path to write or append in CSV file
utils.exportToCsvFile = (fPath, data) => {
  if (fs.existsSync(fPath)) {
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

utils.ScrapeTruckItem = async (truckItems) => {
  console.log(truckItems);
  let ads = [];
  for (let m = 0; m < 2; m++) {
    truckItems[m]["registrationDate"] = "";
    truckItems[m]["productionDate"] = "";
    truckItems[m]["title"] = "";
    truckItems[m]["price"] = "";
    truckItems[m]["mileage"] = "";
    truckItems[m]["power"] = "";
    let url2 = truckItems[m].url;
    console.log(url2);
    let response2 = await request2({
      uri: url2,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
    });

    $ = cheerio2.load(response2);
    $("div#parameters ul li").each((i, elm) => {
      let label = $(elm).children("span").text().trim();
      let value = $(elm).children("div").text().trim();
      // TODO: Code Refactor here.
      if (label.startsWith("Data pierwszej rejestracji")) {
        truckItems[m]["registrationDate"] = value;
      } else if (label.startsWith("Rok produkcji")) {
        truckItems[m]["productionDate"] = value;
      } else if (label.startsWith("Przebieg")) {
        truckItems[m]["mileage"] = value;
      } else if (label.startsWith("Moc")) {
        truckItems[m]["power"] = value;
      }
    });

    truckItems[m]["title"] = $("span.offer-title.big-text.fake-title")
      .text()
      .trim();
    truckItems[m]["price"] = $("div.wrapper span.offer-price__number")
      .contents()
      .first()
      .text()
      .trim()
      .replace(" ", ""); // [1]

    delete truckItems[m]["url"]; // [2]

    ads.push(truckItems[m]);
  }
  return ads;
};

// Export the library
module.exports = utils;
