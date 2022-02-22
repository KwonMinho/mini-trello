export class List {
  /**
   * @description: board 아이템인 "List" 태그를 만들어서 반환하는 함수
   * @param {String} id: List 태그의 id
   * @param {String} title: 리스트 태그 이름
   * @param {Element} addCardItem: addItem 태그
   * @param {Element} cardDropzone: 리스트에 첫번째 card dropzone
   * @return {Element} List item tag
   */
  static createList(id, title, addCardItem, cardDropzone) {
    const root = document.createElement("div");
    const titleContainer = document.createElement("div");
    const cardsContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const hr = document.createElement("hr");

    root.classList.add("list");
    root.classList.add("board__item");
    titleContainer.classList.add("list__name");
    cardsContainer.classList.add("list__items");

    root.id = id;
    h3.innerText = title;

    titleContainer.appendChild(h3);
    cardsContainer.appendChild(cardDropzone);
    root.appendChild(titleContainer);
    root.appendChild(cardsContainer);
    root.appendChild(hr);
    root.appendChild(addCardItem);

    return root;
  }
}
