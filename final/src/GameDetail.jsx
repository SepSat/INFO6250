import SubscribeButton from "./SubscribeButton";
import './GameDetail.css';
function GameDetail({ games, gamePrice, gID, subscribe, onSubscribeToggle }) {
    
    const game = games[gID];
    const platforms = game.pIDs;

    if (!game) {
        return <p>Oops! Game not found!</p>
    }

    return (
        <div className="game-detail">
            <h1>{game.name}</h1>
            <SubscribeButton
                gID={gID}
                subscribe={subscribe}
                onSubscribeToggle={onSubscribeToggle}
            />
            <div className="information">
                <p>Rating:{game.rating}</p>
                <p>Genre:{game.genre}</p>
                <p>Overview:{game.overview}</p>
            </div>
            <div className="platforms__prices">
                {platforms.map((pID) => (
                    <div key={pID} className="platforms__item">
                        {gamePrice[pID] && (
                            <>
                                <p><strong>Platform:{gamePrice[pID].platform}</strong></p>
                                {gamePrice[pID].salesPrice && (
                                    <>
                                        <p>Sales Price:{gamePrice[pID].price}$</p>
                                        <p className="delete">Price:{gamePrice[pID].price}$</p>
                                    </>
                                )}
                                {!gamePrice[pID].salesPrice && (
                                    <p>Price:{gamePrice[pID].price}$</p>
                                )}
                                <p>Low Price:{gamePrice[pID].lowPrice}$</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameDetail;