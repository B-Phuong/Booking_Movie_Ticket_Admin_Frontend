import { NavLink, useNavigate } from 'react-router-dom'
import './NotFound.css'
export default function NotFound() {
    const navigate = useNavigate()
    return (
        // <body class="bg-purple">
        <div className="stars">

            <div className="central-body">
                <h1 style={{ color: "white", fontSize: "80px" }}>404</h1>
                <h1 style={{ color: "white", fontSize: "40px" }}>Trang bạn đang tìm kiếm không có</h1>
                <a href="/Admin/Movies" className="btn-go-home" target="_blank" style={{ color: "white", fontSize: "20px" }}>VỀ TRANG CHỦ</a>
            </div>
            <div className="objects">
                <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
                <div className="earth-moon">
                    <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
                    <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
                </div>
                <div className="box_astronaut">
                    <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
                </div>
            </div>
            <div className="glowing_stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
            </div>
        </div>
        // </body>
    )
}
