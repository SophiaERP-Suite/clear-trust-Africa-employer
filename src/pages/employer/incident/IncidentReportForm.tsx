import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AlertTriangleIcon,
  ChevronRightIcon,
  CheckCheck,
} from "lucide-react";
import {
  fetchApplicants,
  fetchCitiesByStateId,
  fetchCountries,
  fetchStatesByCountryId,
} from "../../../utils/Requests/EmployeeRequests";
import { Controller, useForm } from "react-hook-form";
import RichTextEditor from "../../../layout/RichTextEditor";
import { createNewIncidentReport, fetchIncidentType } from "../../../utils/Requests/IncidentRequests";
import { handleCreateEmployee } from "../../../utils/ResponseHandlers/EmployeeResponse";
import { toast, ToastContainer } from 'react-toastify';

interface IncidentType {
  incidentTypeId: number;
  name: string;
}

interface Employee {
  userId: number;
  firstName: string;
  lastName: string;
}

interface CountryData {
  countryId: number;
  name: string;
  code: string;
}

interface StateData {
  stateId: number;
  name: string;
  code: string;
}

interface CityData {
  cityId: number;
  name: string;
  code: string;
}

interface IncidentReportFormData {
  incidentTitle: string;
  incidentTypeId: number;
  incidentDate: string;
  description: string;
  incidentLocation: string;
  ReportedById: string;
  accusedEmployeeId: string;
  severityLevel: number;
  notifyEmployee: boolean;
  hasInjury: boolean;
  incidentStatus: number;
  countryId: string;
  stateId: string;
  cityId: string;
  organisationId: number;
}

