import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { databooks } from "../../content_option";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./style.css";

export const BookDetail = () => {
  const { id } = useParams();
  const book = databooks.find((b) => b.id === id);
  const intervalRef = useRef(null);

  const resetInterval = (slider) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      slider.moveToIdx(slider.track.details.abs + 1, true, {
        duration: 1500,
        easing: (t) => t * (2 - t),
      });
    }, 6000);
  };

  const [sliderRef] = useKeenSlider({
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
    created(slider) {
      resetInterval(slider);

      // Reset timer on interaction
      slider.container.addEventListener("click", () => resetInterval(slider));
      slider.container.addEventListener("touchstart", () => resetInterval(slider));
    },
  });

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
                    <p>“{review.text}” -  <a href={review.link} target="_blank" rel="noopener noreferrer"><strong className="review-highlight-link" >{review.source}</strong></a></p>
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
