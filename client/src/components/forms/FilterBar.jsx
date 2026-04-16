import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import SectionCard from "../layout/SectionCard.jsx";

const FilterLayout = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

/**
 * Shared filter-bar/form-shell component.
 *
 * @param {{title?: string, description?: string, submitLabel?: string, onSubmit: React.FormEventHandler<HTMLFormElement>, onReset?: (() => void) | null, secondaryActions?: React.ReactNode, children: React.ReactNode}} props - Component props.
 * @returns {JSX.Element} Filter bar.
 */
export const FilterBar = ({
  title = "Filters",
  description = "Refine the current workspace without leaving the page.",
  submitLabel = "Apply",
  onSubmit,
  onReset = null,
  secondaryActions = null,
  children,
}) => (
  <SectionCard
    title={title}
    description={description}
    actions={
      <Stack direction="row" spacing={1}>
        {secondaryActions}
        {onReset && (
          <Button variant="text" onClick={onReset}>
            Reset
          </Button>
        )}
        <Button type="submit" form="shared-filter-bar" variant="contained">
          {submitLabel}
        </Button>
      </Stack>
    }
  >
    <FilterLayout id="shared-filter-bar" onSubmit={onSubmit}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {children}
      </Stack>
    </FilterLayout>
  </SectionCard>
);

export default FilterBar;
