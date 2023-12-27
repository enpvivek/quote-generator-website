console.log("test ....");

// Initialize variables
let quoteArr;
const API_KEY = "ykK8OkbyBc4o+ceygp+knA==etGb6nZH6QpBYmxZ";
const API_URL = "https://api.api-ninjas.com/v1/quotes";
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const tweetBtn = document.getElementById("twitterBtn");
const refreshQuoteBtn = document.getElementById("refreshQuote");
const loaderBox = document.getElementById("loader-box");
const quoteBox = document.getElementById("quote-box");

// Show Function
function loading() {
  loaderBox.style.display = "block";
  quoteBox.style.display = "none";
}

// Hide Loading
function complete() {
  loaderBox.style.display = "none";
  quoteBox.style.display = "block";
}

// Getting Date from API
async function getQuotes() {
  loading();
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    quoteArr = await response.json();
    quoteText.textContent = quoteArr[0].quote;
    quoteAuthor
      ? (quoteAuthor.textContent = quoteArr[0].author)
      : (quoteAuthor.textContent = "Unknown");
    complete();
    // console.log(quoteArr);
    // console.log(quoteArr[0].quote);
    // // console.log(quoteArr[0].author);
  } catch (error) {
    console.log("Error fetching quotes:", error);
  }
}

// Tweet Quotes
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Addinng event Listener to newQuote & Tweet Button
refreshQuoteBtn.addEventListener("click", getQuotes);
tweetBtn.addEventListener("click", tweetQuote);

getQuotes();

loading();
