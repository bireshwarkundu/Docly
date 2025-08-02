import { useState } from "react";

interface FormData {
  stationName: string;
  officerName: string;
  contactNumber: string;
  email: string;
  address: string;
  city: string;
  district: string;
}

interface FormErrors {
  stationName?: string;
  officerName?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  district?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    stationName: "",
    officerName: "",
    contactNumber: "",
    email: "",
    address: "",
    city: "",
    district: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showMap, setShowMap] = useState(false);

  const validateField = (fieldName: keyof FormData, value: string) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "stationName":
        if (!value.trim()) {
          newErrors.stationName = "Police station name is required";
        } else {
          delete newErrors.stationName;
        }
        break;
      case "officerName":
        if (!value.trim()) {
          newErrors.officerName = "Officer-in-charge name is required";
        } else {
          delete newErrors.officerName;
        }
        break;
      case "contactNumber":
        if (!value.trim()) {
          newErrors.contactNumber = "Contact number is required";
        } else if (!/^\+91\s\d{5}-\d{5}$/.test(value) && !/^\d{10}$/.test(value.replace(/\D/g, ""))) {
          newErrors.contactNumber = "Please enter a valid contact number";
        } else {
          delete newErrors.contactNumber;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "address":
        if (!value.trim()) {
          newErrors.address = "Station address is required";
        } else {
          delete newErrors.address;
        }
        break;
      case "city":
        if (!value.trim()) {
          newErrors.city = "City is required";
        } else {
          delete newErrors.city;
        }
        break;
      case "district":
        if (!value.trim()) {
          newErrors.district = "District is required";
        } else {
          delete newErrors.district;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (fieldName: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleNext = () => {
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key as keyof FormData, formData[key as keyof FormData]);
    });

    const hasErrors = Object.values(errors).some(error => error);
    const hasEmptyFields = Object.values(formData).some(value => !value.trim());

    if (!hasErrors && !hasEmptyFields) {
      // Proceed to next step
      console.log("Form is valid, proceeding to next step", formData);
    }
  };

  const districts = [
    "Kolkata",
    "Howrah", 
    "North 24 Parganas",
    "South 24 Parganas",
    "Hooghly",
    "Nadia",
    "Murshidabad",
    "Birbhum",
    "Burdwan",
    "Midnapore",
    "Bankura",
    "Purulia",
    "Darjeeling",
    "Jalpaiguri",
    "Cooch Behar",
    "Malda",
    "South Dinajpur",
    "North Dinajpur"
  ];

  return (
    <div className="min-h-screen w-full bg-emergensync-bg font-['Inter']">
      <div className="w-full max-w-[800px] mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)] p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.2922 28.5771V7.24382C26.2922 6.53657 26.0112 5.85829 25.5111 5.3582C25.011 4.8581 24.3327 4.57715 23.6255 4.57715H10.2922C9.58491 4.57715 8.90663 4.8581 8.40653 5.3582C7.90643 5.85829 7.62548 6.53657 7.62548 7.24382V28.5771M26.2922 28.5771H28.9588M26.2922 28.5771H19.6255M7.62548 28.5771H4.95882M7.62548 28.5771H14.2922M19.6255 28.5771V21.9105C19.6255 21.5569 19.485 21.2177 19.235 20.9677C18.9849 20.7176 18.6458 20.5771 18.2922 20.5771H15.6255C15.2719 20.5771 14.9327 20.7176 14.6827 20.9677C14.4326 21.2177 14.2922 21.5569 14.2922 21.9105V28.5771M19.6255 28.5771H14.2922M12.9588 9.91048H14.2922M12.9588 15.2438H14.2922M19.6255 9.91048H20.9588M19.6255 15.2438H20.9588" stroke="#0052CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <h1 className="text-2xl font-bold text-emergensync-dark leading-9">
                    EmergenSync
                  </h1>
                  <p className="text-sm text-emergensync-gray">
                    Emergency Response Platform
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-emergensync-blue rounded-full"></div>
                <div className="w-8 h-1 bg-emergensync-lightgray rounded-full"></div>
              </div>
            </div>
            <div className="mb-2">
              <h2 className="text-[28px] font-bold text-emergensync-dark leading-[42px]">
                Police Station Registration
              </h2>
              <p className="text-base text-emergensync-gray leading-6">
                Step 1 of 2 – Enter your station and officer details
              </p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-emergensync-blue leading-[21px]">
                  <span>Police Station Name </span>
                  <span className="text-emergensync-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter police station name"
                  value={formData.stationName}
                  onChange={(e) => handleInputChange("stationName", e.target.value)}
                  onBlur={(e) => validateField("stationName", e.target.value)}
                  className="w-full h-12 px-4 border border-emergensync-lightgray rounded-lg text-base text-emergensync-dark bg-white focus:outline-none focus:ring-2 focus:ring-emergensync-blue focus:border-transparent"
                />
                {errors.stationName && (
                  <div className="text-emergensync-red text-xs">
                    {errors.stationName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-emergensync-blue leading-[21px]">
                  <span>Officer-in-Charge Full Name </span>
                  <span className="text-emergensync-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter officer-in-charge full name"
                  value={formData.officerName}
                  onChange={(e) => handleInputChange("officerName", e.target.value)}
                  onBlur={(e) => validateField("officerName", e.target.value)}
                  className="w-full h-12 px-4 border border-emergensync-lightgray rounded-lg text-base text-emergensync-dark bg-white focus:outline-none focus:ring-2 focus:ring-emergensync-blue focus:border-transparent"
                />
                {errors.officerName && (
                  <div className="text-emergensync-red text-xs">
                    {errors.officerName}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-emergensync-blue leading-[21px]">
                  <span>Contact Number </span>
                  <span className="text-emergensync-red">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765-43210"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  onBlur={(e) => validateField("contactNumber", e.target.value)}
                  className="w-full h-12 px-4 border border-emergensync-lightgray rounded-lg text-base text-emergensync-dark bg-white focus:outline-none focus:ring-2 focus:ring-emergensync-blue focus:border-transparent"
                />
                {errors.contactNumber && (
                  <div className="text-emergensync-red text-xs">
                    {errors.contactNumber}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-emergensync-blue leading-[21px]">
                  <span>Email Address </span>
                  <span className="text-emergensync-red">*</span>
                </label>
                <input
                  type="email"
                  placeholder="station@police.gov.in"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={(e) => validateField("email", e.target.value)}
                  className="w-full h-12 px-4 border border-emergensync-lightgray rounded-lg text-base text-emergensync-dark bg-white focus:outline-none focus:ring-2 focus:ring-emergensync-blue focus:border-transparent"
                />
                {errors.email && (
                  <div className="text-emergensync-red text-xs">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-emergensync-blue leading-[21px]">
                <span>Full Station Address </span>
                <span className="text-emergensync-red">*</span>
              </label>
              <textarea
                rows={4}
                className="resize-none w-full px-4 py-3 border border-emergensync-lightgray rounded-lg text-base text-emergensync-dark bg-white focus:outline-none focus:ring-2 focus:ring-emergensync-blue focus:border-transparent"
                placeholder="Enter complete station address including street, area, and postal code"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                onBlur={(e) => validateField("address", e.target.value)}
              />
              {errors.address && (
                <div className="text-emergensync-red text-xs">
                  {errors.address}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-emergensync-blue leading-[21px]">
                  <span>City </span>
                  <span className="text-emergensync-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  onBlur={(e) => validateField("city", e.target.value)}
                  className="w-full h-12 px-4 border border-emergensync-lightgray rounded-lg text-base text-emergensync-dark bg-white focus:outline-none focus:ring-2 focus:ring-emergensync-blue focus:border-transparent"
                />
                {errors.city && (
                  <div className="text-emergensync-red text-xs">
                    {errors.city}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-emergensync-blue leading-[21px]">
                  <span>District </span>
                  <span className="text-emergensync-red">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  onBlur={(e) => validateField("district", e.target.value)}
                  className="w-full h-12 px-4 border border-emergensync-lightgray rounded-lg text-base text-emergensync-dark bg-white focus:outline-none focus:ring-2 focus:ring-emergensync-blue focus:border-transparent"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <div className="text-emergensync-red text-xs">
                    {errors.district}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-emergensync-blue leading-[21px]">
                Station Location
              </label>
              <div className="border border-emergensync-lightgray rounded-lg overflow-hidden">
                {!showMap ? (
                  <div
                    onClick={() => setShowMap(true)}
                    className="h-[200px] bg-emergensync-click-bg flex flex-col items-center justify-center gap-3 cursor-pointer"
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                        stroke="#0052CC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                        stroke="#0052CC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-sm text-emergensync-blue font-medium">
                      Click to set station location on map
                    </p>
                    <p className="text-xs text-emergensync-gray">
                      This helps emergency services locate your station
                    </p>
                  </div>
                ) : (
                  <div className="h-[200px] bg-emergensync-map-bg flex flex-col items-center justify-center gap-3 relative">
                    <div className="absolute top-3 right-3">
                      <button
                        type="button"
                        onClick={() => setShowMap(false)}
                        className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)]"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="#666666"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                        stroke="#DC2625"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                        stroke="#DC2625"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-sm text-emergensync-blue font-medium">
                      Location marked successfully
                    </p>
                    <p className="text-xs text-emergensync-gray">
                      Lat: 22.5726, Lng: 88.3639 (Sample coordinates)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="text-sm text-emergensync-gray hover:text-emergensync-dark transition-colors"
                >
                  ← Cancel Registration
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-emergensync-red text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-emergensync-gray">
            <span>Need help? Contact support at </span>
            <span className="text-emergensync-blue">
              support@emergensync.gov.in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
