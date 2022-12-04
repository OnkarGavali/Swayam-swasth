

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Swayam Swastha React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import { useEffect } from "react";
import { auth,db,dbfirestore } from "utlis/firebase";
import { onValue, ref } from "firebase/database"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
// Swayam Swastha React examples
import DataTable from "examples/Tables/DataTable";
import { query, collection, getDocs, where } from "firebase/firestore";
// Data
import data from "layouts/dashboard/components/Projects/data";

function Projects() {
  
 
  const [menu, setMenu] = useState(null);
  let columns = [{ Header: "Name", accessor: "companies", width: "45%", align: "left" },
  // { Header: "members", accessor: "members", width: "10%", align: "left" },
  { Header: "Email", accessor: "budget", align: "center" },
  { Header: "BPM", accessor: "completion", align: "center" },]
  const [rows,setRows] = useState([])
  const [projects, setProjects] = useState([]);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [BPM, setBPM] = useState(0);
  
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      console.log(user)
      const q = query(collection(dbfirestore, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const getTodos = async () => {
    const q = query(collection(dbfirestore, "patients"));
    const doc = await getDocs(q);
    doc.forEach((docs)=>{
    let entry = docs.data()  
    let obj =  {
            companies: <Company  name={entry['name']} />,
          
            budget: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {entry['email']}
              </MDTypography>
            ),
            completion: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {60}
              </MDTypography>
            ),
      }
      rows.push(obj)
      // console.log(docs.data())
    })
   
   
    
  };
  useEffect(() => {
    if (loading) return;
    if (!user){
      console.log("Dashboard user not found");
      return navigate("/authentication/sign-in");
    }
    getTodos();
    // console.log(rows)
  }, [user, loading]);
  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/authentication/sign-in");
  //   //fetchUserName();
  // }, [user, loading]);

  // useEffect(() => {
  //   const query = ref(db, "Patient");
  //   return onValue(query, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("bpmval:",data);
  //     setBPM(data.BPM)
  //     setName(data.Email)
  //     if (snapshot.exists()) {
  //       Object.values(data).map((project) => {
  //         setProjects((projects) => [...projects, project]);
  //       });
  //     }
  //     console.log(projects)
  //   });
  // }, []);



  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );
  // columns = [
  //   { Header: "Name", accessor: "companies", width: "45%", align: "left" },
  //   // { Header: "members", accessor: "members", width: "10%", align: "left" },
  //   { Header: "Email", accessor: "budget", align: "center" },
  //   { Header: "BPM", accessor: "completion", align: "center" },
  // ]

  // rows = [
  //   {
  //     companies: <Company  name="Material UI XD Version" />,
    
  //     budget: (
  //       <MDTypography variant="caption" color="text" fontWeight="medium">
  //         $14,000
  //       </MDTypography>
  //     ),
  //     completion: (
  //       <MDBox width="8rem" textAlign="left">
  //         <MDProgress value={60} color="info" variant="gradient" label={false} />
  //       </MDBox>
  //     ),
  //   },
  // ]

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Patients
          </MDTypography>
          
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
