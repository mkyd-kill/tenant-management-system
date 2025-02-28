import React, { useState } from 'react';
import { Tenant } from '../types/tenant';
import { createTenant, updateTenant } from '../services/api';
import { toast } from 'react-toastify';
import '../styles/TenantForm.css';

interface TenantFormProps {
  tenant?: Tenant;
  onSave: () => void;
}

const TenantForm: React.FC<TenantFormProps> = ({ tenant, onSave }) => {
  const [formData, setFormData] = useState<Partial<Tenant>>(tenant || {
    name: '',
    email: '',
    phone: '',
    move_in_date: '',
    is_active: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tenant?.id) {
        await updateTenant(tenant.id, formData);
        toast.success('Tenant updated successfully');
      } else {
        await createTenant(formData as Omit<Tenant, 'id' | 'created_at'>);
        toast.success('Tenant added successfully');
      }
      onSave();
      setFormData({ name: '', email: '', phone: '', move_in_date: '', is_active: true });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className="tenant-form" onSubmit={handleSubmit}>
      <h3>{tenant ? 'Edit Tenant' : 'Add New Tenant'}</h3>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Move-In Date</label>
        <input type="date" name="move_in_date" value={formData.move_in_date || ''} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" name="is_active" checked={formData.is_active || false} onChange={handleChange} />
          Active
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        {tenant ? 'Update' : 'Add'} Tenant
      </button>
    </form>
  );
};

export default TenantForm;