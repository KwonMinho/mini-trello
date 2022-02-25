/**
 * enums.js은 해당 브라우저 애플리케이션에서 사용하는 Enum 타입들이 정의된 파일
 */

/**
 * @enum
 * @description: Board 섹션에 존재하는 태그 컴포넌트들을 구별하기 위한 enum
 */
export const BoardTagEnum = {
  LIST: "LIST",
  CARD: "CARD",
  ADD_ITEM: "ADD_ITEM",
  DROP_ZONE: "DROP_ZONE",
};

/**
 * @enum
 * @description: Board 섹션에 존재하는 태그 컴포넌트의 타입을 한국어로 변환하기 위한 enum
 *               태그 컴포넌트의 타입에 대한 번역은 브라우저 애플리케이션 사용자에게 출력하기 위함이다
 */
export const BoardTagNameKor = {
  LIST: "리스트",
  CARD: "TO-DO 카드",
};

/**
 * @enum
 * @description: 태그 컴포넌트인 "Add-Item"의 상태 변화에 사용되는 enum
 */
export const AddItemModeEnum = {
  INACTIVE: "add-item",
  ACTIVE: "add-item--active",
};
