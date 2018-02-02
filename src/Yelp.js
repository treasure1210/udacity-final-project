import React, { Component } from 'react';
import './App.css';

class YelpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarker: props.activeMarker,
            yelpReviews: null,
            yelpStars: null,
            yelpUrl: null,
        }
    }

    componentDidMount() {
        const api = "http://192.168.1.127:4000/YelpAPI.php"
        
        fetch(`${api}`, {method: 'POST', body: JSON.stringify(`${this.state.activeMarker.id}`)}).then(res => {
            res.json().then(data => {
                this.setState({
                    yelpReviews: data,
                });
                if(this.state.yelpReviews) {
                    this.getYelpStars(this.state.yelpReviews.rating);
                }
            })
        });
    }

    getYelpStars(rating) {
        if (rating % 1 === 0) {
            const stars = require(`./yelp_stars/web_and_ios/regular/regular_${rating}.png`);
            this.setState({
                yelpStars: stars
            });
        } else {
            rating = Math.floor(rating/1);
            const stars = require(`./yelp_stars/web_and_ios/regular/regular_${rating}_half.png`);
            this.setState({
                yelpStars: stars
            });
        }
    }

    getAlt(reviews) {
        if (reviews === null) {
            return '';
        } else {
            return `Yelp review ${reviews.rating} stars`;
        }
    }

    getReviews(reviews) {
        if (reviews === null) {
            return 'Yelp data loading';
        } else {
            return `${reviews.review_count} Reviews | `;
        }
    }

    getUrl(reviews) {
        if (reviews === null) {
            return '';
        } else {
            const logo = require('./Yelp_trademark_RGB_outline.png');
            return (<a href={this.state.yelpUrl} tabIndex={0} aria-label="Visit this page on Yelp"><img className="yelp-logo" src={logo} alt="Yelp logo"/></a>);
        }
    }

    render() {
        return (
            <div className="Yelp">
                <img src={this.state.yelpStars} alt={this.getAlt(this.state.yelpReviews)} tabIndex={0}/>
                <div className="reviews">
                    <p tabIndex={0}>{this.getReviews(this.state.yelpReviews)}{this.getUrl(this.state.yelpReviews)}</p>
                </div>
            </div>
        );
    }
}

export default YelpComponent;
