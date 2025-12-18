"use client";

import { useState, useEffect } from "react";

export default function DentalROICalculator() {
  const [isAligner, setIsAligner] = useState(false);
  const [monthlyVolume, setMonthlyVolume] = useState(50);
  const [currentLabFee, setCurrentLabFee] = useState(50);
  const [staffHourlyRate, setStaffHourlyRate] = useState(25);
  const [doctorHourlyRate, setDoctorHourlyRate] = useState(500);

  const calculateCosts = () => {
    // Outsourced Lab (Status Quo)
    const outsourced = {
      materialCost: 0,
      softwareFee: 0,
      adminLabor: (5/60) * staffHourlyRate, // 5 mins
      mfgLabor: 0,
      unitCost: currentLabFee + (5/60) * staffHourlyRate
    };

    // DIY In-House (The Trap)
    const diy = {
      materialCost: 5,
      softwareFee: isAligner ? 19 : 0,
      adminLabor: (20/60) * staffHourlyRate, // 20 mins
      mfgLabor: (15/60) * staffHourlyRate, // 15 mins
      unitCost: 5 + (isAligner ? 19 : 0) + (20/60) * staffHourlyRate + (15/60) * staffHourlyRate
    };

    // "No-Admin" Protocol (The Solution)
    const noAdmin = {
      materialCost: 5,
      softwareFee: isAligner ? 19 : 0,
      adminLabor: 0, // 0 mins - THE KEY DIFFERENTIATOR
      mfgLabor: (10/60) * staffHourlyRate, // 10 mins (optimized)
      unitCost: 5 + (isAligner ? 19 : 0) + (10/60) * staffHourlyRate
    };

    return {
      outsourced: {
        ...outsourced,
        monthlyCost: outsourced.unitCost * monthlyVolume,
        setupCost: 0,
        hiddenRDCost: 0
      },
      diy: {
        ...diy,
        monthlyCost: diy.unitCost * monthlyVolume,
        setupCost: 10000,
        hiddenRDCost: 25000 // 50 hrs @ $500/hr
      },
      noAdmin: {
        ...noAdmin,
        monthlyCost: noAdmin.unitCost * monthlyVolume,
        setupCost: 10000,
        serviceCost: 7500,
        hiddenRDCost: 0
      }
    };
  };

  const costs = calculateCosts();
  const monthlyNoAdminSavings = costs.outsourced.monthlyCost - costs.noAdmin.monthlyCost;
  const paybackPeriod = (costs.noAdmin.setupCost + costs.noAdmin.serviceCost) / monthlyNoAdminSavings;

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          The "No-Admin" ROI Calculator
        </h2>
        
        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-full flex">
            <button
              onClick={() => setIsAligner(false)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                !isAligner 
                  ? 'bg-[#FFBA4A] text-gray-900 shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Retainers (Phase 1)
            </button>
            <button
              onClick={() => setIsAligner(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                isAligner 
                  ? 'bg-[#FFBA4A] text-gray-900 shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Aligners (Phase 2)
            </button>
          </div>
        </div>

        {/* Input Controls */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Your Practice Parameters</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Volume
              </label>
              <input 
                type="number" 
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBA4A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Lab Fee
              </label>
              <input 
                type="number" 
                value={currentLabFee}
                onChange={(e) => setCurrentLabFee(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBA4A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Staff Hourly Rate
              </label>
              <input 
                type="number" 
                value={staffHourlyRate}
                onChange={(e) => setStaffHourlyRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBA4A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Hourly Rate
              </label>
              <input 
                type="number" 
                value={doctorHourlyRate}
                onChange={(e) => setDoctorHourlyRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBA4A] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Three-Column Comparison */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Outsourced Lab (Status Quo) */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-red-700 mb-4 text-center">
              Outsourced Lab<br />
              <span className="text-sm font-normal">(Status Quo)</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Material Cost:</span>
                <span>${costs.outsourced.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Software Fee:</span>
                <span>${costs.outsourced.softwareFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Admin Labor (5 min):</span>
                <span>${costs.outsourced.adminLabor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Mfg Labor:</span>
                <span>${costs.outsourced.mfgLabor.toFixed(2)}</span>
              </div>
              <hr className="border-red-300" />
              <div className="flex justify-between font-bold text-lg">
                <span>Unit Cost:</span>
                <span>${costs.outsourced.unitCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-red-700">
                <span>Monthly Cost:</span>
                <span>${costs.outsourced.monthlyCost.toLocaleString()}</span>
              </div>
              <div className="mt-4 p-3 bg-red-100 rounded">
                <div className="text-xs">
                  <div>Setup Cost: ${costs.outsourced.setupCost.toLocaleString()}</div>
                  <div>Hidden R&D: ${costs.outsourced.hiddenRDCost.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* DIY In-House (The Trap) */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-yellow-700 mb-4 text-center">
              DIY In-House<br />
              <span className="text-sm font-normal text-red-600">(The Trap)</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Material Cost:</span>
                <span>${costs.diy.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Software Fee:</span>
                <span>${costs.diy.softwareFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Admin Labor (20 min):</span>
                <span>${costs.diy.adminLabor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Mfg Labor (15 min):</span>
                <span>${costs.diy.mfgLabor.toFixed(2)}</span>
              </div>
              <hr className="border-yellow-400" />
              <div className="flex justify-between font-bold text-lg">
                <span>Unit Cost:</span>
                <span>${costs.diy.unitCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-yellow-700">
                <span>Monthly Cost:</span>
                <span>${costs.diy.monthlyCost.toLocaleString()}</span>
              </div>
              <div className="mt-4 p-3 bg-yellow-100 rounded">
                <div className="text-xs">
                  <div>Setup Cost: ${costs.diy.setupCost.toLocaleString()}</div>
                  <div className="text-red-600 font-bold">Hidden R&D: ${costs.diy.hiddenRDCost.toLocaleString()}</div>
                  <div className="text-red-600 text-xs mt-1">50 hrs @ ${doctorHourlyRate}/hr research</div>
                </div>
              </div>
            </div>
          </div>

          {/* "No-Admin" Protocol (The Solution) */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4 text-center">
              "No-Admin" Protocol<br />
              <span className="text-sm font-normal">(The Solution)</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Material Cost:</span>
                <span>${costs.noAdmin.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Software Fee:</span>
                <span>${costs.noAdmin.softwareFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700 font-bold">Admin Labor (0 min):</span>
                <span className="text-green-700 font-bold text-lg">${costs.noAdmin.adminLabor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Mfg Labor (10 min):</span>
                <span>${costs.noAdmin.mfgLabor.toFixed(2)}</span>
              </div>
              <hr className="border-green-300" />
              <div className="flex justify-between font-bold text-lg">
                <span>Unit Cost:</span>
                <span>${costs.noAdmin.unitCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-green-700">
                <span>Monthly Cost:</span>
                <span>${costs.noAdmin.monthlyCost.toLocaleString()}</span>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded">
                <div className="text-xs">
                  <div>Setup Cost: ${costs.noAdmin.setupCost.toLocaleString()}</div>
                  <div>Service Cost: ${costs.noAdmin.serviceCost.toLocaleString()}</div>
                  <div className="text-green-600 font-bold">Hidden R&D: ${costs.noAdmin.hiddenRDCost.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line Results */}
        <div className="bg-[#FFBA4A] bg-opacity-20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-6">The Bottom Line</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${monthlyNoAdminSavings.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Monthly Savings vs. Outsourcing</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-[#FFBA4A]">
                {paybackPeriod.toFixed(1)} months
              </div>
              <div className="text-sm text-gray-600">Payback Period</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${(monthlyNoAdminSavings * 12).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Annual Savings</div>
            </div>
          </div>
          
          {!isAligner && (
            <div className="mt-6 p-4 bg-green-100 rounded-lg">
              <p className="text-green-800 font-semibold">
                ✅ Powered by custom Python automation. No slicing, no data entry.
              </p>
            </div>
          )}
          
          {isAligner && (
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-blue-800 font-semibold">
                💡 Even with uLab fees, aligner margins are exceptional: ~$40 cost vs. $5,000 patient fee
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}