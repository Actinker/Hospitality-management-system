// src/contents/About.jsx
import { motion } from 'framer-motion';
import { FaBed, FaUtensils, FaConciergeBell } from 'react-icons/fa';

const About = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-10 text-center text-indigo-800"
            >
                Continental Suites
            </motion.h1>
            
            <motion.div 
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.2 }}
                className="mb-12"
            >
                <motion.h2 
                    variants={fadeIn}
                    className="text-2xl font-semibold mb-6 text-center text-indigo-700 border-b-2 border-indigo-200 pb-2"
                >
                    Our Amenities
                </motion.h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div 
                        variants={fadeIn}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    >
                        <div className="flex justify-center mb-4">
                            <FaBed className="text-indigo-600 text-5xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Luxurious Rooms</h3>
                        <p className="text-gray-700 text-center">Experience unparalleled comfort in our well-appointed rooms designed to meet all your needs.</p>
                    </motion.div>
                    
                    <motion.div 
                        variants={fadeIn}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    >
                        <div className="flex justify-center mb-4">
                            <FaUtensils className="text-indigo-600 text-5xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Fine Dining</h3>
                        <p className="text-gray-700 text-center">Savor exquisite dishes prepared by our world-class chefs in a sophisticated setting.</p>
                    </motion.div>
                    
                    <motion.div 
                        variants={fadeIn}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    >
                        <div className="flex justify-center mb-4">
                            <FaConciergeBell className="text-indigo-600 text-5xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Exceptional Service</h3>
                        <p className="text-gray-700 text-center">Our dedicated staff ensures that your stay is comfortable and memorable.</p>
                    </motion.div>
                </div>
            </motion.div>
            
            <motion.footer 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-indigo-50 p-6 rounded-lg shadow-md border border-indigo-100"
            >
                <p className="text-center mb-4 text-gray-700 font-medium">This is a project and special thanks to:</p>
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {["Aswin Asokan", "Albin Binu", "Abin A C", "Augustin Vincent"].map((name, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white px-4 py-2 rounded-full shadow-sm text-indigo-700"
                        >
                            {name}
                        </motion.div>
                    ))}
                </div>
                <p className="text-center mt-4 text-gray-600 italic">for helping to create this.</p>
            </motion.footer>
        </div>
    );
};

export default About;