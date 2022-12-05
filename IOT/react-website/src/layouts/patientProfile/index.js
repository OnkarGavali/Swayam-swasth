/**
=========================================================
* Swayam Swastha React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Swayam Swastha React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Swayam Swastha React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// Overview page components

import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// Data
//import profilesListData from "layouts/profile/data/profilesListData";

// Images

import { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { dbfirestore } from "utlis/firebase";
import PlatformSettings from "./components/PlatformSettings";
import Header from "./components/Header";

function PatientProfile() {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const location = useLocation();
  const fetchPatientDetails = async (id) => {
    try {
      const patientRef = doc(dbfirestore, "patients", id);
      const docSnap = await getDoc(patientRef);

      if (docSnap.exists()) {
        let data=docSnap.data();
        console.log("Document data:", docSnap.data());
        setPatientData(data);
        console.log(data)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return navigate("/authentication/sign-in");
      }
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };


  useEffect(() => {
    if(location.state==null){
      return navigate("/authentication/sign-in");
    }
    fetchPatientDetails(location.state.id);
  }, []);

  useEffect(() => {
    
  }, [patientData])
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      
      <Header name={"ho"}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              {
                patientData !== null ?(
                  <ProfileInfoCard
                title="profile information"
                description={patientData.patientDescription}
                info={{
                  fullName: patientData.patientName,
                  mobile: "(44) 123 1234 123",
                  // email: "alecthompson@mail.com",
                  location: "usa",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
                ):(
                  <ProfileInfoCard
                  title="profile information"
                  description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                  info={{
                  fullName: "AAA",
                  mobile: "(44) 123 1234 123",
                  email: "alecthompson@mail.com",
                  location: "usa",
                }}
                social={[
                  // {
                  //   link: "https://www.facebook.com/CreativeTim/",
                  //   icon: <FacebookIcon />,
                  //   color: "facebook",
                  // },
                  // {
                  //   link: "https://twitter.com/creativetim",
                  //   icon: <TwitterIcon />,
                  //   color: "twitter",
                  // },
                  // {
                  //   link: "https://www.instagram.com/creativetimofficial/",
                  //   icon: <InstagramIcon />,
                  //   color: "instagram",
                  // },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
                )
              }
              
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon=""
                title="Temperature"
                count="98 deg F"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "updated 3 mins ago",
                }}
              />
            </MDBox>
           

            </Grid>
            <Grid item xs={12} xl={4}>
              <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon=""
                title="Pulse"
                count="110 BPM"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "updated 3 mins ago",
                }}
              />
            </MDBox>

            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default PatientProfile;
