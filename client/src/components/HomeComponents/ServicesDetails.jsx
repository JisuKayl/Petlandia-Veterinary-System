import React from "react";

const ServicesDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-200 to-indigo-300 flex flex-col items-center px-6 py-12">
      <div className="max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          At PetLandia Vets, we are committed to providing top-notch care for
          your furry friends. Our comprehensive range of services is designed to
          address all aspects of your pet's health and well-being, ensuring they
          live a happy and healthy life.
        </p>
        <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
          Services We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Individual Service Items */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              General Check-Ups
            </h3>
            <p className="text-gray-600 mt-2">
              Routine wellness exams to keep your pet in top health and catch
              potential issues early.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Vaccinations</h3>
            <p className="text-gray-600 mt-2">
              Protect your pet from common diseases with our tailored
              vaccination schedules.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Grooming</h3>
            <p className="text-gray-600 mt-2">
              Maintain your pet’s appearance and hygiene with our professional
              grooming services.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              Surgical Services
            </h3>
            <p className="text-gray-600 mt-2">
              Safe and effective surgeries, including spaying, neutering, and
              advanced procedures.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Diagnostics</h3>
            <p className="text-gray-600 mt-2">
              Advanced diagnostic tools like X-rays, ultrasounds, and lab tests
              to assess your pet's health.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              Online Appointment Booking
            </h3>
            <p className="text-gray-600 mt-2">
              Conveniently book appointments online with our user-friendly
              system. We also offer automated reminders to keep you updated
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <img
            src="src/assets/TEST PICTURE.png"
            alt="Our Services"
            className="rounded-lg shadow-md"
          />
        </div>
        <p className="text-center text-gray-600 mt-6">
          For more information or to schedule an appointment, feel free to
          contact us. We're here to ensure your pet receives the best care
          possible.
        </p>
      </div>
      <footer className="bg-gray-600 text-white py-4 mt-8 w-full">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Petlandia Veterinary. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesDetails;
