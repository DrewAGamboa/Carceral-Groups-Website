/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import FiltersResponseFilter from '../../models/FiltersResponseFilter';
import GeographicLocationFilter from '../../models/GeographicLocationFilter';





export interface FilterOptionsProps {
  options: FiltersResponseFilter[]
  onOptionsChange: (geographicLocationFilters: GeographicLocationFilter[]) => void;
}

type filterOptionModel = { 
  prefix: string,
  label: string,
  level: number,
  checked: boolean,
  indeterminate: boolean,
  geographicLocationFilter?: GeographicLocationFilter,
}

const transformFiltersToFilterOptions = (filters: FiltersResponseFilter[]): filterOptionModel[] => {
  // add all option
  const newFilterOptions: filterOptionModel[] = []
  const defaultOption: filterOptionModel = {prefix: '', label: 'All', level: 0, checked: true, indeterminate: false}
  newFilterOptions.push(defaultOption)

  // add categories and institutions
  const categoryOptions = filters.map((filter) => {
    // add institutions if filter is a category
    const institionOptions = []
    if (filter.institutions) {
      const possibleInstitutions = filter.institutions.map((curInstitution) => {
        return {
          prefix: `:All:${filter.category}`,
          label: curInstitution.institution,
          level: 4,
          checked: true,
          indeterminate: false,
          geographicLocationFilter: {Category: filter.category, Institution: curInstitution.institution, CategoryId: filter.categoryId,  InstitutionId: curInstitution.institutionId}
        }
      })
      institionOptions.push(...possibleInstitutions)
    }

    return {category: {prefix: ':All', label: filter.category, level: 2, checked: true, indeterminate: false}, institutions: institionOptions}
  })
  
  categoryOptions.forEach((categoryOption) => {
    // add category as a filter option
    newFilterOptions.push(categoryOption.category)
    // add each institution as a filter option
    newFilterOptions.push(...categoryOption.institutions)
  })
  return newFilterOptions
}

export default function FilterOptions({options, onOptionsChange}: FilterOptionsProps) {
  const [filterOptions, setFilterOptions] = useState<filterOptionModel[]>([])

  useEffect(() => {
    const newFilterOptions = transformFiltersToFilterOptions(options)
    setFilterOptions(newFilterOptions)
  }, [options])

  // Handle change event for checkboxes
  const handleCheckboxChange = (option: filterOptionModel, isChecked: boolean) => {
    const updatedOptions = filterOptions.map((node) => {
      const prefix = `${option.prefix}:${option.label}`
      if(option.label === 'All') {
        return {...node, checked: isChecked}  
      }

      // update the node
      if (node.label === option.label) {
        return {...node, checked: isChecked} 
      }

      // update all children
      if(node.prefix === prefix) {
        return {...node, checked: isChecked}
      }

      return node;
    });
    setFilterOptions(updatedOptions);

    const selectedOptions = updatedOptions.filter((option) => option.checked && option.geographicLocationFilter)
    const selectedCategoryInstitutions: GeographicLocationFilter[] = [] 
    selectedOptions.forEach((option) => {
      if(option.geographicLocationFilter) {
        selectedCategoryInstitutions.push(option.geographicLocationFilter)
      }})
    onOptionsChange(selectedCategoryInstitutions)
  };

  // Render checkboxes recursively
  const renderCheckboxes = filterOptions?.map((option: filterOptionModel, index) => {
    return (
      <Box key={index} sx={{ display: 'flex', flexDirection: 'column', ml: option.level, textAlign: 'left' }}>
        <FormControlLabel
          label={option.label}
          control={<Checkbox checked={option.checked} indeterminate={option.indeterminate} onChange={(e) => handleCheckboxChange(option, e.target.checked)} />}
        />
      </Box>
    );
  });

  return (
    <>
      {renderCheckboxes}
    </>
  );
}