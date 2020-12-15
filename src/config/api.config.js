let routeAPI;
if(process.env.NODE_ENV === "prod") {
	routeAPI = "https://api.ganatrade.xyz/";
} else {
	routeAPI = "https://beta.api.ganatrade.xyz/";
}
export default routeAPI
