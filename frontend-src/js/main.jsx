let React = require('react')
let ReactDOM = require('react-dom')
let Formsy = require('formsy-react');
let $ = require ('jquery')
var api_base = 'http://ato-children.herokuapp.com'

var scrollDown = ($target) => {
  $('html, body').animate({
      scrollTop: $target.offset().top
  }, 1000)
}

var WriteLetterButton = React.createClass({
  handleClick: () => {
    ReactDOM.render(
      <LetterForm/>,
      document.getElementById('LetterFormTarget')
    )
    scrollDown($('#LetterFormTarget'))
  },
  render: function(){
    return(
      <div className="button write-letter" onClick={this.handleClick}> Написати </div>
    )
  }
})

var SeeLetterButton = React.createClass({
  handleClick: () => {
    scrollDown($('#LettersTarget'))
  },
  render: function(){
    return(
      <div className="button see-letter" onClick={this.handleClick}> Подарувати </div>
    )
  }
})


var LetterForm = React.createClass({
  getInitialState: function () {
    return {
      canSubmit: false,
      letterText: 'Святий Миколаю, я'
    }
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  submit: function (model) {
    model.letter = this.state.letterText
    console.log(model)
  },
  textDataEntered: function(e){
    this.setState({
      letterText: e.target.value
    })
  },
  regionSelected: function(id){

  },
  render: function(){
    return(
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-common" id="letterform">
        <ValidatedInput type="text"  placeholder="Ім'я" name="name" validationError="Це не схоже на ім'я" required/>
        <ValidatedInput type="text"  placeholder="Номер телефону" name="phone" validations={{matchRegexp: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/}} validationError="Це не схоже на номер телефону" required/>
        <ApiSelect source="/api/regions/" onChange="regionSelected" name="region"/>
        <ValidatedInput type="text" placeholder="Місто/селище" name="city" validationError="Вкажіть назву міста" required/>
        <textarea name="letter" form="letterform" value={this.state.letterText} onChange={this.textDataEntered} required/>
        <button type="submit" disabled={!this.state.canSubmit}>Надіслати листа</button>
      </Formsy.Form>
    )
  }
})

const ValidatedInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          placeholder={this.props.placeholder}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

var ApiSelect = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },
  getInitialState: function(){
    return {results: [], value: 9}
  },
  componentDidMount: function() {
    $.get((api_base + this.props.source), function(result) {
      if (this.isMounted()) {
        this.setState({
          results: result.results
        })
      }
    }.bind(this))
  },
  render: function() {
    return(
       <select defaultValue={9} onChange={this.changeValue}>
         {this.state.results.map(function(result, index) {
            return <option key={result.id} value={result.id}> {result.name} </option>;
         })}
       </select>
    )
  }
});

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
