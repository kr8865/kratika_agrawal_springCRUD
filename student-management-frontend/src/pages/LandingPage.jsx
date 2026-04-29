import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Sparkles, Users } from 'lucide-react';
import { studentService } from '../services/studentService';
import heroImage from '../assets/hero.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 0 });
  const [latestStudents, setLatestStudents] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await studentService.getAllStudents(1, 1000);
        const students = response.data || [];
        const uniqueCourses = new Set(students.map((student) => student.course)).size;

        setStats({
          totalStudents: students.length,
          totalCourses: uniqueCourses,
        });
        setLatestStudents(students.slice(0, 4));
      } catch (error) {
        console.error('Unable to load landing page stats', error);
      }
    };
    fetchStats();
  }, []);

  const features = [
    {
      title: 'Fast student management',
      description: 'Add, update, delete and view student profiles with confidence and clarity.',
      icon: CheckCircle2,
    },
    {
      title: 'Smart search & sort',
      description: 'Find students instantly using search and keep your directory organized.',
      icon: BookOpen,
    },
    {
      title: 'Built for teams',
      description: 'A polished interface made for administrators, tutors, and student services.',
      icon: Users,
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-100/50 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-primary-50/50 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <section className="grid gap-8 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Manage students effortlessly.
          </h1>
          <p className="text-slate-600 text-lg max-w-xl">
            Simple, fast, and intuitive student management. Add, update, and organize records in seconds.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 pt-4"
          >
            <button
              onClick={() => navigate('/students')}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/20 transition hover:bg-primary-600"
            >
              Get started
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
        >
          <img
            src={heroImage}
            alt="Student management dashboard"
            className="w-full h-[400px] object-cover"
          />
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4 sm:grid-cols-2 mt-12"
      >
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Total students</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totalStudents}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Active courses</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totalCourses}</p>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
