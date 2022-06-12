"use strict";

let scrollWidth;

function getScrollWidth(scrollWidth) {
	let div = document.createElement('div');
	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';
	document.body.append(div);
	scrollWidth = div.offsetWidth - div.clientWidth;
	let root = document.documentElement;
	root.style.setProperty('--spacing-end', scrollWidth + 'px');
	div.remove();
}

getScrollWidth(scrollWidth);
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js, .menu-btn-js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js, .menu-btn-js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, {
			passive: true
		});
	},

	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}
	},

	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)

			let link = event.target.closest(".menu-mobile .menu a"); // (1)

			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)

			if (!container && !toggle) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {//-if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},

	animateScroll() {
		$(document).on('click', ".menu-box-js li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");

			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick);
			} else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({
					scrollTop: destination - 120
				}, 0);
				return false;
			}
		});
	}

};
const $ = jQuery;

function eventHandler() {
	JSCCommon.mobileMenu();
	JSCCommon.animateScroll();
	$('.menu-box-js li a').click(function () {
		JSCCommon.closeMenu();
	}); //

	let header = document.querySelector(".header--js");
	let headerH;

	function calcHeaderHeight() {
		if (!header) return;
		document.documentElement.style.setProperty('--header-h', "".concat(header.offsetHeight, "px"));
		headerH = header.offsetHeight;
		window.scrollY > 0 ? header.classList.add('fixed') : header.classList.remove('fixed');
	}

	window.addEventListener('resize', calcHeaderHeight, {
		passive: true
	});
	window.addEventListener('scroll', calcHeaderHeight, {
		passive: true
	});
	calcHeaderHeight(); // var x = window.location.host;
	// let screenName;
	// screenName = document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }
	//

	let hiddenInp = document.querySelector('.from-inp-js');
	let formBtns = document.querySelectorAll('.go-to-form-js');

	for (let btn of formBtns) {
		btn.addEventListener('click', function () {
			console.log(hiddenInp);
			if (!hiddenInp) return;
			hiddenInp.value = this.getAttribute('data-from');
		});
	} //-
	// modal window

}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}