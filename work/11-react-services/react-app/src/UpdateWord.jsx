import { useState } from 'react';

function UpdateWord({ onUpdateWord}) {
    const [newWord, setNewWord] = useState('');

    function onTyping(e) {
        setNewWord(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        onUpdateWord(newWord);
        setNewWord('');
    }

    return (
        <form className="change-word" onSubmit={onSubmit}>
            <input className="word-input" name="newword" type="text" placeholder="Only made up of letters" value={newWord} onChange={onTyping} />
            <button className="word-submit" type="submit">Update</button>
        </form>
    );
}

export default UpdateWord;