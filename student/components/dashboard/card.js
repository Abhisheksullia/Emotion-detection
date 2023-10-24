import React from "react";

export default function DashboardCard({
  label = "Total Meetings",
  value = "23",
}) {
  return (
    <div className="h-32 rounded-md flex gap-4 flex-col items-center justify-center bg-secondary text-white">
      <h1 className="text-center font-medium">{label}</h1>
      <h1 className="text-center font-bold uppercase text-xl">{value}</h1>
    </div>
  );
}
