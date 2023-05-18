
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
import { onValue, ref, set } from "firebase/database";
import { auth } from "utlis/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { dbfirestore } from "utlis/firebase";
import { Email } from "@mui/icons-material";

function AssignDevice() {


  const [deviceId, setDeviceID] = useState(0);
  const [patinetId, setPatientID] = useState(0);
  const [devicesList, setDevicesList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [uploadedData, setUploadedData] = useState("")
  const [showFinalData, setShowFinalData] = useState(false)
  
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchPatientsList = async () => {
    try {
      const querySnapshot = await getDocs(collection(dbfirestore, "patients"));
      let tmp=[]
      querySnapshot.forEach((doc) => {
        let d =doc.data();
        tmp.push({value:doc.id,label:doc.id+" "+d.patientName})
      });
      console.log(tmp)
      setPatientsList(tmp);
      if(tmp.size>0)
      setPatientID(tmp[0].value) ;
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };
  const fetchDevicesList = async () => {
    try {
      const dbRef = ref(db, '/devices');
      let tmp= [];
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          //const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          // ...
          tmp.push({value:childData.id,label:childData.id+" "+childData.deviceName});
        });
      });
      console.log(tmp)
      setDevicesList(tmp);
      if(tmp.size>0)
      setDeviceID(tmp[0].value)
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
    fetchPatientsList();
  }, [user, loading]);

  useEffect(() => {
    
  }, [devicesList,patientsList])
  
  
  const checkAll = () => {
    if( patinetId==0 || deviceId==0){
        alert("Please select name");
        return;
    }
    
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
      patient_email:"",
      patient_id:"",
      doctor_email:"",
      doctor_id:"",
      isCritical:false
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
    
    setDeviceID(0)
    setPatientID(0)
  }
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Assign Device to patinet</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
              
                <TextField
                    select
                    label="Select Device "
                    value={deviceId}
                    onChange={e=> setDeviceID(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    >
                    {devicesList.size !=0 && devicesList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}{console.log("hi ")}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                   
                   select
                   label="Select patinet"
                   value={patinetId}
                   onChange={e=> setPatientID(e.target.value)}
                   variant="outlined"
                   fullWidth
                   margin="normal"
                   >
                   {patientsList.size !=0 && patientsList.map((option) => (
                       <MenuItem key={option.value} value={option.value}>
                       {option.label}
                       </MenuItem>
                   ))}
               </TextField>

                
                  {
                    showFinalData ? (
                      <>
                        <MDButton variant="gradient" color="success" fullWidth margin="normal" onClick={clearAll}>
                          Assign more Device
                        </MDButton>
                        <p style={{margin:"2%"}}>
                          {"\nDeice is uploaded successfully!! \n\n " + uploadedData}
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

export default AssignDevice;
