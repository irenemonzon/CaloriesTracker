import { useReducer,useEffect, useMemo } from "react"
import { Form } from "./components/Form"
import { activityReducer,initialState } from "./reducers/activity-reducer"
import { ActivityList } from "./components/ActivityList"
import { CalorieTracker } from "./components/CalorieTracker"


function App() {

  const [state,dispatch]=useReducer(activityReducer,initialState)

  useEffect(()=>{
    localStorage.setItem('activities',JSON.stringify(state.activities))

  },[state.activities])

  const canRestartApp = ()=>useMemo(()=>state.activities.length > 0,[state.activities] )
  

  return (
    <>
      <header className="bg-blue-950 py-3">
        <div className="max-w-4xl mx-auto ">
          <h1 className="text-center text-lg font-bold text-white ">
            Contador de calorias
          </h1>
        </div>
      </header>
      <section className=" bg-red-50 py-10 px-5">
        <div className="max-w-4xl mx-auto">
        <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold text-white cursor-pointer rounded-lg text-sm  mb-5 disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={()=>dispatch({type:'restart-app'})}
            >
              Reiniciar App
        </button>
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>

      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>
      <section className="p-10 mx-auto-max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
