
// API endpoint for random quotes
const API_URL = 'https://api.quotable.io/random';

// DOM elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

// Function to fetch random quote from API
async function fetchRandomQuote() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return {
      text: data.content,
      author: data.author
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    // Fallback quote in case of API error
    return {
      text: "Η μόνη αληθινή σοφία είναι να ξέρεις ότι τίποτα δεν ξέρεις.",
      author: "Σωκράτης"
    };
  }
}

// Function to display new quote
async function displayNewQuote() {
  // Disable button temporarily to prevent multiple requests
  newQuoteBtn.disabled = true;
  newQuoteBtn.textContent = 'Φορτώνει...';
  
  // Add fade out effect
  quoteText.style.opacity = '0';
  quoteAuthor.style.opacity = '0';
  
  try {
    const quote = await fetchRandomQuote();
    
    setTimeout(() => {
      quoteText.textContent = `"${quote.text}"`;
      quoteAuthor.textContent = `- ${quote.author}`;
      quoteText.style.opacity = '1';
      quoteAuthor.style.opacity = '1';
      
      // Re-enable button
      newQuoteBtn.disabled = false;
      newQuoteBtn.textContent = 'New Quote';
    }, 200);
  } catch (error) {
    console.error('Error displaying quote:', error);
    // Re-enable button even if there's an error
    newQuoteBtn.disabled = false;
    newQuoteBtn.textContent = 'New Quote';
  }
}

// Event listener for the button
newQuoteBtn.addEventListener('click', displayNewQuote);

// Add CSS transitions for fade effect
quoteText.style.transition = 'opacity 0.3s ease';
quoteAuthor.style.transition = 'opacity 0.3s ease';

// Display random quote on page load
window.addEventListener('load', () => {
  setTimeout(displayNewQuote, 500);
});
