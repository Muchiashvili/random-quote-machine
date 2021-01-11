import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let quoteData;
let currentColor;

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#77B1A9',
  '#73A857'
];

export default class QuotesAPI extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        currentQuote: '',
        currentAuthor: ''
      };
      this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    const response = await fetch(url);
    quoteData = await response.json();
    const randomQuote = quoteData.quotes[Math.floor(Math.random() * (quoteData.quotes.length + 1))];
    const color = colors[Math.floor(Math.random() * colors.length)];
    currentColor = color;
    this.setState({
      currentQuote: randomQuote.quote,
      currentAuthor: randomQuote.author
    })
  }

  handleClick() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    currentColor = color;
    const randomQuote = quoteData.quotes[Math.floor(Math.random() * (quoteData.quotes.length + 1))];
    this.setState({
      currentQuote: randomQuote.quote,
      currentAuthor: randomQuote.author
    });
    
  }
  render() {
    return (
      <div id='quote-box' style={{backgroundColor: currentColor}}>
        <div className='info-box'>
          <div className="quote">
            <span
            id="text" 
            style={{color: currentColor}}
            >
              <i class="fa fa-quote-left"></i> {this.state.currentQuote}
            </span>
          </div>
          <div className="author">
            <p 
            id="author" 
            style={{color: currentColor}}
            >
              - {this.state.currentAuthor}
            </p>
          </div>
          <div className="button">

            <a 
            href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + this.state.currentQuote + '" ' + this.state.currentAuthor)}
        id="tweet-quote" 
        className="fa fa-twitter"
        target="_blank"
        rel="noreferrer"></a>

            <a href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(this.state.author) +
        '&content=' +
        encodeURIComponent(this.state.currentQuote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'}
            id="tumb-quote" 
            className="fa fa-tumblr"
            target="_blank"
            rel="noreferrer"></a>

            <button 
            id="new-quote" 
            onClick={this.handleClick}
            style={{backgroundColor: currentColor}}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<QuotesAPI />, document.getElementById("root"))