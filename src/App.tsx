import { useReducer } from "react"
import { Form } from "./components/Form"
import { activityReducer,initialState } from "./reducers/activity-reducer"

function App() {

  const [state,dispatch]=useReducer(activityReducer,initialState)
  

  return (
    <>
      <header className="bg-blue-950 py-3">
        <div className="max-w-4xl mx-auto ">
          <h1 className="text-center text-lg font-bold text-white ">
            Contador de calorias
          </h1>
        </div>
      </header>
      <section className=" bg-red-50 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
          />
        </div>

      </section>
    </>
  )
}

export default App
