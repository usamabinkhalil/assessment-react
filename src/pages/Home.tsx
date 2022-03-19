import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [services, setServices] = useState<any>([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}services`)
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            {services.map((service: any) => (
              <li className="nav-item active" key={service?.slug}>
                <Link className="nav-link" to={`/services/${service?.slug}`}>
                  {service?.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Practical skills assessment</h1>
            <p>
              This assessment is designed to let you reveal and showcase the
              best of yourself as an engineer. The practical part is relatively
              small - the aim is not to write lots of functionality - instead,
              we would like you to implement a very limited set of features, but
              do it by providing the highest production level quality you can.
              The goal of this assessment is to get an idea of what it will be
              like to work with you day to day.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {services.map((service: any) => (
              <div className="col-md-4" key={service?.slug}>
                <h2>{service?.name}</h2>
                <p>{service?.description}</p>
                <p>
                  <Link
                    className="btn btn-secondary"
                    to={`/services/${service?.slug}`}
                  >
                    View details »
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <hr className="mt-auto" />

      <footer className="container">
        <p>© Company 2017-2020</p>
      </footer>
    </>
  );
}

export default Home;
