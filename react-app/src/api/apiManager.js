import baseurl from "./baseurl";

export default {
  getAllType(type) {
    return fetch(`${baseurl}/${type}`).then((r) => r.json());
  },
  getSingleType(type, id) {
    return fetch(`${baseurl}/${type}/${id}`).then((r) => r.json());
  },
  getTypeByParam(type, param, id) {
    return fetch(`${baseurl}/${type}?${param}=${id}`).then((r) => r.json());
  },
  getAssignmentsByDateRoute(dateId, routeId) {
    return fetch(
      `${baseurl}/assignments?dateID=${dateId}&routeID=${routeId}`
    ).then((r) => r.json());
  },
  getAssignmentsByDateDriver(dateId, driverId) {
    return fetch(
      `${baseurl}/assignments?dateID=${dateId}&driverID=${driverId}`
    ).then((r) => r.json());
  },
  postType(type, obj) {
    return fetch(`${baseurl}/${type}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(obj),
    }).then((r) => r.json());
  },
  updateType(type, obj) {
    return fetch(`${baseurl}/${type}/${obj.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(obj),
    });
  },
  deleteEntry(id) {
    return fetch(`${baseurl}/entries/${id}`, {
      method: "DELETE",
    });
  },
  register(userToPost) {
    return fetch(`${baseurl}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToPost),
    }).then((result) => result.json());
  },
  login(userToLogin) {
    return fetch(`${baseurl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    }).then((result) => result.json());
  },

  // manager
  // getAssignmentByDateRouteDriver(dateId, routeId, driverId) {
  //   return fetch(
  //     `${baseurl}/assignments/?dateId=${dateId}&routeId=${routeId}&driverId=${driverId}&_expand=driver&_expand=vehicle`
  //   ).then((result) => result.json());
  // },
  getUsers() {
    return fetch(`${baseurl}/users`).then((result) => result.json());
  },
  getFavorites(userId) {
    return fetch(
      `${baseurl}/favoriteRoutes?userId=${userId}&_expand=route`
    ).then((result) => result.json());
  },
  deleteTypeWithId(type, id) {
    return fetch(`${baseurl}/${type}/${id}`, {
      method: "DELETE",
    }).then((result) => result.json);
  },
};
