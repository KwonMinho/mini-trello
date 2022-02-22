import { Event } from "../common/event.js";

export class Dropzone {
  /**
   * @description: Card 아이템 이동을 위한 "Dropzone" 태그를 만들어서 반환하는 함수
   * @param {String} uuid: dropZone 태그의 data-id를 지정할 때 사용되는 uuid
   * @return {element} dropZone 태그
   */
  static createDropzone(uuid) {
    const root = document.createElement("div");

    root.classList.add("card__dropzone");
    root.dataset.id = uuid + "#dz";

    root.addEventListener("dragover", (event) => {
      event.preventDefault();
      root.classList.add("card__dropzone--active");
    });

    root.addEventListener("dragleave", () => {
      root.classList.remove("card__dropzone--active");
    });

    /**
     * 1. 현재 drop된 카드와 현재 dropzone의 아이디(+#dz)가 똑같으면 이동하지 않음
     * 2. 아니라면, 현재 dropzone 밑에 drop 카드와 해당 카드의 바로 아래 dropzone 같이 이동시켜줌
     */
    root.addEventListener("drop", (event) => {
      const root = event.target;
      const dropPlaceId = root.dataset.id.replace("#dz", "");
      const cardId = event.dataTransfer.getData("card-id");
      const card = document.querySelector(`[data-id="${cardId}"]`);
      const cardDropzone = document.querySelector(`[data-id="${cardId}#dz"]`);

      root.classList.remove("card__dropzone--active");
      // (현재 drop된 컨테이너가 현재 드랍존의 아이디와 같으면 return)
      if (cardId === dropPlaceId) {
        return;
      }

      // rootId -- card.id   , newRootId -- RootId에 삽입되어야하는 위치
      Event.updateDom("move-card", {
        cardId: cardId,
        curListId: card.parentNode.parentNode.id,
        nextListId: root.parentNode.parentNode.id,
        afterCardId: dropPlaceId,
      });
      root.after(cardDropzone);
      root.after(card);
      //#updatepoint
    });

    return root;
  }
}
