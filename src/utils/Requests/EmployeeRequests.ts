const BaseURL = "http://localhost:5181";

export const fetchApplicants = async (pageNumber=1, limit=10) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/applicants?pageNumber=${pageNumber}&limit=${limit}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchApplicantById = async (applicantId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/applicants/${applicantId}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const createEmployee = async (data: FormData) => {
  const token = localStorage.getItem('accessToken');
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
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/applicants/docs`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data,
  })
  return response
}

export const fetchApplicantDocsById = async (applicantId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/applicants/${applicantId}/docs`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}
