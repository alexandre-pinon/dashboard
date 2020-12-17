import { React , useState } from 'react';
import Card from 'react-bootstrap/Card'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'


var edit = 'edit';
var closer = 'closer';
var cards = 'Card';

const card = [
    {id: 1,name : "Youtube" , img : "http://via.placeholder.com/640x360" },
    {id: 2,name : "Twitch" , img : "http://via.placeholder.com/640x360" },
    {id: 3,name : "Twitter" , img : "http://via.placeholder.com/640x360" },
    {id: 4,name : "Google" , img : "http://via.placeholder.com/640x360" },
    {id: 5,name : "GitHub" , img : "http://via.placeholder.com/640x360" },
    {id: 6,name : "Facebook" , img : "http://via.placeholder.com/640x360" },
    {id: 7,name : "Deezer" , img : "http://via.placeholder.com/640x360" },
    {id: 8,name : "AppleMusic" , img : "http://via.placeholder.com/640x360" },
    {id: 9,name : "Linkedin" , img : "http://via.placeholder.com/640x360" },
]


function OpenOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById(id)

    elmt.style.display = 'block'
}

function CloseOption(event) {

    var id = event.currentTarget.name
    var elmt = document.getElementById(id)
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
    var lastC = id.charAt(id.length-1)
    var key = event.currentTarget.name

    switch (key) {
        case 'small':
            var item = document.getElementById(cards+lastC)
            console.log('enter in small', item)
            item.style.width = '32%'
            item.style.height = '30%'
            break;
        case 'medium':
            var item = document.getElementById(cards+lastC)
            var itemImg = document.getElementById("img"+lastC)
            console.log('enter in medium', item)
            item.style.height = '80vh'
            itemImg.style.height = '80%'

            break;
        case 'tall':
            var item = document.getElementById(cards+lastC)
            var itemImg = document.getElementById("img"+lastC)
            console.log('enter in tall' , item , itemImg)
            item.style.width = '65%'
            item.style.height = '80vh'
            itemImg.style.height = '80%'
            break;
    
        default:
            break;
    }
}

function DeleteCard(event) {
    var id = event.target.name
    var elmt = document.getElementById(cards+id)
    elmt.style.display = "none";
}

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


export const DashBoard = () => {
    const [characters, updateCharacters] = useState(card)

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateCharacters(items);
      }
    return(
        <section className="container">
            <div id="addwidget" className="row">
                <ParamsWidget/>
            </div>
            <div className="row">
                <div className="container md-4">
                    <Button id='buttonOpen' onClick={OpenAddWidget} style={{width : '100%'}} variant="light" type="submit">
                        +
                    </Button>
                    <Button id='buttonClose' onClick={CloseAddWidget} style={{width : '100%'}} variant="light" type="submit">
                        close
                    </Button>
                    <DragDropContext onDragEnd={handleOnDragEnd}> 
                        <Droppable droppableId= "containCard">
                        { (provided) => (
                            <div id="containCard" {...provided.droppableProps} ref={provided.innerRef}>
                                {card.map( (item , index) => (
                                    <Draggable key={"Card"+item.id} draggableId={"Card"+item.id} index={index} >
                                    {(provided)=>(
                                        <Card id={"Card"+item.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <Card.Img id={'img' + item.id} className='img' variant="top" src={item.img} />
                                            <div className={"options"} id={item.id}>
                                                <div className={edit + item.id} id="edit">
                                                    <ListGroup>
                                                        <ListGroup.Item id={closer + item.id} name={'small'} onClick={CloseEdit} action variant="info">
                                                            small
                                                        </ListGroup.Item>
                                                        <ListGroup.Item id={closer + item.id} name={'medium'} onClick={CloseEdit} action variant="info">
                                                            medium
                                                        </ListGroup.Item>
                                                        <ListGroup.Item id={closer + item.id} name={'tall'} onClick={CloseEdit} action variant="info">
                                                            tall
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </div>
                                                <ListGroup>
                                                        <ListGroup.Item action variant="secondary">
                                                            Application
                                                        </ListGroup.Item>
                                                        <ListGroup.Item onClick={OpenEdit} name={item.id} action variant="secondary">
                                                            Edit
                                                        </ListGroup.Item>
                                                        <ListGroup.Item onClick={DeleteCard} name={item.id} action variant="secondary">
                                                            Delete
                                                        </ListGroup.Item>
                                                </ListGroup>
                                            </div>
                                            <Card.Body>
                                            <Card.Text>
                                            <div className="row">
                                                <div className='col-8'>
                                                    {item.name}
                                                </div>
                                                <div className="col-2">
                                                    <button name={item.id} onClick={CloseOption} className="btn btn-light">
                                                        <FontAwesomeIcon icon="arrow-up"/>
                                                    </button>
                                                </div>
                                            <div className="col-2">
                                                    <button name={item.id} onClick={OpenOption} style={{display : 'block'}} className="btn btn-light">
                                                        <FontAwesomeIcon icon="arrow-down"/>
                                                    </button>
                                                </div> 
                                            </div>
                                            </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </section>
    )
}
