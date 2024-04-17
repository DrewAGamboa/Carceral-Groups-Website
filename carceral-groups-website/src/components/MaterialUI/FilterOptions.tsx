/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export interface FilterOptionsProps {
  options: {label: string, checked: boolean, children: any[]}
  onOptionsChange: (updatedTreeData: {label: string, checked: boolean, children: any[]}) => void;
}

// Utility function to add 'checked' property recursively
const addCheckedProperty = (node: any, isChecked = false) => {
  return {
    ...node,
    checked: isChecked,
    children: node.children.map((child: any) => addCheckedProperty(child, isChecked)),
  };
};

export default function FilterOptions({options, onOptionsChange}: FilterOptionsProps) {

  // Handle change event for checkboxes
  const handleCheckboxChange = (path: any, isChecked: boolean) => {
    const updateCheckedStatus = (node: any, path: any, isChecked: boolean) => {
      if (path.length === 0) {
        // Update current node and all children
        return addCheckedProperty(node, isChecked);
      } else {
        // Recursive case: update child path
        const [currentIndex, ...restPath] = path;
        return {
          ...node,
          children: node.children.map((child: any, index: any) =>
            index === currentIndex
              ? updateCheckedStatus(child, restPath, isChecked)
              : child
          ),
        };
      }
    };

    const updatedData = updateCheckedStatus(options, path, isChecked);
    console.log(updatedData)
    onOptionsChange(updatedData);
  };

  // Render checkboxes recursively
  const renderCheckboxes = (node: any, path = []) => {
    return (
      <Box key={path.join(':')} sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
        <FormControlLabel
          label={node.label}
          control={<Checkbox checked={node.checked} onChange={(e) => handleCheckboxChange(path, e.target.checked)} />}
        />
        {node.children.length > 0 &&
          <Box key={path.join(':')} sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
            {node.children.map((child: any, index: any) =>
              renderCheckboxes(child, path.concat(index))
            )}
          </Box>
        }
      </Box>
    );
  };

  return (
    <>
      {renderCheckboxes(options)}
    </>
  );
}