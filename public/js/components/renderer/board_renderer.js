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
    this.__render(addListItem, document.querySelector("#board"));
  }

  /**
   * @private
   * @description: boardItem(List or Card)를 board에 생성해서 조립하는 함수
   * @param {BoardItemEnum} type: boardItem 타입
   * @param {String} content: addItem에 입력된 아이템 타이틀
   * @param {Element} listItem: 카드 추가 이벤트가 발생된 List 아이템 (option)
   */
  _addBoardItem(type, content, listItem) {
    if (type === BoardItemEnum.LIST) {
      const list = this._createList(content);
      this.__render(list);
    } else {
      const uuid = generateUUID();
      const card = this._createCard(content, uuid);
      const cardDropzone = this._createCardDropzone(uuid);

      this.__render(card, listItem);
      this.__render(cardDropzone, listItem);
    }
  }

  /**
   * @private
   * @description: board 아이템인 "List" 태그를 만들어서 반환하는 함수
   * @param {String} title: 리스트 이름
   * @return {Element} List item tag
   */
  _createList(title) {
    const listContainer = document.createElement("div");
    const titleContainer = document.createElement("div");
    const cardsContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const hr = document.createElement("hr");
    const uuid = generateUUID();
    const cardDropzone = this._createCardDropzone(uuid);
    const addCardItem = this._createAddItem(BoardItemEnum.CARD, cardsContainer);

    listContainer.classList.add("list");
    listContainer.classList.add("board__item");
    titleContainer.classList.add("list__name");
    cardsContainer.classList.add("list__items");

    h3.innerText = title;

    titleContainer.appendChild(h3);
    cardsContainer.appendChild(cardDropzone);
    listContainer.appendChild(titleContainer);
    listContainer.appendChild(cardsContainer);
    listContainer.appendChild(hr);
    listContainer.appendChild(addCardItem);

    return listContainer;
  }

  /**
   * @private
   * @description: Card 아이템 이동을 위한 "Dropzone" 태그를 만들어서 반환하는 함수
   * @param {String} uuid: dropZone 태그의 data-id를 지정할 때 사용되는 uuid
   * @return {element} dropZone 태그
   */
  _createCardDropzone(uuid) {
    const dropZone = document.createElement("div");

    dropZone.classList.add("card__dropzone");
    dropZone.dataset.id = uuid + "#dz";

    dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropZone.classList.add("card__dropzone--active");
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("card__dropzone--active");
    });

    /**
     * 1. 현재 drop된 카드와 현재 dropzone의 아이디(+#dz)가 똑같으면 이동하지 않음
     * 2. 아니라면, 현재 dropzone 밑에 drop 카드와 해당 카드의 바로 아래 dropzone 같이 이동시켜줌
     */
    dropZone.addEventListener("drop", (event) => {
      const cardId = event.dataTransfer.getData("card-id");
      const dropzoneId = event.target.dataset.id;
      dropZone.classList.remove("card__dropzone--active");

      // (현재 drop된 컨테이너가 현재 드랍존의 아이디와 같으면 return)
      if (cardId === dropzoneId.replace("#dz", "")) {
        return;
      }
      const card = document.querySelector(`[data-id="${cardId}"]`);
      const cardDropzone = document.querySelector(`[data-id="${cardId}#dz"]`);
      const dropzone = event.target;

      dropzone.after(cardDropzone);
      dropzone.after(card);
    });

    return dropZone;
  }

  /**
   * @private
   * @description: board 아이템인 "Card" 태그를 만들어서 반환하는 함수
   * @param {String} content: Card Item의 내용
   * @param {String} uuid: Card 태그의 data-id를 지정할 때 사용되는 uuid
   * @return {element} Card item tag
   */
  _createCard(content, uuid) {
    const card = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardEditBtn = document.createElement("button");
    const cardEditIcon = document.createElement("i");

    card.dataset.id = uuid;

    card.classList.add("card");
    cardContent.classList.add("card__content");
    cardEditBtn.classList.add("card__editBtn");
    cardEditIcon.classList.add("fa");
    cardEditIcon.classList.add("fa-pen");

    card.draggable = true;
    cardContent.innerText = content;

    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("card-id", event.target.dataset.id);
    });

    cardEditBtn.appendChild(cardEditIcon);
    card.appendChild(cardContent);
    card.appendChild(cardEditBtn);

    return card;
  }

  /**
   * @private
   * @description: board 아이템인 "AddItem" 태그를 만들어서 반환하는 함수
   * @param {BoardItemEnum} type: AddItem type
   * @return {element} addItem tag
   */
  _createAddItem(type, replaceBase) {
    const self = this;
    const addItem = document.createElement("div");
    const activeBtn = document.createElement("button");
    const comment = document.createElement("p");
    const addItemInput = document.createElement("input");
    const btnContainer = document.createElement("div");
    const addBtn = document.createElement("button");
    const inactiveBtn = document.createElement("button");

    addItem.classList.add("add-item");
    if (type === BoardItemEnum.LIST) {
      addItem.classList.add("board__item");
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

    activeBtn.addEventListener("click", this._transitionAddItemMode);
    inactiveBtn.addEventListener("click", this._transitionAddItemMode);
    addBtn.addEventListener("click", () => {
      const title = addItemInput.value;
      if (title === "") {
        alert(`${BoardItemNameKor[type.toUpperCase()]} 이름을 입력해주세요!`);
        return;
      }
      addItemInput.value = "";
      self._addBoardItem(type, title, replaceBase);
    });

    // When INACTIVE mode, addItemInput & btnCotainer Invisible
    btnContainer.style.display = "none";
    addItemInput.style.display = "none";

    // Assembly elements
    addItem.appendChild(activeBtn);
    addItem.appendChild(comment);
    addItem.appendChild(addItemInput);
    addItem.appendChild(btnContainer);

    return addItem;
  }

  /**
   * @private
   * @description add-item의 모드 상태를 변화시키는 작업을 수행하는 함수 (상태: INACTIVE or ACTIVE)
   * @callback: in inactiveBtn of AddItem, active of AddItem
   * @param {event} event: Click event in window apis
   */
  _transitionAddItemMode(event) {
    let addItem;

    if (event.target.classList[0] === "add-item__inactiveBtn") {
      addItem = event.target.parentNode.parentNode;
    } else {
      addItem = event.target.parentNode;
    }

    if (addItem.classList[0] == AddItemModeEnum.INACTIVE) {
      addItem.classList.replace(
        AddItemModeEnum.INACTIVE,
        AddItemModeEnum.ACTIVE
      );
    } else {
      addItem.classList.replace(
        AddItemModeEnum.ACTIVE,
        AddItemModeEnum.INACTIVE
      );
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

const generateUUID = () => {
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

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
 * @description: boardItem의 타입을 한국어로 변환해주는 enum
 */
const BoardItemNameKor = {
  LIST: "리스트",
  CARD: "TO-DO 카드",
};

/**
 * @enum
 * @description: addItem의 디폴트 모드와 입력 모드를 구별하기 위한 enum
 */
const AddItemModeEnum = {
  INACTIVE: "add-item",
  ACTIVE: "add-item--active",
};
