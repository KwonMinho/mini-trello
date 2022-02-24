type State = {
  version: number;
  board: List[];
};

type Card = {
  id: string;
  title: string;
};

type List = {
  id: number;
  title: string;
  cards: Card[];
};

export default class VirtualStateService {
  private state: State;

  constructor() {
    this.state = {
      version: 0,
      board: new Array<List>(),
    };
  }

  getCurrentState(): State {
    return this.state;
  }

  getStateVersion(): number {
    return this.state.version;
  }

  isLatestVersion(version: number) {
    console.log(version);
    console.log(this.state.version);
    return this.state.version === version;
  }

  getUpdateStateEventHistory() {
    // V-LIST(1), S-LIST(1) 비교
    // V-LIST(1) != S-LIST(1) 같지 않으면,
    // 1. V-LIST(1)을 move에 넣기전에, card에 있다면 해당 card의 정보를 완성해서 move에 옮기기,
    // 아니라면 그냥 move에 넣기
    // 2. S-LIST(1)을 card에 넣기 전에, move에 있다면 move 정보완성, 그게아니라면 card에 넣기
    // 계속 비교
    // V-LIST > S-LIST
    // V-LIST 남은 녀석들 하나씩 순회하면서 새로운 리스트에 넣기
    // 그리고 카드들 순회하면서 move 정보에 있는지 확인, 없다면 그냥 card에 넣기
  }

  updateState(type: string, updated: any) {
    console.log(type, updated);
    switch (type) {
      case "BOARD#ADD_LIST":
        this.addBoardList(updated.title);
        break;
      case "BOARD#ADD_CARD":
        this.addBoardCard(updated.id, updated.title, Number(updated.rootId));
        break;
      case "BOARD#MOVE_CARD":
        this.moveBoardCard(
          updated.cardId,
          Number(updated.curListId),
          Number(updated.nextListId),
          updated.dropzoneId
        );
        break;
    }
    this.state.version += 1;
    return this.state.version;
  }

  private addBoardList(title: string) {
    this.state.board.push({
      id: this.state.board.length,
      title: title,
      cards: new Array<Card>(),
    });
  }

  private addBoardCard(id: string, title: string, rootId: number) {
    const list = this.state.board.filter((list) => list.id === rootId)[0];
    list.cards.push({
      id: id,
      title: title,
    });
  }

  /**
   * @param {object} updateData {cardId, curListId, nextListId, dropzoneId}
   */
  private moveBoardCard(
    cardId: string,
    curListId: number,
    nextListId: number,
    dropzoneId: string
  ) {
    console.log(this.state.board);

    const curList: List = this.state.board[Number(curListId)];
    const curCard: Card = curList.cards.filter((card) => cardId === card.id)[0];
    curList.cards = curList.cards.filter((card) => cardId !== card.id);

    const nextList: List = this.state.board[Number(nextListId)];
    if (nextList.cards.length == 0) {
      nextList.cards.push(curCard);
      return;
    }
    nextList.cards.forEach((card, index) => {
      if (card.id === dropzoneId) {
        nextList.cards.splice(index + 1, 0, curCard);
      }
    });
  }
}
//   updateUserClickEvent() {}
