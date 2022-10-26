import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ActivityList = async ({ className }) => {

    const [activities, setActivities] = useState([])

    // if (!activities.length) {
    //     try {
    //         const res = await fetch("http://192.168.0.11:3003/api/activitylist", {credentials:'include'})
    //         const data = await res.json()
    //         setActivities(data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        async function fetchActivityList() {
            try {
                const res = await fetch("http://192.168.0.11:3003/api/activitylist", { credentials: 'include' })
                const data = await res.json()
                console.log(data)
                setActivities(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchActivityList()
        // fetch("http://192.168.0.11:3003/api/activitylist", { credentials: 'include' })
        //     .then(res => res.json())
        //     .then(data => setActivities(data))
        //     .catch(err => console.log(err))
    }, [])

    return (
        <ul className={className}>
            <li className="col-6 justify-content-between mt-2">
                <Link to="/post/activity/6333add60a856cb0e346b221"><span>Hot air for AC ride</span></Link>
                <span>19/07/2022, 21:20:04</span>
            </li>
            <li>{activities.length}</li>
        </ul>
    )
}

export default ActivityList