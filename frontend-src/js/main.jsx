let React = require('react')
let ReactDOM = require('react-dom')
let Formsy = require('formsy-react');
let $ = require ('jquery')
var api_base = 'http://ato-children.herokuapp.com'
// var api_base = 'http://192.168.1.184:8080'

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
    scrollDown($('#lettersTarget'))
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
    model.tel.replace(/[^\d]/gi, '').replace(/^3?8/gi, '')
    $.ajax({
      method: "POST",
      url: (api_base + '/api/gifts/'),
      data: model
    })
    .done(function( msg ) {
      alert("Send");
    });
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
        <ValidatedInput type="text"  placeholder="Ім'я" name="mom" validationError="Це не схоже на ім'я" required/>
        <ValidatedInput type="text"  placeholder="Номер телефону" name="tel" validations={{matchRegexp: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/}} validationError="Це не схоже на номер телефону" required/>
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
})

var Letters = React.createClass({
  getInitialState: function(){
    return {results: []}
  },
  loadMoreLetters: function(){
    var url = api_base + this.props.source
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({
          results: $.merge(this.state.results, result.results),
        })
      }
    }.bind(this))
  },
  componentDidMount: function() {
    this.loadMoreLetters()
  },
  render: function(){
    return(
      <div>
        <Regions source="/api/regions/"/>
        {this.state.results.map(function(result, index){
          return <Letter key={index} data={result}/>;
        })}
      </div>
    )
  }
})

var Letter = React.createClass({
  handleClick: function(){
    ReactDOM.render(
      <Popup data={this.props.data.id}/>,
      document.getElementById('popupTarget')
    )
  },
  render: function(){
    return(
      <div className="letter" key={this.props.data.id}>
        <div className="location">
          <i className="fa fa-map-marker"></i>
           <span> {this.props.data.region_text}, {this.props.data.city} </span>
        </div>
        <div className="letter-text">
          {this.props.data.letter}
        </div>
        <div className="button-accept-letter" onClick={this.handleClick}>
          <i className="fa fa-gift"></i>
          Я зможу дістати подарунки
        </div>
      </div>
    )
  }
})

// Regions

var Regions = React.createClass({
  getInitialState: function(){
    return {results: []}
  },
  componentDidMount: function() {
    $.get((api_base + this.props.source), function(result) {
      if (this.isMounted()) {
        this.setState({
          results: result.results,
        })
      }
    }.bind(this))
  },
  render: function() {
    var length = this.state.results.length
    var column_length = Math.floor(this.state.results.length/5)
    var columns = []
    for (var i = 0; i < 5; i++) {
      columns[i] = this.state.results.slice(column_length*i, (column_length*(i+1)))
      if (i==4) columns[i] = this.state.results.slice(column_length*i, length)
    }
    return(
       <div className="regions-block">
         {columns.map(function(result, index) {
            return <RegionsColumn key={index} data={result}/>;
         })}
       </div>
    )
  }
});

var RegionsColumn = React.createClass({
  render: function() {
    return(
       <ul>
         {this.props.data.map(function(result, index) {
            return <Region key={index} data={result}/>;
         })}
       </ul>
    )
  }
});


var Region = React.createClass({
  handleClick: function() {
    // ReactDOM.unmountComponentAtNode(document.getElementById('resultsTarget'))
    // ReactDOM.render(
    //   <Stores source={api_base +"/Regionies/"+this.props.data.id+"/stores"} count="8" searchable={false} Regiony={true} scrollToBottom={true}/>,
    //   document.getElementById('resultsTarget')
    // )
  },
  render: function() {
    return <li key={this.props.data.id} onClick={this.handleClick}> {this.props.data.name}</li>;
  }
});

var Popup = React.createClass({
  handleClick: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('popupTarget'))
  },
  render: function(){
    return(
      <div className="popup-back" onClick={this.handleClick}>
        <PopupFace data={this.props.data}/>
      </div>
    )
  }
})

var PopupFace = React.createClass({
  handleClick: function(e){
    e.stopPropagation()
  },
  render: function(){
    return(
      <div className="popup-front" onClick={this.handleClick}>
        <PopupForm data={this.props.data}/>
      </div>
    )
  }
})

var PopupForm = React.createClass({
  getInitialState: function () {
    return {
      canSubmit: false,
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
    model.cover_letter = 'x'
    model.tel.replace(/[^\d]/gi, '').replace(/^3?8/gi, '')
    model.gift = this.props.data
    $.ajax({
      method: "POST",
      url: (api_base + '/api/volunteers/'),
      data: model
    })
    .done(function( msg ) {
      ReactDOM.unmountComponentAtNode(document.getElementById('popupTarget'))
    });
  },
  render: function(){
    return(
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-common" id="letterform">
        <ValidatedInput type="text"  placeholder="Ім'я" name="name" validationError="Це не схоже на ім'я" required/>
        <ValidatedInput type="text"  placeholder="Номер телефону" name="tel" validations={{matchRegexp: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/}} validationError="Це не схоже на номер телефону" required/>
        <button type="submit" disabled={!this.state.canSubmit}>Відправити координаторам</button>
      </Formsy.Form>
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
  ReactDOM.render(
    <Letters source="/api/gifts/"/>,
    document.getElementById('lettersTarget')
  )
})
