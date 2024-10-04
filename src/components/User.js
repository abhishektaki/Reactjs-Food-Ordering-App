//class based component
 
import React from "react"; 
class User extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            count:0,
        }
    }
        
    render()
    {
        const { contact, email, city, country } = this.props;
        const {count} =this.state;
        return(
                <div className="user-card">
                    <h1>Count {count}</h1>
                    <button   onClick={()=>{
                        this.setState({
                            count: this.state.count + 1,
                        } );
                    }}> increase count</button>
                    <h2>ABHISHEK SINGH </h2>
            
                    <h3>Contact: { contact} </h3>
                    <h3>Email:  { email}</h3>
                    <h3>City:  { city} </h3>
                    <h3>country: { country}</h3>

                </div>
             );
    }

}
export default User;