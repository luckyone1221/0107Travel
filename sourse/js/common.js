//const $ = jQuery;
function eventHandler() {
	// var x = window.location.host;
	// let screenName;
	// screenName = document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }

	let sDestinations = new Swiper('.sDestinations-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
	});


};

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}