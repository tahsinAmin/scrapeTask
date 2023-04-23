const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const { parse } = require("json2csv");

const filePath = "./scrapeTruckItem.csv";

let url =
  "https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc";

let urlUpdated = false;
let initalUrlAdsCount = 0;

const getNextPageUrl = (givenUrl, pageNum) => {
  let concatString = `&page=${pageNum}`;
  if (urlUpdated) {
    return givenUrl.substring(0, givenUrl.indexOf("&page=")) + concatString;
  }
  givenUrl += concatString;
  urlUpdated = true;
  return givenUrl;
};

const scrapeTruckItem = (edgesArray, noOfAds) => {
  const adsData = [];
  for (let j = 0; j < noOfAds; j++) {
    let registrationDate = edgesArray[j]["vas"]["bumpDate"]; // TODO REfine the Data
    let node = edgesArray[j]["node"];
    let id = node["id"];
    let title = node["title"];
    let price = node["price"]["amount"]["units"];

    let productionDate = "",
      mileage = "",
      power = "";
    let parametersArr = node["parameters"];

    for (let k = 0; k < parametersArr.length; k++) {
      let paramItem = parametersArr[k];
      if (paramItem["key"] === "mileage") {
        mileage = paramItem["displayValue"];
      }
      if (paramItem["key"] === "power") {
        power = paramItem["value"];
      }
      if (paramItem["key"] === "year") {
        productionDate = paramItem["value"];
      }
    }

    adsData.push({
      registrationDate,
      id,
      title,
      price,
      productionDate,
      mileage,
      power,
    });
  }

  return adsData;
};

// TODO: Make a helper function ExportToCSV
const exportToCsvFile = (fPath, data) => {
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

const getTotalAdsCount = () => {
  return initalUrlAdsCount;
};

const fetch_data = async () => {
  try {
    let i = 1, maxPages = 1;
    do {
      console.log("=> url =", url);
      const response = await request({
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
      let advertSearch = JSON.parse(data)["advertSearch"];
      let pageSize = advertSearch["pageInfo"]["pageSize"];

      if (i == 1) {
        // Finding out maximum number of pages
        initalUrlAdsCount = pageSize;

        maxPages = parseInt(
          $("li.pagination-item > a > span").eq(-1).text().trim()
        );
        console.log("=> Total Ads in Initial URL =", getTotalAdsCount());
        console.log("=> maxPages =", maxPages);
      }

      let edges = advertSearch["edges"];
      let ads = scrapeTruckItem(edges, pageSize);

      exportToCsvFile(filePath, ads);

      url = getNextPageUrl(url, i + 1); // TODO: Refactor code

      i++;
    } while (i <= maxPages);
  } catch (e) {
    console.log(e);
  }
};

fetch_data();
