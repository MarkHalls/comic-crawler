const axios = require('axios');
const jsdom = require('jsdom');
const URL = require('url').Url;

const { JSDOM } = jsdom;
// const { URL } = url;
const pageToVisit = "http://www.schlockmercenary.com";
const nextPageSelector = "";
const cssQuery = ".strip-image-wrapper";
const nextPage = "";

console.log("visiting page: " + pageToVisit);


axios.get(pageToVisit)
	.then(response => {
		console.log("Status Code: " + response.status);
		if(response.status === 200) {
			// console.log(response);
			const data = response.data;
			const dom = new JSDOM(data);
			const imgSrc = dom.window.document.querySelector(
				cssQuery).querySelector("img").src;
			const srcFileName = new URL(imgSrc);//.pathname.split("/").pop();
			// const srcFileName = imgSrc.split('/').pop().split('?').shift();	
			// const srcFileName = imgSrc.replace(/(.+)\w+.[jpg|png|gif](.+)/g, "");
			
			console.log(srcFileName);

			console.log(dom.window.document.querySelector(
				".strip-image-wrapper").querySelector("img").src);
			// return { imgSrc, srcFileName }		
		}
	})
	.catch(error => console.error(error));
	
const getImage = (URL, srcFileName) => {
	axios({
		method: 'get',
		url: URL,
		responseType: 'stream'
	})
	  .then(response => {
			response.data.pipe(fs.createWriteStream(srcFileName))
		});
}	
const searchForWord = ($, word) => {
	const bodyText = $('html > body').text();
	if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
		return true;
	}
	return false;
}

const collectInternalLinks = ($) => {
	let allRelativeLinks = [],
			allAbsoluteLinks = [];
	
	const relativeLinks = $("a[href^='/']");
	relativeLinks.each(() => allRelativeLinks.push($(this)
	  .attr('href')));

	const absoluteLinks = $("a[href^='http']");
	absoluteLinks.each(() => allAbsoluteLinks.push($(this).attr('href')));

	console.log("Found " + allRelativeLinks.length + " relative links");
	console.log("Found " + allAbsoluteLinks.length + " absolute links");
}


