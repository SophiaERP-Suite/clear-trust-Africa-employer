import { CheckCheck, ChevronRightIcon, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createEmployee,
  fetchApplicantById,
  updateEmployee,
} from "../../../utils/Requests/EmployeeRequests.js";
import { handleCreateEmployee } from "../../../utils/ResponseHandlers/EmployeeResponse.js";
import { toast } from "react-toastify";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Hashids from "hashids";
import type { CityDto, CountryDto, StateDto } from "../../../types/location.js";
import {
  getAllCities,
  getAllCountry,
  getAllState,
} from "../../../utils/Requests/Location.js";

interface ApplicantFormValues {
  FirstName: string;
  LastName: string;
  OtherNames: string;
  ProfileImage: string;
  Phone: string;
  Email: string;
  IdentificationNumber: string;
  DateOfBirth: string;
  BirthPlace: string;
  Gender: string;
  Address: string;
  CountryId: number;
  StateId: number;
  CityId: number;
  CurrentAddressDuration: number;
}

interface EmployeeData {
  userId: number;
  firstName: string;
  lastName: string;
  otherNames: string;
  profileImage: string;
  phone: string;
  email: string;
  identificationNumber: string;
  dateOfBirth: string;
  birthPlace: string;
  gender: string;
  address: string;
  countryId: number;
  stateId: number;
  cityId: number;
  currentAddressDuration: number;
  organizationId: number;
  role: string;
}

