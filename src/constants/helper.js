
var helper = {
  post: async (jsonObj = {}, path = "", token) => {

    const url = process.env.REACT_APP_API_BASE_URL + path;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(jsonObj),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token || ''
      }
    });
    return { response: await res, status: await res.status };
  },

  get: async (path = "", token) => {
    const url = process.env.REACT_APP_API_BASE_URL + path;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", "x-access-token": token || ''
      }
    });

    if (res.status === 401) {
      localStorage.removeItem("userData");
      localStorage.removeItem("IsLogin");
      localStorage.removeItem("email");
      window.location = '/login';
    }
    return { response: await res, status: await res.status };
  },

  put: async (jsonObj = {}, path = "", token) => {

    const url = process.env.REACT_APP_API_BASE_URL + path;
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(jsonObj),
      headers: {
        "Content-Type": "application/json", "x-access-token": token || ''
      }
    });
    return { response: await res, status: await res.status };
  },
  delete: async (path = "", token) => {

    const url = process.env.REACT_APP_API_BASE_URL + path;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", "x-access-token": token || ''
      }
    });
    return { response: await res, status: await res.status };
  },

  formPost: async (jsonObj = {}, path = "", token) => {

    const url = process.env.REACT_APP_API_BASE_URL + path;
    const res = await fetch(url, {
      method: "POST",
      body: jsonObj,
      headers: {
        "x-access-token": token || ''
      }
    });
    return { response: await res, status: await res.status };
  },

  formPut: async (jsonObj = {}, path = "", token) => {

    const url = process.env.REACT_APP_API_BASE_URL + path;
    const res = await fetch(url, {
      method: "PUT",
      body: jsonObj,
      headers: {
        "x-access-token": token || ''
      }
    });
    return { response: await res, status: await res.status };
  },

}

export default helper;


