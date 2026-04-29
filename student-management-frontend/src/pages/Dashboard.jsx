import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';
import { studentService } from '../services/studentService';
import { CardSkeleton } from '../components/SkeletonLoader';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await studentService.getAllStudents(1, 1000);
        const students = response.data || [];
        const uniqueCourses = new Set(students.map(s => s.course)).size;
        
        setStats({
          totalStudents: students.length,
          totalCourses: uniqueCourses
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-500' },
    { title: 'Active Courses', value: stats.totalCourses, icon: BookOpen, color: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-500' },
    { title: 'Completion Rate', value: '94%', icon: TrendingUp, color: 'bg-green-500', light: 'bg-green-50', text: 'text-green-500' },
    { title: 'Certificates Issued', value: '1,240', icon: Award, color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, here is what's happening today.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {loading ? (
          <>
            <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
          </>
        ) : (
          cards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group cursor-pointer"
            >
              <h3 className="text-slate-500 font-medium text-sm">{card.title}</h3>
              <div className="flex justify-between items-end mt-4">
                <span className="text-4xl font-bold text-slate-800 tracking-tight">{card.value}</span>
                <div className={`p-3 rounded-xl ${card.light} transition-colors group-hover:${card.color}`}>
                  <card.icon size={24} className={`${card.text} group-hover:text-white transition-colors`} />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
