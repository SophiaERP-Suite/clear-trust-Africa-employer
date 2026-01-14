export default function Loading() {
  return (
    <div
      className="loading flex items-center justify-center gap-3 text-center mt-8"
      aria-label="Loading Roles"
      role="status"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 44 44"
        stroke="currentColor"
        aria-label="Loading"
      >
        <g fill="none" fillRule="evenodd" strokeWidth="4">
          <circle cx="22" cy="22" r="9" strokeOpacity="0.2" />
          <path
            d="M22 3 A19 19 0 0 1 41 22"
            stroke="currentColor"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 22 22"
              to="360 22 22"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
      <span className="text-gray-700 text-sm">Loading.. Please Wait... </span>
    </div>
  );
}