export default function IncidentReportForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState,
    control
  } = useForm<IncidentReportFormData>();
  const { errors } = formState;
  const [incidentType, setIncidentType] = useState<IncidentType[]>([]);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);
   const selectedCountry = watch('countryId');
  const selectedState = watch('stateId');

  useEffect(() => {
    fetchCountries()
    .then(res => {
      if (res.status === 200) {
        res.json()
        .then(data => {
          setCountries(data);
        })
      } else {
        res.text()
        .then(data => {
          console.log(JSON.parse(data));
        })
      }
    })
    .catch((err) => console.log(err))
  }, []);

  useEffect(() => {
    if (!selectedCountry || selectedCountry == 'default') {
      setStates([]);
      setValue('stateId', 'default');
      setValue('cityId', 'default')
      return;
    }
    fetchStatesByCountryId(Number(selectedCountry))
    .then(res => {
      if (res.status === 200) {
        res.json()
        .then(data => {
          setStates(data);
        })
      } else {
        res.text()
        .then(data => {
          console.log(JSON.parse(data));
        })
      }
    })
    .catch((err) => console.log(err))
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (!selectedState || selectedState == 'default') {
      setCities([]);
      setValue('cityId', 'default')
      return;
    }
    fetchCitiesByStateId(Number(selectedState))
    .then(res => {
      if (res.status === 200) {
        res.json()
        .then(data => {
          setCities(data);
        })
      } else {
        res.text()
        .then(data => {
          console.log(JSON.parse(data));
        })
      }
    })
    .catch((err) => console.log(err))
  }, [selectedState, setValue]);

  useEffect(() => {
    fetchIncidentType()
    .then(res => {
    if (res.status === 200) {
        res.json()
        .then(data => {
        console.log(data);
        setIncidentType(data.data);
        })
    } else {
        res.text()
        .then(data => {
        console.log(JSON.parse(data));
        })
    }
    })
}, []);

  const severityLevels = [
    { value: 1, label: "Low", color: "text-green-600" },
    { value: 2, label: "Medium", color: "text-yellow-600" },
    { value: 3, label: "High", color: "text-orange-600" },
    { value: 4, label: "Critical", color: "text-red-600" },
  ];

  
  const submitIncidentReport = async (data: IncidentReportFormData) => {
     if (!errors.incidentTitle && !errors.incidentTypeId &&
        !errors.incidentDate &&
        !errors.description && !errors.incidentLocation &&
        !errors.accusedEmployeeId && !errors.severityLevel &&
        !errors.notifyEmployee && !errors.hasInjury &&
        !errors.countryId && !errors.stateId &&
        !errors.cityId
      ) {
        const loader = document.getElementById('query-loader');
        const text = document.getElementById('query-text');
        if (loader) {
          loader.style.display = 'flex';
        }
        if (text) {
          text.style.display = 'none';
        }
        const formData = new FormData();
        formData.append('IncidentTitle', data.incidentTitle);
        formData.append('IncidentTypeId', `${data.incidentTypeId}`);
        formData.append('CountryId', data.countryId);
        formData.append('IncidentDate', data.incidentDate);
        formData.append('Description', data.description);
        formData.append('IncidentLocation', data.incidentLocation);
        formData.append('AccusedEmployeeId', data.accusedEmployeeId);
        formData.append('ReportedById', data.ReportedById);
        formData.append('SeverityLevel', `${data.severityLevel}`);
        formData.append('NotifyEmployee', `${data.notifyEmployee}`);
        formData.append('HasInjury', `${data.hasInjury}`);
        formData.append('CityId', data.cityId);
        formData.append('StateId', data.stateId);
        const res = await createNewIncidentReport(formData);
        handleCreateEmployee(res, loader, text, { toast }, reset);
      }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchApplicants(1, 200)
    .then(res => {
        if (res.status === 200) {
            res.json()
            .then(data => {
                console.log(data);
                setEmployees(data.data?.users || []);
            })
        } else {
            res.text()
            .then(data => {
                console.log(JSON.parse(data));
            })
        }
    })
    .catch((err) => console.log(err))

    return () => controller.abort();
  }, []);

  return (
    <div className="p-6 lg:p-8 footer-inner mx-auto main-container container">
      {/* Header */}
      <ToastContainer />
      <div className="mb-6">
        <div className="w-full mb-8">
          <div className="row">
            <div className="col-md-12">
                <div className="flex flex-wrap items-center justify-between">
                <div className="flex">
                    <AlertTriangleIcon
                        className="text-[rgb(112_22_208/0.9)] mr-2"
                        size={36}
                    />
                    <div>
                        <h3 className="mb-0 text-black">Incident Management</h3>
                        <p className="text-secondary-600 text-black">
                            <NavLink to="/Dashboard">Dashboard</NavLink>{" "}
                            <ChevronRightIcon size={14} />{" "}
                            <NavLink to="/IncidentMgt">Incident Management</NavLink>{" "}
                            <ChevronRightIcon size={14} />{" "}
                            <NavLink to="/IncidentMgt/Report/New">New Report</NavLink>{" "}
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:grid-cols-2 gap-8">
        <div className="flex-auto w-full">
          <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded-lg -mt-2 dark:bg-dark-card">
            <div className="flex justify-between flex-auto p-6 border-b dark:border-secondary-800">
              <h4 className="mb-0 dark:text-white">
                Incident Report
              </h4>
            </div>

            <div className="p-6">      
              {/* Form */}
              <div>
                <form onSubmit={handleSubmit(submitIncidentReport)}
                  noValidate>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5">
                        <div>
                            <label
                                className="inline-block mb-2 text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Incident Title
                            </label>
                            <div>
                                <input
                                    className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    type="text"
                                    {
                                        ...register('incidentTitle', {
                                            required: 'Required'
                                        })
                                    }
                            />
                            <p className='error-msg'>{errors.incidentTitle?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label
                                className="inline-block mb-2 text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Incident Type
                            </label>
                            <div>
                                <select
                                    className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    {
                                        ...register('incidentTypeId', {
                                            required: 'Required',
                                            pattern: {
                                            value: /^(?!default$).+$/,
                                            message: 'Required'
                                            }
                                        })
                                    }
                                >
                                    <option value="default">Select Incident Type</option>
                                    {incidentType.map((data, index) => (
                                        <option key={data.incidentTypeId ?? index} value={data.incidentTypeId}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                                <p className='error-msg'>{errors.incidentTypeId?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label
                                className="inline-block mb-2 text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Incident Date
                            </label>
                            <div>
                                <input
                                    className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    type="datetime-local"
                                    {
                                        ...register('incidentDate', {
                                            required: 'Required'
                                        })
                                    }
                            />
                            <p className='error-msg'>{errors.incidentDate?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label
                                className="inline-block mb-2 text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Severity Level
                            </label>
                            <div>
                                <select
                                    className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    {
                                        ...register('severityLevel', {
                                            required: 'Required',
                                            pattern: {
                                            value: /^(?!default$).+$/,
                                            message: 'Required'
                                            }
                                        })
                                    }
                                >
                                    <option value="default">Select Sevelrity Level</option>
                                    {severityLevels.map((level) => (
                                        <option key={level.value} value={level.value}>
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                                <p className='error-msg'>{errors.severityLevel?.message}</p>
                            </div>
                        </div>
                        <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Country
                      </label>
                      <div>
                        <select
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('countryId', {
                              required: 'Required',
                              pattern: {
                                value: /^(?!default$).+$/,
                                message: 'Required'
                              }
                            })
                          }
                        >
                          <option value="default">Select Country</option>
                          {
                            countries.map((data, index) => (
                              <option key={index} value={data.countryId}>{data.name}</option>
                            ))
                          }
                        </select>
                        <p className='error-msg'>{errors.countryId?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        State
                      </label>
                      <div>
                        <select
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('stateId', {
                              required: 'Required',
                              pattern: {
                                value: /^(?!default$).+$/,
                                message: 'Required'
                              }
                            })
                          }
                          disabled={!states.length}
                        >
                          <option value="default">Select State</option>
                          {
                            states.map((data, index) => (
                              <option key={index} value={data.stateId}>{data.name}</option>
                            ))
                          }
                        </select>
                        <p className='error-msg'>{errors.stateId?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        City
                      </label>
                      <div>
                        <select
                          className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          {
                            ...register('cityId', {
                              required: 'Required',
                              pattern: {
                                value: /^(?!default$).+$/,
                                message: 'Required'
                              }
                            })
                          }
                          disabled={!cities.length}
                        >
                          <option value="default">Select City</option>
                          {
                            cities.map((data, index) => (
                              <option key={index} value={data.cityId}>{data.name}</option>
                            ))
                          }
                        </select>
                        <p className='error-msg'>{errors.cityId?.message}</p>
                      </div>
                    </div>
                        <div>
                            <label
                                className="inline-block mb-2 text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Address
                            </label>
                            <div>
                                <input
                                    className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    type="text"
                                    {
                                        ...register('incidentLocation', {
                                            required: 'Required'
                                        })
                                    }
                            />
                            <p className='error-msg'>{errors.incidentLocation?.message}</p>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <label
                                className="inline-block mb-2 text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Description
                            </label>
                            <div>
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{ required: 'Required' }}
                                    render={({ field }) => (
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={field.onChange}
                                            />
                                    )}
                                    />
                                <p className='error-msg'>{errors.description?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label
                                className="inline-block mb-2 text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Reported By
                            </label>
                            <div>
                                <select
                                    className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    {
                                        ...register('ReportedById', {
                                            required: 'Required',
                                            pattern: {
                                            value: /^(?!default$).+$/,
                                            message: 'Required'
                                            }
                                        })
                                    }
                                >
                                    <option value="default">Select Reporter</option>
                                    {employees.map((emp) => (
                                        <option key={emp.userId} value={emp.userId}>
                                            {emp.lastName} {emp.firstName}
                                        </option>
                                    ))}
                                </select>
                                <p className='error-msg'>{errors.ReportedById?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label
                                className="inline-block mb-2 text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Accused
                            </label>
                            <div>
                                <select
                                    className="w-full h-12 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-secondary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    {
                                        ...register('accusedEmployeeId', {
                                            required: 'Required',
                                            pattern: {
                                            value: /^(?!default$).+$/,
                                            message: 'Required'
                                            }
                                        })
                                    }
                                >
                                    <option value="default">Select Accused</option>
                                    {employees.map((emp) => (
                                        <option key={emp.userId} value={emp.userId}>
                                            {emp.lastName} {emp.firstName}
                                        </option>
                                    ))}
                                </select>
                                <p className='error-msg'>{errors.accusedEmployeeId?.message}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                className="mr-2 mt-1 ml-1"
                                {
                                ...register('hasInjury', {
                                    required: false
                                })
                                }
                            ></input>
                            <label
                                className="text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Sustained Injury?
                            </label>
                        </div>
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                className="mr-2 mt-1 ml-1"
                                {
                                ...register('notifyEmployee', {
                                    required: false
                                })
                                }
                            ></input>
                            <label
                                className="text-secondary-600 dark:text-white"
                                htmlFor="email"
                                >
                                Notify Employee?
                            </label>
                        </div>
                    </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button className="btn btn-success">
                      <div className="dots hidden" id="query-loader">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      <span id="query-text">
                        <CheckCheck size={18} className="mr-2" />
                        Submit Report
                      </span>
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}