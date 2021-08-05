import './styles/Card.css'

const Card = (props) => {

    return (
    <div className='card'>
        {props.card.name}
    </div>
    )
}

export default Card
