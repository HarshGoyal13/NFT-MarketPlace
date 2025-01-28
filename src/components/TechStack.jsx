import React from 'react';
import { FaReact, FaEthereum } from 'react-icons/fa';
import { DiJavascript } from 'react-icons/di';
import {   SiSolidity,SiIpfs } from 'react-icons/si';


const TechStack = () => {
  const techStack = [
    { name: 'React', icon: <FaReact size={48} />, color: 'bg-blue-600' },
    { name: 'Ethereum', icon: <FaEthereum size={48} />, color: 'bg-blue-500' },
    { name: 'JavaScript', icon: <DiJavascript size={48} />, color: 'bg-yellow-500' },
    { name: 'Solidity', icon: <SiSolidity  size={48} />, color: 'bg-indigo-500' },
    { name: 'IPFS', icon: <SiIpfs  size={48} />, color: 'bg-indigo-500' },
  ];

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-purple-500 mb-8">Our Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-7">
          {techStack.map((tech, index) => (
            <div key={index} className="flex flex-col justify-center items-center p-6 rounded-xl shadow-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300">
              <div className={`w-16 h-16 flex justify-center items-center rounded-full ${tech.color} mb-4`}>
                {tech.icon}
              </div>
              <h3 className="text-xl text-white">{tech.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
