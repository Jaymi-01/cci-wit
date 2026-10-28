import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

/**
 * Official Hugeicons stroke icon styles
 * strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round"
 */

export function Download04Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3V15.5M12 15.5L7.5 11M12 15.5L16.5 11" />
      <path d="M3.5 16.5V17C3.5 19.2091 5.29086 21 7.5 21H16.5C18.7091 21 20.5 19.2091 20.5 17V16.5" />
    </svg>
  );
}

export function Upload04Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21V8.5M12 8.5L7.5 13M12 8.5L16.5 13" />
      <path d="M3.5 7.5V7C3.5 4.79086 5.29086 3 7.5 3H16.5C18.7091 3 20.5 4.79086 20.5 7V7.5" />
    </svg>
  );
}

export function Camera01Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 12C2.5 8.22876 2.5 6.34315 3.67157 5.17157C4.84315 4 6.72876 4 10.5 4H13.5C17.2712 4 19.1569 4 20.3284 5.17157C21.5 6.34315 21.5 8.22876 21.5 12C21.5 15.7712 21.5 17.6569 20.3284 18.8284C19.1569 20 17.2712 20 13.5 20H10.5C6.72876 20 4.84315 20 3.67157 18.8284C2.5 17.6569 2.5 15.7712 2.5 12Z" />
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
      <path d="M18 8H18.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
      <path d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21" />
    </svg>
  );
}

export function Edit02Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.75 3.75L18.25 8.25M15.5 2L4 13.5V18H8.5L20 6.5C20.8284 5.67157 20.8284 4.32843 20 3.5L18.5 2C17.6716 1.17157 16.3284 1.17157 15.5 2Z" />
      <path d="M3 22H21" />
    </svg>
  );
}

export function ZoomInAreaIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 14L21 21M9 12V6M6 9H12M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z" />
    </svg>
  );
}

export function ZoomOutAreaIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 14L21 21M6 9H12M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z" />
    </svg>
  );
}

export function RotateRight01Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3016 3 18.1889 4.77916 19.7545 7.42857M21 3V7.5H16.5" />
    </svg>
  );
}

export function ArrowReloadHorizontalIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12C4 7.58172 7.58172 4 12 4C15.8647 4 19.0833 6.74103 19.8249 10.3846M20 12C20 16.4183 16.4183 20 12 20C8.13529 20 4.91673 17.259 4.17513 16.6154M20 7V11H16M4 17V13H8" />
    </svg>
  );
}

export function Copy01Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8V6C16 4.11438 16 3.17157 15.4142 2.58579C14.8284 2 13.8856 2 12 2H6C4.11438 2 3.17157 2 2.58579 2.58579C2 3.17157 2 4.11438 2 6V12C2 13.8856 2 14.8284 2.58579 15.4142C3.17157 16 4.11438 16 6 16H8" />
      <path d="M8 12C8 10.1144 8 9.17157 8.58579 8.58579C9.17157 8 10.1144 8 12 8H18C19.8856 8 20.8284 8 21.4142 8.58579C22 9.17157 22 10.1144 22 12V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22H12C10.1144 22 9.17157 22 8.58579 21.4142C8 20.8284 8 19.8856 8 18V12Z" />
    </svg>
  );
}

export function Share01Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.25367 15.0315 5.50001 15.0907 5.73507L8.71887 9.20703C8.19794 8.46824 7.33235 8 6.35294 8C4.50125 8 3 9.50125 3 11.3529C3 13.2046 4.50125 14.7059 6.35294 14.7059C7.33235 14.7059 8.19794 14.2376 8.71887 13.4988L15.0907 16.9708C15.0315 17.2059 15 17.4522 15 17.7059C15 19.3627 16.3431 20.7059 18 20.7059C19.6569 20.7059 21 19.3627 21 17.7059C21 16.049 19.6569 14.7059 18 14.7059C17.071 14.7059 16.2415 15.1278 15.6888 15.7891L9.31306 12.3154C9.34149 12.1643 9.35624 12.0089 9.35624 11.8502C9.35624 11.6915 9.34149 11.5361 9.31306 11.385L15.6888 7.91129C16.2415 8.5726 17.071 8.99448 18 8.99448" />
    </svg>
  );
}

export function Cancel01Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 5L5 19M5 5L19 19" />
    </svg>
  );
}

export function CheckmarkCircle02Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 12.5L9.5 16L18 7.5" />
    </svg>
  );
}

export function Drag01Icon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3V21M12 3L8 7M12 3L16 7M12 21L8 17M12 21L16 17M3 12H21M3 12L7 8M3 12L7 16M21 12L17 8M21 12L17 16" />
    </svg>
  );
}

export function TextFontIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6V4H17V6M10 4V20M7 20H13M15 13H21M18 13V20M16 20H20" />
    </svg>
  );
}
