import React from "react";
import heroBanner from "./assets/cover-banner.svg";
function Header() {
    return (
        <>
            <section className="header container-fluid">
                <nav class="navbar navbar-expand-lg bg-white ms-5">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Gourav Kala Architects</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                    </div>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active pe-3" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active pe-3" aria-current="page" href="#">Projects</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active pe-3" aria-current="page" href="#">Contact</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active me-5" aria-current="page" href="#">Instagram</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </section>
            <section className="hero-banner">
                <div className="container">

                    <img src={heroBanner} alt="" />
                </div>

            </section>
        </>
    )
}
export default Header;