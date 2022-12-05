/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";


// Images


export default function data() {

 


  

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {

    columns: [
      { Header: "Name", accessor: "companies", width: "45%", align: "left" },
      // { Header: "members", accessor: "members", width: "10%", align: "left" },
      { Header: "Email", accessor: "budget", align: "center" },
      
    ],

    rows: [
      {
        companies: <Company  name="Material UI XD Version" />,
      
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
        
      },
      // {
      //   companies: <Company image={logoAtlassian} name="Add Progress Track" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team2, "Romina Hadid"],
      //         [team4, "Jessica Doe"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $3,000
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={10} color="info" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      // {
      //   companies: <Company image={logoSlack} name="Fix Platform Errors" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team1, "Ryan Tompson"],
      //         [team3, "Alexander Smith"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       Not set
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={100} color="success" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      // {
      //   companies: <Company image={logoSpotify} name="Launch our Mobile App" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team4, "Jessica Doe"],
      //         [team3, "Alexander Smith"],
      //         [team2, "Romina Hadid"],
      //         [team1, "Ryan Tompson"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $20,500
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={100} color="success" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      // {
      //   companies: <Company image={logoJira} name="Add the New Pricing Page" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([[team4, "Jessica Doe"]])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $500
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={25} color="info" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
      // {
      //   companies: <Company image={logoInvesion} name="Redesign New Online Shop" />,
      //   members: (
      //     <MDBox display="flex" py={1}>
      //       {avatars([
      //         [team1, "Ryan Tompson"],
      //         [team4, "Jessica Doe"],
      //       ])}
      //     </MDBox>
      //   ),
      //   budget: (
      //     <MDTypography variant="caption" color="text" fontWeight="medium">
      //       $2,000
      //     </MDTypography>
      //   ),
      //   completion: (
      //     <MDBox width="8rem" textAlign="left">
      //       <MDProgress value={40} color="info" variant="gradient" label={false} />
      //     </MDBox>
      //   ),
      // },
    ],
  };
}
