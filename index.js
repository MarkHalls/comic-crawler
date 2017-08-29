const pageToVisit = "http://www.schlockmercenary.com";
const nextPageSelector = "";
const cssQuery = ".strip-image-wrapper";
const nextPage = "";

console.log("visiting page: " + pageToVisit);

const saveTo = createDownloadDir(pageToVisit);

Promise.resolve(getPage(pageToVisit))
  .then(data => parsePage(data))
  .then(img => getImage(img));
