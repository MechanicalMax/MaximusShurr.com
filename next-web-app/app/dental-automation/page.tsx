import Image from "next/image";
import Link from "next/link";
import BookingCTA from "@/components/BookingCTA";
import DentalROICalculator from "./DentalROICalculator";

export const metadata = {
  title: "Dental Lab Automation - Stop Paying the Lab Tax | Maximus Shurr",
  description: "The only in-house manufacturing protocol engineered by Purdue Systems Integrators to eliminate computer work for your dental staff. 75% cost reduction proven at Hughes Orthodontics.",
};

export default function DentalAutomationPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-[#FFBA4A]">Stop Paying the "Lab Tax."</span><br />
            Start the "Zero-Admin" Retainer Factory.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto">
            The only in-house manufacturing protocol engineered by Purdue Systems Integrators to eliminate computer work for your staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#calculator"
              className="bg-[#FFBA4A] hover:bg-[#FFA726] text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
            >
              Audit My Lab Costs
            </a>
          </div>
        </div>
      </section>

      {/* The Mechanism Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Your Current Process is <span className="text-red-500">Bleeding Money</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Old Way */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">
                The DIY Way (9 Steps of Friction)
              </h3>
              <div className="space-y-4">
                {[
                  "Export STL",
                  "Rename File", 
                  "Open Slicer",
                  "Import",
                  "Orient",
                  "Support",
                  "Slice",
                  "Upload",
                  "Print"
                ].map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                    {index < 8 && <span className="ml-auto text-red-500">→</span>}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-red-100 rounded-lg">
                <p className="text-red-700 font-semibold">Result: 2-3 hours per batch</p>
                <p className="text-red-600">Staff burnout from repetitive clicking</p>
              </div>
            </div>

            {/* The Hughes Protocol */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
                The Hughes Protocol (1 Step)
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    1
                  </div>
                  <span className="text-gray-700">New Scan</span>
                  <span className="ml-auto text-green-500">→</span>
                </div>
                
                <div className="bg-[#FFBA4A] rounded-lg p-4 mx-8">
                  <p className="text-center font-bold text-gray-900">
                    [Your Python Script]
                  </p>
                  <p className="text-center text-sm text-gray-700 mt-1">
                    Automated Processing
                  </p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    2
                  </div>
                  <span className="text-gray-700">Print</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-green-700 font-semibold">Result: 30 minutes per batch</p>
                <p className="text-green-600">Staff focuses on patients, not computers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <h2 className="text-3xl font-bold mb-8">
              Deployed at Hughes Orthodontics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFBA4A] mb-2">5 Years</div>
                <div className="text-gray-600">of Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFBA4A] mb-2">75%</div>
                <div className="text-gray-600">Cost Reduction</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-blue-700">Before</div>
                <div className="text-blue-600">~$800 per retainer</div>
                <div className="text-blue-600">1 week turnaround</div>
              </div>
              <div className="bg-[#FFBA4A] bg-opacity-20 p-4 rounded-lg">
                <div className="font-bold text-gray-700">After</div>
                <div className="text-gray-600">~$200 per retainer</div>
                <div className="text-gray-600">24 hour turnaround</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-bold text-green-700">Result</div>
                <div className="text-green-600">10-20 retainers/week</div>
                <div className="text-green-600">Minimal oversight</div>
              </div>
            </div>
            
            <Link 
              href="/case-study/hughes-orthodontics-automation"
              className="inline-flex items-center bg-[#FFBA4A] hover:bg-[#FFA726] text-gray-900 font-semibold py-3 px-6 rounded-full transition duration-200"
            >
              Read the Full Case Study
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <DentalROICalculator />

      {/* Final CTA */}
      <BookingCTA />
    </div>
  );
}