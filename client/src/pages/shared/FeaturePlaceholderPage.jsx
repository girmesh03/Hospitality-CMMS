import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ChartPanel from "../../components/charts/ChartPanel.jsx";
import AppDataGrid from "../../components/dataDisplay/AppDataGrid.jsx";
import KeyValueList from "../../components/dataDisplay/KeyValueList.jsx";
import StatCard from "../../components/dataDisplay/StatCard.jsx";
import ActionDrawer from "../../components/dialogs/ActionDrawer.jsx";
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog.jsx";
import PermissionRestrictedState from "../../components/feedback/PermissionRestrictedState.jsx";
import FilterBar from "../../components/forms/FilterBar.jsx";
import FormSelectField from "../../components/forms/FormSelectField.jsx";
import FormTextField from "../../components/forms/FormTextField.jsx";
import PageContainer from "../../components/layout/PageContainer.jsx";
import PageHeader from "../../components/layout/PageHeader.jsx";
import SectionCard from "../../components/layout/SectionCard.jsx";
import AttachmentPreviewList from "../../components/uploads/AttachmentPreviewList.jsx";
import FileDropzone from "../../components/uploads/FileDropzone.jsx";
import { FILTER_KEYS, REQUEST_STATUSES, TABLE_COLUMN_KEYS, VIEW_MODES } from "../../utils/constants.js";
import { formatLabelFromKey } from "../../utils/formatting.js";
import { createColumnVisibilityModel } from "../../utils/tables.js";

const showcaseRows = [
  {
    id: "wo-24001",
    workOrderNumber: "WO-24001",
    status: "open",
    priority: "high",
    property: "Harbor Hotel",
    location: "Room 1208",
    dueAt: "Today 16:00",
  },
  {
    id: "wo-24002",
    workOrderNumber: "WO-24002",
    status: "scheduled",
    priority: "medium",
    property: "City Suites",
    location: "Boiler Room",
    dueAt: "Tomorrow 09:00",
  },
  {
    id: "wo-24003",
    workOrderNumber: "WO-24003",
    status: "awaiting_parts",
    priority: "urgent",
    property: "Harbor Hotel",
    location: "Kitchen Line 2",
    dueAt: "Overdue 4h",
  },
];

const showcaseColumns = TABLE_COLUMN_KEYS.WORK_ORDERS.slice(0, 6).map((field) => ({
  field,
  headerName: formatLabelFromKey(field),
  flex: 1,
  minWidth: 140,
}));

const statusOptions = REQUEST_STATUSES.map((status) => ({
  label: formatLabelFromKey(status),
  value: status,
}));

const viewModeOptions = Object.entries(VIEW_MODES).map(([key, value]) => ({
  label: formatLabelFromKey(key),
  value,
}));

/**
 * Shared placeholder page used to wire route families through the Phase 03 shell.
 *
 * @param {{title: string, description: string, routeKey: string, layout?: "app" | "auth" | "portal", milestone?: string, highlights?: string[], showcase?: "dashboard" | "form" | "portal"}} props - Component props.
 * @returns {JSX.Element} Placeholder page.
 */
