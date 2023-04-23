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
- [] Add addItems function that fetches item urls + item ids (unique ids that the portal uses) from list page
- [x] Add getTotalAdsCount function - shows how many total ads exist for the provided initial url
- [x] Add scrapeTruckItem function - that scrapes the actual ads and parses into the format: item id, title, price, registration date, production date, mileage, power
  - [x] Writing data in CSV file
- [] BONUS: scraping via otomoto mobile app.

## Questions/thoughts:

### Ideas for error catching/solving, retry strategies?

```
- Questions

  - For the bonus task, may I get additional time like a day?
  - Do I need to add Command Line Arguments feature for the functions, "scrapeTruckItem" & "addItems"?

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
- getTotalAdsCount function
  - I have been working with total ads for every page regardless. But since the requirements asked for the initial page only, I created a variable to save the value for the first url only and returning the value.
```