import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Tenant } from '../types/tenant';
import { createTenant, updateTenant } from '../services/api';
import { toast } from 'react-toastify';
import '../styles/TenantForm.css';

interface TenantFormProps {
  tenant?: Tenant;
  onSave: () => void;
}

// Validation schema using Yup
const tenantSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must be a 10-digit number')
    .optional(),
  move_in_date: Yup.string()
    .required('Move-in date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  is_active: Yup.boolean().required(),
});

const TenantForm: React.FC<TenantFormProps> = ({ tenant, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Tenant>>({
    resolver: yupResolver(tenantSchema),
    defaultValues: tenant || {
      name: '',
      email: '',
      phone: '',
      move_in_date: '',
      is_active: true,
    },
  });

  const onSubmit = async (data: Partial<Tenant>) => {
    try {
      if (tenant?.id) {
        await updateTenant(tenant.id, data);
        toast.success('Tenant updated successfully');
      } else {
        await createTenant(data as Omit<Tenant, 'id' | 'created_at'>);
        toast.success('Tenant added successfully');
      }
      onSave();
      reset({ name: '', email: '', phone: '', move_in_date: '', is_active: true });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className="tenant-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>{tenant ? 'Edit Tenant' : 'Add New Tenant'}</h3>
      <div className="form-group">
        <label>Name</label>
        <input type="text" {...register('name')} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="text" {...register('phone')} placeholder="e.g., 1234567890" />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
      </div>
      <div className="form-group">
        <label>Move-In Date</label>
        <input type="date" {...register('move_in_date')} />
        {errors.move_in_date && <p className="error">{errors.move_in_date.message}</p>}
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" {...register('is_active')} />
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