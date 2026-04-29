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
    course: ''
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
            course: student.course
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
      const msg = error.response?.data?.data ? 
        Object.values(error.response.data.data)[0] : 
        error.response?.data?.message || 'Operation failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button 
        onClick={() => navigate('/students')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} /> Back to Students
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {isEditMode ? 'Edit Student Details' : 'Add New Student'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100/50 transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100/50 transition-all"
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Course Name</label>
            <div className="relative">
              <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100/50 transition-all"
                placeholder="e.g. Computer Science"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary-500/30 flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <Save size={20} />
              )}
              {isEditMode ? 'Update Student' : 'Save Student'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentForm;
