import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiUserPlus, FiArrowRight, FiCheckCircle, FiClock, FiX } from 'react-icons/fi';
import { courses as defaultCourses } from '../../data/courses';

const ManageStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex@company.com', courses: ['Python Bootcamp'], status: 'Active' },
    { id: 2, name: 'Sarah Williams', email: 'sarah@company.com', courses: ['UI/UX Design'], status: 'Active' },
    { id: 3, name: 'David Chen', email: 'david@company.com', courses: [], status: 'Inactive' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', course: '' });

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [licenses, setLicenses] = useState({});
  const [errorHeader, setErrorHeader] = useState('');

  useEffect(() => {
     const savedCourses = JSON.parse(localStorage.getItem('courses'));
     setAvailableCourses(savedCourses || defaultCourses);
     
     const savedLicenses = JSON.parse(localStorage.getItem('companyLicenses')) || {};
     setLicenses(savedLicenses);
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    
    let updatedLicenses = { ...licenses };
    let finalCourses = [];

    if (newStudent.course) {
      // Find course license
      const courseId = availableCourses.find(c => c.title === newStudent.course)?.id;
      const license = updatedLicenses[courseId];

      if (!license || license.used >= license.count) {
        setErrorHeader(`You don't have enough licenses for "${newStudent.course}". Please buy more first.`);
        setTimeout(() => setErrorHeader(''), 3000);
        return;
      }

      // Increment used seats
      updatedLicenses[courseId].used = (updatedLicenses[courseId].used || 0) + 1;
      finalCourses = [{ 
        title: newStudent.course, 
        progress: 0, 
        enrolledDate: new Date().toLocaleDateString() 
      }];
    }

    const student = {
      id: Date.now(),
      name: newStudent.name,
      email: newStudent.email,
      courses: finalCourses,
      status: 'Active'
    };

    setStudents([student, ...students]);
    setLicenses(updatedLicenses);
    localStorage.setItem('companyLicenses', JSON.stringify(updatedLicenses));
    
    setIsModalOpen(false);
    setNewStudent({ name: '', email: '', course: '' });
  };

  const handleAssignCourse = (e) => {
    e.preventDefault();
    if (!selectedStudent || !newStudent.course) return;

    // Check license
    const courseId = availableCourses.find(c => c.title === newStudent.course)?.id;
    const license = licenses[courseId];

    if (!license || license.used >= license.count) {
      setErrorHeader(`No seats available for "${newStudent.course}".`);
      setTimeout(() => setErrorHeader(''), 3000);
      return;
    }

    setStudents(students.map(s => {
      if (s.id === selectedStudent.id) {
        if (s.courses.some(c => c.title === newStudent.course)) return s;
        
        // Update License
        const updatedLicenses = { ...licenses };
        updatedLicenses[courseId].used = (updatedLicenses[courseId].used || 0) + 1;
        setLicenses(updatedLicenses);
        localStorage.setItem('companyLicenses', JSON.stringify(updatedLicenses));

        return {
          ...s,
          courses: [...s.courses, { 
            title: newStudent.course, 
            progress: 0, 
            enrolledDate: new Date().toLocaleDateString() 
          }]
        };
      }
      return s;
    }));
    setIsAssignModalOpen(false);
    setNewStudent({ ...newStudent, course: '' });
  };


  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-dark tracking-tight">Manage Students</h1>
          <p className="text-slate-500 font-medium mt-1">Add, track and assign courses to your team members.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/30"
        >
          <FiUserPlus className="w-5 h-5" />
          Add New Student
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        {errorHeader && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-shake">
            {errorHeader}
          </div>
        )}
        <div className="relative max-w-md w-full mb-8">

          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-400">
                <th className="pb-4 font-black text-xs uppercase tracking-widest pl-4">Student</th>
                <th className="pb-4 font-black text-xs uppercase tracking-widest">Enrolled Courses & Progress</th>
                <th className="pb-4 font-black text-xs uppercase tracking-widest">Status</th>
                <th className="pb-4 font-black text-xs uppercase tracking-widest text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="group bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-5 pl-4 rounded-l-2xl border-y border-l border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 shadow-inner">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-dark">{student.name}</p>
                        <p className="text-[11px] font-medium text-slate-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 border-y border-slate-50">
                    <div className="flex flex-col gap-3 max-w-xs">
                      {student.courses.length > 0 ? (
                        student.courses.map((c, i) => (
                          <div key={i} className="space-y-1.5">
                             <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                                <span className="text-dark/70 truncate mr-2 italic">{c.title}</span>
                                <span className="text-primary">{c.progress}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }}></div>
                             </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-slate-300 text-xs italic font-medium tracking-tight">No active enrollments</span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 border-y border-slate-50">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      student.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${student.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></div>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-5 text-right pr-4 rounded-r-2xl border-y border-r border-slate-50">
                    <button 
                      onClick={() => { setSelectedStudent(student); setIsAssignModalOpen(true); }}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all border border-slate-100"
                      title="Assign New Course"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/20 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
              <div className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-dark">Enroll New Student</h2>
                    <button onClick={() => setIsModalOpen(false)}><FiX className="w-6 h-6 text-slate-400" /></button>
                 </div>
                 
                 <form onSubmit={handleAddStudent} className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-dark ml-1 italic">Full Name</label>
                       <input 
                         required
                         type="text" 
                         value={newStudent.name}
                         onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                         className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#59B1C9]/20 transition-all outline-none"
                         placeholder="e.g. John Doe"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-dark ml-1 italic">Email Address</label>
                       <input 
                         required
                         type="email" 
                         value={newStudent.email}
                         onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                         className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#59B1C9]/20 transition-all outline-none"
                         placeholder="e.g. john@company.com"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-dark ml-1 italic">Assign Course</label>
                       <select 
                         value={newStudent.course}
                         onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                         className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#59B1C9]/20 cursor-pointer"
                       >
                         <option value="">Enroll without course...</option>
                         {Object.values(licenses).filter(l => l.count > (l.used || 0)).map(l => (
                            <option key={l.title} value={l.title}>
                               {l.title} ({l.count - (l.used || 0)} seats left)
                            </option>
                         ))}
                       </select>
                       <p className="text-[10px] text-slate-400 ml-1">Only courses with available licenses are shown.</p>

                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/30 mt-4 h-14"
                    >
                       Add & Enroll
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}

      {/* Assign New Course Modal (to existing student) */}
      {isAssignModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/20 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
              <div className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h2 className="text-2xl font-black text-dark tracking-tight">Assign Course</h2>
                       <p className="text-xs font-bold text-slate-400 uppercase mt-1">Student: {selectedStudent.name}</p>
                    </div>
                    <button onClick={() => setIsAssignModalOpen(false)}><FiX className="w-6 h-6 text-slate-400" /></button>
                 </div>
                 
                 <form onSubmit={handleAssignCourse} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-dark ml-1 italic">Select Course</label>
                       <select 
                         required
                         value={newStudent.course}
                         onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                         className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                       >
                         <option value="">Choose a course...</option>
                         {Object.values(licenses).filter(l => l.count > (l.used || 0)).map(l => (
                            <option 
                              key={l.title} 
                              value={l.title} 
                              disabled={selectedStudent.courses.some(sc => sc.title === l.title)}
                            >
                              {l.title} ({l.count - (l.used || 0)} seats left)
                              {selectedStudent.courses.some(sc => sc.title === l.title) ? ' — Already Enrolled' : ''}
                            </option>
                         ))}
                       </select>

                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/30 h-14"
                    >
                       Assign Course
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};


export default ManageStudents;
