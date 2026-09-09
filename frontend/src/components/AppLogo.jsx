export const APP_NAME = "rMessage";

export function AppLogo({ className = "", size = 32, alt = APP_NAME }) {
  return (
    <img
      src="/favicon.svg"
      alt={alt}
      width={size}
      height={size}
      className={`shrink-0 object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
