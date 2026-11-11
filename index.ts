import FirstScreen from "./src/view/FirstScreen";
import SecondScreen from "./src/view/SecondScreen";
import { OficinaController } from "./src/controller/OficinaController";
import { MotorService } from "./src/service/MotorService";
import { motoresPreDefinidos } from "./src/data/motoresData";
import { catalogo } from "./src/data/pecasData";
import FormatadorMotor from "./src/view/util/FormatadorMotor";
import { Database } from "./src/repository/Database";

const repositorio = new Database("tuning.db", catalogo);
const service = new MotorService(motoresPreDefinidos, catalogo, repositorio);
const controller = new OficinaController(service);
const formatador = new FormatadorMotor();
const secondScreen = new SecondScreen(controller, formatador);
const firstScreen = new FirstScreen(controller, secondScreen, formatador);

firstScreen.openFirstScreen();