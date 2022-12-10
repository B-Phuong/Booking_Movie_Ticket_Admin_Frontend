export const API_DOMAIN = "http://localhost:5000/";

export const API_MOVIE = {
  COMING: API_DOMAIN + "movies/coming",
  SHOWING: API_DOMAIN + "movies",
  DETAIL: API_DOMAIN + `movies/`,
  UPDATE: API_DOMAIN + `admins/movie/`,
  ADD: API_DOMAIN + `admins/movie`,
  DELETE: API_DOMAIN + "admins/movie/"
};

export const API_SHOWTIMES = {
  ADD: API_DOMAIN + `admins/movie/`,
  DELETE: API_DOMAIN + "admins/movie/",
};
export const API_ROOMS = {
  GET: API_DOMAIN + "admins/movie/room",
};

export const API_THEATERS = {
  SHOWING: API_DOMAIN + "movies/showing",
  THEATERS: API_DOMAIN + "movies/movietheater",
};

export const API_SHOWTIME = {
  CLUSTER: API_DOMAIN + "movies/cluster/",
};

export const API_USER = {
  PROFILE: API_DOMAIN + "users",
  GET_ALL: API_DOMAIN + "admins/user",
  GET_DETAIL_ADMIN: API_DOMAIN + "admins",
  CHANGE_PASSWORD: API_DOMAIN + "users/editPassword",
  HISTORY_TICKET: API_DOMAIN + "users/history",
};

export const API_ACCOUNTS = {
  SIGNIN: API_DOMAIN + "accounts/signin",
  SIGNUP: API_DOMAIN + "accounts/signUp",
};
export const API_FOODDRINKS = {
  GET_ALL: API_DOMAIN + "users/food_drink/",
  DETAIL: API_DOMAIN + "users/food_drink/",
  UPDATE: API_DOMAIN + "admins/food_drink/",
  ADD: API_DOMAIN + "admins/food_drink",
  DELETE: API_DOMAIN + "admins/food_drink/",
};

export const API_BOOKING = {
  BOOK_TICKET: API_DOMAIN + "users/",
  SEND_EMAIL: API_DOMAIN + "users/sendEmailBooking",
};
export const API_CHARTS = {
  GETREVENUE: API_DOMAIN + "admins/revenue",
  GETTICKETS: API_DOMAIN + "admins/ticketBookings",
  GET_REVENUE_BY_THEATER: API_DOMAIN + "admins/revenueByTheater",
  GET_TIMELINE_SHOWTIME: API_DOMAIN + "admins/timelineChart",
};
