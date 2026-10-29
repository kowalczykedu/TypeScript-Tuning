import FirstScreen from "./view/FirstScreen";
import SecondScreen from "./view/SecondScreen";
import { OficinaController } from "./controller/OficinaController";
import { MotorService } from "./service/MotorService";
import { motoresPreDefinidos } from "./data/motoresData";
import { catalogo } from "./data/pecasData";
import FormatadorMotor from "./view/util/FormatadorMotor";

const service = new MotorService(motoresPreDefinidos, catalogo);
const controller = new OficinaController(service);
const formatador = new FormatadorMotor();
const secondScreen = new SecondScreen(controller, formatador);
const firstScreen = new FirstScreen(controller, secondScreen, formatador);

firstScreen.openFirstScreen();