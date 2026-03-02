const BaseURL = "http://localhost:5181";

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

export const fetchDbsCheckById = async (id: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/dbs-applications/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("check by id", response.json);
  return response;
};

export const fetchDbsChecksByUserId = async (userId: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/dbs-applications/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const GetDbsChecksByOrganisationIdAndStatus = async (
  organisationId: number,
  status: number,
) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BaseURL}/dbs-applications/${organisationId}/${status}/by-status`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

export const verifyDbsPayment = async (tx_ref: string) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/dbs-applications/payment/${tx_ref}/verify`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
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

export const fetchDbsChecks = async (filterData: object) => {
  const token = localStorage.getItem("accessToken");
  const params = new URLSearchParams();
  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, value);
    }
  });
  const url = `${BaseURL}/dbs-applications/GetCTChecksByOrganisationId?${params}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const GetEmployeesWithoutDbs = async (organisationId: number) => {
  const token = localStorage.getItem("accessToken");

  const url = `${BaseURL}/dbs-applications/${organisationId}/GetEmployeesWithoutDbs`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
