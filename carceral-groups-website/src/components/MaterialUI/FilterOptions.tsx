/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import FiltersResponseFilter from '../../models/FiltersResponseFilter';
import GeographicLocationFilter from '../../models/GeographicLocationFilter';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



import CustomColorCheckbox from './CustomColorCheckbox';

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
  color?: string
}

const transformFiltersToFilterOptions = (filters: FiltersResponseFilter[]): filterOptionModel[] => {
  // add all option
  const newFilterOptions: filterOptionModel[] = []
  const defaultOption: filterOptionModel = { prefix: '', label: 'All', level: 0, checked: true, indeterminate: false}
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
          color: filter.color,
          geographicLocationFilter: { Category: filter.category, Institution: curInstitution.institution, CategoryId: filter.categoryId, InstitutionId: curInstitution.institutionId }
        }
      })
      institionOptions.push(...possibleInstitutions)
    }

    return { category: { prefix: ':All', label: filter.category, level: 2, checked: true, indeterminate: false, color: filter.color }, institutions: institionOptions }
  })


  categoryOptions.forEach((categoryOption) => {
    // add category as a filter option
    newFilterOptions.push(categoryOption.category)
    // add each institution as a filter option
    newFilterOptions.push(...categoryOption.institutions)
  })
  return newFilterOptions
}

export default function FilterOptions({ options, onOptionsChange }: FilterOptionsProps) {
  const [filterOptions, setFilterOptions] = useState<filterOptionModel[]>([])

  useEffect(() => {
    const newFilterOptions = transformFiltersToFilterOptions(options)
    setFilterOptions(newFilterOptions)
  }, [options])

  // Handle change event for checkboxes
  const handleCheckboxChange = (option: filterOptionModel, isChecked: boolean) => {
    const updatedOptions = filterOptions.map((node) => {
      const prefix = `${option.prefix}:${option.label}`
      if (option.label === 'All') {
        return { ...node, checked: isChecked }
      }

      // update the node
      if (node.label === option.label) {
        return { ...node, checked: isChecked }
      }

      // update all children
      if (node.prefix === prefix) {
        return { ...node, checked: isChecked }
      }

      return node;
    });
    setFilterOptions(updatedOptions);

    const selectedOptions = updatedOptions.filter((option) => option.checked && option.geographicLocationFilter)
    const selectedCategoryInstitutions: GeographicLocationFilter[] = []
    selectedOptions.forEach((option) => {
      if (option.geographicLocationFilter) {
        selectedCategoryInstitutions.push(option.geographicLocationFilter)
      }
    })
    onOptionsChange(selectedCategoryInstitutions)
  };

  const renderAccordionCheckboxes = (options: filterOptionModel[]) => {
    const result = []
    for (let i = 0; i < options.length; i++) {
      const option = options[i]
      if (option.level === 2) {
        const parent = renderCheckbox(option, i)
        const children = []
        while (i + 1 < options.length && options[i + 1].level === 4) {
          i += 1
          children.push(renderCheckbox(options[i], i))
        }

        const accordion = (
          <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              {parent}
            </AccordionSummary>
            <AccordionDetails>
              {children}
            </AccordionDetails>
          </Accordion>
        )
        result.push(accordion)
      }
      else {
        result.push(
          renderCheckbox(option, i)
        )
      }
    }
    return result;
  }

  const renderCheckbox = (option: filterOptionModel, index: number) => {
    return (
      <Box key={index} sx={{ display: 'flex', flexDirection: 'column', ml: option.level, textAlign: 'left' }}>
        <FormControlLabel
          label={option.label}
          control={
            <CustomColorCheckbox 
              checked={option.checked}
              indeterminate={option.indeterminate}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)} 
              customColor={option.color}
            />
          }
        />
      </Box>
    )
  }
  const renderCheckboxes = renderAccordionCheckboxes(filterOptions)

  return (
    <>
      {renderCheckboxes}
    </>
  );
}