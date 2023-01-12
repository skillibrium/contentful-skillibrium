import "./style.css";
import * as contentful from "contentful"

const ACCESS_TOKEN = "7rjVXUpBnvUC4BXz5CK0udDwDZjauDREL4eSo98vuio";
const SPACE = "sv54roagnofr";

const client = contentful.createClient({
	accessToken: ACCESS_TOKEN,
	space: SPACE,
});

client
	.getEntry("E59dHv1djhlVMNf92ydOd")
	.then((entry) => console.log(entry))
	.catch((err) => console.log(err));

function getClient (accessToken: string , space: string) {
  try{
    return contentful.createClient({
					accessToken: accessToken,
					space: space,
				});
  }
  catch(e){
    console.error(e)
    
  }
}