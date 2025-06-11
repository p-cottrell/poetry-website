import React from "react";
import { useParams } from "react-router-dom";
import { databooks } from "../../content_option";
import { Helmet } from "react-helmet-async";

export const BookDetail = () => {
  const { id } = useParams();
  const book = databooks.find((b) => b.id === id);

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{book.title} | Ellie Cottrell</title>
        <meta name="description" content={book.description.slice(0, 150)} />
        {/* Add other meta tags if needed */}
      </Helmet>

      <div className="book-detail-page">
        {/* Your book details */}
      </div>
    </>
  );
};