import "font-awesome/css/font-awesome.min.css";

const StarRating = ({
  selectedStars,
  color = "#6f2082",
  bigFont = false,
}: any) => {
  const totalStars = 5;
  const _bigFont = bigFont ? ` !text-2xl` : `text-base`;
  const firstMethod = () => {
    return [...Array(totalStars)].map((el, i: any) =>
      i < selectedStars ? (
        <i key={i} className={`fa fa-star ${_bigFont}`} style={{ color }} />
      ) : (
        <i key={i} className={`fa fa-star-o ${_bigFont}`} />
      )
    );
  };

  const secondMethod = () => {
    return [...Array(totalStars)].map((el, i: any) =>
      i < selectedStars && i + 1 > selectedStars ? (
        <i
          key={i}
          className={`fa fa-star-half-o ${_bigFont}`}
          style={{ color }}
        />
      ) : i < selectedStars ? (
        <i key={i} className={`fa fa-star ${_bigFont}`} style={{ color }} />
      ) : (
        <i key={i} className={`fa fa-star-o ${_bigFont}`} />
      )
    );
  };

  return (
    <>{Number.isInteger(selectedStars) ? firstMethod() : secondMethod()}</>
  );
};

export default StarRating;
