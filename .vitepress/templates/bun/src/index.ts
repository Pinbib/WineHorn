import WineHorn from "winehorn";

import EntryPoint from "./Routes/EntryPoint.ts";

let wh: WineHorn = new WineHorn();

wh.add(EntryPoint);

wh.listen();