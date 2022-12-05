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


// Swayam Swastha React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// Overview page components
import Header from "layouts/profile/components/Header";

// Images

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "utlis/firebase";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbfirestore } from "utlis/firebase";

function Overview() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const fetchUserName = async () => {
    try {
      const q = query(collection(dbfirestore, "doctors"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setDoctorData(data);
      //console.log(data)
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
    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    
  }, [doctorData])
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      
      <Header name={doctorData?.name}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              {
                user !== null && doctorData!==null ?(
                  <ProfileInfoCard
                title="profile information"
                description=""
                info={{
                  fullName: doctorData.name,
                  description:`Hi, I’m ${doctorData.name}, I'm doctor at ABC hosptial. Ready to heal you anytime. Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).`,
                  mobile: "(44) 123 1234 123",
                  email: doctorData.email,
                  location: "USA",
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
                  location: "USA",
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
                )
              }
              
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
           
          </Grid>
        </MDBox>
       
       
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
