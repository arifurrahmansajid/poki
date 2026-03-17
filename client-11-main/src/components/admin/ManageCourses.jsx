import React, { useState, useEffect, useRef } from 'react';
import {
  FiSearch, FiPlus, FiEdit3, FiTrash2, FiX, FiCheck,
  FiImage, FiTag, FiDollarSign, FiPackage, FiEyeOff, FiEye,
  FiUploadCloud
} from 'react-icons/fi';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:5000/api/courses';

const CATEGORY_OPTIONS = ['adult', 'children'];

const SCORM_API = 'http://localhost:5000/api/scorm';

const EMPTY_FORM = {
  title: '',
  description: '',
  price: '',
  category: 'adult',
  stock: 0,
  image: '',
  scormFileName: '',   // stored file name shown in UI
  instructor: 'Admin Instructor',
  isPublished: true,
};


const ManageCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal state — mode: 'add' | 'edit'
  const [modalMode, setModalMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploadPhase, setUploadPhase] = useState(''); // '', 'saving', 'uploading'

  // Holds the actual File object selected for SCORM upload
  const scormFileRef = useRef(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  // Admin fetches ALL courses including on-hold ones
  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}?admin=true`);
      if (response.ok) {
        const data = await response.json();
        setCourseList(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // ── Open Add modal ──────────────────────────────────────
  const openAddModal = () => {
    setModalMode('add');
    setFormData(EMPTY_FORM);
    setEditingId(null);
    scormFileRef.current = null;
    setIsModalOpen(true);
  };

  // ── Open Edit modal pre-filled ──────────────────────────
  const openEditModal = (course) => {
    setModalMode('edit');
    setFormData({
      title: course.title || '',
      description: course.description || '',
      price: course.price || '',
      category: course.category || 'adult',
      stock: course.stock || 0,
      image: course.image || '',
      scormFileName: course.scormFileName || '',
      instructor: course.instructor || 'Admin Instructor',
      isPublished: course.isPublished !== false,
    });
    setEditingId(course._id || course.id);
    scormFileRef.current = null;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    scormFileRef.current = null;
    setUploadPhase('');
  };

  // ── Image upload ─────────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((p) => ({ ...p, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  // ── SCORM file selection (does NOT upload yet — happens on save) ──────────
  const handleScormUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      scormFileRef.current = file;
      setFormData((p) => ({ ...p, scormFileName: file.name }));
    }
  };

  // ── Save (Add or Edit) then upload SCORM if a new zip was selected ─────────
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setUploadPhase('saving');
    try {
      const isEdit = modalMode === 'edit';
      const url = isEdit ? `${API_URL}/${editingId}` : API_URL;
      const method = isEdit ? 'PUT' : 'POST';

      // Step 1 — Save / create the course record
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save course record.');
      }

      const saved = await response.json();
      const courseId = saved._id || saved.id;

      // Step 2 — Upload SCORM zip if one was selected
      if (scormFileRef.current) {
        setUploadPhase('uploading');
        const formPayload = new FormData();
        formPayload.append('scormFile', scormFileRef.current);
        formPayload.append('courseId', courseId);

        const scormRes = await fetch(`${SCORM_API}/upload`, {
          method: 'POST',
          body: formPayload,
        });

        if (!scormRes.ok) {
          const errData = await scormRes.json().catch(() => ({}));
          throw new Error(errData.error || 'SCORM upload failed.');
        }
      }

      // Update local list
      if (isEdit) {
        setCourseList((prev) =>
          prev.map((c) => ((c._id || c.id) === editingId ? saved : c))
        );
      } else {
        setCourseList((prev) => [saved, ...prev]);
      }

      closeModal();
      Swal.fire({
        title: isEdit ? 'Course Updated!' : 'Course Added!',
        text: scormFileRef.current ? 'SCORM package uploaded & extracted.' : undefined,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.error('Error saving course:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Something went wrong.',
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setSaving(false);
      setUploadPhase('');
    }
  };

  // ── Toggle Publish / Hold ────────────────────────────────
  const handleTogglePublish = async (course) => {
    const id = course._id || course.id;
    const willPublish = !course.isPublished;

    const result = await Swal.fire({
      title: willPublish ? 'Publish Course?' : 'Put On Hold?',
      text: willPublish
        ? 'This course will become visible on the public website.'
        : 'This course will be hidden from the public website.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: willPublish ? '#22c55e' : '#f59e0b',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: willPublish ? 'Yes, Publish' : 'Yes, Hold',
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}/toggle-publish`, { method: 'PATCH' });
      if (response.ok) {
        const data = await response.json();
        setCourseList((prev) =>
          prev.map((c) => ((c._id || c.id) === id ? { ...c, isPublished: data.isPublished } : c))
        );
        Swal.fire({
          title: data.isPublished ? '✅ Published!' : '⏸ On Hold',
          text: data.message,
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1800,
        });
      }
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  // ── Delete ───────────────────────────────────────────────
  const handleDeleteCourse = async (course) => {
    const id = course._id || course.id;
    const result = await Swal.fire({
      title: 'Delete Course?',
      text: `"${course.title}" will be permanently deleted.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCourseList((prev) => prev.filter((c) => (c._id || c.id) !== id));
        Swal.fire({
          title: 'Deleted!',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const filteredCourses = courseList.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isAllowedCategory = CATEGORY_OPTIONS.includes(course.category);
    const matchesCategory =
      selectedCategory === 'all'
        ? isAllowedCategory
        : course.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'published' && course.isPublished) ||
      (selectedStatus === 'hold' && !course.isPublished);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-dark tracking-tight">Manage Courses</h1>
          <p className="text-slate-500 font-medium mt-1">Add, edit, delete, or publish/hold courses.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/30"
        >
          <FiPlus className="w-5 h-5" />
          Create New Course
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-600 outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-600 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course._id || course.id}
            className="bg-white rounded-3xl border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Publish badge */}
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${course.isPublished
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${course.isPublished ? 'bg-green-500' : 'bg-amber-500'}`} />
                {course.isPublished ? 'Published' : 'On Hold'}
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-dark leading-tight line-clamp-2 mb-2">{course.title}</h3>
              <div className="flex items-center justify-between text-sm text-slate-500 font-medium mb-4">
                <span>{course.instructor || 'Admin Instructor'}</span>
                <div className="flex flex-col items-end">
                  <span className="text-primary font-bold">${course.price}</span>
                  <span className="text-[10px] text-slate-400">Stock: {course.stock || 0}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="bg-slate-100 px-2 py-1 rounded-md text-xs font-bold text-slate-500">
                  {course.category || 'General'}
                </span>
                <div className="flex items-center gap-1.5">
                  {/* Publish / Hold Toggle */}
                  <button
                    onClick={() => handleTogglePublish(course)}
                    title={course.isPublished ? 'Put On Hold' : 'Publish'}
                    className={`p-2 rounded-lg transition-all text-xs font-bold flex items-center gap-1 ${course.isPublished
                        ? 'text-amber-500 hover:bg-amber-50 bg-slate-50'
                        : 'text-green-600 hover:bg-green-50 bg-slate-50'
                      }`}
                  >
                    {course.isPublished ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => openEditModal(course)}
                    title="Edit Course"
                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 bg-slate-50 rounded-lg transition-all"
                  >
                    <FiEdit3 className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteCourse(course)}
                    title="Delete Course"
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 bg-slate-50 rounded-lg transition-all"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="py-12 text-center text-slate-500 font-medium bg-white rounded-3xl border border-slate-100 border-dashed">
          No courses found.
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-8 overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-dark">
                    {modalMode === 'edit' ? 'Edit Course' : 'Add New Course'}
                  </h2>
                  <p className="text-slate-500 font-medium">
                    {modalMode === 'edit' ? 'Update the course details below.' : 'Fill in the details to publish a new course.'}
                  </p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <FiX className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark ml-1 italic">Course Title</label>
                  <div className="relative">
                    <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Advanced React Patterns"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark ml-1 italic">Description</label>
                  <textarea
                    placeholder="Provide a detailed description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  />
                </div>

                {/* Price + Category + Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-1 italic">Price (USD)</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="number"
                        placeholder="99"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-1 italic">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 outline-none cursor-pointer"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-1 italic">Stock</label>
                    <div className="relative">
                      <FiPackage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Publish toggle inside form */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-1 italic">Visibility</label>
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, isPublished: !p.isPublished }))}
                      className={`w-full py-3 px-4 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all ${formData.isPublished
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                    >
                      {formData.isPublished ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                      {formData.isPublished ? 'Published (visible)' : 'On Hold (hidden)'}
                    </button>
                  </div>
                </div>

                {/* Image + SCORM */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-1 italic">Course Photo</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all overflow-hidden group">
                      {formData.image ? (
                        <div className="relative w-full h-full">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-dark/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold">Change</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiImage className="w-8 h-8 text-slate-400 mb-2" />
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Click to Upload</p>
                        </div>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark ml-1 italic">SCORM File (.zip)</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all group">
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${formData.scormFileName ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                          {formData.scormFileName ? <FiCheck className="w-6 h-6" /> : <FiPlus className="w-6 h-6" />}
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold line-clamp-1 max-w-[120px]">
                          {formData.scormFileName || 'Upload .zip'}
                        </p>
                      </div>
                      <input type="file" className="hidden" accept=".zip" onChange={handleScormUpload} />
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span className="text-sm">
                          {uploadPhase === 'uploading' ? 'Uploading SCORM…' : 'Saving…'}
                        </span>
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-5 h-5" />
                        {modalMode === 'edit' ? 'Save Changes' : 'Publish Course'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
