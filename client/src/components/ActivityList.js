import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ActivityList = ({ className }) => {

    const [activities, setActivities] = useState([])

    useEffect(() => {
        async function fetchActivityList() {
            try {
                const res = await fetch("/api/activitylist", { credentials: 'include' })
                const data = await res.json()
                setActivities(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchActivityList()
    }, [])

    const list = activities.map(el => {
        return (
            <li key={el._id} className="col-6 justify-content-between mt-2">
                <Link to={"/activity/" + el._id}>
                    <span>
                        {el.name}
                    </span>
                </Link>
                <span>{new Date(el.start_date).toLocaleString('en-GB')}</span>
            </li>
        )
    })

    return (
        <ul className={className}>
            {list}
        </ul>
    )
}

export default ActivityList