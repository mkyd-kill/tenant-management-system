import React, { useEffect, useState } from 'react';
import { Tenant } from '../types/tenant';
import { getTenants, deleteTenant } from '../services/api';
import TenantForm from './TenantForm';
import { toast } from 'react-toastify';
import '../styles/TenantList.css';

const TenantList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const data = await getTenants();
      setTenants(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTenant(id);
      toast.success('Tenant deleted successfully');
      fetchTenants();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleEdit = (tenant: Tenant) => {
    setEditingTenant(tenant);
  };

  return (
    <div className="tenant-list">
      <h2>Tenant List</h2>
      <TenantForm onSave={fetchTenants} tenant={editingTenant} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Move-In Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tenant => (
              <tr key={tenant.id}>
                <td>{tenant.name}</td>
                <td>{tenant.email}</td>
                <td>{tenant.phone || '-'}</td>
                <td>{tenant.move_in_date}</td>
                <td>{tenant.is_active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(tenant)}>
                    Edit
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(tenant.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TenantList;