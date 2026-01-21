const BaseURL = "http://localhost:5181";

export const getAllCities = async (stateId: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/admin/City/${stateId}/GetAll`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

export const getAllState = async (countryId: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BaseURL}/api/admin/State/${countryId}/GetAll`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};

export const getAllCountry = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BaseURL}/api/admin/Country/GetAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
