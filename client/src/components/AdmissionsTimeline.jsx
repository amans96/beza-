import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
// Make sure this import path matches exactly where your data file is!
import { admissionStepsData } from '../data/admissionStepsData.js';

const AdmissionsTimeline = () => {
  const [activeStep, setActiveStep] = useState(1);

  // Get current card data
  const currentStepData = admissionStepsData.find(step => step.stepNumber === activeStep);
  const CardIcon = currentStepData.icon;

  return (
    <section className="py-20 bg-gray-50 min-h-screen font-sans">
      {/* Custom Keyframes for Card Animation */}
      <style>
        {`
          @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-slide-up {
            animation: fadeSlideUp 0.5s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Apply</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow our simple four-step process to secure your child's place at our institution.
          </p>
        </div>

        {/* Timeline Stepper */}
        <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto px-4 md:px-8">
          {admissionStepsData.map((step, index) => {
            const isCompleted = step.stepNumber < activeStep;
            const isCurrent = step.stepNumber === activeStep;
            const isLast = index === admissionStepsData.length - 1;

            return (
              <div 
                key={step.id} 
                className="relative flex-1 group cursor-pointer"
                onClick={() => setActiveStep(step.stepNumber)}
              >
                {/* Desktop Connecting Line */}
                {!isLast && (
                  <div className="hidden md:block absolute top-[24px] left-[50%] w-full h-[2px] bg-gray-200 z-0">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500 ease-in-out" 
                      style={{ width: isCompleted ? '100%' : '0%' }} 
                    />
                  </div>
                )}

                {/* Mobile Layout Wrapper */}
                <div className="flex md:flex-col items-start md:items-center relative z-10 pb-12 md:pb-0">
                  
                  {/* Mobile Connecting Line */}
                  {!isLast && (
                    <div className="md:hidden absolute top-[48px] left-[23px] w-[2px] h-[calc(100%-48px)] bg-gray-200 z-0">
                      <div 
                        className="w-full bg-emerald-500 transition-all duration-500 ease-in-out" 
                        style={{ height: isCompleted ? '100%' : '0%' }} 
                      />
                    </div>
                  )}

                  {/* Circular Step Icon */}
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 z-10 relative
                    ${isCurrent ? 'border-emerald-500 bg-emerald-500 scale-110 shadow-lg' : ''}
                    ${isCompleted ? 'border-emerald-500 bg-emerald-500' : ''}
                    ${!isCurrent && !isCompleted ? 'border-gray-300 bg-white group-hover:border-emerald-400 group-hover:scale-105' : ''}
                  `}>
                    {/* The text color is now explicitly forced here so it can never blend into the background */}
                    <span className={`font-bold text-lg transition-colors duration-300 ${isCurrent || isCompleted ? 'text-white' : 'text-gray-500'}`}>
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Step Title */}
                  <div className="ml-6 md:ml-0 md:mt-5 md:absolute md:top-14 text-left md:text-center md:w-36 md:left-1/2 md:-translate-x-1/2 mt-3">
                    <span className={`text-base md:text-sm font-semibold transition-colors duration-300
                      ${isCurrent || isCompleted ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-500'}
                    `}>
                      {step.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Card */}
        <div className="mt-8 md:mt-32 w-full max-w-[900px] mx-auto px-4 md:px-0 relative z-20">
          <div 
            key={activeStep} 
            className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.12)] hover:-translate-y-1 animate-fade-slide-up"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Card Large Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                  <CardIcon className="w-8 h-8" strokeWidth={2} />
                </div>
              </div>

              {/* Card Content */}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-emerald-500 tracking-wider uppercase mb-2">
                  Step {currentStepData.stepNumber}
                </h3>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {currentStepData.title}
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {currentStepData.description}
                </p>
                
                {/* Bullet Points */}
                <ul className="space-y-4 mb-10">
                  {currentStepData.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="text-gray-700 text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional "Need Help?" CTA */}
                <div className="pt-6 border-t border-gray-100">
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center group">
                    Need Help? Contact Admissions
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdmissionsTimeline;