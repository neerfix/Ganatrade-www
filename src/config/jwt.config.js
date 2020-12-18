import { firebaseConfig } from "./firebase.config";
import key from "./privateKey.json";
import * as jwt from "jsonwebtoken";

const getToken = () => {
	let privateKey = firebaseConfig.projectId+key.private;
	let tokenACP = jwt.sign({ AdminControlPanel: true }, privateKey);
	return tokenACP
};

export default getToken;
