export function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
    credentials: 'include',
  })
    .catch((err) => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    })
};

export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username }),
  })
    .catch((err) => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
};

export function fetchLogOut() {
  return fetch('/api/session', {
    method: 'DELETE',
    credentials: 'include',
  })
    .catch((err) => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
};

export function fetchGetWord() {
  return fetch('/api/word', {
    method: 'GET',
    credentials: 'include',
  })
    .catch((err) => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
};

export function fetchChangeWord(newWord) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ word: newWord }),
    credentials: 'include',
  })
    .catch((err) => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
};



