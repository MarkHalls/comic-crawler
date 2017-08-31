const addImportLink = (url, cssQuery) => {
  const link = document.createElement("link");
  link.rel = "import";
  link.href = url;
  link.addEventListener("onerror", error => {
    console.error(error);
    setNextPage("");
  });
  link.addEventListener("load", event => {
    const domain = new URL(url);
    const imgSrc = event.target.import
      .querySelector(cssQuery)
      .querySelector("img").src;
    setNextPage(event.target.import.querySelector(".next-strip"));
    console.log("imgSrc: " + imgSrc);

    // chrome.downloads.download({
    //   url: new URL(imgSrc, domain),
    //   filename: domain + "/" + srcFileName
    // });
    event.target.remove();
    console.log("removed link");
  });

  console.log("linking: " + url);
  document.head.insertBefore(link, null);
  return link;
};

const setNextPage = absoluteUrl => {
  nextPage = absoluteUrl;
};

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
