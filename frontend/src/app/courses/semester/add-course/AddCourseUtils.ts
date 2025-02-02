
export async function fetchAndCacheCourses(
  selectedTerm: number,
  setSearchData: Function
){
  const cachedData = localStorage.getItem(`courses-${selectedTerm}`);
  if(cachedData){
    setSearchData(JSON.parse(cachedData));
    console.log("Loaded From Cache");
  }else{
    // try{
    //   const data = await getCatalog(selectedTerm.toString());
    //   setSearchData(data);
    //   try {
    //     localStorage.setItem(`courses-${selectedTerm}`, JSON.stringify(data));
    //     console.log("Retrieved & Cached");
    //   } catch (e: any) {
    //     if (e.name === "QuotaExceededError" || e.code === 22) {
    //       console.error("Quota Exceeded: ", e);
    //     } else {
    //       console.error("Error Unknown: ", e);
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error Retrieving: ", error);
    // }
  }
}
