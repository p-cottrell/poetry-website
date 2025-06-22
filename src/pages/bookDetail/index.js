import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { databooks } from "../../content_option";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./style.css";

export const BookDetail = () => {
  const { id } = useParams();
  const book = databooks.find((b) => b.id === id);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 700px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },
    },
  });

  // Auto-slide effect
  useEffect(() => {
    if (!slider) return;
      let interval;
      const sliderInstance = slider.current;

      const run = () => {
        interval = setInterval(() => {
          // Move to the next slide with a custom duration
          sliderInstance.moveToIdx(sliderInstance.track.details.abs + 1, true, {
            duration: 1500,
            easing: (t) => t * (2 - t), // linear easing
          });
        }, 6000); // wait time between slides
      };

      run();

      return () => clearInterval(interval);
    }, [slider]);

  if (!book) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Book Not Found | Ellie Cottrell</title>
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
        <p className="book-description">{book.longDescription}</p>
          <div className="purchase-button-wrapper">
            <a href={book.purchase_link} target="_blank" rel="noopener noreferrer">
              <div className="purchase-button">
                Purchase
                <div className="ring one"></div>
                <div className="ring two"></div>
                <div className="ring three"></div>
              </div>
            </a>
          </div>
          {book.reviews?.length > 0 && (
            <>
              <h1>Reviews</h1>
              <div ref={sliderRef} className="keen-slider review-container">
                {book.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="keen-slider__slide review-slide"
                  >
                    <div className="review-text">
                      <p>“{review.text}” - <strong>{review.source}</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
    </HelmetProvider>
  );
};