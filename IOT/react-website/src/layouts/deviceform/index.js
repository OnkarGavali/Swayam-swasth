
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
import { auth } from "utlis/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { dbfirestore } from "utlis/firebase";
import { Email } from "@mui/icons-material";

function DeviceForm() {

  const [deviceId, setDeviceId] = useState(0);
  const [deviceName, setDeviceName] = useState("");
  const [criticalLower, setcriticalLower] = useState(0);
  const [criticalUpper, setcriticalUpper] = useState(1000);

  const [deviceType, setDeviceType] = useState("");
  const [devicesList, setDevicesList] = useState([]);
  const [uploadedData, setUploadedData] = useState("")
  const [showFinalData, setShowFinalData] = useState(false)
  
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchDevicesList = async () => {
    try {
      const querySnapshot = await getDocs(collection(dbfirestore, "devices"));
      let tmp=[]
      querySnapshot.forEach((doc) => {
        let d =doc.data();
        tmp.push({value:d.name,label:d.name,type:d.type})
      });
      setDevicesList(tmp);
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user){
      console.log("Dashboard user not found");
      return navigate("/authentication/sign-in");
    }
    fetchDevicesList();
    generateID()
  }, [user, loading]);

  const generateID = () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8);
    setDeviceId(small_id);
  }
  const selectDeviceType = (event) =>{
    setDeviceName(event.target.value)
    for (let x in devicesList) {
      if(devicesList[x].value==event.target.value){
        setDeviceType(devicesList[x].type)
      }
    }
    
    console.log(deviceType,deviceName)
  }
  const checkAll = () => {
    if( deviceName === ""){
        alert("Please select name");
        return;
    }
    if(parseInt(criticalLower)>=parseInt(criticalUpper)){
      alert("Please select proper values");
      return;
    }
    setcriticalLower(Number(criticalLower))
    setcriticalUpper(Number(criticalUpper))
    let date = new Date();
    let currd= new Date(); 
    date.setTime(date.getTime()-(1000*60*30));
    let tmpdata=(criticalLower+criticalUpper+0)/2;
    let finalData ={
      id:deviceId,
      deviceName,
      criticalLower,
      criticalUpper,
      isAssigned:false,
      type:deviceType,
      data:tmpdata,
      lastNotified:date.getTime(),
      lastModified:currd.getTime(),
      isPatientChecked:false,
      isAssigned:false,
      email:"",
      patient_id:""
    }
    try{
      const res= set(ref(db,'devices/'+ deviceId) ,finalData);
      setUploadedData(JSON.stringify(finalData));
      setShowFinalData(true);
      console.log(finalData)
    }catch (e) {
      alert(e.message);
    }
  }
  const clearAll = () =>{
    setShowFinalData(false);
    generateID();
    
    setDeviceName("")
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
                    value={deviceName}
                    onChange={selectDeviceType}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    >
                    {devicesList.size !=0 && devicesList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="outlined-basic" label="Input Critical Lower Value" variant="outlined" fullWidth margin="normal" type="number"  value={criticalLower} onChange={event => setcriticalLower(event.target.value)}/>
                <TextField id="outlined-basic" label="Input Critical Upper Value" variant="outlined" fullWidth margin="normal" type="number" value={criticalUpper} onChange={event => setcriticalUpper(event.target.value)}/>
                
                

                
               

                
                  {
                    showFinalData ? (
                      <>
                        <MDButton variant="gradient" color="success" fullWidth margin="normal" onClick={clearAll}>
                          Add New Device
                        </MDButton>
                        <p style={{margin:"2%"}}>
                          {"\nDeice is uploaded successfully!! please assign device\n\n " + uploadedData}
                        </p>
                     
                      </>
                     ) : (
                      <>
                        <MDButton variant="gradient" color="success" fullWidth margin="normal" onClick={checkAll}>
                           Submit
                        </MDButton>
                        <p style={{margin:"2%"}}>
                        {"\n"}
                        </p>
                      </>
                     )
                  }
                
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
