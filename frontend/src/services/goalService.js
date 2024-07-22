
  //Fetches the goal which has boolean isCurrentGoal marked true
  //So that you encounter no errors ensure that only one goal is marked as the current goal in your database
  const fetchCurrentGoal = async () => {
    const response = await fetch("http://localhost:9000/api/goal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      try {
        let res = await response.json();
        throw res.message || JSON.stringify(res);
      } catch (err) {
        console.log(err);
        const error = new Error("Something went wrong");
        throw error.message;
      }
    }
  
    const goalApiData = await response.json();
    return goalApiData;
  };

  
  
  const goalService = {
    fetchCurrentGoal
  };
  
  export default goalService;
  