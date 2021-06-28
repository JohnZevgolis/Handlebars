import "bootstrap";
import './index.scss';

if(process.env.NODE_ENV === "development") {
	require('./partials/header.hbs');
	require('./partials/navigation.hbs');
}

$(function() {
	console.log("hi");
})