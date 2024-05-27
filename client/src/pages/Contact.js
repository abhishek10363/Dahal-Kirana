import React from "react";
import Layout from "./../components/Layout/Layout";
import { FaWhatsapp, FaFacebookMessenger, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h1 className="bg-secondary p-2 text-white text-center">CONTACT US</h1>
            <div className="contact-info">
              <p>
                <a href="https://m.me/yourmessengerid" target="_blank" rel="noopener noreferrer">
                  <FaFacebookMessenger className="contact-icon" />:- Juks
                </a>
              </p>
              <p>
                <a href="tel:+9779804050695">
                  <FaPhoneAlt className="contact-icon" />:- 9804050695
                </a>
              </p>
              <p>
                <a href="mailto:abhishek103638@gmail.com">
                  <FaEnvelope className="contact-icon" /> :- dahal@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
