import React, { useEffect, useState } from 'react';
import { Tenant } from '../types/tenant';
import { getTenants, deleteTenant } from '../services/api';
import TenantForm from './TenantForm';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import '../styles/TenantList.css';

const TenantList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ name: '', status: 'all' });
  const [sort, setSort] = useState({ field: 'name', direction: 'asc' });

  useEffect(() => {
    fetchTenants();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [tenants, filter, sort]);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const data = await getTenants();
      setTenants(data);
      setFilteredTenants(data);
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

  const applyFiltersAndSort = () => {
    let result = [...tenants];

    // Filter by name
    if (filter.name) {
      result = result.filter(tenant =>
        tenant.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    // Filter by status
    if (filter.status !== 'all') {
      result = result.filter(tenant => tenant.is_active === (filter.status === 'active'));
    }

    // Sort
    result.sort((a, b) => {
      const field = sort.field as keyof Tenant;
      const aValue = a[field];
      const bValue = b[field];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

    setFilteredTenants(result);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (field: string) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="tenant-list">
      <h2>Tenant List</h2>
      <TenantForm onSave={fetchTenants} tenant={editingTenant} />
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Filter by name..."
          value={filter.name}
          onChange={handleFilterChange}
        />
        <select name="status" value={filter.status} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSortChange('name')}>
                Name {sort.field === 'name' && (sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSortChange('email')}>
                Email {sort.field === 'email' && (sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Phone</th>
              <th onClick={() => handleSortChange('move_in_date')}>
                Move-In Date {sort.field === 'move_in_date' && (sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map(tenant => (
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