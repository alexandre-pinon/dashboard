import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'

var edit = 'edit';
var closer = 'closer';
var cards = 'Card';

const card = [
    {id: 1,name : "Youtube" , img : "http://via.placeholder.com/640x360" },
    {id: 2,name : "Twitch" , img : "http://via.placeholder.com/640x360" },
    {id: 3,name : "Twitter" , img : "http://via.placeholder.com/640x360" },
    {id: 4,name : "Google" , img : "http://via.placeholder.com/640x360" },
    {id: 5,name : "Youtube" , img : "http://via.placeholder.com/640x360" },
    {id: 6,name : "Facebook" , img : "http://via.placeholder.com/640x360" },
    {id: 7,name : "Deezer" , img : "http://via.placeholder.com/640x360" },
    {id: 8,name : "AppleMusic" , img : "http://via.placeholder.com/640x360" },
    {id: 9,name : "Linkedin" , img : "http://via.placeholder.com/640x360" },
]

function OpenOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById('options'+id)

    elmt.style.display = 'block'
}

function CloseOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById('options'+id)
    var edit = document.getElementById('edit')

    elmt.style.display = 'none'
    edit.style.display = 'none'
}

function OpenEdit(event) {
    var id = event.currentTarget.name
    var div = edit+id
    var elmt = document.getElementsByClassName(div)
    elmt[0].style.display = 'block'
}

function CloseEdit(event) {
    var id = event.currentTarget.id
    var elmt = document.getElementById(id)
    var panel = elmt.parentNode;
    panel.parentNode.style.display = 'none'
    var key = event.currentTarget.name

    switch (key) {
        case 'small':
            var item = document.getElementById(cards+id)
            item.style.width = '32%'
            item.style.height = '30%'
            break;
        case 'medium':
            var item = document.getElementById(cards+id)
            var itemImg = document.getElementById("img"+id)
            item.style.height = '62.5vh'
            itemImg.style.height = '80%'

            break;
        case 'tall':
            var item = document.getElementById(cards+id)
            item.style.width = '65%'
            break;
    
        default:
            break;
    }
}

export class WeatherWidgetOne extends React.Component{

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
        const res = await axios.get('http://localhost:8080/api/weather/' + this.props.widgetInstanceId);
        const { data } = await res;
        this.setState({serverResponse: data})
      }
    
    render () {

        if (this.state.serverResponse != undefined) {

            var icon = "http://openweathermap.org/img/wn/"+this.state.serverResponse.weather[0].icon+"@2x.png"

            return(
                    <Card id={"Card"+ this.state.serverResponse.weather[0].id}>
                        <Card.Img id={'img' + this.state.serverResponse.weather[0].id} className='img' variant="top" src={icon} />
                        <div className={"options"} id={ 'options' + this.state.serverResponse.weather[0].id}>
                            <div className={edit + this.state.serverResponse.weather[0].id} id="edit">
                                <ListGroup>
                                    <ListGroup.Item id={this.state.serverResponse.weather[0].id} name={'small'} onClick={CloseEdit} action variant="info">
                                        small
                                    </ListGroup.Item>
                                    <ListGroup.Item id={this.state.serverResponse.weather[0].id} name={'medium'} onClick={CloseEdit} action variant="info">
                                        medium
                                    </ListGroup.Item>
                                    <ListGroup.Item id={this.state.serverResponse.weather[0].id} name={'tall'} onClick={CloseEdit} action variant="info">
                                        tall
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                                <ListGroup>
                                    <ListGroup.Item action variant="secondary">
                                        Application
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={OpenEdit} name={this.state.serverResponse.weather[0].id} action variant="secondary">
                                        Edit
                                    </ListGroup.Item>
                                    <ListGroup.Item action variant="secondary">
                                        Delete
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <Card.Body>
                                <div className="row">
                                    <div className='col-8'>
                                        <h1> {this.state.serverResponse.name} </h1>
                                        <Card.Text>{this.state.serverResponse.weather[0].description} &nbsp; {this.state.serverResponse.main['temp']}º</Card.Text>   
                                    </div>
                                    <div className="col-2">
                                        <button name={this.state.serverResponse.weather[0].id} onClick={OpenOption} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-up"/>
                                        </button>
                                    </div>
                                    <div className="col-2">
                                        <button name={this.state.serverResponse.weather[0].id} onClick={CloseOption} style={{display : 'block'}} className="btn btn-light">
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
                ...
            </div>
        )
    }
}

