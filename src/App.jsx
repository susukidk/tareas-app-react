import { useEffect, useReducer, useState } from "react"
import { Footer } from "./components/Footer/Footer"
import { FormularioTareas } from "./components/FormularioTareas/FormularioTareas"
import { Header } from "./components/Header/Header"
import { TareasAgregadas } from "./components/TareasAgregadas/TareasAgregadas"
import { tareaReducer } from "./reducers/tareaReducer"


export const App = () =>{
    const init = () => {
        return JSON.parse(localStorage.getItem("tareas")) || [] 
        
    }
    const [state, dispatch] = useReducer(tareaReducer, [], init)

    const [descripcion, setDescription] = useState("")
    useEffect(() => {
      localStorage.setItem("tareas", JSON.stringify(state))    
    }, [state])
    
        const handleInputChange= (evento) =>{
            setDescription(evento.target.value)
            console.log(descripcion)
        }
        const handleSubmit = (evento) =>{
            evento.preventDefault();
            console.log(evento)

            const tareaNueva ={
                id : new Date().getTime(),
                descripcion: descripcion,
                realizado:false
            }
    
            const action = {
                type: "agregar",
                payload : tareaNueva
            }
    
            dispatch(action)
            setDescription("")
        }


    const handleCambiar = (id) => {
        dispatch({
            type: "cambiar",
            payload: id
        })
    }
    
    const handleEliminar = (id) => {
        dispatch({
            type: "borrar",
            payload: id
        })
    }

    let terminadas = 0;
    for(let i = 0; i < state.length; i++){
        if (state[i].realizado === true) {
            terminadas++;
        }
    }
    
    let porcentaje = terminadas / state.length

    return (
        <>
        <Header/>
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 order-1 order-md-1 mx-auto">
                    <FormularioTareas descripcion={descripcion} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                </div>
                <div className="col-12 col-md-8 order-2 order-md-2 mt-4">
                    <div className="row justify-content-center ">
                        {
                            state.map((tarea, index) => {
                            return <TareasAgregadas key={index} tarea={tarea} porcentaje={porcentaje} handleCambiar={handleCambiar} numero={index} handleEliminar={handleEliminar}  index={tarea.id} />
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
        <Footer porcentaje={porcentaje}/>
        
        </>
    )
}
//const App = () => <h1>holamundo</h1> esta es la opcion mas condensada

