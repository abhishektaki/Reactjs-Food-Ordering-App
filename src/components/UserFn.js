import { useState } from "react";

const UserFn = (props) =>{
    const {city} = props;
    const count = useState(0);

    return(
        <div className="user-card">
            <h2>Count: {count }</h2>
            <h3>taki</h3>
             <h3>contact:789875578857</h3>
             <h3>city: {city}</h3>
            
        </div>
    );
}
export default UserFn;