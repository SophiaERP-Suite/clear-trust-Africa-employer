const BaseURL = "http://localhost:5181";
  const token = localStorage.getItem('accessToken');

export const fetchApplicants = async (pageNumber=1, limit=10) => {
  const response = await fetch(`${BaseURL}/applicants?pageNumber=${pageNumber}&limit=${limit}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchApplicantById = async (applicantId: number) => {
  const response = await fetch(`${BaseURL}/applicants/${applicantId}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const createEmployee = async (data: FormData) => {
  const response = await fetch(`${BaseURL}/applicants`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data,
  })
  return response
}

export const uploadDocuments = async (data: FormData) => {
  const response = await fetch(`${BaseURL}/applicants/docs`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data,
  })
  return response
}

export const fetchApplicantDocsById = async (applicantId: number, pageNumber=1, limit=5) => {
  const response = await fetch(`${BaseURL}/applicants/${applicantId}/docs?pageNumber=${pageNumber}&limit=${limit}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response;
}

export const fetchCountries = async () => {
  const response = await fetch(`${BaseURL}/api/admin/Country/GetAll`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchStatesByCountryId = async (countryId: number) => {
  const response = await fetch(`${BaseURL}/api/admin/State/${countryId}/GetAll`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchCitiesByStateId = async (stateId: number) => {
  const response = await fetch(`${BaseURL}/api/admin/City/${stateId}/GetAll`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const submitApplicantAddress = async (data: FormData, userId: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/applicants/${userId}/address`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return response;
};


export const fetchApplicantAddresses = async (userId: number, filterData: object) => {
  const params = new URLSearchParams();
  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, value);
    }
  })
  const response = await fetch(`${BaseURL}/applicants/${userId}/address/?${params}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
