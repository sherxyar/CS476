import {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
  KeyboardEvent,
  useCallback,
  useMemo,
} from "react";

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


const useUID = (() => {
  let uid = 0;
  return () => useMemo(() => `uid-${++uid}`, []);
})();

const INITIAL_FORM: ProjectForm = {
  title: "",
  projectManagerId: "",          
  description: "",
  forecast: "",
  actuals: "0.00",
  budget: "",
  startDate: "",
  endDate: "",
};

export default function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
}: CreateProjectModalProps) {

  const [form, setForm] = useState<ProjectForm>(INITIAL_FORM);
  const headingId = useUID();
  const firstInputRef = useRef<HTMLInputElement>(null);

  type ManagerLite = { id: number; name: string; email: string };
  const [managers, setManagers] = useState<ManagerLite[]>([]);
  const [mgrLoading, setMgrLoading] = useState(true);
  const [mgrErr, setMgrErr] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const res = await fetch("/api/users?managersOnly=true&limit=50");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ManagerLite[] = await res.json();
        if (!ignore) setManagers(data);
      } catch (err) {
        console.error(err);
        if (!ignore) setMgrErr("Couldn't load users");
      } finally {
        if (!ignore) setMgrLoading(false);
      }
    };
    load();
    return () => { ignore = true; };
  }, []);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Always store as string - this ensures trim() will work in the parent
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onCreate(form);
      onClose();
      // reset
      setForm(INITIAL_FORM);
    },
    [form, onCreate, onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <div className="modal">
        <h2 id={headingId} className="heading">
          Create New Project
        </h2>
        <form onSubmit={handleSubmit} className="form" noValidate>
          {/* Title  */}
          <label className="field">
            <span>Project Title </span>
            <input
              ref={firstInputRef}
              name="title"
              placeholder="Sask General Hospital Renovation"
              value={form.title}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </label>

          <label className="field">
            <span>Project Manager</span>

            {mgrLoading ? (
              <div className="spinner-sm" />
            ) : mgrErr ? (
              <p className="error">{mgrErr}</p>
            ) : (
              <select
                name="projectManagerId"
                value={form.projectManagerId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a manager…
                </option>
                {managers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            )}
          </label>

          {/* Description  */}
          <label className="field">
            <span>Project Description </span>
            <textarea
              name="description"
              placeholder="Brief project overview..."
              value={form.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </label>

          {/* Financials  */}
          <div className="grid">
            <label className="field">
              <span>Forecast </span>
              <input
                name="forecast"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.forecast}
                onChange={handleChange}
                required
                inputMode="decimal"
              />
            </label>

            <label className="field">
              <span>Budget </span>
              <input
                name="budget"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.budget}
                onChange={handleChange}
                required
                inputMode="decimal"
              />
            </label>
          </div>

          {/* Dates  */}
          <div className="grid">
            <label className="field">
              <span>Start Date </span>
              <input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>
            <label className="field">
              <span>End Date </span>
              <input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>
          </div>

          {/* Buttons  */}
          <div className="actions">
            <button type="submit" className="btn primary">
              Create Project
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        /* Backdrop */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0 0 0 / 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .modal {
          background: #fff;
          color: #111827;
          width: 90%;
          max-width: 500px;
          padding: 2rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0 0 0 / 0.1);
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .heading {
          margin-bottom: 1.5rem;
          font-size: 1.375rem;
          font-weight: 600;
          text-align: center;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }

        /* Field wrapper */
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.875rem;
        }

        .field > span {
          font-weight: 500;
        }

        input,
        textarea,
        select {
          padding: 0.55rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.95rem;
        }

        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }

        /* Buttons */
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .btn {
          padding: 0.5rem 1.25rem;
          border-radius: 6px;
          font-weight: 500;
          border: 1px solid transparent;
          cursor: pointer;
          transition: background 0.15s;
          background: #f3f4f6;
        }

        .btn:hover {
          background: #e5e7eb;
        }

        .btn.primary {
          background: #2563eb;
          color: #fff;
        }

        .btn.primary:hover {
          background: #1e4fd6;
        }
      `}</style>
    </div>
  );
}
