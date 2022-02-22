import {
  BoardItemEnum,
  AddItemModeEnum,
  BoardItemNameKor,
} from "../common/enums.js";
import { Event } from "../common/event.js";

export class AddItem {
  /**
   * @description: board 아이템인 "AddItem" 태그를 만들어서 반환하는 함수
   * @param {BoardItemEnum} type: AddItem type
   * @param {number} rootId: (option)카드가 더해지는 리스트 아이디 태그
   * @return {element} addItem tag
   */
  static createAddItem(type, rootId) {
    const root = document.createElement("div");
    const activeBtn = document.createElement("button");
    const comment = document.createElement("p");
    const addItemInput = document.createElement("input");
    const btnContainer = document.createElement("div");
    const addBtn = document.createElement("button");
    const inactiveBtn = document.createElement("button");

    root.classList.add("add-item");
    if (type === BoardItemEnum.LIST) {
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
        alert(`${BoardItemNameKor[type.toUpperCase()]} 이름을 입력해주세요!`);
        return;
      }
      addItemInput.value = "";
      Event.updateDom(`add-${type}`, {
        title: title,
        rootId: rootId,
      });
    });

    return root;
  }

  /**
   * @description add-item의 모드 상태를 변화시키는 작업을 수행하는 함수 (상태: INACTIVE or ACTIVE)
   * @callback: in inactiveBtn of AddItem, active of AddItem
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
