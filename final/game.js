import { randomUUID as uuid } from 'crypto';
const games = {
    game1: {
        name: "zeleda",
        genre: "mmo",
        rating: "9.9",
        overview: "Lorem ipsum dolor sit amet, sed tale elitr adversarium te. Facilisis assentior vis ei, luptatum antiopam est ex. Choro adipisci dissentias sea cu, velit essent vel at. Suas epicurei interpretaris at cum. Ne cum libris dicunt iudicabit, nec fierent luptatum an.Nec reque ipsum ne. Eam probatus insolens ocurreret no. Vix abhorreant definitiones at, eam eius civibus adipiscing an, est solum homero urbanitas ne. Sit cu maluisset necessitatibus, qui option vivendo splendide in. Ea mea tantas constituam accommodare, solet eloquentiam ei nam.Mea id mutat rebum. Audire perpetua at quo. Ad nonumy cetero delicatissimi vis, eros propriae comprehensam ex nam. Liber mediocritatem ex nec, quot iracundia cum ne. Sed an elit laboramus.An mea docendi corrumpit. Sea at case nusquam. Qui movet verterem comprehensam ea, facilis assentior ne usu. Libris impedit sea ut, te nominavi quaestio nam. Solum decore appellantur mel ei.Usu autem velit eligendi id, ei perpetua complectitur vel. Suas inimicus patrioque sit id. An vis graece perpetua, est commodo consectetuer ei. Maiorum apeirian expetenda mei in.",
        pIDs: ["p1", "p2"],
    },
    game2: {
        name: "GTA",
        genre: "fps",
        rating: "9.6",
        overview: "sed tale elitr adversarium te",
        pIDs: ["p3", "p4"],
    }
};

const platforms = {
    p1: {
        platform: "steam",
        price: "39.99",
        salesPrice: "29.99",
        lowPrice: "19.99",
        gID: "game1",
    },
    p2: {
        platform: "switch",
        price: "49.99",
        salesPrice: "39.99",
        lowPrice: "29.99",
        gID: "game1",
    },
    p3: {
        platform: "indie",
        price: "9.99",
        salesPrice: "6.59",
        lowPrice: "3.19",
        gID: "game2",
    },
    p4: {
        platform: "switch",
        price: "64.52",
        salesPrice: "49.59",
        lowPrice: "40.19",
        gID: "game2",
    }

};

function isValidName(gameName) {
    let isValid = true;
    isValid = isValid && gameName.trim();
    Object.values(games).forEach((game) => {
        isValid = isValid && game.name !== gameName;
    })
    return isValid;
}

function isValidRating(number) {
    let isValid = true;
    isValid = isValid && number.trim();
    isValid = isValid && number.match(/^\d+(\.\d{1,1})?$/);
    isValid = isValid && number <= 10 && number >= 0;
    return isValid;
}

function isValidOverview(overview) {
    let isValid = true;
    isValid = isValid && overview.trim();
    return isValid;
}

function isValidGenre(genre) {
    let isValid = true;
    isValid = isValid && genre.match(/^[A-Za-z]*$/);
    isValid = isValid && genre.trim();
    return isValid;
}

function isValidPrice(number) {
    let isValid = true;
    isValid = isValid && number.trim();
    isValid = isValid && number.match(/^\d+(\.\d{1,2})?$/);
    return isValid;
}

function isValidSalesPrice(originalPrice, salesPrice) {
    let isValid = true;
    if (salesPrice) {
        isValid = isValid && salesPrice.match(/^\d+(\.\d{1,2})?$/);
        isValid = isValid && originalPrice > salesPrice;
    }
    return isValid;
}

function isValidLowPrice(originalPrice, salesPrice, lowPrice) {
    let isValid = true;
    isValid = isValid && lowPrice.trim();
    isValid = isValid && lowPrice.match(/^\d+(\.\d{1,2})?$/);
    if (salesPrice) {
        isValid = isValid && lowPrice <= salesPrice;
    }
    isValid = isValid && originalPrice > salesPrice;
    return isValid;
}

function addNewGame(game) {
    const gID = uuid();
    let pIDs = [];
    game.platforms.map((platform) => {
        pIDs.push(addNewPlatform(gID, platform));
    })
    const gameObject = {
        name: game.name,
        rating: game.rating,
        genre: game.genre,
        overview: game.overview,
        pIDs: pIDs

    }
    games[gID] = gameObject;
}

function changeGame(game) {
    const gid = game.gID;

    games[gid].rating = game.rating;
    games[gid].overview = game.overview;

    const existingPIDs = new Set(games[gid].pIDs);
    const updatedPIDs = [];

    game.platforms.forEach((platform) => {
        if (!platform.pID) {
            const newPID = addNewPlatform(gid, platform);
            if (!existingPIDs.has(newPID)) {
                updatedPIDs.push(newPID);
            }
        } else {
            const pID = platform.pID;
            if (platforms[pID]) {
                platforms[pID].platform = platform.platform;
                platforms[pID].price = platform.price;
                platforms[pID].salesPrice = platform.salesPrice;
                platforms[pID].lowPrice = platform.lowPrice;
                updatedPIDs.push(pID); 
            }
        }
    });
    games[gid].pIDs = updatedPIDs;
}

function addNewPlatform(gID, platform) {
    const pID = uuid();
    const platformObject = {
        platform: platform.platform,
        price: platform.price,
        salesPrice: platform.salesPrice,
        lowPrice: platform.lowPrice,
        gID: gID,
    };
    platforms[pID] = platformObject;
    return pID;
}

function deleteGame(gID) {
    for (let i = 0; i < games[gID].pIDs.length; i++) {
        let nowPID = games[gID].pIDs[i];
        delete platforms[nowPID];
    }
    delete games[gameName];
}

export default {
    isValidName,
    isValidPrice,
    isValidSalesPrice,
    isValidLowPrice,
    isValidRating,
    isValidOverview,
    isValidGenre,
    addNewGame,
    deleteGame,
    changeGame,
    games,
    platforms,
};