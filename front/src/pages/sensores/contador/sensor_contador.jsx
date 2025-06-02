import Header from "../../../componentes/sensores/header/header";
import Panel from "../../../componentes/sensores/panel/panel"
import senai_map from "../../../../public/senai_map.png";
import Line from "../../../componentes/sensores/line/line"
import Table from "../../../componentes/sensores/table/table"
import Card from "../../../componentes/sensores/card/card";

export default function Sensor_contador() {
    return (
        <>
            <div className="fixed inset-0 -z-10 overflow-hidden bg-[#126b4b]">
                <img
                    src={senai_map}
                    alt="Imagem de fundo"
                    className="w-full h-full object-cover blur-sm"
                />
            </div>

            <Header />

            <div className="flex mt-[7%] max-w-[1400px] w-full mx-auto justify-center items-start gap-4">
                <Table />
                <div className="bg-black/60 relative z-50 flex w-[60%] items-center justify-center p-4 border border-white rounded-sm">
                    <div
                        className="
                            absolute
                            top-1/2
                            -right-1.5
                            w-3
                            h-3
                            bg-white
                            transform
                            -translate-y-1/2
                            rotate-45
                            "
                    />
                    <Panel
                        label="Contador"
                    />
                </div>
            </div>

            <Line />

            <div className="flex max-w-[1530px] mt-[2%] w-full mx-auto justify-center items-start gap-13">
                <Card />
                <Card />
                <Card />
            </div>
        </>
    );
}