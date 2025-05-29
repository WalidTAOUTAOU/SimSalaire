export const Input = ({ className = '', ...props }) => (
  <input className={`border border-gray-300 rounded-lg px-3 py-2 ${className}`} {...props} />
);