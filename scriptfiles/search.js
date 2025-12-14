// SEARCH FUNCTION
function searchProduct() {
  let query = document.getElementById("searchInput").value.toLowerCase();

  switch (query) {
    case "saree":
      window.location.href = "saree.html";
      break;

    case "lehenga":
    case "lehnga":   // <-- added this
      window.location.href = "lehnga.html";
      break;

    case "suit":
      window.location.href = "suit.html";
      break;

    case "gharara":
      window.location.href = "gharara.html";
      break;

    case "anarkali":
      window.location.href = "anarkali.html";
      break;

    default:
      alert("No results found for '" + query + "'");
  }

  return false; // prevent extra reload
}
