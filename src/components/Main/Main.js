import React from 'react'
import ChatImage from "../../assets/clip-online-advertising-smm.png"
import Chat from "../../assets/clip-chatting-and-speech-bubbles.png"
import Basket from "../../assets/cherry-paralympic-basketball.png"
import Games from "../../assets/games.png"

import "./Main.css"


function Main() {
    return (
        <section className="main__section">
            <section className="mainchat__container">
                <img
                    className="mainchat__image"
                    src={ChatImage}
                    alt="generic group"
                />
                <div className="mainchat__text">
                    <h1>Make life more fun!</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nihil debitis eaque sapiente voluptas quam fuga neque at aperiam, soluta laudantium excepturi! Ut aliquid accusamus velit nisi laudantium, suscipit corrupti. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum dolores molestiae nisi aperiam odit esse dicta ullam. Totam error aperiam quibusdam odit magni obcaecati corrupti in? Animi nesciunt repudiandae inventore? lorem</p>
                </div>
            </section>
            <section className="feature__container">
                <div className="feature__card">
                    <img
                        className="card__image"
                        src={Chat}
                        alt="generic group"
                    />
                    <div className="card__text">
                        <h1>Connect with new friends!</h1>
                        <p>Ipsum dolores molestiae nisi aperiam odit esse dicta ullam. Totam error aperiam quibusdam odit magni obcaecati corrupti in? Animi nesciunt repudiandae inventore? lorem</p>
                    </div>
                </div>
                <div className="feature__card">
                    <img
                        className="card__image"
                        src={Basket}
                        alt="generic group"
                    />
                    <div className="card__text">
                        <h1>Find a new hobby</h1>
                        <p>Ipsum dolores molestiae nisi aperiam odit esse dicta ullam. Totam error aperiam quibusdam odit magni obcaecati corrupti in? Animi nesciunt repudiandae inventore? lorem</p>
                    </div>
                </div>
                <div className="feature__card">
                    <img
                        className="card__image"
                        src={Games}
                        alt="generic group"
                    />
                    <div className="card__text">
                        <h1>Find an Event</h1>
                        <p>Ipsum dolores molestiae nisi aperiam odit esse dicta ullam. Totam error aperiam quibusdam odit magni obcaecati corrupti in? Animi nesciunt repudiandae inventore? lorem</p>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Main
