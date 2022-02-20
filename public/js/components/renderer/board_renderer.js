import { Renderer } from "./renderer.js";

const AddItemEnum = {
  List: "List",
  Card: "Card",
};

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
   */
  _init() {
    this.addItemComments = {};
    this.addItemComments[AddItemEnum.List] = "Add another list...";
    this.addItemComments[AddItemEnum.Card] = "Add another card...";

    const addItemTag = this._createAddItem(AddItemEnum.List);
    this._render(addItemTag);
  }

  /**
   * @description: board 아이템인 "Add-item" 태그를 만들어서 반환하는 함수
   * @param {AddItemEnum} type: Add item type
   */
  _createAddItem(type) {
    // [반환되는 "Add-item"태그]
    // <div class="add-item board__item">
    //    <button class="add-item__btn">+</button>
    //    <p class="add-item__comment">Add another XXX</p>
    // </div>

    // create elements
    const addItem = document.createElement("div");
    addItem.classList.add("add-item");
    addItem.classList.add("board__item");

    const addItemBtn = document.createElement("button");
    addItemBtn.classList.add("add-item__btn");
    addItemBtn.innerText = "+";

    const addItemComment = document.createElement("p");
    addItemComment.classList.add("add-item__comment");
    addItemComment.innerText = this.addItemComments[type];

    // Assembly elements
    addItem.appendChild(addItemBtn);
    addItem.appendChild(addItemComment);

    return addItem;
  }

  addList(e) {
    console.log(e);
  }
}
