"use strict";
const addImportLink = (url, cssSelector) => {
  const link = document.createElement("link");
  link.rel = "import";
  link.href = url;
  link.addEventListener("error", error => {
    console.error(error);
  });
  link.addEventListener("load", event => {
    const domain = new URL(url);
    const imgSrc = event.target.import
      .querySelector(cssSelector)
      .querySelector("img").src;
    const srcFileName = new URL(imgSrc).pathname.split("/").pop();
    console.log(srcFileName);
    const next = event.target.import.querySelector(cssSelector);
    const myfilename = domain.hostname + "/" + srcFileName;
    chrome.downloads.download({
      url: new URL(imgSrc, domain).href,
      filename: myfilename
    });
    event.target.remove();
    link.removeEventListener("load", event);
    link.removeEventListener("error", event);
    addImportLink(next, cssSelector);
  });
  console.log("linking: " + url);
  document.head.insertBefore(link, null);
  return link;
};
