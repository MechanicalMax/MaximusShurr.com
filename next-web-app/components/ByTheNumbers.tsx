'use client';

import { useState, useEffect } from 'react';
import { CaseStudy } from '@/lib/types';

interface Props {
  caseStudies: CaseStudy[];
}

interface Metric {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
  icon: string;
}

// Custom hook for count-up animation
function useCountUp(end: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimer);
    }

    if (hasStarted && end > 0) {
      const increment = end / (duration / 16); // 60fps
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= end) {
            clearInterval(timer);
            return end;
          }
          return next;
        });
      }, 16);

      return () => clearInterval(timer);
    }
  }, [end, duration, delay, hasStarted]);

  return Math.floor(count);
}

// Animated metric component
function AnimatedMetric({ metric, delay }: { metric: Metric; delay: number }) {
  const animatedValue = useCountUp(metric.numericValue, 2000, delay);
  
  return (
    <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      <div className="text-3xl mb-3">{metric.icon}</div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {animatedValue}{metric.suffix}
      </div>
      <div className="text-sm font-semibold text-gray-700 mb-1">{metric.label}</div>
      <div className="text-xs text-gray-500">{metric.description}</div>
    </div>
  );
}

export default function ByTheNumbers({ caseStudies }: Props) {
  // Calculate metrics from case studies
  const calculateMetrics = (): Metric[] => {
    const totalProjects = caseStudies.length;
    
    // Count unique technologies
    const allTechnologies = new Set();
    caseStudies.forEach(cs => {
      cs.frontmatter.tech_stack.forEach(tech => allTechnologies.add(tech));
    });
    
    // Count unique industries/project types
    const industries = new Set();
    caseStudies.forEach(cs => {
      industries.add(cs.frontmatter.project_type);
    });
    
    // Calculate total project duration in months (approximate)
    const totalDurationMonths = caseStudies.reduce((total, cs) => {
      const parseDate = (dateStr: string): Date => new Date(dateStr);
      const startDate = parseDate(cs.frontmatter.start_date);
      const endDate = cs.frontmatter.end_date ? parseDate(cs.frontmatter.end_date) : new Date();
      
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      return total + diffMonths;
    }, 0);
    
    const experienceYears = Math.round(totalDurationMonths / 12);
    
    return [
      {
        label: 'Total Projects',
        value: totalProjects.toString(),
        numericValue: totalProjects,
        suffix: '',
        description: 'Completed and ongoing projects',
        icon: '🚀'
      },
      {
        label: 'Technologies',
        value: allTechnologies.size.toString(),
        numericValue: allTechnologies.size,
        suffix: '',
        description: 'Different tools and frameworks used',
        icon: '⚡'
      },
      {
        label: 'Industries',
        value: industries.size.toString(),
        numericValue: industries.size,
        suffix: '',
        description: 'Diverse sectors and domains',
        icon: '🏢'
      },
      {
        label: 'Experience',
        value: `${experienceYears}+ years`,
        numericValue: experienceYears,
        suffix: '+ years',
        description: 'Combined project experience',
        icon: '📈'
      }
    ];
  };

  const metrics = calculateMetrics();

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">By The Numbers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proven track record of delivering innovative solutions across multiple industries and technologies.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <AnimatedMetric 
              key={metric.label}
              metric={metric}
              delay={index * 200} // Stagger the animations
            />
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">●</span>
              <span>Reliable Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">●</span>
              <span>Cross-Platform Expertise</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">●</span>
              <span>Innovation Focus</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">●</span>
              <span>Industry Versatility</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}