import banner from '../assets/banner.jpg'
import profile from '../assets/profile.jpg'

export function ProfileComponent(){
    return <div className="profile_component">
    <div className="banner">
        <img src={banner} />
    </div>
    <div className="profile_pic">
        <img src={profile} />
    </div>
    <div className="stats">
        <div className="first">
            <div className="row1">
                <div className="name">Vidit</div>
                <div className="age">22</div>
            </div>
            <div className="row2">
                <div className="location">India</div>
                <div className="phno">+91 9016195889</div>
            </div>
        
        </div>
        <div className="second">
            <div className="col1">
                <div className="num">100k</div>
                <div className="label">likes</div>
            </div>
            <div className="col2">
                <div className="num">100k</div>
                <div className="label">followers</div>
            </div>
            <div className="col3">
                <div className="num">100k</div>
                <div className="label">posts</div>
            </div>
        </div>
    </div>
    </div>
}