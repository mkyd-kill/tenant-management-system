import React, { useEffect, useState } from "react";
import { Tenant } from "../types/tenant";
import { getTenants, deleteTenant } from "../services/api";

const TenantList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    const data = await getTenants();
    setTenants(data);
  };

  const handleDelete = async (id: number) => {
    await deleteTenant(id);
    fetchTenants();
  };

  return (
    <div>
      <h2>Tenant List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Move-In Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>{tenant.move_in_date}</td>
              <td>
                <button onClick={() => handleDelete(tenant.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantList;