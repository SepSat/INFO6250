import './Controls.css';
function Controls({ username, onLogout }) {
  return (
    <div className="controls">
      <p>Hello <strong>{username}</strong></p>
      <button onClick={onLogout} className="controls__logout">Logout</button>
    </div>
  );
}

export default Controls;
