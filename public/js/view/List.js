/**
 * 태그 컴포넌트인 List를 생성하기 위한 클래스
 *
 * @class List
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class List {
  /**
   * @description:  "List"를 만들어서 반환하는 함수
   * @param {String} id: List의 id
   * @param {String} title: List 이름
   * @param {element} addCardItem: addItem 태그
   * @param {element} cardDropzone: 리스트의 첫번째 card dropzone
   * @return {element} List
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
