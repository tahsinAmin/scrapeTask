const fs = require("fs");
fs.readFile("./take-2.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  const truck = JSON.parse(jsonString);
  let advertSearch = truck["props"]["pageProps"]["urqlState"]["42099054604"]["data"]["advertSearch"];
  let pageSize = advertSearch["pageInfo"]["pageSize"];
  let edges = advertSearch["edges"];
  console.log(pageSize);    
  console.log();
  console.log(edges);    

});