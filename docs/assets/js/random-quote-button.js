document.addEventListener('DOMContentLoaded', function () {
    function setupQuoteButtons() {
        const randomBtn = document.querySelector('#random-quote-btn');
        const twitterShareButton = document.querySelector('#twitter-share-button');
        const quoteButtonsExist = randomBtn !== null && twitterShareButton !== null;

        if (quoteButtonsExist) {
            randomBtn.addEventListener('click', () => {
                const quoteContainers = document.querySelectorAll('.quote-container');
                const randomQuoteContainersIndex = Math.floor(Math.random() * quoteContainers.length);
                const quotes = quoteContainers[randomQuoteContainersIndex].querySelectorAll('blockquote');
                const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomQuoteIndex].innerHTML;
                const quoteDisplay = document.querySelector('#random-quote-display');
                quoteDisplay.innerHTML = randomQuote;
            });

            twitterShareButton.addEventListener('click', () => {
                const quoteElement = document.querySelector('#random-quote-display p');
                const quoteText = quoteElement.innerText;
                const authorElement = document.querySelector('#random-quote-display cite');
                const authorName = authorElement.innerText;
                const encodedQuoteText = encodeURIComponent(`${quoteText}\n\n-${authorName}`);
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedQuoteText}`;
                window.open(twitterUrl);
            });
        }
    }

    setupQuoteButtons();
});