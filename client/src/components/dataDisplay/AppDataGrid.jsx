import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import { UI_DEFAULTS } from "../../utils/constants.js";
import { EmptyState } from "../feedback/EmptyState.jsx";
import { LoadingState } from "../feedback/LoadingState.jsx";

const GridRoot = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: theme.spacing(48),
}));

const MobileListRoot = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const LoadingOverlay = () => <LoadingState title="Loading rows" description="Preparing the current dataset." />;
const EmptyOverlay = () => <EmptyState title="No rows to show" description="Adjust filters or add data to populate this grid." />;

/**
 * Shared data-grid wrapper with responsive card fallback.
 *
 * @param {{rows: unknown[], columns: unknown[], loading?: boolean, mobileCardRenderer?: ((row: unknown) => React.ReactNode) | null, columnVisibilityModel?: Record<string, boolean>, onColumnVisibilityModelChange?: ((model: Record<string, boolean>) => void) | null, density?: "compact" | "standard" | "comfortable", getRowId?: ((row: unknown) => string | number) | undefined}} props - Component props.
 * @returns {JSX.Element} Shared grid wrapper.
 */
export const AppDataGrid = ({
  rows,
  columns,
  loading = false,
  mobileCardRenderer = null,
  columnVisibilityModel,
  onColumnVisibilityModelChange = null,
  density = "standard",
  getRowId,
  ...rest
}) => {
  const theme = useTheme();
  const isCompactViewport = useMediaQuery(theme.breakpoints.down("md"));

  if (isCompactViewport && typeof mobileCardRenderer === "function") {
    if (loading) {
      return <LoadingState title="Loading cards" description="Preparing the mobile-friendly list." />;
    }

    if (!rows.length) {
      return <EmptyState title="No mobile cards available" description="This list will appear here once data is available." />;
    }

    return (
      <MobileListRoot>
        {rows.map((row, index) => (
          <Box key={getRowId ? getRowId(row) : row.id || row.key || index}>{mobileCardRenderer(row)}</Box>
        ))}
      </MobileListRoot>
    );
  }

  return (
    <GridRoot>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        loading={loading}
        disableRowSelectionOnClick
        pagination
        density={density}
        pageSizeOptions={[UI_DEFAULTS.PAGE_SIZE, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: UI_DEFAULTS.PAGE_SIZE,
            },
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={onColumnVisibilityModelChange || undefined}
        slots={{
          loadingOverlay: LoadingOverlay,
          noRowsOverlay: EmptyOverlay,
          noResultsOverlay: EmptyOverlay,
        }}
        {...rest}
      />
    </GridRoot>
  );
};

export default AppDataGrid;
