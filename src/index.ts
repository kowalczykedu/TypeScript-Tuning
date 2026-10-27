import FirstScreen from "./view/FirstScreen";
import SecondScreen from "./view/SecondScreen";
import { OficinaController } from "./controller/OficinaController";
import { MotorService } from "./service/MotorService";
import { motoresPreDefinidos } from "./data/motoresData";
import { catalogo } from "./data/pecasData";

const service = new MotorService(motoresPreDefinidos, catalogo);
const controller = new OficinaController(service);
const firstScreen = new FirstScreen(controller);
const secondScreen = new SecondScreen(controller);

//firstScreen.openFirstScreen();
console.log(secondScreen.formatarMenuPecas(controller.listarPecasDoSlot(1)));