export const pathsNav = [
  "/signup",
  "/login",
  "/forgotPassword",
  "/resetPassword",
  "/payment",
  "/adminstration",
  "/adminstration/cars",
  "/adminstration/locations",
  "/adminstration/payments",
  "/adminstration/customers",
  "/adminstration/requests",
  "/adminstration/cities",
  "/adminstration/bookingsHistory",
  "*",
];
export const pathsFooter = [
  "/signup",
  "/login",
  "/forgotPassword",
  "/resetPassword",
  "/booking",
  "/payment",
  "/adminstration",
  "/adminstration/cars",
  "/adminstration/locations",
  "/adminstration/payments",
  "/adminstration/customers",
  "/adminstration/requests",
  "/adminstration/cities",
  "/adminstration/bookingsHistory",
  "*",
];
export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4.5,
    slidesToSlide: 4.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1.5,
    slidesToSlide: 1.5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
export default function calculateAmount(dateStart, dateFin, pricePerDay) {
  const startDate = new Date(dateStart);
  const endDate = new Date(dateFin);
  const timeDifference = endDate - startDate;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference * pricePerDay;
}
