import Link from "next/link";
import DentalROICalculator from "./DentalROICalculator";
import ZeroAdminLabBooking from "./ZeroAdminLabBooking";
import { 
  ShieldCheckIcon, 
  ClipboardDocumentListIcon, 
  PlayCircleIcon, 
  LockClosedIcon 
} from "@heroicons/react/24/outline";

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
            <span className="text-[#FFBA4A]">Stop Paying the "Lab Tax"</span><br />
            Turn Retainers Into Profit—Without Hiring a Lab Tech
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto">
            The "Zero-Admin" Lab Protocol is the only in-house manufacturing workflow engineered by Purdue Systems Integrators to eliminate computer work for your staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#calculator"
              className="bg-[#FFBA4A] hover:bg-[#FFA726] text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
            >
              Calculate My Savings
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">THE PROBLEM</h2>
          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-16">
            You Have Two Bad Options. We Are the Third.
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Option 1: The Outsourcing Trap */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="text-xl font-bold text-red-700">The Outsourcing Trap</h4>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  You pay $50–$100 per retainer
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  You wait 2 weeks
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  You pay shipping
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  You have zero control
                </li>
              </ul>
              <div className="mt-6 p-4 bg-red-100 rounded-lg">
                <p className="text-red-800 font-semibold text-center">
                  You are bleeding ~$25,000 a year in "convenience fees" just to avoid a headache.
                </p>
              </div>
            </div>

            {/* Option 2: The DIY Nightmare */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="text-xl font-bold text-yellow-700">The DIY Nightmare</h4>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  You buy a 3D printer
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Your staff hates it because the software is confusing
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  The resin smells. The prints fail
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  You become the IT guy
                </li>
              </ul>
              <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
                <p className="text-yellow-800 font-semibold text-center">
                  The printer eventually sits in a closet gathering dust.
                </p>
              </div>
            </div>

            {/* Option 3: The "Zero-Admin" Lab Protocol */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#FFBA4A] text-gray-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="text-xl font-bold text-green-700">The "Zero-Admin" Lab Protocol</h4>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  You own the equipment
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  We own the headache
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  We install a medical-grade manufacturing line in your office
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Powered by custom automation code that removes the computer work entirely
                </li>
              </ul>
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-green-800 font-semibold text-center">
                  ✅ Professional results without the professional headaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mechanism Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            "I Don't Want My Staff Playing on Computers."
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            <strong>Neither do we.</strong> That's why we wrote the code to do it for them.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-16 text-center">
            <p className="text-lg text-blue-800 font-semibold">
              We act as your IT Operations Partner, not a medical device manufacturer.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1: You Prescribe */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-[#FFBA4A] text-gray-900 rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">You Prescribe</h4>
                  <p className="text-lg text-gray-500 font-medium italic">(Medical Control)</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Your staff scans the patient and tells us who to print. <strong>That is it.</strong> They walk away.
              </p>
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-5">
                <p className="text-green-800 font-medium">
                  <strong>Safety Check:</strong> You retain 100% of the clinical decision-making and prescription authority. 
                  You are the doctor; we are just moving the digital files.
                </p>
              </div>
            </div>

            {/* Step 2: We Automate */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-[#FFBA4A] text-gray-900 rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">We Automate</h4>
                  <p className="text-lg text-gray-500 font-medium italic">(The Physical-Digital Integration)</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our proprietary Python automation instantly wakes up. It identifies the patient, creates the 3D base, 
                adds the text label, orients the model for the printer, and generates the support structures.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-5">
                  <p className="text-blue-800 font-medium">
                    <strong>Zero Clicks:</strong> Your staff never opens slicing software. They never rename files. 
                    They never manage data.
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-5">
                  <p className="text-green-800 font-medium">
                    <strong>You Own Your Data:</strong> We integrate our system with your software, so you maintain 
                    complete visibility and control of your prints and cases at all times.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: You Print */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-[#FFBA4A] text-gray-900 rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">You Print</h4>
                  <p className="text-lg text-gray-500 font-medium italic">(Physical Production)</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                The printer is already queued. Your staff simply presses "Start." 45 minutes later, 
                you have a 15-micron accurate dental model ready for thermoforming.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Safety & Compliance Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8">Safety & Compliance</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-12 text-center">
            <p className="text-lg text-red-800 font-semibold">
              Most in-house labs fail because they turn a medical clinic into a chemical factory. 
              We install a Validated Safety Protocol that keeps your office pristine and your staff safe.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* The "Zero-Exposure" Workflow */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-blue-700 mb-2">The "Zero-Exposure" Workflow</h4>
                <p className="text-sm text-blue-600 font-medium italic">(Minimal Contact Protocol)</p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our SOPs are engineered to minimize staff contact with liquid resin. We train your team on 
                "No-Touch" transfer techniques using specific tools, not their hands.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium">
                  <strong>Safety First:</strong> Protective protocols that keep your team safe while maintaining efficiency.
                </p>
              </div>
            </div>

            {/* Material Handling Compliance */}
            <div className="bg-white border-2 border-green-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardDocumentListIcon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-green-700 mb-2">Material Handling Compliance</h4>
                <p className="text-sm text-green-600 font-medium italic">(Complete Documentation)</p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We provide the full "Safety Stack": SDS (Safety Data Sheets), hazardous waste disposal logs, 
                and ventilation guides.
              </p>
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <p className="text-sm text-green-800 font-medium">
                  <strong>Regulatory Ready:</strong> All documentation needed for compliance and inspections.
                </p>
              </div>
            </div>

            {/* Instructional Videos */}
            <div className="bg-white border-2 border-[#FFBA4A] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#FFBA4A] text-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayCircleIcon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Instructional Videos</h4>
                <p className="text-sm text-gray-600 font-medium italic">(Comprehensive Training)</p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We don't just leave a manual. We provide instructional videos tailored to your workflows 
                along with personal training and a help hotline.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
                <p className="text-sm text-yellow-800 font-medium">
                  <strong>Expert Training:</strong> We train your team on machine maintenance, resin safety, and the "5-Minute Polish." 
                  We empower your staff to feel like experts, not janitors.
                </p>
              </div>
            </div>
      
            {/* Data Security */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <LockClosedIcon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Data Governance</h4>
                <p className="text-sm text-gray-600 font-medium italic">(On-Premises Security)</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                  You keep all your data on-premises, and we use secure connections to run the automation code 
                  on your machines in your local network.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
                  <p className="text-sm text-blue-800 font-medium">
                    <strong>Legal Disclaimer:</strong> We operate as a Class I Medical Device Data System (MDDS) support provider. 
                    We provide IT connectivity and file transfer automation only. All medical device manufacturing and 
                    clinical decisions remain the sole responsibility of the prescribing practitioner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process - From Audit to Autonomy in 30 Days */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">From Audit to Autonomy in 30 Days</h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Our proven 3-step implementation process gets you from consultation to production in one month.
          </p>
          
          <div className="space-y-12">
            {/* Step 1: The Workflow Audit */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">The Workflow Audit</h4>
                  <p className="text-lg text-gray-500 font-medium italic">(Site Assessment & Custom Design)</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We visit your practice to map your current software (iTero, Medit, etc.) and physical space. 
                We measure your ventilation and counter space to design a custom "Clean Lab" layout.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-5">
                <p className="text-blue-800 font-medium">
                  <strong>Custom Integration:</strong> Every practice is different. We design your system to work 
                  seamlessly with your existing workflow and space constraints.
                </p>
              </div>
            </div>

            {/* Step 2: The "White Glove" Integration */}
            <div className="bg-white border-2 border-green-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">The "White Glove" Integration</h4>
                  <p className="text-lg text-gray-500 font-medium italic">(Complete System Installation)</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We procure and install the hardware. We write custom Python scripts to bridge your scanner to your printer. 
                We set up everything on your local network (secure, HIPAA-compliant, no cloud uploads).
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-5">
                  <p className="text-green-800 font-medium">
                    <strong>Zero Downtime:</strong> We handle all procurement, installation, and testing. 
                    Your practice continues operating normally during setup.
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-5">
                  <p className="text-blue-800 font-medium">
                    <strong>HIPAA Compliant:</strong> All data stays on your local network. No cloud uploads, 
                    no external data sharing.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Staff University */}
            <div className="bg-white border-2 border-[#FFBA4A] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-[#FFBA4A] text-gray-900 rounded-full flex items-center justify-center text-2xl font-bold mr-6 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">Staff University</h4>
                  <p className="text-lg text-gray-500 font-medium italic">(Comprehensive Training & Support)</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We train your team using our proprietary video curriculum and on-site training. 
                We hand you the "Compliance Binder," which includes all safety logs and marketing materials 
                to sell "Same-Day Retainers" to patients.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-5">
                <p className="text-yellow-800 font-medium">
                  <strong>Complete Package:</strong> Training videos, compliance documentation, and patient marketing materials. 
                  Your staff becomes confident experts, not confused operators.
                </p>
              </div>
            </div>
          </div>

          {/* Alternative Option */}
          <div className="mt-16 bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Prefer Full Independence?
            </h3>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Not interested in a long-term automation partner? <strong>No problem.</strong> We offer an additional 
                training service for your staff when you feel ready to complete the design and 3D printing manufacturing 
                workflows in-house.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-800 font-semibold">
                  We take your design headache out of the equation by designing the system that matches your business goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <DentalROICalculator />

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
                <div className="text-blue-600">~$800 per aligner kit</div>
                <div className="text-blue-600">1 week turnaround</div>
              </div>
              <div className="bg-[#FFBA4A] bg-opacity-20 p-4 rounded-lg">
                <div className="font-bold text-gray-700">After</div>
                <div className="text-gray-600">~$200 per aligner kit</div>
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

      {/* Final CTA - Book Your Zero-Admin Lab Audit */}
      <section className="py-20 bg-gradient-to-br from-[#FFBA4A] to-orange-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Stop Paying the Lab Tax?
            </h2>
            <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
              Book your <strong>Zero-Admin Lab Readiness Call</strong> and discover exactly how much you could save 
              with our proven automation system.
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg text-gray-900 font-semibold">
                ✅ Free 30-minute consultation<br />
                ✅ Custom ROI analysis for your practice<br />
                ✅ No-obligation assessment
              </p>
            </div>
          </div>
          
          {/* Cal.com Booking Embed */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Schedule Your Zero-Admin Lab Readiness Call
              </h3>
              <p className="text-gray-600">
                Choose a time that works for you. We'll analyze your current workflow and recommend options that best suit your goals.
              </p>
            </div>
            
            <div className="min-h-[600px] rounded-lg overflow-hidden border border-gray-200">
              <ZeroAdminLabBooking />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}