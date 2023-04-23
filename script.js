const loader = document.getElementById("loader");

const quoteContainer = document.getElementById("quote-placeholder");

const randomQuoteButton = document.querySelector(".random-btn");

const getQuoteByAuthorBtn = document.querySelector(".quote-author-btn");

let currentAuthor = "";

const createQuotes = (quotesArr) => {
  const quotesHtmlNodes = quotesArr.map((quote) => {
    const quoteBox = document.createElement("p");
    quoteBox.classList.add("quote");
    quoteBox.textContent = `“${quote.content}”`;
    return quoteBox;
  });

  loader.style.display = "none";
  quoteContainer.append(...quotesHtmlNodes);
  if (quotesArr.length === 1) {
    const { author, authorSlug, tags } = quotesArr[0];
    currentAuthor = authorSlug;
    getQuoteByAuthorBtn.innerHTML = `<span><p>${author}</p><span>${tags[0]}</span></span> <span class="arrow">&#10142;</span>`;
    getQuoteByAuthorBtn.style.display = "flex";
  }
  randomQuoteButton.style.display = "flex";
};

const clearExistingQuote = () => {
  quoteContainer.replaceChildren();
  loader.style.display = "block";
  getQuoteByAuthorBtn.style.display = "none";
  randomQuoteButton.style.display = "none";
};

const getRandomQuote = async () => {
  try {
    clearExistingQuote();
    const res = await fetch("https://api.quotable.io/random?minLength=100");
    const data = await res.json();

    console.log(data);
    const quotesArr = [data];
    if (quotesArr.length) {
      createQuotes(quotesArr);
    }
  } catch (error) {
    console.log(error);
  }
};

const getQuoteByAuthor = async () => {
  try {
    clearExistingQuote();
    const res = await fetch(
      `https://api.quotable.io/quotes?author=${currentAuthor}&limit=5`
    );
    const data = await res.json();
    const quotesArr = data?.results;
    console.log(quotesArr);
    if (quotesArr.length) {
      createQuotes(quotesArr);
    }
  } catch (error) {
    console.log(error);
  }
};

randomQuoteButton.addEventListener("click", getRandomQuote);
getQuoteByAuthorBtn.addEventListener("click", getQuoteByAuthor);

window.onload = getRandomQuote;
