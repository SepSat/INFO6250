import './GameEditList.css';
function GameEditList({ adminLevel, games, setPage }) {

    const gameList = Object.keys(games);



    const handleCardClick = (gID) => {
        const gamePath = `/game/edit/${gID}`;
        window.history.pushState(null, "", gamePath);
        setPage(gamePath);
    }

    const handleAddNewGame = () => {
        const gamePath = `/game/add`;
        window.history.pushState(null, "", gamePath);
        setPage(gamePath);
    }


    return (
        <div className="game__edit__list">
            {adminLevel === "admin" && (<button type="button" onClick={handleAddNewGame}>Add New Game</button>)}
            {gameList.map((game) => (
                <div key={game} className="game__edit__item">
                    <button
                        className="game__edit__button"
                        onClick={() => handleCardClick(game)}
                    >{games[game].name}</button>
                </div>
            ))}
        </div>
    );
}

export default GameEditList;