const addImportLink = (url, cssSelector) => {
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
      .querySelector(cssSelector)
      .querySelector("img").src;
    const next = event.target.import.querySelector(".next-strip");
    console.log("imgSrc: " + imgSrc);
    chrome.downloads.download({
      url: new URL(imgSrc, domain),
      filename: domain + "/" + srcFileName
    });
    event.target.remove();
    console.log("removed link");
    addImportLink(next, cssSelector);
  });
  console.log("linking: " + url);
  document.head.insertBefore(link, null);
  return link;
};
