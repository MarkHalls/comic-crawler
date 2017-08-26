const axios = require("axios");
const { JSDOM } = require("jsdom");
const { URL } = require("url");

const pageToVisit = "http://www.schlockmercenary.com";
const nextPageSelector = "";
const cssQuery = ".strip-image-wrapper";
const nextPage = "";

console.log("visiting page: " + pageToVisit);

const getPage = pageToVisit => {
  let imgSrc = "";
  axios
    .get(pageToVisit)
    .then(response => {
      console.log("Status Code: " + response.status);
      if (response.status === 200) {
        const data = response.data;
        const dom = new JSDOM(data);
        imgSrc = dom.window.document
          .querySelector(cssQuery)
          .querySelector("img").src;
        console.log(imgSrc);
      }
    })
    .catch(error => console.error(error));
  console.log("test" + imgSrc);
  return imgSrc;
};

const getImage = relativeURL => {
  const srcFileName = new URL(relativeURL, pageToVisit).pathname
    .split("/")
    .pop();
  console.log(relativeURL);
  axios({
    method: "get",
    url: relativeURL,
    responseType: "stream"
  })
    .then(response => {
      response.data.pipe(fs.createWriteStream(srcFileName));
    })
    .catch(err => console.error(err));
};

const searchForWord = ($, word) => {
  const bodyText = $("html > body").text();
  if (bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    return true;
  }
  return false;
};

const collectInternalLinks = $ => {
  let allRelativeLinks = [],
    allAbsoluteLinks = [];

  const relativeLinks = $("a[href^='/']");
  relativeLinks.each(() => allRelativeLinks.push($(this).attr("href")));

  const absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(() => allAbsoluteLinks.push($(this).attr("href")));

  console.log("Found " + allRelativeLinks.length + " relative links");
  console.log("Found " + allAbsoluteLinks.length + " absolute links");
};

getPage(pageToVisit);
