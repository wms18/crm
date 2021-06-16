import './menu/menu-left.css'
import MenuLeft from "./menu/menu-left";
import Middle from "./middle/middle";
import Right from "./right/right";
import './right/right.css'
import './middle/middle.css'
function Office() {
    return(
        <div>
            <MenuLeft></MenuLeft>
            <Middle></Middle>
            <Right></Right>
        </div>
    )
}
export default Office
