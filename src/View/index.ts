import { Controller } from "../controller/Controller";
import { View } from "./View";
import "./styles.css";

const controller = new Controller();
const appEl = document.getElementById("app")!;
const view = new View(controller, appEl);

view.renderizarSelecaoMotor();
