# 고민

- 나는 이 프로젝트가 끝나면, 다른 사람한테 인수인계한다고 생각하고 작업하기 (문서화 어떻게 할 것인지 고민)
  - public 폴더 구조 설명
  - html 디자인 구성 설명
- 한 화면에 사용자가 리스트와 카드를 한 화면에 몇개까지 보게 할 것이냐
- (브라우저 앱의 state 관리 및 원격 저장 업데이터) 저장한 값 변경-> 업데이트 데이터 api 백그라운드(아키텍처 그리기)

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
    <p class="add-item__comment">Add anothescard</p>
  </div>
</div>
```

## card component

```html
<div class="card">
  <div class="card__content">Wash</div>
  <button class="card__editBtn"><i class="fa fa-pen"></i></button>
</div>
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
