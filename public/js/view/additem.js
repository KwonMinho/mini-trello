import {
  BoardTagEnum,
  AddItemModeEnum,
  BoardTagNameKor,
} from "../common/enums.js";
import { Event } from "../common/event.js";
import { generateUUID } from "../common/uuid.js";

/**
 * 태그 컴포넌트인 AddItem를 생성하기 위한 클래스
 *
 *
 * @class AddItem
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.24
 */
export class AddItem {
  /**
   * @description: "AddItem"를 만들어서 반환하는 함수
   * @param {BoardTagEnum} type: AddItem type
   * @param {number} listId: (option)카드에 대한 리스트의 아이디
   * @return {element} addItem
   */
  static createAddItem(type, listId) {
    const root = document.createElement("div");
    const activeBtn = document.createElement("button");
    const comment = document.createElement("p");
    const addItemInput = document.createElement("input");
    const btnContainer = document.createElement("div");
    const addBtn = document.createElement("button");
    const inactiveBtn = document.createElement("button");

    root.classList.add("add-item");
    if (type === BoardTagEnum.LIST) {
      root.classList.add("board__item");
    }

    activeBtn.classList.add("add-item__activeBtn");
    comment.classList.add("add-item__comment");
    btnContainer.classList.add("add-item__btnContainer");
    addBtn.classList.add("add-item__addBtn");
    inactiveBtn.classList.add("add-item__inactiveBtn");
    addItemInput.classList.add("add-item__input");

    addItemInput.placeholder = `Enter ${type} name`;
    addBtn.innerText = `Add ${type}`;
    inactiveBtn.innerText = "X";
    activeBtn.innerText = "+";
    comment.innerText = `Add another ${type}`;

    btnContainer.appendChild(addBtn);
    btnContainer.appendChild(inactiveBtn);

    // When INACTIVE mode, addItemInput & btnCotainer Invisible
    btnContainer.style.display = "none";
    addItemInput.style.display = "none";

    // Assembly elements
    root.appendChild(activeBtn);
    root.appendChild(comment);
    root.appendChild(addItemInput);
    root.appendChild(btnContainer);

    activeBtn.addEventListener("click", AddItem._transitionAddItemMode);
    inactiveBtn.addEventListener("click", AddItem._transitionAddItemMode);
    addBtn.addEventListener("click", () => {
      const title = addItemInput.value;
      if (title === "") {
        alert(`${BoardTagNameKor[type.toUpperCase()]} 이름을 입력해주세요!`);
        return;
      }
      addItemInput.value = "";

      Event.changeTag(
        Event.TYPE.BOARD[`ADD_${type}`],
        Event.PAYLOAD.TAG.addBoardItem(generateUUID(), title, listId)
      );
    });

    return root;
  }

  /**
   * @description add-item의 상태 변화 동작 함수 (상태: INACTIVE or ACTIVE)
   * @param {event} event: Click event in window apis
   */
  static _transitionAddItemMode(event) {
    let root;

    if (event.target.classList[0] === "add-item__inactiveBtn") {
      root = event.target.parentNode.parentNode;
    } else {
      root = event.target.parentNode;
    }

    if (root.classList[0] == AddItemModeEnum.INACTIVE) {
      root.classList.replace(AddItemModeEnum.INACTIVE, AddItemModeEnum.ACTIVE);
    } else {
      root.classList.replace(AddItemModeEnum.ACTIVE, AddItemModeEnum.INACTIVE);
    }

    root.childNodes.forEach((element) => {
      if (element.style.display === "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }
}
