This is a Web scrapper project using [Node.js](https://nodejs.org/en) and [Cheerio](https://cheerio.js.org/)

## Getting Started

First, install the dependencies:
```npm install```

Second, run the development server:
```node index.js```

<!-- # Date of Submission

- 23rd April (3 days remaining) -->

## Tasks

- [] https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc
- [] either puppeteer/playwright or request-promise for fetching ads Purpose:
- [] Add getNextPageUrl function to iterate over pages
  - [x] A function that returns url string for iterate over pages
- [] Add addItems function that fetches item urls + item ids (unique ids that the portal uses) from list page
- [] Add getTotalAdsCount function - shows how many total ads exist for the provided initial url
- [] Add scrapeTruckItem function - that scrapes the actual ads and parses into the format: item id, title, price, registration date, production date, mileage, power
- [] BONUS: scraping via otomoto mobile app.

<!-- # Obstacles

- [] In need of Typescript?
- [] In need of mitmproxy?
- [] Ideas for error catching/solving, retry strategies?
- [] Accessing more ads from this link than the limit allows (max 50 pages)?
- [] Experience with CI/CD tools?
- [] Other considerations?
- [] mobile app scraping

# Tasks Breakdown

- [x] Find number of pages
- [] Add getNextPageUrl function to iterate over pages
  - [x] Add getNextPageUrl function to see if url is created correctly
- [] Array to json file.
- [] Have a for loop and push all the names
- [] Using request-promise as language is JS
- [] Using puppeteer/playwright as language is TS

# Learned

- puppeteer/playwright language is Typescript whereas request-promise language is Javascript -->
