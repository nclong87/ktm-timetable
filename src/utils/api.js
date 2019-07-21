class Api {
  get(url, contentType = 'json') {
    return fetch(url)
      .then((resp) => {
        if (contentType === 'json') {
          const json = resp.json();
          if (resp.ok) {
            return json;
          }
          return json.then((err) => { throw err; });
        }
        return resp.text();
      }).then(json => json);
  }
}

export default Api;
