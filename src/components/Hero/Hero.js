import React from 'react'
import Button from "@material-ui/core/Button"
import HeroImage from "../../assets/img.png"
import { makeStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom"


import "./Hero.css"

const useStyles = makeStyles({
    button: {
        height: 48,
        width: 200,
        padding: '0 30px',
        background: '#4fb3bf',
    },
});

function Hero() {
    const classes = useStyles();
    return (
        <section className="hero__section">
            <div className="hero__text">
                <h1>Get new friends!</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nihil debitis eaque sapiente voluptas quam fuga neque at aperiam, soluta laudantium excepturi! Ut aliquid accusamus velit nisi laudantium, suscipit corrupti. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum dolores molestiae nisi aperiam odit esse dicta ullam. Totam error aperiam quibusdam odit magni obcaecati corrupti in? Animi nesciunt repudiandae inventore? lorem</p>
                <Button
                    className={`${classes.button} mr-10`}
                    variant="contained"
                    color="primary"
                    type="submit">
                    <Link className="link" to="/login">Login</Link>

          </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit">
                <Link className="link" to="/register">Sign up</Link>
          </Button>
            </div>
            <img
                className="hero__image"
                src={HeroImage}
                alt="generic group"
            />
        </section>
    )
}

export default Hero
