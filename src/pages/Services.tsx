import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Services() {
  let { slug } = useParams();
  const [services, setServices] = useState<any>([]);
  const [service, setService] = useState<any>({});
  const [tiers, setTiers] = useState<any>([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}services`)
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}services/by-slug/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setService(data);
        if (Array.isArray(data.tiers)) {
          setTiers(data.tiers);
        }
      });
  }, [slug]);
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <Link
          className="h5 my-0 mr-md-auto font-weight-normal text-dark text-decoration-none"
          to="/"
        >
          Home
        </Link>
        <nav className="my-2 my-md-0 mr-md-3">
          {services.map((service: any) => (
            <Link
              className="p-2 text-dark text-decoration-none"
              to={`/services/${service?.slug}`}
              key={service?.slug}
            >
              {service?.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">{service?.name}</h1>
        <p className="lead">{service?.description}</p>
      </div>

      <div className="container">
        <div className="card-deck mb-3 text-center">
          {tiers.map((tier: any, index: any) => (
            <div className="card mb-4 shadow-sm" key={index}>
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">{tier?.name}</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  ${tier?.price} <small className="text-muted">/ mo</small>
                </h1>
                <p>{tier?.description}</p>
                <Link
                  className="btn btn-lg btn-block btn-primary"
                  to={`/checkout`}
                  state={{ service, tier }}
                >
                  Buy now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
