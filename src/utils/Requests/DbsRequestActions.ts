const BaseURL = "http://localhost:5181";

export const fetchDbsTypes = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-types`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const submitDbsType = async (data: FormData) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-types`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const updateDbsType = async (data: FormData, typeId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-types/${typeId}`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const fetchDbsStatus = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-status`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchDbsChecks = async (filterData: object) => {
  const token = localStorage.getItem('accessToken');
  const params = new URLSearchParams();
  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, value);
    }
  })
  const url = `${BaseURL}/dbs-applications?${params}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}



export const generateNewDBSCertificate = async (id: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-applications/${id}/certificate`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const getDBSCertificateByApplicationId = async (id: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-applications/${id}/certificate`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const submitDbsStatus = async (data: FormData) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-status`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const updateDbsStatus = async (data: FormData, statusId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-status/${statusId}`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const fetchDbsStages = async (filterData: object) => {
  const token = localStorage.getItem('accessToken');
  const params = new URLSearchParams();
  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, value);
    }
  })
  const url = `${BaseURL}/dbs-stages?${params}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchDbsLogsByApplication = async (applicationId: number, filterData: object) => {
  const token = localStorage.getItem('accessToken');
  const params = new URLSearchParams();
  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, value);
    }
  })
  const url = `${BaseURL}/dbs-activity-log/${applicationId}?${params}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchDbsstats = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BaseURL}/dbs-applications/stats`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchDbsChecksAwaitingAssignemnt = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BaseURL}/dbs-applications/awaiting-assignment`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchDbsChecksAwaitingApproval = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BaseURL}/dbs-stage-status/awaiting-approval`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchOverdueChecks = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BaseURL}/dbs-stage-status/overdue`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const submitDbsActivityLog = async (applicationId: number, data: FormData) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-activity-log/${applicationId}`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const fetchCTASettings = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BaseURL}/cta-settings`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchExpiredCertificates = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BaseURL}/dbs-certificate/expired`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchSoonExpiringCertificates = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BaseURL}/dbs-certificate/expiring-soon`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const updateCTASettings = async (data: FormData) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/cta-settings`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const submitDbsStage = async (data: FormData) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-stages`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const submitNewComment = async (data: FormData, dbsApplicationId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/comment-log/dbs-application/${dbsApplicationId}`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const getDBSApplicationComment = async (dbsApplicationId: number, filterData: object) => {
  const token = localStorage.getItem('accessToken');
  const params = new URLSearchParams();
  Object.entries(filterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, value);
    }
  })
  const response = await fetch(`${BaseURL}/comment-log/dbs-application/${dbsApplicationId}?${params}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const updateDbsStage = async (data: FormData, stageId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-stages/${stageId}`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const updateDbsApplications = async (data: FormData, applicationId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-applications/${applicationId}`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const updateDocStatus = async (data: FormData, UserDocumentId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/applicants/docs/${UserDocumentId}/status`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const markStageAsCompleted = async (data: FormData, applicationId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-stage-status/application/${applicationId}/complete`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const markStageAsApproved = async (data: FormData, applicationId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-stage-status/application/${applicationId}/approve`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  return response
}

export const fetchStageByApplicationAndStage = async (applicationId: number, stageId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-stage-status/application/${applicationId}/stage/${stageId}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const fetchDbsSearchData = async (dbsSearchId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-search/${dbsSearchId}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const removeDbsSearchData = async (dbsSearchId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-search/${dbsSearchId}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const matchDbsSearchData = async (dbsSearchId: number) => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BaseURL}/dbs-search/${dbsSearchId}/match`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}
