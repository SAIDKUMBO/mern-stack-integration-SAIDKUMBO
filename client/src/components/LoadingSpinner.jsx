export default function LoadingSpinner({ size = 'default' }) {
  const sizeClasses = {
    small: 'h-4 w-4 border',
    default: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-2'
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent`}
      />
    </div>
  );
}