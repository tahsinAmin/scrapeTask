const fs = require("fs");
const Json2Parser = require("json2csv").Parser;

let trucksData = [];
fs.readFile("./take-3.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  const truck = JSON.parse(jsonString);

  let data = truck["props"]["pageProps"]["urqlState"]["42099054604"]["data"];

  const edges = (JSON.parse(data))["advertSearch"]["edges"];
  console.log("edges =", edges);

  // let pageSize = advertSearch["pageInfo"]["pageSize"];
  // let edges = advertSearch["edges"];

  // for (let i = 0; i < pageSize; i++) {
  //   let id = edges[i]["node"]["id"];
  //   let title = edges[i]["node"]["title"];

  //   trucksData.push({ id, title });
  // }
  // const json2csvParser = new Json2Parser();
  // const csv = json2csvParser.parse(trucksData);
  // fs.writeFileSync(`${__filename}.csv`, csv, "utf-8");
});
