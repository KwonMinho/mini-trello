# 고민

- 나는 이 프로젝트가 끝나면, 다른 사람한테 인수인계한다고 생각하고 작업하기 (문서화 어떻게 할 것인지 고민)
  - public 폴더 구조 설명
  - html 디자인 구성 설명
- 한 화면에 사용자가 리스트와 카드를 한 화면에 몇개까지 보게 할 것이냐
- 브라우저 애플리케이션 아키텍처 만들기, 어떤게 좋지? (디자인패턴 좋은 사례 찾아보기, react, vuew)
  1. 뭘 중요하게 생각해야하지.
     1. 잦은 화면 변경이 일어난다. --> 어떻게 효율적으로 업데이트 할 것인가
     2. 화면 업데이트가 일어날 때마다 --> 어떠한 방식으로 서버랑 동기화시킬 것인가
     3. 하나의 역할에만 집중하도록(최대한 의존성 낮추기, 화면-데이터저장-업데이트 API 프로세서 분리)

# frontend-아키텍처

```
[@UI@]<-(event)->[View-Renderer]<-(api)->[State-Storage]<-(api)->[State-Manager]<-(api)->[@Server@]
```

## View-Renderer

```
상태 저장소와 UI 사이에서 상호작용하여, board와 관련된 태그를 조립하는 역할(랜더)

조립에서 사용되는 컴포넌트 태그: List, Card
```

태그 조립을 하는 경우

1. 리스트 추가 버튼을 누를때(리스트 추가 입력 화면으로 업데이트, replace)
2. 리스트 추가 입력 화면에서 추가 버튼을 누를때(add)
3. 카드 추가 버튼을 누를때(카드 추가 입력 화면으로 업데이트, replace)
4. 카드 추가 입력 화면에서 추가 버튼을 누를때(add,쌓인다)
5. 카드를 drag&drop 할때 (move, 리스트 내에서, 한 리스트에서 다른 리스트으로 옮길때)
6. 카드 이름을 업데이트할때

### 주요 동작

0. constructor: initRedner()->render();
1. init(): State-Store에 등록된 상태를 가져와 조립한다.
2. createList():
3. createCard():
4. updateCardName():
5. moveCard(type):
6. render():

## State Storage

```
앱의 상태가 보관되는 곳

상태 저장소는 뷰 렌더러하고 상태 감시자에 의해서 업데이트된다.
```

## State Manager

```
현재 브라우저에서 변경된 상태 저장소를 서버에게 알리거나, 서버에서 저장된 상태를 가져와 상태 저장소를 업데이트하는 역할
```

## Event

```
  static TYPE = {
    UPDATE_DOM: "update-state",
    UPDATE_STATE: "update-dom";
  };

  static MESSAGE_TYPE = {
    BOARD_INIT: "BOARD#INIT",
    BOARD_ADD_LIST: "BOARD#ADD_LIST",
    BOARD_ADD_CARD: "BOARD#ADD_CARD",
    BOARD_MOVE_CARD: "BOARD#MOVE_CARD",
  }
```

### UpdateStateEvent

```
type: 동작-대상
payload: 전달한 데이터
```

```
type: init-board
payload: {object} boardstate
```

```
type: add-list
payload: {
  id, title
}
```

```
type: add-card
payload: {
  id, title, rootId
}
```

### update-dom

```
type: add-list, add-card, move-card
(add-list)
payload:{title}
(add-card)
payload: {title, rootId}
(move-card)
payload: {cardId, curListId,, nextListId, afterCardId}
```

---

# 성능

- <script defer>:  페이지가 모두 로드된 후에 해당 외부 스크립트가 실행됨 명시

# 메모

- 가독성을 위한 HTML 파일 분리하기 (<div w3-include-html=""></div>)
- representation tag 사용해서 가독성 올리기 (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
- 브라우저 호환성 체크: https://caniuse.com/

# 순서

1. html 섹션화
2. header section 디자인
3. board section에 board 기초 레이어 잡기
4. board section에 items들 기초 레이어 잡기
5. 프론트엔드 아키텍처
6. board_renderer 클래스 생성
7. addItem, List, Card 추가 기능
8.

# 컴포넌트 아이템(list, board) 문서

- base: board-item
- type: list, card, add-item

## list component

```html
<div class="list board__item">
  <div class="list__name">
    <h3>Not Started</h3>
  </div>

  <div class="list__items">
    [1번 card component]
    <div class="card__dropzone"></div>
    [2번 card component]
    <div class="card__dropzone"></div>

    ...
  </div>

  <hr />

  <div class="add-item">
    <button class="add-item__btn">+</button>
    <p class="add-item__comment">Add anothes card</p>
  </div>
</div>
```

## card component

```html
<div class="card" draggable="true">
  <div class="card__content">Wash</div>
  <button class="card__editBtn"><i class="fa fa-pen"></i></button>
</div>
```

## card dropzone

```html
<div class="card__dropzone"></div>
```

## add-item component

```html
<div class="add-item board__item">
  <button class="add-item__btn">+</button>
  <p class="add-item__comment">Add another list</p>
</div>
```

## add-item(input) component

```html
<div class="add-item__input board__item">
    <input placeholder="Enter XXX ....."></input>
    <div class="add-item__btnContainer">
        <button class="add-item__addBtn">Add XXX</button>
        <button class="add-item__cancelBtn">X</button>
    </div>
</div>
```

<br>

---

# 기능별 컴포넌트의 변화

## 리스트 추가 기능

이벤트에 의한 add-item 상태 변화

```
<add-item: 기본 상태> --add-item__btn 클릭-->  <add-item: 입력 상태>
                                                |
                                                |--add-item__cancelBtn 클릭--> <add-item: 기본 상태>
                                                |
                                                |--add-item__addBtn 클릭--> <list>
```

1. 리스트 추가 버튼 클릭 전

```html
<div class="add-item">
  <button class="add-item__btn">+</button>
  <p class="add-item__comment">Add another card</p>
</div>
```

2. 리스트 추가 버튼 클릭 후

```html
<div class="add-item__input board__item">
    <input placeholder="Enter XXX ....."></input>
    <div class="add-item__btnContainer">
        <button class="add-item__addBtn">Add XXX</button>
        <button class="add-item__cancelBtn">X</button>
    </div>
</div>
```
