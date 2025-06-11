import React from "react";
import { useParams } from "react-router-dom";
import { databooks } from "../../content_option";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./style.css";

export const BookDetail = () => {
  const { id } = useParams();
  const book = databooks.find((b) => b.id === id);

  if (!book) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Book Not Found | My Bookshelf</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="book-detail-page">
          <h1>Book not found</h1>
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <div className="book-detail-page">
        <Helmet>
          <title>{book.title} | Ellie Cottrell</title>
          <meta name="description" content={book.description.slice(0, 155)} />
          <meta property="og:title" content={book.title} />
          <meta property="og:description" content={book.description.slice(0, 155)} />
          <meta property="og:image" content={book.img} />
          <meta property="og:type" content="book" />
        </Helmet>

        <img src={book.img} alt={`Cover of ${book.title}`} />
        <h1>{book.title}</h1>
        <p>{book.description}</p>

        <div className="button-wrapper">
          <a href={book.purchase_link} target="_blank" rel="noopener noreferrer">
            <div id="button_h" className="ac_btn btn">
              Purchase
              <div className="ring one"></div>
              <div className="ring two"></div>
              <div className="ring three"></div>
            </div>
          </a>
        </div>
      </div>
    </HelmetProvider>
  );
};
