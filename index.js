let currentPage = "https://www.schlockmercenary.com/2017-08-29";
let nextPage = "https://www.schlockmercenary.com/2017-08-29";

let nextPageSelector = "";
let cssQuery = ".strip-image-wrapper";
let timeToSleep = 1000;
const entry = async () => {
  do {
    console.log("nextPage: " + nextPage);
    addImportLink(nextPage, cssQuery);
    await sleep(timeToSleep);
    if (currentPage === nextPage) {
      timeToSleep += 500;
    }
  } while (nextPage);
};

entry();
