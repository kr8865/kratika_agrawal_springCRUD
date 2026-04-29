import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 sm:mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4">edutrack</h3>
            <p className="text-sm text-slate-400">
              Smart student management for modern institutions.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Dashboard</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@edutrack.com</li>
              <li>Phone: +1 555 123 4567</li>
              <li>Location: San Francisco, CA</li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Follow
            </h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-white">GitHub</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </div>
          </motion.div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 edutrack. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;