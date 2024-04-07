import { useState, ChangeEvent,FormEvent, Dispatch } from "react"
import { categories } from "../data/categories"
import { Activity} from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps={
    dispatch:Dispatch<ActivityActions >
 }
 const initialState={
    category:1,
    activityName:'',
    calories:0

 }

export const Form = ({dispatch}:FormProps) => {

    const [activity,setActivity]=useState<Activity>(initialState)

    const handleChange=(e: ChangeEvent<HTMLSelectElement> |ChangeEvent<HTMLInputElement> )=>{

        const isNumberField=['category','calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]:isNumberField ? +e.target.value:e.target.value
        })
    }

    const isValidActivity=()=>{
        const {activityName,calories}=activity
        return activityName.trim()!==''&& calories > 0
    }

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'save-activity',payload:{newActivity:activity}})
        setActivity(initialState)

    }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label 
                htmlFor="category"   className="font-bold"> Categoria:
            </label>
            <select
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category=>(
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>

                ))}
            </select>
        </div>
        <div 
            className="grid grid-cols-1 gap-3"
        >
            <label 
                htmlFor="activityName" className="font-bold"> Actividad:
            </label>
            <input
                id="activityName"
                type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, ensalada, jugo de Naranja"
                value={activity.activityName}
                onChange={handleChange}
            />
        </div>
        <div 
                className="grid grid-cols-1 gap-3"
        >
            <label 
                htmlFor="calories" className="font-bold"> Calorias:
            </label>
            <input
                id="calories"
                type="number"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Calorias. Ej. 300 o 800"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>
        <input
            type="submit"
            className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold text-white  text-center cursor-pointer disabled:opacity-10"
            value={activity.category ===1 ?"Guardar comida":"Guardar ejercicio"}
            disabled={!isValidActivity()}
        />

    </form>
  )
}
