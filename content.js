chrome.runtime.onMessage.addListener(recievr);
 
 function recievr(request, sender, sendResponse){
 	const term = document.createElement('div');
 	term.setAttribute('id', 'mynetwork');

 	const body = document.getElementsByTagName('body')[0];
 	body.innerHTML = '';
 	body.appendChild(term);


 	let container = document.getElementById("mynetwork");
	container.style.width = "1920px"
	container.style.height = "1080px"
	container.style.border = "2px solid black";

 	let data = {
 		nodes: JSON.parse(request.nodes), edges: JSON.parse(request.edges)
 	}
 	let options = {
		 nodes: {
			 shape:"dot"
		 },
		 interaction: {
			hideEdgesOnDrag: true,
			width: 0.15
		 }
	 }
 	let network = new vis.Network(container, data, options);
 }