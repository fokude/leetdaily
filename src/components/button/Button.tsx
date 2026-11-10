import { PropsWithChildren } from "react";

interface IButtonProps extends PropsWithChildren {
  onClick: () => void;
  id: string;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const Button: React.FunctionComponent<IButtonProps> = ({
  onClick,
  id,
  children,
  className = "",
  disabled = false,
  variant = "primary",
}: IButtonProps) => {
  return (
    <button
      data-testid={id}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
