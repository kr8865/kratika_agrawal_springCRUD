import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, ArrowUpDown, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { studentService } from '../services/studentService';
import Modal from '../components/Modal';
import { TableSkeleton } from '../components/SkeletonLoader';

const StudentsList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentService.getAllStudents(1, 100, search, sortBy);
      setStudents(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search, sortBy]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await studentService.deleteStudent(deleteModal.id);
      toast.success('Student deleted successfully');
      setDeleteModal({ isOpen: false, id: null });
      fetchStudents();
    } catch (error) {
      toast.error('Failed to delete student');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-500 mt-1">View, add, and manage student records in one place.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/students/add')}
          className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-3 text-white shadow-lg shadow-primary-500/20 transition hover:bg-primary-600"
        >
          <Plus size={20} />
          Add Student
        </motion.button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto] items-center bg-white rounded-[1.75rem] border border-slate-200 p-4 shadow-sm">
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            <ArrowUpDown size={16} /> Sorted by {sortBy}
          </span>
          <button
            onClick={() => setSortBy('name')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${sortBy === 'name' ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Name
          </button>
          <button
            onClick={() => setSortBy('course')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${sortBy === 'course' ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Course
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6"><TableSkeleton rows={8} /></div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <div className="mx-auto mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Users size={32} />
            </div>
            <p className="text-xl font-semibold text-slate-900">No students match your search</p>
            <p className="mt-2 text-sm">Try a different keyword or add a new student to get started.</p>
          </div>
        ) : (
          <div className="grid gap-4 p-6 lg:p-8">
            <div className="grid gap-4 lg:grid-cols-[1fr_250px] items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Showing</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{students.length} students currently active</h2>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
                Update or delete students instantly from the list below.
              </div>
            </div>

            <div className="space-y-4">
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-slate-900">{student.name}</p>
                    <p className="text-sm text-slate-500">{student.email}</p>
                    <p className="text-sm text-slate-500">Enrolled in <span className="font-medium text-slate-900">{student.course}</span></p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate(`/students/edit/${student.id}`)}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 transition hover:bg-primary-100"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: student.id })}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Student"
        message="Are you sure you want to remove this student? This cannot be undone."
      />
    </div>
  );
};

export default StudentsList;
