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

function AddCard(event) {
    var id = event.target.name
    var elmt = document.getElementById(cards+id)

    console.log(cards+id)
    
    CloseAddWidget()
    elmt.style.display = "block";
  
}

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
    
    return (
        <div id='test' className="container md-4">
            <div id="containCard">
            {card.map(item =>(
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <div className='row'>
                            <div className='col-sm'>
                                <Button onClick={AddCard} name={item.id} variant="light">+</Button>
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
    const [stateCard, setStateCard] = useState(card);

    const fetchData = async () => {
        const result = await axios.get('http://localhost:8080/api/widgetInstances', {withCredentials: true})
        setData(result.data)
        console.log(result.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        data.map(item => {
            switch (item.widgetName) {
                case 'weather_1':
                    var instance = {id: 1, uid: 'Weather1' , div: WeatherOne }
                    card.push(instance)
                    console.log(card, 'in switch 1')
                    console.log(item.widgetName)
                    break;
                case 'weather_2':
                    var instance = {id: 2, uid: 'Weather2' , div: WeatherTwo }
                    card.push(instance)
                    console.log(card, 'in switch 2')
                    console.log(item.widgetName)
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
