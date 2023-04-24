This is a Web scrapper project using [Node.js](https://nodejs.org/en) and [Cheerio](https://cheerio.js.org/)

## Getting Started

First, install the dependencies:
`npm install`

Second, run the development server:
`node index.js`

## Tasks

- [x] https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc
- [x] either puppeteer/playwright or request-promise for fetching ads Purpose:
- [x] Add getNextPageUrl function to iterate over pages
  - [x] A function that returns url string for iterate over pages
- [x] Add addItems function that fetches item urls + item ids (unique ids that the portal uses) from list page
- [-] Add getTotalAdsCount function - shows how many total ads exist for the provided initial url
  - [x] Find total Truck items in initial page
  - [] Get number advertisements present in the initial url
- [-] Add scrapeTruckItem function - that scrapes the actual ads and parses into the format: item id, title, price, registration date, production date, mileage, power
  - [] Code put in separate function
  - [x] Code implemented
  - [x] Writing data in CSV file
- [] BONUS: scraping via otomoto mobile app.

## Questions/thoughts:

### Ideas for error catching/solving, retry strategies?

```
- Questions

  - For the bonus task, may I get additional time like a day?
  - How to have the code for scrapeTruckItem function as a separate function? IT gives me error whenever I do it.
- Ideas for:

  - error catching/solving
    - Using of debugging tool.

  - retry strategies
    - Break the data down to more smaller chunk size to analyze.
    - For script json data, json file created (for the given url) for crosschecking with js object
```

### Accessing more ads from this link than the limit allows (max 50 pages)?

### Experience with CI/CD tools?

```
I have experience using Selenium with Python.
```

### Other considerations?

```
- Conventions
  - [] Make the comment for author And also add that in description
```

## Resources

- https://stackoverflow.com/questions/28652080/how-to-result-the-contents-of-a-javascript-variable-using-cheerio-jquery-like-s

1.  [Get text in parent without children using cheerio](https://stackoverflow.com/questions/20832910/get-text-in-parent-without-children-using-cheerio)

2.  [Remove Property from an Object](https://www.w3schools.com/howto/howto_js_remove_property_object.aspo)