export class WeatherWidgetTwo extends React.Component{

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
        const res = await axios.get('http://localhost:8080/api/weather');
        const { data } = await res;
        this.setState({serverResponse: data})
      }
    
    render () {

        if (this.state.serverResponse != undefined) {

            var icon = "http://openweathermap.org/img/wn/"+this.state.serverResponse.weather[0].icon+"@2x.png"

            var weather = this.state.serverResponse
            console.log(weather)
            return(
                    <Card id={"Card"+ this.state.serverResponse.id}>
                        <Card.Img id={'img' + this.state.serverResponse.id} className='img' variant="top" src={icon} />
                        <div className={"options"} id={ 'options' + this.state.serverResponse.id}>
                            <div className={edit + this.state.serverResponse.id} id="edit">
                                <ListGroup>
                                    <ListGroup.Item id={this.state.serverResponse.id} name={'small'} onClick={CloseEdit} action variant="info">
                                        small
                                    </ListGroup.Item>
                                    <ListGroup.Item id={this.state.serverResponse.id} name={'medium'} onClick={CloseEdit} action variant="info">
                                        medium
                                    </ListGroup.Item>
                                    <ListGroup.Item id={this.state.serverResponse.id} name={'tall'} onClick={CloseEdit} action variant="info">
                                        tall
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                                <ListGroup>
                                    <ListGroup.Item action variant="secondary">
                                        Application
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={OpenEdit} name={this.state.serverResponse.id} action variant="secondary">
                                        Edit
                                    </ListGroup.Item>
                                    <ListGroup.Item action variant="secondary">
                                        Delete
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <Card.Body>
                                <div className="row">
                                    <div className='col-10'>
                                        <Card.Text> Longitude : {this.state.serverResponse.coord.lon} • Latitude : {this.state.serverResponse.coord.lat}.</Card.Text>
                                        <Card.Text>Wind Speed :{this.state.serverResponse.wind.speed} • Degres : {this.state.serverResponse.wind.deg}</Card.Text>   
                                    </div>
                                    <div className="col-2">
                                        <button name={this.state.serverResponse.id} onClick={OpenOption} className="btn btn-light">
                                            <FontAwesomeIcon icon="arrow-up"/>
                                        </button>
                                        <button name={this.state.serverResponse.id} onClick={CloseOption} style={{display : 'block'}} className="btn btn-light">
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
                Waiting...
            </div>
        )
    }
}

export const DashBoard = () => {

    const widgetInstanceId = 1
    const youtubeInstanceId = 4

    async function getData() {
        const res = await axios.get('http://localhost:8080/api/widgetInstances')
        const data = await res.data
        console.log(data)
        return data
    }

    async function getSubscribers() {
        const res = await axios.get('http://localhost:8080/api/youtube/' + youtubeInstanceId)
        const data = await res.data
        console.log(data)
        return data
    }

    // let instances = null
    // getData().then((data) => {
    //     instances = data
    // })
    // if (instances != null) {
    //     instances.forEach((instance) => {
    //         console.log("Widget Name : " + instance.widgetName)
    //     })
    // }

    

    return(
        <section className="container">
            <div className="row">
                <div className="container md-4">
                    <div id="containCard">
                        <WeatherWidgetOne widgetInstanceId={widgetInstanceId}/>
                        <WeatherWidgetTwo/>
                    </div>
                </div>
            </div>
        </section>
    )
}
