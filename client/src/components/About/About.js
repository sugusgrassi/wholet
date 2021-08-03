import React from 'react';
import './About.css';
import wholet from "../images/wholet-album.jpg";

const About = () => {
    return (
        <div className="albumContainer">
        <img className="albumImage" src={wholet} alt="album cover" />
        <div className="albumInfoContainer">
        <div className="albumInfo">
                <h1>This is the About component</h1>
                <p>I'm Agustín Grassi. I'm a graphic designer and a web developer. This web dog app is a tribute to <strong>“Who Let the Dogs Out”</strong>, a song performed by the Bahamian group Baha Men, released in the 2000. I developed this  project at Henry, a coding bootcamp in Latin America</p>
        </div>
        </div>
        </div>
    )
}

export default About;