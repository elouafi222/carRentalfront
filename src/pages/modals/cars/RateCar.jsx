import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../../util/constants";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
function RateCar({ carId, rating, updateRating }) {
  const { user } = useSelector((state) => state.auth);
  const [rateStars, setRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleStarClick = (newRate) => {
    setRate(newRate);
  };

  useEffect(() => {
    const userRating = rating?.find((rate) => rate.userId === user.id);
    if (userRating) {
      setRate(userRating.rateStars);
    }
  }, [user, rating, carId]);

  const ratecar = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${API_URL}/car/rate/${carId}`,
        {
          rateStars: rateStars,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      updateRating(response.data.rating);
      toast.success("Thanks you for rating this car");
      const btnClose = document.getElementById(`closeratecar-${carId}`);
      if (btnClose) btnClose.click();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={`ratecar-${carId}`}
      aria-labelledby={`deleteHouseLabel-${carId}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body d-flex flex-column align-items-center">
            <h1 className="text-center">Rate this house ! {rateStars}/5</h1>
            <div className="rating-model my-3">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <label key={starValue}>
                  <i
                    className={`fa-star cursor-pointer ${
                      rateStars >= starValue ? "fa-solid" : "fa-regular"
                    }`}
                    onClick={() => handleStarClick(starValue)}
                  ></i>
                </label>
              ))}
            </div>
            <p>Please provide your rating. Your feedback is valuable to us.</p>
          </div>

          <div className="modal-footer">
            <button
              id={`closeratecar-${carId}`}
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button onClick={ratecar} type="submit" className="px-3 py-1">
              {isLoading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "Rate"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateCar;
