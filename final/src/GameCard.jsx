import './GameCard.css';
function GameCard({ game }) {
    return (
        <div className='gamecard'>
            <h1>{game.name}</h1>
            <p>Rating:{game.rating}</p>
            <p>Genre:{game.genre}</p>
            {game.prices[0].salesPrice && (
                <>
                    <p>Sales Price:{game.prices[0].salesPrice}$</p>
                    <p className="delete">Price:{game.prices[0].price}$</p>
                </>
            )}
            {!game.prices[0].salesPrice && (
                <p>Price:{game.prices[0].price}$</p>
            )}
            <p>Low Price:{game.prices[0].lowPrice}$</p>
            <p className="overview">Overview:{game.overview}</p>
        </div>
    )
}

export default GameCard;