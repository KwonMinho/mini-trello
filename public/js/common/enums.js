/**
 * @enum
 * @description: boardItem의 타입을 구별하기 위한 enum
 */
export const BoardItemEnum = {
  LIST: "LIST",
  CARD: "CARD",
};

export function dd() {
  return;
}

/**
 * @enum
 * @description: boardItem의 타입을 한국어로 변환해주는 enum
 */
export const BoardItemNameKor = {
  LIST: "리스트",
  CARD: "TO-DO 카드",
};

/**
 * @enum
 * @description: addItem의 디폴트 모드와 입력 모드를 구별하기 위한 enum
 */
export const AddItemModeEnum = {
  INACTIVE: "add-item",
  ACTIVE: "add-item--active",
};
