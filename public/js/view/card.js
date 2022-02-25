/**
 * 태그 컴포넌트인 Card를 생성하기 위한 클래스
 *
 * @class Card
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class Card {
  /**
   * @description: "Card"를 만들어서 반환하는 함수
   * @param {String} id: Card의 data-id를 지정할 때 사용되는 id
   * @param {String} content: Card Item의 내용
   * @return {element} Card
   */
  static createCard(id, content) {
    const root = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardEditBtn = document.createElement("button");
    const cardEditIcon = document.createElement("i");

    root.dataset.id = id;

    root.classList.add("card");
    cardContent.classList.add("card__content");
    cardEditBtn.classList.add("card__editBtn");
    cardEditIcon.classList.add("fa");
    cardEditIcon.classList.add("fa-pen");

    root.draggable = true;
    cardContent.innerText = content;

    root.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("card-id", event.target.dataset.id);
    });

    cardEditBtn.appendChild(cardEditIcon);
    root.appendChild(cardContent);
    root.appendChild(cardEditBtn);

    return root;
  }
}
