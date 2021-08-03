import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDogs } from '../../actions/index';
import dogvideo from "../video/dogvideo.mp4";
import logo from "../images/entersign.png";
// import logo from "../images/dogsapp-01.png";
// import logo2 from "../images/dogsapp-02.png";
import './Landing.css';

const Landing = ({getDogs}) => {

    useEffect(() => {
        getDogs("")
        // props.paginate(1)
    }, [getDogs]);

    return (
        // <div style={{position: "absolute", backgroundImage: "url(https://www.thesun.co.uk/wp-content/uploads/2016/07/nintchdbpict000254504787-e1469489555217.jpg)", backgroundColor: "#aaa",  width: "100%", height: "100%"}}>
        
        // https://www.youtube.com/watch?v=PYFltdGJ-Rc
        <div>
        <video controls autoPlay loop muted
            style={{position: "absolute", width: "100%", left: "50%", top: "50%", height: "100%", objectFit: "cover", transform: "translate(-50%, -50%)"}}    
        >
            <source src={dogvideo} type="video/mp4"/>
        </video>

        <Link to='/dogs'>
            <img  src={logo} className="logo"
                style={{position: "absolute", left: "50%", top: "50%", zIndex: "1", transform: "translate(-50%, -50%)"}}  
            alt="logo" />
        </Link>
        </div>
    )
}

export default connect(
    null,
    {getDogs}
  )(Landing);