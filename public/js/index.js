import { BoardRenderer } from "./components/renderer/board.renderer.js";
import { StateManger } from "./components/state/state-manger.js";

const boardArea = document.querySelector("#board__lists");
new BoardRenderer(boardArea);
new StateManger();
