
"use client";
import { useState } from "react";
import styles from "../styles/ProjectModal.module.css";
import type { Project } from "@/types/Project";



interface RiskRegister {
  id: number;
  riskID?: string;
  riskName?: string;
  riskDescription?: string;
  dateCaptured?: string;
  riskOwner?: string;
  currentImpact?: number;
  currentLikelihood?: number;
  currentScore?: number;
  riskResponse?: string;
  operationalOrProjectRisk?: string;
}

interface LessonsLearned {
  id: number;
  topic?: string;
  experience?: string;
  impactRecurrence?: string;
  lessonsLearned?: string;
  bestPractice?: string;
  assignedTo?: string;
}

const MessageDisplay: React.FC<{ message: string; type: 'loading' | 'error' | 'info' }> = ({ message, type }) => (
  <div className={`p-4 rounded-lg text-center ${type === 'loading' ? 'bg-blue-100 text-blue-800' : type === 'error' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} shadow-sm`}>
    <p className="font-semibold">{message}</p>
  </div>
);

const RiskMatrixTable: React.FC = () => {
  const [risks] = useState<RiskRegister[]>([]);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  if (loading) {
    return <MessageDisplay message="Loading Risk Matrix..." type="loading" />;
  }

  if (error) {
    return <MessageDisplay message={error} type="error" />;
  }

  if (risks.length === 0) {
    return <MessageDisplay message="No risk data available." type="info" />;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-tl-lg">Risk ID</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Risk Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Description</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Owner</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Impact</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Likelihood</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-tr-lg">Score</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Response</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Type</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk) => (
            <tr key={risk.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-700">{risk.riskID || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{risk.riskName || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{risk.riskDescription || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{risk.riskOwner || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{risk.currentImpact ?? 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{risk.currentLikelihood ?? 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{risk.currentScore ?? 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{risk.riskResponse || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{risk.operationalOrProjectRisk || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LessonsLearnedTable: React.FC = () => {
  const [lessons] = useState<LessonsLearned[]>([]);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  if (loading) {
    return <MessageDisplay message="Loading Lessons Learned..." type="loading" />;
  }

  if (error) {
    return <MessageDisplay message={error} type="error" />;
  }

  if (lessons.length === 0) {
    return <MessageDisplay message="No lessons learned data available." type="info" />;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-tl-lg">Topic</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Experience</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Impact & Recurrence</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Lessons Learned</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Best Practice</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-tr-lg">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-700">{lesson.topic || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{lesson.experience || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{lesson.impactRecurrence || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{lesson.lessonsLearned || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{lesson.bestPractice || 'N/A'}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{lesson.assignedTo || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DeliverySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'risk' | 'lessons'>('risk');

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl font-sans max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Overview</h2>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 text-lg font-medium rounded-t-lg transition-all duration-200 ${
            activeTab === 'risk'
              ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('risk')}
        >
          Risk Matrix
        </button>
        <button
          className={`py-3 px-6 text-lg font-medium rounded-t-lg transition-all duration-200 ${
            activeTab === 'lessons'
              ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('lessons')}
        >
          Lessons Learned
        </button>
      </div>

      <div>
        {activeTab === 'risk' && <RiskMatrixTable />}
        {activeTab === 'lessons' && <LessonsLearnedTable />}
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200">
          Close
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
          Save Project
        </button>
        <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
          Edit Project
        </button>
      </div>
    </div>
  );
};

export default DeliverySection;
