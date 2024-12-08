const projectName = 'random-quote-machine'

let colors=['yellow','#27ae60','#2c3e50','#f39c12','#e74c3c','#9b59b6','#FB6964','#342224','#472E32','#BDBB99','#77B1A9','#73A857']
let currentQuote='',currentAuthor=''

let quotesData
function getQuotes() {
  return $.ajax({
    headers: {Accept: 'application/json'},
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(jsonQuotes){if(typeof jsonQuotes==='string')quotesData=JSON.parse(jsonQuotes)}})
}

function getRandomQuote(){return quotesData.quotes[Math.floor(Math.random()*quotesData.quotes.length)]}

function getQuote() {
  let randomQuote = getRandomQuote()

  currentQuote = randomQuote.quote
  currentAuthor= randomQuote.author
  //#10:click #tweet-quote anchor element to tweet current quote.This anchor element include "twitter.com/intent/tweet" path in its href attribute
  $('#tweet-quote').attr('href','https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+      encodeURIComponent('"'+currentQuote+'" '+currentAuthor)
  )
  $('.quote-text').animate({opacity:0},500,function(){$(this).animate({opacity:1},500);$('#text').text(randomQuote.quote)})
  $('.quote-author').animate({ opacity:0},500,function(){$(this).animate({ opacity:1},500);$('#author').html(randomQuote.author)})

  let color = Math.floor(Math.random() * colors.length)
  $('html body').animate({backgroundColor: colors[color],color: colors[color]},1000)
  $('.button').animate({backgroundColor: colors[color]},1000)
}

$(document).ready(function(){
  getQuotes().then(()=>getQuote())//#6,7:On first load,displays a random quote in element id="text",author in element id="author"
  $('#new-quote').on('click', getQuote)//#8,9: When #new-quote button is clicked,fetch new quote and display it in #text element
})