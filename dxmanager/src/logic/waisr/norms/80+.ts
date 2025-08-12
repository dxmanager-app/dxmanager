// app/dxmanager/src/logic/waisr/norms/80+.ts
// Domyślnie przekierowujemy na poprzedni przedział (75–79).
// Jeśli kiedyś dodasz własne normy 80+, po prostu zastąp eksport poniżej
// pełnymi danymi (tak jak w innych plikach z normami).

import type { NormsForGroup } from "../types"
import norms_75_79 from "./75-79"

const data: NormsForGroup = norms_75_79
export default data
