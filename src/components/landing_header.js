import React from 'react'; 

export default function LandingHead(props) {
    return (
        <header className="landing">
            <div style={{backgroundImage: 'url("/img/landing-md.jpg")'}}>
                <h1><a id="landing-title" className="text-justify">Endangered Animals</a></h1>
                <h2 id="authors">By: Kelson Flint, Bryan Phan, Nassim Abrous, Arnon Bunyatipanon</h2>
            </div>
        </header>
    )
}