export const FeaturePlaceholderPage = ({
  title,
  description,
  routeKey,
  layout = "app",
  milestone = "Feature implementation is scheduled for a later phase.",
  highlights = [],
  showcase = "dashboard",
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    createColumnVisibilityModel(TABLE_COLUMN_KEYS.WORK_ORDERS, [
      "workOrderNumber",
      "status",
      "priority",
      "property",
      "location",
      "dueAt",
    ]),
  );
  const form = useForm({
    defaultValues: {
      email: "",
      [FILTER_KEYS.SEARCH]: "",
      [FILTER_KEYS.STATUS]: REQUEST_STATUSES[0],
      viewMode: VIEW_MODES.LIST,
    },
  });

  const handleFilterSubmit = form.handleSubmit((values) => {
    toast.info(`${title} shell captured filters: ${JSON.stringify(values)}`);
  });

  const handleFilterReset = () => {
    form.reset();
    toast.success(`${title} shell filters reset.`);
  };

  const handleConfirmAction = () => {
    setDialogOpen(false);
    toast.success(`${title} shell action confirmed.`);
  };

  const headerActions = (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
      <Chip label={routeKey} size="small" variant="outlined" />
      <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
        Open drawer
      </Button>
      <Button variant="contained" onClick={() => setDialogOpen(true)}>
        Open dialog
      </Button>
    </Stack>
  );

  const authShowcase = (
    <Stack spacing={3}>
      <PageHeader eyebrow={routeKey} title={title} description={description} actions={headerActions} />
      <SectionCard title="Auth form shell" description="Reusable React Hook Form wrappers are in place for later auth flows.">
        <Stack spacing={2}>
          <FormTextField
            name="email"
            control={form.control}
            label="Email Address"
            textFieldProps={{ placeholder: "engineer@property.example" }}
          />
          <FormSelectField name="viewMode" control={form.control} label="Flow Type" options={viewModeOptions} />
          <Button variant="contained" onClick={handleFilterSubmit}>
            Submit shell form
          </Button>
        </Stack>
      </SectionCard>
      <SectionCard title="Phase marker">
        <Typography variant="body2" color="text.secondary">
          {milestone}
        </Typography>
      </SectionCard>
    </Stack>
  );

  const portalShowcase = (
    <Stack spacing={3}>
      <PageHeader eyebrow={routeKey} title={title} description={description} actions={headerActions} />
      <PermissionRestrictedState description="Portal layouts intentionally avoid internal modules and only expose scoped actions." />
      <SectionCard title="Portal summary" description="This shell demonstrates restricted layouts, uploads, and scoped metadata.">
        <KeyValueList
          items={[
            { label: "Portal Mode", value: "Restricted" },
            { label: "Actor Surface", value: "Requester or Vendor" },
            { label: "Next Phase", value: milestone },
          ]}
        />
      </SectionCard>
      <SectionCard title="Evidence Upload Shell" description="Uploads and previews are ready for later request/vendor flows.">
        <Stack spacing={2}>
          <FileDropzone onFilesAccepted={(acceptedFiles) => setFiles((currentFiles) => [...currentFiles, ...acceptedFiles])} />
          <AttachmentPreviewList files={files} />
        </Stack>
      </SectionCard>
    </Stack>
  );

  const appShowcase = (
    <PageContainer>
      <PageHeader eyebrow={routeKey} title={title} description={description} actions={headerActions} />
      <FilterBar
        title="Shared filter shell"
        description="This route is wired through reusable filter controls, RHF wrappers, and responsive layout behavior."
        onSubmit={handleFilterSubmit}
        onReset={handleFilterReset}
        submitLabel="Apply shell filters"
      >
        <FormTextField
          name={FILTER_KEYS.SEARCH}
          control={form.control}
          label="Search"
          textFieldProps={{ placeholder: "Search work, assets, locations, or vendors" }}
        />
        <FormSelectField name={FILTER_KEYS.STATUS} control={form.control} label="Status" options={statusOptions} />
        <FormSelectField name="viewMode" control={form.control} label="View Mode" options={viewModeOptions} />
      </FilterBar>
      <Stack direction={{ xs: "column", xl: "row" }} spacing={3}>
        <Stack flex={1} spacing={3}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <StatCard label="Open Work" value="128" trend="12 due today" status="Operational" />
            <StatCard label="Emergency" value="6" trend="2 awaiting assignment" status="Attention" />
            <StatCard label="PM Due" value="34" trend="88% on-time this week" status="Tracking" />
          </Stack>
          <ChartPanel
            title="Widget shell"
            description="Chart wrappers and responsive card layouts are ready for dashboard and report modules."
            footer={
              <Typography variant="body2" color="text.secondary">
                KPI, chart, and drilldown behavior will connect to real APIs in later phases.
              </Typography>
            }
          />
          <SectionCard title="Data grid shell" description="Column visibility, responsive fallback, and reusable empty/loading states are wired.">
            <AppDataGrid
              rows={showcaseRows}
              columns={showcaseColumns}
              density="standard"
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={setColumnVisibilityModel}
              mobileCardRenderer={(row) => (
                <SectionCard title={row.workOrderNumber} description={`${row.property} • ${row.location}`}>
                  <KeyValueList
                    items={[
                      { label: "Status", value: formatLabelFromKey(row.status) },
                      { label: "Priority", value: formatLabelFromKey(row.priority) },
                      { label: "Due", value: row.dueAt },
                    ]}
                  />
                </SectionCard>
              )}
            />
          </SectionCard>
        </Stack>
        <Stack width={{ xs: "100%", xl: "32%" }} spacing={3}>
          <SectionCard title="Route Highlights" description="Traceability notes for this route shell.">
            <Stack direction="row" useFlexGap spacing={1} sx={{ flexWrap: "wrap" }}>
              {highlights.length > 0 ? (
                highlights.map((highlight) => <Chip key={highlight} label={highlight} size="small" />)
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Shared shell route ready for later feature work.
                </Typography>
              )}
            </Stack>
          </SectionCard>
          <SectionCard title="Metadata">
            <KeyValueList
              items={[
                { label: "Layout Shell", value: showcase === "dashboard" ? "Operational App" : formatLabelFromKey(showcase) },
                { label: "Milestone", value: milestone },
                { label: "Permissions", value: "Shell only in Phase 03" },
              ]}
            />
          </SectionCard>
          <SectionCard title="Upload and preview shell">
            <Stack spacing={2}>
              <FileDropzone onFilesAccepted={(acceptedFiles) => setFiles((currentFiles) => [...currentFiles, ...acceptedFiles])} />
              <AttachmentPreviewList files={files} />
            </Stack>
          </SectionCard>
        </Stack>
      </Stack>
    </PageContainer>
  );

  return (
    <>
      {layout === "auth" ? authShowcase : layout === "portal" ? portalShowcase : appShowcase}
      <ActionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`${title} drawer shell`}
        description="Shared drawer primitives are available for later list/detail workflows."
      >
        <KeyValueList
          items={[
            { label: "Route", value: routeKey },
            { label: "Status", value: "Shell Ready" },
            { label: "Next Phase", value: milestone },
          ]}
        />
      </ActionDrawer>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmAction}
        title={`${title} confirmation shell`}
        description="Reusable confirmation dialogs are now wired and ready for later destructive or approval actions."
        confirmLabel="Confirm shell action"
      />
    </>
  );
};

export default FeaturePlaceholderPage;
