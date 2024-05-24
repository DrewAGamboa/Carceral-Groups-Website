/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import { DUMMY_FILTERS } from '../../models/Filter';





export interface FilterOptionsProps {
  options: {label: string, checked: boolean, children: any[]}
  onOptionsChange: (updatedTreeData: {label: string, checked: boolean, children: any[]}) => void;
}

type filterOptionModel = { 
  prefix: string,
  label: string,
  level: number,
  checked: boolean
  indeterminate: boolean
}

export default function FilterOptions({options, onOptionsChange}: FilterOptionsProps) {
  const [filterOptions, setFilterOptions] = useState<filterOptionModel[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = DUMMY_FILTERS

        // add all option
        const newFilterOptions: filterOptionModel[] = []
        const defaultOption: filterOptionModel = {prefix: '', label: 'All', level: 0, checked: true, indeterminate: false}
        newFilterOptions.push(defaultOption)

        // add categories and institutions
        const categoryOptions = filters.map((filter) => {
          const institionOptions = []
          if (filter.Institutions) {
            const possibleInstitutions = filter.Institutions.map((instition) => {
              return {prefix: `:All:${filter.Category}`, label: instition, level: 4, checked: true, indeterminate: false }
            });
            institionOptions.push(...possibleInstitutions)
          }

          return {category: {prefix: ':All', label: filter.Category, level: 2, checked: true, indeterminate: false}, institions: institionOptions}
        })
        
        categoryOptions.forEach((categoryOption) => {
          newFilterOptions.push(categoryOption.category)
          newFilterOptions.push(...categoryOption.institions)
        })

        setFilterOptions(newFilterOptions)
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [])

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