const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://sheltered-spire-87370.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);         //per usare cors, creare un url combinato dei due url: await fetch(proxyUrl + apiUrl)
        const data = await response.json();
        if (data.quoteAuthor === '') {                 //se l'autore è vuoto, scrive sconosciuto
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120) {                //se la quote è troppo lunga, diminuisce la font size del testo
            quoteText.classList.add('long-quote');         //accede al css e aggiunge la class long-quote
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (error) {
        console.log(error);
        //getQuote();    //spesso da' errore xk l'api magari usa caratteri speciali. Bisognerebbe creare un contatore dove arrivato a es. 10 loop smette di funzionare e manda msg di errore all'utente
    }
}



//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;      //crea un url dinamico con i dati ricevuti dall'api delle quote
    window.open(twitterUrl, '_blank');                //apre nuova finestra con l'url del tweet 
};

//Buttons Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
