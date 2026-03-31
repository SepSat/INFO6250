import Loading from './Loading';

function WordShow({ storedWord, isWordPending }) {

    return (
        <div className="content">
            {isWordPending && <Loading className="word__waiting">Loading word...</Loading>}
            {!isWordPending && !storedWord && (
                <p>No word has been stored yet, add one!</p>
            )}
            {!isWordPending && !!storedWord && (
                <div className='stored-word'>
                    <p>This is your word: </p>
                    <p><strong>{storedWord}</strong></p>
                </div>
            )}
        </div>

    );

}

export default WordShow;