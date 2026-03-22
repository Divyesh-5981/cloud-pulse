import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { memo } from 'react';

import {
  type FilterConfig,
  type FilterOption,
  type FilterValues,
} from '../../types';
import { styles } from './IncidentFilters.styles';

interface IncidentFiltersProps {
  config: FilterConfig[];
  filters: FilterValues;
  hasActiveFilters: boolean;
  onFilterChange: (filterId: string, values: string[]) => void;
  onClearAll: () => void;
}

interface FilterAutocompleteProps {
  config: FilterConfig;
  selectedValues: string[];
  onFilterChange: (filterId: string, values: string[]) => void;
}

function FilterAutocomplete({
  config,
  selectedValues,
  onFilterChange,
}: FilterAutocompleteProps) {
  const isMulti = config.type === 'multi-select';

  const selectedOptions = config.options.filter((opt) =>
    selectedValues.includes(opt.value),
  );

  if (isMulti) {
    return (
      <Autocomplete
        multiple
        size="small"
        options={config.options}
        getOptionLabel={(opt) => opt.label}
        isOptionEqualToValue={(opt, val) => opt.value === val.value}
        value={selectedOptions}
        onChange={(_, newValue) => {
          onFilterChange(
            config.id,
            newValue.map((opt) => opt.value),
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={config.label}
            placeholder={config.label}
          />
        )}
        disableCloseOnSelect
        sx={styles.autocomplete}
      />
    );
  }

  const singleValue = selectedOptions[0] ?? null;

  return (
    <Autocomplete
      size="small"
      options={config.options}
      getOptionLabel={(opt) => opt.label}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      value={singleValue}
      onChange={(_, newValue: FilterOption | null) => {
        onFilterChange(config.id, newValue ? [newValue.value] : []);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={config.label}
          placeholder={config.label}
        />
      )}
      sx={styles.autocomplete}
    />
  );
}

function IncidentFilters({
  config,
  filters,
  hasActiveFilters,
  onFilterChange,
  onClearAll,
}: IncidentFiltersProps) {
  return (
    <Box sx={styles.controlsRow}>
      {config.map((filterConfig) => (
        <FilterAutocomplete
          key={filterConfig.id}
          config={filterConfig}
          selectedValues={filters[filterConfig.id] ?? []}
          onFilterChange={onFilterChange}
        />
      ))}

      {hasActiveFilters ? (
        <Button size="small" onClick={onClearAll} sx={styles.clearAllButton}>
          Clear All
        </Button>
      ) : null}
    </Box>
  );
}

export default memo(IncidentFilters);
