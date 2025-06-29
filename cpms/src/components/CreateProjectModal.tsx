"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface ProjectForm {
  title: string;
  projectManagerId: string;     
  description: string;
  forecast: string;
  actuals: string;
  budget: string;
  startDate: string;
  endDate: string;
}

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (draft: ProjectForm) => void;  
}

export default function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [form, setForm] = useState<ProjectForm>({
    title: "",
    projectManagerId: "1",      // default to user #1 while testing
    description: "",
    forecast: "",
    actuals: "",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreate(form);          
    onClose();
    setForm({
      title: "",
      projectManagerId: "1",
      description: "",
      forecast: "",
      actuals: "",
      budget: "",
      startDate: "",
      endDate: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            required
          />


          <input
            name="projectManagerId"
            type="number"
            placeholder="Manager User ID"
            value={form.projectManagerId}
            onChange={handleChange}
            min="1"
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="forecast"
            type="number"
            placeholder="Total Project Forecast"
            value={form.forecast}
            onChange={handleChange}
            required
          />
          <input
            name="actuals"
            type="number"
            placeholder="Total Project Actuals to Date"
            value={form.actuals}
            onChange={handleChange}
            required
          />
          <input
            name="budget"
            type="number"
            placeholder="Total Project Budget"
            value={form.budget}
            onChange={handleChange}
            required
          />
          <input
            name="startDate"
            type="date"
            placeholder="Planned Start Date"
            value={form.startDate}
            onChange={handleChange}
            required
          />
          <input
            name="endDate"
            type="date"
            placeholder="Planned End Date"
            value={form.endDate}
            onChange={handleChange}
            required
          />

          <button type="submit">Create Project</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>

      {/* --- quick CSS-in-JS for the demo --- */}
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          min-width: 320px;
        }
        input,
        textarea {
          display: block;
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.5rem;
        }
        button {
          margin-right: 1rem;
        }
      `}</style>
    </div>
  );
}
