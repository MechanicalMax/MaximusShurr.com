"use client";

import { useState } from "react";

export default function DentalROICalculator() {
  // ===== PRICING CONFIGURATION =====
  // Update these values to change your pricing across the entire calculator
  const PRICING = {
    // Monthly Retainer Fees
    AUTOMATION_RETAINER: 300,        // Monthly automation & support fee
    AUTOMATION_RETAINER_NAME: "Automation & Support Retainer",
    
    // One-Time Setup Fees  
    HARDWARE_SETUP: 10000,           // Hardware cost (printers, etc.)
    SERVICE_SETUP: 7500,             // Your service setup fee
    SERVICE_SETUP_NAME: "Zero-Admin Lab Protocol Setup",
    
    // Service Details
    RESEARCH_HOURS_SAVED: 50,        // Hours of research you save them
    MATERIAL_COST_PER_UNIT: 5,       // Cost of resin + plastic per retainer
  };

  // Competitor/Alternative Pricing
  const COMPETITOR_PRICING = {
    DIY_SOFTWARE_FEE: 99,            // Monthly fee for basic slicing software
    DIY_HARDWARE_COST: 10000,        // Same hardware cost for DIY approach
  };

  // Default Practice Parameters
  const [monthlyVolume, setMonthlyVolume] = useState(50);
  const [currentLabFee, setCurrentLabFee] = useState(50);
  const [staffHourlyRate, setStaffHourlyRate] = useState(25);
  const [doctorHourlyRate, setDoctorHourlyRate] = useState(500);

  const calculateCosts = () => {
    // Outsourced Lab (Status Quo) - Monthly Batch Costs
    const outsourced = {
      materialCost: 0, // Materials included in lab fee
      softwareFee: 0, // No software needed
      adminLabor: ((5/60) * staffHourlyRate) * monthlyVolume, // 5 mins per unit × volume
      mfgLabor: 0, // Outsourced manufacturing
      labFees: currentLabFee * monthlyVolume, // Lab fee × volume
      monthlyCost: (currentLabFee * monthlyVolume) + (((5/60) * staffHourlyRate) * monthlyVolume)
    };

    // DIY In-House (The Trap) - Monthly Batch Costs
    const diy = {
      materialCost: PRICING.MATERIAL_COST_PER_UNIT * monthlyVolume,
      softwareFee: COMPETITOR_PRICING.DIY_SOFTWARE_FEE,
      adminLabor: ((20/60) * staffHourlyRate) * monthlyVolume, // 20 mins per unit × volume
      mfgLabor: ((15/60) * staffHourlyRate) * monthlyVolume, // 15 mins per unit × volume
      labFees: 0, // No external lab fees
      monthlyCost: (PRICING.MATERIAL_COST_PER_UNIT * monthlyVolume) + COMPETITOR_PRICING.DIY_SOFTWARE_FEE + (((20/60) * staffHourlyRate) * monthlyVolume) + (((15/60) * staffHourlyRate) * monthlyVolume)
    };

    // "Zero-Admin" Lab Protocol (The Solution) - Monthly Batch Costs
    const noAdmin = {
      materialCost: PRICING.MATERIAL_COST_PER_UNIT * monthlyVolume,
      softwareFee: PRICING.AUTOMATION_RETAINER,
      adminLabor: 0, // 0 mins - THE KEY DIFFERENTIATOR
      mfgLabor: ((10/60) * staffHourlyRate) * monthlyVolume, // 10 mins per unit × volume (optimized)
      labFees: 0, // No external lab fees
      monthlyCost: (PRICING.MATERIAL_COST_PER_UNIT * monthlyVolume) + PRICING.AUTOMATION_RETAINER + (((10/60) * staffHourlyRate) * monthlyVolume)
    };

    return {
      outsourced: {
        ...outsourced,
        monthlySubscription: 0,
        setupCost: 0,
        hiddenRDCost: 0
      },
      diy: {
        ...diy,
        monthlySubscription: COMPETITOR_PRICING.DIY_SOFTWARE_FEE,
        setupCost: COMPETITOR_PRICING.DIY_HARDWARE_COST,
        hiddenRDCost: PRICING.RESEARCH_HOURS_SAVED * doctorHourlyRate
      },
      noAdmin: {
        ...noAdmin,
        monthlySubscription: PRICING.AUTOMATION_RETAINER,
        setupCost: PRICING.HARDWARE_SETUP,
        serviceCost: PRICING.SERVICE_SETUP,
        hiddenRDCost: 0
      }
    };
  };

  const costs = calculateCosts();
  const monthlyNoAdminSavings = costs.outsourced.monthlyCost - costs.noAdmin.monthlyCost;
  const monthlyDIYSavings = costs.outsourced.monthlyCost - costs.diy.monthlyCost;
  
  // Payback period calculations
  const noAdminPaybackPeriod = (costs.noAdmin.setupCost + costs.noAdmin.serviceCost) / monthlyNoAdminSavings;
  const diyPaybackPeriod = (costs.diy.setupCost + costs.diy.hiddenRDCost) / monthlyDIYSavings;

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          The "Zero-Admin" Lab Protocol ROI Calculator
        </h2>

        {/* Input Controls */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Enter Your Practice Parameters:</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Volume (Number of Cases)
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
                Current Lab Fee Per Case ($ per Case)
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
                Staff Hourly Rate ($ per Hour)
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
                Doctor Hourly Rate ($ per Hour)
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

        {/* Four-Column Table Comparison */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">
                    Monthly Cost Component<br />
                    <span className="text-xs font-normal text-gray-600">({monthlyVolume} retainers/month)</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-red-700 w-1/4 bg-red-50">
                    Outsourced Lab<br />
                    <span className="text-xs font-normal text-gray-600">(Status Quo)</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-yellow-700 w-1/4 bg-yellow-50">
                    DIY In-House<br />
                    <span className="text-xs font-normal text-red-600">(The Trap)</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-700 w-1/4 bg-green-50">
                    "Zero-Admin" Lab Protocol<br />
                    <span className="text-xs font-normal text-gray-600">(The Solution)</span>
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {/* Lab Fees Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Lab Fees
                    <div className="text-xs text-gray-500 mt-1">External lab charges for {monthlyVolume} retainers</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-red-25">
                    ${costs.outsourced.labFees.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">${currentLabFee} × {monthlyVolume}</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-yellow-25">
                    ${costs.diy.labFees.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">In-house production</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-green-25">
                    ${costs.noAdmin.labFees.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">In-house production</div>
                  </td>
                </tr>

                {/* Material Cost Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Material Costs
                    <div className="text-xs text-gray-500 mt-1">Resin + plastic for monthly batch</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-red-25">
                    ${costs.outsourced.materialCost.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">Included in lab fee</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-yellow-25">
                    ${costs.diy.materialCost.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">${PRICING.MATERIAL_COST_PER_UNIT} × {monthlyVolume} units</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-green-25">
                    ${costs.noAdmin.materialCost.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">${PRICING.MATERIAL_COST_PER_UNIT} × {monthlyVolume} units</div>
                  </td>
                </tr>

                {/* Software Fee Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Software & Automation
                    <div className="text-xs text-gray-500 mt-1">Monthly subscription for tools & support</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-red-25">
                    ${costs.outsourced.softwareFee.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">No software needed</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-yellow-25">
                    ${costs.diy.softwareFee.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">Basic slicing software</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-green-25">
                    ${costs.noAdmin.softwareFee.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">{PRICING.AUTOMATION_RETAINER_NAME}</div>
                  </td>
                </tr>

                {/* Admin Labor Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Admin Labor
                    <div className="text-xs text-gray-500 mt-1">File prep, slicing, queue management</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-red-25">
                    ${costs.outsourced.adminLabor.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">5 min/unit × {monthlyVolume} @ ${staffHourlyRate}/hr</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-yellow-25">
                    ${costs.diy.adminLabor.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">20 min/unit × {monthlyVolume} @ ${staffHourlyRate}/hr</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-green-700 bg-green-25">
                    ${costs.noAdmin.adminLabor.toLocaleString()}
                    <div className="text-xs text-green-600 mt-1 font-semibold">0 min - FULLY AUTOMATED</div>
                  </td>
                </tr>

                {/* Manufacturing Labor Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Manufacturing Labor
                    <div className="text-xs text-gray-500 mt-1">Print monitoring, post-processing</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-red-25">
                    ${costs.outsourced.mfgLabor.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">Handled by external lab</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-yellow-25">
                    ${costs.diy.mfgLabor.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">15 min/unit × {monthlyVolume} @ ${staffHourlyRate}/hr</div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-green-25">
                    ${costs.noAdmin.mfgLabor.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">10 min/unit × {monthlyVolume} @ ${staffHourlyRate}/hr</div>
                  </td>
                </tr>

                {/* Monthly Total Cost Row */}
                <tr className="bg-gray-50 font-bold text-lg border-t-2 border-gray-300">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    Monthly Total Cost
                    <div className="text-xs text-gray-600 mt-1 font-normal">All costs for {monthlyVolume} retainers</div>
                  </td>
                  <td className="px-6 py-4 text-center text-xl font-bold text-red-700">
                    ${costs.outsourced.monthlyCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-xl font-bold text-yellow-700">
                    ${costs.diy.monthlyCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-xl font-bold text-green-700">
                    ${costs.noAdmin.monthlyCost.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Setup Costs & Hidden Fees Section */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">One-Time Setup & Hidden Costs</h4>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="bg-red-100 p-4 rounded-lg">
                <h5 className="font-semibold text-red-700 mb-2">Outsourced Lab</h5>
                <div className="space-y-1">
                  <div>Setup Cost: <span className="font-semibold">${costs.outsourced.setupCost.toLocaleString()}</span></div>
                  <div>Hidden R&D: <span className="font-semibold">${costs.outsourced.hiddenRDCost.toLocaleString()}</span></div>
                </div>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h5 className="font-semibold text-yellow-700 mb-2">DIY In-House</h5>
                <div className="space-y-1">
                  <div>Hardware: <span className="font-semibold">${costs.diy.setupCost.toLocaleString()}</span></div>
                  <div className="text-red-600 font-bold">Research Time: ${costs.diy.hiddenRDCost.toLocaleString()}</div>
                  <div className="text-xs text-red-600">{PRICING.RESEARCH_HOURS_SAVED} hrs @ ${doctorHourlyRate}/hr</div>
                </div>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h5 className="font-semibold text-green-700 mb-2">"Zero-Admin" Lab Protocol</h5>
                <div className="space-y-1">
                  <div>Hardware: <span className="font-semibold">${costs.noAdmin.setupCost.toLocaleString()}</span></div>
                  <div>{PRICING.SERVICE_SETUP_NAME}: <span className="font-semibold">${costs.noAdmin.serviceCost.toLocaleString()}</span></div>
                  <div className="text-green-600 font-bold">Research Time: ${costs.noAdmin.hiddenRDCost.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line Results */}
        <div className="bg-[#FFBA4A] bg-opacity-20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">The Savings Bottom Line</h3>
          
          {/* Savings Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border-2 border-red-300">
              <h4 className="text-lg font-bold text-red-700 mb-4 text-center">DIY In-House</h4>
              <div className="space-y-3 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    ${monthlyDIYSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Savings vs. Outsourcing</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">
                    {diyPaybackPeriod.toFixed(1)} months*
                  </div>
                  <div className="text-sm text-gray-600">Payback Period (if completed)</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-600">
                    ${(monthlyDIYSavings * 12).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Annual Savings (if completed)</div>
                </div>
              </div>
              
              {/* Implementation Risk integrated */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-center mb-3">
                  <p className="text-red-800 font-semibold text-sm">
                    ⚠️ Implementation Risk
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    *Assumes successful completion
                  </p>
                </div>
                <div className="flex justify-around gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-red-700 mb-1">Common Failures:</p>
                    <ul className="text-red-600 space-y-0.5">
                      <li>• Equipment sits unused</li>
                      <li>• Staff training fails</li>
                      <li>• Project abandoned</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1">Sunk Cost Risk:</p>
                    <ul className="text-red-600 space-y-0.5">
                      <li>• ${(costs.diy.setupCost + costs.diy.hiddenRDCost).toLocaleString()} at risk</li>
                      <li>• Back to outsourcing</li>
                      <li>• "Closet decoration"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-green-200">
              <h4 className="text-lg font-bold text-green-700 mb-4 text-center">"Zero-Admin" Lab Protocol</h4>
              <div className="space-y-3 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${monthlyNoAdminSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Savings vs. Outsourcing</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {noAdminPaybackPeriod.toFixed(1)} months
                  </div>
                  <div className="text-sm text-gray-600">Guaranteed Payback Period</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    ${(monthlyNoAdminSavings * 12).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>
              </div>
              
              {/* Success Guarantee integrated */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-green-800 font-semibold text-sm mb-2">
                    ✅ Success Guarantee
                  </p>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• Custom Python automation</li>
                    <li>• No slicing, no data entry</li>
                    <li>• Deployed within 30 days</li>
                    <li>• <strong>We keep your lab up-to-date with the latest innovations</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Display */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border-2 border-green-200">
          <h3 className="text-xl font-bold mb-4 text-center text-green-800">These are your savings <strong className="underline">including</strong> the "Zero-Admin" Lab Protocol pricing!</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-700 mb-2">Monthly Retainer</h4>
              <div className="text-2xl font-bold text-green-800">${PRICING.AUTOMATION_RETAINER.toLocaleString()}/month</div>
              <div className="text-sm text-gray-600 mt-1">{PRICING.AUTOMATION_RETAINER_NAME}</div>
              <div className="text-xs text-gray-500 mt-2">Includes: Python automation, ongoing support, system updates</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-700 mb-2">One-Time Setup</h4>
              <div className="text-2xl font-bold text-green-800">${PRICING.SERVICE_SETUP.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">{PRICING.SERVICE_SETUP_NAME}</div>
              <div className="text-xs text-gray-500 mt-2">Includes: System installation, staff training, workflow optimization</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-100 rounded-lg text-center">
            <p className="text-green-800 font-semibold text-sm">
              💡 Hardware cost (${PRICING.HARDWARE_SETUP.toLocaleString()}) is separate - based on an audit of existing equipment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}