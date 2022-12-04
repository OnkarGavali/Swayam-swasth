
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
import { auth } from "utlis/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { dbfirestore } from "utlis/firebase";
import MDInput from "components/MDInput";

function PatientForm() {

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientAge, setPatientAge] = useState(0);
  const [patientMobile, setPatientMobile] = useState("");
  const [patientDescription, setPatientDescription] = useState("");

  
  const [uploadedData, setUploadedData] = useState("")
  const [showFinalData, setShowFinalData] = useState(false)
  
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (loading) return;
    if (!user){
      console.log("Dashboard user not found");
      return navigate("/authentication/sign-in");
    }
  }, [user, loading]);

  
  
  const checkAll = async () => {
    if( patientName === ""  && patientDescription=="" && patientEmail=="" && patientMobile==""){
      alert("Please select name");
      return;
    }
    if(patientAge<0){
      alert("Please select proper values");
      return;
    }
    
    let finalData = {
      patientName,
      patientAge,
      patientDescription,
      patientEmail,
      patientMobile,
      doctorId:user.uid
    }
    try{
      await addDoc(collection(dbfirestore, "patients"), finalData);
      setUploadedData(JSON.stringify(finalData));
      setShowFinalData(true);
      console.log(finalData)
    }catch (e) {
      alert(e.message);
    }
  }
  const clearAll = () =>{
    setShowFinalData(false);
    setPatientName("");
    setPatientAge(0);
    setPatientMobile("");
    setPatientDescription("")
    setPatientEmail("")
  }
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Add New Patient </MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                <MDInput label="Patient Name" fullWidth margin="normal"  value={patientName} onChange={event => setPatientName(event.target.value)}/>
                <MDInput label="Patient Email" fullWidth margin="normal"  value={patientEmail} onChange={event => setPatientEmail(event.target.value)}/>
                <MDInput label="Patient Age" fullWidth margin="normal" type="number" value={patientAge} onChange={event => setPatientAge(event.target.value)}/>
                <MDInput label="Patient Mobile No" fullWidth margin="normal" type="tel" value={patientMobile} onChange={event => setPatientMobile(event.target.value)}/>
                <MDInput label="Description" fullWidth margin="normal" value={patientDescription} multiline rows={5} onChange={(e)=>setPatientDescription(e.target.value)}/>
                  {
                    showFinalData ? (
                      <>
                        <MDButton variant="gradient" color="success" fullWidth margin="normal" onClick={clearAll}>
                          Add New Device
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

export default PatientForm;
