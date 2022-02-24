export class Http {
  static get(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) cb(null);
        else cb(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }
  static post(endpoint, data, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status !== 200) cb(null);
        else cb(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(JSON.stringify(data));
  }
}
