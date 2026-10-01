import FirstScreen from "./view/FirstScreen";
import { OficinaController } from "./controller/OficinaController";
import { MotorService } from "./service/MotorService";
import { motoresPreDefinidos } from "./data/motoresData";
import { catalogo } from "./data/pecasData";

const service = new MotorService(motoresPreDefinidos, catalogo);
const controller = new OficinaController(service);
const firstScreen = new FirstScreen(controller);

firstScreen.openFirstScreen();