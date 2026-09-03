"use client";

import React from "react";

export type WindowMode = "normal" | "maximized" | "minimized";

export type BaseWindowProps = {
  mode: WindowMode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
};

export type WindowProps = BaseWindowProps & {
  title: React.ReactNode;
  bgClassName?: string;
  children: React.ReactNode;
};

export default function Window({
  title,
  mode,
  onClose,
  onMinimize,
  onMaximize,
  bgClassName = "bg-slate-900",
  children,
}: WindowProps) {
  const windowClasses =
    mode === "maximized"
      ? `absolute inset-0 w-full h-full z-10 ${bgClassName} shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ease-out animate-window-open`
      : `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[660px] h-[400px] max-w-[90vw] max-h-[90vh] rounded-md border border-slate-700 ${bgClassName} shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ease-out animate-window-open`;

  return (
    <div className={windowClasses}>
      {/* TITLE BAR */}
      <div className="flex flex-row justify-between items-center gap-1 px-2 border-b py-1">
        {/* TITLE */}
        <div>{title}</div>

        {/* CONTROL BUTTONS */}
        <div className="flex flex-row">
          <div
            className="w-6 h-6 px-1 flex items-center justify-center cursor-pointer select-none rounded-md hover:bg-slate-700"
            onClick={onMinimize}
          >
            –
          </div>

          <div
            className="w-6 h-6 px-1 flex items-center justify-center cursor-pointer select-none rounded-md hover:bg-slate-700"
            onClick={onMaximize}
          >
            ▢
          </div>

          <div
            className="w-6 h-6 px-1 flex items-center justify-center cursor-pointer select-none rounded-md hover:bg-slate-700"
            onClick={onClose}
          >
            X
          </div>

        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {children}
    </div>
  );
}

