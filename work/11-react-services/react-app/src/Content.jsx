function Content({ username, onLogout }) {
    return (
    <div>
        <p>Hello <strong>{username}</strong></p>
        <button className="logout__button" onClick={onLogout}>Logout</button>
    </div>
    );
}

export default Content;