export default function getNode(html) {
  var div = document.createElement('div');
  div.innerHTML = html.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild; 
}