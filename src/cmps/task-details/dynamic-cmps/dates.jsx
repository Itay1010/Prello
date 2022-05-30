// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import Box from '@mui/material/Box';

// export const Dates = () => {
//     const [value, setValue] = React.useState([null, null]);

//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <StaticDateRangePicker
//                 displayStaticWrapperAs="desktop"
//                 value={value}
//                 onChange={(newValue) => {
//                     setValue(newValue);
//                 }}
//                 renderInput={(startProps, endProps) => (
//                     <React.Fragment>
//                         <TextField {...startProps} />
//                         <Box sx={{ mx: 2 }}> to </Box>
//                         <TextField {...endProps} />
//                     </React.Fragment>
//                 )}
//             />
//         </LocalizationProvider>
//     );
// }
// export const Dates = () => {
//     console.log('hh')
//     return <div>i am the dates modal</div>
// }
