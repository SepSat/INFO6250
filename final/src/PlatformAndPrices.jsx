import './PlatformAndPrices.css';
function PlatformAndPrices({ gamePlatforms, platformOptions, handlePlatformChange, handleAddPlatform, handleDeletePlatform }) {
    return (
        <div>
            {gamePlatforms.map((gamePlatform, index) => (
                <div key={gamePlatform.pID || index} className="platform">
                    <p><label>
                        Platform :
                        <select
                            value={gamePlatform.platform || ""}
                            onChange={(e) => handlePlatformChange(index, "platform", e.target.value)}
                        >
                            <option value="" disabled>Select a platfoem</option>
                            {platformOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label></p>
                    <p><label>
                        Price:
                        <input
                            type="number"
                            value={gamePlatform.price}
                            onChange={(e) => handlePlatformChange(index, "price", e.target.value)}
                            placeholder="Enter price (only numbers)"
                            step="0.01"
                        />$
                    </label></p>
                    <p><label>
                        Sales Price:
                        <input
                            type="number"
                            value={gamePlatform.salesPrice}
                            onChange={(e) => handlePlatformChange(index, "salesPrice", e.target.value)}
                            placeholder="Enter sales price (only numbers)"
                            step="0.01"
                        />$
                    </label></p>
                    <p><label>
                        Low Price:
                        <input
                            type="number"
                            value={gamePlatform.lowPrice}
                            onChange={(e) => handlePlatformChange(index, "lowPrice", e.target.value)}
                            placeholder="Enter low price (only numbers)"
                            step="0.01"
                        />$
                    </label></p>
                    <button type="button" onClick={() => handleDeletePlatform(index)}>
                        Remove this platform
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddPlatform}>
                Add a new Platform
            </button>
        </div>
    );
}

export default PlatformAndPrices;