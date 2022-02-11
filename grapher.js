chrome.history.onVisited.addListener(newLinkClicked);
chrome.tabs.onActivated.addListener(changedTab);
chrome.browserAction.onClicked.addListener(buttonClicked);


var currentTab;
const graph = {};
var urlToID = {};
var newGraph = [], allNodes, nodes, edges, container, data, options, network;
function newLinkClicked(wht){
    graph[currentTab] = [...graph[currentTab]||[], wht.url];
    currentTab = wht.url;
}

function changedTab(thing){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs){
        currentTab = tabs[0].url;
    })
}

function buttonClicked(tab){
    allNodes = [...new Set([...Object.keys(graph), ...Object.keys(graph).map(x=>graph[x]).reduce((x,y)=>[...x, ...y], [])])].map((x, i)=>({id: i + 1, label: x, group: 10*Math.random()|0}));
    for(var t_ of allNodes){
        urlToID[t_.label] = t_.id; 
    }

    let seen = {};
    newGraph = [];
    for(var t in graph){
      seen[urlToID[t]] = new Set();
        for(var s of graph[t]){
          if(urlToID[t] != urlToID[s] && !seen[urlToID[t]].has(urlToID[s])){
            newGraph.push({from: urlToID[t], to: urlToID[s], arrows: {
              to: {
                enabled: true,
                type: "arrow"
              }
            } });
            seen[urlToID[t]].add(urlToID[s]);
          }
        }
    }
    nodes = new vis.DataSet(allNodes);
    console.log(edges)
    edges = new vis.DataSet(newGraph);
    container = document.getElementById("mynetwork");

    let data = {
      nodes: JSON.stringify(allNodes),
      edges: JSON.stringify(newGraph)
    };
    chrome.tabs.sendMessage(tab.id, data)
}

