const axios = require("axios");
const { JSDOM } = require("jsdom");
const { URL } = require("url");
const fs = require("fs");

const createDownloadDir = pageToVisit => {
  const hostname = new URL(pageToVisit).hostname;
  fs.mkdir("./" + hostname, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Created directory ./" + hostname);
    }
  });
  return hostname;
};

const getPage = pageToVisit => {
  return axios
    .get(pageToVisit)
    .then(response => {
      if (response.status === 200) {
        return response;
      } else {
        console.log("Status Code: " + response.status);
      }
    })
    .catch(error => console.error(error));
};

const parsePage = axiosResponse => {
  const data = axiosResponse.data;
  const dom = new JSDOM(data);
  return dom.window.document.querySelector(cssQuery).querySelector("img").src;
};

const getImage = (absUrl, saveToDir) => {
  const parsedUrl = new URL(absUrl);
  const srcFileName = parsedUrl.pathname.split("/").pop();
  axios({
    method: "get",
    url: parsedUrl.href,
    responseType: "stream"
  })
    .then(response => {
      response.data.pipe(fs.createWriteStream(saveToDir + "/" + srcFileName));
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
