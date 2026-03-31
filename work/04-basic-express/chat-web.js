const chatWeb = {
  chatPage: function(chat) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div id="chat-app">
            <h1>Chat Room</h1>
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoingSection(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
    chat.messages.map(message =>`
      <li class="message">
        <div class="sender-info"><strong>${message.sender}:</strong></div>
        <div class="message-text">${message.text}</div>
      </li>    
    `).join('') + `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') + `</ul>`;
  },
  getOutgoingSection: function() {
    return `
      <form action="/chat" method="POST" class="outgoing">
        <input type="hidden" name="username" value="You">
        <input type="text" name="text" placeholder="Enter your message">
        <button type="submit">Send</button>
      </form>
    `;
  }
};
module.exports = chatWeb;
