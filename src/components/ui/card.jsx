export const Card = ({ children, className, ...props }) => (
  <div className={`rounded-2xl shadow ${className}`} {...props}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);