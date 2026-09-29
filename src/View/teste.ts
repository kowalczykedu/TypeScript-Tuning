import FirstScreen from "./firstScreen";
import { OficinaController } from "../controller/oficinaController";

const controller = new OficinaController();
const firstScreen = new FirstScreen(controller);

firstScreen.openFirstScreen();