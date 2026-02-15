'use client'

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { type Container, type ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

const ParticlesCanvas = () => {
    const [init, setInit] = useState(false)

    // This should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // You can learn more about adding presets/plugins here: https://particles.js.org/docs/plugins/load-slim
            await loadSlim(engine)
        }).then(() => {
            setInit(true)
        })
    }, [])

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log(container)
    }

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: { enable: false },
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 0.4,
                            color: "#3b82f6",
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: "#3b82f6",
                },
                links: {
                    color: "#3b82f6",
                    distance: 180,
                    enable: true,
                    opacity: 0.2,
                    width: 2,
                    shadow: {
                        enable: true,
                        color: "#3b82f6",
                        blur: 5,
                    },
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 1.5,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 4 },
                },
            },
            detectRetina: true,
            themes: [],
        }),
        [],
    )

    if (!init) return null

    return (
        <div className="absolute inset-0 z-0">
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                className="w-full h-full"
            />
        </div>
    )
}

export default ParticlesCanvas
