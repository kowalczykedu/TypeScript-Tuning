import FirstScreen from "./view/FirstScreen";
import SecondScreen from "./view/SecondScreen";
import { OficinaController } from "./controller/OficinaController";
import { MotorService } from "./service/MotorService";
import { motoresPreDefinidos } from "./data/motoresData";
import { catalogo } from "./data/pecasData";
import type Motor from "./model/Motor";
import FormatadorMotor from "./view/util/FormatadorMotor";
import { MemoryRepository } from "./repository/MemoryRepository";

const repositorio = new MemoryRepository<Motor>();
const service = new MotorService(motoresPreDefinidos, catalogo, repositorio);
const controller = new OficinaController(service);
const formatador = new FormatadorMotor();
const secondScreen = new SecondScreen(controller, formatador);
const firstScreen = new FirstScreen(controller, secondScreen, formatador);

firstScreen.openFirstScreen();