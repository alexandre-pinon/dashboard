import React from 'react'
import { useState , useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button'
import { WeatherWidgetOne } from '../Widget/WeatherOne'
import { WeatherWidgetTwo } from '../Widget/WeatherTwo'
import axios from 'axios'
import { Component } from 'react';

var cards = 'Card';

var WeatherOne = <WeatherWidgetOne/>;
var WeatherTwo = <WeatherWidgetTwo/>;

const card = []
const paramsCard = [
    {id: 1, service : "Youtube" , img : "http://via.placeholder.com/640x360", widgetName : "youtube_1", name : "Youtube Comments", description : ""},
    {id: 2, service : "Youtube" , img : "http://via.placeholder.com/640x360", widgetName : "youtube_2", name : "Youtube Recently Videos", description : ""},
    {id: 3 , service : "Google" , img : "http://via.placeholder.com/640x360", widgetName : "google_1", name : "Google Maps", description : ""},
    {id: 4 , service : "Google" , img : "http://via.placeholder.com/640x360", widgetName : "google_2", name : "Gmail", description : ""},
    {id: 5, service : "weather" , img : "http://via.placeholder.com/640x360", widgetName : "weather_1", name : "Météo", description : "Display temperature for a given city"},
    {id: 6, service : "weather" , img : "http://via.placeholder.com/640x360", widgetName : "weather_2", name : "Precision", description : "Display position and wind for a given city"},
    {id: 7, service : "Facebook" , img : "http://via.placeholder.com/640x360", widgetName : "facebook_1", name : "Messenger", description : ""},
    {id: 8, service : "Facebook" , img : "http://via.placeholder.com/640x360", widgetName : "facebook_2", name : "Marketplace", description : ""},
]

function OpenAddWidget() {
    var div = document.getElementById('addwidget');
    var open = document.getElementById('buttonOpen');
    var close = document.getElementById('buttonClose');

    div.style.display = 'block'
    close.style.display = 'block'
    open.style.display = 'none'

}

function CloseAddWidget() {
    var div = document.getElementById('addwidget');
    var open = document.getElementById('buttonOpen');
    var close = document.getElementById('buttonClose');

    div.style.display = 'none'
    close.style.display = 'none'
    open.style.display = 'block'

}

const ParamsWidget = () => {
    
    function AddCard(event) {
        var key = event.target.name
        var paramsData = {};
        console.log(key)

        switch (key) {
            case "youtube_1":
                paramsData = {description : paramsCard[0].description, serviceName : paramsCard[0].service, stringParams : "", widgetName : paramsCard[0].widgetName, intParams : null}
                break;
            case "youtube_2":
                paramsData = {description : paramsCard[1].description, serviceName : paramsCard[1].service, stringParams : "", widgetName : paramsCard[1].widgetName, intParams : null}
                break;
            case "google_1":
                paramsData = {description : paramsCard[2].description, serviceName : paramsCard[2].service, stringParams : "", widgetName : paramsCard[2].widgetName, intParams : null}
                break;
            case "google_2":
                paramsData = {description : paramsCard[3].description, serviceName : paramsCard[3].service, stringParams : "", widgetName : paramsCard[3].widgetName, intParams : null}
                break;
            case "weather_1":
                var stringParams = window.prompt('Which city do you want the weather forecast for ?')
                stringParams = stringParams.charAt(0).toUpperCase() + stringParams.substring(1).toLowerCase()
                paramsData = {widgetName : paramsCard[4].widgetName, serviceName : paramsCard[4].service, description : paramsCard[4].description, stringParams : {city : stringParams}, intParams : null}
                break;
            case "weather_2":
                var stringParams = window.prompt('Which city would you like more information from?')
                stringParams = stringParams.charAt(0).toUpperCase() + stringParams.substring(1).toLowerCase()
                paramsData = {description : paramsCard[5].description, serviceName : paramsCard[5].service, stringParams : {city : stringParams}, widgetName : paramsCard[5].widgetName, intParams : null}
                break;
            case "facebook_1":
                paramsData = {description : paramsCard[6].description, serviceName : paramsCard[6].service, stringParams : "", widgetName : paramsCard[6].widgetName, intParams : null}
                break;
            case "facebook_2":
                paramsData = {description : paramsCard[7].description, serviceName : paramsCard[7].service, stringParams : "", widgetName : paramsCard[7].widgetName, intParams : null}
                break;
            default:
                break;
        }
        axios.post('http://localhost:8080/api/create', paramsData, {withCredentials: true}) 
        .then(response => {
            console.log(response.data)
            window.location = "/home"
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div id='test' className="container md-4">
            <div id="containCard">
            {paramsCard.map(item =>(
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <div className='row'>
                            <div className='col-sm'>
                                <Button onClick={AddCard} name={item.widgetName} variant="light">+</Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    </div>
    )
}

var col = {
    [1]: {
      items: card
    },
    [2]: {
      items: []
    },
    [3]: {
      items: []
    },
  };


  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }  
  };

export const DashBoard = () => {

    const [columns, setColumns] = useState(col);
    const [data, setData]= useState([]);

    const fetchData = async () => {
        const result = await axios.get('http://localhost:8080/api/widgetInstances', {withCredentials: true})
        setData(result.data)
        console.log(result.data)
    }

    const testYoutube1 = async () => {
        const result = await axios.get('http://localhost:8080/api/youtube/youtube_1/4', {withCredentials: true})
        console.log(result.data)
    }

    const testYoutube2 = async () => {
        const result = await axios.get('http://localhost:8080/api/youtube/youtube_2/5', {withCredentials: true})
        console.log(result.data)
    }

    useEffect(() => {
        fetchData()
        testYoutube1()
        testYoutube2()
    }, [])

    useEffect(() => {
        data.map((item, index) => {
            switch (item.widgetName) {
                case 'weather_1':
                    var instance = {id: item.id, uid: 'Weather1.' + index , div: <WeatherWidgetOne widgetInstanceId= {item.id} keyUnique={index} /> }
                    card.push(instance)
                    break;
                case 'weather_2':
                    var instance = {id: item.id, uid: 'Weather2.' + index , div: <WeatherWidgetTwo widgetInstanceId= {item.id} keyUnique={index}/> }
                    card.push(instance)
                    break;
                default:
                    break;
            }
        })
        setColumns({
            [1]: {
              items: card
            },
            [2]: {
              items: []
            },
            [3]: {
              items: []
            },
        })
    }, [data])

    return(
        <section className="container">
            <div id="addwidget" className="row">
                <ParamsWidget/>
            </div>
            <div className="row" style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <div className="container md-4">
                    <Button id='buttonOpen' onClick={OpenAddWidget} style={{width : '100%'}} variant="light" type="submit">
                        +
                    </Button>
                    <Button id='buttonClose' onClick={CloseAddWidget} style={{width : '100%'}} variant="light" type="submit">
                        close
                    </Button>
                </div>
               <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column], index) => (
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        className="col-sm" key={columnId}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{margin : 8}}
                                    >
                                        {column.items.map((item, index) => {
                                            return (
                                                <Draggable
                                                    key={item.uid}
                                                    draggableId={item.uid}
                                                    index={index}
                                                    column={columnId}
                                                >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                            >
                                                                {item.div}
                                                            </div>
                                                        );
                                                    }}
                                                </Draggable>
                                            );
                                            })}
                                        {provided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>                  
                    ))}
                </DragDropContext>
            </div>
        </section>
    )
}
