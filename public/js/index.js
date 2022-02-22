import { BoardRenderer } from "./components/renderer/board.renderer.js";
import { BoardState } from "./components/board.state.js";

const boardItemArea = document.querySelector("#board__lists");

new BoardRenderer(boardItemArea);
new BoardState();
