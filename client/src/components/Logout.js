
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate()

    const bootoff = async () => {
        const res = await fetch("/api/auth/logout", { credentials: 'include' })
        if (res.ok) navigate("/")
    }

    return (
        <button className="col-3 btn btn-primary" onClick={bootoff}>Logout</button>
    )
}

export default Logout