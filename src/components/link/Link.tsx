import { PropsWithChildren } from "react";

interface ILinkProps extends PropsWithChildren {
  onClick: () => void;
  className?: string;
}

const Link: React.FunctionComponent<ILinkProps> = ({
  onClick,
  children,
  className = "",
}: ILinkProps) => {
  return (
    <a
      data-testid="github_link"
      onClick={onClick}
      className={`read-the-docs footer-link ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
