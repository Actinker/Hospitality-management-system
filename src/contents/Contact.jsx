import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-8 text-center text-indigo-800"
            >
                Contact Us
            </motion.h1>
            
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                    <motion.h2 
                        variants={fadeIn} 
                        className="text-2xl font-semibold mb-4 text-indigo-700"
                    >
                        Get in Touch
                    </motion.h2>
                    
                    <motion.p variants={fadeIn} className="mb-6 text-gray-700">
                        If you have any questions or would like to make a reservation, 
                        feel free to reach out to us. Our team is available 24/7 to assist you.
                    </motion.p>
                    
                    <motion.div variants={fadeIn} className="mb-6 flex items-start">
                        <div className="mr-3 bg-indigo-100 p-3 rounded-full">
                            <FaEnvelope className="text-indigo-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">Email</h3>
                            <a 
                                href="mailto:u2203012@rajagiri.edu.in" 
                                className="text-indigo-600 hover:text-indigo-800 transition-colors block mb-2 flex items-center"
                            >
                                u2203012@rajagiri.edu.in
                            </a>
                        </div>
                    </motion.div>
                    
                    <motion.div variants={fadeIn} className="flex items-start">
                        <div className="mr-3 bg-indigo-100 p-3 rounded-full">
                            <FaPhoneAlt className="text-indigo-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">Phone</h3>
                            <p className="text-indigo-600 mb-2">+91 0123456789</p>
                        </div>
                    </motion.div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-indigo-50 p-6 rounded-lg shadow-md"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Send a Message</h2>
                    
                    <form className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                id="name" 
                                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Your name" 
                            />
                        </div>
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input 
                                type="email" 
                                id="email" 
                                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Your email" 
                            />
                        </div>
                        
                        <div>
                            <textarea 
                                id="message" 
                                rows="4" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Your message"
                            ></textarea>
                        </div>
                        
                        <motion.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
                        >
                            <FaPaperPlane className="mr-2" />
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 bg-white p-6 rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-indigo-600 mr-2" />
                    Our Location
                </h2>
                <div className="h-64 bg-gray-200 rounded-lg mb-4">
                    {/* Placeholder for Google Map */}
                    <div className="h-full flex items-center justify-center text-gray-500">
                        <FaMapMarkerAlt className="text-indigo-500 text-3xl mr-2" />
                        <span>Map will be displayed here</span>
                    </div>
                </div>
                <div className="text-center text-gray-700 flex items-center justify-center">
                    <div className="mr-3 bg-indigo-100 p-2 rounded-full">
                        <FaMapMarkerAlt className="text-indigo-600" />
                    </div>
                    <p>
                        RSET CSA 2022-2026<br />
                        Kakkanad, Kochi<br />
                        Kerala, India
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;