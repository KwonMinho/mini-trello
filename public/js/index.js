import { BoardRenderer } from "./render/board.renderer.js";
import { State } from "./state/state.js";
import { VirtualDom } from "./view/virtual-dom.js";

new BoardRenderer({ base: document.querySelector("#board__lists") });
new State();
new VirtualDom({
  endpoint: "http://localhost:8080/api/state",
  pollingTime: 1000,
  pollingPath: "/version",
});
