// app/dxmanager/src/views/TestRegistry.tsx
import Mmpi2Results from "@/views/mmpi2/Mmpi2Results"
import Mmpi2InputView from "@/views/mmpi2/Mmpi2InputView"
import WaisrResults from "@/views/waisr/WaisrResultsView"
import WaisrInputView from "@/views/waisr/WaisrInputView"

type TestConfig = {
  input: React.FC
  results: React.FC
  saveResult?: (res: any) => void
}

export const testRegistry: Record<string, TestConfig> = {
  mmpi2: {
    input: Mmpi2InputView,
    results: Mmpi2Results,
    saveResult: (res) => {
      localStorage.setItem("mmpi2-scores", JSON.stringify(res.scores))
      localStorage.setItem("mmpi2-answers", JSON.stringify(res.answers))
      localStorage.setItem("mmpi2-gender", res.gender)
    },
  },
waisr: {
  input: WaisrInputView,
  results: WaisrResults,
  saveResult: (res) => {
    localStorage.setItem("waisr-raw", JSON.stringify(res.raw))
    },
  },
}
