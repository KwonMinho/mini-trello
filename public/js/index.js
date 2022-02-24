import { BoardRenderer } from "./render/board.renderer.js";
import { State } from "./state/state.js";
import { VirtualState } from "./state/virtual-state.js";

const endpoint = "http://localhost:8888/api/virtual-state";
const pollingTime = 3000;
const pollingPath = "/version/";
const pollingWaitTime = 5000;
const boardArea = document.querySelector("#board__lists");

new BoardRenderer(boardArea);
new State();
new VirtualState(endpoint, pollingTime, pollingPath);
