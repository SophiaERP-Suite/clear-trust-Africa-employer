const BaseURL = "http://localhost:5181";
const token = localStorage.getItem('accessToken');

export const fetchDbsTypes = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/dbs-types`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const submitDbsRequest = async (data: FormData) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/dbs-applications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return response;
};


export const fetchDbsChecksByUserId = async (userId: number, pageNumber=1, limit=5) => {
  const response = await fetch(`${BaseURL}/dbs-applications/user/${userId}?pageNumber=${pageNumber}&limit=${limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const verifyDbsPayment = async (tx_ref: string) => {
  const response = await fetch(`${BaseURL}/dbs-applications/payment/${tx_ref}/verify`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return response;
};

export const fetchDbsChecks = async (filterData: object) => {
  const token = localStorage.getItem("accessToken");
  const params = new URLSearchParams();
  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, value);
    }
  });
  const url = `${BaseURL}/dbs-applications?${params}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const fetchDbsStatus = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/dbs-status`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
