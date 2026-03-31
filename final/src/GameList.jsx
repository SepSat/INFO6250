import Loading from './Loading';
import GameCard from './GameCard';
import SubscribeButton from './SubscribeButton';
import './GameList.css';

function GameList({ platform, games, gamePrice, subscribe, onSubscribeToggle, setPage }) {

    if (!games || !gamePrice) {
        return <Loading />;
    }
    const filteredPrices = Object.values(gamePrice).filter((price) => price.platform === platform);

    const gamesWithPrices = filteredPrices
        .map((price) => {
            const game = games[price.gID];

            if (game) {
                return {
                    ...game,
                    prices: [price],

                };
            }
            return null;
        })
        .filter(Boolean);

    const handleCardClick = (gID) => {
        const gamePath = `/game/detail/${gID}`;
        window.history.pushState(null, "", gamePath);
        setPage(gamePath);
    }

    return (
        <div className='gamelist'>
            {gamesWithPrices.map((game) => (
                <div key={game.pIDs} className="game__item">
                    <div
                        className="gamebrief"
                        onClick={() => handleCardClick(game.prices[0].gID)}
                    >
                        <GameCard game={game} />
                    </div>
                    <SubscribeButton
                        gID={game.prices[0].gID}
                        subscribe={subscribe}
                        onSubscribeToggle={onSubscribeToggle}
                    />
                </div>
            ))}
        </div>
    );
}

export default GameList;