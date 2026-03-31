import { useState } from 'react';
import PlatformAndPrices from "./PlatformAndPrices";
import './GameEditForm.css';

function GameEditForm({ games, gamePrice, gID, onSubmitEditGame }) {

    if (!gID) {
        return <p>Oops! Game not found!</p>
    }

    const game = games[gID];

    const gameData = {
        ...game,
        pIDs: game.pIDs.reduce((acc, pID) => {
            if (gamePrice[pID]) {
                acc.push({
                    pid: pID,
                    ...gamePrice[pID],
                });
            }
            return acc;
        }, []),
    };

    const [gameName, setGameName] = useState(gameData.name);
    const [gameGenre, setGameGenre] = useState(gameData.genre);
    const [gameRating, setGameRating] = useState(gameData.rating);
    const [gameOverview, setGameOverview] = useState(gameData.overview);
    const [gamePlatforms, setGamePlatforms] = useState(gameData.pIDs);
    const [gid, setGid] = useState(gID);




    const platformOptions = ["indie", "steam", "switch", "xbox", "playstation", "other"];


    function handlePlatformChange(index, type, value) {
        const updatedPlatfoms = gamePlatforms.map((platform, idx) => {
            if (idx === index) {
                return { ...platform, [type]: value };
            }
            return platform;
        });
        setGamePlatforms(updatedPlatfoms);
    };



    function handleAddPlatform() {
        setGamePlatforms([...gamePlatforms, { platform: "", price: "", salesPrice: "", lowPrice: "" }]);
    };

    function handleDeletePlatform(index) {
        const updatedPlatfoms = gamePlatforms.filter((_, idx) => idx !== index);
        setGamePlatforms(updatedPlatfoms);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const updatedGameData = {
            gID: gid,
            name: gameName,
            genre: gameGenre,
            rating: gameRating,
            overview: gameOverview,
            platforms: gamePlatforms.map((platform) => ({
                pID: platform.pid || null,
                platform:platform.platform,
                price: platform.price,
                salesPrice: platform.salesPrice,
                lowPrice: platform.lowPrice,
            })),
        };
        onSubmitEditGame(updatedGameData);
    }

    return (
        <form onSubmit={handleSubmit} className='game-edit-form'>
            <div className="game-edit-info">
                <p><label>Game Name:
                    <input
                        type="text"
                        value={gameName}
                        readOnly
                    />
                </label></p>
                <p><label>Game Genre:
                    <input
                        type="text"
                        value={gameGenre}
                        readOnly
                    />
                </label></p>
                <p><label>Game Rating:
                    <input
                        type="number"
                        value={gameRating}
                        onChange={(e) => setGameRating(e.target.value)}
                        placeholder="Enter rating (1-10)"
                        min="0"
                        max="10"
                        step="0.1"
                    />
                </label></p>
                <p><label>Game Overview:
                    <input
                        type="text"
                        value={gameOverview}
                        onChange={(e) => setGameOverview(e.target.value)}
                        placeholder="Enter game description"
                    />
                </label></p>
                <PlatformAndPrices
                    gamePlatforms={gamePlatforms}
                    platformOptions={platformOptions}
                    handlePlatformChange={handlePlatformChange}
                    handleAddPlatform={handleAddPlatform}
                    handleDeletePlatform={handleDeletePlatform}
                />
            </div>
            <button type="submut">Save Changes</button>
        </form>
    )
}

export default GameEditForm;