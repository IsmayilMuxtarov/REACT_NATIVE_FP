export const domain = "http://petsco.justportfolio.tk/";

function fetchAPI(endpoint, method) {
  return async (token='',body='') => {
    try {
      const url = `${domain}${endpoint}?api_token=${token}`;
      console.log("_____________",url);
      const options = {method:method,headers:{'Content-Type':'application/json','Accept':'application/json'}};
      if(method === "POST"){options.body = JSON.stringify(body);} 
      const req = await fetch(url, options);
      return req.json();
    } catch (err) { console.log("fetchAPI error", err); }
  };
}

export const signUpFetchAPI  = fetchAPI("api/auth/singup", "POST");
export const signInFetchAPI  = fetchAPI("api/auth/login", "POST");
export const updateUserData = fetchAPI(`api/user/updateuserdata`, "POST");
export const getMainPageData = fetchAPI(`api/categories`, "GET");
export async function getDataFetchUrl (url){
  const req = await fetch(url, {method:"GET",headers:{'Content-Type':'application/json','Accept':'application/json'}});
  return req.json();
}  


// const req = await getMainPageData("ae0648ed6ce483095b7cb02086a9689f140f57aa6","dsadsa");
// const req = await updateUserData("0332f7eb432af7d20c7f412c623807a0684fb0e3e97643b721df1acc5e737e0c",{userPets:addressData});

// export const getShipsList = fetchAPI("starships/", "GET");
// export const getSingleShip = (id) => fetchAPI(`starships/${id}/`, "GET")();
