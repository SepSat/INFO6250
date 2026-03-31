import { useState } from "react";
import PlatformAndPrices from "./PlatformAndPrices";
import './AddNewGame.css';

function AddNewGame({ onSubmitNewGame }) {
    const [gameName, setGameName] = useState("");
    const [gameRating, setGameRating] = useState("");
    const [gameGenre, setGameGenre] = useState("");
    const [gameOverview, setGameOverview] = useState("");
    const [gamePlatforms, setGamePlatforms] = useState([
        { platform: "", price: "", salesPrice: "", lowPrice: "" },
    ]);

    const platformOptions = ["indie", "steam", "switch", "xbox", "playstation", "other"]

    function handleSubmit(e){
        e.preventDefault();
        const formData = {
            name: gameName,
            rating: gameRating,
            genre: gameGenre,
            overview: gameOverview,
            platforms:gamePlatforms,
        };
        onSubmitNewGame(formData);
    };

    function handlePlatformChange(index, type, value){
        const updatedPlatfoms = gamePlatforms.map((platform, idx) => {
            if(idx === index){
                return { ...platform, [type]: value };
            }
            return platform;
        });
        setGamePlatforms(updatedPlatfoms);
    };

    function handleAddPlatform(){
        setGamePlatforms([...gamePlatforms,{ platform: "", price: "", salesPrice: "", lowPrice: "" }]);
    };

    function handleDeletePlatform(index){
        const updatedPlatfoms = gamePlatforms.filter((_, idx) => idx !== index);
        setGamePlatforms(updatedPlatfoms);
    }

    return (
        <form onSubmit={handleSubmit} className="new-game-form">
            <div className="new-game-info">
                <p><label>Game Name:
                    <input
                        type="text"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        placeholder="Pleace enter a game name"
                    />
                </label></p>
                <p><label>Game Genre:
                    <input
                        type="text"
                        value={gameGenre}
                        onChange={(e) => setGameGenre(e.target.value)}
                        placeholder="Pleace enter this game genre"
                    />
                </label></p>
                <p><label>Game Rating:
                    <input
                        type="number"
                        value={gameRating}
                        onChange={(e) => setGameRating(e.target.value)}
                        placeholder="Pleace enter number"
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
                        placeholder="Pleace enter this game description"
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
            <button type="submit">Submit New Game</button>
        </form>
    );
}

export default AddNewGame;