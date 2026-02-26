import React from 'react';

export default function Dashboard(): React.JSX.Element {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white tracking-tight">
          Your <span className="text-gradient">Expenses</span>
        </h1>
        <p className="text-muted text-sm mt-1 font-body">
          Track, manage, and understand where your money goes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Total Spent', 'This Month', 'Categories'].map((label) => (
            <div key={label} className="card-elevated p-5 animate-slide-up">
              <p className="label">{label}</p>
              <div className="h-7 w-24 bg-surface-3 rounded-lg mt-2 animate-pulse" />
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card-elevated p-5 min-h-[300px] flex items-center justify-center">
            <p className="text-muted text-sm font-display tracking-wider">FORM</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card-elevated p-5 min-h-[300px] flex items-center justify-center">
            <p className="text-muted text-sm font-display tracking-wider">LIST</p>
          </div>
        </div>

      </div>
    </div>
  );
}