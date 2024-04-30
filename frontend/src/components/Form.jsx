import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"

function Form({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const c_name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()

        try{
            const res = await api.post(route, {username, password})
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }else{
                navigate("/login")
            }
        } catch(error){
            alert(error)
        } finally  {
            setLoading(false)

        }
    }


    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{c_name}</h1>
        <input
            className="form-input"
            type = "text"
            value = {username}
            onChange = {(e) => setUsername(e.target.value)}
            playeholder = "Username"
        />
        <input
            className="form-input"
            type = "password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            playeholder = "Password"
        />
        {loading && <LoadingIndicator/>}
        <button className="from-button" type="submit">
            {c_name}
        </button>
    </form>
}

export default Form