import {Outlet} from 'react-router-dom';
import "./index.css"

function Players() {
    return (
        <>
            <div className="players">
                {/*<h3>Players: </h3>*/}
            </div>
            <Outlet/>
        </>
    )
}

export default Players