let React = require('react')
let ReactDOM = require('react-dom')
let $ = require ('jquery')
var api_base = 'some-url'

var scrollDown = ($target) => {
  $('html, body').animate({
      scrollTop: $target.offset().top
  }, 1000)
}

var WriteLetterButton = React.createClass({
  handleClick: () => {

  },
  render: function(){
    return(
      <div className="button write-letter" onClick={this.handleClick}> Написати </div>
    )
  }
})

var SeeLetterButton = React.createClass({
  handleClick: () => {

  },
  render: function(){
    return(
      <div className="button see-letter" onClick={this.handleClick}> Подарувати </div>
    )
  }
})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <WriteLetterButton/>,
    document.getElementById('writeLetterTarget')
  )
  ReactDOM.render(
    <SeeLetterButton/>,
    document.getElementById('seeLetterTarget')
  )
})
