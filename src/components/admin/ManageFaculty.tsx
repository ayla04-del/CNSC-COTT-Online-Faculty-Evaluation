'use client';

import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  position: string;
  email: string;
}

export default function ManageFaculty() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: ''
  });

  useEffect(() => {
    loadFaculty();
  }, []);

  // ✅ LOAD from localStorage
  const loadFaculty = () => {
    const data = localStorage.getItem('faculty');
    if (data) {
      setFaculty(JSON.parse(data));
    }
    setLoading(false);
  };

  // ✅ SAVE to localStorage
  const saveFaculty = (data: Faculty[]) => {
    localStorage.setItem('faculty', JSON.stringify(data));
    setFaculty(data);
  };

  const filteredFaculty = faculty.filter(f => {
    const search = searchTerm.toLowerCase();
    return (
      f.name.toLowerCase().includes(search) ||
      f.position.toLowerCase().includes(search) ||
      f.email.toLowerCase().includes(search)
    );
  });

  const handleAdd = () => {
    setEditingFaculty(null);
    setFormData({ name: '', department: '', email: '' });
    setShowDialog(true);
  };

  const handleEdit = (fac: Faculty) => {
    setEditingFaculty(fac);
    setFormData({
      name: fac.name,
      department: fac.position,
      email: fac.email
    });
    setShowDialog(true);
  };

  // ✅ DELETE (localStorage)
  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this faculty member?')) return;

    const updated = faculty.filter(f => f.id !== id);
    saveFaculty(updated);
  };

  // ✅ ADD / UPDATE (localStorage)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    let updatedFaculty: Faculty[];

    if (editingFaculty) {
      updatedFaculty = faculty.map(f =>
        f.id === editingFaculty.id ? { ...f, ...formData } : f
      );
    } else {
      const newFaculty: Faculty = {
        id: Date.now().toString(),
        ...formData
      };
      updatedFaculty = [...faculty, newFaculty];
    }

    saveFaculty(updatedFaculty);
    setShowDialog(false);
    setFormData({ name: '', department: '', email: '' });
  };

  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Manage Faculty</h2>
        <button onClick={handleAdd}>
          <Plus /> Add Faculty
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search faculty..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <table border={1} cellPadding={10} style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4}>Loading...</td></tr>
          ) : filteredFaculty.length === 0 ? (
            <tr><td colSpan={4}>No faculty found</td></tr>
          ) : (
            filteredFaculty.map(f => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.position}</td>
                <td>{f.email}</td>
                <td>
                  <button onClick={() => handleEdit(f)}><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(f.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Dialog */}
      {showDialog && (
        <div style={{ background: '#00000088', position: 'fixed', inset: 0 }}>
          <div style={{ background: '#fff', padding: 20, margin: '100px auto', width: 300 }}>
            <h3>{editingFaculty ? 'Edit' : 'Add'} Faculty</h3>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <br />
              <input
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <br />
              <input
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <br /><br />
              <button type="submit">{editingFaculty ? 'Update' : 'Add'}</button>
              <button type="button" onClick={() => setShowDialog(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
