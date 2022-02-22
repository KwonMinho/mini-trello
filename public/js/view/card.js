export class Card {
  /**
   * @description: board 아이템인 "Card" 태그를 만들어서 반환하는 함수
   * @param {String} uuid: Card 태그의 data-id를 지정할 때 사용되는 uuid
   * @param {String} content: Card Item의 내용
   * @return {element} Card item tag
   */
  static createCard(uuid, content) {
    const root = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardEditBtn = document.createElement("button");
    const cardEditIcon = document.createElement("i");

    root.dataset.id = uuid;

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
