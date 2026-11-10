import { PropsWithChildren } from "react";

interface ILinkProps extends PropsWithChildren {
  onClick: () => void;
  className?: string;
  testId?: string;
}

const Link: React.FunctionComponent<ILinkProps> = ({
  onClick,
  children,
  className = "",
  testId = "github_link",
}: ILinkProps) => {
  return (
    <a
      data-testid={testId}
      onClick={onClick}
      className={`read-the-docs footer-link ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
