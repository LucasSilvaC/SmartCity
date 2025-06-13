import React, { useState, useEffect, useRef } from "react";

function FlyingBird({ larguraTotal, alturaTotal, numPassaros = 20 }) {
    const img = "/bird_flying.gif";

    const [passaros, setPassaros] = useState([]);
    const animRef = useRef();

    const margem = 0.1;

    const iniciarBird = () => {
        const borda = Math.floor(Math.random() * 4);

        let x, y, direcaoX, direcaoY;

        switch (borda) {
            case 0:
                x = -100;
                y = Math.random() * alturaTotal;
                break;
            case 1:
                x = larguraTotal + 100;
                y = Math.random() * alturaTotal;
                break;
            case 2:
                x = Math.random() * larguraTotal;
                y = -100;
                break;
            case 3:
                x = Math.random() * larguraTotal;
                y = alturaTotal + 100;
                break;
        }

        const centroX = larguraTotal / 2;
        const centroY = alturaTotal / 2;

        const dx = centroX - x + (Math.random() - 0.5) * larguraTotal * 0.3;
        const dy = centroY - y + (Math.random() - 0.5) * alturaTotal * 0.3;

        const magnitude = Math.sqrt(dx * dx + dy * dy);
        direcaoX = (dx / magnitude) * (1 + Math.random() * 1);
        direcaoY = (dy / magnitude) * (1 + Math.random() * 1);

        return { x, y, ativo: true, direcaoX, direcaoY };
    };

    const animarBirds = () => {
        const mover = () => {
            setPassaros((prevPassaros) => {
                const novos = prevPassaros
                    .map((p) => {
                        const novaX = p.x + p.direcaoX * 2;
                        const novaY = p.y + p.direcaoY * 2;

                        if (
                            novaX < -200 ||
                            novaX > larguraTotal + 200 ||
                            novaY < -200 ||
                            novaY > alturaTotal + 200
                        ) {
                            return { ...p, ativo: false };
                        }

                        return { ...p, x: novaX, y: novaY };
                    })
                    .filter((p) => p.ativo);

                while (novos.length < numPassaros) {
                    novos.push(iniciarBird());
                }

                return novos;
            });

            animRef.current = requestAnimationFrame(mover);
        };

        animRef.current = requestAnimationFrame(mover);
    };

    useEffect(() => {
        setPassaros(Array.from({ length: numPassaros }, iniciarBird));
        animarBirds();

        return () => cancelAnimationFrame(animRef.current);
    }, [larguraTotal, alturaTotal, numPassaros]);

    return (
        <>
            {passaros.map((bird, index) => (
                <figure
                    key={index}
                    role="img"
                    aria-label="Pássaro voando"
                    style={{
                        position: "absolute",
                        left: `${bird.x}px`,
                        top: `${bird.y}px`,
                        width: "120px",
                        height: "100px",
                        pointerEvents: "none",
                        transform: bird.direcaoX < 0 ? "scaleX(-1)" : "none",
                        margin: 0,
                    }}
                >
                    <img
                        src={img}
                        alt="Passáro Voando"
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </figure>
            ))}
        </>
    );

}

export default FlyingBird;