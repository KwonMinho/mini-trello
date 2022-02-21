import { Renderer } from "./renderer.js";

/**
 * 이 클래스는 View-Renderer 컴포넌트입니다.
 * 해당 클래스에서는 State-Storage와 브라우저 앱 UI 사이에서 상호작용하여, board와 관련된 태그를 조립하는 역할입니다.
 *
 * @class ViewRenderer
 * @version 1.0.0
 * @author minho(alsgh458-gmail)
 * @see None
 * @since 22.02.21
 */
export class BoardRenderer extends Renderer {
  /**
   * @override
   * @private
   * @description: 인스턴스될 때 실행되는 함수
   */
  _init() {
    const addListItem = this._createAddItem(AddItemEnum.LIST);
    this._render(addListItem);
  }

  /**
   * [반환되는 "Add-item"태그]
   *  <div class="add-item board__item">
   *     <button class="add-item__btn">+</button>
   *    <p class="add-item__comment">Add another XXX</p>
   * </div>
   * @private
   * @description: board 아이템인 "Add-item" 태그를 만들어서 반환하는 함수
   * @param {AddItemEnum} type: Add item type
   */
  _createAddItem(type) {
    // Create elements
    const addItem = document.createElement("div");
    addItem.classList.add("add-item");
    addItem.classList.add("board__item");

    const transitionBtn = document.createElement("button");
    transitionBtn.classList.add("add-item__transitionBtn");
    transitionBtn.innerText = "+";
    transitionBtn.addEventListener("click", this._transitionAddItemMode);

    const comment = document.createElement("p");
    comment.classList.add("add-item__comment");
    comment.innerText = `Add another ${type}`;

    // Tags used in input mode
    const addItemInput = document.createElement("input");
    addItemInput.placeholder = `Enter ${type} name`;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("add-item__btnContainer");
    const addBtn = document.createElement("button");
    addBtn.classList.add("add-item__addBtn");
    addBtn.innerText = `Add ${type}`;
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("add-item__cancelBtn");
    cancelBtn.innerText = "X";
    cancelBtn.addEventListener("click", this._transitionAddItemMode);

    // When default mode, addItemInput & btnCotainer Invisible
    btnContainer.style.display = "none";
    addItemInput.style.display = "none";

    // Assembly elements
    btnContainer.appendChild(addBtn);
    btnContainer.appendChild(cancelBtn);

    addItem.appendChild(transitionBtn);
    addItem.appendChild(comment);
    addItem.appendChild(addItemInput);
    addItem.appendChild(btnContainer);

    return addItem;
  }

  /**
   * @private
   * @description add-item의 모드 상태를 변화시키는 작업을 수행하는 함수 (상태: default or input)
   * @callback: in cancelBtn of AddItem, transitionBtn of AddItem
   * @param {event} event: Click event in window apis
   */
  _transitionAddItemMode(event) {
    let addItem;

    if (event.target.classList[0] === "add-item__cancelBtn") {
      addItem = event.target.parentNode.parentNode;
    } else {
      addItem = event.target.parentNode;
    }

    if (addItem.classList[0] == AddItemModeEnum.DEFAULT) {
      addItem.classList.replace(AddItemModeEnum.DEFAULT, AddItemModeEnum.INPUT);
    } else {
      addItem.classList.replace(AddItemModeEnum.INPUT, AddItemModeEnum.DEFAULT);
    }

    addItem.childNodes.forEach((element) => {
      if (element.style.display === "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }

  addList(e) {
    console.log(e);
  }
}

const AddItemEnum = {
  LIST: "List",
  CARD: "Card",
};

const AddItemModeEnum = {
  DEFAULT: "add-item",
  INPUT: "add-item__input",
};
