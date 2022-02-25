import { Event } from "../common/event.js";

/**
 * 태그 컴포넌트인 dropzone를 생성하기 위한 클래스
 *
 * @class Dropzone
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class Dropzone {
  /**
   * @description: "Dropzone"를 만들어서 반환하는 함수
   * @param {String} id: dropZone의 data-id를 지정할 때 사용되는 id
   * @return {element} dropZone 태그
   */
  static createDropzone(id) {
    const root = document.createElement("div");

    root.classList.add("card__dropzone");
    root.dataset.id = id + "#dz";

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
      event.target.classList.remove("card__dropzone--active");

      const root = event.target;
      const dropPlaceId = root.dataset.id.replace("#dz", "");
      const cardId = event.dataTransfer.getData("card-id");
      const card = document.querySelector(`[data-id="${cardId}"]`);
      const cardDropzone = document.querySelector(`[data-id="${cardId}#dz"]`);
      const curListId = card.parentNode.parentNode.id;
      const curNextListId = root.parentNode.parentNode.id;

      // (card가 drop된 곳이 자신의 현재 위치일때)
      if (cardId === dropPlaceId) return;

      root.after(cardDropzone);
      root.after(card);

      Event.changeTag(
        Event.TYPE.BOARD.MOVE_CARD,
        Event.PAYLOAD.TAG.moveBoardCard(
          cardId,
          curListId,
          curNextListId,
          dropPlaceId
        )
      );
    });

    return root;
  }
}
