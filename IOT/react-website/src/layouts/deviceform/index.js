
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Swayam Swastha React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Swayam Swastha React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { MenuItem, TextField } from "@mui/material";
import { v4 as uuid } from 'uuid';
import { db } from "utlis/firebase";
import { ref, set } from "firebase/database";

function DeviceForm() {

  const deviceTypes = [
    {
      value: 'single_value',
      label: 'single value',
    },
    {
      value: 'multi_value',
      label: 'multiple value',
    },
  ];
  const deviceNameTypes = [
    {
        value: '',
        label: 'Select Name',
    },
    {
      value: 'Pulse Meter',
      label: 'Pulse Meter',
    },
    {
      value: 'Ecg Sensor',
      label: 'Ecg Sensor',
    },
  ];
 
  const [deviceId, setDeviceId] = useState(0);
  const [deviceName, setDeviceName] = useState("");
  const [criticalLower, setcriticalLower] = useState(0);
  const [criticalUpper, setcriticalUpper] = useState(1000);

  const [deviceType, setDeviceType] = useState('single_value');
  const [uploadedData, setUploadedData] = useState("")
  useEffect(() => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8);
    setDeviceId(small_id);
  }, [])

  const checkAll = () => {
    if( deviceName === ""){
        alert("Please select name");
        return;
    }
    if(criticalLower>=criticalUpper){
        alert("Please select proper vales");
        return;
    }

    let finalData ={
        id:deviceId,
        deviceName,
        criticalLower,
        criticalUpper,
        isAssigned:false,
        type:deviceType,
        data:0
    }
    try{
      const res= set(ref(db,'devices/'+ deviceId) ,finalData);
      setUploadedData(JSON.stringify(finalData));
    }catch (e) {
      alert(e.message);
    }
  }
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Add New Device</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                <TextField id="outlined-basic" label="Device Id" variant="outlined" fullWidth margin="normal" value={deviceId}/>
                <TextField
                   
                    select
                    label="Select Device Type"
                    value={deviceType}
                    onChange={event => setDeviceType(event.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    >
                    {deviceTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select"
                    select
                    label="Select Device Name"
                    value={deviceName}
                    onChange={event => setDeviceName(event.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    >
                    {deviceNameTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="outlined-basic" label="Input Critical Lower Value" variant="outlined" fullWidth margin="normal" type="number"  value={criticalLower} onChange={event => setcriticalLower(event.target.value)}/>
                <TextField id="outlined-basic" label="Input Critical Lower Value" variant="outlined" fullWidth margin="normal" type="number" value={criticalUpper} onChange={event => setcriticalUpper(event.target.value)}/>
                
                <MDButton variant="gradient" color="success" fullWidth margin="normal" onClick={checkAll}>
                    submit
                </MDButton>

                <p>
                  {
                    "Data uploaded succeffuly\n"+uploadedData
                  }
                </p>
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DeviceForm;
