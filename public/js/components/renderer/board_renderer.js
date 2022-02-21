import { Renderer } from "./renderer.js";

/**
 * 이 클래스는 Board-Renderer 컴포넌트입니다.
 * 해당 클래스에서는 State-Storage와 브라우저 앱 UI 사이에서 상호작용하여, board와 관련된 태그 아이템를 생성하고 조립하는 역할입니다.
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
   * @protected
   * @description: board 인스턴스될 때 실행되는 함수
   */
  __init() {
    const addListItem = this._createAddItem(BoardItemEnum.LIST);
    this.__render(addListItem);
  }

  /**
   * @private
   * @description boardItem(List or Card)를 board에 생성해서 조립하는 함수
   * @param {BoardItemEnum} type: boardItem 타입
   * @param {String} content: addItem에 입력된 아이템 타이틀
   * @param {Element} listItem: 카드 추가 이벤트가 발생된 List 아이템 (option)
   */
  _addBoardItem(type, content, listItem) {
    if (type === BoardItemEnum.LIST) {
      const list = this._createList(content);
      this.__render(list);
    } else {
      const card = this._createCard(content);
      const cardDropzone = this._createCardDropzone();
      this.__render(card, listItem);
      this.__render(cardDropzone, listItem);
    }
  }

  /**
   * @private
   * @param {String} title: 리스트 이름
   * @return {Element} List tag
   */
  _createList(title) {
    const listContainer = document.createElement("div");
    listContainer.classList.add("list");
    listContainer.classList.add("board__item");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("list__name");
    const h3 = document.createElement("h3");
    h3.innerText = title;
    titleContainer.appendChild(h3);

    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("list__items");

    const hr = document.createElement("hr");

    const addCardItem = this._createAddItem(BoardItemEnum.CARD, cardsContainer);

    // Assembly elements
    listContainer.appendChild(titleContainer);
    listContainer.appendChild(cardsContainer);
    listContainer.appendChild(hr);
    listContainer.appendChild(addCardItem);

    return listContainer;
  }

  /**
   * @private
   * @description: board 아이템인 "AddItem" 태그를 만들어서 반환하는 함수
   * @param {BoardItemEnum} type: AddItem type
   * @return {element} addItem tag
   */
  _createCardDropzone() {
    const dropzone = document.createElement("div");
    dropzone.classList.add("card__dropzone");
    return dropzone;
  }

  /**
   * @private
   * @description: board 아이템인 "AddItem" 태그를 만들어서 반환하는 함수
   * @param {BoardItemEnum} type: AddItem type
   * @return {element} addItem tag
   */
  _createCard(title) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card__content");
    cardContent.innerText = title;
    const cardEditBtn = document.createElement("button");
    cardEditBtn.classList.add("card__editBtn");

    const cardEditIcon = document.createElement("i");
    cardEditIcon.classList.add("fa");
    cardEditIcon.classList.add("fa-pen");

    cardEditBtn.appendChild(cardEditIcon);
    cardContainer.appendChild(cardContent);
    cardContainer.appendChild(cardEditBtn);

    return cardContainer;
  }

  /**
   * @private
   * @description: board 아이템인 "AddItem" 태그를 만들어서 반환하는 함수
   * @param {BoardItemEnum} type: AddItem type
   * @return {element} addItem tag
   */
  _createAddItem(type, replaceBase) {
    // Create elements
    const addItem = document.createElement("div");
    addItem.classList.add("add-item");
    if (type === BoardItemEnum.LIST) addItem.classList.add("board__item");

    const transitionBtn = document.createElement("button");
    const comment = document.createElement("p");

    transitionBtn.classList.add("add-item__transitionBtn");
    comment.classList.add("add-item__comment");

    transitionBtn.innerText = "+";
    comment.innerText = `Add another ${type}`;

    transitionBtn.addEventListener("click", this._transitionAddItemMode);

    // Tags used in input mode
    const addItemInput = document.createElement("input");
    const btnContainer = document.createElement("div");
    const addBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

    btnContainer.classList.add("add-item__btnContainer");
    addBtn.classList.add("add-item__addBtn");
    cancelBtn.classList.add("add-item__cancelBtn");

    addItemInput.placeholder = `Enter ${type} name`;
    addBtn.innerText = `Add ${type}`;
    cancelBtn.innerText = "X";
    btnContainer.appendChild(addBtn);
    btnContainer.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", this._transitionAddItemMode);

    // When default mode, addItemInput & btnCotainer Invisible
    btnContainer.style.display = "none";
    addItemInput.style.display = "none";

    // AddItem event listenr
    const self = this;
    addBtn.addEventListener("click", () => {
      const title = addItemInput.value;
      if (title === "") {
        alert(`${type} 이름을 입력해주세요!`);
        return;
      }
      addItemInput.value = "";
      self._addBoardItem(type, title, replaceBase);
    });

    // Assembly elements
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
}

/**
 * @enum
 * @description: boardItem의 타입을 구별하기 위한 enum
 */
const BoardItemEnum = {
  LIST: "List",
  CARD: "Card",
};

/**
 * @enum
 * @description: addItem의 디폴트 모드와 입력 모드를 구별하기 위한 enum
 */
const AddItemModeEnum = {
  DEFAULT: "add-item",
  INPUT: "add-item__input",
};
