"use client";

import { useEffect } from "react";

export default function DentalROICalculator() {
  useEffect(() => {
    const calculateSavings = () => {
      const retainersPerMonth = parseFloat((document.getElementById('retainers-per-month') as HTMLInputElement)?.value || '0');
      const costPerRetainer = parseFloat((document.getElementById('cost-per-retainer') as HTMLInputElement)?.value || '0');
      
      const monthlyCost = retainersPerMonth * costPerRetainer;
      const monthlyInHouse = retainersPerMonth * 200; // $200 per retainer in-house
      const monthlySavings = monthlyCost - monthlyInHouse;
      const annualSavings = monthlySavings * 12;
      
      const monthlyCostEl = document.getElementById('monthly-cost');
      const monthlySavingsEl = document.getElementById('monthly-savings');
      const totalSavingsEl = document.getElementById('total-savings');
      const annualSavingsEl = document.getElementById('annual-savings');
      
      if (monthlyCostEl) monthlyCostEl.textContent = `$${monthlyCost.toLocaleString()}`;
      if (monthlySavingsEl) monthlySavingsEl.textContent = `$${monthlyInHouse.toLocaleString()}`;
      if (totalSavingsEl) totalSavingsEl.textContent = `$${monthlySavings.toLocaleString()}`;
      if (annualSavingsEl) annualSavingsEl.textContent = `$${annualSavings.toLocaleString()}`;
    };

    const retainersInput = document.getElementById('retainers-per-month');
    const costInput = document.getElementById('cost-per-retainer');
    
    retainersInput?.addEventListener('input', calculateSavings);
    costInput?.addEventListener('input', calculateSavings);
    
    return () => {
      retainersInput?.removeEventListener('input', calculateSavings);
      costInput?.removeEventListener('input', calculateSavings);
    };
  }, []);

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Calculate Your Lab Tax
        </h2>
        
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Current Outsourcing Costs</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retainers per month
                  </label>
                  <input 
                    type="number" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBA4A] focus:border-transparent"
                    placeholder="e.g., 40"
                    id="retainers-per-month"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost per retainer (outsourced)
                  </label>
                  <input 
                    type="number" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFBA4A] focus:border-transparent"
                    placeholder="e.g., 800"
                    id="cost-per-retainer"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Your Potential Savings</h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monthly outsourcing cost:</span>
                    <span className="font-bold text-red-600" id="monthly-cost">$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly in-house cost:</span>
                    <span className="font-bold text-green-600" id="monthly-savings">$0</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg">
                    <span>Monthly savings:</span>
                    <span className="font-bold text-[#FFBA4A]" id="total-savings">$0</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Annual savings:</span>
                    <span className="font-bold text-[#FFBA4A]" id="annual-savings">$0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}