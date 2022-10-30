import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ActivityList from '../components/ActivityList'
import Logout from '../components/Logout'
import { UserContext } from '../contexts/UserContext'

function Profile() {

const userProfile = useContext(UserContext)

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6">
                    <div>
                        <p><strong>User Name</strong>: {userProfile.username}</p>
                        <p><strong>Email</strong>: {userProfile.email}</p>
                        <Logout />
                        <Link to="/connect/strava" className="col-3 btn btn-primary">Connect Strava</Link>
                        <Link to="/strava/activities/631fc17f244ad60820ae1a6e" className="col-3 btn btn-primary">Refresh activities</Link>
                    </div>
                    <div className="mt-5">
                        <h2>Add a post</h2>
                        <form action="/post/createPost" encType="multipart/form-data" method="POST">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="caption" className="form-label">Caption</label>
                                <textarea className="form-control" id="caption" name="caption"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imgUpload" className="form-label">Image</label>
                                <input type="file" className="form-control" id="imageUpload" name="file" />
                            </div>
                            <button type="submit" className="btn btn-primary" value="Upload">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-6">
                    <Link to="/post/activities" className="col-3 btn btn-primary">All activities</Link>
                    <ActivityList className="row list-unstyled" />
                    <div className="row justify-content-center mt-5">
                        <Link to="/feed" className="btn btn-primary">Return to Feed</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile