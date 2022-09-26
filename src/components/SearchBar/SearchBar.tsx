import React     from 'react';
import TextField from '@mui/material/TextField'

function SearchBar() {
  return (
    <div>
      <TextField
        error
        variant="outlined"
        // defaultValue="Group name / Group user name / Group id"
        label="Search"
        // helperText="Error"
      />
    </div>
  );
}

export default SearchBar;
