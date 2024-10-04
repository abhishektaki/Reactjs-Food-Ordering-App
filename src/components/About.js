
import User from "./User"; 
import UserFn from "./UserFn";
const About = () => {
    return ( 
        <div className="about">
            <h1>About Us</h1>
            <h2> hello food lover</h2>

            <User contact={"97000000000"} country={"India"} email={"abhishek@gmail.com"} city={ "Varanasi"}   />
           
        </div>
        
    );
};
export default About;