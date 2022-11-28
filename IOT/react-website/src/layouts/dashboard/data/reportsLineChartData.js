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
let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();
let BPMlist = []
let timeDate = []

function fetchIOTdata(){

  const [BPMlist, setBPMlist] = useState([]);
  const [BPM, setBPM] = useState(0);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const query = ref(db, "Patient");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log("bpmval:",data);
      setBPM(data.BPM)
      
      setName(data.Email)
      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setProjects((projects) => [...projects, project]);
        });
      }
      console.log(projects[0])
    });
  }, []);
  BPMlist = projects

}


export default {
  sales: {
    labels: ["12:00","13:00","14:00","15:00"],
    datasets: { label: "Temperature", data: [37,37.1,37.4,37.8 ] },
  },
  tasks: {
    labels: ["12:00","13:00","14:00","15:00"],
    datasets: { label: "BPM", data: BPMlist },
  },
};
