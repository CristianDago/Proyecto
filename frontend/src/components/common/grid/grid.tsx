import GridProps from "../../../interface/common/grid.props";

export const Grid: React.FC<GridProps> = ({
  children,
  columns,
  className,
  ...props
}) => {
  const dynamicClass = columns ? `grid-columns-${columns}` : "";
  return (
    <div className={`grid ${dynamicClass} ${className || ""}`} {...props}>
      {children}
    </div>
  );
};
