import { useState } from "react";
import senai_map from "../../../../public/senai_map.png";
import { FiSettings } from "react-icons/fi";
import TopbarButton from "../../../componentes/sensores/buttons/barra_top";
import Settings from "../../settings/settings";
import SmartCity_logo from "../../../assets/SmartCity_Logo.png"
import Header from "../../../componentes/sensores/header/header";

export default function Sensor_contador() {
    const [showHelp, setShowHelp] = useState(false);
    return (
        <>
            <div className="fixed inset-0 -z-10 overflow-hidden bg-[#126b4b]">
                <img
                    src={senai_map}
                    alt="Imagem de fundo"
                    className="w-full h-full object-cover blur-sm"
                />
            </div>

            <div className="fixed top-4 right-4 z-50">
                <div onClick={() => setShowHelp(true)}>
                    <TopbarButton label="Configurações" Icon={FiSettings} />
                </div>
            </div>

            <div className="fixed top-4 left-4 z-50">
                <img src={SmartCity_logo} alt="Logo SmartCity" className="w-20 h-20" />
            </div>

            <Header />

            {showHelp && <Settings onClose={() => setShowHelp(false)} />}
        </>
    );
}
