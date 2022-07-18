const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

// Show Loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden= true;
}

// Hide Loading

function complete() {
    quoteContainer.hidden= false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick A Random Quotes From apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // const localquote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // Check if Author field is blank, and replace it with unknown
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }

    // Check if quote length ,=is long
    if(quote.text > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }

    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch (apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){
        // Catch Error
    }
}


// Tweet Quote

function tweetQuote (){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);

twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuotes();

// Locally Calling Quotes from Local JS file

// newQuote();