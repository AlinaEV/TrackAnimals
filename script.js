function showText (el) {
	if(el.previousElementSibling.clientHeight === 80) {
		el.previousElementSibling.style.height = "100%";
		el.innerHTML = "Згорнути...";
	} else {
		el.previousElementSibling.style.height = "80px";
		el.innerHTML = "Розгорнути...";
	}
};
