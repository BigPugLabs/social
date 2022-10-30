import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function Activity() {

    const { id } = useParams()

    const [activity, setActivity] = useState({})
    const [svg, setSVG] = useState({})

    useEffect(() => {
        (async function fetchActivityList() {
            try {
                const res = await fetch("/api/activity/" + id, { credentials: 'include' })
                const data = await res.json()
                setActivity(data.activity)
                setSVG(data.svg)
            } catch (err) {
                console.log(err)
            }
        }())
    }, [id])

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-6">
                    <h2>
                        {activity.name}
                    </h2>
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" height={svg.height} width={svg.width} viewport={svg.viewport} viewBox={svg.viewBox}>
                        <g>
                            {svg.pathSettings && <path d={svg.path} stroke={svg.pathSettings[0].stroke} strokeWidth={svg.pathSettings[0].strokeWidth} strokeOpacity={svg.pathSettings[0].strokeOpacity} strokeLinejoin={svg.pathSettings[0].strokeLinejoin} fill={svg.pathSettings[0].fill} />}
                            {svg.pathSettings && <path d={svg.path} stroke={svg.pathSettings[1].stroke} strokeWidth={svg.pathSettings[1].strokeWidth} strokeLinejoin={svg.pathSettings[1].strokeLinejoin} fill={svg.pathSettings[1].fill} />}
                        </g>
                    </svg>
                    <div className="row justify-content-between">
                        <form className="col-1" action="/post/likePost/6333add60a856cb0e346b21f?_method=PUT" method="POST">
                            <button className="btn btn-primary fa fa-heart" type="submit"></button>
                        </form>
                        <h3 className="col-3">Likes: 28/07/2022, 20:28</h3>

                        <form action="/post/deletePost/6333add60a856cb0e346b21f?_method=DELETE" method="POST" className="col-3">
                            <button className="btn btn-primary fa fa-trash" type="submit"></button>
                        </form>

                    </div>
                </div>
                <div className="col-3 mt-5">
                    <p>
                        {(activity.distance / 1000).toFixed(2) + " km"}
                    </p>
                </div>
                <form className="row" action="/comment/createComment/6333add60a856cb0e346b21f" method="POST">
                    <div className="col form-floating">
                        <input type="text" className="form-control" id="comment" name="comment" placeholder="Cool!" />
                        <label htmlFor="comment">Comment</label>
                    </div>
                    <button type="submit" className="col-3 btn btn-primary">Submit Comment</button>
                </form>

                <div className="col-6 mt-5">
                    <Link to="/profile" className="btn btn-primary">Return to Profile</Link>
                    <Link to="/feed" className="btn btn-primary">Return to Feed</Link>
                </div>
            </div>
        </div>
    )
}

export default Activity