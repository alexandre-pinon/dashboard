import React from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';

var edit = 'edit';
var closer = 'closer';
var cards = 'Card';

function OpenOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById('options' + id)

    elmt.style.display = 'block'
}

function CloseOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById('options' + id)

    elmt.style.display = 'none'
}

function Delete(event) {
    var id = event.target.id

    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
}

function Edit(event) {
    var id = event.target.id

    var stringParams = window.prompt('Which city do you want the weather forecast for ?')
    stringParams = stringParams.charAt(0).toUpperCase() + stringParams.substring(1).toLowerCase()
    var paramsData = {stringParams : {city : stringParams}}

    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, paramsData)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
}

export class YoutubeWidgetThree extends React.Component{

    constructor(){
        super();
        this.state = {
         serverResponse: undefined
        }
       }
       componentDidMount(){
          this.getData();
       }
       async getData(){
        const res = await axios.get('http://localhost:8080/api/youtube/youtube_3/' + this.props.widgetInstanceId);
        const { data } = await res;
        this.setState({serverResponse: data})
        console.log(data)
      }
    
    render () {

        if (this.state.serverResponse != undefined) {

            return(
                    <Card id={"Card"+ this.props.keyUnique}>
                        <Card.Img id={'img' + this.props.keyUnique} className='img' variant="top" style={{display : 'none'}} />
                        <div className={"options"} id={ 'options' + this.props.keyUnique}>
                                <ListGroup>
                                    <ListGroup.Item action variant="secondary">
                                        Application
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={Edit} id={this.props.widgetInstanceId} action variant="secondary">
                                        Edit
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={Delete} id={this.props.widgetInstanceId} action variant="secondary">
                                        Delete
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <Card.Body>
                                <div className="row">
                                    <div className='col-8'>
                                    <ListGroup>
                                    {this.state.serverResponse.items.map(item => (
                                        <ListGroup.Item action variant="secondary">
                                            <h4>{item.snippet.topLevelComment.snippet.authorDisplayName}</h4>
                                            <cite>{item.snippet.topLevelComment.snippet.publishedAt}</cite>
                                            {item.snippet.topLevelComment.snippet.textDisplay}
                                        </ListGroup.Item>
                                    ))}
                                    </ListGroup>
                                    </div>
                                    <div className="col-2">
                                        <button name={this.props.keyUnique} onClick={OpenOption} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-up"/>
                                        </button>
                                        <button name={this.props.keyUnique} onClick={CloseOption} style={{display : 'block'}} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-down"/>
                                        </button>
                                    </div>
                                </div>
                        </Card.Body>
                    </Card>
            )
        }
        return(
            <div>
                
            </div>
        )
    }
}

