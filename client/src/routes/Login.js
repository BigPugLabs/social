import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDispatchContext } from '../contexts/UserContext'

function Login() {

    const [sending, setSending] = useState(false)
    const navigate = useNavigate()
    const setUserDetails = useContext(UserDispatchContext)

    const post = async (email, pass) => {
        const res = await fetch("/api/auth/login", {
            method: "POST", credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass })
        })
        const data = await res.json()
        if (!res.ok) console.log("err")
        return data
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        const data = await post(e.target.elements.email.value, e.target.elements.password.value)
        setSending(false)
        setUserDetails({ username: data.username, email: data.email })
        navigate("/profile")
    }

    return (
        <main className="container">
            <div className="row justify-content-center">
                <section className="col-6 mt-5">
                    <form action="/login" method="POST" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">{sending ? "Sending" : "Submit"}</button>
                    </form>
                </section>
            </div>
        </main>
    )
}

export default Login