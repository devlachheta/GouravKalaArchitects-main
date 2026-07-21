import { Link } from "react-router-dom";
import "../styles/home.css";

function HomeProjectCard({ image, title, link }) {
    return (
        <Link to={link} className="home-project-card">
            <img src={image} alt={title} />

            <div className="home-project-card-overlay">
                <h2>{title}</h2>

                <span className="home-project-card-view-more">
                    VIEW MORE
                </span>
            </div>
        </Link>
    );
}

export default HomeProjectCard;