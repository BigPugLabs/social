import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ActivityList = ({ className }) => {

    const [activities, setActivities] = useState([])

    useEffect(() => {
        async function fetchActivityList() {
            try {
                const res = await fetch("/api/activitylist", { credentials: 'include' })
                const data = await res.json()
                //console.log(data)
                setActivities(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchActivityList()
    }, [])

    const list = activities.map(el=><li key={el._id}>{el.name}</li>)

    return (
        <ul className={className}>
            <li className="col-6 justify-content-between mt-2">
                <Link to="/post/activity/6333add60a856cb0e346b221"><span>Hot air for AC ride</span></Link>
                <span>19/07/2022, 21:20:04</span>
            </li>
            <li>{activities.length}</li>
            {list}
        </ul>
    )
}

export default ActivityList