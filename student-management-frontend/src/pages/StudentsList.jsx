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
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentService.getAllStudents(1, 100, search);
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
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

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
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Students Directory</h1>
          <p className="text-slate-500 mt-1">Manage all your enrolled students.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/students/add')}
          className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-primary-500/30 flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Student
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="p-4"><TableSkeleton rows={8} /></div>
          ) : students.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Users size={32} className="text-slate-400" />
              </div>
              <p className="text-lg font-medium text-slate-700">No students found</p>
              <p className="text-sm">Try adjusting your search or add a new student.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-sm font-medium sticky top-0">
                <tr>
                  <th className="px-6 py-4 border-b border-slate-100">Name</th>
                  <th className="px-6 py-4 border-b border-slate-100">Email</th>
                  <th className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 cursor-pointer hover:text-slate-700">
                    Course <ArrowUpDown size={14} />
                  </th>
                  <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={student.id} 
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 border-b border-slate-50">
                      <div className="font-medium text-slate-800">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-50 text-slate-500">{student.email}</td>
                    <td className="px-6 py-4 border-b border-slate-50">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200">
                        {student.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-50 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => navigate(`/students/edit/${student.id}`)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => setDeleteModal({ isOpen: true, id: student.id })}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
      />
    </div>
  );
};

export default StudentsList;
