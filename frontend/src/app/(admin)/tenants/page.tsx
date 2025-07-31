import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import ProtectedRoute from "@/server/ProtectedRoute";
import React from "react";

export default function BasicTables() {
  return (
    <ProtectedRoute>
      <PageBreadcrumb pageTitle="Tenants" />
      <div className="space-y-4">
        <ComponentCard title="">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </ProtectedRoute>
  );
}
