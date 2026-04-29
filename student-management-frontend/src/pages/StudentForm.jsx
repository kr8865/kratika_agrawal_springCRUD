import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, User, Mail, Book } from 'lucide-react';
import toast from 'react-hot-toast';
import { studentService } from '../services/studentService';

const StudentForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const response = await studentService.getStudentById(id);
          const student = response.data;
          setFormData({
            name: student.name,
            email: student.email,
            course: student.course,
          });
        } catch (error) {
          toast.error('Failed to fetch student details');
          navigate('/students');
        }
      };
      fetchStudent();
    }
  }, [id, navigate, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await studentService.updateStudent(id, formData);
        toast.success('Student updated successfully');
      } else {
        await studentService.addStudent(formData);
        toast.success('Student added successfully');
      }
      navigate('/students');
    } catch (error) {
      const msg = error.response?.data?.data
        ? Object.values(error.response.data.data)[0]
        : error.response?.data?.message || 'Operation failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('/students')}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} /> Back to Students
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl"
      >
        <div className="bg-gradient-to-r from-primary-500 to-teal-400 px-8 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-bold">{isEditMode ? 'Edit student details' : 'Add a new student'}</h2>
          <p className="mt-3 max-w-2xl text-slate-100/90">
            Complete the form below to keep your student records accurate, up to date, and easy to manage.
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full name</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
              <div className="relative">
                <Book className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Tip</p>
              <p className="mt-2">Use a valid email address for each student so duplicate checks work correctly.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <button
                type="button"
                onClick={() => navigate('/students')}
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition hover:bg-primary-600 disabled:opacity-70"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                ) : (
                  <Save size={18} />
                )}
                {isEditMode ? 'Update student' : 'Save student'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentForm;
