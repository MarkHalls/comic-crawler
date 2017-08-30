const pageToVisit = "http://www.schlockmercenary.com";
const nextPageSelector = "";
const cssQuery = ".strip-image-wrapper";
const nextPage = "";

console.log("visiting page: " + pageToVisit);

const saveTo = createDownloadDir(pageToVisit);

Promise.resolve(getPage(pageToVisit))
  .then(data => parsePage(data))
  .then(img => getImage(img));

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