function AdminEmployeesNew() {
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const { register, reset, handleSubmit, formState } =
    useForm<ApplicantFormValues>();
  const { errors } = formState;
  const { id } = useParams();
  const hashIds = new Hashids("ClearTrustAfricaEncode", 10);
  const hashedId = id ? Number(hashIds.decode(id)[0]) : 0;
  const isEditMode = !!id;

  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [states, setStates] = useState<StateDto[]>([]);
  const [cities, setCities] = useState<CityDto[]>([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchStates = async (stateId: number) => {
    const stateData = await getAllState(stateId);
    if (stateData) {
      setStates(stateData);
    }
  };

  const fetchCountries = async () => {
    const countryData = await getAllCountry();
    if (countryData) {
      setCountries(countryData);
    }
  };
  const fetchCities = async (stateId: number) => {
    const cityData = await getAllCities(stateId);
    if (cityData) {
      setCities(cityData);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = Number(e.target.value);
    if (countryId && countryId !== 0) {
      fetchStates(countryId);
      setStates([]);
      setCities([]);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = Number(e.target.value);
    if (stateId && stateId !== 0) {
      fetchCities(stateId);
      setCities([]);
    }
  };

  useEffect(() => {
    if (hashedId) {
      fetchApplicantById(Number(hashedId))
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              console.log("applicant", data);
              const employeeData = data.data.user;
              setEmployee(employeeData);

              // Reset form with employee data
              reset({
                FirstName: employeeData.firstName || "",
                LastName: employeeData.lastName || "",
                OtherNames: employeeData.otherNames || "",
                Phone: employeeData.phone || "",
                Email: employeeData.email || "",
                IdentificationNumber: employeeData.identificationNumber || "",
                DateOfBirth: employeeData.dateOfBirth?.split("T")[0] || "",
                BirthPlace: employeeData.birthPlace || "",
                Gender: employeeData.gender || "default",
                Address: employeeData.address || "",
                CountryId: employeeData.countryId || 0,
                StateId: employeeData.stateId || 0,
                CityId: employeeData.cityId || 0,
                CurrentAddressDuration:
                  employeeData.currentAddressDuration || 0,
              });
            });
          } else {
            res.text().then((data) => {
              console.log(JSON.parse(data));
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [hashedId, reset]);

  const addApplicant = async (data: ApplicantFormValues) => {
    if (
      !errors.FirstName &&
      !errors.LastName &&
      !errors.OtherNames &&
      !errors.ProfileImage &&
      !errors.Phone &&
      !errors.Email &&
      !errors.IdentificationNumber &&
      !errors.DateOfBirth &&
      !errors.BirthPlace &&
      !errors.Gender &&
      !errors.Address &&
      !errors.CountryId &&
      !errors.StateId &&
      !errors.CityId &&
      !errors.CurrentAddressDuration
    ) {
      const loader = document.getElementById("query-loader");
      const text = document.getElementById("query-text");
      if (loader) {
        loader.style.display = "flex";
      }
      if (text) {
        text.style.display = "none";
      }
      const formData = new FormData();
      formData.append("FirstName", data.FirstName);
      formData.append("LastName", data.LastName);
      formData.append("OtherNames", data.OtherNames);
      formData.append("Phone", data.Phone);
      formData.append("Email", data.Email);
      formData.append("IdentificationNumber", data.IdentificationNumber);
      formData.append("DateOfBirth", data.DateOfBirth);
      formData.append("BirthPlace", data.BirthPlace);
      formData.append("Gender", data.Gender);
      formData.append("Address", data.Address);
      formData.append("CountryId", data.CountryId.toString());
      formData.append("StateId", data.StateId.toString());
      formData.append("CityId", data.CityId.toString());
      formData.append(
        "CurrentAddressDuration",
        data.CurrentAddressDuration.toString(),
      );
      formData.append("ProfileImage", data.ProfileImage[0]);

      if (isEditMode) {
        const res = await updateEmployee(formData, hashedId);
        handleCreateEmployee(res, loader, text, { toast }, reset);
      } else {
        const res = await createEmployee(formData);
        handleCreateEmployee(res, loader, text, { toast }, reset);
      }
    }
  };
  return (
    <>
      <div
        className="p-6 lg:p-8 footer-inner mx-auto main-container container"
        x-bind:className="setting.page_layout"
      >
        <div className="flex flex-wrap mb-8 items-center justify-between">
          <div className="flex">
            <Users className="text-[rgb(112_22_208/0.9)] mr-2 " size={36} />
            <div>
              <h3 className="mb-0 text-black">Employee Management</h3>
              <p className="text-secondary-600 text-black">
                <NavLink to="/Dashboard">Dashboard</NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/Employee">Employee Mgt </NavLink>
                <ChevronRightIcon size={14} />
                <NavLink to="/EmployeeNew">New Employee</NavLink>
              </p>
            </div>
          </div>
          <div>
            <NavLink to="/Employee" className="btn btn-primary">
              <Users size={18} className="mr-2" />
              All Employees
            </NavLink>
          </div>
        </div>
        <div className="lg:flex lg:grid-cols-2 gap-8">
          <div className="flex-auto w-full">
            <div className="relative flex flex-col mb-8 text-secondary-500 bg-white shadow rounded -mt-2 dark:bg-dark-card">
              <div className="flex justify-between flex-auto p-6 border-b dark:border-secondary-800">
                <h4 className="mb-0 dark:text-white">Employee Information</h4>

                {isEditMode && (
                  <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                    Editing Mode
                  </span>
                )}
              </div>
              <div className="p-6 ">
                <form onSubmit={handleSubmit(addApplicant)} noValidate>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5">
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="fname"
                      >
                        First Name
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("FirstName", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.firstName}
                          required
                        />
                        <p className="error-msg">{errors.FirstName?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="lname"
                      >
                        Last Name
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("LastName", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.lastName}
                          required
                        />
                        <p className="error-msg">{errors.LastName?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="othernames"
                      >
                        Other Names
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("OtherNames", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.otherNames}
                          required
                        />
                        <p className="error-msg">
                          {errors.OtherNames?.message}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="mobno"
                      >
                        Mobile Number
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("Phone", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.phone}
                          required
                        />
                        <p className="error-msg">{errors.Phone?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("Email", {
                            required: isEditMode ? false : "Required",
                            pattern: {
                              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                              message: "Invalid Email",
                            },
                          })}
                          defaultValue={employee?.email}
                          required
                        />
                        <p className="error-msg">{errors.Email?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Applicant Photo
                      </label>
                      <div>
                        <input
                          type="file"
                          className="form-control text-black"
                          {...register("ProfileImage", {
                            required: isEditMode ? false : "Required",
                          })}
                          required
                        />

                        {isEditMode && (
                          <img
                            src={employee?.profileImage}
                            className="max-w-[25px] mt-3 border rounded-md text-sm text-black"
                          />
                        )}

                        <p className="error-msg">
                          {errors.ProfileImage?.message}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="dateOfBirth"
                      >
                        Date Of Birth
                      </label>
                      <div>
                        <input
                          type="date"
                          id="dateOfBirth"
                          className="form-control text-black"
                          {...register("DateOfBirth", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.dateOfBirth?.split("T")[0]}
                          required
                        />
                        <p className="error-msg">
                          {errors.DateOfBirth?.message}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="birthplace"
                      >
                        Birth Place
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("BirthPlace", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.birthPlace}
                          required
                        />
                        <p className="error-msg">
                          {errors.BirthPlace?.message}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Identification Number (NIN, SSN, SIN)
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control text-black"
                          {...register("IdentificationNumber", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.identificationNumber}
                          required
                        />
                        <p className="error-msg">
                          {errors.IdentificationNumber?.message}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="email"
                      >
                        Gender
                      </label>
                      <div>
                        <select
                          className="form-control text-black"
                          {...register("Gender", {
                            required: isEditMode ? false : "Required",
                            pattern: {
                              value: /^(?!default$).+$/,
                              message: "Required",
                            },
                          })}
                          defaultValue={employee?.gender}
                        >
                          <option value="default">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <p className="error-msg">{errors.Gender?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="country"
                      >
                        Country
                      </label>
                      <div>
                        <select
                          className="form-control text-black"
                          {...register("CountryId", {
                            required: isEditMode ? false : "Required",
                            pattern: {
                              value: /^(?!default$).+$/,
                              message: "Required",
                            },
                          })}
                          defaultValue={employee?.countryId}
                          onChange={handleCountryChange}
                        >
                          <option value="default">Select Country</option>
                          {countries.map((country: any) => (
                            <option
                              key={country.countryId}
                              value={country.countryId}
                            >
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <p className="error-msg">{errors.CountryId?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="state"
                      >
                        State
                      </label>
                      <div>
                        <select
                          className="form-control text-black"
                          {...register("StateId", {
                            required: isEditMode ? false : "Required",
                            pattern: {
                              value: /^(?!default$).+$/,
                              message: "Required",
                            },
                          })}
                          defaultValue={employee?.stateId}
                          onChange={handleStateChange}
                        >
                          <option value="default">Select State</option>
                          {states.map((state: any) => (
                            <option key={state.stateId} value={state.stateId}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                        <p className="error-msg">{errors.StateId?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <div>
                        <select
                          className="form-control text-black"
                          {...register("CityId", {
                            required: isEditMode ? false : "Required",
                            pattern: {
                              value: /^(?!default$).+$/,
                              message: "Required",
                            },
                          })}
                          defaultValue={employee?.cityId}
                        >
                          <option value="default">Select City</option>
                          {cities.map((city: any) => (
                            <option key={city.cityId} value={city.cityId}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                        <p className="error-msg">{errors.CityId?.message}</p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="addressduration"
                      >
                        Current Address Duration (Years)
                      </label>
                      <div>
                        <input
                          type="number"
                          className="form-control text-black"
                          {...register("CurrentAddressDuration", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.currentAddressDuration}
                          required
                        />
                        <p className="error-msg">
                          {errors.CurrentAddressDuration?.message}
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <label
                        className="inline-block mb-2 text-secondary-600 dark:text-white"
                        htmlFor="Address"
                      >
                        Current Address
                      </label>
                      <div>
                        <textarea
                          className="form-control text-black"
                          {...register("Address", {
                            required: isEditMode ? false : "Required",
                          })}
                          defaultValue={employee?.address}
                          required
                        ></textarea>
                        <p className="error-msg">{errors.Address?.message}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-5" />
                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-success">
                      <div className="dots hidden" id="query-loader">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      <span id="query-text">
                        <CheckCheck size={18} className="mr-2" />
                        {isEditMode ? "Update" : "Create Applicant"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEmployeesNew;
