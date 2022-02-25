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

export default class StateService {
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
    return this.state.version === version;
  }

  updateState(type: string, updated: any) {
    console.log(type, updated);
    switch (type) {
      case "BOARD#ADD_LIST":
        this.addBoardList(updated.title);
        break;
      case "BOARD#ADD_CARD":
        this.addBoardCard(updated.id, updated.title, Number(updated.listId));
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

  private addBoardCard(id: string, title: string, listId: number) {
    const list = this.state.board.filter((list) => list.id === listId)[0];
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
