import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Hi There - Max',
    description: 'My story, and how I came to be an Entrepreneurial Full-Stack Engineer',
};

export default function GetToKnowMaximusPage() {
    return (
        <div className="min-h-screen bg-white">
            <header className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Link
                        href="/"
                        className="inline-block mb-6 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get to Know Maximus</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Velocity with Purpose.
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        I build tools that help people live happier, healthier, more fulfilling lives.
                    </p>
                </section>

                {/* Narrative Blocks */}
                <div className="space-y-16">
                    {/* Block 1: The Spark */}
                    <section className="prose prose-lg max-w-none py-3">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                            It wasn&apos;t just a puzzle. It was a realization.
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            At 10 years old, I taught myself to solve a Rubik&apos;s Cube. But the thrill wasn&apos;t in the plastic or the stickers—it was in the feeling of empowerment. It was proof that I could figure anything out if I tried hard enough. I wanted everyone to feel that sense of agency. I started &quot;Mechanical Max&quot; not to show off, but to lift others up and show them that they were capable of more than they thought.
                        </p>
                    </section>

                    {/* Block 2: The Lesson */}
                    <section className="prose prose-lg max-w-none py-3">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                            I stopped chasing titles and started chasing impact.
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            For years, I was stuck in the &quot;performance trap.&quot; I chased grades and elections, thinking external validation was the only path. But when I lost a major election, the system broke for me. It was a wake-up call. I realized that a résumé is not a legacy. True fulfillment comes from service. I stopped looking for permission to lead and started looking for problems to solve.
                        </p>
                    </section>

                    {/* Block 3: The Pivot */}
                    <section className="prose prose-lg max-w-none py-3">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                            Fluent in Hardware, Tactical in Software.
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Most developers fear hardware. Most mechanical engineers fear code. I live in the middle. My background isn&apos;t just theory; it&apos;s getting my hands dirty in R&D labs and writing Python scripts to automate physical machines. Whether it&apos;s IoT, 3D printing workflows, or Next.js web apps, I understand how to make the digital world talk to the physical one.
                        </p>
                    </section>

                    {/* Block 4: The Mission */}
                    <section className="prose prose-lg max-w-none py-3">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                            Velocity with Purpose.
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            I am not looking for a &quot;gig.&quot; I am looking for partners who want to use technology to create sustainable good. I balance the rigorous physics of engineering with the infinite scalability of software. My goal is simple: To build tools that help people live happier, healthier, more fulfilling lives.
                        </p>
                    </section>

                </div>
                
                <div className="text-center text-gray-700">
                    <p><br /><em>Keep Building.</em><br />- Maximus</p>
                </div>
            </main>
        </div>
    );
}
