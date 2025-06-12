import React from "react";
import { Grid } from "../../grid/grid";
import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  gridClassName?: string;
  children: ReactNode;
  sectionCssClass?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  gridClassName,
  children,
  sectionCssClass,
}) => {
  return (
    <div className={sectionCssClass}>
      <h2>{title}</h2>
      <Grid className={gridClassName}>{children}</Grid>
    </div>
  );
};

export default FormSection;
