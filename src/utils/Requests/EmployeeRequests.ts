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
  return response
}
