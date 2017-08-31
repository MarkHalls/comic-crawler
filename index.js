let nextPage = "https://www.schlockmercenary.com/2017-08-29";
let nextPageSelector = "";
let cssQuery = ".strip-image-wrapper";
// do {
console.log("nextPage: " + nextPage);
let x = addImportLink(nextPage, cssQuery);
console.log(x);
// } while (nextPage);
// removeImportLink(pageToVisit);
// axios({
//   method: "get",
//   url: parsedUrl.href,
//   responseType: "stream"
// })
//   .then(response => {
//     response.data.pipe(fs.createWriteStream(saveToDir + "/" + srcFileName));
//   })
//   .catch(err => console.error(err));

// Promise.resolve(getPage(pageToVisit))
//   .then(data => parsePage(data))
//   .then(img => getImage(img));

// 	if (document.addEventListener){
//     document.addEventListener("click", function(event){
//         var targetElement = event.target || event.srcElement;
//         console.log(targetElement);
//     });
// } else if (document.attachEvent) {
//     document.attachEvent("onclick", function(){
//         var targetElement = event.target || event.srcElement;
//         console.log(targetElement);
//     });
// }
