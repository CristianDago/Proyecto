import React from "react";
import { Grid } from "../../grid/grid";
import { FormSectionProps } from "../../../../interface/common/forms/form.section";

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
